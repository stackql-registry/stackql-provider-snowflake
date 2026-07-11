#!/usr/bin/env node

// Builds provider-dev/config/endpoint_inventory.csv from the pre-processed
// specs in provider-dev/source (run `npm run pre-process` first). One row per
// operation, with the proposed service/resource/verb disposition that feeds
// the service split (service_names.json) and the mapping rules
// (map_operations.mjs). Reports counts by spec, by proposed verb and by
// disposition, plus the observed pagination parameter patterns across list
// endpoints.
//
// Usage: node provider-dev/scripts/build_inventory.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const csvPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');

const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch'];
const PAGINATION_PARAM_NAMES = new Set(['fromName', 'showLimit', 'page', 'pageSize', 'partition', 'limit', 'offset', 'nextToken', 'maxResults']);

// proposed service consolidation (candidate list in CLAUDE.md; finalized in
// provider-dev/config/service_names.json by the split step)
const PROPOSED_SERVICE = {
  account: 'account', 'managed-account': 'account',
  database: 'databases', schema: 'databases',
  table: 'tables', view: 'tables', 'dynamic-table': 'tables', 'event-table': 'tables',
  'iceberg-table': 'tables', stream: 'tables',
  warehouse: 'warehouses', 'compute-pool': 'warehouses',
  role: 'roles', 'database-role': 'roles', user: 'roles',
  grant: 'grants',
  'network-policy': 'security', 'network-rule': 'security', 'password-policy': 'security',
  secret: 'security', tag: 'security',
  'api-integration': 'integrations', 'catalog-integration': 'integrations',
  'notification-integration': 'integrations', 'external-volume': 'integrations',
  pipe: 'pipelines', stage: 'pipelines', task: 'pipelines', alert: 'pipelines', sequence: 'pipelines',
  function: 'functions', procedure: 'functions', 'user-defined-function': 'functions',
  notebook: 'apps', streamlit: 'apps', service: 'apps',
  'image-repository': 'apps', 'artifact-repository': 'apps',
  sqlapi: 'sqlapi', result: 'sqlapi',
  'cortex-inference': 'cortex', 'cortex-analyst': 'cortex', 'cortex-search-service': 'cortex',
  'cortex-generic-anthropic': 'cortex', 'cortex-generic-openai': 'cortex',
  'spark-connect': 'skip'
};

const SKIP_REASONS = {
  'spark-connect': 'spark_connect_out_of_scope: Spark Connect exchanges base64 protobuf plans and session state, not SQL-addressable resources'
};

function resolveRef(doc, node) {
  if (node && typeof node.$ref === 'string' && node.$ref.startsWith('#/')) {
    let target = doc;
    for (const seg of node.$ref.slice(2).split('/')) {
      target = target?.[seg.replace(/~1/g, '/').replace(/~0/g, '~')];
    }
    return target || node;
  }
  return node;
}

function snake(s) {
  return s.replace(/-/g, '_');
}

function classifyResponse(doc, op) {
  const codes = Object.keys(op.responses || {}).filter((c) => c.startsWith('2')).sort();
  if (codes.length === 0) return { shape: 'none', hasLinkHeader: false };
  const resp = resolveRef(doc, op.responses[codes[0]]);
  const content = resp.content || {};
  const hasLinkHeader = !!(resp.headers && (resp.headers.Link || resp.headers.link));
  const json = content['application/json'];
  // SSE-only responses are streaming (skip); a response offering both JSON
  // and text/event-stream is mapped through its JSON (non-streaming) mode
  if (content['text/event-stream'] && !json) return { shape: 'streaming', hasLinkHeader };
  if (!json) {
    const types = Object.keys(content);
    if (types.length === 0) return { shape: 'none', hasLinkHeader };
    return { shape: `other(${types.join('|')})`, hasLinkHeader };
  }
  let schema = resolveRef(doc, json.schema || {});
  const refName = (json.schema?.$ref || '').split('/').pop();
  if (refName === 'ResultSet') return { shape: 'result-set', hasLinkHeader };
  if (schema.type === 'array') return { shape: 'array', hasLinkHeader };
  return { shape: 'object', hasLinkHeader };
}

