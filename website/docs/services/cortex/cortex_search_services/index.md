--- 
title: cortex_search_services
hide_title: false
hide_table_of_contents: false
keywords:
  - cortex_search_services
  - cortex
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

Creates, updates, deletes, gets or lists a <code>cortex_search_services</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="cortex_search_services" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.cortex.cortex_search_services" /></td></tr>
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
    <td>Specifies the name for the cortex search service, must be unique for the schema in which the cortex search service is created</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the cortex search service is stored</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the cortex search service is stored</td>
</tr>
<tr>
    <td><CopyableCode code="attribute_columns" /></td>
    <td><code>array</code></td>
    <td>Specifies the attribute columns, which can be referenced in filters in search queries to the cortex search service.</td>
</tr>
<tr>
    <td><CopyableCode code="columns" /></td>
    <td><code>array</code></td>
    <td>Specifies all columns included in the cortex search service and that can be returned in search queries.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Specifies a comment for the cortex search service</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the cortex search service was created.</td>
</tr>
<tr>
    <td><CopyableCode code="data_timestamp" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time as of which data existent in base tables is now serving.</td>
</tr>
<tr>
    <td><CopyableCode code="definition" /></td>
    <td><code>string</code></td>
    <td>Specifies the definition (source query) used to create the cortex search service (example: SELECT col1, col2 FROM foo)</td>
</tr>
<tr>
    <td><CopyableCode code="indexing_error" /></td>
    <td><code>string</code></td>
    <td>Error encountered during the latest indexing pipeline of the cortex search service, if any.</td>
</tr>
<tr>
    <td><CopyableCode code="indexing_state" /></td>
    <td><code>string</code></td>
    <td>Current state of the indexing pipeline for the cortex search service; one of 'SUSPENDED' or 'ACTIVE'. (ACTIVE, SUSPENDED, INITIALIZING)</td>
</tr>
<tr>
    <td><CopyableCode code="search_column" /></td>
    <td><code>string</code></td>
    <td>Specifies the name of the search column for the cortex search service.</td>
</tr>
<tr>
    <td><CopyableCode code="serving_data_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Size of the serving index, in bytes.</td>
</tr>
<tr>
    <td><CopyableCode code="serving_state" /></td>
    <td><code>string</code></td>
    <td>Whether the cortex search service is currently actively serving; one of 'SUSPENDED' or 'ACTIVE'. (ACTIVE, SUSPENDED, INITIALIZING)</td>
</tr>
<tr>
    <td><CopyableCode code="source_data_num_rows" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of rows in the materialized source data feeding into the cortex search service.</td>
</tr>
<tr>
    <td><CopyableCode code="target_lag" /></td>
    <td><code>object</code></td>
    <td>Specifies the schedule for periodically refreshing the cortex search service.</td>
</tr>
<tr>
    <td><CopyableCode code="warehouse" /></td>
    <td><code>string</code></td>
    <td>Specifies the name of the warehouse that provides the compute resources for refreshing the cortex search service (example: test_wh)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake cortex search service object.

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
    <td>Specifies the name for the cortex search service, must be unique for the schema in which the cortex search service is created</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the cortex search service is stored</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the cortex search service is stored</td>
</tr>
<tr>
    <td><CopyableCode code="attribute_columns" /></td>
    <td><code>array</code></td>
    <td>Specifies the attribute columns, which can be referenced in filters in search queries to the cortex search service.</td>
</tr>
<tr>
    <td><CopyableCode code="columns" /></td>
    <td><code>array</code></td>
    <td>Specifies all columns included in the cortex search service and that can be returned in search queries.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Specifies a comment for the cortex search service</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the cortex search service was created.</td>
</tr>
<tr>
    <td><CopyableCode code="data_timestamp" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time as of which data existent in base tables is now serving.</td>
</tr>
<tr>
    <td><CopyableCode code="definition" /></td>
    <td><code>string</code></td>
    <td>Specifies the definition (source query) used to create the cortex search service (example: SELECT col1, col2 FROM foo)</td>
</tr>
<tr>
    <td><CopyableCode code="indexing_error" /></td>
    <td><code>string</code></td>
    <td>Error encountered during the latest indexing pipeline of the cortex search service, if any.</td>
</tr>
<tr>
    <td><CopyableCode code="indexing_state" /></td>
    <td><code>string</code></td>
    <td>Current state of the indexing pipeline for the cortex search service; one of 'SUSPENDED' or 'ACTIVE'. (ACTIVE, SUSPENDED, INITIALIZING)</td>
