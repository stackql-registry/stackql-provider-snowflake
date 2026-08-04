--- 
title: analyst_pre_selection
hide_title: false
hide_table_of_contents: false
keywords:
  - analyst_pre_selection
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

Creates, updates, deletes, gets or lists an <code>analyst_pre_selection</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="analyst_pre_selection" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.cortex.analyst_pre_selection" /></td></tr>
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
    <td><a href="#pre_select"><CopyableCode code="pre_select" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-tds_source"><code>tds_source</code></a>, <a href="#parameter-warehouse"><code>warehouse</code></a></td>
    <td></td>
    <td>Retrieve relevant table information from input data for semantic model generation</td>
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
</tbody>
</table>

## Lifecycle Methods

<Tabs
    defaultValue="pre_select"
    values={[
        { label: 'pre_select', value: 'pre_select' }
    ]}
>
<TabItem value="pre_select">

Retrieve relevant table information from input data for semantic model generation

```sql
EXEC snowflake.cortex.analyst_pre_selection.pre_select 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"tds_source": "{{ tds_source }}", 
"sql_source": "{{ sql_source }}", 
"warehouse": "{{ warehouse }}", 
"tableau_input": "{{ tableau_input }}", 
"experimental": "{{ experimental }}"
}'
;
```
</TabItem>
</Tabs>
