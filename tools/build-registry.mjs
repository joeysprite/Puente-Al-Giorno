#!/usr/bin/env node
// build-registry.mjs — one row per EXPRESSION (not per pairing).
// Usage: node tools/build-registry.mjs
//
// Why this exists: an expression can legitimately map to more than one partner,
// and some expressions have no partner at all. A pairing-keyed file (CANDIDATES.md)
// can't represent either fact cleanly — the same expression shows up in several
// rows with no way to tell it's the same one, and "no partner exists" looks
// identical to "we haven't looked yet". This keys on the expression itself.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'REGISTRY.md');

const norm = (s) =>
  (s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ').trim();

const guessLang = (s) => {
  const t = norm(s);
  const it = /\b(essere|avere|fare|andare|dare|prendere|mettere|non|che|del|della|il|lo|gli|una|un|nel|sul|dal|quel|come|piu|cosa|due|gamba|mano|faccia|piedi|occhi|acqua|pane|verde|lupo|lupi|mosca|gatto)\b/;
  const es = /\b(estar|ser|tener|hacer|dar|poner|echar|meter|no|que|del|la|los|las|el|un|una|en|por|para|como|mas|cosa|dos|mano|cara|pie|ojos|agua|pan|verde|lobo|mosca|gato|quien|donde)\b/;
  const itHits = (t.match(it) || []).length;
  const esHits = (t.match(es) || []).length;
  if (/[àèìòù]/.test(s)) return 'it';
  if (/[ñáéíóúü¿¡]/.test(s)) return 'es';
  if (itHits > esHits) return 'it';
  if (esHits > itHits) return 'es';
  return '?';
};

// ---- bank ----
const bank = fs.readdirSync(path.join(ROOT, 'bank'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'bank', f), 'utf8')));

const reg = new Map(); // key: norm(text) -> record

function add(text, lang, rec) {
  const k = norm(text);
  if (!k) return;
  if (!reg.has(k)) {
    reg.set(k, { text, lang, partners: [], status: null, sources: [], notes: [] });
  }
  const e = reg.get(k);
  if (rec.partner && norm(String(rec.partner).replace(/\s*\(\d+\)\s*$/, '')) !== k) e.partners.push(rec.partner);
  if (rec.status && (!e.status || rec.status === 'banked')) e.status = rec.status;
  if (rec.source && !e.sources.includes(rec.source)) e.sources.push(rec.source);
  if (rec.note) e.notes.push(rec.note);
}

for (const b of bank) {
  const st = b.review.status === 'retired' ? 'retired' : 'banked';
  add(b.es.text, 'es', { partner: `${b.it.text} (${b.id})`, status: st, source: `bank/${b.id}` });
  add(b.it.text, 'it', { partner: `${b.es.text} (${b.id})`, status: st, source: `bank/${b.id}` });
}

// ---- candidates ----
const cand = fs.readFileSync(path.join(ROOT, 'CANDIDATES.md'), 'utf8').split('\n');
let section = null;
const NO_PARTNER = /^\(no |^—$|unresolved|no ES twin|no IT twin|no fixed|no obvious|no match/i;

for (const ln of cand) {
  const h = ln.match(/^#{2,3}\s+(.+?)\s*(\(\d+.*\))?$/);
  if (h) { section = h[1].trim(); continue; }
  const s = ln.trim();
  if (!s.startsWith('|') || /^\|\s*[-: ]+\|/.test(s)) continue;
  const c = s.split('|').slice(1, -1).map((x) => x.trim());
  if (c.length < 5 || !/^\d+$/.test(c[0])) continue;

  const [, a, b, src, note] = c;
  const unmatched = NO_PARTNER.test(b);
  const st = section && /^Rejected/i.test(section) ? 'rejected'
           : unmatched ? 'no-partner-found'
           : 'candidate';

  const la = guessLang(a);
  add(a, la, { partner: unmatched ? null : b, status: st, source: src, note: `${section}: ${note.slice(0, 120)}` });
  if (!unmatched) {
    add(b, la === 'es' ? 'it' : la === 'it' ? 'es' : '?', { partner: a, status: st, source: src });
  }
}

// ---- emit ----
const rows = [...reg.values()].sort((x, y) => {
  const rank = { banked: 0, candidate: 1, 'no-partner-found': 2, retired: 3, rejected: 4 };
  return (rank[x.status] ?? 9) - (rank[y.status] ?? 9) || x.text.localeCompare(y.text);
});

const counts = {};
for (const r of rows) counts[r.status] = (counts[r.status] || 0) + 1;

const dedupe = (ps) => {
  const seen = new Map();
  for (const p of ps) {
    const bare = norm(String(p).replace(/\s*\(\d+\)\s*$/, ''));
    if (!seen.has(bare) || /\(\d+\)$/.test(p)) seen.set(bare, p);
  }
  return [...seen.values()];
};
for (const r of rows) r.partners = dedupe(r.partners);
const multi = rows.filter((r) => r.partners.length > 1);
const orphans = rows.filter((r) => r.status === 'no-partner-found');

const L = [];
L.push('# Expression registry — master list');
L.push('');
L.push(`**Generated** ${new Date().toISOString().split('T')[0]} by \`tools/build-registry.mjs\`. Do not hand-edit.`);
L.push('');
L.push('One row per **expression**, not per pairing. CANDIDATES.md answers "what pairings are');
L.push('we considering"; this answers "what expressions do we know about, and what has each one');
L.push('been matched to". Two things only this view makes visible:');
L.push('');
L.push('- an expression mapped to **more than one** partner (legitimate per the 2026-07-24 policy,');
L.push('  currently blocked by the validator)');
L.push('- an expression with **no partner found**, distinguished from one nobody has looked at yet');
L.push('');
L.push('| Status | Count |');
L.push('|---|---|');
for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) L.push(`| ${k} | ${v} |`);
L.push(`| **total expressions** | **${rows.length}** |`);
L.push('');
L.push('---');
L.push('');
L.push(`## Mapped to more than one partner (${multi.length})`);
L.push('');
L.push('Not errors. Each needs a decision: pick one, or bank both once the multiple-pairings');
L.push('policy is switched on.');
L.push('');
L.push('| Expression | Lang | Partners |');
L.push('|---|---|---|');
for (const r of multi) L.push(`| ${r.text} | ${r.lang} | ${r.partners.join(' · ')} |`);
L.push('');
L.push(`## No partner found (${orphans.length})`);
L.push('');
L.push('Searched, nothing found — as opposed to not yet looked at. Stop re-researching these');
L.push('unless there is a new reason to.');
L.push('');
L.push('| Expression | Lang | Source | Context |');
L.push('|---|---|---|---|');
for (const r of orphans) L.push(`| ${r.text} | ${r.lang} | ${r.sources.join(', ')} | ${(r.notes[0] || '').slice(0, 100)} |`);
L.push('');
L.push('---');
L.push('');
L.push(`## Full registry (${rows.length})`);
L.push('');
L.push('| Expression | Lang | Status | Partner(s) | Source |');
L.push('|---|---|---|---|---|');
for (const r of rows) {
  L.push(`| ${r.text} | ${r.lang} | ${r.status} | ${r.partners.join(' · ') || '—'} | ${r.sources.join(', ')} |`);
}

fs.writeFileSync(OUT, L.join('\n') + '\n');
console.log(`Wrote REGISTRY.md — ${rows.length} expressions, ${multi.length} multi-mapped, ${orphans.length} with no partner found.`);