</tr>
<tr>
    <td><CopyableCode code="search_column" /></td>
    <td><code>string</code></td>
    <td>Specifies the name of the search column for the cortex search service.</td>
</tr>
<tr>
    <td><CopyableCode code="serving_data_bytes" /></td>
    <td><code>integer (int64)</code></td>
    <td>Size of the serving index, in bytes.</td>
</tr>
<tr>
    <td><CopyableCode code="serving_state" /></td>
    <td><code>string</code></td>
    <td>Whether the cortex search service is currently actively serving; one of 'SUSPENDED' or 'ACTIVE'. (ACTIVE, SUSPENDED, INITIALIZING)</td>
</tr>
<tr>
    <td><CopyableCode code="source_data_num_rows" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of rows in the materialized source data feeding into the cortex search service.</td>
</tr>
<tr>
    <td><CopyableCode code="target_lag" /></td>
    <td><code>object</code></td>
    <td>Specifies the schedule for periodically refreshing the cortex search service.</td>
</tr>
<tr>
    <td><CopyableCode code="warehouse" /></td>
    <td><code>string</code></td>
    <td>Specifies the name of the warehouse that provides the compute resources for refreshing the cortex search service (example: test_wh)</td>
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
    <td>Fetch a Cortex Search Service.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a>, <a href="#parameter-fromName"><code>fromName</code></a>, <a href="#parameter-showLimit"><code>showLimit</code></a></td>
    <td>Lists the cortex search services under the database and schema.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-search_column"><code>search_column</code></a>, <a href="#parameter-target_lag"><code>target_lag</code></a>, <a href="#parameter-warehouse"><code>warehouse</code></a>, <a href="#parameter-definition"><code>definition</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create a cortex search service, with standard create modifiers as query parameters. See the Cortex Search Service component definition for what is required to be provided in the request body.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete a cortex search service with the given name. If ifExists is used, the operation will succeed even if the object does not exist. Otherwise, there will be a failure if the drop is unsuccessful.</td>
</tr>
<tr>
    <td><a href="#query"><CopyableCode code="query" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-service_name"><code>service_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Query a Cortex Search Service to get search results.</td>
</tr>
<tr>
    <td><a href="#suggest"><CopyableCode code="suggest" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-service_name"><code>service_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-query"><code>query</code></a></td>
    <td></td>
    <td>Suggest from a Cortex Search Service to get auto-complete or contextual suggestions</td>
</tr>
<tr>
    <td><a href="#suspend"><CopyableCode code="suspend" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a>, <a href="#parameter-target"><code>target</code></a></td>
    <td>Suspends one or both of the indexing or serving targets of a cortex search service.</td>
</tr>
<tr>
    <td><a href="#resume"><CopyableCode code="resume" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a>, <a href="#parameter-target"><code>target</code></a></td>
    <td>Resume the cortex search service</td>
</tr>
<tr>
    <td><a href="#feedback"><CopyableCode code="feedback" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-request_id"><code>request_id</code></a>, <a href="#parameter-positive"><code>positive</code></a></td>
    <td></td>
    <td>Send user feedback for a Cortex Search result</td>
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
<tr id="parameter-service_name">
    <td><CopyableCode code="service_name" /></td>
    <td><code>string</code></td>
    <td>The name of the Cortex Search Service</td>
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
<tr id="parameter-target">
    <td><CopyableCode code="target" /></td>
    <td><code>string</code></td>
    <td>Query parameter that identifies the target to which suspension or resumption of the cortex search service should be applied.</td>
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

Fetch a Cortex Search Service.

```sql
SELECT
name,
database_name,
schema_name,
attribute_columns,
columns,
comment,
created_on,
data_timestamp,
definition,
indexing_error,
indexing_state,
search_column,
serving_data_bytes,
serving_state,
source_data_num_rows,
target_lag,
warehouse
FROM snowflake.cortex.cortex_search_services
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists the cortex search services under the database and schema.

```sql
SELECT
name,
database_name,
schema_name,
attribute_columns,
columns,
comment,
created_on,
data_timestamp,
definition,
indexing_error,
indexing_state,
search_column,
serving_data_bytes,
serving_state,
source_data_num_rows,
target_lag,
warehouse
FROM snowflake.cortex.cortex_search_services
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND "like" = '{{ like }}'
AND fromName = '{{ fromName }}'
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

Create a cortex search service, with standard create modifiers as query parameters. See the Cortex Search Service component definition for what is required to be provided in the request body.

