--- 
title: tags
hide_title: false
hide_table_of_contents: false
keywords:
  - tags
  - security
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

Creates, updates, deletes, gets or lists a <code>tags</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="tags" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.security.tags" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

successful

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
    <td>Name of the tag (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the tag is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the tag is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="allowed_values" /></td>
    <td><code>array</code></td>
    <td>Possible string values that can be assigned with the tag when the tag is set on an object</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Comment for the tag</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the tag was created.</td>
</tr>
<tr>
    <td><CopyableCode code="on_conflict" /></td>
    <td><code>string</code></td>
    <td>Specifies what happens when there is a conflict between the values of propagated tags</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the tag (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the tag</td>
</tr>
<tr>
    <td><CopyableCode code="propagate" /></td>
    <td><code>string</code></td>
    <td>Specifies that the tag will be automatically propagated from source objects to target objects</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake tag

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
    <td>Name of the tag (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the tag is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the tag is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="allowed_values" /></td>
    <td><code>array</code></td>
    <td>Possible string values that can be assigned with the tag when the tag is set on an object</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Comment for the tag</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the tag was created.</td>
</tr>
<tr>
    <td><CopyableCode code="on_conflict" /></td>
    <td><code>string</code></td>
    <td>Specifies what happens when there is a conflict between the values of propagated tags</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the tag (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the tag</td>
</tr>
<tr>
    <td><CopyableCode code="propagate" /></td>
    <td><code>string</code></td>
    <td>Specifies that the tag will be automatically propagated from source objects to target objects</td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Fetch a tag</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a></td>
    <td>List tags</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create a tag</td>
</tr>
<tr>
    <td><a href="#create_or_alter"><CopyableCode code="create_or_alter" /></a></td>
    <td><CopyableCode code="replace" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Create or update a tag</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete a tag</td>
</tr>
<tr>
    <td><a href="#undrop"><CopyableCode code="undrop" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Undrop a tag</td>
</tr>
<tr>
    <td><a href="#rename"><CopyableCode code="rename" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-targetName"><code>targetName</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a>, <a href="#parameter-targetDatabase"><code>targetDatabase</code></a>, <a href="#parameter-targetSchema"><code>targetSchema</code></a></td>
    <td>Rename a tag with a new identifier</td>
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
<tr id="parameter-targetName">
    <td><CopyableCode code="targetName" /></td>
    <td><code>string</code></td>
    <td>Name of the target resource.</td>
</tr>
<tr id="parameter-createMode">
    <td><CopyableCode code="createMode" /></td>
    <td><code>string</code></td>
    <td>Parameter allowing support for different modes of resource creation. Possible values include: - `errorIfExists`: Throws an error if you try to create a resource that already exists. - `orReplace`: Automatically replaces the existing resource with the current one. - `ifNotExists`: Creates a new resource when an alter is requested for a non-existent resource.</td>
</tr>
<tr id="parameter-ifExists">
    <td><CopyableCode code="ifExists" /></td>
    <td><code>boolean</code></td>
    <td>Parameter that specifies how to handle the request for a resource that does not exist: - `true`: The endpoint does not throw an error if the resource does not exist. It returns a 200 success response, but does not take any action on the resource. - `false`: The endpoint throws an error if the resource doesn't exist.</td>
</tr>
<tr id="parameter-like">
    <td><CopyableCode code="like" /></td>
    <td><code>string</code></td>
    <td>Parameter to filter the command output by resource name. Uses case-insensitive pattern matching, with support for SQL wildcard characters.</td>
</tr>
<tr id="parameter-targetDatabase">
    <td><CopyableCode code="targetDatabase" /></td>
    <td><code>string</code></td>
    <td>Database of the target resource. Defaults to the source's database</td>
</tr>
<tr id="parameter-targetSchema">
    <td><CopyableCode code="targetSchema" /></td>
    <td><code>string</code></td>
    <td>Schema of the target resource. Defaults to the source's schema</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Fetch a tag

```sql
SELECT
name,
database_name,
schema_name,
allowed_values,
comment,
created_on,
on_conflict,
owner,
owner_role_type,
propagate
FROM snowflake.security.tags
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

List tags

```sql
SELECT
name,
database_name,
schema_name,
allowed_values,
comment,
created_on,
on_conflict,
owner,
owner_role_type,
propagate
FROM snowflake.security.tags
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND "like" = '{{ like }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Create a tag

```sql
INSERT INTO snowflake.security.tags (
allowed_values,
propagate,
on_conflict,
comment,
name,
database_name,
schema_name,
endpoint,
createMode
)
SELECT 
'{{ allowed_values }}',
'{{ propagate }}',
'{{ on_conflict }}',
'{{ comment }}',
'{{ name }}' /* required */,
'{{ database_name }}',
'{{ schema_name }}',
'{{ endpoint }}',
'{{ createMode }}'
RETURNING
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: tags
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the tags resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the tags resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the tags resource.
    - name: allowed_values
      value:
        - "{{ allowed_values }}"
      description: |
        Possible string values that can be assigned with the tag when the tag is set on an object
    - name: propagate
      value: "{{ propagate }}"
      description: |
        Specifies that the tag will be automatically propagated from source objects to target objects
    - name: on_conflict
      value: "{{ on_conflict }}"
      description: |
        Specifies what happens when there is a conflict between the values of propagated tags
    - name: comment
      value: "{{ comment }}"
      description: |
        Comment for the tag
    - name: name
      value: "{{ name }}"
      description: |
        Name of the tag
    - name: createMode
      value: "{{ createMode }}"
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
`}</CodeBlock>

</TabItem>
</Tabs>


## `REPLACE` examples

<Tabs
    defaultValue="create_or_alter"
    values={[
        { label: 'create_or_alter', value: 'create_or_alter' }
    ]}
>
<TabItem value="create_or_alter">

Create or update a tag

```sql
REPLACE snowflake.security.tags
SET 
allowed_values = '{{ allowed_values }}',
propagate = '{{ propagate }}',
on_conflict = '{{ on_conflict }}',
comment = '{{ comment }}',
name = '{{ name }}'
WHERE 
database_name = '{{ database_name }}' --required
AND schema_name = '{{ schema_name }}' --required
AND name = '{{ name }}' --required
AND endpoint = '{{ endpoint }}' --required
AND name = '{{ name }}' --required
RETURNING
status;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Delete a tag

```sql
DELETE FROM snowflake.security.tags
WHERE database_name = '{{ database_name }}' --required
AND schema_name = '{{ schema_name }}' --required
AND name = '{{ name }}' --required
AND endpoint = '{{ endpoint }}' --required
AND ifExists = '{{ ifExists }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="undrop"
    values={[
        { label: 'undrop', value: 'undrop' },
        { label: 'rename', value: 'rename' }
    ]}
>
<TabItem value="undrop">

Undrop a tag

```sql
EXEC snowflake.security.tags.undrop 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required
;
```
</TabItem>
<TabItem value="rename">

Rename a tag with a new identifier

```sql
EXEC snowflake.security.tags.rename 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@targetName='{{ targetName }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@ifExists={{ ifExists }}, 
@targetDatabase='{{ targetDatabase }}', 
@targetSchema='{{ targetSchema }}'
;
```
</TabItem>
</Tabs>
