--- 
title: instance_families
hide_title: false
hide_table_of_contents: false
keywords:
  - instance_families
  - warehouses
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

Creates, updates, deletes, gets or lists an <code>instance_families</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="instance_families" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.warehouses.instance_families" /></td></tr>
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

A compute pool instance family.

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
    <td>Name of the instance family. (example: CPU_X64_S)</td>
</tr>
<tr>
    <td><CopyableCode code="current_node_usage" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of nodes currently utilizing this instance family</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the instance family. (example: Ideal for hosting multiple services/jobs while saving cost.)</td>
</tr>
<tr>
    <td><CopyableCode code="gpu" /></td>
    <td><code>string</code></td>
    <td>GPU model (if applicable). (example: NVIDIA A10G)</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of GPUs.</td>
</tr>
<tr>
    <td><CopyableCode code="gpu_memory_gib" /></td>
    <td><code>integer (int64)</code></td>
    <td>GPU memory in GiB (if applicable).</td>
</tr>
<tr>
    <td><CopyableCode code="memory_gib" /></td>
    <td><code>integer (int64)</code></td>
    <td>Memory in GiB.</td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td>Additional information about the instance family. (example: )</td>
</tr>
<tr>
    <td><CopyableCode code="storage_gib" /></td>
    <td><code>number (double)</code></td>
    <td>Storage in GiB.</td>
</tr>
<tr>
    <td><CopyableCode code="vcpu" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of vCPUs.</td>
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
    <td></td>
    <td>Lists all available instance families that can be used when creating compute pools.</td>
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

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

Lists all available instance families that can be used when creating compute pools.

```sql
SELECT
name,
current_node_usage,
description,
gpu,
gpu_count,
gpu_memory_gib,
memory_gib,
message,
storage_gib,
vcpu
FROM snowflake.warehouses.instance_families
WHERE endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
</Tabs>