```sql
INSERT INTO snowflake.cortex.cortex_search_services (
name,
search_column,
columns,
attribute_columns,
target_lag,
warehouse,
definition,
comment,
indexing_state,
serving_state,
database_name,
schema_name,
endpoint,
createMode
)
SELECT 
'{{ name }}' /* required */,
'{{ search_column }}' /* required */,
'{{ columns }}',
'{{ attribute_columns }}',
'{{ target_lag }}' /* required */,
'{{ warehouse }}' /* required */,
'{{ definition }}' /* required */,
'{{ comment }}',
'{{ indexing_state }}',
'{{ serving_state }}',
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
- name: cortex_search_services
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the cortex_search_services resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the cortex_search_services resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the cortex_search_services resource.
    - name: name
      value: "{{ name }}"
      description: |
        Specifies the name for the cortex search service, must be unique for the schema in which the cortex search service is created
    - name: search_column
      value: "{{ search_column }}"
      description: |
        Specifies the name of the search column for the cortex search service.
    - name: columns
      value:
        - "{{ columns }}"
      description: |
        Specifies all columns included in the cortex search service and that can be returned in search queries.
    - name: attribute_columns
      value:
        - "{{ attribute_columns }}"
      description: |
        Specifies the attribute columns, which can be referenced in filters in search queries to the cortex search service.
    - name: target_lag
      description: |
        Specifies the schedule for periodically refreshing the cortex search service.
      value:
        type: "{{ type }}"
    - name: warehouse
      value: "{{ warehouse }}"
      description: |
        Specifies the name of the warehouse that provides the compute resources for refreshing the cortex search service
    - name: definition
      value: "{{ definition }}"
      description: |
        Specifies the definition (source query) used to create the cortex search service
    - name: comment
      value: "{{ comment }}"
      description: |
        Specifies a comment for the cortex search service
    - name: indexing_state
      value: "{{ indexing_state }}"
      description: |
        Current state of the indexing pipeline for the cortex search service; one of 'SUSPENDED' or 'ACTIVE'.
      valid_values: ['ACTIVE', 'SUSPENDED', 'INITIALIZING']
    - name: serving_state
      value: "{{ serving_state }}"
      description: |
        Whether the cortex search service is currently actively serving; one of 'SUSPENDED' or 'ACTIVE'.
      valid_values: ['ACTIVE', 'SUSPENDED', 'INITIALIZING']
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

Delete a cortex search service with the given name. If ifExists is used, the operation will succeed even if the object does not exist. Otherwise, there will be a failure if the drop is unsuccessful.

```sql
DELETE FROM snowflake.cortex.cortex_search_services
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
    defaultValue="query"
    values={[
        { label: 'query', value: 'query' },
        { label: 'suggest', value: 'suggest' },
        { label: 'suspend', value: 'suspend' },
        { label: 'resume', value: 'resume' },
        { label: 'feedback', value: 'feedback' }
    ]}
>
<TabItem value="query">

Query a Cortex Search Service to get search results.

```sql
EXEC snowflake.cortex.cortex_search_services.query 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@service_name='{{ service_name }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"query": "{{ query }}", 
"multi_index_query": "{{ multi_index_query }}", 
"columns": "{{ columns }}", 
"filter": "{{ filter }}", 
"limit": {{ limit }}, 
"scoring_config": "{{ scoring_config }}", 
"scoring_profile": "{{ scoring_profile }}", 
"experimental": "{{ experimental }}"
}'
;
```
</TabItem>
<TabItem value="suggest">

Suggest from a Cortex Search Service to get auto-complete or contextual suggestions

```sql
EXEC snowflake.cortex.cortex_search_services.suggest 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@service_name='{{ service_name }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"query": "{{ query }}", 
"columns": "{{ columns }}", 
"limit": {{ limit }}
}'
;
```
</TabItem>
<TabItem value="suspend">

Suspends one or both of the indexing or serving targets of a cortex search service.

```sql
EXEC snowflake.cortex.cortex_search_services.suspend 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@ifExists={{ ifExists }}, 
@target='{{ target }}'
;
```
</TabItem>
<TabItem value="resume">

Resume the cortex search service

```sql
EXEC snowflake.cortex.cortex_search_services.resume 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@ifExists={{ ifExists }}, 
@target='{{ target }}'
;
```
</TabItem>
<TabItem value="feedback">

Send user feedback for a Cortex Search result

```sql
EXEC snowflake.cortex.cortex_search_services.feedback 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"request_id": "{{ request_id }}", 
"positive": {{ positive }}, 
"feedback_message": "{{ feedback_message }}"
}'
;
```
</TabItem>
</Tabs>
