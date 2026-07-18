#!/usr/bin/env node
/**
 * Validate the alternatives layer against the bank.
 *   node tools/validate-alternatives.mjs
 * Rules:
 *  - anchor must exist in bank/ and not be retired
 *  - keepSide es|it; alt.lang must be the OTHER side
 *  - alt.text must differ from the anchor's current partner (else it's not an
 *    alternative) and must not equal ANY active bank expression (else graduation
 *    would collide with the strict one-expression-one-entry rule)
 *  - bridge and walk both required, ≥40 chars — an alternative without a walk
 *    is just a candidate; the walk is what earns it a place in this layer
 *  - staged/rejected require statusBy + statusOn
 *  - ids unique, A-prefixed
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const bank = Object.fromEntries(
  readdirSync(join(ROOT, "bank")).filter((f) => f.endsWith(".json"))
    .map((f) => { const e = JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")); return [e.id, e]; })
);
const activeTexts = new Set();
for (const e of Object.values(bank)) {
  if (e.review.status === "retired") continue;
  activeTexts.add(e.es.text.trim().toLowerCase());
  activeTexts.add(e.it.text.trim().toLowerCase());
}

const doc = JSON.parse(readFileSync(join(ROOT, "alternatives.json"), "utf8"));
let errors = 0, warnings = 0;
const err = (w, m) => { console.error(`  ERROR ${w}: ${m}`); errors++; };
const warn = (w, m) => { console.error(`  WARN  ${w}: ${m}`); warnings++; };

const ids = new Set();
const STATUSES = ["proposed", "staged", "rejected"];
for (const a of doc.alternatives ?? []) {
  const W = a.id ?? "<no id>";
  if (!/^A\d{3}$/.test(a.id ?? "")) err(W, "id must match A###");
  if (ids.has(a.id)) err(W, "duplicate id"); ids.add(a.id);
  const anchor = bank[a.anchor];
  if (!anchor) { err(W, `anchor ${a.anchor} not found in bank`); continue; }
  if (anchor.review.status === "retired") warn(W, `anchor ${a.anchor} is retired — alternative is dormant`);
  if (!["es", "it"].includes(a.keepSide)) err(W, "keepSide must be es|it");
  const altLang = a.keepSide === "es" ? "it" : "es";
  if (a.alt?.lang !== altLang) err(W, `alt.lang must be ${altLang} (the side being replaced)`);
  for (const k of ["text", "literal", "meaning"]) {
    if (!a.alt?.[k]?.trim()) err(W, `alt.${k} required`);
  }
  const altText = a.alt?.text?.trim().toLowerCase();
  const current = anchor[altLang]?.text?.trim().toLowerCase();
  if (altText && altText === current) err(W, "alt.text equals the anchor's current partner — not an alternative");
  if (altText && activeTexts.has(altText)) {
    err(W, `alt.text "${a.alt.text}" already exists as an active bank expression — graduation would violate one-expression-one-entry`);
  }
  for (const k of ["bridge", "walk"]) {
    if (!a[k] || a[k].trim().length < 40) err(W, `${k} required (≥40 chars) — the walk is what distinguishes this layer from the candidates queue`);
  }
  if (!STATUSES.includes(a.status)) err(W, `status must be one of ${STATUSES.join("|")}`);
  if (["staged", "rejected"].includes(a.status) && (!a.statusBy || !a.statusOn)) {
    err(W, `${a.status} requires statusBy and statusOn — lifecycle moves are recorded, not just made`);
  }
}
const counts = {};
for (const a of doc.alternatives ?? []) counts[a.status] = (counts[a.status] ?? 0) + 1;
console.log(`alternatives: ${(doc.alternatives ?? []).length} (${STATUSES.map(s => `${s} ${counts[s] ?? 0}`).join(" · ")})`);
if (errors) { console.error(`FAIL — ${errors} error(s).`); process.exit(1); }
console.log(`PASS${warnings ? ` — ${warnings} warning(s)` : ""}`);
