---
title: snowflake
hide_title: false
hide_table_of_contents: false
keywords:
  - snowflake
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage Snowflake resources using SQL
custom_edit_url: null
image: /img/stackql-cover.png
id: 'provider-intro'
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

Cloud data platform - query and provision Snowflake control plane resources (databases, warehouses, roles, grants), submit SQL statements via the data plane, and reach Cortex AI services using SQL.


:::info[Provider Summary] 

total services: __13__  
total resources: __88__  

:::

See also:
[[` SHOW `]](https://stackql.io/docs/language-spec/show) [[` DESCRIBE `]](https://stackql.io/docs/language-spec/describe)  [[` REGISTRY `]](https://stackql.io/docs/language-spec/registry)
* * *

## Installation

To use the `snowflake` provider, first [download and install `stackql`](https://stackql.io/downloads):

```bash
curl -L https://bit.ly/stackql-zip -O && unzip stackql-zip
```

Then pull the latest version of the provider:

```bash
REGISTRY PULL snowflake;
```
> To view previous provider versions or to pull a specific provider version, see [here](https://stackql.io/docs/language-spec/registry).

## Authentication

The following system environment variables are used for authentication by default:

- <CopyableCode code="SNOWFLAKE_PAT" /> - Snowflake programmatic access token, supplied as a bearer token (see <a href="https://docs.snowflake.com/en/user-guide/programmatic-access-tokens">Using programmatic access tokens</a>)

These variables are sourced at runtime (from the local machine or as CI variables/secrets). Create the token for a least-privileged service role rather than a personal or administrative user.

Every query addresses the account through the `endpoint` server variable - the account identifier in `orgname-accountname` form - supplied via the `WHERE` clause:

```sql
SELECT name, owner
FROM snowflake.databases.databases
WHERE endpoint = 'myorg-myaccount';
```

To find your account identifier, run the following in Snowsight (or see __Admin > Accounts__):

```sql
SELECT CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME();
```

> Use the account name form (`myorg-myaccount`), not the legacy account locator. See <a href="https://docs.snowflake.com/en/user-guide/admin-account-identifier">Account identifiers</a> for details.

<details>

<summary>Using different environment variables</summary>

To use different environment variables (instead of the defaults), use the `--auth` flag of the `stackql` program.  For example:

```bash

AUTH='{ "snowflake": { "type": "bearer",  "credentialsenvvar": "SNOWFLAKE_PAT" }}'
stackql shell --auth="${AUTH}"

```
or using PowerShell:

```powershell

$Auth = "{ 'snowflake': { 'type': 'bearer',  'credentialsenvvar': 'SNOWFLAKE_PAT' }}"
stackql.exe shell --auth=$Auth

```
</details>

## Database inventory

All databases in the account, with ownership and retention settings:

```sql
SELECT
  name,
  owner,
  kind,
  retention_time,
  comment
FROM snowflake.databases.databases
WHERE endpoint = 'myorg-myaccount'
ORDER BY name;
```

## Grant audit

Grants are REST resources - granting is an `INSERT`, revoking is a `DELETE`, and auditing is a `SELECT`. Every grant held by a role, straight from the account:

```sql
SELECT
  securable_type,
  securable_name,
  privileges,
  grant_option,
  granted_by_name
FROM snowflake.grants.grants
WHERE granteeType = 'role'
AND granteeName = 'ANALYST'
AND endpoint = 'myorg-myaccount';
```

Repeat per grantee (`role`, `user`, `database-role`, `application-role`, `share`) to audit the whole account - no state file to drift, nothing to reconcile.

## Declarative warehouse definition

`REPLACE` maps to Snowflake's `CREATE OR ALTER` semantics - the statement below creates the warehouse if it does not exist, or alters it to match if it does. Idempotent and re-runnable, no state required:

```sql
REPLACE snowflake.warehouses.warehouses
SET
  warehouse_size = 'XSMALL',
  auto_suspend = 60,
  auto_resume = 'true',
  comment = 'reporting warehouse, managed by stackql'
WHERE warehouse_name = 'REPORTING_WH'
AND endpoint = 'myorg-myaccount';
```

## Data plane: submit a statement

Statement submission is an `INSERT` with a `RETURNING` clause - inventory the control plane and query the data inside it in the same session. `"User-Agent"` is a required header carried as a column; its hyphenated wire name is addressed with double quotes:

```sql
INSERT INTO snowflake.sqlapi.statements (
  statement,
  warehouse,
  "User-Agent",
  endpoint
)
SELECT
  'SELECT count(*) FROM lineitem',
  'REPORTING_WH',
  'stackql/1.0',
  'myorg-myaccount'
RETURNING statementHandle, resultSetMetaData, data;
```


## Services
<div class="row">
<div class="providerDocColumn">
<a href="/services/account/">account</a><br />
<a href="/services/apps/">apps</a><br />
<a href="/services/cortex/">cortex</a><br />
<a href="/services/databases/">databases</a><br />
<a href="/services/functions/">functions</a><br />
<a href="/services/grants/">grants</a><br />
<a href="/services/integrations/">integrations</a><br />
</div>
<div class="providerDocColumn">
<a href="/services/pipelines/">pipelines</a><br />
<a href="/services/roles/">roles</a><br />
<a href="/services/security/">security</a><br />
<a href="/services/sqlapi/">sqlapi</a><br />
<a href="/services/tables/">tables</a><br />
<a href="/services/warehouses/">warehouses</a><br />
</div>
</div>
