--- 
title: statements
hide_title: false
hide_table_of_contents: false
keywords:
  - statements
  - sqlapi
  - snowflake
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage snowflake resources using SQL
custom_edit_url: null
image: /img/stackql-snowflake-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>statements</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="statements" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.sqlapi.statements" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_statement_status"
    values={[
        { label: 'get_statement_status', value: 'get_statement_status' }
    ]}
>
<TabItem value="get_statement_status">

The statement was executed successfully, and the response includes any data requested.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="code" /></td>
    <td><code>string</code></td>
    <td> (example: 000123)</td>
</tr>
<tr>
    <td><CopyableCode code="createdOn" /></td>
    <td><code>integer (int64)</code></td>
    <td>Timestamp that specifies when the statement execution started.‌ The timestamp is expressed in milliseconds since the epoch.‌</td>
</tr>
<tr>
    <td><CopyableCode code="data" /></td>
    <td><code>array</code></td>
    <td>Result set data.</td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td> (example: successfully executed)</td>
</tr>
<tr>
    <td><CopyableCode code="resultSetMetaData" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="sqlState" /></td>
    <td><code>string</code></td>
    <td> (example: 42601)</td>
</tr>
<tr>
    <td><CopyableCode code="statementHandle" /></td>
    <td><code>string (uuid)</code></td>
    <td> (example: 536fad38-b564-4dc5-9892-a4543504df6c)</td>
</tr>
<tr>
    <td><CopyableCode code="statementStatusUrl" /></td>
    <td><code>string (uri)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="stats" /></td>
    <td><code>object</code></td>
    <td>these stats might not be available for each request.</td>
</tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Methods

The following methods are available for this resource:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Accessible by</th>
    <th>Required Params</th>
    <th>Optional Params</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><a href="#get_statement_status"><CopyableCode code="get_statement_status" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-statement_handle"><code>statement_handle</code></a>, <a href="#parameter-User-Agent"><code>User-Agent</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-requestId"><code>requestId</code></a>, <a href="#parameter-partition"><code>partition</code></a>, <a href="#parameter-Accept"><code>Accept</code></a>, <a href="#parameter-X-Snowflake-Authorization-Token-Type"><code>X-Snowflake-Authorization-Token-Type</code></a></td>
    <td>Checks the status of the execution of the statement with the specified statement handle. If the statement was executed successfully, the operation returns the requested partition of the result set.</td>
</tr>
<tr>
    <td><a href="#submit_statement"><CopyableCode code="submit_statement" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-User-Agent"><code>User-Agent</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-requestId"><code>requestId</code></a>, <a href="#parameter-async"><code>async</code></a>, <a href="#parameter-nullable"><code>nullable</code></a>, <a href="#parameter-Accept"><code>Accept</code></a>, <a href="#parameter-X-Snowflake-Authorization-Token-Type"><code>X-Snowflake-Authorization-Token-Type</code></a></td>
    <td>Submits one or more statements for execution. You can specify that the statement should be executed asynchronously.</td>
</tr>
<tr>
    <td><a href="#cancel_statement"><CopyableCode code="cancel_statement" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-statement_handle"><code>statement_handle</code></a>, <a href="#parameter-User-Agent"><code>User-Agent</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-requestId"><code>requestId</code></a>, <a href="#parameter-Accept"><code>Accept</code></a>, <a href="#parameter-X-Snowflake-Authorization-Token-Type"><code>X-Snowflake-Authorization-Token-Type</code></a></td>
    <td>Cancels the execution of the statement with the specified statement handle.</td>
</tr>
</tbody>
</table>

## Parameters

