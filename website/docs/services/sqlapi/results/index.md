--- 
title: results
hide_title: false
hide_table_of_contents: false
keywords:
  - results
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

Creates, updates, deletes, gets or lists a <code>results</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="results" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.sqlapi.results" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="fetch_result"
    values={[
        { label: 'fetch_result', value: 'fetch_result' }
    ]}
>
<TabItem value="fetch_result">

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
    <td><a href="#fetch_result"><CopyableCode code="fetch_result" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-result_handler"><code>result_handler</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-page"><code>page</code></a></td>
    <td>Get result status or the result when it is ready.</td>
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
<tr id="parameter-endpoint">
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td>Organization and account identifier (orgname-accountname) (default: orgname-accountname)</td>
</tr>
<tr id="parameter-result_handler">
    <td><CopyableCode code="result_handler" /></td>
    <td><code>string</code></td>
    <td>The opaque result id.</td>
</tr>
<tr id="parameter-page">
    <td><CopyableCode code="page" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of the page of results to return. The number can range from 0 to the total number of pages minus 1.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="fetch_result"
    values={[
        { label: 'fetch_result', value: 'fetch_result' }
    ]}
>
<TabItem value="fetch_result">

Get result status or the result when it is ready.

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
FROM snowflake.sqlapi.results
WHERE result_handler = '{{ result_handler }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND page = '{{ page }}'
;
```
</TabItem>
</Tabs>
