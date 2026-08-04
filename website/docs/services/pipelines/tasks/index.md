--- 
title: tasks
hide_title: false
hide_table_of_contents: false
keywords:
  - tasks
  - pipelines
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

Creates, updates, deletes, gets or lists a <code>tasks</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="tasks" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="snowflake.pipelines.tasks" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>An ID for the current task.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>String that specifies the identifier (i.e. name) for the task. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>The name of the parent database for the task.</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>The name of the parent schema for the task.</td>
</tr>
<tr>
    <td><CopyableCode code="allow_overlapping_execution" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether to allow multiple instances of the DAG to run concurrently.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Specifies a comment for the task.</td>
</tr>
<tr>
    <td><CopyableCode code="condition" /></td>
    <td><code>string</code></td>
    <td>Specifies a Boolean SQL expression condition; multiple conditions joined with AND/OR are supported</td>
</tr>
<tr>
    <td><CopyableCode code="config" /></td>
    <td><code>object</code></td>
    <td>Task Config</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>The time the task was created on.</td>
</tr>
<tr>
    <td><CopyableCode code="definition" /></td>
    <td><code>string</code></td>
    <td>The SQL definition for the task. Any one of single SQL statement, call to stored procedure, or procedural logic using Snowflake scripting.</td>
</tr>
<tr>
    <td><CopyableCode code="error_integration" /></td>
    <td><code>string</code></td>
    <td>Specifies the name of the notification integration used to communicate with Amazon SNS, MS Azure Event Grid, or Google Pub/Sub.</td>
</tr>
<tr>
    <td><CopyableCode code="finalize" /></td>
    <td><code>string</code></td>
    <td>Specifies the name of the root task that the finalizer task is associated with.</td>
</tr>
<tr>
    <td><CopyableCode code="last_committed_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>The time the task was last committed on.</td>
</tr>
<tr>
    <td><CopyableCode code="last_suspended_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>The time the task was last suspended on.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>The role that owns the task.</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The role type of the task owner.</td>
</tr>
<tr>
    <td><CopyableCode code="predecessors" /></td>
    <td><code>array</code></td>
    <td>Specifies one or more predecessor tasks for the current task</td>
</tr>
<tr>
    <td><CopyableCode code="schedule" /></td>
    <td><code>object</code></td>
    <td>Specifies the schedule for periodically running the task.</td>
</tr>
<tr>
    <td><CopyableCode code="serverless_task_max_statement_size" /></td>
    <td><code>string</code></td>
    <td>Specifies the maximum allowed warehouse size for the serverless task. Minimum XSMALL, Maximum XXLARGE. This parameter only applies to serverless tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="serverless_task_min_statement_size" /></td>
    <td><code>string</code></td>
    <td>Specifies the minimum allowed warehouse size for the serverless task. Minimum XSMALL, Maximum XXLARGE. This parameter only applies to serverless tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="session_parameters" /></td>
    <td><code>object</code></td>
    <td>Session Parameters for the task at runtime.</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>The state of the task. Must be one of started or suspended. (started, suspended)</td>
</tr>
<tr>
    <td><CopyableCode code="suspend_task_after_num_failures" /></td>
    <td><code>integer</code></td>
    <td>Specifies the number of consecutive failed task runs after which the current task is suspended automatically.</td>
</tr>
<tr>
    <td><CopyableCode code="target_completion_interval" /></td>
    <td><code>object</code></td>
    <td>Specifies the desired task completion time. This parameter only applies to serverless tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="task_auto_retry_attempts" /></td>
    <td><code>integer</code></td>
    <td>Root task settable only. Specifies the number of automatic task graph retry attempts. Valid range is 0 to 30. When not specified, no retry would happen.</td>
</tr>
<tr>
    <td><CopyableCode code="task_relations" /></td>
    <td><code>string</code></td>
    <td>Displays the relationship between the root task and its corresponding finalizer tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="user_task_managed_initial_warehouse_size" /></td>
    <td><code>string</code></td>
    <td>Specifies the size of the compute resources to provision for the first run of the task. This parameter only applies to serverless tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="user_task_timeout_ms" /></td>
    <td><code>integer</code></td>
    <td>Specifies the time limit on a single run of the task before it times out (in milliseconds).</td>
</tr>
<tr>
    <td><CopyableCode code="warehouse" /></td>
    <td><code>string</code></td>
    <td>Specifies the virtual warehouse that provides compute resources for task runs. Omit this parameter to use serverless compute resources for runs of this task. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A Snowflake task, used to execute SQL code.

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
    <td>An ID for the current task.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>String that specifies the identifier (i.e. name) for the task. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
