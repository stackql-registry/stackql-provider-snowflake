#!/usr/bin/env node

// Snowflake-specific spec adjustments applied to the split service specs in
// provider-dev/source, after `npm run split` and before mapping/normalize.
//
// The vendor publishes one spec per resource area with operationIds unique
// only within each file. Merging sibling specs into consolidated services
// (bin/split.mjs) surfaces duplicate operationIds - an OpenAPI violation
// that also breaks the normalize step's bare-array wrapper naming (wrapper
// schema names derive from operationId) and generate-provider's CSV row
// matching (matched by operationId). The duplicated grant subresource
// operations are renamed with their parent resource as qualifier; the
// renamed ids also drive the `$.role_grants` / `$.user_grants` /
// `$.database_role_grants` wrapper keys, keeping the three list responses
// distinct.
//
// Renames are an explicit expected table: the script fails without writing
// if an expected rename target is missing, if a rename would itself collide,
// or if any duplicate operationIds remain after renaming (catches upstream
// drift on spec syncs).
//
// Additionally, every createOrAlter PUT operation is moved onto its own path
// entry with the terminal `{name}` parameter renamed to `{<singular>_name}`
// (PUT /api/v2/databases/{name} -> PUT /api/v2/databases/{database_name}).
// Rationale: the create-or-alter request body REQUIRES `name` (verified live -
// omitting it 400s), but any-sdk routes a SQL column matching a declared
// parameter to that parameter, so with a shared `{name}` path param the body
// name is serialized empty and the API rejects the call. With the rename,
// `REPLACE ... SET name = 'X' ... WHERE database_name = 'X'` sends both.
// The wire URL is unchanged - only the template variable name differs.
//
// Usage: node provider-dev/scripts/pre_normalize.mjs [--verbose]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const verbose = process.argv.includes('--verbose');

const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch'];

// file -> path -> verb -> [expectedOldId, newId]
const OPID_RENAMES = {
  'roles.yaml': {
    '/api/v2/roles/{name}/grants': {
      get: ['listGrants', 'listRoleGrants'],
      post: ['grantPrivileges', 'grantRolePrivileges']
    },
    '/api/v2/roles/{name}/grants:revoke': {
      post: ['revokeGrants', 'revokeRoleGrants']
    },
    '/api/v2/roles/{name}/future-grants': {
      get: ['listFutureGrants', 'listRoleFutureGrants'],
      post: ['grantFuturePrivileges', 'grantRoleFuturePrivileges']
    },
    '/api/v2/roles/{name}/future-grants:revoke': {
      post: ['revokeFutureGrants', 'revokeRoleFutureGrants']
    },
    '/api/v2/databases/{database_name}/database-roles/{name}/grants': {
      get: ['listGrants', 'listDatabaseRoleGrants'],
      post: ['grantPrivileges', 'grantDatabaseRolePrivileges']
    },
    '/api/v2/databases/{database_name}/database-roles/{name}/grants:revoke': {
      post: ['revokeGrants', 'revokeDatabaseRoleGrants']
    },
    '/api/v2/databases/{database_name}/database-roles/{name}/future-grants': {
      get: ['listFutureGrants', 'listDatabaseRoleFutureGrants'],
      post: ['grantFuturePrivileges', 'grantDatabaseRoleFuturePrivileges']
    },
    '/api/v2/databases/{database_name}/database-roles/{name}/future-grants:revoke': {
      post: ['revokeFutureGrants', 'revokeDatabaseRoleFutureGrants']
    },
    '/api/v2/users/{name}/grants': {
      get: ['listGrants', 'listUserGrants'],
      post: ['grant', 'grantUserPrivileges']
    },
    '/api/v2/users/{name}/grants:revoke': {
      post: ['revokeGrants', 'revokeUserGrants']
    }
  },
  'cortex.yaml': {
    // cortex-search-service feedback action collides with the analyst
    // feedback endpoint after the cortex merge
    '/api/v2/databases/{database_name}/schemas/{schema_name}/cortex-search-services/{name}:feedback': {
      post: ['sendFeedback', 'sendCortexSearchServiceFeedback']
    }
  }
};

const errors = [];
const docs = new Map(); // filename -> { doc, changed }

for (const filename of fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort()) {
  docs.set(filename, { doc: yaml.load(fs.readFileSync(path.join(sourceDir, filename), 'utf8')), changed: false });
}

