#!/usr/bin/env node
// audit-crossrefs.mjs — finds cards that point at other cards.
// Usage: node tools/audit-crossrefs.mjs
//
// The rule (REVIEW_PROCESS.md): bridges and traps must stand alone. A subscriber sees ONE
// card and cannot look up anything it references. Pattern-matching "see also" and "compare"
// is not enough — a bare mention of another entry's expression breaks the rule just as badly
// and reads as ordinary prose. This checks every shipping field against every OTHER entry's
// headwords, which is the only version that actually enforces it.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

const norm = (s) =>
  (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

const bank = fs.readdirSync(path.join(ROOT, 'bank'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'bank', f), 'utf8')));

// Short headwords match by accident (ojalá, magari, idem, dai). Only flag phrases long
// enough that a co-occurrence is almost certainly a deliberate reference.
const MIN_WORDS = 3;

const heads = [];
for (const e of bank) {
  for (const side of ['es', 'it']) {
    const t = norm(e[side].text);
    if (t.split(' ').length >= MIN_WORDS) heads.push({ id: e.id, side, text: e[side].text, n: t });
  }
}

const FIELDS = (e) => ({
  'bridge.note': e.bridge.note,
  'interference.es_to_it': e.bridge.interference?.es_to_it,
  'interference.it_to_es': e.bridge.interference?.it_to_es,
  cue: e.cue,
  'es.meaning': e.es.meaning,
  'it.meaning': e.it.meaning,
});

const hits = [];
for (const e of bank) {
  for (const [field, val] of Object.entries(FIELDS(e))) {
    if (!val) continue;
    const nv = norm(val);
    for (const h of heads) {
      if (h.id === e.id) continue;           // its own headword is fine
      if (!nv.includes(h.n)) continue;
      // the entry's own two sides often share vocabulary with a neighbour — skip when the
      // match is actually this entry's own other side
      if (norm(e.es.text) === h.n || norm(e.it.text) === h.n) continue;
      hits.push({ id: e.id, field, ref: h.id, refText: h.text, snippet: excerpt(val, h.text) });
    }
  }
}

function excerpt(val, phrase) {
  const i = norm(val).indexOf(norm(phrase));
  if (i < 0) return val.slice(0, 120);
  // map roughly back onto the original string
  const approx = Math.max(0, Math.round((i / norm(val).length) * val.length) - 45);
  return '…' + val.slice(approx, approx + 150).trim() + '…';
}

if (!hits.length) {
  console.log('CLEAN — no entry names another entry\'s expression in a shipping field.');
} else {
  console.log(`${hits.length} cross-reference(s) in ${new Set(hits.map((h) => h.id)).size} entries:\n`);
  for (const h of hits) {
    console.log(`${h.id}  ${h.field}`);
    console.log(`   → names ${h.ref} ("${h.refText}")`);
    console.log(`   ${h.snippet}\n`);
  }
  process.exitCode = 1;
}
