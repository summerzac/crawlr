// Dependency licence check (docs/SECURITY.md section 5, D-21).
// Reads package-lock.json, checks every production package (direct and transitive)
// against the allowlist, and exits 1 on any package outside it or with no licence.
// Zero dependencies on purpose: the lockfile (v3) records each package's licence.
// Run: node scripts/check-licenses.mjs

import { readFileSync } from 'node:fs';

// Owner-approved allowlist (D-21). The builder never widens it.
const ALLOWED = new Set([
  'MIT',
  'ISC',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'Apache-2.0',
  '0BSD',
  'CC0-1.0',
  'Unlicense',
  'BlueOak-1.0.0',
]);

// Owner-approved per-package exceptions: name -> reason. Empty until the owner rules
// (docs/DEPENDENCIES.md, "Licence check exceptions"). The builder never adds to this alone.
const EXCEPTIONS = new Map([]);

function licenceAllowed(expr) {
  if (typeof expr !== 'string' || expr.trim() === '') return false;
  const clean = expr.replace(/[()]/g, '').trim();
  if (clean.includes(' OR ')) return clean.split(' OR ').some((s) => ALLOWED.has(s.trim()));
  if (clean.includes(' AND ')) return clean.split(' AND ').every((s) => ALLOWED.has(s.trim()));
  return ALLOWED.has(clean);
}

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
if (lock.lockfileVersion !== 3) {
  console.error(`check-licenses: expected lockfileVersion 3, got ${lock.lockfileVersion}`);
  process.exit(1);
}

const failures = [];
let checked = 0;
for (const [path, entry] of Object.entries(lock.packages)) {
  if (path === '' || entry.dev) continue; // root package, or dev-only
  checked += 1;
  const name = path.slice(path.lastIndexOf('node_modules/') + 'node_modules/'.length);
  const licence = entry.license ?? '(none recorded)';
  if (EXCEPTIONS.has(name)) continue;
  if (!licenceAllowed(entry.license)) failures.push({ name, version: entry.version, licence });
}

if (failures.length > 0) {
  console.error(`check-licenses: ${failures.length} of ${checked} production packages outside the allowlist:`);
  for (const f of failures) console.error(`  ${f.name}@${f.version}  ${f.licence}`);
  process.exit(1);
}
console.log(`check-licenses: ${checked} production packages, all within the allowlist.`);