// apply renames
for (const [filename, pathMap] of Object.entries(OPID_RENAMES)) {
  const entry = docs.get(filename);
  if (!entry) {
    errors.push(`${filename}: file not found in ${sourceDir}`);
    continue;
  }
  for (const [pathKey, verbMap] of Object.entries(pathMap)) {
    const pathItem = entry.doc.paths?.[pathKey];
    if (!pathItem) {
      errors.push(`${filename}: expected path ${pathKey} not found`);
      continue;
    }
    for (const [verb, [oldId, newId]] of Object.entries(verbMap)) {
      const op = pathItem[verb];
      if (!op) {
        errors.push(`${filename}: expected operation ${verb.toUpperCase()} ${pathKey} not found`);
        continue;
      }
      if (op.operationId === newId) continue; // idempotent re-run
      if (op.operationId !== oldId) {
        errors.push(`${filename}: ${verb.toUpperCase()} ${pathKey} has operationId '${op.operationId}', expected '${oldId}' (upstream drift - review the rename table)`);
        continue;
      }
      op.operationId = newId;
      entry.changed = true;
      if (verbose) console.log(`${filename}: ${oldId} -> ${newId} (${verb.toUpperCase()} ${pathKey})`);
    }
  }
}

// ---------------------------------------------------------------------------
// Header plumbing removal. The SQL API operations declare `User-Agent`
// (required), `Accept` and `X-Snowflake-Authorization-Token-Type` (optional)
// header parameters, which surface as SQL columns - `User-Agent` as a
// REQUIRED one. None is user-relevant:
//   - the service rejects only an ABSENT/EMPTY User-Agent (verified live:
//     391903 with no UA, success with any client default) and stackql's Go
//     HTTP client always sends one;
//   - Accept is plain content negotiation;
//   - X-Snowflake-Authorization-Token-Type selects the bearer token type and
//     is only needed for KEYPAIR_JWT - v1 auth is PAT (the OAuth default).
//     Re-surface or default it if key-pair JWT auth is added.
// ---------------------------------------------------------------------------

const STRIP_HEADER_PARAMS = new Set(['User-Agent', 'Accept', 'X-Snowflake-Authorization-Token-Type']);
{
  let strippedCount = 0;
  for (const [filename, entry] of docs) {
    const doc = entry.doc;
    const resolveP = (p) => {
      if (p && typeof p.$ref === 'string' && p.$ref.startsWith('#/')) {
        let t = doc;
        for (const seg of p.$ref.slice(2).split('/')) t = t?.[seg];
        return t;
      }
      return p;
    };
    for (const pathItem of Object.values(doc.paths || {})) {
      for (const holder of [pathItem, ...HTTP_VERBS.map((v) => pathItem[v]).filter(Boolean)]) {
        if (!Array.isArray(holder.parameters)) continue;
        const before = holder.parameters.length;
        holder.parameters = holder.parameters.filter((p) => {
          const r = resolveP(p);
          return !(r?.in === 'header' && STRIP_HEADER_PARAMS.has(r?.name));
        });
        if (holder.parameters.length !== before) {
          strippedCount += before - holder.parameters.length;
          entry.changed = true;
        }
      }
    }
  }
  if (verbose && strippedCount) console.log(`stripped ${strippedCount} header parameter reference(s) (${[...STRIP_HEADER_PARAMS].join(', ')})`);
}

// ---------------------------------------------------------------------------
// Cortex generic endpoint typing. The vendor spec declares the Anthropic- and
// OpenAI-compatible endpoints (/api/v2/cortex/v1/messages, /api/v2/cortex/v1/
// chat/completions) as opaque passthroughs ({type: object,
// additionalProperties: true}) for BOTH request and response - which leaves
// the SQL surface with no IO contract at all: no insertable/selectable
// columns, nothing for the naive body translator to match. These endpoints
// proxy the published Anthropic Messages and OpenAI Chat Completions wire
// contracts, so minimal typed schemas for the JSON (non-streaming) mode are
// injected here; `stream` defaults false - SSE mode is out of scope, as with
// every prior build's streaming exclusions.
// ---------------------------------------------------------------------------

