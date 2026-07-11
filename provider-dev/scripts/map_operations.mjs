#!/usr/bin/env node

// Populates stackql_resource_name, stackql_method_name, stackql_verb and
// stackql_object_key in provider-dev/config/all_services.csv from the split
// service specs in provider-dev/source. Deterministic and re-runnable on
// spec syncs; review the CSV diff after running.
//
// Mapping rules (see CLAUDE.md):
//   GET collection (array response)      -> <resource>.list       SELECT
//   GET single                           -> <resource>.get        SELECT
//   POST create                          -> <resource>.create     INSERT
//   PUT create-or-alter                  -> <resource>.create_or_alter REPLACE
//   DELETE                               -> <resource>.delete     DELETE
//   POST /path:action (and other action POSTs) -> <resource>.<action> EXEC
//   grants: grant -> INSERT, revoke -> DELETE, list -> SELECT, with the
//     grant-option and bulk (group) variants as their own resources so every
//     overloaded verb keeps a unique required-parameter signature
//   sqlapi: submit_statement INSERT (INSERT ... RETURNING is the primary
//     data plane vector - see NOTES.md), get_statement_status SELECT,
//     cancel_statement DELETE (POST :cancel revokes the work, mirroring the
//     original provider), results.fetch_result SELECT
//
// stackql_object_key mirrors the normalize step's bare-array wrapping: a
// bare-array list response is wrapped in an object keyed by the operationId
// noun (listDatabases -> $.databases), so list mappings carry that key.
//
// Validates: every operation in a mapped service is mapped or explicitly
// skipped with a reason, method names unique per resource, overloaded SQL
// verbs have unique required-parameter signatures per resource. Fails
// without writing on any violation.
//
// Usage: node provider-dev/scripts/map_operations.mjs [--services a,b,c] [--out FILE]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const csvPath = path.join(repoRoot, 'provider-dev', 'config', 'all_services.csv');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};
const onlyServices = getArg('--services') ? getArg('--services').split(',') : null;

const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch'];

// mirrors deriveWrapperKey in @stackql/provider-utils normalize.js so
// stackql_object_key matches the wrapper the normalize step will create
const VERB_PREFIXES = ['list_all', 'get_all', 'fetch_all', 'find_all', 'list', 'get', 'fetch', 'find', 'index', 'enumerate', 'retrieve'];
function camelToSnake(name) {
  return name
    .replace(/([a-z0-9])([A-Z][a-z]+)/g, '$1_$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .replace(/-/g, '_');
}
function deriveWrapperKey(operationId) {
  let snake = camelToSnake(operationId || '');
  for (const verb of VERB_PREFIXES) {
    if (snake === verb) return '';
    if (snake.startsWith(verb + '_')) return snake.slice(verb.length + 1);
  }
  return snake;
}

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

// ---------------------------------------------------------------------------
// Pass 0: index every operation in the split service specs
// ---------------------------------------------------------------------------

const ops = new Map(); // `${filename}::${path}::${verb}` -> op info

const specFiles = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
for (const filename of specFiles) {
  const doc = yaml.load(fs.readFileSync(path.join(sourceDir, filename), 'utf8'));
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    const pathParams = (pathItem.parameters || []).map((p) => resolveRef(doc, p));
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      const allParams = [...pathParams, ...(op.parameters || []).map((p) => resolveRef(doc, p))];
      const requiredParams = allParams.filter((p) => p.in === 'path' || (p.in === 'query' && p.required)).map((p) => p.name);
      const success = Object.keys(op.responses || {}).filter((c) => /^2\d\d$/.test(c)).sort()[0];
      const resp = success ? resolveRef(doc, op.responses[success]) : null;
      const json = resp?.content?.['application/json'];
      const respSchema = json ? resolveRef(doc, json.schema || {}) : null;
      ops.set(`${filename}::${pathKey}::${verb}`, {
        operationId: op.operationId,
        deprecated: !!op.deprecated,
        requiredParams,
        responseIsArray: respSchema?.type === 'array',
        sseOnly: !!(resp?.content?.['text/event-stream'] && !json)
      });
    }
  }
}

// ---------------------------------------------------------------------------
// mapping rules
// ---------------------------------------------------------------------------

