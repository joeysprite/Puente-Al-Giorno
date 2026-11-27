#!/usr/bin/env node
/**
 * Build the per-language reviewer worklists FROM THE BANK.
 *
 *   node tools/build-review-lists.mjs          → reviewers/REVIEW-ES.md, reviewers/REVIEW-IT.md
 *   node tools/build-review-lists.mjs --check  → exit 1 if the files on disk are stale
 *
 * One file per language, because that is how the reviewers work: the Spanish
 * teacher never needs to see the Italian column. Derived, never hand-edited —
 * the bank is the source of truth and these are views of it. The --check mode
 * runs in CI so a bank edit that forgets to regenerate fails the build.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { readyForReviewer } from "./lib/classify.mjs";
import { questionFor } from "./lib/questions.mjs";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
// Alternatives point AT bank entries via `anchor`. The link was one-way, so a
// reviewer judging a pairing could not see that a different partner had been
// considered. Index them here and surface them on the anchored entry —
// computed at build time, never stored in the entry itself.
let ALTS_BY_ANCHOR = {};
try {
  const doc = JSON.parse(readFileSync(join(ROOT, "alternatives.json"), "utf8"));
  for (const a of doc.alternatives ?? []) (ALTS_BY_ANCHOR[a.anchor] ??= []).push(a);
} catch {}
// Dates whose slot is running filler until a named entry is approved. Parsed
// from the override reasons rather than hardcoded, so the packet stays true
// as the slate changes.
let DUE_BY = {};
try {
  const doc = JSON.parse(readFileSync(join(ROOT, "overrides.json"), "utf8"));
  for (const [date, o] of Object.entries(doc.overrides ?? {})) {
    const m = /swap to (\d{4}) once approved/i.exec(o.reason ?? "");
    if (m) (DUE_BY[m[1]] ??= []).push(date);
  }
} catch {}
// --simple: a stripped list for a reviewer who just needs to say "yes, we say
// that" — expression, literal, meaning, example. No sources, traps or notes.
const SIMPLE = process.argv.includes("--simple");
const CHECK = process.argv.includes("--check");
// --pending: only entries that still need Stage 3. Approved entries are done;
// sending them again wastes the reviewer's pass and buries the real work.
const PENDING = process.argv.includes("--pending");
// --ready: the cohort a native reviewer can act on today. Drops entries held
// for an editorial call, ones whose own notes question whether they earn a
// slot, early drafts, and anything cited to a corpus rather than a dictionary.
const READY = process.argv.includes("--ready");
// --clean: ONLY the no-questions cohort — entries carrying no region claim and
// no unanswered question, so the reviewer needs nothing from the editor first.
// This is the packet that can go out without a covering question sheet.
const CLEAN = process.argv.includes("--clean");
// --full: EVERY unapproved entry, with the question for this reviewer lifted
// out of review.notes. The other stripped modes hide notes wholesale, which
// also hides the questions an entry's approval depends on — so an entry could
// sit unapproved forever with nobody ever having been asked. Sectioned by what
// the reviewer has to do, dated slots first.
const FULL = process.argv.includes("--full");
// --ids 0326,0327,…: an explicit cohort, in the order given. For a deadline-
// driven packet, where what matters is not how clean an entry is but that a
// dated slot is waiting on it. Overrides the triage bands.
const IDS = (() => {
  const i = process.argv.indexOf("--ids");
  return i === -1 ? null : (process.argv[i + 1] ?? "").split(",").map((x) => x.trim()).filter(Boolean);
})();
// --label "…": heading for an --ids packet, so the reviewer knows why these.
const LABEL = (() => {
  const i = process.argv.indexOf("--label");
  return i === -1 ? null : process.argv[i + 1] ?? null;
})();

const bank = readdirSync(join(ROOT, "bank"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")))
  .sort((a, b) => (a.id < b.id ? -1 : 1));

const LANGS = {
  es: { name: "Spanish", other: "it", reviewerHint: "LatAm-default audience: anything Peninsular-only must say so." },
  it: { name: "Italian", other: "es", reviewerHint: "Exam relevance: CILS oral safety is a selling point — check the formality tags." },
};

function fileFor(lang) {
  const L = LANGS[lang];
  const active = bank
    .filter((e) => e.review.status !== "retired")
    .filter((e) => !PENDING || e.review.status !== "approved")
    .filter((e) => !READY || readyForReviewer(e));
  // A note is the audit trail — every entry has one — so "has notes" flags
  // everything and triages nothing. Flag on a REGION claim or an unanswered
  // question, which are the two things a reviewer must not skim past.
  // NB: deliberately broader than classify.mjs's OPEN_Q (any question mark
  // counts) and named apart from it so the two cannot be confused.
  const TRIAGE_Q = /\?|BOTH REVIEWERS|please confirm|check whether|flag whether/i;
  const flagged = active.filter(
    (e) => e[lang].regionNote || TRIAGE_Q.test(e.review.notes ?? "")
  );
  const clean = active.filter((e) => !flagged.includes(e));
  const retired = bank.filter((e) => e.review.status === "retired");

  const row = (e) => {
    const x = e[lang];
    const src = x.sources[0] ?? {};
    const lines = [
      `### ${e.id} — ${x.text}`,
      ``,
      `- **lit.** "${x.literal}"`,
      `- **meaning:** ${x.meaning}`,
      `- **example:** ${x.example}`,
      `  — *${x.exampleTranslation}*`,
      `- **register:** ${x.register} · **exam:** ${x.formality} · **regions:** ${x.regions.join(", ")} · **status:** ${e.review.status}`,
    ];
    if (!SIMPLE) {
      lines.push(
        `- **source to verify:** ${src.authority ?? "—"} → ${src.url ?? "—"} (headword: ${src.headword ?? "—"})${src.verifiedBy ? " ✓ verified" : " — NOT YET OPENED BY A HUMAN"}`
      );
    }
    if (x.regionNote) lines.push(`- ⚑ **REGION:** ${x.regionNote}`);
    if (FULL) {
      const q = questionFor(e, lang);
      if (q) lines.push(`- ⚑ **QUESTION:** ${q}`);
      // A corpus citation has no authority page to confirm, so this entry needs
      // its source replaced before it can be approved however clean the review.
      if ((x.sources ?? []).some((s2) => s2.authority === "Corpus"))
        lines.push(`- *(source being replaced on my side — your review still stands)*`);
    }
    if (!SIMPLE) {
      const trap = e.bridge?.interference?.[lang === "es" ? "it_to_es" : "es_to_it"];
      if (trap) lines.push(`- **trap when producing ${L.name}:** ${trap}`);
      if (e.review.notes) lines.push(`- **notes:** ${e.review.notes}`);
      for (const a of ALTS_BY_ANCHOR[e.id] ?? []) {
        const verb = a.status === "rejected" ? "REJECTED alternative" : "alternative under consideration";
        lines.push(`- **${verb} (${a.id}):** pairing this with \u201c${a.alt.text}\u201d instead \u2014 ${a.bridge}`);
      }
    }
    lines.push(
      ``,
      SIMPLE
        ? `> reviewer: [ ] expression is natural  [ ] meaning accurate  [ ] example natural  [ ] register/regions right`
        : `> reviewer: [ ] expression is natural  [ ] meaning accurate  [ ] example natural  [ ] register/regions right  [ ] source opened & confirms`
    );
    return lines.join("\n");
  };

  if (FULL) {
    const un = bank.filter((e) => e.review.status !== "approved" && e.review.status !== "retired");
    const dated = un.filter((e) => DUE_BY[e.id]).sort((a, b) => (DUE_BY[a.id][0] < DUE_BY[b.id][0] ? -1 : 1));
    const rest = un.filter((e) => !DUE_BY[e.id]);
    const asked = rest.filter((e) => e.review.status !== "draft" && questionFor(e, lang));
    const quiet = rest.filter((e) => e.review.status !== "draft" && !questionFor(e, lang));
    const drafts = rest.filter((e) => e.review.status === "draft");
    const sect = (title, list, blurb) =>
      !list.length ? "" : `---

## ${title} (${list.length})

${blurb}

${list.map(row).join("\n\n")}

`;
    return { count: un.length, text: `# ${L.name} review — every unapproved entry

**${un.length} entries.** ${L.reviewerHint}

Generated ${new Date().toISOString().slice(0, 10)}.

This is the whole backlog, not a sample. It is long on purpose — nothing is
being held back for a later round.

### How to use it

Four checks per entry: is the expression natural, is the meaning accurate, is
the example something a native would say, are the register and region tags
honest. Tick the boxes if it is fine; write a line underneath if it is not.

Two kinds of line can appear above the boxes:

- **REGION** — a claim I am making about where the expression lives. Not
  research for you to do: say whether it matches your experience.
- **QUESTION** — something I could not settle and the entry is waiting on.
  These are the ones worth your time first. An answer here is often what
  decides whether the entry ships at all.

Work in whatever order suits you, except the first section — those have dates.
No sources and no grammar claims of mine are included; answer from your ear.
Do not edit above the boxes, these files are generated.

${sect(
  "Dated — a slot is running filler until these are approved",
  dated,
  dated.map((e) => `- **${e.id}** needed by **${DUE_BY[e.id][0]}**`).join("\n")
)}${sect(
  "With a question for you",
  asked,
  "Each of these has a QUESTION line. They are the entries where your answer changes the outcome."
)}${sect(
  "No question — just your ear",
  quiet,
  "Nothing outstanding on these. Four ticks each, or a line if something is off."
)}${sect(
  "Early drafts — lower confidence",
  drafts,
  "Still marked draft rather than ready. Judge them as freely as the rest; a \"this does not work\" here saves more time than anywhere else."
)}` };
  }

  if (IDS) {
    const byId = new Map(bank.map((e) => [e.id, e]));
    const picked = IDS.map((id) => byId.get(id)).filter(Boolean);
    const missing = IDS.filter((id) => !byId.has(id));
    if (missing.length) console.error(`  WARN --ids: no such entry: ${missing.join(", ")}`);
    return { count: picked.length, text: `# ${L.name} review — ${LABEL ?? "selected entries"}

**${picked.length} entries, in the order they are needed.** ${L.reviewerHint}

Generated ${new Date().toISOString().slice(0, 10)}.

### How to return this

Tick the four boxes if an entry is fine. If one is not, write a line under it
saying which part is wrong. Some entries carry a **REGION** line — that is a
claim I am making, not a question for you to research: say whether it matches
your experience. Do not edit above the boxes; this file is generated.

---

${picked.map(row).join("\n\n")}
` };
  }

  if (CLEAN) {
    return { count: clean.length, text: `# ${L.name} review — ${clean.length} entries, no open questions

**${clean.length} entries. Nothing here needs anything from me first** — no region
claims to adjudicate, no unanswered questions. Every one is waiting only on a
native ear. ${L.reviewerHint}

Generated ${new Date().toISOString().slice(0, 10)}.

### How to return this

Tick the four boxes under an entry if it is fine. If one is not fine, write one
line under it saying what is wrong — the wording, the meaning, the example, or
the register. **Do not edit anything above the boxes**; these are generated from
the bank and your file would be overwritten. Return the whole file however is
easiest.

No sources, no grammar claims, no drafting notes — answer from your own ear.

---

${clean.map(row).join("\n\n")}
` };
  }

  return { count: active.length, text: `# ${L.name} review worklist — un puente al giorno

**Derived from the bank. Do not edit this file** — corrections go into the entry
JSON (or tell the editor), then this file is regenerated. ${L.reviewerHint}

${active.length} active entries · ${flagged.length} need attention first · generated ${new Date().toISOString().slice(0, 10)}

${SIMPLE
  ? `Four checks per entry: is the expression natural, is the meaning accurate, is the
example something a native would say, and are register/regions honest.

This is the stripped list — no sources, no interference claims, no drafting notes.
Answer from your own ear. If an entry needs discussion, note the id and we will
send the full record separately.`
  : `The five checks per entry: is the expression natural, is the meaning accurate, is
the example something a native would say, are register/regions honest, and does
the cited page actually support the entry (open the URL).`}

---

## Needs attention first — region claim or an open question (${flagged.length})

${flagged.map(row).join("\n\n")}

---

## The rest — straightforward, still need your ear (${clean.length})

${clean.map(row).join("\n\n")}

---

## Retired — no review needed (${retired.length})

${retired.map((e) => `- ${e.id} — ${e[lang].text} · *${e.retiredReason ?? ""}*`).join("\n")}
` };
}

mkdirSync(join(ROOT, "reviewers"), { recursive: true });
let stale = [];
for (const lang of ["es", "it"]) {
  // An --ids packet is an ad-hoc cohort and must not land on the filename a
  // standing mode owns, or it silently replaces that mode's output.
  const slug = FULL ? "-ALL-UNAPPROVED" : IDS
    ? "-" + (LABEL ?? "ids").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toUpperCase().slice(0, 24)
    : `${READY ? "-READY" : PENDING ? "-PENDING" : ""}${CLEAN ? "-CLEAN" : ""}${SIMPLE ? "-SIMPLE" : ""}`;
  const path = join(ROOT, "reviewers", `REVIEW-${lang.toUpperCase()}${slug}.md`);
  const built = fileFor(lang);
  const next = built.text;
  const prev = existsSync(path) ? readFileSync(path, "utf8") : "";
  // ignore the generated date when checking freshness
  const strip = (s) => s.replace(/generated \d{4}-\d{2}-\d{2}/, "");
  if (CHECK) {
    if (strip(prev) !== strip(next)) stale.push(path);
  } else {
    writeFileSync(path, next);
    // Report what was WRITTEN, not the size of the bank that was read. The old
    // line printed the bank count next to a file holding a fraction of it.
    console.log(`${path} ← ${built.count} entries (of ${bank.length} in bank)`);
  }
}

if (CHECK) {
  if (stale.length) {
    console.error(`STALE: ${stale.join(", ")} — the bank changed but the reviewer lists were not regenerated.`);
    console.error("Run: node tools/build-review-lists.mjs");
    process.exit(1);
  }
  console.log("Reviewer lists are current.");
}
