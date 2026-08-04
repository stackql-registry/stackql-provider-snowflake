--- 
title: iceberg_tables
hide_title: false
hide_table_of_contents: false
keywords:
  - iceberg_tables
  - tables
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

Creates, updates, deletes, gets or lists an <code>iceberg_tables</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="iceberg_tables" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.tables.iceberg_tables" /></td></tr>
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
    <td>Name of the iceberg table (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="catalog_table_name" /></td>
    <td><code>string</code></td>
    <td>Name of the table as recognized by the catalog.</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the iceberg table is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the iceberg table is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="auto_refresh" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether to automatically refresh the table metadata</td>
</tr>
<tr>
    <td><CopyableCode code="base_location" /></td>
    <td><code>string</code></td>
    <td>The path to a directory where Snowflake can write data and metadata files for the table.</td>
</tr>
<tr>
    <td><CopyableCode code="can_write_metadata" /></td>
    <td><code>string</code></td>
    <td>Signifies whether Snowflake can write metadata to the location specified by the file_path.</td>
</tr>
<tr>
    <td><CopyableCode code="catalog" /></td>
    <td><code>string</code></td>
    <td>Name of the catalog integration to use for iceberg tables</td>
</tr>
<tr>
    <td><CopyableCode code="catalog_namespace" /></td>
    <td><code>string</code></td>
    <td>Catalog namespace for the table. The namespace defined when the table was created. Otherwise, the default namespace associated with the catalog integration used by the table. If you’re syncing the table to Snowflake Open Catalog, the default is null.</td>
</tr>
<tr>
    <td><CopyableCode code="catalog_sync" /></td>
    <td><code>string</code></td>
    <td>Name of the catalog integration to sync this table</td>
</tr>
<tr>
    <td><CopyableCode code="change_tracking" /></td>
    <td><code>boolean</code></td>
    <td>True if change tracking is enabled, allowing streams and CHANGES to be used on the entity.</td>
</tr>
<tr>
    <td><CopyableCode code="cluster_by" /></td>
    <td><code>array</code></td>
    <td>Specifies one or more columns or column expressions in the table as the clustering key.</td>
</tr>
<tr>
    <td><CopyableCode code="columns" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>user comment associated to an object in the dictionary</td>
</tr>
<tr>
    <td><CopyableCode code="constraints" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the iceberg table was created.</td>
</tr>
<tr>
    <td><CopyableCode code="data_retention_time_in_days" /></td>
    <td><code>integer</code></td>
    <td>number of days to retain the old version of deleted/updated data</td>
</tr>
<tr>
    <td><CopyableCode code="external_volume" /></td>
    <td><code>string</code></td>
    <td>Name of an external volume that will be used for persisted Iceberg metadata and data files.</td>
</tr>
<tr>
    <td><CopyableCode code="iceberg_table_type" /></td>
    <td><code>string</code></td>
    <td>Type of Iceberg table. UNMANAGED if the table is not managed by Snowflake. NOT ICEBERG otherwise.</td>
</tr>
<tr>
    <td><CopyableCode code="max_data_extension_time_in_days" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of days to extend data retention beyond the retention period to prevent a stream becoming stale.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata_file_path" /></td>
    <td><code>string</code></td>
    <td>Specifies the relative path of the Iceberg metadata file to use for column definitions.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the iceberg table (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the iceberg table (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="replace_invalid_characters" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether to replace invalid characters in the column names</td>
</tr>
<tr>
    <td><CopyableCode code="storage_serialization_policy" /></td>
    <td><code>string</code></td>
    <td>Storage serialization policy used for managed Iceberg table. This include encodings and compressions (COMPATIBLE, OPTIMIZED)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake iceberg table

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
    <td>Name of the iceberg table (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="catalog_table_name" /></td>
    <td><code>string</code></td>
    <td>Name of the table as recognized by the catalog.</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>Database in which the iceberg table is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Schema in which the iceberg table is stored (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="auto_refresh" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether to automatically refresh the table metadata</td>
</tr>
<tr>
    <td><CopyableCode code="base_location" /></td>
    <td><code>string</code></td>
    <td>The path to a directory where Snowflake can write data and metadata files for the table.</td>
</tr>
<tr>
    <td><CopyableCode code="can_write_metadata" /></td>
    <td><code>string</code></td>
    <td>Signifies whether Snowflake can write metadata to the location specified by the file_path.</td>
</tr>
<tr>
    <td><CopyableCode code="catalog" /></td>
    <td><code>string</code></td>
    <td>Name of the catalog integration to use for iceberg tables</td>
</tr>
<tr>
    <td><CopyableCode code="catalog_namespace" /></td>
    <td><code>string</code></td>
    <td>Catalog namespace for the table. The namespace defined when the table was created. Otherwise, the default namespace associated with the catalog integration used by the table. If you’re syncing the table to Snowflake Open Catalog, the default is null.</td>
</tr>
<tr>
    <td><CopyableCode code="catalog_sync" /></td>
    <td><code>string</code></td>
    <td>Name of the catalog integration to sync this table</td>
</tr>
<tr>
    <td><CopyableCode code="change_tracking" /></td>
    <td><code>boolean</code></td>
    <td>True if change tracking is enabled, allowing streams and CHANGES to be used on the entity.</td>
</tr>
<tr>
    <td><CopyableCode code="cluster_by" /></td>
    <td><code>array</code></td>
    <td>Specifies one or more columns or column expressions in the table as the clustering key.</td>
</tr>
<tr>
    <td><CopyableCode code="columns" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>user comment associated to an object in the dictionary</td>
</tr>
<tr>
    <td><CopyableCode code="constraints" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>Date and time when the iceberg table was created.</td>
</tr>
<tr>
    <td><CopyableCode code="data_retention_time_in_days" /></td>
    <td><code>integer</code></td>
    <td>number of days to retain the old version of deleted/updated data</td>
</tr>
<tr>
    <td><CopyableCode code="external_volume" /></td>
    <td><code>string</code></td>
    <td>Name of an external volume that will be used for persisted Iceberg metadata and data files.</td>
</tr>
<tr>
    <td><CopyableCode code="iceberg_table_type" /></td>
    <td><code>string</code></td>
    <td>Type of Iceberg table. UNMANAGED if the table is not managed by Snowflake. NOT ICEBERG otherwise.</td>
</tr>
<tr>
    <td><CopyableCode code="max_data_extension_time_in_days" /></td>
    <td><code>integer</code></td>
    <td>Maximum number of days to extend data retention beyond the retention period to prevent a stream becoming stale.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata_file_path" /></td>
    <td><code>string</code></td>
    <td>Specifies the relative path of the Iceberg metadata file to use for column definitions.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>Role that owns the iceberg table (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The type of role that owns the iceberg table (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>)</td>
</tr>
<tr>
    <td><CopyableCode code="replace_invalid_characters" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether to replace invalid characters in the column names</td>
</tr>
<tr>
    <td><CopyableCode code="storage_serialization_policy" /></td>
    <td><code>string</code></td>
    <td>Storage serialization policy used for managed Iceberg table. This include encodings and compressions (COMPATIBLE, OPTIMIZED)</td>
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
    <td>Describe an iceberg table</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-like"><code>like</code></a>, <a href="#parameter-startsWith"><code>startsWith</code></a>, <a href="#parameter-showLimit"><code>showLimit</code></a>, <a href="#parameter-fromName"><code>fromName</code></a>, <a href="#parameter-deep"><code>deep</code></a></td>
    <td>Lists the Apache Iceberg™ tables for which you have access privileges.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a>, <a href="#parameter-copyGrants"><code>copyGrants</code></a></td>
    <td>Create a snowflake managed iceberg table (clone and undrop are separate subresources)</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a>, <a href="#parameter-type"><code>type</code></a></td>
    <td>Drop an iceberg table</td>
</tr>
<tr>
    <td><a href="#as_select"><CopyableCode code="as_select" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-query"><code>query</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a>, <a href="#parameter-copyGrants"><code>copyGrants</code></a></td>
    <td>Create a snowflake managed iceberg table as select</td>
</tr>
<tr>
    <td><a href="#from_aws_glue_catalog"><CopyableCode code="from_aws_glue_catalog" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-catalog_table_name"><code>catalog_table_name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create an unmanaged iceberg table from AWS Glue catalog</td>
</tr>
<tr>
    <td><a href="#from_delta"><CopyableCode code="from_delta" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-base_location"><code>base_location</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create an unmanaged iceberg table from Delta</td>
</tr>
<tr>
    <td><a href="#from_iceberg_files"><CopyableCode code="from_iceberg_files" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-metadata_file_path"><code>metadata_file_path</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create an unmanaged iceberg table from Iceberg files</td>
</tr>
<tr>
    <td><a href="#from_iceberg_rest"><CopyableCode code="from_iceberg_rest" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-catalog_table_name"><code>catalog_table_name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create an unmanaged iceberg table from Iceberg REST</td>
</tr>
<tr>
    <td><a href="#resume_recluster"><CopyableCode code="resume_recluster" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Resume recluster of an iceberg table (iceberg tables managed by an external catalog do not allow clustering)</td>
</tr>
<tr>
    <td><a href="#suspend_recluster"><CopyableCode code="suspend_recluster" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Suspend recluster of an iceberg table (iceberg tables managed by an external catalog do not allow clustering)</td>
</tr>
<tr>
    <td><a href="#refresh"><CopyableCode code="refresh" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Refreshes the metadata for an Apache Iceberg table that uses an external Iceberg catalog</td>
</tr>
<tr>
    <td><a href="#convert_to_managed"><CopyableCode code="convert_to_managed" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Convert unmanaged iceberg table to managed iceberg table</td>
</tr>
<tr>
    <td><a href="#undrop"><CopyableCode code="undrop" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Undrop an iceberg table</td>
</tr>
<tr>
    <td><a href="#clone"><CopyableCode code="clone" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a>, <a href="#parameter-copyGrants"><code>copyGrants</code></a>, <a href="#parameter-targetDatabase"><code>targetDatabase</code></a>, <a href="#parameter-targetSchema"><code>targetSchema</code></a></td>
    <td>Clone a snowflake managed iceberg table</td>
</tr>
<tr>
    <td><a href="#create_like"><CopyableCode code="create_like" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a>, <a href="#parameter-copyGrants"><code>copyGrants</code></a>, <a href="#parameter-targetDatabase"><code>targetDatabase</code></a>, <a href="#parameter-targetSchema"><code>targetSchema</code></a></td>
    <td>Creates a new table with the same column definitions as an existing table, but without copying data from the existing table.</td>
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
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>The SQL select query to run to set up the table values (and possibly columns).</td>
</tr>
<tr id="parameter-schema_name">
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>Identifier (i.e. name) for the schema to which the resource belongs. You can use the `/api/v2/databases/&#123;database&#125;/schemas` GET request to get a list of available schemas for the specified database.</td>
</tr>
<tr id="parameter-copyGrants">
    <td><CopyableCode code="copyGrants" /></td>
    <td><code>boolean</code></td>
    <td>Parameter to enable copy grants when creating the object.</td>
</tr>
<tr id="parameter-createMode">
    <td><CopyableCode code="createMode" /></td>
    <td><code>string</code></td>
    <td>Parameter allowing support for different modes of resource creation. Possible values include: - `errorIfExists`: Throws an error if you try to create a resource that already exists. - `orReplace`: Automatically replaces the existing resource with the current one. - `ifNotExists`: Creates a new resource when an alter is requested for a non-existent resource.</td>
</tr>
<tr id="parameter-deep">
    <td><CopyableCode code="deep" /></td>
    <td><code>boolean</code></td>
    <td>Optionally includes dependency information of the table.</td>
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
    <td>Database of the newly created table. Defaults to the source table's database.</td>
</tr>
<tr id="parameter-targetSchema">
    <td><CopyableCode code="targetSchema" /></td>
    <td><code>string</code></td>
    <td>Schema of the newly created table. Defaults to the source table's schema.</td>
</tr>
<tr id="parameter-type">
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Specifies whether the table can be dropped if foreign keys exist that reference the table.</td>
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

Describe an iceberg table

```sql
SELECT
name,
catalog_table_name,
database_name,
schema_name,
auto_refresh,
base_location,
can_write_metadata,
catalog,
catalog_namespace,
catalog_sync,
change_tracking,
cluster_by,
columns,
comment,
constraints,
created_on,
data_retention_time_in_days,
external_volume,
iceberg_table_type,
max_data_extension_time_in_days,
metadata_file_path,
owner,
owner_role_type,
replace_invalid_characters,
storage_serialization_policy
FROM snowflake.tables.iceberg_tables
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists the Apache Iceberg™ tables for which you have access privileges.

```sql
SELECT
name,
catalog_table_name,
database_name,
schema_name,
auto_refresh,
base_location,
can_write_metadata,
catalog,
catalog_namespace,
catalog_sync,
change_tracking,
cluster_by,
columns,
comment,
constraints,
created_on,
data_retention_time_in_days,
external_volume,
iceberg_table_type,
max_data_extension_time_in_days,
metadata_file_path,
owner,
owner_role_type,
replace_invalid_characters,
storage_serialization_policy
FROM snowflake.tables.iceberg_tables
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND "like" = '{{ like }}'
AND startsWith = '{{ startsWith }}'
AND showLimit = '{{ showLimit }}'
AND fromName = '{{ fromName }}'
AND deep = '{{ deep }}'
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

Create a snowflake managed iceberg table (clone and undrop are separate subresources)

```sql
INSERT INTO snowflake.tables.iceberg_tables (
name,
comment,
change_tracking,
max_data_extension_time_in_days,
external_volume,
data_retention_time_in_days,
catalog_sync,
catalog,
storage_serialization_policy,
catalog_table_name,
catalog_namespace,
cluster_by,
columns,
base_location,
replace_invalid_characters,
metadata_file_path,
constraints,
database_name,
schema_name,
endpoint,
createMode,
copyGrants
)
SELECT 
'{{ name }}' /* required */,
'{{ comment }}',
{{ change_tracking }},
{{ max_data_extension_time_in_days }},
'{{ external_volume }}',
{{ data_retention_time_in_days }},
'{{ catalog_sync }}',
'{{ catalog }}',
'{{ storage_serialization_policy }}',
'{{ catalog_table_name }}',
'{{ catalog_namespace }}',
'{{ cluster_by }}',
'{{ columns }}',
'{{ base_location }}',
{{ replace_invalid_characters }},
'{{ metadata_file_path }}',
'{{ constraints }}',
'{{ database_name }}',
'{{ schema_name }}',
'{{ endpoint }}',
'{{ createMode }}',
'{{ copyGrants }}'
RETURNING
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: iceberg_tables
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the iceberg_tables resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the iceberg_tables resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the iceberg_tables resource.
    - name: name
      value: "{{ name }}"
      description: |
        Name of the iceberg table
    - name: comment
      value: "{{ comment }}"
      description: |
        user comment associated to an object in the dictionary
    - name: change_tracking
      value: {{ change_tracking }}
      description: |
        True if change tracking is enabled, allowing streams and CHANGES to be used on the entity.
    - name: max_data_extension_time_in_days
      value: {{ max_data_extension_time_in_days }}
      description: |
        Maximum number of days to extend data retention beyond the retention period to prevent a stream becoming stale.
    - name: external_volume
      value: "{{ external_volume }}"
      description: |
        Name of an external volume that will be used for persisted Iceberg metadata and data files.
    - name: data_retention_time_in_days
      value: {{ data_retention_time_in_days }}
      description: |
        number of days to retain the old version of deleted/updated data
    - name: catalog_sync
      value: "{{ catalog_sync }}"
      description: |
        Name of the catalog integration to sync this table
    - name: catalog
      value: "{{ catalog }}"
      description: |
        Name of the catalog integration to use for iceberg tables
    - name: storage_serialization_policy
      value: "{{ storage_serialization_policy }}"
      description: |
        Storage serialization policy used for managed Iceberg table. This include encodings and compressions
      valid_values: ['COMPATIBLE', 'OPTIMIZED']
    - name: catalog_table_name
      value: "{{ catalog_table_name }}"
      description: |
        Name of the table as recognized by the catalog.
    - name: catalog_namespace
      value: "{{ catalog_namespace }}"
      description: |
        Catalog namespace for the table. The namespace defined when the table was created. Otherwise, the default namespace associated with the catalog integration used by the table. If you’re syncing the table to Snowflake Open Catalog, the default is null.
    - name: cluster_by
      value:
        - "{{ cluster_by }}"
      description: |
        Specifies one or more columns or column expressions in the table as the clustering key.
    - name: columns
      value:
        - name: "{{ name }}"
          datatype: "{{ datatype }}"
          comment: "{{ comment }}"
          nullable: {{ nullable }}
          default_value: "{{ default_value }}"
    - name: base_location
      value: "{{ base_location }}"
      description: |
        The path to a directory where Snowflake can write data and metadata files for the table.
    - name: replace_invalid_characters
      value: {{ replace_invalid_characters }}
      description: |
        Specifies whether to replace invalid characters in the column names
    - name: metadata_file_path
      value: "{{ metadata_file_path }}"
      description: |
        Specifies the relative path of the Iceberg metadata file to use for column definitions.
    - name: constraints
      value:
        - name: "{{ name }}"
          column_names: "{{ column_names }}"
          constraint_type: "{{ constraint_type }}"
    - name: createMode
      value: "{{ createMode }}"
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
    - name: copyGrants
      value: {{ copyGrants }}
      description: Parameter to enable copy grants when creating the object.
      description: Parameter to enable copy grants when creating the object.
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

Drop an iceberg table

```sql
DELETE FROM snowflake.tables.iceberg_tables
WHERE database_name = '{{ database_name }}' --required
AND schema_name = '{{ schema_name }}' --required
AND name = '{{ name }}' --required
AND endpoint = '{{ endpoint }}' --required
AND ifExists = '{{ ifExists }}'
AND type = '{{ type }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="as_select"
    values={[
        { label: 'as_select', value: 'as_select' },
        { label: 'from_aws_glue_catalog', value: 'from_aws_glue_catalog' },
        { label: 'from_delta', value: 'from_delta' },
        { label: 'from_iceberg_files', value: 'from_iceberg_files' },
        { label: 'from_iceberg_rest', value: 'from_iceberg_rest' },
        { label: 'resume_recluster', value: 'resume_recluster' },
        { label: 'suspend_recluster', value: 'suspend_recluster' },
        { label: 'refresh', value: 'refresh' },
        { label: 'convert_to_managed', value: 'convert_to_managed' },
        { label: 'undrop', value: 'undrop' },
        { label: 'clone', value: 'clone' },
        { label: 'create_like', value: 'create_like' }
    ]}
>
<TabItem value="as_select">

Create a snowflake managed iceberg table as select

```sql
EXEC snowflake.tables.iceberg_tables.as_select 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@query='{{ query }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@createMode='{{ createMode }}', 
@copyGrants={{ copyGrants }} 
@@json=
'{
"name": "{{ name }}", 
"columns": "{{ columns }}", 
"external_volume": "{{ external_volume }}", 
"cluster_by": "{{ cluster_by }}", 
"base_location": "{{ base_location }}", 
"comment": "{{ comment }}"
}'
;
```
</TabItem>
<TabItem value="from_aws_glue_catalog">

Create an unmanaged iceberg table from AWS Glue catalog

```sql
EXEC snowflake.tables.iceberg_tables.from_aws_glue_catalog 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@createMode='{{ createMode }}' 
@@json=
'{
"name": "{{ name }}", 
"external_volume": "{{ external_volume }}", 
"catalog_table_name": "{{ catalog_table_name }}", 
"catalog_namespace": "{{ catalog_namespace }}", 
"replace_invalid_characters": {{ replace_invalid_characters }}, 
"auto_refresh": {{ auto_refresh }}, 
"catalog": "{{ catalog }}", 
"comment": "{{ comment }}"
}'
;
```
</TabItem>
<TabItem value="from_delta">

Create an unmanaged iceberg table from Delta

```sql
EXEC snowflake.tables.iceberg_tables.from_delta 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@createMode='{{ createMode }}' 
@@json=
'{
"name": "{{ name }}", 
"external_volume": "{{ external_volume }}", 
"replace_invalid_characters": {{ replace_invalid_characters }}, 
"base_location": "{{ base_location }}", 
"catalog": "{{ catalog }}", 
"comment": "{{ comment }}"
}'
;
```
</TabItem>
<TabItem value="from_iceberg_files">

Create an unmanaged iceberg table from Iceberg files

```sql
EXEC snowflake.tables.iceberg_tables.from_iceberg_files 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@createMode='{{ createMode }}' 
@@json=
'{
"name": "{{ name }}", 
"external_volume": "{{ external_volume }}", 
"replace_invalid_characters": {{ replace_invalid_characters }}, 
"metadata_file_path": "{{ metadata_file_path }}", 
"catalog": "{{ catalog }}", 
"comment": "{{ comment }}"
}'
;
```
</TabItem>
<TabItem value="from_iceberg_rest">

Create an unmanaged iceberg table from Iceberg REST

```sql
EXEC snowflake.tables.iceberg_tables.from_iceberg_rest 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@createMode='{{ createMode }}' 
@@json=
'{
"name": "{{ name }}", 
"external_volume": "{{ external_volume }}", 
"catalog_table_name": "{{ catalog_table_name }}", 
"catalog_namespace": "{{ catalog_namespace }}", 
"replace_invalid_characters": {{ replace_invalid_characters }}, 
"auto_refresh": {{ auto_refresh }}, 
"catalog": "{{ catalog }}", 
"comment": "{{ comment }}"
}'
;
```
</TabItem>
<TabItem value="resume_recluster">

Resume recluster of an iceberg table (iceberg tables managed by an external catalog do not allow clustering)

```sql
EXEC snowflake.tables.iceberg_tables.resume_recluster 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@ifExists={{ ifExists }}
;
```
</TabItem>
<TabItem value="suspend_recluster">

Suspend recluster of an iceberg table (iceberg tables managed by an external catalog do not allow clustering)

```sql
EXEC snowflake.tables.iceberg_tables.suspend_recluster 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@ifExists={{ ifExists }}
;
```
</TabItem>
<TabItem value="refresh">

Refreshes the metadata for an Apache Iceberg table that uses an external Iceberg catalog

```sql
EXEC snowflake.tables.iceberg_tables.refresh 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@ifExists={{ ifExists }} 
@@json=
'{
"metadata_file_relative_path": "{{ metadata_file_relative_path }}"
}'
;
```
</TabItem>
<TabItem value="convert_to_managed">

Convert unmanaged iceberg table to managed iceberg table

```sql
EXEC snowflake.tables.iceberg_tables.convert_to_managed 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@ifExists={{ ifExists }} 
@@json=
'{
"base_location": "{{ base_location }}", 
"storage_serialization_policy": "{{ storage_serialization_policy }}"
}'
;
```
</TabItem>
<TabItem value="undrop">

Undrop an iceberg table

```sql
EXEC snowflake.tables.iceberg_tables.undrop 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required
;
```
</TabItem>
<TabItem value="clone">

Clone a snowflake managed iceberg table

```sql
EXEC snowflake.tables.iceberg_tables.clone 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@createMode='{{ createMode }}', 
@copyGrants={{ copyGrants }}, 
@targetDatabase='{{ targetDatabase }}', 
@targetSchema='{{ targetSchema }}' 
@@json=
'{
"name": "{{ name }}", 
"point_of_time": "{{ point_of_time }}"
}'
;
```
</TabItem>
<TabItem value="create_like">

Creates a new table with the same column definitions as an existing table, but without copying data from the existing table.

```sql
EXEC snowflake.tables.iceberg_tables.create_like 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@createMode='{{ createMode }}', 
@copyGrants={{ copyGrants }}, 
@targetDatabase='{{ targetDatabase }}', 
@targetSchema='{{ targetSchema }}' 
@@json=
'{
"name": "{{ name }}", 
"cluster_by": "{{ cluster_by }}", 
"external_volume": "{{ external_volume }}", 
"base_location": "{{ base_location }}", 
"comment": "{{ comment }}"
}'
;
```
</TabItem>
</Tabs>
