#!/usr/bin/env node

// Pre-processes the vendor specs (specifications/, upstream fork content,
// never modified) into provider-dev/source/:
//
//   1. injects the shared components from common.yaml / common-cortex-*.yaml
//      into each referencing spec (transitively - common-cortex-agent.yaml
//      itself references common-cortex-tool.yaml) and rewrites the external
//      refs (`common.yaml#/...`, `./common.yaml#/...`) to internal `#/...`
//      refs. Merge semantics follow the original build's pre_process.py:
//      add-only per components section (an existing key in the target spec
//      wins), except securitySchemes which is replaced wholly. A key present
//      in two different shared files with different content fails the build.
//   2. renames reserved-word path parameters (database -> database_name,
//      schema -> schema_name, ...) in path templates, parameter components
//      and refs, carried over from the original build so WHERE-clause column
//      names do not collide with SQL keywords or resource columns.
//   3. validates every resulting spec with @apidevtools/swagger-parser.
//
// Fails without writing anything on any error. On success, replaces the
// yaml content of provider-dev/source/ and re-records the spec pin
// (provider-dev/config/spec_pin.json).
//
// Usage: node provider-dev/scripts/pre_process.mjs [--verbose]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';
import SwaggerParser from '@apidevtools/swagger-parser';
import { recordSpecPin } from './record_spec_pin.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const specsDir = path.join(repoRoot, 'specifications');
const outDir = path.join(repoRoot, 'provider-dev', 'source');
const verbose = process.argv.includes('--verbose');

// reserved-word path parameter renames carried over from the original build
const PATH_PARAM_RENAMES = {
  database: 'database_name',
  schema: 'schema_name',
  table: 'table_name',
  view: 'view_name',
  function: 'function_name',
  procedure: 'procedure_name',
  stage: 'stage_name',
  pipe: 'pipe_name',
  task: 'task_name',
  stream: 'stream_name'
};

