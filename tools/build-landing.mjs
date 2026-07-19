#!/usr/bin/env node
/**
 * Build the landing page FROM THE BANK.
 *
 *   node tools/build-landing.mjs   →  landing/index.html
 *
 * The hero is not marketing copy about the product; it is the product — a real,
 * validated entry rendered the way the email will render it. Generating the page
 * from bank JSON means the demo can never drift from what subscribers actually
 * get, and an entry edit propagates on the next build.
 *
 * The form posts to a placeholder. Wire it to Buttondown / ConvertKit / Formspark
 * by replacing FORM_ACTION. The one extra field — "I'm starting from" — is the
 * cheapest possible test of the English-rail assumption and of demand for
 * directional (L1-aware) experiences. Zero dependencies.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildYear } from "./schedule.mjs";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const FORM_ACTION = "https://buttondown.com/api/emails/embed-subscribe/unpuentealgiorno";

const BRAND = JSON.parse(readFileSync(join(ROOT, "brand.json"), "utf8"));
const C = BRAND.color, F = BRAND.font;
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };

const IDS = arg("--entries", "0012,0007,0015").split(",");
const OUT = arg("--out", "index.html");
const CARD = arg("--card", "compact");
// --waitlist: the page cannot promise a daily email until entries are approved
// and the renderer exists. This mode says so, and adds noindex for soft launch.
const WAITLIST = argv.includes("--waitlist");
const SITE_URL = arg("--site", process.env.SITE_URL ?? "https://aquamarine-biscochitos-58e5c1.netlify.app"); // compact = expression/lit/meaning; full = + example/translation per side

// Headline is derived from the hero entry unless overridden. Copy that names the
// entry is the only copy that can't drift from the bank.

const entry = (id) => JSON.parse(readFileSync(join(ROOT, "bank", `${id}.json`), "utf8"));

// The showcase: the false friend. It demonstrates the moat in one glance —
// a single-language product structurally cannot produce the bridge row.
let ids = IDS;
if (argv.includes("--today")) {
  const bank = readdirSync(join(ROOT, "bank")).filter(f => f.endsWith(".json"))
    .map(f => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")));
  const events = JSON.parse(readFileSync(join(ROOT, "events.json"), "utf8"));
  const overrides = JSON.parse(readFileSync(join(ROOT, "overrides.json"), "utf8"));
  const day = (n) => { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d.toISOString().slice(0, 10); };
  const years = [...new Set([0, 1, 2].map(n => Number(day(n).slice(0, 4))))];
  const sched = new Map();
  for (const y of years) for (const [k, v] of buildYear(y, bank, events, overrides).schedule) sched.set(k, v);
  const picked = [0, 1, 2].map(n => sched.get(day(n))?.id).filter(Boolean);
  if (picked.length === 3) {
    ids = picked;
    console.log(`--today: schedule says ${picked.join(", ")}`);
  } else {
    console.log("--today: no approved schedule yet — falling back to hand-picked entries");
  }
}
const [hero, second, third] = ids.map(entry);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function side(e, lang, label) {
  const x = e[lang];
  const full = CARD === "full"
    ? `<span class="ex-block"><span class="ex-src" lang="${lang}">${esc(x.example)}</span><span class="ex-tr" lang="en">${esc(x.exampleTranslation)}</span></span>`
    : "";
  return `<span class="side" lang="${lang}"><small lang="en">${label}</small><b>${esc(x.text)}</b><i>lit. “${esc(x.literal)}”</i><span class="mean" lang="en">${esc(x.meaning)}</span>${full}</span>`;
}

function card(e, { open = false, dayOffset = 0, hook = false } = {}) {
  const dateLbl = dayOffset === 0 ? "Today" : dayOffset === -1 ? "Yesterday" : "";
  // Hook shown only if the ENTRY carries one — no auto-generated fallback.
  // ("Menos mal is not meno male" would be false; better silence than a wrong template.)
  const hookHtml = hook && e.hook
    ? `<span class="hook"><span class="hook-h">${e.hook.headline}</span><span class="hook-sub">${esc(e.hook.subhead)}</span></span>`
    : "";
  const combinedEx = CARD === "full" ? "" :
    `<p class="ex"><span lang="es">${esc(e.es.example)}</span> · <span lang="it">${esc(e.it.example)}</span></p>`;
  return `
  <details class="card" ${open ? "open" : ""}>
    <summary>
      <span class="datebar"><span class="date-lbl">${dateLbl}</span><span class="date-d" data-day-offset="${dayOffset}">${dateLbl || "…"}</span></span>
      ${hookHtml}
      <span class="pair">
        ${side(e, "es", "Español")}
        ${side(e, "it", "Italiano")}
      </span>
    </summary>
    <div class="body">
      <p class="bridge"><span class="bridge-lbl">Bridge</span>${esc(e.bridge.note)}</p>
      ${e.bridge.interference.es_to_it ? `<p class="trap"><span class="dir">es → it</span> ${esc(e.bridge.interference.es_to_it)}</p>` : ""}
      ${e.bridge.interference.it_to_es ? `<p class="trap"><span class="dir">it → es</span> ${esc(e.bridge.interference.it_to_es)}</p>` : ""}
      ${combinedEx}
    </div>
  </details>`;
}

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
${WAITLIST ? '<meta name="robots" content="noindex">' : ""}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23FAF6EE'/%3E%3Ctext x='8' y='22' font-family='Georgia' font-size='16' fill='%238C2F39'%3Ep%3C/text%3E%3Ctext x='17' y='22' font-family='Georgia' font-size='16' fill='%233D5A45'%3Eg%3C/text%3E%3C/svg%3E">
<link rel="canonical" href="${SITE_URL}/">
<meta property="og:url" content="${SITE_URL}/">
<meta property="og:title" content="Un puente al giorno">
<meta property="og:description" content="One Spanish–Italian expression pair a day — and the exact mistake speakers of one make in the other.">
<meta property="og:type" content="website">
<meta property="og:image" content="${SITE_URL}/cards/${hero.id}.png">
<meta property="og:image" content="cards/${hero.id}.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${SITE_URL}/cards/${hero.id}.png">
<title>Un puente al giorno — one idiom pair a day, Spanish ↔ Italian</title>
<meta name="description" content="A daily email pairing one Spanish and one Italian expression — and the exact mistake speakers of one make in the other.">
<style>
  /* Self-hosted fonts (Fontsource builds of the OFL originals). No visitor data
     leaves this host to load type — the Google Fonts CDN transmitted IPs. */
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
</style>
<style>
  :root{
    color-scheme:light;
    --ink:${C.ink}; --ink-2:${C.ink2}; --ink-3:${C.ink3};
    --paper:${C.paper}; --card:${C.card}; --rule:${C.rule};
    --es:#8C2F39;   /* carmine — Spanish labels only */
    --it:#3D5A45;   /* laurel — Italian labels only */
    --serif:'Newsreader',Georgia,serif;
    --mono:'IBM Plex Mono',ui-monospace,monospace;
    --sans:'IBM Plex Sans',system-ui,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);
       line-height:1.55;-webkit-font-smoothing:antialiased}
  .wrap{max-width:720px;margin:0 auto;padding:0 1.25rem}

  header{padding:4.5rem 0 0;text-align:center}
  .eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;
           text-transform:uppercase;color:var(--ink-3)}
  h1{font-family:var(--serif);font-weight:400;font-size:clamp(1.7rem,5vw,2.3rem);
     letter-spacing:-.015em;line-height:1.15;margin:.8rem 0 .7rem}
  .hook{display:block;text-align:center;margin:0 0 1.1rem}
  .hook-h{display:block;font-family:var(--serif);font-weight:400;
     font-size:clamp(1.35rem,4.5vw,1.8rem);letter-spacing:-.01em;line-height:1.22}
  .hook-sub{display:block;font-size:.92rem;color:var(--ink-2);margin-top:.55rem;
     max-width:34rem;margin-left:auto;margin-right:auto}
  h1 .es-w{color:var(--es)} h1 .it-w{color:var(--it)}
  .lede{font-size:1.05rem;color:var(--ink-2);max-width:34rem;margin:0 auto}

  /* ── the seam: two languages meeting at a rule, bridge spanning both ── */
  .card{background:var(--card);border:1px solid var(--rule);border-radius:6px;
        margin:1.1rem 0;overflow:hidden}
  .datebar{display:block;border-bottom:1px dashed var(--rule);padding:0 0 .65rem;
        margin:-.35rem -0 .9rem;text-align:center}
  .date-lbl{display:block;font-family:var(--mono);font-size:.6rem;letter-spacing:.18em;
        text-transform:uppercase;color:var(--ink-3)}
  .date-d{display:block;font-family:var(--serif);font-weight:500;font-size:.98rem;margin-top:.1rem}
  summary{list-style:none;cursor:pointer;padding:1.35rem 1.5rem}
  summary::-webkit-details-marker{display:none}
  summary:focus-visible{outline:3px solid var(--ink);outline-offset:-3px}
  .pair{display:grid;grid-template-columns:1fr 1fr}
  .side{display:block;padding-right:1.4rem}
  .side+.side{border-left:1px solid var(--rule);padding-left:1.4rem;padding-right:0}
  .side small{display:block;font-family:var(--mono);font-size:.62rem;
        letter-spacing:.13em;text-transform:uppercase;margin-bottom:.45rem}
  [lang=es] small{color:var(--es)} [lang=it] small{color:var(--it)}
  .side b{display:block;font-family:var(--serif);font-weight:500;font-size:1.55rem;
        letter-spacing:-.01em;line-height:1.2}
  .side[lang=es] b{color:var(--es)} .side[lang=it] b{color:var(--it)}
  .side i{display:block;font-family:var(--serif);font-style:italic;
        font-size:.92rem;color:var(--ink-3);margin-top:.3rem}
  .side .mean{display:block;font-family:var(--sans);font-size:.88rem;
        color:var(--ink-2);margin-top:.45rem;line-height:1.45}
  .ex-block{display:block;margin-top:.7rem;padding-top:.6rem;border-top:1px dotted var(--rule)}
  .ex-src{display:block;font-family:var(--serif);font-size:.95rem;line-height:1.45;color:var(--ink)}
  .ex-tr{display:block;font-family:var(--sans);font-size:.82rem;color:var(--ink-3);margin-top:.25rem;line-height:1.4}
  .body{padding:0 1.5rem 1.4rem;border-top:1px dashed var(--rule);padding-top:1.15rem}
  .bridge{font-family:var(--serif);font-style:italic;font-size:1.06rem;
        line-height:1.55;color:var(--ink)}
  .bridge-lbl{display:block;font-family:var(--mono);font-style:normal;font-size:.62rem;
        letter-spacing:.13em;text-transform:uppercase;color:${C.amber};margin-bottom:.3rem}
  .trap{margin-top:.8rem;font-size:.9rem;color:var(--ink-2)}
  .dir{font-family:var(--mono);font-size:.66rem;letter-spacing:.08em;
       text-transform:uppercase;border:1px solid var(--rule);border-radius:2px;
       padding:.1rem .35rem;margin-right:.45rem;color:var(--ink-3);white-space:nowrap}
  .ex{margin-top:.9rem;font-family:var(--serif);font-size:.95rem;color:var(--ink-2)}
  .hint-open{text-align:center;font-family:var(--mono);font-size:.68rem;
       letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);margin:.4rem 0 0}

  section{padding:2.6rem 0}
  .divide{border:0;border-top:1px solid var(--rule);margin:0}

  /* form */
  form{background:var(--card);border:1px solid var(--rule);border-radius:6px;
       padding:1.75rem 1.5rem}
  form h2{font-family:var(--serif);font-weight:400;font-size:1.5rem;margin-bottom:.35rem}
  form .sub{color:var(--ink-2);font-size:.94rem;margin-bottom:1.4rem}
  label{display:block;font-family:var(--mono);font-size:.66rem;letter-spacing:.1em;
        text-transform:uppercase;color:var(--ink-2);margin-bottom:.45rem}
  input[type=email]{width:100%;min-height:48px;font-size:1rem;font-family:var(--sans);
        padding:.7rem .8rem;border:1px solid var(--rule);border-radius:4px;
        background:var(--paper);color:var(--ink)}
  input[type=email]:focus{outline:3px solid var(--ink);outline-offset:1px;background:#fff}
  fieldset{border:0;margin:1.25rem 0 0}
  legend{font-family:var(--mono);font-size:.66rem;letter-spacing:.1em;
        text-transform:uppercase;color:var(--ink-2);margin-bottom:.55rem;padding:0}
  .pills{display:flex;gap:.5rem;flex-wrap:wrap}
  .pill input{position:absolute;opacity:0;width:1px;height:1px}
  .pill span{display:inline-block;min-height:44px;line-height:1.2;display:flex;
        align-items:center;padding:.55rem .95rem;border:1px solid var(--rule);
        border-radius:999px;font-size:.9rem;cursor:pointer;background:var(--paper)}
  .pill input:checked+span{background:var(--ink);color:var(--paper);border-color:var(--ink)}
  .pill input:focus-visible+span{outline:3px solid var(--ink);outline-offset:2px}
  .why{font-size:.8rem;color:var(--ink-3);margin-top:.6rem}
  button{margin-top:1.4rem;width:100%;min-height:50px;font-family:var(--mono);
       font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;
       background:var(--ink);color:var(--paper);border:1px solid var(--ink);
       border-radius:4px;cursor:pointer}
  button:hover{opacity:.85}
  button:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
  .fine{font-size:.78rem;color:var(--ink-3);margin-top:.9rem;text-align:center}

  .props{display:grid;gap:1.4rem}
  .prop b{font-family:var(--serif);font-weight:500;font-size:1.08rem;display:block;margin-bottom:.2rem}
  .prop p{font-size:.93rem;color:var(--ink-2);max-width:56ch}

  footer{padding:2.5rem 0 4rem;text-align:center;font-family:var(--mono);
       font-size:.7rem;letter-spacing:.06em;color:var(--ink-3)}
  footer a{color:inherit}

  @media(max-width:560px){
    .pair{grid-template-columns:1fr;gap:.9rem}
    .side{padding-right:0}
    .side+.side{border-left:0;border-top:1px solid var(--rule);padding-left:0;padding-top:.9rem}
    header{padding-top:3rem}
  }
  @media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>

<header class="wrap">
  <p class="eyebrow">${WAITLIST ? "Opening soon · Spanish ↔ Italian" : "A daily email · Spanish ↔ Italian"}</p>
  <h1>Un puente al giorno</h1>
  <p class="lede">One Spanish–Italian expression pair a day — what carries across, what
  doesn't, and the exact mistake speakers of one make in the other.${WAITLIST
    ? " Being written now, one entry at a time. Put your name down and you'll get the first one."
    : " By email, free."}</p>
