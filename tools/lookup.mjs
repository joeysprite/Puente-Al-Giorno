#!/usr/bin/env node
// lookup.mjs — "is this already in the system?"
// Usage: node tools/lookup.mjs "dar la vuelta a la tortilla"
// Searches bank/, alternatives.json and CANDIDATES.md, accent- and case-insensitive.
// Scores by content-word overlap so partial phrasings still surface.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

const norm = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// function words that shouldn't drive a match on their own
const STOP = new Set(
  ('a al alla alle ai agli allo el la los las lo il le i gli un una uno el de del di da dei della delle in en con su sus se si que che y e o non no me te ci ne per por para the of to and it is be la el at as' )
    .split(' ')
);

const contentWords = (s) => norm(s).split(' ').filter((w) => w.length > 2 && !STOP.has(w));

function loadBank() {
  const dir = path.join(ROOT, 'bank');
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

function score(query, target) {
  const q = contentWords(query);
  const t = new Set(contentWords(target));
  if (!q.length) return 0;
  const hits = q.filter((w) => t.has(w)).length;
  const exact = norm(query) === norm(target) ? 1 : 0;
  return exact ? 1 : hits / q.length;
}

const query = process.argv.slice(2).join(' ');
if (!query) {
  console.error('usage: node tools/lookup.mjs "<expression>"');
  process.exit(1);
}

const results = [];

// --- bank ---
for (const e of loadBank()) {
  for (const side of ['es', 'it']) {
    const s = score(query, e[side].text);
    if (s >= 0.5) {
      results.push({
        where: 'BANK',
        s,
        line: `${e.id} [${e.review.status}] ${side}: ${e[side].text}  ↔  ${e[side === 'es' ? 'it' : 'es'].text}`,
        detail: e.bridge?.note || '',
      });
    }
  }
  // also catch it in meaning/literal, weaker
  for (const side of ['es', 'it']) {
    const s = score(query, `${e[side].literal} ${e[side].meaning}`);
    if (s >= 0.8) {
      results.push({
        where: 'BANK~gloss',
        s: s * 0.6,
        line: `${e.id} [${e.review.status}] ${e.es.text} ↔ ${e.it.text}`,
        detail: `(matched on ${side} gloss: ${e[side].meaning})`,
      });
    }
  }
}

// --- alternatives ---
const alts = JSON.parse(fs.readFileSync(path.join(ROOT, 'alternatives.json'), 'utf8')).alternatives;
for (const a of alts) {
  const s = score(query, a.alt.text);
  if (s >= 0.5) {
    results.push({
      where: 'ALT',
      s,
      line: `${a.id} [${a.status}] anchor ${a.anchor}, keep ${a.keepSide}: ${a.alt.text}`,
      detail: a.bridge,
    });
  }
}

// --- candidates ---
const cand = fs.readFileSync(path.join(ROOT, 'CANDIDATES.md'), 'utf8').split('\n');
cand.forEach((ln, i) => {
  if (!ln.trim().startsWith('|')) return;
  const s = score(query, ln);
  if (s >= 0.5) {
    results.push({ where: 'CAND', s, line: `L${i + 1}: ${ln.trim()}`, detail: '' });
  }
});

results.sort((a, b) => b.s - a.s);

if (!results.length) {
  console.log(`NO MATCH for "${query}" — clear to draft.`);
} else {
  const seen = new Set();
  for (const r of results) {
    const key = r.where + r.line;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`[${r.where} ${(r.s * 100).toFixed(0)}%] ${r.line}`);
    if (r.detail) console.log(`        ${r.detail.slice(0, 180)}`);
  }
}