const COMMON_REF_RE = /(?:\.\/)?(common[a-z-]*\.ya?ml)#\//g;
const COMMON_REF_VALUE_RE = /^(?:\.\/)?common[a-z-]*\.ya?ml(#\/.*)$/;

// rewrite external `common*.yaml#/...` refs to internal `#/...` refs on the
// parsed document (a raw-text rewrite would produce `$ref: #/...`, which
// YAML parses as an empty value followed by a comment)
function internalizeCommonRefs(node) {
  if (Array.isArray(node)) {
    for (const item of node) internalizeCommonRefs(item);
    return;
  }
  if (!node || typeof node !== 'object') return;
  if (typeof node.$ref === 'string') {
    const m = node.$ref.match(COMMON_REF_VALUE_RE);
    if (m) node.$ref = m[1];
  }
  for (const value of Object.values(node)) internalizeCommonRefs(value);
}

const allFiles = fs.readdirSync(specsDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml')).sort();
const commonFiles = allFiles.filter((f) => f.startsWith('common'));
const serviceFiles = allFiles.filter((f) => !f.startsWith('common'));

const rawByFile = new Map();
for (const f of allFiles) {
  rawByFile.set(f, fs.readFileSync(path.join(specsDir, f), 'utf8'));
}

// which common files does a raw spec text reference
function commonRefsOf(raw) {
  const refs = new Set();
  for (const m of raw.matchAll(COMMON_REF_RE)) refs.add(m[1]);
  return refs;
}

// transitive closure of shared-file dependencies, dependency-first order
function closureOf(file) {
  const ordered = [];
  const seen = new Set();
  const visit = (f) => {
    if (seen.has(f)) return;
    seen.add(f);
    for (const dep of commonRefsOf(rawByFile.get(f))) {
      if (dep !== f) visit(dep);
    }
    if (f.startsWith('common')) ordered.push(f);
  };
  visit(file);
  return ordered;
}

const errors = [];
const results = []; // { file, injected, renamed, status }
const outputs = new Map(); // file -> yaml text

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function mergeCommonComponents(file, doc, commonDocsInOrder) {
  const provenance = new Map(); // `${section}.${key}` -> source common file
  doc.components = doc.components || {};
  for (const { name: commonName, doc: common } of commonDocsInOrder) {
    for (const [section, entries] of Object.entries(common.components || {})) {
      if (section === 'securitySchemes') {
        doc.components[section] = structuredClone(entries);
        continue;
      }
      doc.components[section] = doc.components[section] || {};
      for (const [key, value] of Object.entries(entries)) {
        const provKey = `${section}.${key}`;
        if (key in doc.components[section]) {
          const from = provenance.get(provKey);
          if (from && !deepEqual(doc.components[section][key], value)) {
            errors.push(`${file}: components.${section}.${key} differs between shared files ${from} and ${commonName}`);
          }
          // an existing key in the target spec itself wins (original behavior)
          continue;
        }
        doc.components[section][key] = structuredClone(value);
        provenance.set(provKey, commonName);
      }
    }
  }
}

function renameReservedPathParams(doc) {
  let renamed = 0;

  // components.parameters keys that are reserved-word path params
  const params = doc.components?.parameters || {};
  for (const [oldKey, newKey] of Object.entries(PATH_PARAM_RENAMES)) {
    const p = params[oldKey];
    if (p && p.in === 'path') {
      params[newKey] = p;
      delete params[oldKey];
      if (p.name === oldKey) p.name = newKey;
      renamed++;
    }
  }

  // walk the whole doc: rewrite refs and inline path parameter names
  const walk = (node) => {
    if (Array.isArray(node)) {
      for (const item of node) walk(item);
      return;
    }
    if (!node || typeof node !== 'object') return;
    if (typeof node.$ref === 'string') {
      const m = node.$ref.match(/^#\/components\/parameters\/(.+)$/);
      if (m && PATH_PARAM_RENAMES[m[1]] && params[PATH_PARAM_RENAMES[m[1]]]) {
        node.$ref = `#/components/parameters/${PATH_PARAM_RENAMES[m[1]]}`;
      }
    }
    if (node.in === 'path' && PATH_PARAM_RENAMES[node.name]) {
      node.name = PATH_PARAM_RENAMES[node.name];
      renamed++;
    }
    for (const value of Object.values(node)) walk(value);
  };
  walk(doc.paths);

  // path templates
  const newPaths = {};
  for (const [p, item] of Object.entries(doc.paths || {})) {
    let np = p;
    for (const [oldKey, newKey] of Object.entries(PATH_PARAM_RENAMES)) {
      np = np.replaceAll(`{${oldKey}}`, `{${newKey}}`);
    }
    if (np !== p) renamed++;
    newPaths[np] = item;
  }
  doc.paths = newPaths;

  return renamed;
}

// parse the shared files once (they are merged into referencing specs, never emitted)
const commonDocs = new Map();
for (const f of commonFiles) {
  try {
    commonDocs.set(f, yaml.load(rawByFile.get(f)));
  } catch (e) {
    errors.push(`${f}: yaml parse error: ${e.message}`);
  }
}

// the shared files reference each other with the same external form - the
// merged components must themselves be ref-rewritten (once, cached)
const internalizedCommon = new Map();
for (const [name, doc] of commonDocs) {
  const clone = structuredClone(doc);
  internalizeCommonRefs(clone);
  internalizedCommon.set(name, clone);
}

for (const file of serviceFiles) {
  const deps = closureOf(file);
  let doc;
  try {
    doc = yaml.load(rawByFile.get(file));
  } catch (e) {
    errors.push(`${file}: yaml parse error: ${e.message}`);
    results.push({ file, injected: deps.join('+') || '-', renamed: 0, status: 'PARSE ERROR' });
    continue;
  }
  internalizeCommonRefs(doc);

  const depDocs = deps.map((d) => ({ name: d, doc: internalizedCommon.get(d) }));

  mergeCommonComponents(file, doc, depDocs);
  const renamed = renameReservedPathParams(doc);

  let status = 'OK';
  try {
    // validate() dereferences and mutates - hand it a deep clone
    await SwaggerParser.validate(structuredClone(doc));
  } catch (e) {
    status = 'INVALID';
    errors.push(`${file}: validation failed: ${e.message.split('\n')[0]}`);
  }
  results.push({ file, injected: deps.join('+') || '-', renamed, status });
  outputs.set(file, yaml.dump(doc, { lineWidth: -1, noRefs: true }));
}

console.log('pre-process validation report:');
for (const r of results) {
  console.log(`  ${r.status.padEnd(11)} ${r.file}  (shared: ${r.injected}; path params renamed: ${r.renamed})`);
}

if (errors.length > 0) {
  console.error(`\nFAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))) {
  fs.rmSync(path.join(outDir, f));
}
for (const [file, text] of outputs) {
  fs.writeFileSync(path.join(outDir, file), text, 'utf8');
}
const pin = recordSpecPin();
console.log(`\n${outputs.size} spec(s) written to ${outDir}`);
console.log(`spec pin: ${pin.synced_commit} (${pin.synced_commit_date})`);