function mapGrantOperation(pathKey, verb) {
  const bulk = pathKey.includes('{bulkGrantType}');
  const grantOption = pathKey.endsWith('/grant-option');
  const resource = `${bulk ? 'group_' : ''}grant${grantOption ? '_options' : 's'}`;
  if (verb === 'get') return { resource: 'grants', method: 'list_grants_to', sqlVerb: 'select', objectKey: '$.grants_to' };
  if (verb === 'post') return { resource, method: 'grant', sqlVerb: 'insert', objectKey: '' };
  if (verb === 'delete') return { resource, method: 'revoke', sqlVerb: 'delete', objectKey: '' };
  return { error: `unhandled grant operation ${verb} ${pathKey}` };
}

const SQLAPI_MAP = {
  SubmitStatement: { resource: 'statements', method: 'submit_statement', sqlVerb: 'insert', objectKey: '' },
  GetStatementStatus: { resource: 'statements', method: 'get_statement_status', sqlVerb: 'select', objectKey: '' },
  CancelStatement: { resource: 'statements', method: 'cancel_statement', sqlVerb: 'delete', objectKey: '' },
  fetchResult: { resource: 'results', method: 'fetch_result', sqlVerb: 'select', objectKey: '' }
};

function mapOperation(filename, pathKey, verb) {
  const op = ops.get(`${filename}::${pathKey}::${verb}`);
  if (!op) return { error: `operation not found in ${sourceDir}` };
  const opId = op.operationId || '';

  if (op.sseOnly) {
    return { resource: 'skip_this_resource', method: '', sqlVerb: '', objectKey: '', skip: 'streaming_sse_only' };
  }

  if (pathKey.startsWith('/api/v2/grants/')) return mapGrantOperation(pathKey, verb);
  if (SQLAPI_MAP[opId] && (pathKey.startsWith('/api/v2/statements') || pathKey.startsWith('/api/v2/results'))) {
    return SQLAPI_MAP[opId];
  }

  // action endpoints: `/path:action` -> EXEC on the owning resource; a
  // trailing static segment before the colon becomes part of the method
  // (/databases/{name}/replication:enable -> databases.enable_replication)
  const actionMatch = pathKey.match(/:([a-zA-Z_-]+)$/);
  const strippedPath = pathKey.replace(/:[a-zA-Z_-]+$/, '');
  const segments = strippedPath.split('/').filter((s) => s && s !== 'api' && s !== 'v2');
  const staticSegs = segments.filter((s) => !s.startsWith('{'));
  const snake = (s) => s.replace(/-/g, '_');

  if (actionMatch) {
    const action = snake(actionMatch[1]);
    const lastSeg = segments[segments.length - 1];
    const hasSubresource = staticSegs.length > 1 && lastSeg && !lastSeg.startsWith('{');
    const resource = snake(hasSubresource ? staticSegs[staticSegs.length - 2] : staticSegs[staticSegs.length - 1]);
    const method = hasSubresource ? `${action}_${snake(lastSeg)}` : action;
    return { resource, method: op.deprecated ? maybeDeprecated(method) : method, sqlVerb: 'exec', objectKey: '' };
  }

  const resource = snake(staticSegs[staticSegs.length - 1] || filename.replace(/\.ya?ml$/, ''));

  switch (verb) {
    case 'get':
      return op.responseIsArray
        ? { resource, method: 'list', sqlVerb: 'select', objectKey: `$.${deriveWrapperKey(opId) || 'items'}` }
        : { resource, method: 'get', sqlVerb: 'select', objectKey: '' };
    case 'post':
      if (/^create/i.test(opId)) {
        return { resource, method: op.deprecated ? maybeDeprecated('create') : 'create', sqlVerb: 'insert', objectKey: '' };
      }
      // POST that is neither a create nor a colon action: an RPC-style call
      return { resource, method: camelToSnake(opId), sqlVerb: 'exec', objectKey: '' };
    case 'put':
      return /^createOrAlter/i.test(opId)
        ? { resource, method: 'create_or_alter', sqlVerb: 'replace', objectKey: '' }
        : { error: `PUT operation that is not createOrAlter*: ${opId}` };
    case 'delete':
      return { resource, method: 'delete', sqlVerb: 'delete', objectKey: '' };
    default:
      return { error: `unhandled http verb ${verb}` };
  }

  function maybeDeprecated(m) {
    return `${m}_deprecated`;
  }
}

