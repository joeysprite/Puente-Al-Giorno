#!/usr/bin/env node
// build-review-queue.mjs — orders the BANK by what needs Joe's attention first.
// Usage: node tools/build-review-queue.mjs
//
// BANK.md lists every entry by id. That is a catalogue, not a work queue. This orders
// the same entries by RISK (what could ship wrong) and then by BLOCKING (what is holding
// up the most downstream work), so the top of the file is always the next thing to do.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'REVIEW-QUEUE.md');
const TODAY = new Date().toISOString().split('T')[0];

const bank = fs.readdirSync(path.join(ROOT, 'bank'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, 'bank', f), 'utf8')));

// what is scheduled, and when
let sched = {};
try {
  const ov = JSON.parse(fs.readFileSync(path.join(ROOT, 'overrides.json'), 'utf8')).overrides;
  for (const [date, v] of Object.entries(ov)) sched[v.id] = date;
} catch {}

const notes = (e) => e.review?.notes || '';
const unverified = (e) =>
  [...(e.es.sources || []), ...(e.it.sources || [])].filter((s) => !s.verifiedBy).length;
const allSources = (e) => (e.es.sources || []).length + (e.it.sources || []).length;

// an approved entry whose notes still ask a reviewer something
const OPEN_Q = /reviewer to (confirm|add|drop|check|verify)/i;
// a claim the drafter flagged as load-bearing and unproven
const LOAD_BEARING = /(THIS DECIDES THE ENTRY|IS THE ENTRY AND IT IS UNVERIFIED|IS THE ENTRY|MINE AND UNVERIFIED|UNVERIFIED AND IS WHAT THE ENTRY RESTS ON|whole bridge rests|the entry has no bridge|MAY NOT BE A PAIR)/i;
// entries the drafter flagged as possibly not worth shipping at all
const WEAK = /(NO TRAP EXISTS|confidence-builder|HONEST WEIGHT ASSESSMENT|close to the floor)/i;
// editorial/appropriateness flags
const EDITORIAL = /(REGISTER FLAG|EDITORIAL FLAG|sexist|slur|should probably not ship|not ship a slur)/i;

function classify(e) {
  const n = notes(e);
  const st = e.review.status;
  const sd = sched[e.id];
  const upcoming = sd && sd >= TODAY;

  if (upcoming) return { band: 0, why: `SCHEDULED ${sd}` };
  if (st === 'approved' && OPEN_Q.test(n)) return { band: 1, why: 'approved, but its notes still ask a reviewer a question' };
  if (st === 'approved' && unverified(e) > 0) return { band: 1, why: 'approved with unverified sources' };
  if (EDITORIAL.test(n)) return { band: 2, why: 'flagged on register or appropriateness' };
  if (LOAD_BEARING.test(n)) return { band: 3, why: 'rests on a claim the drafter could not verify' };
  if (WEAK.test(n)) return { band: 4, why: 'drafter questioned whether it earns a slot' };
  if (st === 'needs_review') return { band: 5, why: 'drafted, awaiting review' };
  if (st === 'draft') return { band: 6, why: 'early draft' };
  return { band: 7, why: 'approved and clean' };
}

const BANDS = [
  ['0. Ships next — check before it goes out', 'Scheduled to post. Anything wrong here is public on the date shown.'],
  ['1. Approved but not actually finished', 'These can be scheduled TODAY, and the bank treats them as shippable. But each either still asks a reviewer a question in its own notes, or carries a source nobody opened. The status field says done; the entry does not agree.'],
  ['2. Editorial and register calls', 'Nothing linguistically wrong. The question is whether the bank wants to publish it — dated, vulgar, or built on an image that may not sit well with subscribers. These need a decision from you, not from a reviewer.'],
  ['3. Rests on an unverified claim', "Each of these was drafted around a specific contrast that the drafter flagged as their own and unconfirmed. If the reviewer says no, the entry doesn't get corrected — it collapses. Cheapest possible review: one question each."],
  ['4. May not earn a slot', 'Real, correct, and possibly not worth a subscriber\'s day. Trap-free twins and vocabulary pairs. Your call on whether the bank ships them at all.'],
  ['5. Drafted, awaiting review', 'Ordinary queue. Sources unverified and no native sign-off, but nothing specific is flagged as at risk.'],
  ['6. Early drafts', 'Not yet worked up.'],
  ['7. Nothing needed — approved and clean', 'No flags of any kind.'],
];

for (const e of bank) e._c = classify(e);
bank.sort((a, b) => a._c.band - b._c.band || a.id.localeCompare(b.id));

const L = [];
L.push('# Bank review queue');
L.push('');
L.push(`**Generated** ${TODAY} by \`tools/build-review-queue.mjs\`. Do not hand-edit.`);
L.push('');
L.push('BANK.md lists entries by id — a catalogue. This orders the same entries by **what');
L.push('needs your attention first**: risk of shipping something wrong, then whatever is');
L.push('blocking the most downstream work. Work top-down and stop whenever you like; the');
L.push('ordering means the value is front-loaded. Entries needing nothing are counted but');
L.push('not listed — this is a work queue, not a catalogue.');
L.push('');

const counts = {};
for (const e of bank) counts[e._c.band] = (counts[e._c.band] || 0) + 1;
L.push('| Band | Count |');
L.push('|---|---|');
for (let i = 0; i < BANDS.length; i++) if (counts[i]) L.push(`| ${BANDS[i][0]} | ${counts[i]} |`);
L.push(`| **total** | **${bank.length}** |`);
L.push('');

for (let i = 0; i < BANDS.length; i++) {
  const sel = bank.filter((e) => e._c.band === i);
  if (!sel.length) continue;
  // band 7 needs nothing from the reviewer — a count is the whole message.
  // Listing 70+ finished entries in a work queue is noise; BANK.md is the catalogue.
  if (i === 7) {
    L.push('---');
    L.push('');
    L.push(`## ${BANDS[7][0]}  (${sel.length})`);
    L.push('');
    L.push('Not listed. These carry no flags and need nothing from you — see BANK.md for the full catalogue. The count is here so the numbers still add up.');
    L.push('');
    continue;
  }
  L.push('---');
  L.push('');
  L.push(`## ${BANDS[i][0]}  (${sel.length})`);
  L.push('');
  L.push(BANDS[i][1]);
  L.push('');
  L.push('| ID | Pair | Status | Sources | What to decide |');
  L.push('|---|---|---|---|---|');
  for (const e of sel) {
    const src = allSources(e) ? `${allSources(e) - unverified(e)}/${allSources(e)} verified` : 'none';
    // pull the sharpest sentence out of the notes for the "what to decide" column
    let ask = '';
    const sentences = notes(e).split(/(?<=\.)\s+/);
    const hit = sentences.find((s) => /THIS DECIDES|IS THE ENTRY|REVIEWER:|REGISTER FLAG|EDITORIAL FLAG|reviewer to |HONEST WEIGHT|NO TRAP EXISTS/i.test(s));
    ask = (hit || sentences[0] || '').replace(/\s+/g, ' ').slice(0, 200);
    L.push(`| ${e.id} | ${e.es.text} ↔ ${e.it.text} | ${e.review.status} | ${src} | ${ask} |`);
  }
  L.push('');
}

fs.writeFileSync(OUT, L.join('\n') + '\n');
console.log(`Wrote REVIEW-QUEUE.md — ${bank.length} entries. Bands: ${Object.entries(counts).map(([k, v]) => `${k}:${v}`).join(' ')}`);
