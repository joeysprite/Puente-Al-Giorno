#!/usr/bin/env node
/**
 * Build an archive page from entries already posted to Instagram.
 *
 *   node tools/build-archive.mjs --posted 0041,0028,0038 [--out archive.html]
 *
 * The plan: post on Instagram first, and let the website ACCUMULATE those same
 * entries as a browsable back catalogue. Someone who finds the IG account can
 * come to the site and read every pair posted so far — which is exactly the
 * "backfill the website with the content" idea.
 *
 * `--posted` is the ordered list of entry ids that have gone out, newest first.
 * In time this list is what the daily/weekly workflow appends to; for now it is
 * passed by hand. The page is a simple reverse-chronological grid of cards, each
 * linking to nothing yet (a per-entry page can come later).
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const POSTED = (arg("--posted", "") || "").split(",").map((s) => s.trim()).filter(Boolean);
const OUT = arg("--out", "archive.html");
const SITE_URL = arg("--site", process.env.SITE_URL ?? "https://aquamarine-biscochitos-58e5c1.netlify.app");

const BRAND = JSON.parse(readFileSync(join(ROOT, "brand.json"), "utf8"));
const C = BRAND.color;
const byId = new Map(
  readdirSync(join(ROOT, "bank")).filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")))
    .map((e) => [e.id, e])
);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

if (POSTED.length === 0) {
  console.error("No --posted ids given; nothing to archive. Pass --posted 0041,0028,...");
  process.exit(1);
}

const missing = POSTED.filter((id) => !byId.has(id));
if (missing.length) { console.error(`Unknown ids: ${missing.join(", ")}`); process.exit(1); }

const cards = POSTED.map((id) => {
  const e = byId.get(id);
  return `<article class="card">
  <div class="seam">
    <div class="side es"><small>ESPA\u00d1OL</small><b lang="es">${esc(e.es.text)}</b><i>${esc(e.es.literal)}</i></div>
    <div class="side it"><small>ITALIANO</small><b lang="it">${esc(e.it.text)}</b><i>${esc(e.it.literal)}</i></div>
  </div>
  <p class="mean">${esc(e.es.meaning)}</p>
</article>`;
}).join("\n");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Archive \u2014 ${BRAND.name}</title>
<meta name="description" content="Every Spanish\u2013Italian pair posted so far.">
<link rel="canonical" href="${SITE_URL}/archive.html">
<style>
  :root{color-scheme:light}
  body{background:${C.paper};color:${C.ink};margin:0;
       font-family:'IBM Plex Sans',system-ui,sans-serif;line-height:1.5}
  header{max-width:900px;margin:0 auto;padding:3rem 1.5rem 1rem}
  h1{font-family:Newsreader,Georgia,serif;font-weight:500;font-size:2rem;margin:0}
  .sub{color:${C.ink3};margin:.4rem 0 0}
  main{max-width:900px;margin:0 auto;padding:1.5rem;
       display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem}
  .card{background:${C.card};border:1px solid ${C.rule};border-radius:8px;padding:1.2rem 1.4rem}
  .seam{display:grid;grid-template-columns:1fr 1px 1fr;gap:0;align-items:start}
  .seam::before{content:"";grid-column:2;background:${C.rule};width:1px;height:100%;justify-self:center}
  .side{display:flex;flex-direction:column;padding:0 .8rem}
  .side small{font-family:'IBM Plex Mono',monospace;font-size:.6rem;letter-spacing:.15em}
  .side b{font-family:Newsreader,Georgia,serif;font-weight:500;font-size:1.15rem;margin:.2rem 0}
  .side i{color:${C.ink3};font-size:.82rem}
  .es small{color:${C.es}} .es b{color:${C.es}}
  .it small{color:${C.it}} .it b{color:${C.it}}
  .mean{margin:.9rem 0 0;padding-top:.8rem;border-top:1px solid ${C.rule};
        color:${C.ink2};font-size:.92rem}
  footer{max-width:900px;margin:0 auto;padding:2rem 1.5rem 4rem;color:${C.ink3};font-size:.85rem}
  a{color:${C.es}}
</style></head>
<body>
<header>
  <h1>The archive</h1>
  <p class="sub">Every pair posted so far \u00b7 ${POSTED.length} and counting \u00b7
  <a href="index.html">what this is</a></p>
</header>
<main>
${cards}
</main>
<footer>New pairs go up on <a href="https://instagram.com/${esc(BRAND.social.handles.instagram)}">@${esc(BRAND.social.handles.instagram)}</a> first and land here after.</footer>
</body></html>`;

writeFileSync(join(ROOT, "landing", OUT), html);
console.log(`landing/${OUT} \u2190 archive of ${POSTED.length} posted entries`);