</tr>
<tr>
    <td><CopyableCode code="database_name" /></td>
    <td><code>string</code></td>
    <td>The name of the parent database for the task.</td>
</tr>
<tr>
    <td><CopyableCode code="schema_name" /></td>
    <td><code>string</code></td>
    <td>The name of the parent schema for the task.</td>
</tr>
<tr>
    <td><CopyableCode code="allow_overlapping_execution" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether to allow multiple instances of the DAG to run concurrently.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>string</code></td>
    <td>Specifies a comment for the task.</td>
</tr>
<tr>
    <td><CopyableCode code="condition" /></td>
    <td><code>string</code></td>
    <td>Specifies a Boolean SQL expression condition; multiple conditions joined with AND/OR are supported</td>
</tr>
<tr>
    <td><CopyableCode code="config" /></td>
    <td><code>object</code></td>
    <td>Task Config</td>
</tr>
<tr>
    <td><CopyableCode code="created_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>The time the task was created on.</td>
</tr>
<tr>
    <td><CopyableCode code="definition" /></td>
    <td><code>string</code></td>
    <td>The SQL definition for the task. Any one of single SQL statement, call to stored procedure, or procedural logic using Snowflake scripting.</td>
</tr>
<tr>
    <td><CopyableCode code="error_integration" /></td>
    <td><code>string</code></td>
    <td>Specifies the name of the notification integration used to communicate with Amazon SNS, MS Azure Event Grid, or Google Pub/Sub.</td>
</tr>
<tr>
    <td><CopyableCode code="finalize" /></td>
    <td><code>string</code></td>
    <td>Specifies the name of the root task that the finalizer task is associated with.</td>
</tr>
<tr>
    <td><CopyableCode code="last_committed_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>The time the task was last committed on.</td>
</tr>
<tr>
    <td><CopyableCode code="last_suspended_on" /></td>
    <td><code>string (date-time)</code></td>
    <td>The time the task was last suspended on.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>The role that owns the task.</td>
</tr>
<tr>
    <td><CopyableCode code="owner_role_type" /></td>
    <td><code>string</code></td>
    <td>The role type of the task owner.</td>
</tr>
<tr>
    <td><CopyableCode code="predecessors" /></td>
    <td><code>array</code></td>
    <td>Specifies one or more predecessor tasks for the current task</td>
</tr>
<tr>
    <td><CopyableCode code="schedule" /></td>
    <td><code>object</code></td>
    <td>Specifies the schedule for periodically running the task.</td>
</tr>
<tr>
    <td><CopyableCode code="serverless_task_max_statement_size" /></td>
    <td><code>string</code></td>
    <td>Specifies the maximum allowed warehouse size for the serverless task. Minimum XSMALL, Maximum XXLARGE. This parameter only applies to serverless tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="serverless_task_min_statement_size" /></td>
    <td><code>string</code></td>
    <td>Specifies the minimum allowed warehouse size for the serverless task. Minimum XSMALL, Maximum XXLARGE. This parameter only applies to serverless tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="session_parameters" /></td>
    <td><code>object</code></td>
    <td>Session Parameters for the task at runtime.</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>The state of the task. Must be one of started or suspended. (started, suspended)</td>
</tr>
<tr>
    <td><CopyableCode code="suspend_task_after_num_failures" /></td>
    <td><code>integer</code></td>
    <td>Specifies the number of consecutive failed task runs after which the current task is suspended automatically.</td>
</tr>
<tr>
    <td><CopyableCode code="target_completion_interval" /></td>
    <td><code>object</code></td>
    <td>Specifies the desired task completion time. This parameter only applies to serverless tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="task_auto_retry_attempts" /></td>
    <td><code>integer</code></td>
    <td>Root task settable only. Specifies the number of automatic task graph retry attempts. Valid range is 0 to 30. When not specified, no retry would happen.</td>
</tr>
<tr>
    <td><CopyableCode code="task_relations" /></td>
    <td><code>string</code></td>
    <td>Displays the relationship between the root task and its corresponding finalizer tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="user_task_managed_initial_warehouse_size" /></td>
    <td><code>string</code></td>
    <td>Specifies the size of the compute resources to provision for the first run of the task. This parameter only applies to serverless tasks.</td>
</tr>
<tr>
    <td><CopyableCode code="user_task_timeout_ms" /></td>
    <td><code>integer</code></td>
    <td>Specifies the time limit on a single run of the task before it times out (in milliseconds).</td>
