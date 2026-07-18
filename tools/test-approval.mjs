#!/usr/bin/env node
/**
 * Prove the approval pipeline works — WITHOUT approving anything real.
 *
 *   node tools/test-approval.mjs [--n 30]
 *
 * Copies the repo to a scratch directory, approves N entries there with an
 * obviously-fake reviewer, then runs the whole downstream chain against the
 * copy: validator → scheduler → landing --today. Reports what each produced,
 * then throws the copy away.
 *
 * WHY THIS EXISTS: you cannot legitimately approve entries yourself — the
 * allowlist requires a NATIVE reviewer per language, and that rule is the
 * product's spine. But you should still be able to see the machinery run
 * before real approvals arrive. This lets the pipeline be tested without the
 * bank ever containing a signature that refers to nobody.
 */

import { cpSync, readFileSync, writeFileSync, rmSync, mkdtempSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const argv = process.argv.slice(2);
const N = Number(argv[argv.indexOf("--n") + 1]) || 30;

const scratch = mkdtempSync(join(tmpdir(), "puente-dryrun-"));
for (const d of ["bank", "tools", "landing", "reviewers", "test"]) {
  try { cpSync(join(ROOT, d), join(scratch, d), { recursive: true }); } catch {}
}
for (const f of ["reviewers.json", "events.json", "overrides.json", "brand.json", "alternatives.json"]) {
  try { cpSync(join(ROOT, f), join(scratch, f)); } catch {}
}

// fake reviewers, marked so loudly they could never be mistaken for people
const rev = JSON.parse(readFileSync(join(scratch, "reviewers.json"), "utf8"));
rev.people["DRYRUN-ES-NOT-A-PERSON"] = { name: "DRY RUN — not a real reviewer", lang: ["es"], roles: ["reviewer", "verifier"] };
rev.people["DRYRUN-IT-NOT-A-PERSON"] = { name: "DRY RUN — not a real reviewer", lang: ["it"], roles: ["reviewer", "verifier"] };
writeFileSync(join(scratch, "reviewers.json"), JSON.stringify(rev, null, 2));

// approve N entries in the copy: B1/B2 first, matching the CEFR policy, and
// high-value tags first, matching the composition gate's advice
const HV = new Set(["false_friend", "auxiliary_trap", "interference_risk", "preposition_differs", "register_differs"]);
const files = readdirSync(join(scratch, "bank")).filter((f) => f.endsWith(".json"));
const entries = files.map((f) => ({ f, e: JSON.parse(readFileSync(join(scratch, "bank", f), "utf8")) }))
  .filter(({ e }) => e.review.status !== "retired")
  .sort((a, b) => {
    const score = ({ e }) => (e.bridge.tags.some((t) => HV.has(t)) ? 0 : 1) + (["B1", "B2"].includes(e.cefr) ? 0 : 1);
    return score(a) - score(b);
  })
  .slice(0, N);

const TODAY = new Date().toISOString().slice(0, 10);
for (const { f, e } of entries) {
  for (const side of ["es", "it"]) {
    for (const s of e[side].sources) { s.verifiedOn = TODAY; s.verifiedBy = `DRYRUN-${side.toUpperCase()}-NOT-A-PERSON`; }
  }
  e.review.status = "approved";
  e.review.esReviewer = "DRYRUN-ES-NOT-A-PERSON";
  e.review.itReviewer = "DRYRUN-IT-NOT-A-PERSON";
  e.review.reviewedOn = TODAY;
  writeFileSync(join(scratch, "bank", f), JSON.stringify(e, null, 2));
}

const run = (label, args) => {
  console.log(`\n─── ${label} ─────────────────────────────`);
  try {
    const out = execFileSync("node", args, { cwd: scratch, env: { ...process.env, BANK_ROOT: scratch }, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    console.log(out.trim().split("\n").slice(-6).join("\n"));
  } catch (err) {
    console.log((err.stdout || "").trim().split("\n").slice(-4).join("\n"));
    console.log((err.stderr || "").trim().split("\n").slice(-4).join("\n"));
  }
};

console.log(`DRY RUN — ${entries.length} entries approved in a scratch copy at ${scratch}`);
console.log("The real bank/ is untouched. Nothing here can be committed.");
run("validator", ["tools/validate.mjs", "bank", "reviewers.json", "events.json"]);
run("scheduler (this year, invariants)", ["tools/schedule.mjs", String(new Date().getFullYear()), "--check"]);
run("scheduler (next 7 days)", ["tools/schedule.mjs", String(new Date().getFullYear())]);
run("landing --today", ["tools/build-landing.mjs", "--today", "--out", "dryrun.html"]);

rmSync(scratch, { recursive: true, force: true });
console.log(`\nScratch copy deleted. Real bank still: ${readdirSync(join(ROOT, "bank")).length} files, 0 approved.`);
