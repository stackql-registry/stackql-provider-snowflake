--- 
title: messages
hide_title: false
hide_table_of_contents: false
keywords:
  - messages
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

Creates, updates, deletes, gets or lists a <code>messages</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="messages" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.cortex.messages" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' }
    ]}
>
<TabItem value="create">

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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>Unique message identifier.</td>
</tr>
<tr>
    <td><CopyableCode code="content" /></td>
    <td><code>array</code></td>
    <td>Generated content blocks.</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>Model that handled the request.</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>Conversational role of the generated message (assistant).</td>
</tr>
<tr>
    <td><CopyableCode code="stop_reason" /></td>
    <td><code>string</code></td>
    <td>Reason generation stopped.</td>
</tr>
<tr>
    <td><CopyableCode code="stop_sequence" /></td>
    <td><code>string</code></td>
    <td>Which custom stop sequence was generated, if any.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>Object type (message).</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>string</code></td>
    <td>Billing and rate-limit token usage. (opaque JSON object)</td>
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
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Perform LLM text completion inference using Cortex Messages API format.</td>
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
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' }
    ]}
>
<TabItem value="create">

Perform LLM text completion inference using Cortex Messages API format.

```sql
SELECT
id,
content,
model,
role,
stop_reason,
stop_sequence,
type,
usage
FROM snowflake.cortex.messages
WHERE endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
</Tabs>
