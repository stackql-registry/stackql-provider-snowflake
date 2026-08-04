--- 
title: chat_completions
hide_title: false
hide_table_of_contents: false
keywords:
  - chat_completions
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

Creates, updates, deletes, gets or lists a <code>chat_completions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="chat_completions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.cortex.chat_completions" /></td></tr>
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
    <td>Unique completion identifier.</td>
</tr>
<tr>
    <td><CopyableCode code="choices" /></td>
    <td><code>array</code></td>
    <td>Completion choices.</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>integer</code></td>
    <td>Unix timestamp of creation.</td>
</tr>
<tr>
    <td><CopyableCode code="model" /></td>
    <td><code>string</code></td>
    <td>Model used for the completion.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>Object type (chat.completion).</td>
</tr>
<tr>
    <td><CopyableCode code="system_fingerprint" /></td>
    <td><code>string</code></td>
    <td>Backend configuration fingerprint.</td>
</tr>
<tr>
    <td><CopyableCode code="usage" /></td>
    <td><code>string</code></td>
    <td>Completion token usage. (opaque JSON object)</td>
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
    <td>Perform LLM text completion inference using Chat Completions API format.</td>
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

Perform LLM text completion inference using Chat Completions API format.

```sql
SELECT
id,
choices,
created,
model,
object,
system_fingerprint,
usage
FROM snowflake.cortex.chat_completions
WHERE endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
</Tabs>
