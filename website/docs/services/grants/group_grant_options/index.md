--- 
title: group_grant_options
hide_title: false
hide_table_of_contents: false
keywords:
  - group_grant_options
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

Creates, updates, deletes, gets or lists a <code>group_grant_options</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="group_grant_options" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.grants.group_grant_options" /></td></tr>
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
    <td><a href="#revoke"><CopyableCode code="revoke" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-grantee_type"><code>grantee_type</code></a>, <a href="#parameter-grantee_name"><code>grantee_name</code></a>, <a href="#parameter-bulk_grant_type"><code>bulk_grant_type</code></a>, <a href="#parameter-securable_type_plural"><code>securable_type_plural</code></a>, <a href="#parameter-scope_type"><code>scope_type</code></a>, <a href="#parameter-scope_name"><code>scope_name</code></a>, <a href="#parameter-privilege"><code>privilege</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-deleteMode"><code>deleteMode</code></a></td>
    <td>Endpoint to indicate that the grant option for the privilege listed on the group securable in the given scope should be revoked.</td>
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
<tr id="parameter-bulk_grant_type">
    <td><CopyableCode code="bulk_grant_type" /></td>
    <td><code>string</code></td>
    <td>String that species whether this group privilege should be on ALL or FUTURE resources of the specified plural type</td>
</tr>
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
<tr id="parameter-scope_name">
    <td><CopyableCode code="scope_name" /></td>
    <td><code>string</code></td>
    <td>String that specifies the name of resource that is the scope of an ALL/FUTURE privilege</td>
</tr>
<tr id="parameter-scope_type">
    <td><CopyableCode code="scope_type" /></td>
    <td><code>string</code></td>
    <td>String that specifies the type of resource that is the scope of an ALL/FUTURE privilege. Can only be DATABASE or SCHEMA</td>
</tr>
<tr id="parameter-securable_type_plural">
    <td><CopyableCode code="securable_type_plural" /></td>
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

## `DELETE` examples

<Tabs
    defaultValue="revoke"
    values={[
        { label: 'revoke', value: 'revoke' }
    ]}
>
<TabItem value="revoke">

Endpoint to indicate that the grant option for the privilege listed on the group securable in the given scope should be revoked.

```sql
DELETE FROM snowflake.grants.group_grant_options
WHERE grantee_type = '{{ grantee_type }}' --required
AND grantee_name = '{{ grantee_name }}' --required
AND bulk_grant_type = '{{ bulk_grant_type }}' --required
AND securable_type_plural = '{{ securable_type_plural }}' --required
AND scope_type = '{{ scope_type }}' --required
AND scope_name = '{{ scope_name }}' --required
AND privilege = '{{ privilege }}' --required
AND endpoint = '{{ endpoint }}' --required
AND deleteMode = '{{ deleteMode }}'
;
```
</TabItem>
</Tabs>
