#!/usr/bin/env node
/**
 * Build a Stage 2 source-verification worksheet.
 *
 *   node tools/build-verify-sheet.mjs
 *   node tools/build-verify-sheet.mjs --ids 0326,0327 --label "December slate"
 *
 * Stage 2 is the gate only `jf` can sign: a human opens the cited page and
 * confirms it supports the entry. It stalled at 0 of 486 citations because the
 * work was shaped as a hunt — open an entry, find its URL, remember what the
 * entry claimed, go look. This inverts that: one row per citation, grouped by
 * dictionary so the same site stays open, each row carrying the headword to
 * look up and the one claim the page has to support.
 *
 * Nothing here signs anything. Signing means writing verifiedBy/verifiedOn
 * into the entry JSON, which is a separate, deliberate act.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? null : process.argv[i + 1] ?? null;
};
const IDS = (arg("--ids") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
// --authority "RAE (DLE)": one sheet per dictionary. 93 RAE lookups and 89
// Treccani ones are two sittings with one site open each, not one sitting of
// 182 with constant context switching. Only jf can sign this gate, so the
// shape of the work decides whether it happens.
const AUTHORITY = arg("--authority");
const LABEL = arg("--label");

const bank = readdirSync(join(ROOT, "bank"))
  .filter((f) => /^\d+\.json$/.test(f))
  .map((f) => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")));

const byId = new Map(bank.map((e) => [e.id, e]));
const picked = IDS.length
  ? IDS.map((id) => byId.get(id)).filter(Boolean)
  : bank.filter((e) => e.review.status !== "retired");
const missing = IDS.filter((id) => !byId.has(id));
if (missing.length) console.error(`  WARN --ids: no such entry: ${missing.join(", ")}`);

// One row per UNVERIFIED citation. A verified one needs no worksheet line.
const rows = [];
for (const e of picked) {
  for (const lang of ["es", "it"]) {
    for (const [i, s] of (e[lang].sources ?? []).entries()) {
      if (s.verifiedBy) continue;
      if (AUTHORITY && s.authority !== AUTHORITY) continue;
      rows.push({
        id: e.id,
        lang,
        idx: i,
        authority: s.authority ?? "—",
        headword: s.headword ?? "—",
        url: s.url ?? "—",
        text: e[lang].text,
        // The claim the page must support. Not the whole entry — the page is
        // being asked one question, and naming it is what makes this quick.
        claim: e[lang].meaning,
        corpus: s.authority === "Corpus",
      });
    }
  }
}

// Group by authority so one site is opened once, not re-opened per entry.
const groups = {};
for (const r of rows) (groups[r.authority] ??= []).push(r);
const order = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);

const corpus = rows.filter((r) => r.corpus);

const out = `# Stage 2 — source verification worksheet${LABEL ? ` · ${LABEL}` : ""}

**${rows.length} citations across ${picked.length} entries.** Generated ${new Date().toISOString().slice(0, 10)}.

Only \`jf\` can sign this gate. Grouped by dictionary so you open each site once.

### What each row asks

Open the URL, look up the headword, and decide one thing: **does that page
support the claim in the Claim column?** Not whether the entry is good — the
reviewers judge that — just whether the citation holds.

- **holds** → tick it. When the sheet is done, the ticks go into the entry JSON
  as \`sources[n].verifiedBy: "jf"\` and \`verifiedOn: <date>\`.
- **page says something different** → write what it says. The entry gets
  corrected, not the citation.
- **headword isn't there** → write "absent". The citation gets replaced, and
  that is a finding, not a failure.

${corpus.length ? `### ⚑ ${corpus.length} of these cannot be ticked

Rows marked **CORPUS** cite a corpus or translation aggregator rather than a
dictionary. There is no authority page to confirm, so these need the citation
**replaced**, not verified. They are listed so they are not mistaken for work
still to do.

` : ""}---

${order
  .map((auth) => {
    const g = groups[auth];
    return `## ${auth} — ${g.length} citation${g.length === 1 ? "" : "s"}

| ✓ | id | lang | headword | claim the page must support | url |
|---|---|---|---|---|---|
${g
  .map(
    (r) =>
      `| [ ] | ${r.id} | ${r.lang} | **${r.headword}** | ${r.claim.replace(/\|/g, "\\|")} | ${r.corpus ? "**CORPUS — replace, do not tick**" : r.url} |`
  )
  .join("\n")}`;
  })
  .join("\n\n")}

---

## Entries in this sheet

| id | expression | status | citations here |
|---|---|---|---|
${picked
  .map((e) => {
    const n = rows.filter((r) => r.id === e.id).length;
    return `| ${e.id} | ${e.es.text} / ${e.it.text} | ${e.review.status} | ${n} |`;
  })
  .join("\n")}

**An entry is only approvable when both gates are signed:** these citations by
\`jf\`, and the naturalness of both halves by the two native reviewers. Finishing
this sheet alone approves nothing.
`;

mkdirSync(join(ROOT, "reviewers"), { recursive: true });
const slug = AUTHORITY
  ? "-" + AUTHORITY.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toUpperCase()
  : LABEL
  ? "-" + LABEL.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toUpperCase().slice(0, 24)
  : "";
const path = join(ROOT, "reviewers", `VERIFY${slug}.md`);
writeFileSync(path, out);
console.log(`${path} ← ${rows.length} citations across ${picked.length} entries`);
if (corpus.length) console.log(`  ${corpus.length} are Corpus-cited and need replacing, not ticking`);