Parameters can be passed in the `WHERE` clause of a query. Check the [Methods](#methods) section to see which parameters are required or optional for each operation.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr id="parameter-User-Agent">
    <td><CopyableCode code="User-Agent" /></td>
    <td><code>string</code></td>
    <td>Set this to the name and version of your application (e.g. “applicationName/applicationVersion”). You must use a value that complies with RFC 7231.</td>
</tr>
<tr id="parameter-endpoint">
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td>Organization and account identifier (orgname-accountname) (default: orgname-accountname)</td>
</tr>
<tr id="parameter-statement_handle">
    <td><CopyableCode code="statement_handle" /></td>
    <td><code>string (uuid)</code></td>
    <td>The handle of the statement that you want to use (e.g. to fetch the result set or cancel execution).</td>
</tr>
<tr id="parameter-Accept">
    <td><CopyableCode code="Accept" /></td>
    <td><code>string</code></td>
    <td>The response payload format. The schema should be specified in resultSetMetaData in the request payload.</td>
</tr>
<tr id="parameter-X-Snowflake-Authorization-Token-Type">
    <td><CopyableCode code="X-Snowflake-Authorization-Token-Type" /></td>
    <td><code>string</code></td>
    <td>Specify the authorization token type for the Authorization header. KEYPAIR_JWT is for Keypair JWT or OAUTH for oAuth token. If not specified, OAUTH is assumed.</td>
</tr>
<tr id="parameter-async">
    <td><CopyableCode code="async" /></td>
    <td><code>boolean</code></td>
    <td>Set to true to execute the statement asynchronously and return the statement handle. If the parameter is not specified or is set to false, a statement is executed and the first result is returned if the execution is completed in 45 seconds. If the statement execution takes longer to complete, the statement handle is returned.</td>
</tr>
<tr id="parameter-nullable">
    <td><CopyableCode code="nullable" /></td>
    <td><code>boolean</code></td>
    <td>Set to true to execute the statement to generate the result set including null. If the parameter is set to false, the result set value null will be replaced with a string 'null'.</td>
</tr>
<tr id="parameter-partition">
    <td><CopyableCode code="partition" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of the partition of results to return. The number can range from 0 to the total number of partitions minus 1.</td>
</tr>
<tr id="parameter-requestId">
    <td><CopyableCode code="requestId" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID of the API request. This ensures that the execution is idempotent. If not specified, a new UUID is generated and assigned.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_statement_status"
    values={[
        { label: 'get_statement_status', value: 'get_statement_status' }
    ]}
>
<TabItem value="get_statement_status">

Checks the status of the execution of the statement with the specified statement handle. If the statement was executed successfully, the operation returns the requested partition of the result set.

```sql
SELECT
code,
createdOn,
data,
message,
resultSetMetaData,
sqlState,
statementHandle,
statementStatusUrl,
stats
FROM snowflake.sqlapi.statements
WHERE statement_handle = '{{ statement_handle }}' -- required
AND "User-Agent" = '{{ User-Agent }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND requestId = '{{ requestId }}'
AND partition = '{{ partition }}'
AND Accept = '{{ Accept }}'
AND "X-Snowflake-Authorization-Token-Type" = '{{ X-Snowflake-Authorization-Token-Type }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="submit_statement"
    values={[
        { label: 'submit_statement', value: 'submit_statement' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="submit_statement">

Submits one or more statements for execution. You can specify that the statement should be executed asynchronously.

```sql
INSERT INTO snowflake.sqlapi.statements (
statement,
timeout,
"database",
"schema",
warehouse,
role,
bindings,
parameters,
"User-Agent",
endpoint,
requestId,
async,
nullable,
Accept,
"X-Snowflake-Authorization-Token-Type"
)
SELECT 
'{{ statement }}',
{{ timeout }},
'{{ database }}',
'{{ schema }}',
'{{ warehouse }}',
'{{ role }}',
'{{ bindings }}',
'{{ parameters }}',
'{{ User-Agent }}',
'{{ endpoint }}',
'{{ requestId }}',
'{{ async }}',
'{{ nullable }}',
'{{ Accept }}',
'{{ X-Snowflake-Authorization-Token-Type }}'
RETURNING
code,
createdOn,
data,
message,
resultSetMetaData,
sqlState,
statementHandle,
statementStatusUrl,
stats
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: statements
  props:
    - name: User-Agent
      value: "{{ User-Agent }}"
      description: Required parameter for the statements resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the statements resource.
    - name: statement
      value: "{{ statement }}"
      description: |
        SQL statement or batch of SQL statements to execute. You can specify query, DML and DDL statements. The following statements are not supported: PUT, GET, USE, ALTER SESSION, BEGIN, COMMIT, ROLLBACK, statements that set session variables, and statements that create temporary tables and stages.
    - name: timeout
      value: {{ timeout }}
      description: |
        Timeout in seconds for statement execution. If the execution of a statement takes longer than the specified timeout, the execution is automatically canceled. To set the timeout to the maximum value (604800 seconds), set timeout to 0.
    - name: database
      value: "{{ database }}"
      description: |
        Database in which the statement should be executed. The value in this field is case-sensitive.
    - name: schema
      value: "{{ schema }}"
      description: |
        Schema in which the statement should be executed. The value in this field is case-sensitive.
    - name: warehouse
      value: "{{ warehouse }}"
      description: |
        Warehouse to use when executing the statement. The value in this field is case-sensitive.
    - name: role
      value: "{{ role }}"
      description: |
        Role to use when executing the statement. The value in this field is case-sensitive.
    - name: bindings
      value: "{{ bindings }}"
      description: |
        Values of bind variables in the SQL statement. When executing the statement, Snowflake replaces placeholders ('?' and ':name') in the statement with these specified values.
    - name: parameters
      description: |
        Session parameters that should be set before executing the statement.
      value:
        timezone: "{{ timezone }}"
        query_tag: "{{ query_tag }}"
        binary_output_format: "{{ binary_output_format }}"
        date_output_format: "{{ date_output_format }}"
        time_output_format: "{{ time_output_format }}"
        timestamp_output_format: "{{ timestamp_output_format }}"
        timestamp_ltz_output_format: "{{ timestamp_ltz_output_format }}"
        timestamp_ntz_output_format: "{{ timestamp_ntz_output_format }}"
        timestamp_tz_output_format: "{{ timestamp_tz_output_format }}"
        multi_statement_count: {{ multi_statement_count }}
    - name: requestId
      value: "{{ requestId }}"
      description: Unique ID of the API request. This ensures that the execution is idempotent. If not specified, a new UUID is generated and assigned.
      description: Unique ID of the API request. This ensures that the execution is idempotent. If not specified, a new UUID is generated and assigned.
    - name: async
      value: {{ async }}
      description: Set to true to execute the statement asynchronously and return the statement handle. If the parameter is not specified or is set to false, a statement is executed and the first result is returned if the execution is completed in 45 seconds. If the statement execution takes longer to complete, the statement handle is returned.
      description: Set to true to execute the statement asynchronously and return the statement handle. If the parameter is not specified or is set to false, a statement is executed and the first result is returned if the execution is completed in 45 seconds. If the statement execution takes longer to complete, the statement handle is returned.
    - name: nullable
      value: {{ nullable }}
      description: Set to true to execute the statement to generate the result set including null. If the parameter is set to false, the result set value null will be replaced with a string 'null'.
      description: Set to true to execute the statement to generate the result set including null. If the parameter is set to false, the result set value null will be replaced with a string 'null'.
    - name: Accept
      value: "{{ Accept }}"
      description: The response payload format. The schema should be specified in resultSetMetaData in the request payload.
      description: The response payload format. The schema should be specified in resultSetMetaData in the request payload.
    - name: X-Snowflake-Authorization-Token-Type
      value: "{{ X-Snowflake-Authorization-Token-Type }}"
      description: Specify the authorization token type for the Authorization header. KEYPAIR_JWT is for Keypair JWT or OAUTH for oAuth token. If not specified, OAUTH is assumed.
      description: Specify the authorization token type for the Authorization header. KEYPAIR_JWT is for Keypair JWT or OAUTH for oAuth token. If not specified, OAUTH is assumed.
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="cancel_statement"
    values={[
        { label: 'cancel_statement', value: 'cancel_statement' }
    ]}
>
<TabItem value="cancel_statement">

Cancels the execution of the statement with the specified statement handle.

```sql
DELETE FROM snowflake.sqlapi.statements
WHERE statement_handle = '{{ statement_handle }}' --required
AND "User-Agent" = '{{ User-Agent }}' --required
AND endpoint = '{{ endpoint }}' --required
AND requestId = '{{ requestId }}'
AND Accept = '{{ Accept }}'
AND "X-Snowflake-Authorization-Token-Type" = '{{ X-Snowflake-Authorization-Token-Type }}'
;
```
</TabItem>
</Tabs>
