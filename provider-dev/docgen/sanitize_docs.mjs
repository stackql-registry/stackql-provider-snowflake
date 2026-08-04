#!/usr/bin/env node
// Post-generate docs sanitizer (mirrors the openai provider's
// provider-dev/docgen/sanitize_docs.mjs pattern).
//
// The doc generator emits every parameter and request-body property into the
// example SQL verbatim, which produces identifiers that do not parse:
//   - reserved words as bare columns: `database`, `schema`, `like`,
//     `recursive`, `stream` ("syntax error ... near '<word>'")
//   - hyphenated header wire names: `User-Agent`,
//     `X-Snowflake-Authorization-Token-Type`
// Each word in NEEDS_QUOTING was verified empirically against the local
// stackql binary (projection and WHERE positions) - every other identifier in
// the generated examples parses bare. All of them parse once double-quoted,
// so quote them in WHERE clauses, SET clauses and INSERT column lists.
//
// Link hygiene: the Snowflake specs embed absolute https://docs.snowflake.com
// links, which are fine as-is. Genuinely relative markdown links (which would
// 404 on the microsite) are counted and reported; none exist at the time of
// writing, so no rewrite rule is applied - the count is a regression tripwire.
//
// Idempotent (already-quoted identifiers no longer match) and re-runnable.
// Usage: node provider-dev/docgen/sanitize_docs.mjs [--docs-dir website/docs]

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const docsDirArg = args.indexOf('--docs-dir');
const docsDir = docsDirArg !== -1 ? args[docsDirArg + 1] : join(repoRoot, 'website', 'docs');

// identifiers that must be double-quoted to parse in a WHERE clause,
// SET clause or column list (verified against the stackql parser)
const NEEDS_QUOTING = [
  'database',
  'schema',
  'like',
  'recursive',
  'stream',
  'User-Agent',
  'X-Snowflake-Authorization-Token-Type',
];
const quoteAlt = NEEDS_QUOTING.map((s) => s.replace(/-/g, '\\-')).join('|');
// `WHERE ident = ...` / `AND ident = ...`
const WHERE_QUOTE = new RegExp(`^((?:WHERE|AND) )(${quoteAlt})( = )`, 'gm');
// `SET` clause line: `ident = ...` at start of line
const SET_QUOTE = new RegExp(`^(${quoteAlt})( = )`, 'gm');
// bare column-list / projection / RETURNING line: `ident,` or `ident`
const COLUMN_QUOTE = new RegExp(`^(${quoteAlt})(,?)$`, 'gm');

// genuinely relative markdown links (would 404 on the microsite); exclude
// site-internal navigation (/services/...) and site assets (/img/...)
const REL_LINK = /\]\((\/(?!services\/|img\/)[^)\s]*)\)/g;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (entry.endsWith('.md') || entry.endsWith('.mdx')) out.push(p);
  }
  return out;
}

function fixSqlBlocks(text, counters) {
  return text.replace(/```sql\n([\s\S]*?)```/g, (_whole, body) => {
    let out = body;
    out = out.replace(WHERE_QUOTE, (_m, pre, ident, post) => { counters.quoted++; return `${pre}"${ident}"${post}`; });
    out = out.replace(SET_QUOTE, (_m, ident, post) => { counters.quoted++; return `"${ident}"${post}`; });
    out = out.replace(COLUMN_QUOTE, (_m, ident, comma) => { counters.quoted++; return `"${ident}"${comma}`; });
    return '```sql\n' + out + '```';
  });
}

const files = walk(docsDir);
let filesTouched = 0;
const counters = { quoted: 0 };
const relLinks = [];

for (const file of files) {
  const before = readFileSync(file, 'utf8');
  const after = fixSqlBlocks(before, counters);
  for (const m of before.matchAll(REL_LINK)) relLinks.push(`${file}: ${m[1]}`);
  if (after !== before) {
    writeFileSync(file, after);
    filesTouched++;
  }
}

console.log(`SQL examples: quoted ${counters.quoted} identifier(s) that do not parse bare (${NEEDS_QUOTING.join(', ')}).`);
console.log(`Relative links found: ${relLinks.length}${relLinks.length ? ' - REVIEW REQUIRED:' : ''}`);
for (const l of relLinks) console.log(`  ${l}`);
console.log(`Touched ${filesTouched} of ${files.length} file(s) scanned.`);