// ---------------------------------------------------------------------------
// CSV read/transform/write (simple RFC 4180 handling, preserves column order)
// ---------------------------------------------------------------------------

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else { field += c; }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else { field += c; }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function csvField(v) {
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
for (const required of ['filename', 'path', 'verb', 'operationId', 'stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key']) {
  if (!(required in col)) {
    console.error(`Missing expected CSV column: ${required}`);
    process.exit(1);
  }
}

const inScope = (filename) => !onlyServices || onlyServices.includes(filename.replace(/\.ya?ml$/, ''));

const errors = [];
const seenKeys = new Set();
const stats = { mapped: 0, skipped: 0, exec: 0 };

for (const row of rows.slice(1)) {
  const filename = row[col.filename], pathKey = row[col.path], verb = row[col.verb];
  if (!inScope(filename)) continue;
  seenKeys.add(`${filename}::${pathKey}::${verb}`);
  const m = mapOperation(filename, pathKey, verb);
  if (m.error) {
    errors.push(`${filename} ${verb} ${pathKey}: ${m.error}`);
    continue;
  }
  row[col.stackql_resource_name] = m.resource;
  if (m.resource === 'skip_this_resource') {
    row[col.stackql_method_name] = '';
    row[col.stackql_verb] = '';
    row[col.stackql_object_key] = '';
    stats.skipped++;
    continue;
  }
  row[col.stackql_method_name] = m.method;
  row[col.stackql_verb] = m.sqlVerb;
  row[col.stackql_object_key] = m.objectKey;
  if (m.sqlVerb === 'exec') stats.exec++; else stats.mapped++;
}

// spec operations missing from the CSV manifest (would fail generate-provider)
for (const key of ops.keys()) {
  const [filename] = key.split('::');
  if (inScope(filename) && !seenKeys.has(key)) {
    errors.push(`in spec but not in CSV: ${key}`);
  }
}

// ---------------------------------------------------------------------------
// Consistency checks: unique (resource, method), unique required-parameter
// signatures per (resource, sqlVerb), within each service. Method-name
// collisions where exactly one op is deprecated get the `_deprecated`
// suffix at mapping time; anything left here fails.
// ---------------------------------------------------------------------------

const methodSeen = new Map();
const sigSeen = new Map();
for (const row of rows.slice(1)) {
  if (!inScope(row[col.filename])) continue;
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.ya?ml$/, '');
  const methodKey = `${service}.${resource}.${row[col.stackql_method_name]}`;
  if (methodSeen.has(methodKey)) {
    errors.push(`duplicate method ${methodKey} (${methodSeen.get(methodKey)} and ${row[col.path]}:${row[col.verb]})`);
  }
  methodSeen.set(methodKey, `${row[col.path]}:${row[col.verb]}`);

  const sqlVerb = row[col.stackql_verb];
  if (sqlVerb === 'exec') continue;
  const op = ops.get(`${row[col.filename]}::${row[col.path]}::${row[col.verb]}`);
  const sig = [...(op?.requiredParams || [])].sort().join(',');
  const sigKey = `${service}.${resource}.${sqlVerb}::${sig}`;
  if (sigSeen.has(sigKey)) {
    errors.push(`signature clash on ${service}.${resource} ${sqlVerb} [${sig}] (${sigSeen.get(sigKey)} and ${row[col.stackql_method_name]})`);
  }
  sigSeen.set(sigKey, row[col.stackql_method_name]);
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

const outPath = getArg('--out') ? path.resolve(getArg('--out')) : csvPath;
const out = rows.map((r) => r.map(csvField).join(',')).join('\n') + '\n';
fs.writeFileSync(outPath, out);

// summary
const resourcesByService = new Map();
for (const row of rows.slice(1)) {
  if (!inScope(row[col.filename])) continue;
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.ya?ml$/, '');
  if (!resourcesByService.has(service)) resourcesByService.set(service, new Set());
  resourcesByService.get(service).add(resource);
}
console.log(`Mapped ${stats.mapped} operations to SQL verbs, ${stats.exec} to exec, ${stats.skipped} skipped${onlyServices ? ` (services: ${onlyServices.join(', ')})` : ''}`);
console.log('Resources per service:');
for (const [service, resources] of [...resourcesByService.entries()].sort()) {
  console.log(`  ${service}: ${[...resources].sort().join(', ')}`);
}
