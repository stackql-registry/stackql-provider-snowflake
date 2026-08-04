--- 
title: grants
hide_title: false
hide_table_of_contents: false
keywords:
  - grants
  - grants
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

Creates, updates, deletes, gets or lists a <code>grants</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="grants" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.grants.grants" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list_grants_to"
    values={[
        { label: 'list_grants_to', value: 'list_grants_to' }
    ]}
>
<TabItem value="list_grants_to">

Properties of a grant that can be granted to a role or user.

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
    <td><CopyableCode code="granted_by_name" /></td>
    <td><code>string</code></td>
    <td>The role that granted this privilege to this grantee (example: SUBADMIN)</td>
</tr>
<tr>
    <td><CopyableCode code="grantee_name" /></td>
    <td><code>string</code></td>
    <td>Specific name of object being granted to (example: ACCOUNTADMIN)</td>
</tr>
<tr>
    <td><CopyableCode code="securable_name" /></td>
    <td><code>string</code></td>
    <td>Name of specific object granted on (not name of privilege!)</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="grant_option" /></td>
    <td><code>boolean</code></td>
    <td>Can grantee pass this privilege down?</td>
</tr>
<tr>
    <td><CopyableCode code="granted_by_role_type" /></td>
    <td><code>string</code></td>
    <td>Type of role that granted this privilege to this grantee (example: ROLE)</td>
</tr>
<tr>
    <td><CopyableCode code="grantee_type" /></td>
    <td><code>string</code></td>
    <td>Entity type being granted to (example: ROLE)</td>
</tr>
<tr>
    <td><CopyableCode code="privileges" /></td>
    <td><code>array</code></td>
    <td>Privilege type</td>
</tr>
<tr>
    <td><CopyableCode code="securable_type" /></td>
    <td><code>string</code></td>
    <td>Type of object granted on (example: ACCOUNT)</td>
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
    <td><a href="#list_grants_to"><CopyableCode code="list_grants_to" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-grantee_type"><code>grantee_type</code></a>, <a href="#parameter-grantee_name"><code>grantee_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-showLimit"><code>showLimit</code></a></td>
    <td>List the roles and privileges granted to the specified grantee using the output of SHOW GRANTS TO</td>
</tr>
<tr>
    <td><a href="#grant"><CopyableCode code="grant" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-grantee_type"><code>grantee_type</code></a>, <a href="#parameter-grantee_name"><code>grantee_name</code></a>, <a href="#parameter-securable_type"><code>securable_type</code></a>, <a href="#parameter-securable_name"><code>securable_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Endpoint to indicate that the privileges listed in the request body should be granted.</td>
</tr>
<tr>
    <td><a href="#revoke"><CopyableCode code="revoke" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-grantee_type"><code>grantee_type</code></a>, <a href="#parameter-grantee_name"><code>grantee_name</code></a>, <a href="#parameter-securable_type"><code>securable_type</code></a>, <a href="#parameter-securable_name"><code>securable_name</code></a>, <a href="#parameter-privilege"><code>privilege</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-deleteMode"><code>deleteMode</code></a></td>
    <td>Endpoint to indicate that the privilege listed in the path should be revoked.</td>
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
<tr id="parameter-grantee_name">
    <td><CopyableCode code="grantee_name" /></td>
    <td><code>string</code></td>
    <td>String that specifies the name of the privilege grantee.</td>
</tr>
<tr id="parameter-grantee_type">
    <td><CopyableCode code="grantee_type" /></td>
    <td><code>string</code></td>
    <td>String that specifies the type of resource that is the privilege grantee.</td>
</tr>
<tr id="parameter-privilege">
    <td><CopyableCode code="privilege" /></td>
    <td><code>string</code></td>
    <td>String that specifies a privilege to be revoked</td>
</tr>
<tr id="parameter-securable_name">
    <td><CopyableCode code="securable_name" /></td>
    <td><code>string</code></td>
    <td>String that specifies the name of resource that is being secured by a privilege.</td>
