# CLAUDE.md

## Current state

The full pipeline is built and green: 13 services, 75 resources, 303 operations (99 SELECT, 50 INSERT, 43 DELETE, 11 REPLACE, 100 EXEC, 12 skipped with reasons). `make all` runs pipeline -> tests -> docs -> site. Key facts that differ from or refine the original plan below:

- Pipeline order is pre-process -> split -> **pre-normalize** -> generate-mappings -> map-operations -> normalize -> generate -> post-process. `pre_normalize.mjs` runs BEFORE mapping because it renames duplicate operationIds created by the service merge (grant subresources in roles, search-service feedback in cortex) and both the wrapper-key derivation and the CSV depend on the final ids. `all_services.csv` is fully derived - regenerate it from scratch (delete + analyze + map-operations) rather than letting analyze append to a stale copy.
- LIMIT pushdown (`top` -> `showLimit`) is injected per method by `post_process.mjs` on exactly the 31 list methods that declare the parameter - NOT via `--service-config`, because any-sdk applies the pushdown parameter unconditionally and most list endpoints reject unknown params. NO pagination config is shipped: the live control plane does not emit the Link headers the specs declare, and a header responseToken without a requestToken deadlocks stackql v0.10.582 (NOTES.md item 1). The integration runner fails if pagination config reappears. Also: EXEC of non-GET methods panics the current binary (NOTES.md item 1b) - tests SKIP/XFAIL on the signature.
- any-sdk facts that shaped the config (verified in source): `requestBodyTranslate` is method-level only (no inheritance); pagination request/response tokens are broken at provider level (use service/resource/method); `queryParamPushdown` inherits whole-block, first non-nil wins; views only work as `resource.config.views.select`.
- `post_process.mjs` also binds `sqlapi.results.fetch_result` to the ResultSet schema (vendor spec declares an empty response schema), and binds `request: {mediaType: application/json}` on select-over-POST methods (the generator only emits request bindings for insert/replace).
- Cortex inference (`analyst_messages`, `messages`, `chat_completions`) is SELECT-over-POST, matching the anthropic/gemini providers - WHERE members feed the request body. The vendor spec declares the generic Anthropic/OpenAI-compatible endpoints as opaque passthroughs (`additionalProperties: true`, no properties), so `pre_normalize.mjs` injects typed request/response schemas for JSON mode; live-verified with `SELECT ... FROM snowflake.cortex.chat_completions WHERE model = 'llama3.1-8b' AND messages = '[...]'`. Claude models 400 as unavailable on the trial account - wiring is proven regardless.
- The smoke suite (`tests/smoke_test.py`) defaults to the dev account `MGBHLAO-CY92030` (AWS_AP_SOUTHEAST_2); `--live` switches to the latest published provider from the public registry. Grant INSERT columns: `granteeType, granteeName, securableType, securableName` (path params) + `privileges` (JSON array body column); revoke DELETE uses singular `privilege`.
- The stackql binary resolution in bin/*.sh and tests: `$STACKQL` -> `./stackql(.exe)` -> PATH. On this Windows machine it is at `C:\Program Files (x86)\StackQL\stackql`; server scripts handle MSYS (cygpath for registry URLs, ps -W/taskkill for process management).

## Project

This repository builds and documents the refreshed `snowflake` provider for [StackQL](https://github.com/stackql/stackql), enabling SQL-based query and provisioning operations against the Snowflake REST APIs - the full control plane (accounts, databases, schemas, tables, views, warehouses, roles, database roles, users, grants, network policies, compute pools, services, stages, pipes, streams, tasks, tags, integrations, dynamic/event/Iceberg tables, notebooks, Streamlit apps, secrets, alerts), the SQL API data plane (statement submission and results), and the Cortex AI surface (inference, analyst, search).

This is a ground-up rebuild of the published `snowflake` provider. The original build lives at [`stackql-registry/stackql-provider-snowflake-original`](https://github.com/stackql-registry/stackql-provider-snowflake-original) and used the pre-`@stackql/provider-utils` tooling. This repository is a fork of [`snowflakedb/snowflake-rest-api-specs`](https://github.com/snowflakedb/snowflake-rest-api-specs), so the vendor OpenAPI specs live in-repo under `specifications/` and stay current via upstream fork sync - there is no fetch step. The provider build scaffolding is added on top of the fork.

The build pipeline and repository pattern follow [`stackql-registry/stackql-provider-k8s`](https://github.com/stackql-registry/stackql-provider-k8s/tree/feature/provider-dev) (branch `feature/provider-dev`). When in doubt about structure, scripts, testing, or docs, that repository is the reference implementation - mirror it.

## Strategic goals

Two goals shape mapping and documentation decisions throughout:

1. **One-up the Terraform provider on control plane operations.** The Snowflake Terraform provider has a public multi-year history of grant-resource instability - its own team deprecated all 26 original grant resources, and preview features still carry breaking changes without major version bumps. The refreshed StackQL provider counters on three fronts:
   - **Grants as data** - `grant.yaml` models grants as REST resources. Granting is an `INSERT`, revoking is a `DELETE`, and auditing every grant in the account is a `SELECT` - no state file to drift, nothing to reconcile. The grants resources are the flagship of the provider and lead the documentation.
   - **CREATE OR ALTER as `REPLACE`** - the vendor specs support create-or-alter semantics on applicable resources (PUT operations). These map to the StackQL `REPLACE` verb: declarative, idempotent resource definition without state.
   - **Complete, current surface** - the specs are vendor-published and synced from upstream; coverage tracks what Snowflake ships, per release, mechanically.
2. **Seamlessly expose data plane operations.** `sqlapi.yaml` (`SubmitStatement`, `GetStatementStatus`, `CancelStatement`) makes Snowflake data queryable in the same StackQL session as the control plane - inventory a warehouse and query the tables inside it without changing tools. The precise SQL-verb mapping for statement submission is a phase 1 decision (see mapping notes below), but the capability is a headline, not a footnote.

## Spec source and sync

- `specifications/` is the source of truth, synced from the `snowflakedb/snowflake-rest-api-specs` upstream via the fork relationship. Record the synced upstream commit in `provider-dev/config/spec_pin.json` at every build.
- Upstream syncs are reviewed diffs of the generated provider output, never silent regenerations.
- `common.yaml` (and `common-cortex-*.yaml` for the Cortex specs) contain shared schemas referenced by the other specs. The pre-process step injects/dereferences these into each service spec before the pipeline runs - the original repo's `pre_process.sh` establishes the requirement; reimplement it as a deterministic `.mjs` script.
- `result.yaml` and `spark-connect.yaml` require individual scoping decisions in the inventory (result retrieval belongs with sqlapi; Spark Connect is likely out of scope for v1 - decide with a recorded reason).

## Breaking changes from the published provider

This rebuild is a breaking change relative to the currently published `snowflake` provider, mirroring the k8s rebuild precedent. Maintain a Breaking Changes section in the README from the first mapping commit, covering at minimum: resource naming moved to plural snake_case, request body columns moved to native wire property names via the naive request body translator (not `data__` prefixed), service composition changes, and any verb reassignments (CREATE OR ALTER to `REPLACE`). The old provider version remains available in the registry for pinning.

## Design principles

- **Server and auth carried over from the original** - server `https://{endpoint}.snowflakecomputing.com` with `endpoint` as the `orgname-accountname` account identifier (a single dot-free label containing a dash - expected to avoid the any-sdk dotted-host router constraint; verify in phase 1 rather than assume). Auth is a Snowflake programmatic access token as a bearer token, env var `SNOWFLAKE_PAT`, created for a least-privileged service role. Key-pair JWT auth is a documented follow-up, not v1 scope.
- **Reads, writes, and lifecycle** - full CRUD plus resource actions. Snowflake REST actions (resume/suspend warehouse, abort/execute task, refresh dynamic table, etc) map to `EXEC`.
- **Async statement handling** - `SubmitStatement` with `async=true` returns a statement handle for polling via `GetStatementStatus`; synchronous submission returns the result set inline, with large results split into partitions retrieved via the partition parameter. The v1 posture: synchronous submission as the primary vector, partition retrieval and async polling mapped as explicit methods, transparent multi-partition assembly only if any-sdk can express it (phase 1 finding, not assumption).
- **Cortex in scope, clearly labelled** - the Cortex specs (inference, analyst, search) map as their own services. They broaden the provider from infrastructure into the AI surface; mark request/response shapes that are opaque or streaming as skipped with reason codes (streaming completions are out of scope, consistent with every prior build's streaming exclusions).

## Toolchain rules

- Use the **latest** `@stackql/provider-utils` (see [npm](https://www.npmjs.com/package/@stackql/provider-utils)) - this replaces the original repo's `openapi_to_stackql` tooling entirely. Check for a newer version before starting work; do not pin to an old minor.
- Node.js >= 20. `type: module` in package.json.
- Wrap the two CLI entry points (`provider-dev-utils.mjs`, `docgen-utils.mjs`) as npm scripts, invoked through `node` (not `.bin` shims). Pass flags with npm's `--` separator.
- A local `stackql` binary is required for testing (`$STACKQL`, `./stackql`, or on `PATH`).

## Repository layout

```
specifications/        # vendor specs, synced from snowflakedb upstream (fork) - never hand-edited
collections/           # upstream Postman collections - retained for fork sync hygiene, unused by the build
provider-dev/
  source/              # pre-processed + split per-service specs (build artifacts)
  config/              # spec pin, service name overrides, all_services.csv mappings
  openapi/src/snowflake/      # generated provider output
  scripts/             # pre_process.mjs, map_operations.mjs, pre_normalize.mjs, post_process.mjs
  docgen/provider-data/       # headerContent1.txt, headerContent2.txt for docs landing page
bin/                   # thin shell/node wrappers for npm scripts (mirror k8s repo)
tests/
  integration/         # mock Snowflake REST server + row-level assertions
  fixtures/            # seed definitions for UAT objects
  smoke_test.py        # pystackql smoke suite
website/               # Docusaurus 3.10 microsite
CLAUDE.md
README.md              # written in the style of the k8s provider README, incl Breaking Changes section
```

## Build pipeline

Every step is deterministic and re-runnable. Manual mapping decisions are applied as rules in scripts, never hand-edits to CSVs or specs. Validate-and-fail-without-writing is the standard for every script. `specifications/` is upstream content and is never modified - all transformation happens into `provider-dev/source`.

### 0. Pre-process

`node provider-dev/scripts/pre_process.mjs` copies `specifications/` into `provider-dev/source/`, injects the `common.yaml` / `common-cortex-*.yaml` shared schemas into each referencing spec, validates every result with `@apidevtools/swagger-parser`, and records the upstream commit in `spec_pin.json`. Fail without writing on any validation error.

### 1. Split into service specs

`npm run split` with `--provider-name snowflake`. The vendor layout is already one spec per resource area, so the split is a scripted regroup/merge of sibling specs into their target service. Final service consolidation (decided from the endpoint inventory, recorded in `provider-dev/config/service_names.json`):

`account` (account, managed-account), `databases` (database, schema), `tables` (table, view, dynamic-table, event-table, iceberg-table, stream), `warehouses` (warehouse, compute-pool), `roles` (role, database-role, user), `grants` (grant - split out as its own service given its flagship status; the role/database-role/user grant subresources stay with their parents in `roles`), `security` (network-policy, network-rule, password-policy, secret, tag - tag added to the candidate list; governance objects sit closest to the policy surface), `integrations` (api/catalog/notification integration, external-volume), `pipelines` (pipe, stage, task, alert, sequence), `functions` (function, procedure, user-defined-function), `apps` (notebook, streamlit, service, image-repository, artifact-repository), `sqlapi` (sqlapi, result - result retrieval belongs with statement submission), `cortex` (cortex-inference, cortex-analyst, cortex-search-service, cortex-generic-anthropic, cortex-generic-openai - the generic endpoints map through their JSON response mode; SSE-only operations are skipped). `spark-connect` is excluded for v1: its endpoints exchange base64-encoded protobuf plans and session state for the Spark Connect protocol - no SQL-addressable resource surface (reason recorded in `service_names.json`).

### 2. Generate mappings

`npm run generate-mappings`, then `node provider-dev/scripts/map_operations.mjs` populates `stackql_resource_name`, `stackql_method_name`, `stackql_verb`, `stackql_object_key` mechanically:

| Operation pattern | StackQL verb | Resource / method |
|---|---|---|
| GET collection | `SELECT` | `<resource>.list` |
| GET single | `SELECT` | `<resource>.get` |
| POST create | `INSERT` | `<resource>.create` |
| PUT create-or-alter | `REPLACE` | `<resource>.create_or_alter` - the declarative flagship verb |
| DELETE | `DELETE` | `<resource>.delete` |
| POST actions (resume, suspend, execute, abort, refresh, rename, clone, undrop) | `EXEC` | `<resource>.<action>` |
| grant privilege | `INSERT` | `grants.*.grant` |
| revoke privilege | `DELETE` | `grants.*.revoke` |
| list grants | `SELECT` | `grants.*.list` |
| SubmitStatement | phase 1 decision | see below |

`SubmitStatement` mapping is a phase 1 decision between: (a) `INSERT INTO snowflake.sqlapi.statements(statement, warehouse, ...) ... RETURNING data` - the k8s parameterized-review-kind precedent, since any-sdk does not yet route `SELECT` WHERE parameters into request bodies; (b) `EXEC` with `@statement` request body params. Evaluate both against actual result projection quality and document the choice and its upgrade path (promote to `SELECT` when the any-sdk core gap closes, per the k8s README note).

`grant.yaml` operations carry many path parameters (`granteeType`, `granteeName`, `securableType`, `securableName`, `privilege`, plus bulk-grant variants). The validation gate on unique required-parameter signatures per verb matters most here - the script must prove signature uniqueness across the grant resources or fail.

The script validates: every generator-relevant operation mapped or explicitly skipped with a reason code, method names unique per resource, overloaded SQL verbs have unique required-parameter signatures. Fail without writing on any violation. `stackql_object_key` per the actual response shapes (verify - Snowflake list responses are commonly bare arrays, which normalize wraps).

### 3. Normalize

`node provider-dev/scripts/pre_normalize.mjs` (Snowflake-specific adjustments discovered during the build), then `npm run normalize -- --api-dir provider-dev/source`. Expect discriminated `oneOf` table/integration subtypes flattened, and opaque result/row schemas lowered to JSON-blob columns.

### 4. Generate the provider

```bash
rm -rf provider-dev/openapi/*
npm run generate-provider -- \
  --provider-name snowflake \
  --input-dir provider-dev/source \
  --output-dir provider-dev/openapi/src/snowflake \
  --config-path provider-dev/config/all_services.csv \
  --servers '[{"url": "https://{endpoint}.snowflakecomputing.com", "variables": {"endpoint": {"default": "orgname-accountname"}}}]' \
  --provider-config '{"auth": {"type": "bearer", "credentialsenvvar": "SNOWFLAKE_PAT"}}' \
  --naive-req-body-translate \
  --overwrite
```

Pagination config is set from the phase 1 findings - determine the actual scheme(s) used by the control-plane list endpoints (parameter-driven `fromName`/`showLimit` windows, `Link` headers, or none) from the specs and live behaviour, and configure only what any-sdk can express, documenting the rest honestly per resource. Pagination config lives at service level (provider-level inheritance is broken in any-sdk, per the k8s build).

Then `node provider-dev/scripts/post_process.mjs` for anything the generator cannot express: statement result projection templates, partition retrieval binding, plus whatever the integration tests surface.

### 5. Test

Same four layers as the k8s repo, in order:

1. **Offline validation** - local file registry, `SHOW SERVICES/RESOURCES/METHODS`, `DESCRIBE EXTENDED` on representative resources (`snowflake.databases.databases`, `snowflake.roles.grants`, `snowflake.sqlapi.statements`)
2. **Meta-route tests** - `npm run start-server` / `npm run test-meta-routes -- snowflake --verbose` / `npm run stop-server`
3. **Integration tests** - `tests/integration/mock_snowflake_server.mjs` serving real wire shapes (capture from a trial account, redact); assert row-level results per archetype: list unwrapping, the full database `INSERT` / `REPLACE` (create-or-alter) / `DELETE` lifecycle, a grant `INSERT` / `SELECT` / `DELETE` round trip, a warehouse `EXEC` action, and statement submission with result projection including a multi-partition fixture
4. **Smoke tests** - `tests/smoke_test.py` (pystackql) against a real account: read smokes plus a disposable-object write lifecycle (database, schema, warehouse XS auto-suspend, a grant, one statement submission) in `STACKQL_SMOKE_<stamp>` naming, sweeping breadcrumbs from prior runs first; `--registry public` variant doubles as post-publish verification

A Snowflake free trial account (or a standing dev account with a least-privileged `STACKQL_SVC` role) is the live test target. Keep smoke warehouses X-Small with aggressive auto-suspend - tests must not accrue meaningful credits. Never run tests against a production account.

### 6. Publish

Push the `snowflake` dir to `providers/src` in a feature branch of [`stackql-provider-registry`](https://github.com/stackql/stackql-provider-registry) and follow the registry release flow. Verify with `registry pull snowflake` against the dev registry. This replaces the published provider - coordinate the release with the Breaking Changes documentation and the old version remains pinnable.

### 7. Docs microsite

`website/` is Docusaurus 3.10 following the shared architecture: all navbar/footer/theme/plugin configuration comes from [`stackql/docusaurus-config`](https://github.com/stackql/docusaurus-config), vendored into `.shared-config/` at build time (`vendor-config` runs automatically before `start`/`build`). Site-local files are limited to `website/provider.js` (`providerName = 'snowflake'`, `providerTitle = 'Snowflake'`), thin `docusaurus.config.js` / `sidebars.js` wrappers, shared components under `src/`, and `static/CNAME` pinning `snowflake-provider.stackql.io`.

- Author `headerContent1.txt` / `headerContent2.txt` in `provider-dev/docgen/provider-data/` (installation, PAT creation for a least-privileged role, `SNOWFLAKE_PAT` connection, the `endpoint` account identifier variable, example queries)
- `npm run generate-docs` against the generated provider dir, then `node website/scripts/sanitize-docs.mjs`
- Build locally with yarn, Node 20+; publish via GitHub Pages, DNS: `snowflake-provider.stackql.io` CNAME -> `stackql.github.io.`

Lead the docs examples with the strategy: a full account grant audit in one `SELECT`, grant and revoke as `INSERT`/`DELETE`, a `REPLACE` create-or-alter warehouse definition, warehouse and compute-pool inventory with cost-relevant columns, and a control-plane-plus-data-plane sequence (inventory the warehouses, then submit a statement against one) in a single session. At least one cross-provider example (Snowflake grants joined against Okta/Entra users).

### 8. CI

GitHub Actions: pre-process + build from the pinned specs, run integration tests against the mock server, run meta-route tests, and (secret-gated) run the smoke suite against the dev account. Add an upstream-sync check job that diffs `specifications/` against the upstream default branch and opens an issue when drift appears. Model on the k8s repo's `build-and-test.yml`.

## Writing conventions

- README and docs copy: measured, precise, no hyperbole. Third-person or passive framing for descriptive copy. The Terraform comparison is made through capability statements and runnable examples, not editorializing.
- No em dashes; use `-`. No characters not on a QWERTY keyboard; use `->` for arrows.
- Sample queries follow the k8s README style: realistic, runnable, `json_extract` for nested fields.

## Non-negotiables

1. Latest `@stackql/provider-utils`, always - the original repo's tooling is retired, not carried forward
2. The k8s `feature/provider-dev` repo is the reference pattern - deviate only with a documented reason in the README
3. `specifications/` is upstream fork content - never hand-edited; all transformation is scripted into `provider-dev/source`
4. Deterministic scripts, never hand-edits to derived artifacts
5. Every regeneration is followed by the integration test suite before commit
6. The Breaking Changes section is maintained from the first mapping commit onward
