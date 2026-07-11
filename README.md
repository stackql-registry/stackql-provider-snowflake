# StackQL Provider for Snowflake

Build repository for the refreshed `snowflake` provider for [StackQL](https://github.com/stackql/stackql), enabling SQL-based query and provisioning operations against the Snowflake REST APIs: the full control plane (databases, schemas, tables, views, warehouses, roles, users, grants, network policies, compute pools, services, stages, pipes, streams, tasks, tags, integrations, dynamic/event/Iceberg tables, notebooks, Streamlit apps, secrets, alerts), the SQL API data plane (statement submission and results), and the Cortex AI surface.

This repository is a fork of [snowflakedb/snowflake-rest-api-specs](https://github.com/snowflakedb/snowflake-rest-api-specs) - the vendor OpenAPI specs live in-repo under `specifications/` and stay current via upstream fork sync (the synced upstream commit is recorded in `provider-dev/config/spec_pin.json` at every build). The provider build scaffolding is added on top of the fork, following the repository pattern of [stackql-provider-k8s](https://github.com/stackql-registry/stackql-provider-k8s/tree/feature/provider-dev). The upstream fork's own readme is preserved as [README.upstream.md](README.upstream.md).

Status: phase 1 - pre-processing, endpoint inventory, service split and pilot mapping (`databases`, `grants`, `sqlapi`) are complete. Normalize, provider generation, tests and docs follow in phase 2.

## Breaking Changes from the Original Provider

This rebuild is a breaking change relative to the published `snowflake` provider (`v25.08.00322`):

- Service names consolidate from 36 singular per-spec services to 13 plural service groups: `snowflake.database.databases` -> `snowflake.databases.databases`, `snowflake.schema.schemas` -> `snowflake.databases.schemas`, `snowflake.warehouse.*` -> `snowflake.warehouses.*`, and so on. The full mapping of vendor spec to service is recorded in `provider-dev/config/service_names.json`.
- Grants move to a dedicated `grants` service with verb-shaped methods: `snowflake.grant.privileges.grant_privilege` -> `INSERT INTO snowflake.grants.grants`, `revoke_privilege` -> `DELETE FROM snowflake.grants.grants`, `grants_to.list_grants_to` -> `SELECT FROM snowflake.grants.grants`. Bulk (ALL/FUTURE) grants and grant-option revocations are their own resources (`group_grants`, `grant_options`, `group_grant_options`) so every overloaded SQL verb keeps a unique required-parameter signature.
- Method names are resource-scoped: `list_databases`/`fetch_database`/`create_database`/`delete_database` become `list`/`get`/`create`/`delete` on `databases.databases`. `create_or_alter_*` PUT operations remain mapped to `REPLACE` as `create_or_alter`.
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
| PUT create-or-alter | `REPLACE` | `<resource>.create_or_alter` |
| DELETE | `DELETE` | `<resource>.delete` |
| POST actions (`:resume`, `:suspend`, `:execute`, `:abort`, `:refresh`, `:clone`, `:undrop`, ...) | `EXEC` | `<resource>.<action>` (subresource actions compose, e.g. `databases.enable_replication`) |
| grant privilege | `INSERT` | `grants.grants.grant`, `grants.group_grants.grant` |
| revoke privilege | `DELETE` | `grants.grants.revoke` (+ `grant_options`, `group_grants`, `group_grant_options`) |
| list grants | `SELECT` | `grants.grants.list_grants_to` |
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

## Build pipeline

Deterministic, re-runnable steps; manual mapping decisions are rules in scripts, never hand-edits to CSVs or specs. `specifications/` is upstream fork content and is never modified.

```bash
npm install

# 0. pre-process: inject common.yaml / common-cortex-*.yaml shared components,
#    rename reserved-word path params, validate with swagger-parser,
#    record the spec pin. Fails without writing on any error.
npm run pre-process

# endpoint inventory (provider-dev/config/endpoint_inventory.csv)
npm run build-inventory

# 1. split: regroup the pre-processed vendor specs into the 13 service specs
#    per provider-dev/config/service_names.json
npm run split -- --provider-name snowflake

# 2. mappings: analyze to all_services.csv, then populate the stackql_* columns
npm run generate-mappings -- --provider-name snowflake --input-dir provider-dev/source --output-dir provider-dev/config
npm run map-operations                      # add -- --services a,b,c to scope

# 3-4. normalize + generate (phase 2)
# 5. test (phase 2): offline validation, meta-routes, integration (mock server), smoke (pystackql)
```

## Repository layout

```
specifications/        # vendor specs, synced from snowflakedb upstream (fork) - never hand-edited
collections/           # upstream Postman collections - retained for fork sync hygiene, unused by the build
provider-dev/
  source/              # pre-processed + split per-service specs (build artifacts, regenerated)
  config/              # spec_pin.json, service_names.json, endpoint_inventory.csv, all_services.csv
  scripts/             # pre_process.mjs, record_spec_pin.mjs, build_inventory.mjs, map_operations.mjs
  openapi/src/snowflake/      # generated provider output (phase 2)
  docgen/provider-data/       # docs landing page content (phase 2)
bin/                   # thin node/shell wrappers for npm scripts (mirrors stackql-provider-k8s)
tests/                 # integration (mock server) + smoke (pystackql) suites (phase 2)
website/               # Docusaurus microsite (phase 2)
NOTES.md               # phase 1 open questions, evidence and decisions
```

## Deviations from the reference pattern

- The k8s repo's `split.mjs` fans one spec out per API group; the Snowflake vendor layout is already one spec per resource area, so `bin/split.mjs` is a scripted regroup/merge into service specs instead, with deterministic conflict resolution for shared component names (details in the script header).
- npm scripts invoke the `.mjs` entry points through `node` directly (toolchain rule; the build machine is Windows) - the server lifecycle scripts remain bash.
- The upstream fork's `Readme.md` is preserved as `README.upstream.md` because this file replaces it at the repository root.
