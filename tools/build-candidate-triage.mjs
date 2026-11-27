#!/usr/bin/env node
/**
 * Build a candidate-triage list for the native reviewers.
 *
 *   node tools/build-candidate-triage.mjs
 *
 * NOT a review list, and the difference matters. The reviewer worklists carry
 * bank entries: both halves sourced, a bridge, authored examples, register and
 * region tags — everything the four gates sign. A candidate is a row in
 * CANDIDATES.md: an expression, a sketched partner, and my assessment. There
 * is no object to approve, so nothing returned here can raise the approved
 * count, and the file says so to the reviewer in those words.
 *
 * What it buys is drafting speed and safety. A sketched partner is my guess
 * until a native says otherwise, and 0320 is what that costs when it is wrong:
 * the candidate row gave the Spanish as 'descubrir el polvorín', which does
 * not verify, and the error was only caught mid-draft. Asking first turns that
 * from rework into a one-line answer.
 *
 * Reads the "Ready — Stage 1 drafting can start now" section and drops rows
 * already drafted, which are marked in place.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const txt = readFileSync(join(ROOT, "CANDIDATES.md"), "utf8");

const head = /^## (Ready — Stage 1 drafting can start now[^\n]*)$/m.exec(txt);
if (!head) {
  console.error("No 'Ready — Stage 1' section in CANDIDATES.md.");
  process.exit(1);
}
const after = txt.slice(head.index + head[0].length);
const end = /^## /m.exec(after);
const section = after.slice(0, end ? end.index : undefined);

const rows = [];
for (const line of section.split("\n")) {
  if (!line.startsWith("|")) continue;
  const c = line.trim().replace(/^\||\|$/g, "").split("|").map((x) => x.trim());
  if (!c.length || /^[-: ]*$/.test(c.join("")) || c[0] === "#") continue;
  rows.push({ n: c[0], a: c[1] ?? "", b: c[2] ?? "", src: c[3] ?? "", note: c[4] ?? "" });
}
// Two filters, because one is not enough. The DRAFTED marker is written into
// CANDIDATES.md by hand and goes stale the moment a drafting round finishes
// without the file being updated — after 2026-11-24 it had missed five rows
// that were already entries. So also match every row against the bank's own
// expression texts, which cannot drift.
const norm = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
const BANKED = new Map();
for (const f of readdirSync(join(ROOT, "bank")).filter((x) => /^\d+\.json$/.test(x))) {
  const e = JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8"));
  for (const t of [e.es.text, e.it.text]) BANKED.set(norm(t), `${e.id} (${e.review.status})`);
}
const banked = (r) =>
  [r.a, r.b].flatMap((x) => x.split(/\s*\/\s*/)).map(norm)
    .filter((k) => k.length >= 6).map((k) => BANKED.get(k)).find(Boolean);

const already = [];
const todo = rows.filter((r) => {
  if (/DRAFTED/.test(r.b + r.note)) return false;
  const hit = banked(r);
  if (hit) { already.push(`${r.a} → ${hit}`); return false; }
  return true;
});

// Which half is Spanish and which Italian. The columns are not consistently
// ordered — the source decides, and the source column usually says. Where it
// does not, fall back to orthography that only one language has. Anything
// still unresolved is shown unlabelled rather than guessed, because a wrong
// label sends the question to the wrong person.
const IT_ONLY = /\b(gli|degli|nella?|nelle|sulla|dalla|della|delle|essere|avere|fare|non|che|più|perché|qualcuno|propri[ao])\b|cc|zz|gli/;
const ES_ONLY = /\b(el|los|las|una?|del|por|para|ser|estar|tener|hacer|más|qué|alguien|propi[ao]s?)\b|ñ|¿|¡/;
function split(r) {
  const s = r.src.toLowerCase();
  if (/^es\b|spanish|idioms book/.test(s)) return { es: r.a, it: r.b };
  if (/^it\b|italian|europass/.test(s)) return { it: r.a, es: r.b };
  const score = (t) => (ES_ONLY.test(t) ? 1 : 0) - (IT_ONLY.test(t) ? 1 : 0);
  const d = score(r.a) - score(r.b);
  if (d > 0) return { es: r.a, it: r.b };
  if (d < 0) return { it: r.a, es: r.b };
  return { es: null, it: null, a: r.a, b: r.b };
}

const clean = (s) =>
  s.replace(/⚑/g, "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`/g, "").trim();

let unresolved = 0;
function fileFor(lang) {
  const other = lang === "es" ? "it" : "es";
  const L = lang === "es" ? "Spanish" : "Italian";
  const O = lang === "es" ? "Italian" : "Spanish";

  const items = todo.map((r, i) => {
    const s = split(r);
    const mine = s[lang];
    const theirs = s[other];
    if (!mine) unresolved++;
    const head = mine
      ? `### ${i + 1}. ${clean(mine)}`
      : `### ${i + 1}. ${clean(r.a)}  /  ${clean(r.b)}`;
    // The per-row ask is in the header; repeating it 59 times is noise. Use
    // the same field/checklist shapes the PDF renderer already knows.
    const body = mine
      ? [
          ``,
          `- **paired with:** ${clean(theirs) || "— nothing yet"}`,
          ``,
          `> reviewer: [ ] yes, use it  [ ] wrong or unnatural`,
        ]
      : [
          ``,
          `- **note:** I could not tell which half is ${L} — answer for whichever one is.`,
          ``,
          `> reviewer: [ ] yes, use it  [ ] wrong or unnatural`,
        ];
    return head + body.join("\n");
  });

  return `# ${L} — candidate pairings, not entries

**${todo.length} rows. These are NOT cards and nothing here can be approved.**
They are expressions I am about to turn into entries, and I would rather find
out now than after the work. Separate from the review packet — that one has the
finished entries.

### What I am asking

For each row: **is the ${L} expression real, current, and does it mean what the
pairing needs it to mean?** That is all. Not the example sentence, not the
register, not the regions — those do not exist yet.

The ${O} is shown so the pairing makes sense. Ignore it unless something looks
plainly wrong, in which case say so.

A one-word answer per row is a complete answer. If a ${L} expression is wrong
and you know the right one, that line is worth more than everything else in
this file.

Generated ${new Date().toISOString().slice(0, 10)}.

---

${items.join("\n\n")}
`;
}

mkdirSync(join(ROOT, "reviewers"), { recursive: true });
for (const lang of ["es", "it"]) {
  const p = join(ROOT, "reviewers", `CANDIDATES-${lang.toUpperCase()}.md`);
  writeFileSync(p, fileFor(lang));
  console.log(`${p} ← ${todo.length} candidate rows`);
}
console.log(
  `  ${rows.length} rows in the Ready section; ${rows.length - todo.length} already in the bank`
);
if (already.length) {
  console.log(`  ${already.length} caught by the bank check, not by a DRAFTED marker:`);
  for (const a of already) console.log(`    ${a}`);
}
if (unresolved) console.log(`  ${unresolved / 2} row(s) whose language split could not be called`);
