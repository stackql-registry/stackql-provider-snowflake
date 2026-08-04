# Phase 1 notes - open questions, evidence and decisions

Working notes for the snowflake provider rebuild. Each item records what was
investigated, the evidence found, and what remains open. Phase 1 covers
pre-processing, the endpoint inventory, the service split and the pilot
mapping of `databases`, `grants` and `sqlapi`.

## 1. Control-plane list pagination

**What the specs declare.** Across the 60 list endpoints (GET returning an
array): 31 take `showLimit` (20 of those also `fromName`), 29 take neither.
50 of 60 declare an RFC 5988 `Link` response header with `first`, `next`,
`prev` and `last` rels (see `provider-dev/config/endpoint_inventory.csv`,
columns `pagination_params` and `link_header`). `showLimit`/`fromName` are
windowing parameters (limit + start-after-name), not tokens - a client-driven
scheme, matching SHOW command semantics.

**What any-sdk can express.** any-sdk has a built-in link-header pagination
transformer: a service-level `x-stackQL-config` of
`{"pagination": {"responseToken": {"key": "link", "location": "header"}}}`
triggers `defaultLinkHeaderTransformer`, which follows the URL in
`<url>; rel="next"` (any-sdk `internal/anysdk/pagination.go`; `header` is the
only non-nop token location). Caveat found in source: the regex
(`.*<(?P<nextURL>[^>]*)>;\ rel="next".*`) requires a single space after the
semicolon. The vendor specs' own `Link` examples are inconsistent -
`common.yaml` shows `>; rel="first"` (space), `sqlapi.yaml` shows
`>;rel="last"` (no space) - so whether the live header matches the regex
must be verified against a trial account, not assumed.

**Posture.** Configure link-header pagination at service level (provider
level inheritance is broken in any-sdk, per the k8s build) for services
whose list endpoints declare `Link`; verify live before enabling; document
the 10 list endpoints without `Link` as single-call reads with
`showLimit`/`fromName` pushdown as ordinary parameters. The published
provider shipped no pagination config at all, so anything here is an
improvement, not a regression.

**Open:** live verification of the `Link` header format and of whether the
control-plane actually emits it (specs declare it; emission unconfirmed).

**RESOLVED (2026-08-04, build): no pagination config is shipped.** Two live
findings closed this out:

1. The live control plane does NOT emit `Link` headers. Verified with curl
   against `GET /api/v2/databases` on a real account (MGBHLAO-CY92030):
   200, bare JSON array, no `Link` header at all - the specs declare the
   header but the service does not send it.
