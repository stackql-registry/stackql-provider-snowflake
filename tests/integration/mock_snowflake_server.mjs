#!/usr/bin/env node

// Mock Snowflake REST server for integration-testing the generated snowflake
// provider without an account. Serves canned JSON in the exact wire shapes the
// real API produces (control-plane list endpoints return BARE JSON ARRAYS,
// single-object GETs return the object, create/PUT/DELETE return
// {"status": "Request successfully completed"}, SQL API statement submission
// returns a ResultSet with partitionInfo), and maintains mutable in-memory
// stores so INSERT / REPLACE / DELETE round-trip realistically.
//
// Every request must carry `Authorization: Bearer <EXPECTED_TOKEN>` or it is
// rejected 401 - this proves the provider's bearer/SNOWFLAKE_PAT auth wiring.
//
// List endpoints honour the Snowflake showLimit / fromName window contract
// and return the full set in one response otherwise - mirroring live
// behaviour, which does NOT emit Link headers despite the vendor specs
// declaring them (verified against a real account; see NOTES.md).
//
// Exports startMockServer() for the test runner; also runnable standalone:
//   node tests/integration/mock_snowflake_server.mjs [port]

import http from 'http';
import { URL } from 'url';

export const EXPECTED_TOKEN = 'dummy-token';
export const STATEMENT_HANDLE = 'e4ce975e-f7ff-4b5e-b15e-bf25f59371ae';

// SQL API result fixture: 4 rows split across 2 partitions
export const RESULT_PARTITIONS = [
  [['1', 'customer1'], ['2', 'customer2']],
  [['3', 'customer3'], ['4', 'customer4']]
];

const SUCCESS = { status: 'Request successfully completed' };

function dbObj(name, comment = '') {
  return {
    created_on: '2026-01-01T00:00:00.000000Z',
    name,
    kind: 'PERMANENT',
    is_default: false,
    is_current: false,
    origin: '',
    owner: 'ACCOUNTADMIN',
    comment,
    options: '',
    retention_time: 1,
    dropped_on: null,
    budget: '',
    owner_role_type: 'ROLE',
    data_retention_time_in_days: 1,
    max_data_extension_time_in_days: 14
  };
}

function grantObj({ privileges, grantee_type, grantee_name, securable_type, securable_name }) {
  return {
    privileges,
    grant_option: false,
    created_on: '2026-01-01T00:00:00.000000Z',
    grantee_type,
    grantee_name,
    securable_type,
    securable_name,
    granted_by_role_type: 'ROLE',
    granted_by_name: 'ACCOUNTADMIN'
  };
}

function whObj(name) {
  return {
    name,
    warehouse_size: 'XSMALL',
    auto_suspend: 60,
    auto_resume: 'true',
    state: 'SUSPENDED',
    type: 'STANDARD',
    comment: 'mock warehouse',
    created_on: '2026-01-01T00:00:00.000000Z',
    owner: 'ACCOUNTADMIN',
    owner_role_type: 'ROLE'
  };
}

function resultSet(partitionData) {
  return {
    code: '090001',
    sqlState: '00000',
    message: 'Statement executed successfully.',
    statementHandle: STATEMENT_HANDLE,
    createdOn: 1754265600000,
    statementStatusUrl: `/api/v2/statements/${STATEMENT_HANDLE}`,
    resultSetMetaData: {
      numRows: 4,
      format: 'jsonv2',
      rowType: [
        { name: 'ID', type: 'FIXED', length: 0, precision: 38, scale: 0, nullable: false },
        { name: 'NAME', type: 'TEXT', length: 16777216, precision: 0, scale: 0, nullable: true }
      ],
      partitionInfo: [
        { rowCount: 2, uncompressedSize: 128 },
        { rowCount: 2, uncompressedSize: 141 }
      ]
    },
    data: partitionData
  };
}

function makeState() {
  const databases = new Map();
  for (const n of ['DB1', 'DB2', 'DB3', 'DB4', 'DB5']) databases.set(n, dbObj(n, `seed database ${n}`));
  // grants: key `${granteeType}/${granteeName}` -> array of grant objects
  const grants = new Map([
    ['role/SYSADMIN', [grantObj({
      privileges: ['CREATE DATABASE'],
      grantee_type: 'ROLE', grantee_name: 'SYSADMIN',
      securable_type: 'ACCOUNT', securable_name: 'MOCK_ACCOUNT'
    })]]
  ]);
  const warehouses = new Map([['WH1', whObj('WH1')]]);
  const statements = new Map(); // handle -> true (submitted)
  return { databases, grants, warehouses, statements, authFailures: 0 };
}

