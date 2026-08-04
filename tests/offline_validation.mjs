#!/usr/bin/env node

// Quick offline validation of the generated provider against the local file
// registry - no network, no server. Runs SHOW SERVICES / SHOW RESOURCES /
// SHOW METHODS and DESCRIBE EXTENDED over representative resources and
// asserts expected counts and mappings. Exit 1 on any failure.
//
// Usage: node tests/offline_validation.mjs
// Binary resolution: $STACKQL, ./stackql(.exe), then PATH.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const regPath = path.join(repoRoot, 'provider-dev', 'openapi').replace(/\\/g, '/');
const registry = JSON.stringify({
  url: `file://${regPath}`,
  localDocRoot: regPath,
  verifyConfig: { nopVerify: true }
});

function findBinary() {
  if (process.env.STACKQL && fs.existsSync(process.env.STACKQL)) return process.env.STACKQL;
  for (const name of ['stackql', 'stackql.exe']) {
    const local = path.join(repoRoot, name);
    if (fs.existsSync(local)) return local;
  }
  return 'stackql'; // PATH
}
const bin = findBinary();

function runSql(sql) {
  return new Promise((resolve) => {
    const child = spawn(bin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot });
    let stdout = '', stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      let rows = [];
      try { rows = JSON.parse(stdout) ?? []; } catch { rows = []; }
      resolve({ code, rows, stdout, stderr });
    });
    child.on('error', (err) => resolve({ code: -1, rows: [], stdout: '', stderr: String(err) }));
  });
}

const results = [];
function check(name, cond, note = '') {
  results.push({ name, pass: !!cond, note });
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  [${String(note).slice(0, 140)}]`}`);
}

const EXPECTED_SERVICES = [
  'account', 'apps', 'cortex', 'databases', 'functions', 'grants', 'integrations',
  'pipelines', 'roles', 'security', 'sqlapi', 'tables', 'warehouses'
];

let r = await runSql('SHOW SERVICES IN snowflake');
check('SHOW SERVICES returns 13 services', r.rows.length === 13, `got ${r.rows.length} ${r.stderr}`);
const names = r.rows.map((x) => x.name).sort();
check('service names match the expected split', JSON.stringify(names) === JSON.stringify(EXPECTED_SERVICES), names.join(','));

r = await runSql('SHOW RESOURCES IN snowflake.grants');
check('grants service has 4 resources', r.rows.length === 4, `got ${r.rows.length}`);

r = await runSql('SHOW METHODS IN snowflake.databases.databases');
const verbs = Object.fromEntries(r.rows.map((m) => [m.MethodName, m.SQLVerb]));
check('databases.list is SELECT', verbs.list === 'SELECT', JSON.stringify(verbs));
check('databases.create is INSERT', verbs.create === 'INSERT', JSON.stringify(verbs));
check('databases.create_or_alter is REPLACE', verbs.create_or_alter === 'REPLACE', JSON.stringify(verbs));
check('databases.delete is DELETE', verbs.delete === 'DELETE', JSON.stringify(verbs));

r = await runSql('SHOW METHODS IN snowflake.sqlapi.statements');
const sverbs = Object.fromEntries(r.rows.map((m) => [m.MethodName, m.SQLVerb]));
check('statements.submit_statement is INSERT', sverbs.submit_statement === 'INSERT', JSON.stringify(sverbs));
check('statements.get_statement_status is SELECT', sverbs.get_statement_status === 'SELECT', JSON.stringify(sverbs));
check('statements.cancel_statement is DELETE', sverbs.cancel_statement === 'DELETE', JSON.stringify(sverbs));

r = await runSql('DESCRIBE EXTENDED snowflake.databases.databases');
check('DESCRIBE databases has columns', r.rows.length > 10, `got ${r.rows.length}`);

r = await runSql('DESCRIBE EXTENDED snowflake.roles.role_grants');
check('DESCRIBE role_grants has columns', r.rows.length > 3, `got ${r.rows.length}`);

r = await runSql('DESCRIBE EXTENDED snowflake.sqlapi.results');
check('DESCRIBE sqlapi.results has columns (ResultSet binding)', r.rows.length > 3, `got ${r.rows.length}`);

r = await runSql('SHOW METHODS IN snowflake.cortex.chat_completions');
const cverbs = Object.fromEntries(r.rows.map((m) => [m.MethodName, m.SQLVerb]));
check('cortex chat_completions.create is SELECT (inference via SELECT-over-POST)', cverbs.create === 'SELECT', JSON.stringify(cverbs));

r = await runSql('DESCRIBE EXTENDED snowflake.cortex.chat_completions');
check('DESCRIBE cortex chat_completions has typed columns', r.rows.length > 4, `got ${r.rows.length}`);

r = await runSql('SHOW METHODS IN snowflake.warehouses.warehouses');
const wnames = r.rows.map((m) => m.MethodName);
check('warehouses has resume/suspend EXEC actions', wnames.includes('resume') && wnames.includes('suspend'), wnames.join(','));

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} offline validation checks passed`);
process.exit(failed.length ? 1 : 0);
