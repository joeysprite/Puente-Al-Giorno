#!/usr/bin/env node
// build-bank.mjs — regenerates BANK.md from bank/*.json
// Usage: node tools/build-bank.mjs
// Run this any time entries are added, approved, or edited. It is read-only
// with respect to bank/ — it only ever writes BANK.md.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BANK_DIR = path.join(ROOT, 'bank');
const OUT = path.join(ROOT, 'BANK.md');

const entries = fs
  .readdirSync(BANK_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(BANK_DIR, f), 'utf8')))
  .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));

const today = new Date().toISOString().split('T')[0];

const statusCounts = {};
for (const e of entries) {
  statusCounts[e.review.status] = (statusCounts[e.review.status] || 0) + 1;
}

// Flag approved entries whose own notes still contain an unresolved
// ask directed at a reviewer — a cheap, mechanical proxy for "was this
// actually read by a native speaker, or just stamped." Not proof either way,
// just a thing worth a human's attention.
const REVIEWER_FLAG_RE = /reviewer to (confirm|add|drop|check|verify)/i;
const flaggedApproved = entries.filter(
  (e) => e.review.status === 'approved' && REVIEWER_FLAG_RE.test(e.review.notes || '')
);

const rows = entries.map((e) => {
  const themes = (e.themes || []).join(', ') || '—';
  let status = e.review.status;
  if (status === 'approved') status = '✓ approved';
  if (flaggedApproved.includes(e)) status += ' ⚑';
  return `| ${e.id} | ${e.es.text} | ${e.it.text} | ${e.type} | ${e.cefr} | ${e.difficulty} | ${status} | ${themes} |`;
});

const lines = [];
lines.push('# Un puente al giorno — Bank');
lines.push('');
lines.push(
  `**Last updated:** ${today} | **Total entries:** ${entries.length} | **Approved:** ${statusCounts.approved || 0}`
);
lines.push('');
lines.push(
  '_Regenerate with \`node tools/build-bank.mjs\` any time the bank changes. This file is generated — edit bank/*.json, not this._'
);
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Summary');
lines.push('');
lines.push('| Status | Count |');
lines.push('|--------|-------|');
for (const [status, count] of Object.entries(statusCounts).sort((a, b) => b[1] - a[1])) {
  lines.push(`| ${status} | ${count} |`);
}
lines.push('');

if (flaggedApproved.length) {
  lines.push('---');
  lines.push('');
  lines.push(`## ⚑ ${flaggedApproved.length} approved entries with an unresolved reviewer note`);
  lines.push('');
  lines.push(
    'These are marked \`approved\` but their own \`review.notes\` field still contains language like ' +
      '"reviewer to confirm/add/drop/check/verify" — an open question that does not read as answered. ' +
      'This is a mechanical text match, not a judgment call; it may be stale wording that was never cleaned up ' +
      'after a real review. Worth a look before treating these as fully settled.'
  );
  lines.push('');
  for (const e of flaggedApproved) {
    lines.push(`- **${e.id}** (${e.es.text} ↔ ${e.it.text})`);
  }
  lines.push('');
}

lines.push('---');
lines.push('');
lines.push('## Full Bank Listing');
lines.push('');
lines.push('| ID | Spanish | Italian | Type | CEFR | Difficulty | Status | Themes |');
lines.push('|---|---|---|---|---|---|---|---|');
lines.push(...rows);
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Notes');
lines.push('');
lines.push('- ✓ indicates approved entries ready for scheduling');
lines.push('- ⚑ indicates an approved entry whose notes still contain unresolved reviewer language (see above)');
lines.push('- `needs_review` entries await native-speaker sign-off');
lines.push('- `draft` entries are complete but awaiting review workflow');
lines.push('- `retired` entries are archived');
lines.push('- CEFR levels: A2 (elementary), B1 (intermediate), B2 (upper-intermediate), C1+ (advanced)');
lines.push('- Difficulty: 1–4 scale, where 4 is the hardest');

fs.writeFileSync(OUT, lines.join('\n') + '\n');
console.log(`Wrote ${OUT} — ${entries.length} entries, ${statusCounts.approved || 0} approved, ${flaggedApproved.length} flagged.`);
