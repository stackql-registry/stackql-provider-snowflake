--- 
title: stages
hide_title: false
hide_table_of_contents: false
keywords:
  - stages
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

Creates, updates, deletes, gets or lists a <code>stages</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="stages" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.pipelines.stages" /></td></tr>
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
    <td>String that specifies the identifier (i.e. name) for the stage. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
</tr>
<tr>
    <td><CopyableCode code="cloud" /></td>
    <td><code>string</code></td>
    <td>Cloud provider; always NULL for an internal stage.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Specifies a comment for the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the stage was created.</td>
</tr>
<tr>
    <td><CopyableCode code="credentials" /></td>
    <td><code>object</code></td>
    <td>Credentials of the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="directory_table" /></td>
    <td><code>object</code></td>
    <td>Directory table parameters of the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="encryption" /></td>
    <td><code>object</code></td>
    <td>Encryption parameters of the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td>The S3-compatible API endpoint associated with the stage; always NULL for stages that are not S3-compatible.</td>
</tr>
<tr>
    <td><CopyableCode code="has_credentials" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the external stage has access credentials; always false for an internal stage.</td>
</tr>
<tr>
    <td><CopyableCode code="has_encryption_key" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the external stage contains encrypted files; always false for an internal stage.</td>
</tr>
<tr>
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td>Specifies whether the stage is permanent or temporary. (PERMANENT, TEMPORARY) (default: PERMANENT)</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the object, either ROLE or DATABASE_ROLE. If a Snowflake Native App owns the object, the value is APPLICATION. Snowflake returns NULL if you delete the object because a deleted object does not have an owner role.</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>Region where the stage is located.</td>
</tr>
<tr>
    <td><CopyableCode code="storage_integration" /></td>
    <td><code>string</code></td>
    <td>Storage integration associated with the stage; always NULL for an internal stage. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string</code></td>
    <td>URL for the external stage; blank for an internal stage.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake stage.

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
    <td>String that specifies the identifier (i.e. name) for the stage. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
</tr>
<tr>
    <td><CopyableCode code="cloud" /></td>
    <td><code>string</code></td>
    <td>Cloud provider; always NULL for an internal stage.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Specifies a comment for the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the stage was created.</td>
</tr>
<tr>
    <td><CopyableCode code="credentials" /></td>
    <td><code>object</code></td>
    <td>Credentials of the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="directory_table" /></td>
    <td><code>object</code></td>
    <td>Directory table parameters of the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="encryption" /></td>
    <td><code>object</code></td>
    <td>Encryption parameters of the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td>The S3-compatible API endpoint associated with the stage; always NULL for stages that are not S3-compatible.</td>
</tr>
<tr>
    <td><CopyableCode code="has_credentials" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the external stage has access credentials; always false for an internal stage.</td>
</tr>
<tr>
    <td><CopyableCode code="has_encryption_key" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the external stage contains encrypted files; always false for an internal stage.</td>
</tr>
<tr>
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td>Specifies whether the stage is permanent or temporary. (PERMANENT, TEMPORARY) (default: PERMANENT)</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the stage.</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the object, either ROLE or DATABASE_ROLE. If a Snowflake Native App owns the object, the value is APPLICATION. Snowflake returns NULL if you delete the object because a deleted object does not have an owner role.</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>Region where the stage is located.</td>
</tr>
<tr>
    <td><CopyableCode code="storage_integration" /></td>
    <td><code>string</code></td>
    <td>Storage integration associated with the stage; always NULL for an internal stage. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string</code></td>
    <td>URL for the external stage; blank for an internal stage.</td>
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
    <td>Fetch a stage using the describe command output.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a></td>
    <td>Lists stages under the database and schema, with show options as query parameters.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create a stage, with standard create modifiers as query parameters. See the Stage component definition for what is required to be provided in the request body.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete a stage with the stage name. If ifExists is used, the operation will succeed even if the object does not exist. Otherwise, there will be a failure if the drop is unsuccessful.</td>
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

Fetch a stage using the describe command output.

```sql
SELECT
name,
cloud,
comment,
created_on,
credentials,
directory_table,
encryption,
endpoint,
has_credentials,
has_encryption_key,
kind,
owner,
owner_role_type,
region,
storage_integration,
url
FROM snowflake.pipelines.stages
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists stages under the database and schema, with show options as query parameters.

```sql
SELECT
name,
cloud,
comment,
created_on,
credentials,
directory_table,
encryption,
endpoint,
has_credentials,
has_encryption_key,
kind,
owner,
owner_role_type,
region,
storage_integration,
url
FROM snowflake.pipelines.stages
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

Create a stage, with standard create modifiers as query parameters. See the Stage component definition for what is required to be provided in the request body.

```sql
INSERT INTO snowflake.pipelines.stages (
name,
kind,
url,
endpoint,
storage_integration,
comment,
credentials,
encryption,
directory_table,
database_name,
schema_name,
endpoint,
createMode
)
SELECT 
'{{ name }}' /* required */,
'{{ kind }}',
'{{ url }}',
'{{ endpoint }}',
'{{ storage_integration }}',
'{{ comment }}',
'{{ credentials }}',
'{{ encryption }}',
'{{ directory_table }}',
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
- name: stages
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the stages resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the stages resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the stages resource.
    - name: name
      value: "{{ name }}"
      description: |
        String that specifies the identifier (i.e. name) for the stage.
    - name: kind
      value: "{{ kind }}"
      description: |
        Specifies whether the stage is permanent or temporary.
      valid_values: ['PERMANENT', 'TEMPORARY']
      default: PERMANENT
    - name: url
      value: "{{ url }}"
      description: |
        URL for the external stage; blank for an internal stage.
    - name: endpoint
      value: "{{ endpoint }}"
      description: |
        The S3-compatible API endpoint associated with the stage; always NULL for stages that are not S3-compatible.
    - name: storage_integration
      value: "{{ storage_integration }}"
      description: |
        Storage integration associated with the stage; always NULL for an internal stage.
    - name: comment
      value: "{{ comment }}"
      description: |
        Specifies a comment for the stage.
    - name: credentials
      description: |
        Credentials of the stage.
      value:
        credential_type: "{{ credential_type }}"
    - name: encryption
      description: |
        Encryption parameters of the stage.
      value:
        type: "{{ type }}"
        master_key: "{{ master_key }}"
        kms_key_id: "{{ kms_key_id }}"
    - name: directory_table
      description: |
        Directory table parameters of the stage.
      value:
        enable: {{ enable }}
        refresh_on_create: {{ refresh_on_create }}
        auto_refresh: {{ auto_refresh }}
        notification_integration: "{{ notification_integration }}"
    - name: createMode
      value: "{{ createMode }}"
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
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

Delete a stage with the stage name. If ifExists is used, the operation will succeed even if the object does not exist. Otherwise, there will be a failure if the drop is unsuccessful.

```sql
DELETE FROM snowflake.pipelines.stages
WHERE database_name = '{{ database_name }}' --required
AND schema_name = '{{ schema_name }}' --required
AND name = '{{ name }}' --required
AND endpoint = '{{ endpoint }}' --required
AND ifExists = '{{ ifExists }}'
;
```
</TabItem>
</Tabs>