function proposeMapping({ specKey, verb, pathKey, op, responseShape }) {
  const opId = op.operationId || '';
  const service = PROPOSED_SERVICE[specKey];
  if (!service) return { error: `no proposed service for spec ${specKey}` };
  if (service === 'skip') {
    return { service: specKey, resource: '', method: '', sqlVerb: 'skip', skipReason: SKIP_REASONS[specKey] };
  }
  if (responseShape === 'streaming') {
    return { service, resource: '', method: '', sqlVerb: 'skip', skipReason: 'streaming_response: server-sent events are out of scope, consistent with prior builds' };
  }

  // grant.yaml: the flagship - explicit resource layout so overloaded verbs
  // keep unique required-parameter signatures (the grant-option revokes have
  // signatures identical to the plain revokes, so they are their own resources)
  if (specKey === 'grant') {
    const bulk = pathKey.includes('{bulkGrantType}');
    const grantOption = pathKey.endsWith('/grant-option');
    const resource = `${bulk ? 'group_' : ''}grant${grantOption ? '_options' : 's'}`;
    if (verb === 'get') return { service, resource: 'grants', method: 'list_grants_to', sqlVerb: 'select' };
    if (verb === 'post') return { service, resource, method: 'grant', sqlVerb: 'insert' };
    if (verb === 'delete') return { service, resource, method: 'revoke', sqlVerb: 'delete' };
  }

  if (specKey === 'sqlapi') {
    if (opId === 'SubmitStatement') return { service, resource: 'statements', method: 'submit_statement', sqlVerb: 'insert' };
    if (opId === 'GetStatementStatus') return { service, resource: 'statements', method: 'get_statement_status', sqlVerb: 'select' };
    if (opId === 'CancelStatement') return { service, resource: 'statements', method: 'cancel_statement', sqlVerb: 'delete' };
  }
  if (specKey === 'result') {
    return { service, resource: 'results', method: 'fetch_result', sqlVerb: 'select' };
  }

  // action endpoints: /path:action (colon suffix) map to EXEC
  const actionMatch = pathKey.match(/:([a-zA-Z_-]+)$/);
  const segments = pathKey.replace(/:[a-zA-Z_-]+$/, '').split('/').filter((s) => s && s !== 'api' && s !== 'v2');
  const staticSegs = segments.filter((s) => !s.startsWith('{'));
  const resource = snake(staticSegs[staticSegs.length - 1] || specKey);

  if (actionMatch) {
    const action = snake(actionMatch[1].replace(/-/g, '_'));
    // resource-level action (/databases/{name}:undrop) vs subresource action
    // (/databases/{name}/replication:enable -> method enable_replication)
    const lastSeg = segments[segments.length - 1];
    const parentResource = staticSegs.length > 1 && lastSeg && !lastSeg.startsWith('{')
      ? snake(staticSegs[staticSegs.length - 2])
      : resource;
    const method = lastSeg && !lastSeg.startsWith('{') && staticSegs.length > 1
      ? `${action}_${snake(lastSeg)}`
      : action;
    // ':from-share' style creation actions still create the resource
    return { service, resource: parentResource, method, sqlVerb: 'exec' };
  }

  switch (verb) {
    case 'get':
      return responseShape === 'array'
        ? { service, resource, method: 'list', sqlVerb: 'select' }
        : { service, resource, method: 'get', sqlVerb: 'select' };
    case 'post':
      if (/^create/i.test(opId) || opId === '' || /^(grant|add)/i.test(opId)) {
        return { service, resource, method: 'create', sqlVerb: 'insert' };
      }
      // POST that is not a create and not a colon-action: treat as action
      return { service, resource, method: snake(opId.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()), sqlVerb: 'exec' };
    case 'put':
      return /^createOrAlter/i.test(opId)
        ? { service, resource, method: 'create_or_alter', sqlVerb: 'replace' }
        : { service, resource, method: 'update', sqlVerb: 'replace' };
    case 'delete':
      return { service, resource, method: 'delete', sqlVerb: 'delete' };
    default:
      return { error: `unhandled http verb ${verb}` };
  }
}

// ---------------------------------------------------------------------------

const specFiles = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
if (specFiles.length === 0) {
  console.error(`Error: no specs in ${sourceDir} - run \`npm run pre-process\` first`);
  process.exit(1);
}

const rows = [];
const errors = [];