2. any-sdk (stackql v0.10.582) deadlocks when a header `responseToken` is
   configured without a `requestToken` - every list SELECT hangs after the
   first response, Link header present or not. Reproduced live and against
   the mock (tests/integration). Adding a `requestToken` unblocks the loop
   but any-sdk then passes the ENTIRE next-page URL as the request token
   query parameter - wrong semantics against the real API. The proper fix
   (URL substitution in `defaultLinkHeaderTransformer`'s consumer) belongs
   in any-sdk; both defects should be filed upstream.

Posture: single-call list reads, with `showLimit`/`fromName` available as
ordinary pushdown parameters and `LIMIT n -> showLimit` per-method pushdown
(post_process.mjs). The integration runner fails if a pagination config
reappears in the generated output. Re-evaluate when any-sdk ships fixes.

## 1b. EXEC of non-GET methods panics stackql v0.10.582

`EXEC snowflake.warehouses.warehouses.resume @name = 'WH1' ...` (and every
EXEC over a POST/PUT/DELETE-backed snowflake method) crashes the binary with
a nil-pointer in any-sdk `formulation.(*wrappedSchema).GetType` via
`drm.GenerateSelectDML`, during analysis before any wire call. EXEC of
GET-backed methods works, and EXEC of non-GET methods works in the k8s
provider with the same binary - a snowflake-doc x binary interaction.
Inlining the `200SuccessResponse` response $ref did not help. Tracked as a
toolchain defect: the integration suite SKIPs its two EXEC checks on the
panic signature (asserts normally once a fixed binary lands) and the smoke
suite XFAILs on it. The mapped EXEC surface (100 actions) is correct in the
provider docs; only the current binary blocks execution.

## 2. SubmitStatement mapping - decision: INSERT ... RETURNING

Recommendation: candidate (a), `INSERT INTO snowflake.sqlapi.statements(...)
... RETURNING ...`, mapped in the pilot CSV as `statements.submit_statement`
with `stackql_verb = insert`.

Evidence considered:

- `SELECT` is not available: any-sdk does not route SELECT WHERE parameters
  into request bodies (the core gap recorded in the k8s build for
  parameterized review kinds - `splitHTTPParameters` for select statements).
  `statement` is a required request body property, so the read-verb door is
  closed until that lands.
- `EXEC` output is not SQL-composable: it cannot be projected, filtered,
  joined or fed through `json_extract`, and pystackql returns only status
  text for statements without rows (`executeStmt`), while `INSERT ...
  RETURNING` rows flow through `execute()` - the k8s smoke harness routes
  any statement containing `RETURNING` through the row-returning path.
- Both candidates receive the identical `ResultSet` body, so EXEC offers no
  projection advantage to trade against composability.
- Continuity: the published provider already maps `SubmitStatement` to
  `INSERT` (verified against registry version v25.08.00322:
  `submit_statement` / INSERT), so the flagship data plane vector keeps its
  verb across the rebuild.
- Precedent: the k8s provider maps parameterized review kinds (POST-only
  calls that return data) as `INSERT ... RETURNING status`, with a
  documented upgrade path to `SELECT` when the any-sdk gap closes. The same
  upgrade note applies here.

Shape of the primary vector (synchronous submission):

```sql
INSERT INTO snowflake.sqlapi.statements(statement, warehouse, database, "schema", timeout, endpoint)
SELECT 'select count(*) from lineitem', 'TESTWH', 'TESTDB', 'TPCH_SF1', 30, 'MYORG-MYACCT'
RETURNING statementHandle, resultSetMetaData, data;
```

`data` returns as a JSON column (array of row arrays) queryable with
`json_extract`. Note `schema` needs quoting as a column identifier.
`EXEC` remains available against the same method for users who want
fire-and-forget semantics; nothing additional is mapped for it.

## 3. Statement result projection

`ResultSet` carries column metadata and data separately:
`resultSetMetaData.rowType` is an array of `{name, type, precision, ...}`
descriptors and `data` is an array of arrays of strings. Under the INSERT
mapping, `RETURNING data` yields the raw array-of-arrays as one JSON value -
usable (`json_extract(data, '$[0][1]')`) but not columnar.

Projecting `rowType` + `data` into named columns requires a response
transform attached in `post_process.mjs`. Precedent that response golang
templates work: the k8s build's `pods_log` text-to-row template. Whether a
template can pivot dynamic column names is a phase 2 spike - if it cannot,
the documented posture is `RETURNING data` plus `json_extract`, which is
honest and already better than the published provider (which returns the
whole `ResultSet` object with no projection guidance).

**Open:** template feasibility for dynamic row pivoting; where the 202
(`QueryStatus`) vs 200 (`ResultSet`) union lands after normalize.

## 4. Multi-partition results and async flow

- Large synchronous results split into partitions
  (`resultSetMetaData.partitionInfo`); each partition is fetched with
  `GET /api/v2/statements/{statementHandle}?partition=N`
  (`statements.get_statement_status` with the `partition` parameter). The
  spec declares a `Link` header on statement responses pointing at
  partitions, so transparent assembly via link-header pagination is
  plausible on the same mechanism as item 1 - but partition retrieval works
  today as the explicit method, which is the v1 posture until the Link
  behaviour is verified live.
- Async: `INSERT` with `async = true` (query parameter, settable as a
  column) returns `202` + `QueryStatus` with `statementHandle`; poll
  `SELECT ... FROM snowflake.sqlapi.statements WHERE statementHandle = ...`
  until 200. Both legs are mapped; the polling loop lives in user SQL or
  the smoke tests, not in the provider.
- The control plane has a separate async pattern: DDL endpoints return
  `202SuccessAcceptedResponse` with a `resultHandler` id polled via
  `GET /api/v2/results/{result_handler}` (`sqlapi.results.fetch_result`,
  with a `page` query parameter and an opaque JSON response - lowered to a
  JSON column). This is why `result.yaml` lives in the `sqlapi` service.

## 5. The `{endpoint}` server variable

The server URL is `https://{endpoint}.snowflakecomputing.com` with
`endpoint` the `orgname-accountname` account identifier - a single dot-free
DNS label containing a dash. Evidence it routes at runtime: the published
provider (v25.08.00322) uses the identical servers block and its README
demonstrates real-account queries (`where endpoint = 'OKXVNMC-VH34026'`),
so the any-sdk dotted-host router constraint is not tripped by this form.
Re-verify as part of the phase 2 smoke suite against a trial account
(first read smoke covers it implicitly).

## 6. Grant signature uniqueness - proven

All seven grant operations map with unique required-parameter signatures per
(resource, SQL verb); the `map_operations.mjs` gate passes. The layout that
makes it true: the grant-option revokes carry required-parameter signatures
identical to the plain revokes (`granteeType, granteeName, securableType,
securableName, privilege`), so they cannot share a resource with them and
map as their own resources instead:

| resource | INSERT (grant) | DELETE (revoke) | SELECT |
|---|---|---|---|
| `grants` | granteeType, granteeName, securableType, securableName | + privilege | `list_grants_to` (granteeType, granteeName) |
| `grant_options` | - | granteeType, granteeName, securableType, securableName, privilege | - |
| `group_grants` | granteeType, granteeName, bulkGrantType, securableTypePlural, scopeType, scopeName | + privilege | - |
| `group_grant_options` | - | granteeType, granteeName, bulkGrantType, securableTypePlural, scopeType, scopeName, privilege | - |

Findings recorded while proving it:

- Every `grant.yaml` operation is marked `deprecated: true` upstream (as are
  12 other operations across compute-pool, database, service, table, task
  and warehouse). The endpoints remain in the published spec and are served;
  the flag looks like vendor API-lifecycle hygiene rather than removal, but
  the upstream-sync CI check should watch for these disappearing.
- The role/database-role/user grant subresources
  (`/api/v2/roles/{name}/grants`, `grants-of`, `grants-on`, `grants:revoke`)
  stay with their parents in the `roles` service; the `grants` service is
  the account-wide grant surface.

## 7. Response envelope check

Control-plane list responses are bare JSON arrays (confirmed in the specs:
every list 200 is `type: array` at the top level; 60 operations). The
normalize step wraps bare arrays in a generated object schema keyed by the
operationId noun (`listDatabases` -> key `databases`), so the pilot mapping
sets `stackql_object_key` to the matching `$.<noun>` (`$.databases`,
`$.schemas`, `$.grants_to`). Get/fetch responses are objects; sqlapi
responses (`ResultSet`, `QueryStatus`, `CancelStatus`) are objects with no
wrapping and no object key.

## 8. Breaking-change delta vs the published provider (pilot services)

Verified against registry version v25.08.00322. Seeded into README.md's
Breaking Changes section.

| Published (v25.08.00322) | This rebuild |
|---|---|
| `snowflake.database.databases` | `snowflake.databases.databases` |
| `snowflake.schema.schemas` | `snowflake.databases.schemas` |
| `snowflake.grant.privileges.grant_privilege` (INSERT) | `snowflake.grants.grants.grant` / `snowflake.grants.group_grants.grant` |
| `snowflake.grant.privileges.revoke_privilege` (DELETE) | `snowflake.grants.grants.revoke` (and `group_grants.revoke`) |
| `snowflake.grant.grant_options.revoke_*_grant_option` | `snowflake.grants.grant_options.revoke` / `group_grant_options.revoke` |
| `snowflake.grant.grants_to.list_grants_to` | `snowflake.grants.grants.list_grants_to` |
| `snowflake.sqlapi.statements.{submit_statement, get_statement_status, cancel_statement}` | unchanged names and verbs |
| method names `list_databases`, `fetch_database`, `create_database` | `list`, `get`, `create` (resource-scoped) |
| request body columns `data__name`, `data__accounts` | native wire names `name`, `accounts` (naive request body translator) |
| list responses unwrapped bare arrays, no object key | normalize-wrapped with `stackql_object_key` set |
| no pagination config | link-header pagination where verified (item 1) |
| `User-Agent` a required parameter on every method | to be stripped/defaulted in `pre_normalize.mjs` (see item 9) |

Coverage delta: the published provider has 36 services from an older spec
sync; the rebuild adds artifact-repository, secret, sequence, network-rule,
password-policy, tag, streamlit and the cortex generic (anthropic/openai)
endpoints, consolidated into 13 plural-named services.

## 9. Items queued for pre_normalize.mjs / post_process.mjs (phase 2)

- Strip or default the required `User-Agent` (and optional `Accept`,
  `X-Snowflake-Authorization-Token-Type`) header parameters - in the
  published provider `User-Agent` leaks into every method's required
  params.
- `createMode` query parameter (`errorIfExists` | `orReplace` |
  `ifNotExists`) on create operations - document as an INSERT column; no
  transform needed.
- Discriminated `oneOf` subtypes (tables, integrations, functions) - expect
  the normalize flatten to handle; verify column quality on `tables` before
  the full build.
- Statement result projection template (item 3).
- The split step renames colliding shared component names deterministically
  (`PointOfTime` -> `PointOfTime_task` etc, 45 renames across 7 services) -
  cosmetic in generated docs only; revisit if resource schema names surface
  oddly.
- `common-cortex-agent.yaml` and `common-cortex-tool.yaml` are referenced by
  no service spec (agent references tool; nothing references agent) - inert
  upstream content, nothing to do.
