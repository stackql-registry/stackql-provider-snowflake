--- 
title: user_grants
hide_title: false
hide_table_of_contents: false
keywords:
  - user_grants
  - roles
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

Creates, updates, deletes, gets or lists a <code>user_grants</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="user_grants" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.roles.user_grants" /></td></tr>
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
    <td><CopyableCode code="containing_scope" /></td>
    <td><code>object</code></td>
    <td>Containing scope of the grant</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the grant was created</td>
</tr>
<tr>
    <td><CopyableCode code="granted_by" /></td>
    <td><code>string</code></td>
    <td>The role that granted this privilege to this grantee</td>
</tr>
<tr>
    <td><CopyableCode code="privileges" /></td>
    <td><code>array</code></td>
    <td>List of privileges to be granted.</td>
</tr>
<tr>
    <td><CopyableCode code="securable" /></td>
    <td><code>object</code></td>
    <td>Securable of the grant</td>
</tr>
<tr>
    <td><CopyableCode code="securable_type" /></td>
    <td><code>string</code></td>
    <td>Type of the securable to be granted. Only ROLE is supported</td>
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
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-showLimit"><code>showLimit</code></a></td>
    <td>List all grants to the user</td>
</tr>
<tr>
    <td><a href="#grant"><CopyableCode code="grant" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-securable_type"><code>securable_type</code></a></td>
    <td></td>
    <td>Grant a role to the user</td>
</tr>
<tr>
    <td><a href="#revoke"><CopyableCode code="revoke" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-securable_type"><code>securable_type</code></a></td>
    <td></td>
    <td>Revoke grants from the user</td>
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
<tr id="parameter-showLimit">
    <td><CopyableCode code="showLimit" /></td>
    <td><code>integer</code></td>
    <td>Parameter to limit the maximum number of rows returned by a command.</td>
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

List all grants to the user

```sql
SELECT
containing_scope,
created_on,
granted_by,
privileges,
securable,
securable_type
FROM snowflake.roles.user_grants
WHERE name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND showLimit = '{{ showLimit }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="grant"
    values={[
        { label: 'grant', value: 'grant' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="grant">

Grant a role to the user

```sql
INSERT INTO snowflake.roles.user_grants (
securable,
containing_scope,
securable_type,
privileges,
name,
endpoint
)
SELECT 
'{{ securable }}',
'{{ containing_scope }}',
'{{ securable_type }}' /* required */,
'{{ privileges }}',
'{{ name }}',
'{{ endpoint }}'
RETURNING
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: user_grants
  props:
    - name: name
      value: "{{ name }}"
      description: Required parameter for the user_grants resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the user_grants resource.
    - name: securable
      description: |
        Securable of the grant
      value:
        database: "{{ database }}"
        schema: "{{ schema }}"
        name: "{{ name }}"
    - name: containing_scope
      description: |
        Containing scope of the grant
      value:
        database: "{{ database }}"
        schema: "{{ schema }}"
    - name: securable_type
      value: "{{ securable_type }}"
      description: |
        Type of the securable to be granted. Only ROLE is supported
    - name: privileges
      value:
        - "{{ privileges }}"
      description: |
        List of privileges to be granted.
`}</CodeBlock>

</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="revoke"
    values={[
        { label: 'revoke', value: 'revoke' }
    ]}
>
<TabItem value="revoke">

Revoke grants from the user

```sql
EXEC snowflake.roles.user_grants.revoke 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"securable": "{{ securable }}", 
"containing_scope": "{{ containing_scope }}", 
"securable_type": "{{ securable_type }}", 
"privileges": "{{ privileges }}"
}'
;
```
</TabItem>
</Tabs>
