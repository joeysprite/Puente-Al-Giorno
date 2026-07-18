#!/usr/bin/env node
/**
 * Build the matching-practice page FROM THE BANK.
 *
 *   node tools/build-match.mjs   →  landing/match.html
 *
 * Three modes, picked by the visitor:
 *   es    — Spanish expressions ↔ their meanings
 *   it    — Italian expressions ↔ their meanings
 *   pair  — Spanish expression ↔ its Italian counterpart (the bridge as a game;
 *           counterparts, not always synonyms — the frittata pair still matches,
 *           and discovering WHY they differ is the point)
 *
 * Static, self-hosted fonts, all data inlined, no requests after load.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");

const bank = readdirSync(join(ROOT, "bank"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")))
  .filter((e) => e.review.status !== "retired")
  .sort((a, b) => (a.id < b.id ? -1 : 1));

const DATA = bank.map((e) => ({
  id: e.id,
  es: e.es.text,
  it: e.it.text,
  esM: e.es.meaning,
  itM: e.it.meaning,
}));

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>Practice — Un puente al giorno</title>
<meta name="description" content="Match Spanish and Italian expressions to their meanings — or to each other.">
<style>
  @font-face{font-family:'Newsreader';font-style:normal;font-weight:200 800;font-display:swap;
    src:url('fonts/newsreader-latin-opsz-normal.woff2') format('woff2-variations')}
  @font-face{font-family:'Newsreader';font-style:italic;font-weight:200 800;font-display:swap;
    src:url('fonts/newsreader-latin-opsz-italic.woff2') format('woff2-variations')}
  @font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:400;font-display:swap;
    src:url('fonts/ibm-plex-mono-latin-400-normal.woff2') format('woff2')}
  @font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:500;font-display:swap;
    src:url('fonts/ibm-plex-mono-latin-500-normal.woff2') format('woff2')}
  @font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:400;font-display:swap;
    src:url('fonts/ibm-plex-sans-latin-400-normal.woff2') format('woff2')}
  @font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:500;font-display:swap;
    src:url('fonts/ibm-plex-sans-latin-500-normal.woff2') format('woff2')}
  :root{
    color-scheme:light;
    --ink:#1C1B1A; --ink-2:#4C4A47; --ink-3:#605D59;
    --paper:#FAF6EE; --card:#FFFFFF; --rule:#E2D9C8;
    --es:#8C2F39; --it:#3D5A45; --ok:#3D5A45; --okbg:#E9F0EA; --badbg:#F6E7E4;
    --serif:'Newsreader',Georgia,serif;
    --mono:'IBM Plex Mono',ui-monospace,monospace;
    --sans:'IBM Plex Sans',system-ui,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);line-height:1.5;
       padding:2.5rem 1rem 5rem;-webkit-font-smoothing:antialiased}
  .wrap{max-width:720px;margin:0 auto}
  header{text-align:center;margin-bottom:1.6rem}
  .eyebrow{font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;
           text-transform:uppercase;color:var(--ink-3)}
  h1{font-family:var(--serif);font-weight:400;font-size:clamp(1.6rem,5vw,2.1rem);
     letter-spacing:-.01em;margin:.6rem 0 .4rem}
  .sub{color:var(--ink-2);font-size:.93rem;max-width:32rem;margin:0 auto}

  .modes{display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap;margin:1.4rem 0}
  .modes button{min-height:44px;padding:.55rem 1rem;border:1px solid var(--rule);
     border-radius:999px;background:var(--card);color:var(--ink);font-family:var(--sans);
     font-size:.9rem;cursor:pointer}
  .modes button[aria-pressed=true]{background:var(--ink);color:var(--paper);border-color:var(--ink)}
  .modes button:focus-visible{outline:3px solid var(--ink);outline-offset:2px}

  .status{text-align:center;font-family:var(--mono);font-size:.72rem;
     letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);margin-bottom:1rem;min-height:1.2em}

  .board{display:grid;grid-template-columns:1fr 1fr;gap:.6rem}
  .col{display:flex;flex-direction:column;gap:.6rem}
  .tile{min-height:64px;padding:.7rem .8rem;border:1px solid var(--rule);border-radius:6px;
     background:var(--card);font-size:.92rem;line-height:1.35;cursor:pointer;text-align:left;
     font-family:var(--sans);color:var(--ink);transition:transform .06s}
  .tile .exp{font-family:var(--serif);font-weight:500;font-size:1.02rem}
  .tile[data-side=es] .exp{color:var(--es)}
  .tile[data-side=it] .exp{color:var(--it)}
  .tile[aria-pressed=true]{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink)}
  .tile:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
  .tile.ok{background:var(--okbg);border-color:var(--ok);color:var(--ink-2);cursor:default}
  .tile.bad{background:var(--badbg);animation:sh .18s 2}
  @keyframes sh{25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
  @media (prefers-reduced-motion:reduce){.tile.bad{animation:none}}

  .again{display:block;margin:1.4rem auto 0;min-height:48px;padding:.8rem 1.4rem;
     font-family:var(--mono);font-size:.74rem;letter-spacing:.09em;text-transform:uppercase;
     background:var(--ink);color:var(--paper);border:1px solid var(--ink);border-radius:4px;cursor:pointer}
  .again:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
  footer{margin-top:2.5rem;text-align:center;font-family:var(--mono);font-size:.7rem;color:var(--ink-3)}
  footer a{color:inherit}
  @media(max-width:480px){.tile{font-size:.86rem}.tile .exp{font-size:.95rem}}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <p class="eyebrow">Un puente al giorno · practice</p>
    <h1>Match the pairs</h1>
    <p class="sub">Tap one on the left, then its partner on the right. In pair mode you're
    matching counterparts — which, as the frittata will teach you, is not always the same
    as matching meanings.</p>
  </header>

  <div class="modes" role="group" aria-label="Choose what to match">
    <button data-mode="es" aria-pressed="true">Español ↔ meaning</button>
    <button data-mode="it" aria-pressed="false">Italiano ↔ meaning</button>
    <button data-mode="pair" aria-pressed="false">Español ↔ Italiano</button>
  </div>

  <p class="status" role="status" aria-live="polite" id="status"></p>

  <div class="board">
    <div class="col" id="left"></div>
    <div class="col" id="right"></div>
  </div>

  <button class="again" id="again">New round</button>

  <footer><a href="/">← back to today's pair</a></footer>
</div>

<script>
const DATA = ${JSON.stringify(DATA)};
const N = 5;
let mode = "es", matched = 0, sel = { l: null, r: null }, round = [];

const $ = (s) => document.querySelector(s);
const shuffle = (a) => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };

function sample() {
  // no two tiles in a round may share display text — ambiguity isn't a puzzle, it's a bug
  const out = [], seen = new Set();
  for (const e of shuffle(DATA)) {
    const texts = mode === "pair" ? [e.es, e.it] : mode === "es" ? [e.es, e.esM] : [e.it, e.itM];
    if (texts.some((t) => seen.has(t))) continue;
    texts.forEach((t) => seen.add(t));
    out.push(e);
    if (out.length === N) break;
  }
  return out;
}

function tile(id, html, side, col) {
  const b = document.createElement("button");
  b.className = "tile"; b.dataset.id = id; b.dataset.col = col;
  if (side) b.dataset.side = side;
  b.setAttribute("aria-pressed", "false");
  b.innerHTML = html;
  b.addEventListener("click", () => pick(b));
  return b;
}

function render() {
  matched = 0; sel = { l: null, r: null };
  round = sample();
  const L = $("#left"), R = $("#right");
  L.innerHTML = ""; R.innerHTML = "";
  const left = shuffle(round), right = shuffle(round);
  for (const e of left) {
    if (mode === "pair") L.appendChild(tile(e.id, '<span class="exp" lang="es">'+e.es+'</span>', "es", "l"));
    else if (mode === "es") L.appendChild(tile(e.id, '<span class="exp" lang="es">'+e.es+'</span>', "es", "l"));
    else L.appendChild(tile(e.id, '<span class="exp" lang="it">'+e.it+'</span>', "it", "l"));
  }
  for (const e of right) {
    if (mode === "pair") R.appendChild(tile(e.id, '<span class="exp" lang="it">'+e.it+'</span>', "it", "r"));
    else R.appendChild(tile(e.id, '<span lang="en">'+(mode === "es" ? e.esM : e.itM)+'</span>', null, "r"));
  }
  say(matched + " of " + N + " matched");
}

function say(t) { $("#status").textContent = t; }

function pick(b) {
  if (b.classList.contains("ok")) return;
  const k = b.dataset.col;
  if (sel[k]) sel[k].setAttribute("aria-pressed", "false");
  sel[k] = b; b.setAttribute("aria-pressed", "true");
  if (sel.l && sel.r) {
    if (sel.l.dataset.id === sel.r.dataset.id) {
      [sel.l, sel.r].forEach((t) => { t.classList.add("ok"); t.setAttribute("aria-pressed","false"); t.disabled = true; });
      matched++;
      say(matched === N ? "All " + N + " matched — nicely done. New round?" : matched + " of " + N + " matched");
    } else {
      [sel.l, sel.r].forEach((t) => { t.classList.add("bad"); t.setAttribute("aria-pressed","false"); });
      setTimeout(() => [sel.l, sel.r].forEach((t) => t && t.classList.remove("bad")), 400);
      say("Not partners — try again");
    }
    sel = { l: null, r: null };
  }
}

document.querySelectorAll(".modes button").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".modes button").forEach((x) => x.setAttribute("aria-pressed", "false"));
    b.setAttribute("aria-pressed", "true");
    mode = b.dataset.mode;
    render();
  })
);
$("#again").addEventListener("click", render);
render();
</script>
</body>
</html>`;

writeFileSync(join(ROOT, "landing", "match.html"), HTML);
console.log(`landing/match.html ← ${DATA.length} active entries, 3 modes`);
