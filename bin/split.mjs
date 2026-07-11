#!/usr/bin/env node

// Regroups the pre-processed vendor specs (one per Snowflake resource area,
// produced by provider-dev/scripts/pre_process.mjs) into StackQL service
// specs, driven by provider-dev/config/service_names.json. The vendor layout
// is already one self-contained spec per resource area, so this is a merge
// of sibling specs into their target service rather than a decomposition -
// paths are unioned (duplicate path keys fail), components are unioned with
// identical-content tolerance (the shared components injected at pre-process
// are byte-identical across members; any genuine conflict fails without
// writing).
//
// Usage: node bin/split.mjs --provider-name snowflake \
//          [--input-dir provider-dev/source] [--output-dir provider-dev/source] \
//          [--service-names provider-dev/config/service_names.json] \
//          [--services databases,grants] [--overwrite] [--verbose]
//
// When --output-dir equals --input-dir (the default), the consumed member
// spec files are removed after all service specs are validated in memory,
// leaving only the per-service specs. Re-running the chain starts from
// `npm run pre-process`, which regenerates the inputs deterministically.

import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

const args = process.argv.slice(2);
const getArg = (flag, dflt = null) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : dflt;
};

const providerName = getArg('--provider-name');
const inputDir = path.resolve(getArg('--input-dir', 'provider-dev/source'));
const outputDir = path.resolve(getArg('--output-dir', 'provider-dev/source'));
const serviceNamesPath = path.resolve(getArg('--service-names', 'provider-dev/config/service_names.json'));
const onlyServices = getArg('--services') ? getArg('--services').split(',') : null;
const overwrite = args.includes('--overwrite');
const verbose = args.includes('--verbose');

if (!providerName) {
  console.error('Error: --provider-name is required');
  console.error('Usage: node bin/split.mjs --provider-name snowflake [--input-dir DIR] [--output-dir DIR] [--service-names FILE] [--services LIST] [--overwrite] [--verbose]');
  process.exit(1);
}

const { services: serviceMap, excluded } = JSON.parse(fs.readFileSync(serviceNamesPath, 'utf8'));

const specFiles = fs.readdirSync(inputDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml')).sort();
if (specFiles.length === 0) {
  console.error(`Error: no specs found in ${inputDir} - run \`npm run pre-process\` first`);
  process.exit(1);
}

const errors = [];
const groups = new Map(); // service -> [{ file, doc }]

for (const file of specFiles) {
  const key = file.replace(/\.ya?ml$/, '');
  if (excluded && key in excluded) {
    if (verbose) console.log(`excluded: ${file} (${excluded[key]})`);
    continue;
  }
  const service = serviceMap[key];
  if (!service) {
    errors.push(`${file}: no service mapping in ${path.basename(serviceNamesPath)} (add it to "services" or "excluded" with a reason)`);
    continue;
  }
  if (onlyServices && !onlyServices.includes(service)) continue;
  if (!groups.has(service)) groups.set(service, []);
  groups.get(service).push({ file, doc: yaml.load(fs.readFileSync(path.join(inputDir, file), 'utf8')) });
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function titleCase(service) {
  return service.split(/[_-]/).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

const merged = new Map(); // service -> merged doc

for (const [service, members] of [...groups.entries()].sort()) {
  const doc = {
    openapi: members[0].doc.openapi,
    servers: members[0].doc.servers,
    info: {
      version: members[0].doc.info?.version || '0.0.1',
      title: `Snowflake ${titleCase(service)} API`,
      description: `The Snowflake REST API surface for the ${service} service, combining the vendor spec(s): ${members.map((m) => m.file).join(', ')}.`,
      contact: members[0].doc.info?.contact
    },
    paths: {},
    components: {}
  };

  for (const { file, doc: member } of members) {
    if (member.openapi !== doc.openapi) {
      errors.push(`${service}: openapi version mismatch in ${file} (${member.openapi} vs ${doc.openapi})`);
    }
    for (const [p, item] of Object.entries(member.paths || {})) {
      if (p in doc.paths) {
        errors.push(`${service}: duplicate path ${p} (from ${file})`);
        continue;
      }
      doc.paths[p] = item;
    }
    for (const [section, entries] of Object.entries(member.components || {})) {
      if (!doc.components[section]) doc.components[section] = {};
      for (const [name, value] of Object.entries(entries)) {
        if (name in doc.components[section]) {
          if (!deepEqual(doc.components[section][name], value)) {
            errors.push(`${service}: conflicting components.${section}.${name} between members (from ${file})`);
          }
        } else {
          doc.components[section][name] = value;
        }
      }
    }
    if (member.security && !doc.security) doc.security = member.security;
    for (const tag of member.tags || []) {
      doc.tags = doc.tags || [];
      if (!doc.tags.some((t) => t.name === tag.name)) doc.tags.push(tag);
    }
  }
  merged.set(service, doc);
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });
if (outputDir !== inputDir) {
  const existing = fs.readdirSync(outputDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
  if (existing.length > 0 && !overwrite) {
    console.error(`Error: ${outputDir} is not empty - use --overwrite`);
    process.exit(1);
  }
  for (const f of existing) fs.rmSync(path.join(outputDir, f));
} else {
  // in-place regroup: remove the consumed member specs
  for (const members of groups.values()) {
    for (const { file } of members) fs.rmSync(path.join(inputDir, file));
  }
}

for (const [service, doc] of [...merged.entries()].sort()) {
  const outPath = path.join(outputDir, `${service}.yaml`);
  fs.writeFileSync(outPath, yaml.dump(doc, { lineWidth: -1, noRefs: true }), 'utf8');
  console.log(`  ${service}.yaml <- ${groups.get(service).map((m) => m.file).join(', ')}`);
}
console.log(`Split completed: ${merged.size} service spec(s) written to ${outputDir}`);