</tr>
<tr>
    <td><CopyableCode code="warehouse" /></td>
    <td><code>string</code></td>
    <td>Specifies the virtual warehouse that provides compute resources for task runs. Omit this parameter to use serverless compute resources for runs of this task. (pattern: <code>^"(&#91;^"&#93;|"")+"|&#91;a-zA-Z_&#93;&#91;a-zA-Z0-9_$&#93;*$</code>, example: TEST_NAME)</td>
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
    <td>Fetch a task using the describe command output.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-rootOnly"><code>rootOnly</code></a>, <a href="#parameter-like"><code>like</code></a>, <a href="#parameter-startsWith"><code>startsWith</code></a>, <a href="#parameter-showLimit"><code>showLimit</code></a>, <a href="#parameter-fromName"><code>fromName</code></a></td>
    <td>Lists tasks under the database and schema, with show options as query parameters.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-definition"><code>definition</code></a></td>
    <td><a href="#parameter-createMode"><code>createMode</code></a></td>
    <td>Create a task, with standard create modifiers as query parameters. See the Task component definition for what is required to be provided in the request body.</td>
</tr>
<tr>
    <td><a href="#create_or_alter"><CopyableCode code="create_or_alter" /></a></td>
    <td><CopyableCode code="replace" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-task_name"><code>task_name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-definition"><code>definition</code></a></td>
    <td></td>
    <td>Create a (or alter an existing) task. Even if the operation is just an alter, the full property set must be provided.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-ifExists"><code>ifExists</code></a></td>
    <td>Delete a task with the task name. If ifExists is used, the operation will succeed even if the object does not exist. Otherwise, there will be a failure if the drop is unsuccessful.</td>
</tr>
<tr>
    <td><a href="#execute"><CopyableCode code="execute" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td><a href="#parameter-asyncExec"><code>asyncExec</code></a>, <a href="#parameter-retryLast"><code>retryLast</code></a></td>
    <td>Execute a task -- this is equivalent to EXECUTE IMMEDIATE.</td>
</tr>
<tr>
    <td><a href="#resume"><CopyableCode code="resume" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Resumes a suspended task object. This is equivalento an ALTER TASK ... RESUME.</td>
</tr>
<tr>
    <td><a href="#suspend"><CopyableCode code="suspend" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-database_name"><code>database_name</code></a>, <a href="#parameter-schema_name"><code>schema_name</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-endpoint"><code>endpoint</code></a></td>
    <td></td>
    <td>Suspends a running task. This is equivalent to an ALTER TASK ... SUSPEND.</td>
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
<tr id="parameter-task_name">
    <td><CopyableCode code="task_name" /></td>
    <td><code>string</code></td>
    <td>Identifier (i.e. name) for the resource.</td>
</tr>
<tr id="parameter-asyncExec">
    <td><CopyableCode code="asyncExec" /></td>
    <td><code>boolean</code></td>
    <td>Asynchronous execution enable/disable. Default is disable.</td>
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
<tr id="parameter-retryLast">
    <td><CopyableCode code="retryLast" /></td>
    <td><code>boolean</code></td>
    <td>Retry the last failed run of the DAG.</td>
</tr>
<tr id="parameter-rootOnly">
    <td><CopyableCode code="rootOnly" /></td>
    <td><code>boolean</code></td>
    <td>Parameter to filter the command output to return only root resources (resources with no predecessors).</td>
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

Fetch a task using the describe command output.

```sql
SELECT
id,
name,
database_name,
schema_name,
allow_overlapping_execution,
comment,
condition,
config,
created_on,
definition,
error_integration,
finalize,
last_committed_on,
last_suspended_on,
owner,
owner_role_type,
predecessors,
schedule,
serverless_task_max_statement_size,
serverless_task_min_statement_size,
session_parameters,
state,
suspend_task_after_num_failures,
target_completion_interval,
task_auto_retry_attempts,
task_relations,
user_task_managed_initial_warehouse_size,
user_task_timeout_ms,
warehouse
FROM snowflake.pipelines.tasks
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND name = '{{ name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists tasks under the database and schema, with show options as query parameters.

```sql
SELECT
id,
name,
database_name,
schema_name,
allow_overlapping_execution,
comment,
condition,
config,
created_on,
definition,
error_integration,
finalize,
last_committed_on,
last_suspended_on,
owner,
owner_role_type,
predecessors,
schedule,
serverless_task_max_statement_size,
serverless_task_min_statement_size,
session_parameters,
state,
suspend_task_after_num_failures,
target_completion_interval,
task_auto_retry_attempts,
task_relations,
user_task_managed_initial_warehouse_size,
user_task_timeout_ms,
warehouse
FROM snowflake.pipelines.tasks
WHERE database_name = '{{ database_name }}' -- required
AND schema_name = '{{ schema_name }}' -- required
AND endpoint = '{{ endpoint }}' -- required
AND rootOnly = '{{ rootOnly }}'
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

Create a task, with standard create modifiers as query parameters. See the Task component definition for what is required to be provided in the request body.

```sql
INSERT INTO snowflake.pipelines.tasks (
name,
warehouse,
schedule,
comment,
finalize,
task_auto_retry_attempts,
config,
session_parameters,
definition,
predecessors,
user_task_managed_initial_warehouse_size,
target_completion_interval,
serverless_task_min_statement_size,
serverless_task_max_statement_size,
user_task_timeout_ms,
suspend_task_after_num_failures,
condition,
allow_overlapping_execution,
error_integration,
database_name,
schema_name,
endpoint,
createMode
)
SELECT 
'{{ name }}' /* required */,
'{{ warehouse }}',
'{{ schedule }}',
'{{ comment }}',
'{{ finalize }}',
{{ task_auto_retry_attempts }},
'{{ config }}',
'{{ session_parameters }}',
'{{ definition }}' /* required */,
'{{ predecessors }}',
'{{ user_task_managed_initial_warehouse_size }}',
'{{ target_completion_interval }}',
'{{ serverless_task_min_statement_size }}',
'{{ serverless_task_max_statement_size }}',
{{ user_task_timeout_ms }},
{{ suspend_task_after_num_failures }},
'{{ condition }}',
{{ allow_overlapping_execution }},
'{{ error_integration }}',
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
- name: tasks
  props:
    - name: database_name
      value: "{{ database_name }}"
      description: Required parameter for the tasks resource.
    - name: schema_name
      value: "{{ schema_name }}"
      description: Required parameter for the tasks resource.
    - name: endpoint
      value: "{{ endpoint }}"
      description: Required parameter for the tasks resource.
    - name: name
      value: "{{ name }}"
      description: |
        String that specifies the identifier (i.e. name) for the task.
    - name: warehouse
      value: "{{ warehouse }}"
      description: |
        Specifies the virtual warehouse that provides compute resources for task runs. Omit this parameter to use serverless compute resources for runs of this task.
    - name: schedule
      description: |
        Specifies the schedule for periodically running the task.
      value:
        schedule_type: "{{ schedule_type }}"
    - name: comment
      value: "{{ comment }}"
      description: |
        Specifies a comment for the task.
    - name: finalize
      value: "{{ finalize }}"
      description: |
        Specifies the name of the root task that the finalizer task is associated with.
    - name: task_auto_retry_attempts
      value: {{ task_auto_retry_attempts }}
      description: |
        Root task settable only. Specifies the number of automatic task graph retry attempts. Valid range is 0 to 30. When not specified, no retry would happen.
    - name: config
      value: "{{ config }}"
      description: |
        Task Config
    - name: session_parameters
      value: "{{ session_parameters }}"
      description: |
        Session Parameters for the task at runtime.
    - name: definition
      value: "{{ definition }}"
      description: |
        The SQL definition for the task. Any one of single SQL statement, call to stored procedure, or procedural logic using Snowflake scripting.
    - name: predecessors
      value:
        - "{{ predecessors }}"
      description: |
        Specifies one or more predecessor tasks for the current task
    - name: user_task_managed_initial_warehouse_size
      value: "{{ user_task_managed_initial_warehouse_size }}"
      description: |
        Specifies the size of the compute resources to provision for the first run of the task. This parameter only applies to serverless tasks.
    - name: target_completion_interval
      description: |
        Specifies the desired task completion time. This parameter only applies to serverless tasks.
      value:
        minutes: {{ minutes }}
        schedule_type: "{{ schedule_type }}"
    - name: serverless_task_min_statement_size
      value: "{{ serverless_task_min_statement_size }}"
      description: |
        Specifies the minimum allowed warehouse size for the serverless task. Minimum XSMALL, Maximum XXLARGE. This parameter only applies to serverless tasks.
    - name: serverless_task_max_statement_size
      value: "{{ serverless_task_max_statement_size }}"
      description: |
        Specifies the maximum allowed warehouse size for the serverless task. Minimum XSMALL, Maximum XXLARGE. This parameter only applies to serverless tasks.
    - name: user_task_timeout_ms
      value: {{ user_task_timeout_ms }}
      description: |
        Specifies the time limit on a single run of the task before it times out (in milliseconds).
    - name: suspend_task_after_num_failures
      value: {{ suspend_task_after_num_failures }}
      description: |
        Specifies the number of consecutive failed task runs after which the current task is suspended automatically.
    - name: condition
      value: "{{ condition }}"
      description: |
        Specifies a Boolean SQL expression condition; multiple conditions joined with AND/OR are supported
    - name: allow_overlapping_execution
      value: {{ allow_overlapping_execution }}
      description: |
        Specifies whether to allow multiple instances of the DAG to run concurrently.
    - name: error_integration
      value: "{{ error_integration }}"
      description: |
        Specifies the name of the notification integration used to communicate with Amazon SNS, MS Azure Event Grid, or Google Pub/Sub.
    - name: createMode
      value: "{{ createMode }}"
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
      description: Parameter allowing support for different modes of resource creation. Possible values include: - \`errorIfExists\`: Throws an error if you try to create a resource that already exists. - \`orReplace\`: Automatically replaces the existing resource with the current one. - \`ifNotExists\`: Creates a new resource when an alter is requested for a non-existent resource.
`}</CodeBlock>

