--- 
title: managed_accounts
hide_title: false
hide_table_of_contents: false
keywords:
  - managed_accounts
  - account
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

Creates, updates, deletes, gets or lists a <code>managed_accounts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="managed_accounts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.account.managed_accounts" /></td></tr>
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

Snowflake account object.

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
    <td>Name of the account. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
</tr>
<tr>
    <td><CopyableCode code="admin_name" /></td>
    <td><code>string</code></td>
    <td>Name of the account administrator.</td>
</tr>
<tr>
    <td><CopyableCode code="account_locator_url" /></td>
    <td><code>string</code></td>
    <td>Account URL that is used to connect to the account, in the legacy account locator format.</td>
</tr>
<tr>
    <td><CopyableCode code="account_type" /></td>
    <td><code>string</code></td>
    <td>Type of the account. (READER) (default: READER)</td>
</tr>
<tr>
    <td><CopyableCode code="admin_password" /></td>
    <td><code>string (password)</code></td>
    <td>Password for the account administrator.</td>
</tr>
<tr>
    <td><CopyableCode code="cloud" /></td>
    <td><code>string</code></td>
    <td>Cloud in which the managed account is located. For reader accounts, this is always the same as the cloud for the provider account.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Optional comment in which to store information related to the account.</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time the account was created.</td>
</tr>
<tr>
    <td><CopyableCode code="locator" /></td>
    <td><code>string</code></td>
    <td>Legacy identifier for the account.</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>Region in which the managed account is located. For reader accounts, this is always the same as the region for the provider account.</td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string</code></td>
    <td>Account URL that is used to connect to the account, in the account name format. The account identifier in this format follows the pattern &lt;orgname&gt;-&lt;account_name&gt;.</td>
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
    <td><a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a></td>
    <td>Lists the accessible managed accounts.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-admin_name"><code>admin_name</code></a>, <a href="#parameter-admin_password"><code>admin_password</code></a>, <a href="#parameter-account_type"><code>account_type</code></a></td>
    <td></td>
    <td>Creates a managed account. You must provide the full managed account definition when creating a managed account.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Removes a managed account, including all objects created in the account, and immediately restricts access to the account. Currently used by data providers to create reader accounts for their consumers. For more details, see Manage reader accounts.</td>
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
<tr id="parameter-like">
    <td><CopyableCode code="like" /></td>
    <td><code>string</code></td>
    <td>Parameter to filter the command output by resource name. Uses case-insensitive pattern matching, with support for SQL wildcard characters.</td>
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

Lists the accessible managed accounts.

```sql
SELECT
name,
admin_name,
account_locator_url,
account_type,
admin_password,
cloud,
comment,
created_on,
locator,
region,
url
FROM snowflake.account.managed_accounts
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

Creates a managed account. You must provide the full managed account definition when creating a managed account.

```sql
INSERT INTO snowflake.account.managed_accounts (
name,
comment,
admin_name,
admin_password,
account_type,
endpoint
)
SELECT 
'{{ name }}' /* required */,
'{{ comment }}',
'{{ admin_name }}' /* required */,
'{{ admin_password }}' /* required */,
'{{ account_type }}' /* required */,
'{{ endpoint }}'
RETURNING
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: managed_accounts
  props:
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the managed_accounts resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the account.
    - name: comment
      value: "{{ comment }}"
      description: |
        Optional comment in which to store information related to the account.
    - name: admin_name
      value: "{{ admin_name }}"
      description: |
        Name of the account administrator.
    - name: admin_password
      value: "{{ admin_password }}"
      description: |
        Password for the account administrator.
    - name: account_type
      value: "{{ account_type }}"
      description: |
        Type of the account.
      valid_values: ['READER']
      default: READER
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

Removes a managed account, including all objects created in the account, and immediately restricts access to the account. Currently used by data providers to create reader accounts for their consumers. For more details, see Manage reader accounts.

```sql
DELETE FROM snowflake.account.managed_accounts
WHERE name = '{{ name }}' --required
AND endpoint = '{{ endpoint }}' --required
;
```
</TabItem>
</Tabs>
