#!/usr/bin/env node
/**
 * The desk.  node tools/serve.mjs  →  http://localhost:4173
 *
 * Read the upcoming schedule; force a different expression onto a day.
 *
 * The ONLY thing this writes is overrides.json. That is not a limitation, it is
 * the design: the schedule is a pure function of (date, bank, events, overrides),
 * so a rotation day is not a thing you can edit — it is a thing you can DISPLACE.
 * Every edit made here is therefore an override, with a reason attached, landing
 * as a git diff you can review like any other change.
 *
 * Zero dependencies.
 */

import { createServer } from "node:http";
import {
  ROOT, scheduleRange, validateOverride, writeOverride, removeOverride,
} from "./desk-rules.mjs";

const PORT = Number(process.env.PORT ?? 4173);
// ────────────────────────────────────────────────────────────────── server

const json = (res, code, body) => {
  res.writeHead(code, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
};

const readBody = (req) =>
  new Promise((ok) => {
    let b = "";
    req.on("data", (c) => (b += c));
    req.on("end", () => ok(b ? JSON.parse(b) : {}));
  });

createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");

  if (url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(HTML);
  }

  if (url.pathname === "/api/schedule") {
    const from = url.searchParams.get("from") ?? today();
    const to = url.searchParams.get("to") ?? addDays(from, 59);
    try {
      return json(res, 200, scheduleRange(from, to));
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  if (url.pathname === "/api/check" && req.method === "POST") {
    return json(res, 200, validateOverride(await readBody(req)));
  }

  if (url.pathname === "/api/override" && req.method === "POST") {
    const body = await readBody(req);
    const v = validateOverride(body);
    if (v.problems.length) return json(res, 400, v);
    writeOverride(body);
    return json(res, 200, { ok: true, ...v });
  }

  if (url.pathname === "/api/override" && req.method === "DELETE") {
    const body = await readBody(req);
    removeOverride(body.date);
    return json(res, 200, { ok: true });
  }

  res.writeHead(404);
  res.end("not found");
}).listen(PORT, () => {
  console.log(`\n  The desk is open → http://localhost:${PORT}`);
  console.log(`  Reading ${ROOT}`);
  console.log(`  Edits are written to overrides.json. Commit them like any other change.\n`);
});

// ──────────────────────────────────────────────────────────────────── UI

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The desk — idiom bank</title>
<style>
  /* The four placement mechanisms are the only thing colour is spent on.
     Rotation gets no colour: it is the default state, and colouring the default
     would be decoration rather than information. */
  :root{
    --ink:#191B1F; --ink-2:#4A5058; --ink-3:#5E646C;
    --paper:#EDEEF0; --surface:#FFF; --rule:#D8DBDF;
    --override:#A32E6B;   /* the hand of the editor */
    --event:#0E6B6B;      /* an occasion */
    --pin:#34409A;        /* fixed to a date */
    --rotation:#7B8189;   /* free. the quietest thing that still passes 3:1. */
    --warn:#8A5B0B;
    --serif:Georgia,'Times New Roman',serif;
    --mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;
    --sans:system-ui,-apple-system,sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--paper);color:var(--ink);font-family:var(--sans);
       -webkit-font-smoothing:antialiased;padding:0 0 8rem}
  header{position:sticky;top:0;z-index:20;background:var(--paper);
         border-bottom:1px solid var(--rule);padding:1.5rem 2rem 1rem}
  .wrap{max-width:1020px;margin:0 auto}
  h1{font-family:var(--serif);font-weight:400;font-size:1.9rem;letter-spacing:-.01em}
  h1 em{font-style:italic;color:var(--ink-2)}
  .sub{font-family:var(--mono);font-size:.72rem;text-transform:uppercase;
       letter-spacing:.09em;color:var(--ink-3);margin-top:.35rem}
  .legend{display:flex;gap:1.1rem;margin-top:1rem;flex-wrap:wrap}
  .key{display:flex;align-items:center;gap:.4rem;font-family:var(--mono);
       font-size:.68rem;text-transform:uppercase;letter-spacing:.07em;color:var(--ink-2)}
  .swatch{width:3px;height:14px;border-radius:2px}

  main{max-width:1020px;margin:0 auto;padding:2rem}

  /* The signature: a continuous spine down the page. Scan a month and the locked
     days stand out from the free ones as bands of colour. */
  .day{display:grid;grid-template-columns:5.5rem 1fr;gap:1.25rem;width:100%;
       position:relative;padding:.85rem 0 .85rem 1rem;border:0;border-bottom:1px solid var(--rule);
       border-radius:0;background:transparent;color:inherit;text-align:left;font:inherit;
       cursor:pointer;transition:background .12s}
  .day:focus-visible{outline:3px solid var(--pin);outline-offset:-3px;background:var(--surface)}
  button:focus-visible{outline:3px solid var(--pin);outline-offset:2px}
  .day:hover{background:var(--surface)}
  .day::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--spine)}
  .day[data-layer=rotation]{--spine:var(--rotation);--label:var(--ink-2)}
  .day[data-layer=event]{--spine:var(--event);--label:var(--event)}
  .day[data-layer=pin]{--spine:var(--pin);--label:var(--pin)}
  .day[data-layer=override]{--spine:var(--override);--label:var(--override)}
  .day.today{background:var(--surface)}
  .day.today::after{content:"today";position:absolute;right:0;top:.9rem;
       font-family:var(--mono);font-size:.6rem;letter-spacing:.1em;
       text-transform:uppercase;color:var(--ink-3)}

  .when{font-family:var(--mono);font-size:.75rem;color:var(--ink-2);padding-top:.15rem;line-height:1.5}
  .when b{display:block;font-weight:600;color:var(--ink);font-size:.82rem}
  .dow{color:var(--ink-3)}

  .pair{display:grid;grid-template-columns:1fr 1fr;gap:0}
  .when,.meta,.note,.lang{display:block}
  .lang{font-family:var(--serif);font-size:1.12rem;line-height:1.35;padding-right:1.25rem}
  .lang+.lang{border-left:1px solid var(--rule);padding-left:1.25rem;padding-right:0}
  .lang small{display:block;font-family:var(--mono);font-size:.6rem;letter-spacing:.11em;
       text-transform:uppercase;color:var(--ink-3);margin-bottom:.25rem}

  .meta{margin-top:.5rem;display:flex!important;gap:.6rem;align-items:center;flex-wrap:wrap}
  .mech{font-family:var(--mono);font-size:.66rem;letter-spacing:.06em;
        text-transform:uppercase;color:var(--label);font-weight:600}
  .tag{font-family:var(--mono);font-size:.62rem;color:var(--ink-3);
       border:1px solid var(--rule);border-radius:2px;padding:.08rem .3rem}
  .note{display:block;margin-top:.5rem;font-family:var(--serif);font-style:italic;
        font-size:.9rem;color:var(--ink-2);line-height:1.5;max-width:62ch}

  /* editor */
  .scrim{position:fixed;inset:0;background:rgba(25,27,31,.35);opacity:0;pointer-events:none;
         transition:opacity .18s;z-index:30}
  .scrim.on{opacity:1;pointer-events:auto}
  .panel{position:fixed;top:0;right:0;bottom:0;width:min(520px,100%);background:var(--surface);
         border-left:1px solid var(--rule);transform:translateX(100%);transition:transform .22s cubic-bezier(.4,0,.2,1);
         z-index:40;overflow-y:auto;padding:2rem;visibility:hidden}
  .panel.on{transform:none;visibility:visible}
  .panel h2{font-family:var(--serif);font-weight:400;font-size:1.4rem;margin-bottom:.2rem}
  .panel .now{font-family:var(--mono);font-size:.68rem;text-transform:uppercase;
       letter-spacing:.08em;color:var(--ink-3);margin-bottom:1.5rem}
  label{display:block;font-family:var(--mono);font-size:.66rem;text-transform:uppercase;
        letter-spacing:.08em;color:var(--ink-2);margin:1.25rem 0 .4rem}
  input,select,textarea{width:100%;font-family:var(--sans);font-size:1rem;min-height:44px;padding:.6rem .65rem;
        border:1px solid var(--rule);border-radius:3px;background:var(--paper);color:var(--ink)}
  input:focus,select:focus,textarea:focus{outline:2px solid var(--pin);outline-offset:1px;background:#fff}
  select{font-family:var(--serif);font-size:1rem}
  textarea{min-height:4.5rem;resize:vertical}
  .hint{font-size:.78rem;color:var(--ink-3);margin-top:.35rem;line-height:1.45}
  .msg{margin-top:1.1rem;padding:.7rem .8rem;border-radius:3px;font-size:.84rem;line-height:1.5}
  .msg.bad{background:#FBEDF3;border-left:3px solid var(--override);color:#6E1C48}
  .msg.warn{background:#FAF3E6;border-left:3px solid var(--warn);color:#6B4708}
  .msg.ok{background:#E8F2F2;border-left:3px solid var(--event);color:#0A4A4A}
  .actions{display:flex;gap:.6rem;margin-top:1.75rem}
  button{font-family:var(--mono);font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;
     padding:.8rem 1.1rem;min-height:44px;border:1px solid var(--ink);border-radius:3px;background:var(--ink);
     color:#fff;cursor:pointer;transition:opacity .12s}
  button:hover{opacity:.82}
  button.ghost{background:transparent;color:var(--ink)}
  button.danger{background:transparent;color:var(--override);border-color:var(--override)}
  button:disabled{opacity:.35;cursor:not-allowed}
  .empty{padding:4rem 0;text-align:center;color:var(--ink-3);font-family:var(--mono);font-size:.8rem}
  @media (prefers-reduced-motion:reduce){*{transition:none!important}}
  /* Phone: the ES/IT columns stack, the date moves above the pair, and the panel
     goes full-bleed. The two-column pair is the whole point of the product, so it
     is the last thing to give way — but at 380px it must. */
  @media(max-width:760px){
    header{padding:1.1rem 1.25rem .85rem}
    h1{font-size:1.45rem}
    main{padding:1.25rem}
    .day{grid-template-columns:1fr;gap:.5rem;padding:1rem 0 1rem .9rem}
    .when{display:flex;gap:.5rem;align-items:baseline}
    .when b{display:inline}
    .pair{grid-template-columns:1fr;gap:.55rem}
    .lang+.lang{border-left:0;border-top:1px solid var(--rule);padding-left:0;padding-top:.55rem}
    .lang{padding-right:0}
    .day.today::after{position:static;display:inline-block;margin-left:.4rem}
    .panel{padding:1.5rem 1.25rem}
    .actions{flex-wrap:wrap}
    .actions button{flex:1 1 auto}
  }
</style>
</head>
<body>
<header><div class="wrap">
  <h1>The desk <em>— what goes out, and when</em></h1>
  <div class="sub">Click any day to force a different expression onto it</div>
  <div class="legend">
    <span class="key"><span class="swatch" aria-hidden="true" style="background:var(--rotation)"></span>rotation</span>
    <span class="key"><span class="swatch" aria-hidden="true" style="background:var(--event)"></span>occasion</span>
    <span class="key"><span class="swatch" aria-hidden="true" style="background:var(--pin)"></span>pinned</span>
    <span class="key"><span class="swatch" aria-hidden="true" style="background:var(--override)"></span>forced by you</span>
  </div>
</div></header>

<main><div id="days" class="empty" role="status" aria-live="polite">Reading the bank…</div></main>

<div class="scrim" id="scrim" aria-hidden="true"></div>
<aside class="panel" id="panel" role="dialog" aria-modal="true" aria-labelledby="p-date" inert>
  <h2 id="p-date"></h2>
  <div class="now" id="p-now"></div>

  <label for="p-pick">Feature instead</label>
  <select id="p-pick"></select>
  <div class="hint" id="p-hint"></div>

  <label for="p-why">Why</label>
  <textarea id="p-why" placeholder="Sponsor tie-in. Topical. Fixing a bad send."></textarea>
  <div class="hint">This lands in overrides.json and in the git history. Six months from now it is the only thing that will explain the day.</div>

  <div id="p-msgs" role="status" aria-live="polite"></div>

  <div class="actions">
    <button id="p-save">Force this day</button>
    <button class="ghost" id="p-cancel">Cancel</button>
    <button class="danger" id="p-clear" style="display:none">Release day</button>
  </div>
</aside>

<script>
const $ = (s) => document.querySelector(s);
const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let CAT = [], ROWS = [], active = null;

const today = new Date().toISOString().slice(0,10);

async function refresh(){
  const r = await fetch('/api/schedule?from=' + today);
  const d = await r.json();
  ROWS = d.rows; CAT = d.catalogue;
  render();
}

function render(){
  const host = $('#days');
  if(!ROWS.length){ host.className='empty'; host.textContent='Nothing scheduled.'; return; }
  host.className='';
  host.innerHTML = ROWS.map(r => {
    const dt = new Date(r.date + 'T00:00:00Z');
    const mech = r.layer === 'rotation' ? 'rotation'
      : r.layer === 'override' ? 'forced — ' + r.reason.replace(/^override — /,'')
      : r.reason;
    const full = dt.toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'});
    return \`<button type="button" class="day \${r.date===today?'today':''}" data-layer="\${r.layer}" data-date="\${r.date}"
        aria-label="\${full}. Currently \${r.es} / \${r.it}, placed by \${mech}. Activate to change.">
      <span class="when"><b>\${dt.getUTCDate()} \${dt.toLocaleString('en',{month:'short',timeZone:'UTC'})}</b>
        <span class="dow">\${DOW[dt.getUTCDay()]}</span></span>
      <span>
        <span class="pair">
          <span class="lang" lang="es"><small lang="en">Español</small>\${r.es}</span>
          <span class="lang" lang="it"><small lang="en">Italiano</small>\${r.it}</span>
        </span>
        <span class="meta">
          <span class="mech">\${mech}</span>
          \${r.cefr?'<span class="tag">'+r.cefr+'</span>':''}
          \${r.tags.map(t=>'<span class="tag">'+t.replace(/_/g,' ')+'</span>').join('')}
        </span>
        \${r.footnote?'<span class="note">'+r.footnote+'</span>':''}
      </span>
    </button>\`;
  }).join('');
  host.querySelectorAll('.day').forEach(el =>
    el.addEventListener('click', () => open(el.dataset.date)));
}

let opener = null;

function open(date){
  const row = ROWS.find(r => r.date === date);
  active = date;
  opener = document.querySelector(\`.day[data-date="\${date}"]\`);
  const dt = new Date(date + 'T00:00:00Z');
  $('#p-date').textContent = dt.toLocaleDateString('en',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
  $('#p-now').textContent = 'Currently: ' + row.es + ' / ' + row.it + ' — ' + row.reason;

  $('#p-pick').innerHTML = '<option value="">— choose an expression —</option>' +
    CAT.map(c => \`<option value="\${c.id}">\${c.es} / \${c.it}\${c.eventExclusive?'  (event-only)':''}</option>\`).join('');
  $('#p-now').setAttribute('lang','en');
  $('#p-pick').value = '';
  $('#p-why').value = row.layer === 'override' ? row.reason.replace(/^override — /,'') : '';
  $('#p-msgs').innerHTML = '';
  $('#p-hint').textContent = '';
  $('#p-clear').style.display = row.layer === 'override' ? 'inline-block' : 'none';
  $('#panel').removeAttribute('inert');
  $('#scrim').classList.add('on'); $('#panel').classList.add('on');
  document.body.style.overflow = 'hidden';
  $('#p-pick').focus();
}

// Keep focus inside the dialog while it is open, and hand it back to the day you
// came from when it closes. Without this, tabbing walks out of the panel and into
// the schedule behind it, which for a keyboard or screen-reader user means the
// dialog effectively does not exist.
$('#panel').addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const f = [...$('#panel').querySelectorAll('select,textarea,button,input')]
    .filter(el => el.offsetParent !== null && !el.disabled);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

function close(){
  $('#scrim').classList.remove('on');
  $('#panel').classList.remove('on');
  $('#panel').setAttribute('inert', '');   // out of the tab order AND the a11y tree
  document.body.style.overflow = '';
  active = null;
  if (opener) { opener.focus(); opener = null; }
}

async function check(){
  const id = $('#p-pick').value;
  if(!id){ $('#p-msgs').innerHTML=''; return; }
  const c = CAT.find(x=>x.id===id);
  $('#p-hint').textContent = c.eventExclusive
    ? 'Event-only entry — tied to: ' + c.eventKeys.join(', ') + '. It cannot be forced outside those windows.'
    : '';
  const r = await fetch('/api/check',{method:'POST',headers:{'content-type':'application/json'},
    body: JSON.stringify({date:active,id,reason:$('#p-why').value||'x'})});
  const v = await r.json();
  const bits = [];
  for(const p of v.problems) if(!/Give a reason/.test(p)) bits.push('<div class="msg bad">'+p+'</div>');
  for(const w of v.warnings) bits.push('<div class="msg warn">'+w+'</div>');
  if(v.displaced && !v.warnings.length) bits.push('<div class="msg ok">Displaces '+v.displaced.id+' ('+v.displaced.reason+'), which returns to the rotation.</div>');
  $('#p-msgs').innerHTML = bits.join('');
}

$('#p-pick').addEventListener('change', check);

$('#p-save').addEventListener('click', async () => {
  const body = {date:active, id:$('#p-pick').value, reason:$('#p-why').value};
  const r = await fetch('/api/override',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  const v = await r.json();
  if(!r.ok){ $('#p-msgs').innerHTML = v.problems.map(p=>'<div class="msg bad">'+p+'</div>').join(''); return; }
  close(); await refresh();
});

$('#p-clear').addEventListener('click', async () => {
  await fetch('/api/override',{method:'DELETE',headers:{'content-type':'application/json'},
    body: JSON.stringify({date:active})});
  close(); await refresh();
});

$('#p-cancel').addEventListener('click', close);
$('#scrim').addEventListener('click', close);
document.addEventListener('keydown', e => { if(e.key==='Escape') close(); });

refresh();
</script>
</body>
</html>`;
