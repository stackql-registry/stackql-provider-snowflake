# snowflake-analytics stackql-deploy example

An example [stackql-deploy](https://github.com/stackql/stackql-deploy) stack
for the refreshed `snowflake` provider. It provisions a transient analytics
database with a `RAW` schema and an `EVENTS` table, an X-Small auto-suspend
warehouse, an analyst role, and the role's grants - all declaratively, with
no state file.

The stack demonstrates the provider's headline capabilities:

- **Grants as data** - granting is an `INSERT` into `snowflake.grants.grants`,
  revoking is a `DELETE`, and the `exists`/audit path is a `SELECT`
- **CREATE OR ALTER as `REPLACE`** - the `update` anchors use the `REPLACE`
  verb, mapping to Snowflake's create-or-alter PUT operations
- **Native table DDL through the REST API** - the `EVENTS` table is created
  with a typed `columns` list, no SQL string templating

## Prerequisites

- `stackql-deploy` on your PATH
- `SNOWFLAKE_PAT` set in the host environment - a programmatic access token
  for a role that can create databases, warehouses and roles
- Your account identifier in `orgname-accountname` form. Find it in Snowsight
  with `SELECT CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME();`

## Usage

```bash
# create or update the stack in the dev environment
stackql-deploy build examples/stackql-deploy/snowflake-analytics dev \
  -e SNOWFLAKE_ENDPOINT=MGBHLAO-CY92030

# verify the stack without mutating anything
stackql-deploy test examples/stackql-deploy/snowflake-analytics dev \
  -e SNOWFLAKE_ENDPOINT=MGBHLAO-CY92030

# tear it down (reverse order: grants, role, warehouse, table, schema, database)
stackql-deploy teardown examples/stackql-deploy/snowflake-analytics dev \
  -e SNOWFLAKE_ENDPOINT=MGBHLAO-CY92030
```

The warehouse is X-Small with `auto_suspend = 60` and starts suspended - a
build-test-teardown cycle costs a few cents at most.
