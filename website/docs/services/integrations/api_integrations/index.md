--- 
title: api_integrations
hide_title: false
hide_table_of_contents: false
keywords:
  - api_integrations
  - integrations
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

Creates, updates, deletes, gets or lists an <code>api_integrations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="api_integrations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.integrations.api_integrations" /></td></tr>
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
    <td>Name of the API integration. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="api_allowed_prefixes" /></td>
    <td><code>array</code></td>
    <td>A comma-separated list of endpoints and resources that Snowflake can access.</td>
</tr>
<tr>
    <td><CopyableCode code="api_blocked_prefixes" /></td>
    <td><code>array</code></td>
    <td>A comma-separated list of endpoints and resources that are not allowed to be called from Snowflake.</td>
</tr>
<tr>
    <td><CopyableCode code="api_hook" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Comment for the API integration.</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the API integration was created.</td>
</tr>
<tr>
    <td><CopyableCode code="enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the API integration is enabled.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake API integration object.

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
    <td>Name of the API integration. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="api_allowed_prefixes" /></td>
    <td><code>array</code></td>
    <td>A comma-separated list of endpoints and resources that Snowflake can access.</td>
</tr>
<tr>
    <td><CopyableCode code="api_blocked_prefixes" /></td>
    <td><code>array</code></td>
    <td>A comma-separated list of endpoints and resources that are not allowed to be called from Snowflake.</td>
</tr>
<tr>
    <td><CopyableCode code="api_hook" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Comment for the API integration.</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the API integration was created.</td>
</tr>
<tr>
    <td><CopyableCode code="enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the API integration is enabled.</td>
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
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Fetch an API integration</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a></td>
    <td>List API integrations</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-api_hook"><code>api_hook</code></a>, <a href="#parameter-api_allowed_prefixes"><code>api_allowed_prefixes</code></a>, <a href="#parameter-enabled"><code>enabled</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create an API integration</td>
</tr>
<tr>
    <td><a href="#create_or_alter"><CopyableCode code="create_or_alter" /></a></td>
    <td><CopyableCode code="replace" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-api_hook"><code>api_hook</code></a>, <a href="#parameter-api_allowed_prefixes"><code>api_allowed_prefixes</code></a>, <a href="#parameter-enabled"><code>enabled</code></a></td>
    <td></td>
    <td>Create an (or alter an existing) API integration. Note that API_KEY is not currently altered by this operation and is supported for a newly-created object only. Unsetting API_BLOCKED_PREFIXES is also unsupported.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete an API integration</td>
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
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Identifier (i.e. name) for the resource.</td>
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

Fetch an API integration

```sql
SELECT
name,
api_allowed_prefixes,
api_blocked_prefixes,
api_hook,
comment,
created_on,
enabled
FROM snowflake.integrations.api_integrations
WHERE name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

List API integrations

```sql
SELECT
name,
api_allowed_prefixes,
api_blocked_prefixes,
api_hook,
comment,
created_on,
enabled
FROM snowflake.integrations.api_integrations
WHERE endpoint = '{{ endpoint }}' -- required
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

Create an API integration

```sql
INSERT INTO snowflake.integrations.api_integrations (
name,
api_hook,
api_allowed_prefixes,
api_blocked_prefixes,
enabled,
comment,
endpoint,
createMode
)
SELECT 
'{{ name }}' /* required */,
'{{ api_hook }}' /* required */,
'{{ api_allowed_prefixes }}' /* required */,
'{{ api_blocked_prefixes }}',
{{ enabled }} /* required */,
'{{ comment }}',
'{{ endpoint }}',
'{{ createMode }}'
RETURNING
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: api_integrations
  props:
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the api_integrations resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the API integration.
    - name: api_hook
      value:
        type: "{{ type }}"
    - name: api_allowed_prefixes
      value:
        - "{{ api_allowed_prefixes }}"
      description: |
        A comma-separated list of endpoints and resources that Snowflake can access.
    - name: api_blocked_prefixes
      value:
        - "{{ api_blocked_prefixes }}"
      description: |
        A comma-separated list of endpoints and resources that are not allowed to be called from Snowflake.
    - name: enabled
      value: {{ enabled }}
      description: |
        Whether the API integration is enabled.
    - name: comment
      value: "{{ comment }}"
      description: |
        Comment for the API integration.
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

Create an (or alter an existing) API integration. Note that API_KEY is not currently altered by this operation and is supported for a newly-created object only. Unsetting API_BLOCKED_PREFIXES is also unsupported.

```sql
REPLACE snowflake.integrations.api_integrations
SET 
name = '{{ name }}',
api_hook = '{{ api_hook }}',
api_allowed_prefixes = '{{ api_allowed_prefixes }}',
api_blocked_prefixes = '{{ api_blocked_prefixes }}',
enabled = {{ enabled }},
comment = '{{ comment }}'
WHERE 
name = '{{ name }}' --required
AND endpoint = '{{ endpoint }}' --required
AND name = '{{ name }}' --required
AND api_hook = '{{ api_hook }}' --required
AND api_allowed_prefixes = '{{ api_allowed_prefixes }}' --required
AND enabled = {{ enabled }} --required
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

Delete an API integration

```sql
DELETE FROM snowflake.integrations.api_integrations
WHERE name = '{{ name }}' --required
AND endpoint = '{{ endpoint }}' --required
AND ifExists = '{{ ifExists }}'
;
```
</TabItem>
</Tabs>