</header>

<section class="wrap" aria-label="Today's entry, as the email renders it">
  ${card(hero, { open: true, dayOffset: 0, hook: true })}
  <p class="hint-open">${WAITLIST
    ? "↑ a real entry from the bank — this is what one day looks like"
    : "↑ one of these arrives every day — this is today's"}</p>
  ${card(second, { dayOffset: -1 })}
  ${card(third, { dayOffset: -2 })}
</section>

<div class="wrap"><hr class="divide"></div>

<section class="wrap">
  <form method="post" action="${FORM_ACTION}" target="_blank">
    <input type="hidden" name="embed" value="1">
    <h2>${WAITLIST ? "Be there for entry one" : "Get tomorrow's pair"}</h2>
    <p class="sub">${WAITLIST
      ? "Every entry is checked by a native speaker of each language before it is sent — which is why there is a wait. When the first one goes out, you get it."
      : "Free, daily, one email. No app, no streaks, no owl."}</p>

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required autocomplete="email"
           placeholder="you@example.com">

    <fieldset>
      <legend>I'm starting from</legend>
      <div class="pills">
        <label class="pill"><input type="radio" name="metadata__l1" value="en" checked><span>English</span></label>
        <label class="pill"><input type="radio" name="metadata__l1" value="es"><span>Español</span></label>
        <label class="pill"><input type="radio" name="metadata__l1" value="it"><span>Italiano</span></label>
      </div>
      <p class="why">The warnings are directional — what trips a Spanish speaker in Italian
      isn't what trips an Italian in Spanish. This picks your side.</p>
    </fieldset>

    <button type="submit">${WAITLIST ? "Join the waitlist" : "Send me the daily pair"}</button>
    <p class="fine">${WAITLIST ? "No email until the first issue is ready. " : ""}Unsubscribe any time.
    We store your address, your start date, and this one answer — nothing else.
    <a href="privacy.html">Privacy</a>.</p>
  </form>
