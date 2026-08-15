#!/usr/bin/env node
/**
 * Email bodies from bank entries — same tokens, same seam.
 *
 *   node tools/build-email.mjs --from 2026-08-10 --to 2026-08-23
 *   node tools/build-email.mjs --only 0001,0028
 *   node tools/build-email.mjs --from 2026-08-10 --to 2026-08-16 --weekend
 *
 * Outputs landing/email/<date>-<id>.html — the markup that goes INSIDE a
 * Buttondown draft, not a whole document. Buttondown supplies the shell,
 * the unsubscribe line and the footer; we supply the body and nothing else.
 *
 * Styling is 100% inline. Not a stylistic choice — <style> blocks are stripped
 * by enough clients that inline is the only thing that reliably survives, and
 * it is the one form of styling no plan tier gates.
 *
 * Card art is referenced by URL, never embedded. Base64 images are blocked by
 * a meaningful share of clients, and a scheduled send may go out weeks after
 * it was stamped — the URL must still resolve then.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildYear } from "./schedule.mjs";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const has = (n) => argv.includes(n);

const FROM = arg("--from", null);
const TO = arg("--to", null);
const ONLY = arg("--only", null)?.split(",");
const WEEKEND = has("--weekend");
const OUT = resolve(arg("--out", join(ROOT, "landing/email")));

// Where the card art is served from. Swap to the Netlify domain once it is
// live — raw.githubusercontent is fine but gives no control over caching, and
// any path change silently breaks every already-scheduled send.
const CARD_BASE = arg(
  "--card-base",
  "https://raw.githubusercontent.com/joeysprite/Puente-Al-Giorno/main/landing/email-cards"
);

const BRAND = JSON.parse(readFileSync(join(ROOT, "brand.json"), "utf8"));
const C = BRAND.color;

// Email-safe stacks. Newsreader is self-hosted for the cards and the site, but
// inboxes will not load a webfont — Georgia is the closest thing every client
// already has. The card carries the real face.
const SERIF = "Georgia,'Times New Roman',serif";
const MONO = "'Courier New',Courier,monospace";
const SANS = "Helvetica,Arial,sans-serif";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const bank = readdirSync(join(ROOT, "bank"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")));
const byId = new Map(bank.map((e) => [e.id, e]));

// ───────────────────────────────────────────────────────────────── markup

const label = (text, colour) =>
  `<span style="font-family:${MONO};font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${colour};">${esc(text)}</span>`;

// Solid color header bar per language, name reversed in white — more of a
// section divider than a mood tint. bgcolor set alongside the CSS background
// since bgcolor is what Outlook actually honors on a td.
const side = (s, colour, langLabel) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.rule};border-top:0;">
    <tr><td bgcolor="${colour}" style="background:${colour};padding:9px 16px;">
      <span style="font-family:${MONO};font-size:13px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${C.paper};">${esc(langLabel)}</span>
    </td></tr>
    <tr><td style="padding:14px 16px 16px;">
      <p style="margin:0 0 6px;font-family:${SERIF};font-size:27px;line-height:1.25;color:${colour};">${esc(s.text)}</p>
      <p style="margin:0 0 10px;font-family:${SERIF};font-style:italic;font-size:16px;line-height:1.4;color:${C.ink3};">&ldquo;${esc(s.literal)}&rdquo;</p>
      <p style="margin:0 0 10px;font-family:${SANS};font-size:16px;line-height:1.5;color:${C.ink2};">${esc(s.meaning)}</p>
      <p style="margin:0 0 2px;font-family:${SERIF};font-size:16px;line-height:1.5;color:${C.ink};">${esc(s.example)}</p>
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.ink3};">${esc(s.exampleTranslation)}</p>
    </td></tr>
  </table>`;

const trap = (dir, text, colour) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="4" style="background:${colour};"></td>
    <td style="padding:2px 0 2px 14px;">
      <p style="margin:0 0 4px;font-family:${MONO};font-size:12px;letter-spacing:1px;color:${C.ink3};">${dir}</p>
      <p style="margin:0;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.ink2};">${esc(text)}</p>
    </td>
  </tr></table>`;

function body(e) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
<tr><td align="center" style="padding:0 16px 40px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

  <!-- the card, exactly as Instagram gets it. No masthead above it: the card
       already carries the wordmark, and Buttondown prints the title itself. -->
  <tr><td style="padding:0 0 6px;">
    <img src="${CARD_BASE}/${e.id}.png" width="600"
         alt="${esc(e.es.text)} / ${esc(e.it.text)}"
         style="display:block;width:100%;max-width:600px;height:auto;border:1px solid ${C.rule};">
  </td></tr>
  <tr><td align="center" style="padding:0 0 24px;">
    <span style="font-family:${SANS};font-size:13px;color:${C.ink3};">${esc(e.cefr)}</span>
  </td></tr>

  <!-- Stacked, not side-by-side: 50%-width table cells collapse to unusably
       narrow columns on some Android mail clients (Gmail's app renders them
       against the device width, not the 600px container), which wraps every
       word onto its own line at this font size. The card above already shows
       the two languages side by side and is immune to this, since it's a
       fixed-width image, not reflowable text. Each block is independently
       tinted rather than sharing one outer card, so there's no big shared
       hairline gap to pad out. -->
  <tr><td>${side(e.es, C.es, "Espa\u00f1ol")}</td></tr>
  <tr><td style="padding:10px 0 0;"></td></tr>
  <tr><td>${side(e.it, C.it, "Italiano")}</td></tr>

  <tr><td style="padding:20px 0 0;">
    <p style="margin:0 0 8px;">${label("El puente \u00b7 Il ponte", C.amber)}</p>
    <p style="margin:0;font-family:${SERIF};font-size:18px;line-height:1.5;color:${C.ink};">${esc(e.bridge.note)}</p>
  </td></tr>

  <tr><td style="padding:20px 0 0;">
    <p style="margin:0 0 10px;">${label("La trampa \u00b7 La trappola", C.amber)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="padding:0 0 10px;">${trap("ES &rarr; IT", e.bridge.interference.es_to_it, C.es)}</td></tr>
      <tr><td>${trap("IT &rarr; ES", e.bridge.interference.it_to_es, C.it)}</td></tr>
    </table>
  </td></tr>

</table>
</td></tr>
</table>`;
}

// Subject lines are the one thing a generator cannot fully own — they are the
// only part a reader sees before deciding to open. This is a serviceable
// default, meant to be edited.
const subject = (e) => `${e.es.text} \u00b7 ${e.it.text}`;

// ───────────────────────────────────────────────────────────────── drive

let plan = []; // [{ date|null, id }]

if (ONLY) {
  plan = ONLY.map((id) => ({ date: null, id: id.trim() }));
} else {
  if (!FROM || !TO) {
    console.error("need --from YYYY-MM-DD --to YYYY-MM-DD (or --only <ids>)");
    process.exit(1);
  }
  const events = JSON.parse(readFileSync(join(ROOT, "events.json"), "utf8"));
  const overrides = JSON.parse(readFileSync(join(ROOT, "overrides.json"), "utf8"));

  // Resolve through the scheduler, never independently. Two sources of truth
  // for "what runs on day X" is exactly the drift this avoids.
  const years = new Set([FROM.slice(0, 4), TO.slice(0, 4)]);
  const sched = new Map();
  for (const y of years) {
    const { schedule } = buildYear(Number(y), bank, events, overrides, { weekend: WEEKEND });
    for (const [date, v] of schedule) sched.set(date, v);
  }
  for (const [date, v] of [...sched].sort()) {
    if (date >= FROM && date <= TO) plan.push({ date, id: v.id });
  }
}

mkdirSync(OUT, { recursive: true });
const manifest = [];

for (const { date, id } of plan) {
  const e = byId.get(id);
  if (!e) { console.error(`SKIP ${date ?? ""} ${id} — not in bank`); continue; }
  if (e.review?.status !== "approved") {
    console.error(`SKIP ${date ?? ""} ${id} — status "${e.review?.status}", not approved`);
    continue;
  }
  const name = `${date ? date + "-" : ""}${id}.html`;
  writeFileSync(join(OUT, name), body(e) + "\n");
  manifest.push({ date, id, file: name, subject: subject(e) });
}

writeFileSync(join(OUT, "MANIFEST.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(`${manifest.length} bodies -> ${OUT}`);
for (const m of manifest) console.log(`  ${m.date ?? "--"}  ${m.id}  ${m.subject}`);
