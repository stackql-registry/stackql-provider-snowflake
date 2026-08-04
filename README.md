# StackQL Provider for Snowflake

Build repository for the refreshed `snowflake` provider for [StackQL](https://github.com/stackql/stackql), enabling SQL-based query and provisioning operations against the Snowflake REST APIs: the full control plane (databases, schemas, tables, views, warehouses, roles, users, grants, network policies, compute pools, services, stages, pipes, streams, tasks, tags, integrations, dynamic/event/Iceberg tables, notebooks, Streamlit apps, secrets, alerts), the SQL API data plane (statement submission and results), and the Cortex AI surface.

This repository is a fork of [snowflakedb/snowflake-rest-api-specs](https://github.com/snowflakedb/snowflake-rest-api-specs) - the vendor OpenAPI specs live in-repo under `specifications/` and stay current via upstream fork sync (the synced upstream commit is recorded in `provider-dev/config/spec_pin.json` at every build). The provider build scaffolding is added on top of the fork, following the repository pattern of [stackql-provider-k8s](https://github.com/stackql-registry/stackql-provider-k8s/tree/feature/provider-dev). The upstream fork's own readme is preserved as [README.upstream.md](README.upstream.md).

Status: the full pipeline is built - 13 services, 75 resources, 303 operations generated from the pinned spec sync, with offline validation, meta-route, integration (mock server) and live smoke test layers, a Docusaurus docs microsite, and a `stackql-deploy` example stack. `make all` runs everything.

## Breaking Changes from the Original Provider

This rebuild is a breaking change relative to the published `snowflake` provider (`v25.08.00322`):

- Service names consolidate from 36 singular per-spec services to 13 plural service groups: `snowflake.database.databases` -> `snowflake.databases.databases`, `snowflake.schema.schemas` -> `snowflake.databases.schemas`, `snowflake.warehouse.*` -> `snowflake.warehouses.*`, and so on. The full mapping of vendor spec to service is recorded in `provider-dev/config/service_names.json`.
- Grants move to a dedicated `grants` service with verb-shaped methods: `snowflake.grant.privileges.grant_privilege` -> `INSERT INTO snowflake.grants.grants`, `revoke_privilege` -> `DELETE FROM snowflake.grants.grants`, `grants_to.list_grants_to` -> `SELECT FROM snowflake.grants.grants`. Bulk (ALL/FUTURE) grants and grant-option revocations are their own resources (`group_grants`, `grant_options`, `group_grant_options`) so every overloaded SQL verb keeps a unique required-parameter signature.
- Method names are resource-scoped: `list_databases`/`fetch_database`/`create_database`/`delete_database` become `list`/`get`/`create`/`delete` on `databases.databases`. `create_or_alter_*` PUT operations remain mapped to `REPLACE` as `create_or_alter`.
- `REPLACE` (create-or-alter) statements address the target with a `<singular>_name` WHERE parameter (`WHERE database_name = 'X'`, `WHERE warehouse_name = 'X'`) while `SET name = 'X'` populates the request body - the create-or-alter body requires `name` and any-sdk routes a SQL column matching a declared path parameter to the path, so the PUT path parameter is renamed at pre-normalize (wire URL unchanged; see NOTES.md).
- Request body columns move from `data__` prefixed (`data__name`) to native wire property names (`name`, `accounts`) via the naive request body translator, consistent with the `k8s`, `aws` and `azure` providers.
- List responses gain object keys: bare-array list responses are wrapped at normalize time and each list method carries the matching `stackql_object_key` (`$.databases`, `$.schemas`, `$.grants_to`).
- The required `User-Agent` header parameter no longer surfaces as a required query column (stripped/defaulted in pre-normalization; in the published provider it is a required parameter on every method).
- Coverage expands to the current vendor spec sync: artifact repositories, secrets, sequences, network rules, password policies, tags, Streamlit apps and the Cortex generic (Anthropic/OpenAI-compatible) endpoints are added. Spark Connect endpoints are excluded with a recorded reason.
- The `endpoint` server variable (`orgname-accountname` account identifier) and `SNOWFLAKE_PAT` bearer authentication are unchanged.

Existing queries against the old provider will require updating. The old provider version remains available in the registry for pinning.

## Authentication

Authentication is a Snowflake programmatic access token (PAT) supplied as a bearer token via the `SNOWFLAKE_PAT` environment variable, created for a least-privileged service role. Key-pair JWT auth is a documented follow-up, not v1 scope.

```bash
export SNOWFLAKE_PAT=<your-pat>
```

Every query addresses the account through the `endpoint` server variable - the `orgname-accountname` account identifier:

```sql
SELECT name, owner FROM snowflake.databases.databases WHERE endpoint = 'MYORG-MYACCT';
```

## Mapping conventions

| Operation pattern | StackQL verb | Resource / method |
|---|---|---|
| GET collection | `SELECT` | `<resource>.list` |
| GET single | `SELECT` | `<resource>.get` |
| POST create | `INSERT` | `<resource>.create` |
| PUT create-or-alter | `REPLACE` | `<resource>.create_or_alter` - `SET name = 'X' ... WHERE <singular>_name = 'X'` |
| DELETE | `DELETE` | `<resource>.delete` |
| POST actions (`:resume`, `:suspend`, `:execute`, `:abort`, `:refresh`, `:clone`, `:undrop`, ...) | `EXEC` | `<resource>.<action>` (subresource actions compose, e.g. `databases.enable_replication`) |
| grant privilege | `INSERT` | `grants.grants.grant`, `grants.group_grants.grant` |
| revoke privilege | `DELETE` | `grants.grants.revoke` (+ `grant_options`, `group_grants`, `group_grant_options`) |
| list grants | `SELECT` | `grants.grants.list_grants_to` |
| Cortex inference (analyst message, Anthropic-compatible messages, OpenAI-compatible chat completions) | `SELECT` | SELECT-over-POST: `WHERE` members feed the request body, the completion projects as columns (matches the `anthropic`/`gemini` provider pattern). The vendor spec declares the generic endpoints as opaque passthroughs; typed request/response schemas are injected at pre-normalize |
| SubmitStatement | `INSERT` + `RETURNING` | `sqlapi.statements.submit_statement` |
| GetStatementStatus (incl. partition retrieval) | `SELECT` | `sqlapi.statements.get_statement_status` |
| CancelStatement | `DELETE` | `sqlapi.statements.cancel_statement` |
| SSE-only responses (cortex `fast-generation`, `inference:complete`), Spark Connect | skipped | streaming and protobuf protocols are out of scope |

Statement submission maps to `INSERT ... RETURNING` because StackQL does not yet route `SELECT` WHERE parameters into request bodies (any-sdk core gap, the same limitation recorded for the k8s parameterized review kinds) - promote to `SELECT` once that lands. `EXEC` offers no projection advantage against the identical `ResultSet` body and its output is not SQL-composable. The full evaluation is in [NOTES.md](NOTES.md).

```sql
-- submit a statement against a warehouse and read the result
INSERT INTO snowflake.sqlapi.statements(statement, warehouse, database, "schema", endpoint)
SELECT 'select count(*) from lineitem', 'TESTWH', 'TESTDB', 'TPCH_SF1', 'MYORG-MYACCT'
RETURNING statementHandle, resultSetMetaData, data;
```

## Pagination and pushdown

- No pagination config is shipped. The vendor specs declare RFC 5988 `Link` response headers on list endpoints, but the live control plane does not emit them (verified against a real account), and the current any-sdk release (stackql v0.10.582) hangs when a header response token is configured without a request token. List reads are single-call; the full findings and re-evaluation criteria are in [NOTES.md](NOTES.md).
- `SELECT ... LIMIT n` is pushed to the wire as the `showLimit` query parameter on the 31 list methods whose operation declares it (injected per method by `post_process.mjs`; client-side `LIMIT` remains authoritative, so pushdown never changes results).
- WHERE predicates that name a declared parameter (`like`, `fromName`, `history`, path params) are pushed into the request automatically by any-sdk's name-based parameter matching; all other predicates filter client-side. `WHERE fromName = '...'` with `LIMIT` gives explicit windowed reads where needed.
- Known toolchain defect: `EXEC` of non-GET methods panics stackql v0.10.582 (see NOTES.md section 1b) - the 100 mapped `EXEC` actions are correct in the provider docs and the test suites SKIP/XFAIL on the panic signature until a fixed binary ships.

## Build pipeline

Deterministic, re-runnable steps; manual mapping decisions are rules in scripts, never hand-edits to CSVs or specs. `specifications/` is upstream fork content and is never modified. Every target is in the Makefile:

```bash
make deps            # npm install
make build           # pre-process -> split -> pre-normalize -> mappings -> normalize -> generate
make test            # offline validation + integration (mock server) + meta-routes
make smoke           # live smoke suite, locally generated provider (needs SNOWFLAKE_PAT)
make smoke-live      # live smoke suite against the latest published provider
make docs            # generate website docs from the generated provider
make website         # build the docusaurus microsite
make all             # everything above except the live smokes
```

The individual steps, for scoping or debugging:

```bash
npm run pre-process     # inject shared components, rename reserved-word path params,
                        # validate with swagger-parser, record the spec pin
npm run build-inventory # endpoint inventory (provider-dev/config/endpoint_inventory.csv)
npm run split -- --provider-name snowflake --overwrite
npm run pre-normalize   # snowflake-specific adjustments (operationId dedupe after the merge)
npm run generate-mappings -- --provider-name snowflake --input-dir provider-dev/source --output-dir provider-dev/config
npm run map-operations  # add -- --services a,b,c to scope
npm run normalize -- --api-dir provider-dev/source
make generate           # generate-provider with servers/auth/pagination config + post-process
```

## Testing

Four layers, cheapest first; run the first three after every regeneration:

```bash
node tests/offline_validation.mjs      # SHOW/DESCRIBE assertions, no network
npm run test-integration               # row-level + wire-level assertions against a
                                       # mock Snowflake REST server (auth, pagination,
                                       # lifecycle, grants round trip, statements)
make test-meta                         # meta-route suite against a local stackql server
python tests/smoke_test.py             # live account, locally generated provider
python tests/smoke_test.py --live      # live account, latest published provider
```

The smoke suite needs `SNOWFLAKE_PAT` (env var or `.env`) and the account identifier via `--endpoint`/`SNOWFLAKE_ENDPOINT` (`orgname-accountname` - find it with `SELECT CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME();`). All created objects use `STACKQL_SMOKE_<stamp>` names, the warehouse is X-Small with 60s auto-suspend, and prior-run breadcrumbs are swept first - a full run costs well under $1 in credits. Never point it at a production account.

## Repository layout

```
specifications/        # vendor specs, synced from snowflakedb upstream (fork) - never hand-edited
collections/           # upstream Postman collections - retained for fork sync hygiene, unused by the build
provider-dev/
  source/              # pre-processed + split per-service specs (build artifacts, regenerated)
  config/              # spec_pin.json, service_names.json, endpoint_inventory.csv, all_services.csv
  scripts/             # pre_process.mjs, pre_normalize.mjs, map_operations.mjs, post_process.mjs, ...
  openapi/src/snowflake/      # generated provider output
  docgen/provider-data/       # docs landing page content (headerContent1/2.txt)
bin/                   # thin node/shell wrappers for npm scripts (mirrors stackql-provider-k8s)
tests/                 # offline validation, integration (mock server), smoke (pystackql)
website/               # Docusaurus 3.10 microsite (vendored shared config)
examples/stackql-deploy/    # declarative example stack (database, warehouse, role, grants)
Makefile               # make all = pipeline + tests + docs + site
NOTES.md               # open questions, evidence and decisions
```

## Deviations from the reference pattern

- The k8s repo's `split.mjs` fans one spec out per API group; the Snowflake vendor layout is already one spec per resource area, so `bin/split.mjs` is a scripted regroup/merge into service specs instead, with deterministic conflict resolution for shared component names (details in the script header).
- npm scripts invoke the `.mjs` entry points through `node` directly (toolchain rule; the build machine is Windows) - the server lifecycle scripts remain bash.
- The upstream fork's `Readme.md` is preserved as `README.upstream.md` because this file replaces it at the repository root.