</TabItem>
</Tabs>


## `REPLACE` examples

<Tabs
    defaultValue="create_or_alter"
    values={[
        { label: 'create_or_alter', value: 'create_or_alter' }
    ]}
>
<TabItem value="create_or_alter">

Create a (or alter an existing) task. Even if the operation is just an alter, the full property set must be provided.

```sql
REPLACE snowflake.pipelines.tasks
SET 
name = '{{ name }}',
warehouse = '{{ warehouse }}',
schedule = '{{ schedule }}',
comment = '{{ comment }}',
finalize = '{{ finalize }}',
task_auto_retry_attempts = {{ task_auto_retry_attempts }},
config = '{{ config }}',
session_parameters = '{{ session_parameters }}',
definition = '{{ definition }}',
predecessors = '{{ predecessors }}',
user_task_managed_initial_warehouse_size = '{{ user_task_managed_initial_warehouse_size }}',
target_completion_interval = '{{ target_completion_interval }}',
serverless_task_min_statement_size = '{{ serverless_task_min_statement_size }}',
serverless_task_max_statement_size = '{{ serverless_task_max_statement_size }}',
user_task_timeout_ms = {{ user_task_timeout_ms }},
suspend_task_after_num_failures = {{ suspend_task_after_num_failures }},
condition = '{{ condition }}',
allow_overlapping_execution = {{ allow_overlapping_execution }},
error_integration = '{{ error_integration }}'
WHERE 
database_name = '{{ database_name }}' --required
AND schema_name = '{{ schema_name }}' --required
AND task_name = '{{ task_name }}' --required
AND endpoint = '{{ endpoint }}' --required
AND name = '{{ name }}' --required
AND definition = '{{ definition }}' --required
RETURNING
status;
```
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

