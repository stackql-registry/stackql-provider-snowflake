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
