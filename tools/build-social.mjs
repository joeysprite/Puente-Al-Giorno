#!/usr/bin/env node
/**
 * Square social cards from bank entries — same tokens, same seam.
 *
 *   node tools/build-social.mjs --only 0028[,0012...]   (default: all active)
 *   node tools/build-social.mjs --format story           (1080x1920 instead of 1080x1080)
 *
 * Outputs landing/social/<id>.png (or <id>-story.png).
 * Front = the pair. The bridge stays in the email/site — the card's job is to
 * make someone curious enough to cross, not to teach the whole lesson.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const FONTS = resolve(arg("--fonts", "/tmp/cardfonts"));
const STORY = arg("--format", "square") === "story";
const ONLY = arg("--only", null)?.split(",");

const BRAND = JSON.parse(readFileSync(join(ROOT, "brand.json"), "utf8"));
const C = BRAND.color;
const fontFiles = ["Newsreader.ttf","NewsreaderItalic.ttf","PlexMono.ttf","PlexSans.ttf"].map(f => join(FONTS, f));

const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const wrap = (t, max) => { const out=[]; let cur=""; for (const w of t.split(" ")) {
  if ((cur+" "+w).trim().length > max && cur) { out.push(cur); cur=w; } else cur=(cur+" "+w).trim(); }
  if (cur) out.push(cur); return out; };

function svg(e) {
  const W = 1080, H = STORY ? 1920 : 1080, M = W/2, top = STORY ? 420 : 200;
  const esL = wrap(e.es.text, 16), itL = wrap(e.it.text, 16);
  const block = (lines, x, anchor, color, y0) => lines.map((l,i) =>
    `<text x="${x}" y="${y0+i*76}" text-anchor="${anchor}" font-family="Newsreader" font-weight="500" font-size="64" fill="${color}">${esc(l)}</text>`).join("");
  const lit = (t, x, anchor, y) =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Newsreader" font-style="italic" font-size="30" fill="${C.ink3}">${esc("\u201c"+t+"\u201d")}</text>`;
  const rows = Math.max(esL.length, itL.length);
  const seamB = top + 120 + rows*76;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.paper}"/>
  <rect x="50" y="${top-150}" width="${W-100}" height="${seamB-top+330}" fill="${C.card}" stroke="${C.rule}" stroke-width="2"/>
  <text x="${M}" y="${top-80}" text-anchor="middle" font-family="IBM Plex Mono" font-size="22" letter-spacing="6" fill="${C.ink3}">${esc(BRAND.name.toUpperCase()).replace(/ /g, "\u00a0\u200a")}</text>
  <line x1="${M}" y1="${top}" x2="${M}" y2="${seamB}" stroke="${C.rule}" stroke-width="2"/>
  <text x="${M-40}" y="${top+50}" text-anchor="end" font-family="IBM Plex Mono" font-size="24" letter-spacing="4" fill="${C.es}">ESPA\u00d1OL</text>
  <text x="${M+40}" y="${top+50}" text-anchor="start" font-family="IBM Plex Mono" font-size="24" letter-spacing="4" fill="${C.it}">ITALIANO</text>
  ${block(esL, M-40, "end", C.es, top+140)}
  ${block(itL, M+40, "start", C.it, top+140)}
  ${lit(e.es.literal, M-40, "end", seamB+60)}
  ${lit(e.it.literal, M+40, "start", seamB+60)}
  <text x="${M}" y="${seamB+150}" text-anchor="middle" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">${esc(BRAND.taglineShort)}</text>
  <text x="${M}" y="${seamB+205}" text-anchor="middle" font-family="IBM Plex Mono" font-size="22" letter-spacing="2" fill="${C.ink3}">@${esc(BRAND.social.handles.instagram)}</text>
</svg>`;
}

const files = readdirSync(join(ROOT,"bank")).filter(f => f.endsWith(".json"));
mkdirSync(join(ROOT,"landing","social"), { recursive:true });
let n = 0;
for (const f of files) {
  const e = JSON.parse(readFileSync(join(ROOT,"bank",f),"utf8"));
  if (e.review.status === "retired") continue;
  if (ONLY && !ONLY.includes(e.id)) continue;
  const png = new Resvg(svg(e), { fitTo:{mode:"width",value:1080},
    font:{ fontFiles, loadSystemFonts:false, defaultFontFamily:"Newsreader" } }).render().asPng();
  writeFileSync(join(ROOT,"landing","social",`${e.id}${STORY?"-story":""}.png`), png);
  n++;
}
console.log(`landing/social/ \u2190 ${n} ${STORY?"story":"square"} cards (1080x${STORY?1920:1080})`);
