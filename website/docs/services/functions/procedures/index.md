--- 
title: procedures
hide_title: false
hide_table_of_contents: false
keywords:
  - procedures
  - functions
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

Creates, updates, deletes, gets or lists a <code>procedures</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="procedures" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.functions.procedures" /></td></tr>
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
    <td>Name of the procedure (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>The name of the database in which the function/procedure exists. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>The name of the schema in which the function/procedure exists. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="arguments" /></td>
    <td><code>array</code></td>
    <td>List of arguments for the function/procedure</td>
</tr>
<tr>
    <td><CopyableCode code="body" /></td>
    <td><code>string</code></td>
    <td>Function/procedure definition</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Specifies a comment for the function/procedure</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date and time when the function/procedure was created</td>
</tr>
<tr>
    <td><CopyableCode code="execute_as" /></td>
    <td><code>string</code></td>
    <td>What permissions should the procedure execution be called with (CALLER, OWNER)</td>
</tr>
<tr>
    <td><CopyableCode code="is_builtin" /></td>
    <td><code>boolean</code></td>
    <td>If the function/procedure is built-in or not (user-defined)</td>
</tr>
<tr>
    <td><CopyableCode code="is_secure" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether the function/procedure is secure or not</td>
</tr>
<tr>
    <td><CopyableCode code="language_config" /></td>
    <td><code>object</code></td>
    <td>Language that the function/procedure is written in</td>
</tr>
<tr>
    <td><CopyableCode code="max_num_arguments" /></td>
    <td><code>integer</code></td>
    <td>The maximum number of arguments</td>
</tr>
<tr>
    <td><CopyableCode code="min_num_arguments" /></td>
    <td><code>integer</code></td>
    <td>The minimum number of arguments</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the function/procedure</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the function/procedure</td>
</tr>
<tr>
    <td><CopyableCode code="return_type" /></td>
    <td><code>object</code></td>
    <td>Return type of the function/procedure. Should be a SQL data type or a table</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake procedure

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
    <td>Name of the procedure (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>The name of the database in which the function/procedure exists. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>The name of the schema in which the function/procedure exists. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="arguments" /></td>
    <td><code>array</code></td>
    <td>List of arguments for the function/procedure</td>
</tr>
<tr>
    <td><CopyableCode code="body" /></td>
    <td><code>string</code></td>
    <td>Function/procedure definition</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Specifies a comment for the function/procedure</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date and time when the function/procedure was created</td>
</tr>
<tr>
    <td><CopyableCode code="execute_as" /></td>
    <td><code>string</code></td>
    <td>What permissions should the procedure execution be called with (CALLER, OWNER)</td>
</tr>
<tr>
    <td><CopyableCode code="is_builtin" /></td>
    <td><code>boolean</code></td>
    <td>If the function/procedure is built-in or not (user-defined)</td>
</tr>
<tr>
    <td><CopyableCode code="is_secure" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether the function/procedure is secure or not</td>
</tr>
<tr>
    <td><CopyableCode code="language_config" /></td>
    <td><code>object</code></td>
    <td>Language that the function/procedure is written in</td>
</tr>
<tr>
    <td><CopyableCode code="max_num_arguments" /></td>
    <td><code>integer</code></td>
    <td>The maximum number of arguments</td>
</tr>
<tr>
    <td><CopyableCode code="min_num_arguments" /></td>
    <td><code>integer</code></td>
    <td>The minimum number of arguments</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the function/procedure</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the function/procedure</td>
</tr>
<tr>
    <td><CopyableCode code="return_type" /></td>
    <td><code>object</code></td>
    <td>Return type of the function/procedure. Should be a SQL data type or a table</td>
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
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name_with_args"><code>name_with_args</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Fetch a procedure</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a></td>
    <td>List procedures</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-arguments"><code>arguments</code></a>, <a href="#parameter-return_type"><code>return_type</code></a>, <a href="#parameter-language_config"><code>language_config</code></a>, <a href="#parameter-body"><code>body</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a>, <a href="#parameter-copyGrants"><code>copyGrants</code></a></td>
    <td>Create a procedure</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name_with_args"><code>name_with_args</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete a procedure</td>
</tr>
<tr>
    <td><a href="#call"><CopyableCode code="call" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name_with_args"><code>name_with_args</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-call_arguments"><code>call_arguments</code></a></td>
    <td></td>
    <td>Call a procedure</td>
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
<tr id="parameter-name_with_args">
    <td><CopyableCode code="name_with_args" /></td>
    <td><code>string</code></td>
    <td>Function's name with Args</td>
</tr>
<tr id="parameter-schema_name">
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Identifier (i.e. name) for the schema to which the resource belongs. You can use the `/api/v2/databases/&#123;database&#125;/schemas` GET request to get a list of available schemas for the specified database.</td>
</tr>
<tr id="parameter-copyGrants">
    <td><CopyableCode code="copyGrants" /></td>
    <td><code>boolean</code></td>
    <td>Parameter to enable copy grants when creating the object.</td>
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

Fetch a procedure

```sql
SELECT
name,
database_name,
schema_name,
arguments,
body,
comment,
created_on,
execute_as,
is_builtin,
is_secure,
language_config,
max_num_arguments,
min_num_arguments,
owner,
owner_role_type,
return_type
FROM snowflake.functions.procedures
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name_with_args = '{{ name_with_args }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

List procedures

```sql
SELECT
name,
database_name,
schema_name,
arguments,
body,
comment,
created_on,
execute_as,
is_builtin,
is_secure,
language_config,
max_num_arguments,
min_num_arguments,
owner,
owner_role_type,
return_type
FROM snowflake.functions.procedures
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

Create a procedure

```sql
INSERT INTO snowflake.functions.procedures (
name,
execute_as,
is_secure,
arguments,
return_type,
language_config,
comment,
body,
database_name,
schema_name,
endpoint,
createMode,
copyGrants
)
SELECT 
'{{ name }}' /* required */,
'{{ execute_as }}',
{{ is_secure }},
'{{ arguments }}' /* required */,
'{{ return_type }}' /* required */,
'{{ language_config }}' /* required */,
'{{ comment }}',
'{{ body }}' /* required */,
'{{ database_name }}',
'{{ schema_name }}',
'{{ endpoint }}',
'{{ createMode }}',
'{{ copyGrants }}'
RETURNING
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: procedures
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the procedures resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the procedures resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the procedures resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the procedure
    - name: execute_as
      value: "{{ execute_as }}"
      description: |
        What permissions should the procedure execution be called with
      valid_values: ['CALLER', 'OWNER']
    - name: is_secure
      value: {{ is_secure }}
      description: |
        Specifies whether the function/procedure is secure or not
    - name: arguments
      description: |
        List of arguments for the function/procedure
      value:
        - name: "{{ name }}"
          datatype: "{{ datatype }}"
          default_value: "{{ default_value }}"
    - name: return_type
      description: |
        Return type of the function/procedure. Should be a SQL data type or a table
      value:
        type: "{{ type }}"
    - name: language_config
      description: |
        Language that the function/procedure is written in
      value:
        language: "{{ language }}"
        called_on_null_input: {{ called_on_null_input }}
    - name: comment
      value: "{{ comment }}"
      description: |
        Specifies a comment for the function/procedure
    - name: body
      value: "{{ body }}"
      description: |
        Function/procedure definition
    - name: createMode
      value: "{{ createMode }}"
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
    - name: copyGrants
      value: {{ copyGrants }}
      description: Parameter to enable copy grants when creating the object.
      description: Parameter to enable copy grants when creating the object.
`}</CodeBlock>

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

Delete a procedure

```sql
DELETE FROM snowflake.functions.procedures
WHERE database_name = '{{ database_name }}' --required
AND schema_name = '{{ schema_name }}' --required
AND name_with_args = '{{ name_with_args }}' --required
AND endpoint = '{{ endpoint }}' --required
AND ifExists = '{{ ifExists }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="call"
    values={[
        { label: 'call', value: 'call' }
    ]}
>
<TabItem value="call">

Call a procedure

```sql
EXEC snowflake.functions.procedures.call 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name_with_args='{{ name_with_args }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"call_arguments": "{{ call_arguments }}"
}'
;
```
</TabItem>
</Tabs>
