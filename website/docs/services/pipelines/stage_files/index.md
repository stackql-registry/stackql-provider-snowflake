--- 
title: stage_files
hide_title: false
hide_table_of_contents: false
keywords:
  - stage_files
  - pipelines
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

Creates, updates, deletes, gets or lists a <code>stage_files</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="stage_files" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.pipelines.stage_files" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

A file on a snowflake stage.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Name of the file.</td>
</tr>
<tr>
    <td><CopyableCode code="last_modified" /></td>
    <td><code>string</code></td>
    <td>Date and time when the file was last modified.</td>
</tr>
<tr>
    <td><CopyableCode code="md5" /></td>
    <td><code>string</code></td>
    <td>md5 hash of the file.</td>
</tr>
<tr>
    <td><CopyableCode code="size" /></td>
    <td><code>string</code></td>
    <td>Size of the file.</td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-pattern"><code>pattern</code></a></td>
    <td>List files in the stage -- this is equivalent to LIST @stage.</td>
</tr>
<tr>
    <td><a href="#presigned_url"><CopyableCode code="presigned_url" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-filePath"><code>filePath</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Generate a presigned url and optionally encryption materials for uploading and downloading files.</td>
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
<tr id="parameter-database_name">
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Identifier (i.e. name) for the database to which the resource belongs. You can use the `/api/v2/databases` GET request to get a list of available databases.</td>
</tr>
<tr id="parameter-endpoint">
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td>Organization and account identifier (orgname-accountname) (default: orgname-accountname)</td>
</tr>
<tr id="parameter-filePath">
    <td><CopyableCode code="filePath" /></td>
    <td><code>string</code></td>
    <td>The full stage path of the file.</td>
</tr>
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Identifier (i.e. name) for the resource.</td>
</tr>
<tr id="parameter-schema_name">
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Identifier (i.e. name) for the schema to which the resource belongs. You can use the `/api/v2/databases/&#123;database&#125;/schemas` GET request to get a list of available schemas for the specified database.</td>
</tr>
<tr id="parameter-pattern">
    <td><CopyableCode code="pattern" /></td>
    <td><code>string</code></td>
    <td>Parameter that filters the command output by a regular expression pattern.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

List files in the stage -- this is equivalent to LIST @stage.

```sql
SELECT
name,
last_modified,
md5,
size
FROM snowflake.pipelines.stage_files
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND pattern = '{{ pattern }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="presigned_url"
    values={[
        { label: 'presigned_url', value: 'presigned_url' }
    ]}
>
<TabItem value="presigned_url">

Generate a presigned url and optionally encryption materials for uploading and downloading files.

```sql
EXEC snowflake.pipelines.stage_files.presigned_url 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@filePath='{{ filePath }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"expiration_time": {{ expiration_time }}
}'
;
```
</TabItem>
</Tabs>
