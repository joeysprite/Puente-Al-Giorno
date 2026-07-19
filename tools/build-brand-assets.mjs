#!/usr/bin/env node
/**
 * Build brand assets FROM brand.json.
 *
 *   node tools/build-brand-assets.mjs [--fonts /path/to/ttfs]
 *
 * Outputs to landing/brand/:
 *   avatar-512.png   square mark — for Buttondown's avatar, social profiles
 *   avatar-1024.png  same, larger source
 *   og-default.png   1200x630 generic share image, for the site root and any
 *                    page without its own entry card
 *
 * The mark is the seam: a carmine p and a laurel g meeting at a vertical rule,
 * the same device the favicon uses and the same one every entry card uses to
 * divide the two languages. Nothing here is hand-drawn; if brand.json changes,
 * these regenerate to match.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const FONTS = resolve(arg("--fonts", "/tmp/cardfonts"));

const BRAND = JSON.parse(readFileSync(join(ROOT, "brand.json"), "utf8"));
const C = BRAND.color;

const fontFiles = ["Newsreader.ttf", "NewsreaderItalic.ttf", "PlexMono.ttf", "PlexSans.ttf"]
  .map((f) => join(FONTS, f));

const render = (svg, width) =>
  new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Newsreader" },
  }).render().asPng();

/** Square mark: p | g across the seam. */
function avatarSvg() {
  const S = 512, M = S / 2, pad = 46, r = 64;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <rect width="${S}" height="${S}" rx="${r}" fill="${C.paper}"/>
  <rect x="${pad}" y="${pad}" width="${S - 2 * pad}" height="${S - 2 * pad}" rx="${r / 2}"
        fill="${C.card}" stroke="${C.rule}" stroke-width="3"/>
  <line x1="${M}" y1="${pad + 54}" x2="${M}" y2="${S - pad - 54}" stroke="${C.rule}" stroke-width="3"/>
  <text x="${M - 26}" y="${M + 62}" text-anchor="end" font-family="Newsreader" font-weight="500"
        font-size="210" fill="${C.es}">p</text>
  <text x="${M + 26}" y="${M + 62}" text-anchor="start" font-family="Newsreader" font-weight="500"
        font-size="210" fill="${C.it}">g</text>
</svg>`;
}

/** Generic 1200x630 share image for pages without an entry card. */
function ogSvg() {
  const W = 1200, H = 630, M = W / 2;
  const name = BRAND.name.toUpperCase().replace(/ /g, "\u00a0\u200a");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.paper}"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="${C.card}" stroke="${C.rule}"/>
  <text x="${M}" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="20"
        letter-spacing="4" fill="${C.ink3}">${name}</text>
  <line x1="${M}" y1="215" x2="${M}" y2="405" stroke="${C.rule}"/>
  <text x="${M - 70}" y="270" text-anchor="end" font-family="IBM Plex Mono" font-size="18"
        letter-spacing="3" fill="${C.es}">ESPA\u00d1OL</text>
  <text x="${M + 70}" y="270" text-anchor="start" font-family="IBM Plex Mono" font-size="18"
        letter-spacing="3" fill="${C.it}">ITALIANO</text>
  <text x="${M - 70}" y="345" text-anchor="end" font-family="Newsreader" font-weight="500"
        font-size="60" fill="${C.es}">un puente</text>
  <text x="${M + 70}" y="345" text-anchor="start" font-family="Newsreader" font-weight="500"
        font-size="60" fill="${C.it}">al giorno</text>
  <text x="${M}" y="475" text-anchor="middle" font-family="IBM Plex Sans" font-size="26"
        fill="${C.ink2}">One pair a day \u2014 and the trap between them.</text>
</svg>`;
}

mkdirSync(join(ROOT, "landing", "brand"), { recursive: true });
writeFileSync(join(ROOT, "landing", "brand", "avatar-512.png"), render(avatarSvg(), 512));
writeFileSync(join(ROOT, "landing", "brand", "avatar-1024.png"), render(avatarSvg(), 1024));
writeFileSync(join(ROOT, "landing", "brand", "og-default.png"), render(ogSvg(), 1200));
console.log("landing/brand/ \u2190 avatar-512.png, avatar-1024.png, og-default.png");
