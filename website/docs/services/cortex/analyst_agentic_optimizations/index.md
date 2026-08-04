--- 
title: analyst_agentic_optimizations
hide_title: false
hide_table_of_contents: false
keywords:
  - analyst_agentic_optimizations
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

Creates, updates, deletes, gets or lists an <code>analyst_agentic_optimizations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="analyst_agentic_optimizations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.cortex.analyst_agentic_optimizations" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

OK. Retrieved optimization.

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
    <td><CopyableCode code="request_id" /></td>
    <td><code>string</code></td>
    <td>Unique request ID (example: abcd1234-5678-90ab-cdef-1234567890ab)</td>
</tr>
<tr>
    <td><CopyableCode code="outcome" /></td>
    <td><code>string</code></td>
    <td>An opaque string containing the outcome of the optimization, separate from the state. This should be the JSON-encoded form of an AgenticOptimizationOutcome protobuf message. (example: &#123;"extensions": ""&#125;)</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>An opaque string containing the state of the optimization. (example: &#123;"progress": 0.5, "details": "Halfway through the optimization"&#125;)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of an agentic optimization run. (IN_PROGRESS, COMPLETED, FAILED, CANCELED)</td>
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
    <td><a href="#parameter-optimization_name"><code>optimization_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Get the status and state of a specified agentic optimization run</td>
</tr>
<tr>
    <td><a href="#list_agentic_optimizations"><CopyableCode code="list_agentic_optimizations" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-semantic_model"><code>semantic_model</code></a></td>
    <td></td>
    <td>List all agentic optimization runs for a given base model</td>
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
<tr id="parameter-optimization_name">
    <td><CopyableCode code="optimization_name" /></td>
    <td><code>string</code></td>
    <td>The fully-qualified name of the optimization to retrieve.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Get the status and state of a specified agentic optimization run

```sql
SELECT
request_id,
outcome,
state,
status
FROM snowflake.cortex.analyst_agentic_optimizations
WHERE optimization_name = '{{ optimization_name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="list_agentic_optimizations"
    values={[
        { label: 'list_agentic_optimizations', value: 'list_agentic_optimizations' }
    ]}
>
<TabItem value="list_agentic_optimizations">

List all agentic optimization runs for a given base model

```sql
EXEC snowflake.cortex.analyst_agentic_optimizations.list_agentic_optimizations 
@endpoint='{{ endpoint }}' --required 
@@json=
'{
"semantic_model": "{{ semantic_model }}", 
"experimental": "{{ experimental }}"
}'
;
```
</TabItem>
</Tabs>
