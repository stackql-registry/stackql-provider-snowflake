--- 
title: password_policies
hide_title: false
hide_table_of_contents: false
keywords:
  - password_policies
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

Creates, updates, deletes, gets or lists a <code>password_policies</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="password_policies" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.security.password_policies" /></td></tr>
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
    <td>Name of the password policy (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the password policy is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the password policy is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Comment for the password policy</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the password policy was created.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the password policy (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the password policy</td>
</tr>
<tr>
    <td><CopyableCode code="password_history" /></td>
    <td><code>integer</code></td>
    <td>Number of distinct passwords that a user must create before re-using a previous password</td>
</tr>
<tr>
    <td><CopyableCode code="password_lockout_time_mins" /></td>
    <td><code>integer</code></td>
    <td>Period of time for which users will be locked after entering their password incorrectly many times (specified by MAX_RETRIES), in minutes</td>
</tr>
<tr>
    <td><CopyableCode code="password_max_age_days" /></td>
    <td><code>integer</code></td>
    <td>Period after which password must be changed, in days.</td>
</tr>
<tr>
    <td><CopyableCode code="password_max_length" /></td>
    <td><code>integer</code></td>
    <td>Maximum length of new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_max_retries" /></td>
    <td><code>integer</code></td>
    <td>Number of attempts users have to enter the correct password before their account is locked.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_age_days" /></td>
    <td><code>integer</code></td>
    <td>Period after a password is changed during which a password cannot be changed again, in days.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_length" /></td>
    <td><code>integer</code></td>
    <td>Minimum length of new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_lower_case_chars" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of lowercase characters in new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_numeric_chars" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of numeric characters in new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_special_chars" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of special characters in new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_upper_case_chars" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of uppercase characters in new password.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake password policy

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
    <td>Name of the password policy (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the password policy is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the password policy is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Comment for the password policy</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the password policy was created.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the password policy (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the password policy</td>
</tr>
<tr>
    <td><CopyableCode code="password_history" /></td>
    <td><code>integer</code></td>
    <td>Number of distinct passwords that a user must create before re-using a previous password</td>
</tr>
<tr>
    <td><CopyableCode code="password_lockout_time_mins" /></td>
    <td><code>integer</code></td>
    <td>Period of time for which users will be locked after entering their password incorrectly many times (specified by MAX_RETRIES), in minutes</td>
</tr>
<tr>
    <td><CopyableCode code="password_max_age_days" /></td>
    <td><code>integer</code></td>
    <td>Period after which password must be changed, in days.</td>
</tr>
<tr>
    <td><CopyableCode code="password_max_length" /></td>
    <td><code>integer</code></td>
    <td>Maximum length of new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_max_retries" /></td>
    <td><code>integer</code></td>
    <td>Number of attempts users have to enter the correct password before their account is locked.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_age_days" /></td>
    <td><code>integer</code></td>
    <td>Period after a password is changed during which a password cannot be changed again, in days.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_length" /></td>
    <td><code>integer</code></td>
    <td>Minimum length of new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_lower_case_chars" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of lowercase characters in new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_numeric_chars" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of numeric characters in new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_special_chars" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of special characters in new password.</td>
</tr>
<tr>
    <td><CopyableCode code="password_min_upper_case_chars" /></td>
    <td><code>integer</code></td>
    <td>Minimum number of uppercase characters in new password.</td>
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
    <td>Fetch a password policy</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a>, <a href="#parameter-startsWith"><code>startsWith</code></a>, <a href="#parameter-showLimit"><code>showLimit</code></a></td>
    <td>List password policies</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create a password policy</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete a password policy</td>
</tr>
<tr>
    <td><a href="#rename"><CopyableCode code="rename" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-targetName"><code>targetName</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a>, <a href="#parameter-targetDatabase"><code>targetDatabase</code></a>, <a href="#parameter-targetSchema"><code>targetSchema</code></a></td>
    <td>Rename a password policy with a new identifier</td>
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

Fetch a password policy

```sql
SELECT
name,
database_name,
schema_name,
comment,
created_on,
owner,
owner_role_type,
password_history,
password_lockout_time_mins,
password_max_age_days,
password_max_length,
password_max_retries,
password_min_age_days,
password_min_length,
password_min_lower_case_chars,
password_min_numeric_chars,
password_min_special_chars,
password_min_upper_case_chars
FROM snowflake.security.password_policies
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

List password policies

```sql
SELECT
name,
database_name,
schema_name,
comment,
created_on,
owner,
owner_role_type,
password_history,
password_lockout_time_mins,
password_max_age_days,
password_max_length,
password_max_retries,
password_min_age_days,
password_min_length,
password_min_lower_case_chars,
password_min_numeric_chars,
password_min_special_chars,
password_min_upper_case_chars
FROM snowflake.security.password_policies
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND "like" = '{{ like }}'
AND startsWith = '{{ startsWith }}'
AND showLimit = '{{ showLimit }}'
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

Create a password policy

```sql
INSERT INTO snowflake.security.password_policies (
comment,
password_min_length,
password_max_length,
password_min_upper_case_chars,
password_min_lower_case_chars,
password_min_numeric_chars,
password_min_special_chars,
password_min_age_days,
password_max_age_days,
password_max_retries,
password_lockout_time_mins,
password_history,
name,
database_name,
schema_name,
endpoint,
createMode
)
SELECT 
'{{ comment }}',
{{ password_min_length }},
{{ password_max_length }},
{{ password_min_upper_case_chars }},
{{ password_min_lower_case_chars }},
{{ password_min_numeric_chars }},
{{ password_min_special_chars }},
{{ password_min_age_days }},
{{ password_max_age_days }},
{{ password_max_retries }},
{{ password_lockout_time_mins }},
{{ password_history }},
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
- name: password_policies
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the password_policies resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the password_policies resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the password_policies resource.
    - name: comment
      value: "{{ comment }}"
      description: |
        Comment for the password policy
    - name: password_min_length
      value: {{ password_min_length }}
      description: |
        Minimum length of new password.
    - name: password_max_length
      value: {{ password_max_length }}
      description: |
        Maximum length of new password.
    - name: password_min_upper_case_chars
      value: {{ password_min_upper_case_chars }}
      description: |
        Minimum number of uppercase characters in new password.
    - name: password_min_lower_case_chars
      value: {{ password_min_lower_case_chars }}
      description: |
        Minimum number of lowercase characters in new password.
    - name: password_min_numeric_chars
      value: {{ password_min_numeric_chars }}
      description: |
        Minimum number of numeric characters in new password.
    - name: password_min_special_chars
      value: {{ password_min_special_chars }}
      description: |
        Minimum number of special characters in new password.
    - name: password_min_age_days
      value: {{ password_min_age_days }}
      description: |
        Period after a password is changed during which a password cannot be changed again, in days.
    - name: password_max_age_days
      value: {{ password_max_age_days }}
      description: |
        Period after which password must be changed, in days.
    - name: password_max_retries
      value: {{ password_max_retries }}
      description: |
        Number of attempts users have to enter the correct password before their account is locked.
    - name: password_lockout_time_mins
      value: {{ password_lockout_time_mins }}
      description: |
        Period of time for which users will be locked after entering their password incorrectly many times (specified by MAX_RETRIES), in minutes
    - name: password_history
      value: {{ password_history }}
      description: |
        Number of distinct passwords that a user must create before re-using a previous password
    - name: name
      value: "{{ name }}"
      description: |
        Name of the password policy
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

Delete a password policy

```sql
DELETE FROM snowflake.security.password_policies
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
    defaultValue="rename"
    values={[
        { label: 'rename', value: 'rename' }
    ]}
>
<TabItem value="rename">

Rename a password policy with a new identifier

```sql
EXEC snowflake.security.password_policies.rename 
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