Delete a task with the task name. If ifExists is used, the operation will succeed even if the object does not exist. Otherwise, there will be a failure if the drop is unsuccessful.

```sql
DELETE FROM snowflake.pipelines.tasks
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
    defaultValue="execute"
    values={[
        { label: 'execute', value: 'execute' },
        { label: 'resume', value: 'resume' },
        { label: 'suspend', value: 'suspend' }
    ]}
>
<TabItem value="execute">

Execute a task -- this is equivalent to EXECUTE IMMEDIATE.

```sql
EXEC snowflake.pipelines.tasks.execute 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required, 
@asyncExec={{ asyncExec }}, 
@retryLast={{ retryLast }}
;
```
</TabItem>
<TabItem value="resume">

Resumes a suspended task object. This is equivalento an ALTER TASK ... RESUME.

```sql
EXEC snowflake.pipelines.tasks.resume 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required
;
```
</TabItem>
<TabItem value="suspend">

Suspends a running task. This is equivalent to an ALTER TASK ... SUSPEND.

```sql
EXEC snowflake.pipelines.tasks.suspend 
@database_name='{{ database_name }}' --required, 
@schema_name='{{ schema_name }}' --required, 
@name='{{ name }}' --required, 
@endpoint='{{ endpoint }}' --required
;
```
</TabItem>
</Tabs>