</section>

<section class="wrap props">
  <div class="prop"><b>The bridge is the point.</b>
    <p>Dictionaries treat each language alone. The daily entry lives in the gap between
    them: shared metaphors, false friends, the auxiliary that flips, the article that
    appears in one language and vanishes in the other.</p></div>
  <div class="prop"><b>Traps outrank trivia.</b>
    <p>Charming twin idioms are rationed. Most days teach something you would otherwise
    get wrong — the errors that fossilise and the ones that cost marks in a DELE or
    CILS oral.</p></div>
  <div class="prop"><b>The calendar knows.</b>
    <p>Seasonal expressions arrive in season. Holiday formulas land on the holiday — on
    Mexico's Mother's Day <em>and</em> Italy's, which are not the same Sunday.</p></div>
</section>

<footer>
  <a href="match.html">practice matching →</a> · entry no. ${hero.id} · built ${new Date().toISOString().slice(0, 10)} ·
  every entry is checked against <a href="https://dle.rae.es" rel="noopener">RAE</a>,
  <a href="https://www.treccani.it" rel="noopener">Treccani</a> and De Mauro before it is sent
</footer>

<script>
  (function(){
    var f = new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'long'});
    document.querySelectorAll('[data-day-offset]').forEach(function(el){
      var d = new Date(); d.setDate(d.getDate() + Number(el.dataset.dayOffset));
      el.textContent = f.format(d);
    });
  })();
</script>
</body>
</html>`;

mkdirSync(join(ROOT, "landing"), { recursive: true });
writeFileSync(join(ROOT, "landing", OUT), HTML);
console.log(`landing/${OUT} ← entries ${hero.id}, ${second.id}, ${third.id}`);
console.log(`form → ${FORM_ACTION} (l1 posts as metadata__l1)`);
