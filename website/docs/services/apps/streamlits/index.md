--- 
title: streamlits
hide_title: false
hide_table_of_contents: false
keywords:
  - streamlits
  - apps
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

Creates, updates, deletes, gets or lists a <code>streamlits</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="streamlits" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.apps.streamlits" /></td></tr>
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

Successful

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
    <td>Name of the Streamlit (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="url_id" /></td>
    <td><code>string</code></td>
    <td>A unique ID associated with the Streamlit object's URL.</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the Streamlit is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the Streamlit is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Optional description of the Streamlit app, used for documentation or metadata purposes</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the Streamlit was created.</td>
</tr>
<tr>
    <td><CopyableCode code="default_packages" /></td>
    <td><code>array</code></td>
    <td>Default Python packages for Streamlit apps.</td>
</tr>
<tr>
    <td><CopyableCode code="default_version" /></td>
    <td><code>string</code></td>
    <td>The default version name of Streamlit. Valid values are "first" (first version), "last" (latest version), or "version$N" (specific version, e.g., "version$1"). Custom names are not supported.</td>
</tr>
<tr>
    <td><CopyableCode code="default_version_details" /></td>
    <td><code>object</code></td>
    <td>The version details of a file-based entity</td>
</tr>
<tr>
    <td><CopyableCode code="external_access_integrations" /></td>
    <td><code>array</code></td>
    <td>List of external access integrations needed in order for the Streamlit app code to access external networks.</td>
</tr>
<tr>
    <td><CopyableCode code="external_access_secrets" /></td>
    <td><code>string</code></td>
    <td>Secrets needed for the Streamlit app code to access external networks.</td>
</tr>
<tr>
    <td><CopyableCode code="imports" /></td>
    <td><code>array</code></td>
    <td>List of files to be imported from a stage.</td>
</tr>
<tr>
    <td><CopyableCode code="last_version_details" /></td>
    <td><code>object</code></td>
    <td>The version details of a file-based entity</td>
</tr>
<tr>
    <td><CopyableCode code="live_version_location_uri" /></td>
    <td><code>string</code></td>
    <td>The location of the Streamlit object's live version files.</td>
</tr>
<tr>
    <td><CopyableCode code="main_file" /></td>
    <td><code>string</code></td>
    <td>Name and path of the entry file for the Streamlit app</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the Streamlit (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the Streamlit (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="query_warehouse" /></td>
    <td><code>string</code></td>
    <td>Warehouse used to run queries issued by the Streamlit app</td>
</tr>
<tr>
    <td><CopyableCode code="source_location" /></td>
    <td><code>string</code></td>
    <td>The stage from which the source files are copied to initialize the Streamlit app.</td>
</tr>
<tr>
    <td><CopyableCode code="title" /></td>
    <td><code>string</code></td>
    <td>User-facing title of the Streamlit app.</td>
</tr>
<tr>
    <td><CopyableCode code="user_packages" /></td>
    <td><code>array</code></td>
    <td>Python packages specified in the environment.yml file.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake Streamlit object

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
    <td>Name of the Streamlit (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="url_id" /></td>
    <td><code>string</code></td>
    <td>A unique ID associated with the Streamlit object's URL.</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the Streamlit is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the Streamlit is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Optional description of the Streamlit app, used for documentation or metadata purposes</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the Streamlit was created.</td>
</tr>
<tr>
    <td><CopyableCode code="default_packages" /></td>
    <td><code>array</code></td>
    <td>Default Python packages for Streamlit apps.</td>
</tr>
<tr>
    <td><CopyableCode code="default_version" /></td>
    <td><code>string</code></td>
    <td>The default version name of Streamlit. Valid values are "first" (first version), "last" (latest version), or "version$N" (specific version, e.g., "version$1"). Custom names are not supported.</td>
</tr>
<tr>
    <td><CopyableCode code="default_version_details" /></td>
    <td><code>object</code></td>
    <td>The version details of a file-based entity</td>
</tr>
<tr>
    <td><CopyableCode code="external_access_integrations" /></td>
    <td><code>array</code></td>
    <td>List of external access integrations needed in order for the Streamlit app code to access external networks.</td>
</tr>
<tr>
    <td><CopyableCode code="external_access_secrets" /></td>
    <td><code>string</code></td>
    <td>Secrets needed for the Streamlit app code to access external networks.</td>
</tr>
<tr>
    <td><CopyableCode code="imports" /></td>
    <td><code>array</code></td>
    <td>List of files to be imported from a stage.</td>
</tr>
<tr>
    <td><CopyableCode code="last_version_details" /></td>
    <td><code>object</code></td>
    <td>The version details of a file-based entity</td>
</tr>
<tr>
    <td><CopyableCode code="live_version_location_uri" /></td>
    <td><code>string</code></td>
    <td>The location of the Streamlit object's live version files.</td>
</tr>
<tr>
    <td><CopyableCode code="main_file" /></td>
    <td><code>string</code></td>
    <td>Name and path of the entry file for the Streamlit app</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the Streamlit (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the Streamlit (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="query_warehouse" /></td>
    <td><code>string</code></td>
    <td>Warehouse used to run queries issued by the Streamlit app</td>
</tr>
<tr>
    <td><CopyableCode code="source_location" /></td>
    <td><code>string</code></td>
    <td>The stage from which the source files are copied to initialize the Streamlit app.</td>
</tr>
<tr>
    <td><CopyableCode code="title" /></td>
    <td><code>string</code></td>
    <td>User-facing title of the Streamlit app.</td>
</tr>
<tr>
    <td><CopyableCode code="user_packages" /></td>
    <td><code>array</code></td>
    <td>Python packages specified in the environment.yml file.</td>
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
    <td>Fetch detailed information about a specific Streamlit by name, including metadata, configuration, and version details.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a>, <a href="#parameter-startsWith"><code>startsWith</code></a>, <a href="#parameter-showLimit"><code>showLimit</code></a>, <a href="#parameter-fromName"><code>fromName</code></a></td>
    <td>List Streamlits in a schema. Supports filtering with pattern matching.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create a new Streamlit application, or replace an existing one. Supports CREATE, CREATE OR REPLACE, and CREATE IF NOT EXISTS modes.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete a Streamlit. The Streamlit can be restored using undrop within the retention period.</td>
</tr>
<tr>
    <td><a href="#undrop"><CopyableCode code="undrop" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Restore a previously deleted Streamlit within the retention period.</td>
</tr>
<tr>
    <td><a href="#rename"><CopyableCode code="rename" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-targetName"><code>targetName</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a>, <a href="#parameter-targetDatabase"><code>targetDatabase</code></a>, <a href="#parameter-targetSchema"><code>targetSchema</code></a></td>
    <td>Rename a Streamlit to a new name, optionally in a different database or schema.</td>
</tr>
<tr>
    <td><a href="#add_live_version"><CopyableCode code="add_live_version" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-fromLast"><code>fromLast</code></a></td>
    <td>Add a live version to the Streamlit, making a specific version active for users.</td>
</tr>
<tr>
    <td><a href="#commit"><CopyableCode code="commit" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>If a Git connection is set up, commit the LIVE version of the Streamlit to the Git repository.</td>
</tr>
<tr>
    <td><a href="#add_version"><CopyableCode code="add_version" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-source_location"><code>source_location</code></a></td>
    <td></td>
    <td>Add a new version to the Streamlit by copying files from a specified stage location.</td>
</tr>
<tr>
    <td><a href="#add_version_from_git"><CopyableCode code="add_version_from_git" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-version"><code>version</code></a>, <a href="#parameter-git_ref"><code>git_ref</code></a></td>
    <td></td>
    <td>Add a new version to the Streamlit using a Git reference URI. The URI can point to either a tag or a commit.</td>
</tr>
<tr>
    <td><a href="#abort"><CopyableCode code="abort" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Abort the live version of the Streamlit, discarding uncommitted changes if a Git connection is configured.</td>
</tr>
<tr>
    <td><a href="#pull"><CopyableCode code="pull" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Pull the latest changes from the Git repository for a Streamlit with Git integration.</td>
</tr>
<tr>
    <td><a href="#push"><CopyableCode code="push" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Push committed changes from the Streamlit back to its connected Git repository.</td>
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
<tr id="parameter-fromLast">
    <td><CopyableCode code="fromLast" /></td>
    <td><code>boolean</code></td>
    <td>Set the LIVE version to the LAST version of the Streamlit.</td>
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

Fetch detailed information about a specific Streamlit by name, including metadata, configuration, and version details.

```sql
SELECT
name,
url_id,
database_name,
schema_name,
comment,
created_on,
default_packages,
default_version,
default_version_details,
external_access_integrations,
external_access_secrets,
imports,
last_version_details,
live_version_location_uri,
main_file,
owner,
owner_role_type,
query_warehouse,
source_location,
title,
user_packages
FROM snowflake.apps.streamlits
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

List Streamlits in a schema. Supports filtering with pattern matching.

```sql
SELECT
name,
url_id,
database_name,
schema_name,
comment,
created_on,
default_packages,
default_version,
default_version_details,
external_access_integrations,
external_access_secrets,
imports,
last_version_details,
live_version_location_uri,
main_file,
owner,
owner_role_type,
query_warehouse,
source_location,
title,
user_packages
FROM snowflake.apps.streamlits
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

Create a new Streamlit application, or replace an existing one. Supports CREATE, CREATE OR REPLACE, and CREATE IF NOT EXISTS modes.

```sql
INSERT INTO snowflake.apps.streamlits (
name,
comment,
imports,
external_access_integrations,
title,
main_file,
query_warehouse,
default_version,
source_location,
database_name,
schema_name,
endpoint,
createMode
)
SELECT 
'{{ name }}' /* required */,
'{{ comment }}',
'{{ imports }}',
'{{ external_access_integrations }}',
'{{ title }}',
'{{ main_file }}',
'{{ query_warehouse }}',
'{{ default_version }}',
'{{ source_location }}',
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
- name: streamlits
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the streamlits resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the streamlits resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the streamlits resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the Streamlit
    - name: comment
      value: "{{ comment }}"
      description: |
        Optional description of the Streamlit app, used for documentation or metadata purposes
    - name: imports
      value:
        - "{{ imports }}"
      description: |
        List of files to be imported from a stage.
    - name: external_access_integrations
      value:
        - "{{ external_access_integrations }}"
      description: |
        List of external access integrations needed in order for the Streamlit app code to access external networks.
    - name: title
      value: "{{ title }}"
      description: |
        User-facing title of the Streamlit app.
    - name: main_file
      value: "{{ main_file }}"
      description: |
        Name and path of the entry file for the Streamlit app
    - name: query_warehouse
      value: "{{ query_warehouse }}"
      description: |
        Warehouse used to run queries issued by the Streamlit app
    - name: default_version
      value: "{{ default_version }}"
      description: |
        The default version name of Streamlit. Valid values are "first" (first version), "last" (latest version), or "version$N" (specific version, e.g., "version$1"). Custom names are not supported.
    - name: source_location
      value: "{{ source_location }}"
      description: |
        The stage from which the source files are copied to initialize the Streamlit app.
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

Delete a Streamlit. The Streamlit can be restored using undrop within the retention period.

```sql
DELETE FROM snowflake.apps.streamlits
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
    defaultValue="undrop"
    values={[
        { label: 'undrop', value: 'undrop' },
        { label: 'rename', value: 'rename' },
        { label: 'add_live_version', value: 'add_live_version' },
        { label: 'commit', value: 'commit' },
        { label: 'add_version', value: 'add_version' },
        { label: 'add_version_from_git', value: 'add_version_from_git' },
        { label: 'abort', value: 'abort' },
        { label: 'pull', value: 'pull' },
        { label: 'push', value: 'push' }
    ]}
>
<TabItem value="undrop">

Restore a previously deleted Streamlit within the retention period.

```sql
EXEC snowflake.apps.streamlits.undrop 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required
;
```
</TabItem>
<TabItem value="rename">

Rename a Streamlit to a new name, optionally in a different database or schema.

```sql
EXEC snowflake.apps.streamlits.rename 
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
<TabItem value="add_live_version">

Add a live version to the Streamlit, making a specific version active for users.

```sql
EXEC snowflake.apps.streamlits.add_live_version 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@fromLast={{ fromLast }} 
@@json=
'{
"version": "{{ version }}"
}'
;
```
</TabItem>
<TabItem value="commit">

If a Git connection is set up, commit the LIVE version of the Streamlit to the Git repository.

```sql
EXEC snowflake.apps.streamlits.commit 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"version": "{{ version }}"
}'
;
```
</TabItem>
<TabItem value="add_version">

Add a new version to the Streamlit by copying files from a specified stage location.

```sql
EXEC snowflake.apps.streamlits.add_version 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"source_location": "{{ source_location }}", 
"version": "{{ version }}"
}'
;
```
</TabItem>
<TabItem value="add_version_from_git">

Add a new version to the Streamlit using a Git reference URI. The URI can point to either a tag or a commit.

```sql
EXEC snowflake.apps.streamlits.add_version_from_git 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"version": "{{ version }}", 
"git_ref": "{{ git_ref }}"
}'
;
```
</TabItem>
<TabItem value="abort">

Abort the live version of the Streamlit, discarding uncommitted changes if a Git connection is configured.

```sql
EXEC snowflake.apps.streamlits.abort 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required
;
```
</TabItem>
<TabItem value="pull">

Pull the latest changes from the Git repository for a Streamlit with Git integration.

```sql
EXEC snowflake.apps.streamlits.pull 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required
;
```
</TabItem>
<TabItem value="push">

Push committed changes from the Streamlit back to its connected Git repository.

```sql
EXEC snowflake.apps.streamlits.push 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"auth_type": "{{ auth_type }}"
}'
;
```
</TabItem>
</Tabs>