</tr>
<tr id="parameter-securable_type">
    <td><CopyableCode code="securable_type" /></td>
    <td><code>string</code></td>
    <td>String that specifies the type of resource that is being secured by a privilege.</td>
</tr>
<tr id="parameter-deleteMode">
    <td><CopyableCode code="deleteMode" /></td>
    <td><code>string</code></td>
    <td>If "cascade", recursively revoke the grant from sub-grantees to which this privilege was re-granted. Acceptable values are "restrict" or "cascade".</td>
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
    defaultValue="list_grants_to"
    values={[
        { label: 'list_grants_to', value: 'list_grants_to' }
    ]}
>
<TabItem value="list_grants_to">

List the roles and privileges granted to the specified grantee using the output of SHOW GRANTS TO

```sql
SELECT
granted_by_name,
grantee_name,
securable_name,
created_on,
grant_option,
granted_by_role_type,
grantee_type,
privileges,
securable_type
FROM snowflake.grants.grants
WHERE grantee_type = '{{ grantee_type }}' -- required
AND grantee_name = '{{ grantee_name }}' -- required
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

Endpoint to indicate that the privileges listed in the request body should be granted.

```sql
INSERT INTO snowflake.grants.grants (
privileges,
grant_option,
created_on,
grantee_type,
grantee_name,
securable_type,
securable_name,
granted_by_role_type,
granted_by_name,
grantee_type,
grantee_name,
securable_type,
securable_name,
endpoint
)
SELECT 
'{{ privileges }}',
{{ grant_option }},
'{{ created_on }}',
'{{ grantee_type }}',
'{{ grantee_name }}',
'{{ securable_type }}',
'{{ securable_name }}',
'{{ granted_by_role_type }}',
'{{ granted_by_name }}',
'{{ grantee_type }}',
'{{ grantee_name }}',
'{{ securable_type }}',
'{{ securable_name }}',
'{{ endpoint }}'
RETURNING
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: grants
  props:
    - name: grantee_type
      value: "{{ grantee_type }}"
      description: Required parameter for the grants resource.
    - name: grantee_name
      value: "{{ grantee_name }}"
      description: Required parameter for the grants resource.
    - name: securable_type
      value: "{{ securable_type }}"
      description: Required parameter for the grants resource.
    - name: securable_name
      value: "{{ securable_name }}"
      description: Required parameter for the grants resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the grants resource.
    - name: privileges
      value:
        - "{{ privileges }}"
      description: |
        Privilege type
    - name: grant_option
      value: {{ grant_option }}
      description: |
        Can grantee pass this privilege down?
    - name: created_on
      value: "{{ created_on }}"
    - name: grantee_type
      value: "{{ grantee_type }}"
      description: |
        Entity type being granted to
    - name: grantee_name
      value: "{{ grantee_name }}"
      description: |
        Specific name of object being granted to
    - name: securable_type
      value: "{{ securable_type }}"
      description: |
        Type of object granted on
    - name: securable_name
      value: "{{ securable_name }}"
      description: |
        Name of specific object granted on (not name of privilege!)
    - name: granted_by_role_type
      value: "{{ granted_by_role_type }}"
      description: |
        Type of role that granted this privilege to this grantee
    - name: granted_by_name
      value: "{{ granted_by_name }}"
      description: |
        The role that granted this privilege to this grantee
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="revoke"
    values={[
        { label: 'revoke', value: 'revoke' }
    ]}
>
<TabItem value="revoke">

Endpoint to indicate that the privilege listed in the path should be revoked.

```sql
DELETE FROM snowflake.grants.grants
WHERE grantee_type = '{{ grantee_type }}' --required
AND grantee_name = '{{ grantee_name }}' --required
AND securable_type = '{{ securable_type }}' --required
AND securable_name = '{{ securable_name }}' --required
AND privilege = '{{ privilege }}' --required
AND endpoint = '{{ endpoint }}' --required
AND deleteMode = '{{ deleteMode }}'
;
```
</TabItem>
</Tabs>