function send(res, code, body, headers = {}) {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(code, { 'Content-Type': 'application/json', ...headers });
  res.end(payload);
}

function errorResponse(res, code, message) {
  send(res, code, { message, code: String(code), request_id: 'mock-request-id' });
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => { data += c; });
    req.on('end', () => {
      try { resolve(JSON.parse(data)); } catch { resolve({ _raw: data }); }
    });
  });
}

// Snowflake SHOW-style windowing, mirroring live behaviour (verified against
// a real account): the full result set comes back in one response unless the
// client windows it with fromName (start at the first row whose name sorts
// >= fromName) and/or showLimit (page cap); no Link header is emitted.
function windowByName(items, url) {
  const sorted = [...items].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const showLimit = parseInt(url.searchParams.get('showLimit') || '0', 10);
  const fromName = url.searchParams.get('fromName');
  let start = 0;
  if (fromName) {
    const i = sorted.findIndex((x) => x.name >= fromName);
    start = i === -1 ? sorted.length : i;
  }
  const page = showLimit > 0 ? sorted.slice(start, start + showLimit) : sorted.slice(start);
  return { page };
}

async function handle(req, res, state, log, ctx) {
  const url = new URL(req.url, 'http://localhost');
  const p = decodeURIComponent(url.pathname);
  const m = req.method;
  const entry = {
    method: m,
    path: p,
    query: Object.fromEntries(url.searchParams),
    body: null,
    headers: {
      authorization: req.headers['authorization'] || '',
      'user-agent': req.headers['user-agent'] || ''
    }
  };
  if (m === 'POST' || m === 'PUT') entry.body = await readBody(req);
  log.push(entry);

  if (req.headers['authorization'] !== `Bearer ${EXPECTED_TOKEN}`) {
    state.authFailures += 1;
    return errorResponse(res, 401, 'Invalid or missing bearer token.');
  }

  let match;

  // --- databases collection: bare JSON array, full set in one response
  // (live behaviour - no Link header), windowed only by explicit
  // fromName/showLimit params
  if (p === '/api/v2/databases' && m === 'GET') {
    const { page } = windowByName([...state.databases.values()], url);
    return send(res, 200, page);
  }
  if (p === '/api/v2/databases' && m === 'POST') {
    const b = entry.body || {};
    if (!b.name) return errorResponse(res, 400, 'name is required');
    state.databases.set(b.name, { ...dbObj(b.name, b.comment || ''), ...(b.kind ? { kind: b.kind } : {}) });
    return send(res, 200, SUCCESS);
  }

  // --- databases single object (colon excluded so :clone etc do not match)
  if ((match = p.match(/^\/api\/v2\/databases\/([^/:]+)$/))) {
    const name = match[1];
    if (m === 'GET') {
      const db = state.databases.get(name);
      return db ? send(res, 200, db) : errorResponse(res, 404, `Database '${name}' does not exist.`);
    }
    if (m === 'PUT') { // create-or-alter (REPLACE verb)
      const b = entry.body || {};
      state.databases.set(name, { ...dbObj(name, b.comment || ''), ...(b.kind ? { kind: b.kind } : {}) });
      return send(res, 200, SUCCESS);
    }
    if (m === 'DELETE') {
      if (!state.databases.has(name)) return errorResponse(res, 404, `Database '${name}' does not exist.`);
      state.databases.delete(name);
      return send(res, 200, SUCCESS);
    }
  }

  // --- grants: grant privileges (POST .../privileges)
  if ((match = p.match(/^\/api\/v2\/grants\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)\/privileges$/)) && m === 'POST') {
    const [, granteeType, granteeName, securableType, securableName] = match;
    const b = entry.body || {};
    const privileges = Array.isArray(b.privileges) ? b.privileges : (b.privileges ? [b.privileges] : []);
    if (!privileges.length) return errorResponse(res, 400, 'privileges is required');
    const key = `${granteeType}/${granteeName}`;
    if (!state.grants.has(key)) state.grants.set(key, []);
    state.grants.get(key).push(grantObj({
      privileges,
      grantee_type: granteeType.toUpperCase(),
      grantee_name: granteeName,
      securable_type: securableType.toUpperCase(),
      securable_name: securableName
    }));
    return send(res, 200, SUCCESS);
  }

  // --- grants: revoke a privilege (DELETE .../privileges/{privilege})
  if ((match = p.match(/^\/api\/v2\/grants\/([^/]+)\/([^/]+)\/([^/]+)\/([^/]+)\/privileges\/([^/]+)$/)) && m === 'DELETE') {
    const [, granteeType, granteeName, securableType, securableName, privilege] = match;
    const key = `${granteeType}/${granteeName}`;
    const list = state.grants.get(key) || [];
    let found = false;
    const kept = [];
    for (const g of list) {
      if (g.securable_type === securableType.toUpperCase() && g.securable_name === securableName && g.privileges.includes(privilege)) {
        found = true;
        const remaining = g.privileges.filter((x) => x !== privilege);
        if (remaining.length) kept.push({ ...g, privileges: remaining });
      } else {
        kept.push(g);
      }
    }
    if (!found) return errorResponse(res, 404, `Grant of '${privilege}' not found.`);
    state.grants.set(key, kept);
    return send(res, 200, SUCCESS);
  }

  // --- grants: list grants to grantee (bare JSON array)
  if ((match = p.match(/^\/api\/v2\/grants\/([^/]+)\/([^/]+)$/)) && m === 'GET') {
    const key = `${match[1]}/${match[2]}`;
    const { page } = windowByName(
      (state.grants.get(key) || []).map((g, i) => ({ name: `g${i}`, ...g })),
      url
    );
    return send(res, 200, page.map(({ name, ...g }) => g));
  }

  // --- warehouse action: resume (EXEC)
  if ((match = p.match(/^\/api\/v2\/warehouses\/([^/:]+):resume$/)) && m === 'POST') {
    const wh = state.warehouses.get(match[1]);
    if (!wh) return errorResponse(res, 404, `Warehouse '${match[1]}' does not exist.`);
    wh.state = 'STARTED';
    return send(res, 200, SUCCESS);
  }

  // --- Cortex: OpenAI-compatible chat completions (SELECT-over-POST)
  if (p === '/api/v2/cortex/v1/chat/completions' && m === 'POST') {
    const b = entry.body || {};
    if (!b.model || !b.messages) return errorResponse(res, 400, 'model and messages are required');
    return send(res, 200, {
      id: 'chatcmpl-mock', object: 'chat.completion', created: 1700000000, model: b.model,
      choices: [{ index: 0, message: { role: 'assistant', content: 'MOCK_COMPLETION' }, finish_reason: 'stop' }],
      usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12 }
    });
  }

  // --- SQL API: submit statement -> ResultSet (partition 0 inline)
  if (p === '/api/v2/statements' && m === 'POST') {
    const b = entry.body || {};
    if (!b.statement) return errorResponse(res, 400, 'statement is required');
    state.statements.set(STATEMENT_HANDLE, true);
    return send(res, 200, resultSet(RESULT_PARTITIONS[0]));
  }

  // --- SQL API: fetch result page for a submitted statement
  if ((match = p.match(/^\/api\/v2\/results\/([^/]+)$/)) && m === 'GET') {
    const handle = match[1];
    if (!state.statements.has(handle)) return errorResponse(res, 404, `Result handler '${handle}' not found.`);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const data = RESULT_PARTITIONS[page];
    if (!data) return errorResponse(res, 404, `Page ${page} out of range.`);
    return send(res, 200, resultSet(data));
  }

  errorResponse(res, 404, `no mock route for ${m} ${p}`);
}

export function startMockServer(port = 0) {
  const log = [];
  const state = makeState();
  const ctx = { port: 0 };
  const server = http.createServer((req, res) => {
    handle(req, res, state, log, ctx).catch((err) => send(res, 500, { message: err.message, code: '500' }));
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      ctx.port = server.address().port;
      resolve({ server, port: ctx.port, log, state });
    });
  });
}

// standalone mode
if (process.argv[1] && process.argv[1].endsWith('mock_snowflake_server.mjs')) {
  const { port } = await startMockServer(parseInt(process.argv[2] || '18443', 10));
  console.log(`mock Snowflake REST server listening on http://127.0.0.1:${port}`);
  console.log(`expects: Authorization: Bearer ${EXPECTED_TOKEN}`);
}
