#!/usr/bin/env node

// Records the upstream sync point of specifications/ in
// provider-dev/config/spec_pin.json. The pin is the last commit that touched
// specifications/ (this repo is a fork of snowflakedb/snowflake-rest-api-specs,
// so that commit is the upstream content as of the most recent fork sync).
// Called standalone (npm script or directly) and by pre_process.mjs at every
// build so the pin always reflects the specs the build consumed.
//
// Usage: node provider-dev/scripts/record_spec_pin.mjs

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const pinPath = path.join(repoRoot, 'provider-dev', 'config', 'spec_pin.json');

export function recordSpecPin() {
  const git = (...gitArgs) =>
    execFileSync('git', ['-C', repoRoot, ...gitArgs], { encoding: 'utf8' }).trim();

  const commit = git('log', '-1', '--format=%H', '--', 'specifications');
  const commitDate = git('log', '-1', '--format=%cI', '--', 'specifications');
  const subject = git('log', '-1', '--format=%s', '--', 'specifications');
  if (!commit) {
    throw new Error('could not resolve the last commit touching specifications/');
  }

  const dirty = git('status', '--porcelain', '--', 'specifications');
  if (dirty) {
    throw new Error(`specifications/ has uncommitted changes - never hand-edit upstream content:\n${dirty}`);
  }

  const specCount = fs
    .readdirSync(path.join(repoRoot, 'specifications'))
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml')).length;

  const pin = {
    upstream_repo: 'https://github.com/snowflakedb/snowflake-rest-api-specs',
    synced_commit: commit,
    synced_commit_date: commitDate,
    synced_commit_subject: subject,
    spec_count: specCount,
    recorded_at: new Date().toISOString()
  };

  // keep re-runs idempotent: only refresh recorded_at when the pin changed
  if (fs.existsSync(pinPath)) {
    const existing = JSON.parse(fs.readFileSync(pinPath, 'utf8'));
    const { recorded_at: a, ...existingRest } = existing;
    const { recorded_at: b, ...pinRest } = pin;
    if (JSON.stringify(existingRest) === JSON.stringify(pinRest)) {
      return existing;
    }
  }

  fs.mkdirSync(path.dirname(pinPath), { recursive: true });
  fs.writeFileSync(pinPath, JSON.stringify(pin, null, 2) + '\n', 'utf8');
  return pin;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const pin = recordSpecPin();
  console.log(`spec pin recorded at ${pinPath}:`);
  console.log(JSON.stringify(pin, null, 2));
}
