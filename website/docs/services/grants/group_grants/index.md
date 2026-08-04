--- 
title: group_grants
hide_title: false
hide_table_of_contents: false
keywords:
  - group_grants
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

Creates, updates, deletes, gets or lists a <code>group_grants</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="group_grants" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.grants.group_grants" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

`SELECT` not supported for this resource, use `SHOW METHODS` to view available operations for the resource.


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
    <td><a href="#grant"><CopyableCode code="grant" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-granteeType"><code>granteeType</code></a>, <a href="#parameter-granteeName"><code>granteeName</code></a>, <a href="#parameter-bulkGrantType"><code>bulkGrantType</code></a>, <a href="#parameter-securableTypePlural"><code>securableTypePlural</code></a>, <a href="#parameter-scopeType"><code>scopeType</code></a>, <a href="#parameter-scopeName"><code>scopeName</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Endpoint to indicate that the privileges listed in the request body should be granted to all securables of this type in the given scope.</td>
</tr>
<tr>
    <td><a href="#revoke"><CopyableCode code="revoke" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-granteeType"><code>granteeType</code></a>, <a href="#parameter-granteeName"><code>granteeName</code></a>, <a href="#parameter-bulkGrantType"><code>bulkGrantType</code></a>, <a href="#parameter-securableTypePlural"><code>securableTypePlural</code></a>, <a href="#parameter-scopeType"><code>scopeType</code></a>, <a href="#parameter-scopeName"><code>scopeName</code></a>, <a href="#parameter-privilege"><code>privilege</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-deleteMode"><code>deleteMode</code></a></td>
    <td>Endpoint to indicate that the privilege listed on the group securable in the given scope should be revoked.</td>
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
<tr id="parameter-bulkGrantType">
    <td><CopyableCode code="bulkGrantType" /></td>
    <td><code>string</code></td>
    <td>String that species whether this group privilege should be on ALL or FUTURE resources of the specified plural type</td>
</tr>
<tr id="parameter-endpoint">
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td>Organization and account identifier (orgname-accountname) (default: orgname-accountname)</td>
</tr>
<tr id="parameter-granteeName">
    <td><CopyableCode code="granteeName" /></td>
    <td><code>string</code></td>
    <td>String that specifies the name of the privilege grantee.</td>
</tr>
<tr id="parameter-granteeType">
    <td><CopyableCode code="granteeType" /></td>
    <td><code>string</code></td>
    <td>String that specifies the type of resource that is the privilege grantee.</td>
</tr>
<tr id="parameter-privilege">
    <td><CopyableCode code="privilege" /></td>
    <td><code>string</code></td>
    <td>String that specifies a privilege to be revoked</td>
</tr>
<tr id="parameter-scopeName">
    <td><CopyableCode code="scopeName" /></td>
    <td><code>string</code></td>
    <td>String that specifies the name of resource that is the scope of an ALL/FUTURE privilege</td>
</tr>
<tr id="parameter-scopeType">
    <td><CopyableCode code="scopeType" /></td>
    <td><code>string</code></td>
    <td>String that specifies the type of resource that is the scope of an ALL/FUTURE privilege. Can only be DATABASE or SCHEMA</td>
</tr>
<tr id="parameter-securableTypePlural">
    <td><CopyableCode code="securableTypePlural" /></td>
    <td><code>string</code></td>
    <td>String that specifies the plural of the type of resource that is being secured by an ALL/FUTURE privilege. Must be either "schemas" or any plural object type that can nest under a schema such as "tables"</td>
</tr>
<tr id="parameter-deleteMode">
    <td><CopyableCode code="deleteMode" /></td>
    <td><code>string</code></td>
    <td>If "cascade", recursively revoke the grant from sub-grantees to which this privilege was re-granted. Acceptable values are "restrict" or "cascade".</td>
</tr>
</tbody>
</table>

## `INSERT` examples

<Tabs
    defaultValue="grant"
    values={[
        { label: 'grant', value: 'grant' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="grant">

Endpoint to indicate that the privileges listed in the request body should be granted to all securables of this type in the given scope.

```sql
INSERT INTO snowflake.grants.group_grants (
privileges,
grant_option,
created_on,
grantee_type,
grantee_name,
securable_type,
securable_name,
granted_by_role_type,
granted_by_name,
granteeType,
granteeName,
bulkGrantType,
securableTypePlural,
scopeType,
scopeName,
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
'{{ granteeType }}',
'{{ granteeName }}',
'{{ bulkGrantType }}',
'{{ securableTypePlural }}',
'{{ scopeType }}',
'{{ scopeName }}',
'{{ endpoint }}'
RETURNING
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: group_grants
  props:
    - name: granteeType
      value: "{{ granteeType }}"
      description: Required parameter for the group_grants resource.
    - name: granteeName
      value: "{{ granteeName }}"
      description: Required parameter for the group_grants resource.
    - name: bulkGrantType
      value: "{{ bulkGrantType }}"
      description: Required parameter for the group_grants resource.
    - name: securableTypePlural
      value: "{{ securableTypePlural }}"
      description: Required parameter for the group_grants resource.
    - name: scopeType
      value: "{{ scopeType }}"
      description: Required parameter for the group_grants resource.
    - name: scopeName
      value: "{{ scopeName }}"
      description: Required parameter for the group_grants resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the group_grants resource.
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

Endpoint to indicate that the privilege listed on the group securable in the given scope should be revoked.

```sql
DELETE FROM snowflake.grants.group_grants
WHERE granteeType = '{{ granteeType }}' --required
AND granteeName = '{{ granteeName }}' --required
AND bulkGrantType = '{{ bulkGrantType }}' --required
AND securableTypePlural = '{{ securableTypePlural }}' --required
AND scopeType = '{{ scopeType }}' --required
AND scopeName = '{{ scopeName }}' --required
AND privilege = '{{ privilege }}' --required
AND endpoint = '{{ endpoint }}' --required
AND deleteMode = '{{ deleteMode }}'
;
```
</TabItem>
</Tabs>
