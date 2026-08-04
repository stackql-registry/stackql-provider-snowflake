--- 
title: alerts
hide_title: false
hide_table_of_contents: false
keywords:
  - alerts
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

Creates, updates, deletes, gets or lists an <code>alerts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="alerts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.pipelines.alerts" /></td></tr>
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
    <td>Name of the alert</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the alert is stored</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the alert is stored</td>
</tr>
<tr>
    <td><CopyableCode code="action" /></td>
    <td><code>string</code></td>
    <td>The SQL statement to execute when the alert is triggered</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>user comment associated to an object in the dictionary</td>
</tr>
<tr>
    <td><CopyableCode code="condition" /></td>
    <td><code>string</code></td>
    <td>The SQL statement that must be evaluated to determine whether to trigger the alert</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the alert was created.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the alert</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the alert</td>
</tr>
<tr>
    <td><CopyableCode code="schedule" /></td>
    <td><code>object</code></td>
    <td>The schedule the alert runs under</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>The current state of the alert</td>
</tr>
<tr>
    <td><CopyableCode code="warehouse" /></td>
    <td><code>string</code></td>
    <td>The warehouse the alert runs in</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake alert

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
    <td>Name of the alert</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the alert is stored</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the alert is stored</td>
</tr>
<tr>
    <td><CopyableCode code="action" /></td>
    <td><code>string</code></td>
    <td>The SQL statement to execute when the alert is triggered</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>user comment associated to an object in the dictionary</td>
</tr>
<tr>
    <td><CopyableCode code="condition" /></td>
    <td><code>string</code></td>
    <td>The SQL statement that must be evaluated to determine whether to trigger the alert</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the alert was created.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the alert</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the alert</td>
</tr>
<tr>
    <td><CopyableCode code="schedule" /></td>
    <td><code>object</code></td>
    <td>The schedule the alert runs under</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>The current state of the alert</td>
</tr>
<tr>
    <td><CopyableCode code="warehouse" /></td>
    <td><code>string</code></td>
    <td>The warehouse the alert runs in</td>
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
    <td>Fetch an alert</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a>, <a href="#parameter-startsWith"><code>startsWith</code></a>, <a href="#parameter-showLimit"><code>showLimit</code></a>, <a href="#parameter-fromName"><code>fromName</code></a></td>
    <td>List alerts</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-schedule"><code>schedule</code></a>, <a href="#parameter-condition"><code>condition</code></a>, <a href="#parameter-action"><code>action</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create an alert</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete an alert</td>
</tr>
<tr>
    <td><a href="#clone"><CopyableCode code="clone" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-targetDatabase"><code>targetDatabase</code></a>, <a href="#parameter-targetSchema"><code>targetSchema</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create a new alert by cloning from the specified resource</td>
</tr>
<tr>
    <td><a href="#execute"><CopyableCode code="execute" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Execute an alert</td>
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
<tr id="parameter-targetDatabase">
    <td><CopyableCode code="targetDatabase" /></td>
    <td><code>string</code></td>
    <td>Database of the newly created resource. Defaults to the source's database</td>
</tr>
<tr id="parameter-targetSchema">
    <td><CopyableCode code="targetSchema" /></td>
    <td><code>string</code></td>
    <td>Schema of the newly created resource. Defaults to the source's schema</td>
</tr>
<tr id="parameter-createMode">
    <td><CopyableCode code="createMode" /></td>
    <td><code>string</code></td>
    <td>Parameter allowing support for different modes of resource creation. Possible values include: - `errorIfExists`: Throws an error if you try to create a resource that already exists. - `orReplace`: Automatically replaces the existing resource with the current one. - `ifNotExists`: Creates a new resource when an alter is requested for a non-existent resource.</td>
</tr>
<tr id="parameter-fromName">
    <td><CopyableCode code="fromName" /></td>
    <td><code>string</code></td>
    <td>Parameter to enable fetching rows only following the first row whose object name matches the specified string. Case-sensitive and does not have to be the full name.</td>
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
<tr id="parameter-showLimit">
    <td><CopyableCode code="showLimit" /></td>
    <td><code>integer</code></td>
    <td>Parameter to limit the maximum number of rows returned by a command.</td>
</tr>
<tr id="parameter-startsWith">
    <td><CopyableCode code="startsWith" /></td>
    <td><code>string</code></td>
    <td>Parameter to filter the command output based on the string of characters that appear at the beginning of the object name. Uses case-sensitive pattern matching.</td>
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

Fetch an alert

```sql
SELECT
name,
database_name,
schema_name,
action,
comment,
condition,
created_on,
owner,
owner_role_type,
schedule,
state,
warehouse
FROM snowflake.pipelines.alerts
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

List alerts

```sql
SELECT
name,
database_name,
schema_name,
action,
comment,
condition,
created_on,
owner,
owner_role_type,
schedule,
state,
warehouse
FROM snowflake.pipelines.alerts
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND "like" = '{{ like }}'
AND startsWith = '{{ startsWith }}'
AND showLimit = '{{ showLimit }}'
AND fromName = '{{ fromName }}'
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

Create an alert

```sql
INSERT INTO snowflake.pipelines.alerts (
name,
comment,
schedule,
warehouse,
condition,
action,
database_name,
schema_name,
endpoint,
createMode
)
SELECT 
'{{ name }}' /* required */,
'{{ comment }}',
'{{ schedule }}' /* required */,
'{{ warehouse }}',
'{{ condition }}' /* required */,
'{{ action }}' /* required */,
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
- name: alerts
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the alerts resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the alerts resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the alerts resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the alert
    - name: comment
      value: "{{ comment }}"
      description: |
        user comment associated to an object in the dictionary
    - name: schedule
      description: |
        The schedule the alert runs under
      value:
        schedule_type: "{{ schedule_type }}"
    - name: warehouse
      value: "{{ warehouse }}"
      description: |
        The warehouse the alert runs in
    - name: condition
      value: "{{ condition }}"
      description: |
        The SQL statement that must be evaluated to determine whether to trigger the alert
    - name: action
      value: "{{ action }}"
      description: |
        The SQL statement to execute when the alert is triggered
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

Delete an alert

```sql
DELETE FROM snowflake.pipelines.alerts
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
    defaultValue="clone"
    values={[
        { label: 'clone', value: 'clone' },
        { label: 'execute', value: 'execute' }
    ]}
>
<TabItem value="clone">

Create a new alert by cloning from the specified resource

```sql
EXEC snowflake.pipelines.alerts.clone 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@targetDatabase='{{ targetDatabase }}' --required, 
@targetSchema='{{ targetSchema }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@createMode='{{ createMode }}' 
@@json=
'{
"name": "{{ name }}", 
"point_of_time": "{{ point_of_time }}"
}'
;
```
</TabItem>
<TabItem value="execute">

Execute an alert

```sql
EXEC snowflake.pipelines.alerts.execute 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required
;
```
</TabItem>
</Tabs>