const CORTEX_GENERIC_SCHEMAS = {
  CortexAnthropicMessagesRequest: {
    type: 'object',
    description: 'Anthropic Messages API compatible request (JSON mode).',
    required: ['model', 'messages', 'max_tokens'],
    properties: {
      model: { type: 'string', description: 'Model that will complete the prompt.' },
      messages: { type: 'array', description: 'Input messages.', items: { type: 'object' } },
      max_tokens: { type: 'integer', description: 'Maximum number of tokens to generate.' },
      system: { type: 'string', description: 'System prompt.' },
      temperature: { type: 'number', description: 'Amount of randomness injected into the response.' },
      top_p: { type: 'number', description: 'Nucleus sampling threshold.' },
      top_k: { type: 'integer', description: 'Only sample from the top K options for each token.' },
      stop_sequences: { type: 'array', description: 'Custom sequences that will stop generation.', items: { type: 'string' } },
      stream: { type: 'boolean', description: 'Must be false or omitted - streaming (SSE) responses are out of scope.', default: false },
      tools: { type: 'array', description: 'Definitions of tools the model may use.', items: { type: 'object' } },
      tool_choice: { type: 'object', description: 'How the model should use the provided tools.' }
    }
  },
  CortexAnthropicMessagesResponse: {
    type: 'object',
    description: 'Anthropic Messages API compatible response.',
    properties: {
      id: { type: 'string', description: 'Unique message identifier.' },
      type: { type: 'string', description: 'Object type (message).' },
      role: { type: 'string', description: 'Conversational role of the generated message (assistant).' },
      model: { type: 'string', description: 'Model that handled the request.' },
      content: { type: 'array', description: 'Generated content blocks.', items: { type: 'object' } },
      stop_reason: { type: 'string', description: 'Reason generation stopped.' },
      stop_sequence: { type: 'string', description: 'Which custom stop sequence was generated, if any.' },
      usage: { type: 'object', description: 'Billing and rate-limit token usage.' }
    }
  },
  CortexOpenAIChatCompletionsRequest: {
    type: 'object',
    description: 'OpenAI Chat Completions API compatible request (JSON mode).',
    required: ['model', 'messages'],
    properties: {
      model: { type: 'string', description: 'Model to use for the completion.' },
      messages: { type: 'array', description: 'Messages comprising the conversation so far.', items: { type: 'object' } },
      max_completion_tokens: { type: 'integer', description: 'Upper bound for generated completion tokens.' },
      temperature: { type: 'number', description: 'Sampling temperature.' },
      top_p: { type: 'number', description: 'Nucleus sampling threshold.' },
      n: { type: 'integer', description: 'Number of chat completion choices to generate.' },
      stream: { type: 'boolean', description: 'Must be false or omitted - streaming (SSE) responses are out of scope.', default: false },
      stop: { type: 'array', description: 'Sequences where the API will stop generating.', items: { type: 'string' } },
      presence_penalty: { type: 'number', description: 'Penalize new tokens based on presence so far.' },
      frequency_penalty: { type: 'number', description: 'Penalize new tokens based on frequency so far.' },
      response_format: { type: 'object', description: 'Output format specification (e.g. JSON mode).' },
      tools: { type: 'array', description: 'Tools the model may call.', items: { type: 'object' } },
      tool_choice: { type: 'object', description: 'Controls which (if any) tool is called.' },
      user: { type: 'string', description: 'Stable end-user identifier.' }
    }
  },
  CortexOpenAIChatCompletionsResponse: {
    type: 'object',
    description: 'OpenAI Chat Completions API compatible response.',
    properties: {
      id: { type: 'string', description: 'Unique completion identifier.' },
      object: { type: 'string', description: 'Object type (chat.completion).' },
      created: { type: 'integer', description: 'Unix timestamp of creation.' },
      model: { type: 'string', description: 'Model used for the completion.' },
      choices: { type: 'array', description: 'Completion choices.', items: { type: 'object' } },
      usage: { type: 'object', description: 'Completion token usage.' },
      system_fingerprint: { type: 'string', description: 'Backend configuration fingerprint.' }
    }
  }
};

const CORTEX_GENERIC_BINDINGS = {
  '/api/v2/cortex/v1/messages': ['CortexAnthropicMessagesRequest', 'CortexAnthropicMessagesResponse'],
  '/api/v2/cortex/v1/chat/completions': ['CortexOpenAIChatCompletionsRequest', 'CortexOpenAIChatCompletionsResponse']
};

