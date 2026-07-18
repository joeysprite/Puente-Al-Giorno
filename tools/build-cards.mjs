#!/usr/bin/env node
/**
 * Build share cards (OG images) FROM THE BANK.
 *
 *   node tools/build-cards.mjs [--only 0028,0012] [--fonts /path/to/ttfs]
 *
 * One 1200×630 PNG per active entry → landing/cards/<id>.png, in the site's
 * design language: tan paper, the pair meeting at the seam, carmine/laurel.
 * The landing builder points og:image at the hero's card, so a shared link
 * shows the day's word pair — the card IS the marketing.
 *
 * Fonts: rasterisation needs real TTFs (the site's woff2 won't do); pass
 * --fonts or default to /tmp/cardfonts. Same OFL faces the site uses.
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const FONTS = resolve(arg("--fonts", "/tmp/cardfonts"));
const ONLY = arg("--only", null)?.split(",");

const bank = readdirSync(join(ROOT, "bank"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")))
  .filter((e) => e.review.status !== "retired")
  .filter((e) => !ONLY || ONLY.includes(e.id));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Greedy wrap by character count; returns lines. */
function wrap(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function svgFor(e) {
  const W = 1200, H = 630, MID = W / 2;
  const esLines = wrap(e.es.text, 22);
  const itLines = wrap(e.it.text, 22);
  const maxLines = Math.max(esLines.length, itLines.length);
  const exprSize = maxLines > 2 ? 44 : 54;
  const lh = exprSize * 1.18;
  const exprY = 235;

  const block = (lines, x, anchor, fill) =>
    lines.map((l, i) =>
      `<text x="${x}" y="${exprY + i * lh}" text-anchor="${anchor}" font-family="Newsreader" font-weight="500" font-size="${exprSize}" fill="${fill}">${esc(l)}</text>`
    ).join("");

  const litY = exprY + maxLines * lh + 14;
  const lit = (t, x, anchor) =>
    `<text x="${x}" y="${litY}" text-anchor="${anchor}" font-family="Newsreader" font-style="italic" font-size="26" fill="#605D59">lit. \u201c${esc(t)}\u201d</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#FAF6EE"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="#FFFFFF" stroke="#E2D9C8"/>
  <line x1="${MID}" y1="130" x2="${MID}" y2="${H - 170}" stroke="#E2D9C8"/>
  <text x="${MID}" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="20" letter-spacing="4" fill="#605D59">UN PUENTE AL GIORNO</text>
  <text x="${MID - 60}" y="165" text-anchor="end" font-family="IBM Plex Mono" font-size="18" letter-spacing="3" fill="#8C2F39">ESPA\u00d1OL</text>
  <text x="${MID + 60}" y="165" text-anchor="start" font-family="IBM Plex Mono" font-size="18" letter-spacing="3" fill="#3D5A45">ITALIANO</text>
  ${block(esLines, MID - 60, "end", "#8C2F39")}
  ${block(itLines, MID + 60, "start", "#3D5A45")}
  ${lit(e.es.literal, MID - 60, "end")}
  ${lit(e.it.literal, MID + 60, "start")}
  <text x="${MID}" y="${H - 105}" text-anchor="middle" font-family="IBM Plex Sans" font-size="24" fill="#4C4A47">One Spanish\u2013Italian pair a day \u2014 and the trap between them.</text>
</svg>`;
}

mkdirSync(join(ROOT, "landing", "cards"), { recursive: true });
const fontFiles = ["Newsreader.ttf", "NewsreaderItalic.ttf", "PlexMono.ttf", "PlexSans.ttf"]
  .map((f) => join(FONTS, f));

let n = 0;
for (const e of bank) {
  const png = new Resvg(svgFor(e), {
    fitTo: { mode: "width", value: 1200 },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Newsreader" },
  }).render().asPng();
  writeFileSync(join(ROOT, "landing", "cards", `${e.id}.png`), png);
  n++;
}
console.log(`landing/cards/ ← ${n} share cards (1200×630)`);
