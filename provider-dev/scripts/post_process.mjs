#!/usr/bin/env node

// Post-processes the generated provider (provider-dev/openapi/src/snowflake)
// for anything the generator cannot express. Deterministic and idempotent;
// fails without writing on any violation.
//
// Current fixes:
//
// 1. LIMIT pushdown per method. Snowflake control-plane list endpoints take a
//    client-driven `showLimit` window parameter (31 of the ~60 list
//    endpoints; the rest do not accept it). any-sdk's queryParamPushdown
//    `top` translation sets the configured query parameter whenever the SQL
//    carries a LIMIT, unconditionally - so the config must sit at method
//    level on exactly the methods whose operation declares `showLimit`, not
//    at service level where it would spray the parameter onto endpoints that
//    reject it. Pushdown is an optimisation only: StackQL's client-side
//    LIMIT remains authoritative.
//
// 2. Result retrieval schema binding. The vendor spec declares the
//    fetchResult 200 response as `application/json: {}` (no schema), which
//    projects as zero columns. The live payload is the same ResultSet shape
//    returned by SubmitStatement (partition retrieval returns the next
//    partition of the same result set), so the method response is bound to
//    the ResultSet schema via schema_override.
//
// Usage: node provider-dev/scripts/post_process.mjs [--verbose]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const servicesDir = path.join(repoRoot, 'provider-dev', 'openapi', 'src', 'snowflake', 'v00.00.00000', 'services');
const verbose = process.argv.includes('--verbose');

if (!fs.existsSync(servicesDir)) {
  console.error(`FAILED: ${servicesDir} not found - run \`npm run generate-provider\` first`);
  process.exit(1);
}

function resolveRef(doc, node) {
  if (node && typeof node.$ref === 'string' && node.$ref.startsWith('#/')) {
    let target = doc;
    for (const seg of node.$ref.slice(2).split('/')) {
      target = target?.[seg.replace(/~1/g, '/').replace(/~0/g, '~')];
    }
    return target;
  }
  return node;
}

function operationFromMethodRef(doc, method) {
  const ref = method?.operation?.$ref;
  if (!ref) return null;
  return resolveRef(doc, { $ref: ref }) || null;
}

function opDeclaresQueryParam(doc, pathItem, op, name) {
  const all = [...(pathItem?.parameters || []), ...(op?.parameters || [])].map((p) => resolveRef(doc, p));
  return all.some((p) => p && p.in === 'query' && p.name === name);
}

const errors = [];
let pushdownInjected = 0;
let pushdownAlready = 0;
const written = [];

for (const filename of fs.readdirSync(servicesDir).filter((f) => f.endsWith('.yaml')).sort()) {
  const filePath = path.join(servicesDir, filename);
  const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));
  const resources = doc.components?.['x-stackQL-resources'];
  if (!resources) {
    errors.push(`${filename}: no x-stackQL-resources block`);
    continue;
  }
  let changed = false;

  for (const [resourceName, resource] of Object.entries(resources)) {
    // methods referenced by the select verb are the pushdown candidates
    const selectRefs = new Set((resource.sqlVerbs?.select || []).map((r) => r.$ref?.split('/').pop()).filter(Boolean));
    for (const [methodName, method] of Object.entries(resource.methods || {})) {
      if (!selectRefs.has(methodName)) continue;
      const opRef = method?.operation?.$ref;
      const op = operationFromMethodRef(doc, method);
      if (!op) {
        errors.push(`${filename}: ${resourceName}.${methodName} operation $ref does not resolve (${opRef})`);
        continue;
      }
      // resolve the owning path item for path-level parameters
      const pathItemRef = opRef.replace(/\/[a-z]+$/, '');
      const pathItem = resolveRef(doc, { $ref: pathItemRef });
      if (!opDeclaresQueryParam(doc, pathItem, op, 'showLimit')) continue;

      const existing = method.config?.queryParamPushdown;
      if (existing) {
        if (existing.top?.paramName === 'showLimit') { pushdownAlready++; continue; }
        errors.push(`${filename}: ${resourceName}.${methodName} has an unexpected queryParamPushdown block`);
        continue;
      }
      method.config = method.config || {};
      method.config.queryParamPushdown = { top: { paramName: 'showLimit' } };
      pushdownInjected++;
      changed = true;
      if (verbose) console.log(`${filename}: ${resourceName}.${methodName} <- top pushdown (showLimit)`);
    }
  }

  // fix 2: bind fetch_result to the ResultSet schema (sqlapi only)
  if (filename === 'sqlapi.yaml') {
    const fetchResult = resources.results?.methods?.fetch_result;
    if (!fetchResult) {
      errors.push('sqlapi.yaml: results.fetch_result method not found');
    } else if (!doc.components?.schemas?.ResultSet) {
      errors.push('sqlapi.yaml: ResultSet schema not found');
    } else if (fetchResult.response?.schema_override?.$ref !== '#/components/schemas/ResultSet') {
      fetchResult.response = {
        ...(fetchResult.response || { mediaType: 'application/json', openAPIDocKey: '200' }),
        schema_override: { $ref: '#/components/schemas/ResultSet' }
      };
      changed = true;
      if (verbose) console.log('sqlapi.yaml: results.fetch_result <- ResultSet schema_override');
    }
  }

  if (changed) written.push({ filePath, doc });
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

for (const { filePath, doc } of written) {
  fs.writeFileSync(filePath, yaml.dump(doc, { lineWidth: -1, noRefs: true }));
}
console.log(`post_process: LIMIT pushdown on ${pushdownInjected + pushdownAlready} method(s) (${pushdownInjected} injected, ${pushdownAlready} already present), ${written.length} file(s) written`);