for (const file of specFiles) {
  const specKey = file.replace(/\.ya?ml$/, '');
  const doc = yaml.load(fs.readFileSync(path.join(sourceDir, file), 'utf8'));
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    const pathLevelParams = (pathItem.parameters || []).map((p) => resolveRef(doc, p));
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      const opParams = (op.parameters || []).map((p) => resolveRef(doc, p));
      const allParams = [...pathLevelParams, ...opParams];
      const pathParams = allParams.filter((p) => p.in === 'path').map((p) => p.name);
      const queryParams = allParams.filter((p) => p.in === 'query').map((p) => p.name);
      const paginationParams = queryParams.filter((q) => PAGINATION_PARAM_NAMES.has(q));
      const { shape: responseShape, hasLinkHeader } = classifyResponse(doc, op);
      const createOrAlter = verb === 'put' && /^createOrAlter/i.test(op.operationId || '');
      const isAction = /:[a-zA-Z-]+$/.test(pathKey);

      const m = proposeMapping({ specKey, verb, pathKey, op, responseShape });
      if (m.error) {
        errors.push(`${file} ${verb} ${pathKey}: ${m.error}`);
        continue;
      }
      rows.push({
        spec_file: file,
        http_method: verb,
        path: pathKey,
        operation_id: op.operationId || '',
        deprecated: op.deprecated ? 'y' : '',
        path_params: pathParams.join(' '),
        query_params: queryParams.join(' '),
        pagination_params: paginationParams.join(' '),
        has_request_body: op.requestBody ? 'y' : '',
        response_shape: responseShape,
        link_header: hasLinkHeader ? 'y' : '',
        create_or_alter: createOrAlter ? 'y' : '',
        action_endpoint: isAction ? 'y' : '',
        proposed_service: m.service,
        proposed_resource: m.resource,
        proposed_method: m.method,
        proposed_verb: m.sqlVerb,
        skip_reason: m.skipReason || ''
      });
    }
  }
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

const header = Object.keys(rows[0]);
const csvField = (v) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const csv = [header.join(','), ...rows.map((r) => header.map((h) => csvField(String(r[h]))).join(','))].join('\n') + '\n';
fs.mkdirSync(path.dirname(csvPath), { recursive: true });
fs.writeFileSync(csvPath, csv, 'utf8');

// ---------------------------------------------------------------------------
// report
// ---------------------------------------------------------------------------

const count = (arr, key) => {
  const m = new Map();
  for (const r of arr) {
    const k = key(r);
    m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

console.log(`endpoint inventory written to ${csvPath}: ${rows.length} operations across ${specFiles.length} specs\n`);

console.log('operations by spec:');
for (const [k, v] of count(rows, (r) => r.spec_file).sort()) console.log(`  ${k}: ${v}`);

console.log('\nproposed verb distribution:');
for (const [k, v] of count(rows, (r) => r.proposed_verb)) console.log(`  ${k}: ${v}`);

console.log('\ndisposition:');
const skips = rows.filter((r) => r.proposed_verb === 'skip');
console.log(`  mapped: ${rows.length - skips.length}`);
for (const [k, v] of count(skips, (r) => r.skip_reason.split(':')[0])) console.log(`  skipped ${k}: ${v}`);

console.log(`\ncreate-or-alter (PUT -> REPLACE): ${rows.filter((r) => r.create_or_alter === 'y').length}`);
console.log(`action endpoints (colon paths): ${rows.filter((r) => r.action_endpoint === 'y').length}`);
console.log(`deprecated operations: ${rows.filter((r) => r.deprecated === 'y').length} (${[...new Set(rows.filter((r) => r.deprecated === 'y').map((r) => r.spec_file))].join(', ')})`);

console.log('\npagination parameter patterns across list endpoints (GET + array response):');
const lists = rows.filter((r) => r.http_method === 'get' && r.response_shape === 'array');
for (const [k, v] of count(lists, (r) => r.pagination_params || '(none)')) console.log(`  [${k}]: ${v}`);
console.log(`  list endpoints with a Link response header: ${lists.filter((r) => r.link_header === 'y').length} of ${lists.length}`);

console.log('\nproposed services:');
for (const [k, v] of count(rows.filter((r) => r.proposed_verb !== 'skip'), (r) => r.proposed_service).sort()) console.log(`  ${k}: ${v} ops`);
