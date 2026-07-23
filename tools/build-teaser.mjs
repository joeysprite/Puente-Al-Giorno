#!/usr/bin/env node
/**
 * Launch teaser: the WHOLE 1080x1080 IS the calendar page. No expressions —
 * just the date, with a prominent day number, in the calendar-leaf style.
 *
 *   node tools/build-teaser.mjs [--date 2026-08-15]
 *   -> landing/social/teaser.png
 *
 * Does NOT touch calendar-mockup.pdf.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const argv = process.argv.slice(2);
const arg=(n,d)=>{const i=argv.indexOf(n);return i>=0?argv[i+1]:d;};
const FONTS=resolve(arg("--fonts","/tmp/cardfonts"));
const DATE=arg("--date","2026-08-15");

const BRAND=JSON.parse(readFileSync(join(ROOT,"brand.json"),"utf8"));
const C=BRAND.color;
const fontFiles=["Newsreader.ttf","NewsreaderItalic.ttf","PlexMono.ttf","PlexSans.ttf"].map(f=>join(FONTS,f));
const esc=(s)=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const spaced=(s)=>s.replace(/ /g,"\u00a0\u200a");

const W=1080,H=1080,MID=540;
const d=new Date(DATE+"T12:00:00");
const DOW_ES=["domingo","lunes","martes","mi\u00e9rcoles","jueves","viernes","s\u00e1bado"];
const DOW_IT=["domenica","luned\u00ec","marted\u00ec","mercoled\u00ec","gioved\u00ec","venerd\u00ec","sabato"];
const MON_ES=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MON_IT=["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
const FRAME=40;

const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.paper}"/>
  <rect x="${FRAME}" y="${FRAME}" width="${W-2*FRAME}" height="${H-2*FRAME}" fill="${C.card}" stroke="${C.rule}" stroke-width="2"/>

  <!-- masthead -->
  <text x="${MID}" y="${FRAME+90}" text-anchor="middle" font-family="IBM Plex Mono" font-size="24" letter-spacing="6" fill="${C.ink3}">${esc(spaced(BRAND.name.toUpperCase()))}</text>

  <!-- the prominent day number, dead centre -->
  <text x="${MID}" y="600" text-anchor="middle" font-family="Newsreader" font-size="380" fill="${C.ink}">${d.getDate()}</text>

  <!-- bilingual date under the number -->
  <text x="${MID}" y="710" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="40" fill="${C.es}">${esc(`${DOW_ES[d.getDay()]}, ${d.getDate()} de ${MON_ES[d.getMonth()]}`)}</text>
  <text x="${MID}" y="762" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="40" fill="${C.it}">${esc(`${DOW_IT[d.getDay()]} ${d.getDate()} ${MON_IT[d.getMonth()]} ${d.getFullYear()}`)}</text>

  <!-- seam accent -->
  <line x1="${MID}" y1="805" x2="${MID}" y2="880" stroke="${C.rule}" stroke-width="2"/>

  <!-- the launch line -->
  <text x="${MID}" y="${H-FRAME-90}" text-anchor="middle" font-family="IBM Plex Mono" font-size="22" letter-spacing="5" fill="${C.amber}">${esc(spaced("LLEGA \u00b7 ARRIVA"))}</text>
  <text x="${MID}" y="${H-FRAME-46}" text-anchor="middle" font-family="Newsreader" font-weight="500" font-size="40" fill="${C.ink}">Ferragosto</text>
</svg>`;

mkdirSync(join(ROOT,"landing","social"),{recursive:true});
writeFileSync(join(ROOT,"landing","social","teaser.png"),
  new Resvg(svg,{fitTo:{mode:"width",value:W},font:{fontFiles,loadSystemFonts:false,defaultFontFamily:"Newsreader"}}).render().asPng());
console.log(`landing/social/teaser.png \u2190 calendar-page teaser, ${d.getDate()} ${MON_IT[d.getMonth()]} ${d.getFullYear()}`);