{
  const entry = docs.get('cortex.yaml');
  if (!entry) {
    errors.push('cortex.yaml: file not found for generic endpoint typing');
  } else {
    const doc = entry.doc;
    for (const [pathKey, [reqName, respName]] of Object.entries(CORTEX_GENERIC_BINDINGS)) {
      const op = doc.paths?.[pathKey]?.post;
      if (!op) {
        errors.push(`cortex.yaml: expected POST ${pathKey} not found`);
        continue;
      }
      const reqSchema = op.requestBody?.content?.['application/json'];
      const respSchema = op.responses?.['200']?.content?.['application/json'];
      if (!reqSchema || !respSchema) {
        errors.push(`cortex.yaml: POST ${pathKey} missing application/json request or 200 response`);
        continue;
      }
      const alreadyTyped = reqSchema.schema?.$ref?.endsWith(reqName);
      if (!alreadyTyped) {
        const opaque = (s) => s && s.type === 'object' && s.additionalProperties === true && !s.properties;
        if (!opaque(reqSchema.schema) || !opaque(respSchema.schema)) {
          errors.push(`cortex.yaml: POST ${pathKey} schemas are no longer the opaque passthrough shape - review the typed injection against the upstream change`);
          continue;
        }
        doc.components = doc.components || {};
        doc.components.schemas = doc.components.schemas || {};
        doc.components.schemas[reqName] = CORTEX_GENERIC_SCHEMAS[reqName];
        doc.components.schemas[respName] = CORTEX_GENERIC_SCHEMAS[respName];
        reqSchema.schema = { $ref: `#/components/schemas/${reqName}` };
        respSchema.schema = { $ref: `#/components/schemas/${respName}` };
        entry.changed = true;
        if (verbose) console.log(`cortex.yaml: POST ${pathKey} typed as ${reqName}/${respName}`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// createOrAlter PUT path split (see header)
// ---------------------------------------------------------------------------

function singularize(seg) {
  const s = seg.replace(/-/g, '_');
  if (s.endsWith('ies')) return s.slice(0, -3) + 'y';
  if (s.endsWith('s')) return s.slice(0, -1);
  return s;
}

function resolveParamRef(doc, node) {
  if (node && typeof node.$ref === 'string' && node.$ref.startsWith('#/')) {
    let target = doc;
    for (const seg of node.$ref.slice(2).split('/')) target = target?.[seg];
    return target;
  }
  return node;
}

for (const [filename, { doc }] of docs) {
  const entry = docs.get(filename);
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    const put = pathItem.put;
    if (!put || !/^createOrAlter/i.test(put.operationId || '')) continue;
    const segs = pathKey.split('/');
    if (segs[segs.length - 1] !== '{name}') {
      errors.push(`${filename}: createOrAlter PUT ${pathKey} does not end in {name} - extend the rename rule`);
      continue;
    }
    const collection = segs[segs.length - 2];
    const newParam = `${singularize(collection)}_name`;
    const newPathKey = [...segs.slice(0, -1), `{${newParam}}`].join('/');
    if (doc.paths[newPathKey] && !doc.paths[newPathKey].put) {
      errors.push(`${filename}: split target path ${newPathKey} already exists`);
      continue;
    }
    if (doc.paths[newPathKey]?.put) continue; // idempotent re-run

    // rename the terminal `name` path param wherever it is declared -
    // path level and/or on the PUT operation itself (the vendor specs use
    // $refs to a shared components.parameters.name at both levels)
    let renamed = 0;
    const renameIn = (params) => (params || []).map((p) => {
      const resolved = resolveParamRef(doc, p);
      if (resolved?.name === 'name' && resolved?.in === 'path') {
        renamed++;
        return { ...JSON.parse(JSON.stringify(resolved)), name: newParam };
      }
      return p;
    });
    const newPathParams = renameIn(pathItem.parameters);
    const newPut = { ...put, parameters: renameIn(put.parameters) };
    if (renamed === 0) {
      errors.push(`${filename}: createOrAlter PUT ${pathKey} declares no \`name\` path parameter at either level`);
      continue;
    }
    doc.paths[newPathKey] = { parameters: newPathParams, put: newPut };
    delete pathItem.put;
    entry.changed = true;
    if (verbose) console.log(`${filename}: PUT ${pathKey} -> ${newPathKey} ({name} -> {${newParam}})`);
  }
}

// prove no duplicate operationIds remain in any service spec
for (const [filename, { doc }] of docs) {
  const seen = new Map();
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const opId = pathItem[verb]?.operationId;
      if (!opId) continue;
      if (seen.has(opId)) {
        errors.push(`${filename}: duplicate operationId '${opId}' (${seen.get(opId)} and ${verb.toUpperCase()} ${pathKey})`);
      }
      seen.set(opId, `${verb.toUpperCase()} ${pathKey}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

let written = 0;
for (const [filename, { doc, changed }] of docs) {
  if (!changed) continue;
  fs.writeFileSync(path.join(sourceDir, filename), yaml.dump(doc, { lineWidth: -1, noRefs: true }));
  written++;
}
console.log(`pre_normalize: ${written} file(s) updated, duplicate operationId check passed across ${docs.size} spec(s)`);
