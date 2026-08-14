#!/usr/bin/env node
/**
 * The daily carousel — the real post format.
 *
 *   --cover combined   (default)  4 panels: cover(date+pair) / examples / bridge / traps
 *   --cover split                 5 panels: date / pair / examples / bridge / traps
 *
 * The combined cover exists because panel 1 is what shows in-feed. A card
 * carrying only a date gives a scroller no reason to stop; the expression
 * pair is the hook. Split mode is kept because the bare calendar leaf is
 * the strongest brand image and may still be wanted for stories or print.
 *
 *   node tools/build-daily-carousel.mjs --entry 0034 --date 2026-08-10
 *   node tools/build-daily-carousel.mjs --entry 0075 --date 2026-08-15 --end 2026-08-16
 *
 * Refuses non-approved entries. --allow-draft overrides with a visible
 * DRAFT watermark, for internal review only.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const argv = process.argv;
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i+1] : d; };

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const FONTS = resolve(arg("--fonts", "/tmp/cardfonts"));
const BRAND = JSON.parse(readFileSync(join(ROOT, "brand.json"), "utf8"));
const METRICS = JSON.parse(readFileSync(join(ROOT, "tools", "font-metrics.json"), "utf8"));
const C = BRAND.color;
const fontFiles = ["Newsreader.ttf","NewsreaderItalic.ttf","PlexMono.ttf","PlexSans.ttf"].map(f=>join(FONTS,f));

const ENTRY = arg("--entry", "0034");
const DATE  = arg("--date", "2026-08-10");
const END   = arg("--end", null);
const COVER = arg("--cover", "combined");
const ALLOW_DRAFT = argv.includes("--allow-draft");
const OUTBASE = arg("--out", null);

const E = JSON.parse(readFileSync(join(ROOT, "bank", `${ENTRY}.json`), "utf8"));
const APPROVED = E.review?.status === "approved";
if (!APPROVED && !ALLOW_DRAFT) {
  console.error(`Refusing: entry ${ENTRY} is '${E.review?.status}', not approved. Pass --allow-draft for a watermarked internal preview.`);
  process.exit(1);
}
const DRAFT = !APPROVED;

const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const spaced = s => s.replace(/ /g,"\u00a0\u200a");
const W=1080, H=1080, MID=540, FRAME=40, PAD=34;
const FULLW=(W-2*(FRAME+PAD+20))*0.92, COLW=(MID-42-FRAME-PAD)*0.90;

const tw=(s,f,z)=>{const m=METRICS[f]??METRICS.Newsreader;let w=0;for(const c of String(s))w+=(m[c]??m.n??50);return w*z/100;};
const wrap=(s,f,z,mx)=>{const L=[];let c="";for(const w of String(s).split(" ")){const t=c?c+" "+w:w;if(tw(t,f,z)>mx&&c){L.push(c);c=w;}else c=t;}if(c)L.push(c);return L;};
const fit=(s,f,st,mx,mh,r=1.32,mn=18)=>{let z=st;while(z>mn){const l=wrap(s,f,z,mx);if(Math.max(...l.map(x=>tw(x,f,z)))<=mx&&l.length*z*r<=mh)return{z,l};z-=2;}return{z,l:wrap(s,f,z,mx)};};

const d = new Date(DATE+"T12:00:00");
const dEnd = END ? new Date(END+"T12:00:00") : null;
const DOW_ES=["domingo","lunes","martes","mi\u00e9rcoles","jueves","viernes","s\u00e1bado"];
const DOW_IT=["domenica","luned\u00ec","marted\u00ec","mercoled\u00ec","gioved\u00ec","venerd\u00ec","sabato"];
const DOW_ES_SHORT=["dom","lun","mar","mi\u00e9","jue","vie","s\u00e1b"];
const DOW_IT_SHORT=["dom","lun","mar","mer","gio","ven","sab"];
const MON_ES=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MON_IT=["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];

const watermark = DRAFT ? `
  <g opacity="0.5">
    <rect x="${FRAME}" y="${FRAME}" width="${W-2*FRAME}" height="46" fill="#B4463F"/>
    <text x="${MID}" y="${FRAME+32}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="20" letter-spacing="3" fill="#FFFFFF">${esc(spaced("DRAFT \u2014 NOT APPROVED \u2014 DO NOT POST"))}</text>
  </g>` : "";
const topOffset = DRAFT ? 40 : 0;

const shell=(inner,i,total)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.paper}"/>
  <rect x="${FRAME}" y="${FRAME}" width="${W-2*FRAME}" height="${H-2*FRAME}" fill="${C.card}" stroke="${C.rule}" stroke-width="2"/>
  <text x="${MID}" y="${FRAME+(DRAFT?100:58)}" text-anchor="middle" font-family="IBM Plex Mono" font-size="19" letter-spacing="4" fill="${C.ink3}">${esc(spaced(BRAND.name.toUpperCase()))}</text>
  <text x="${W-FRAME-24}" y="${FRAME+(DRAFT?100:58)}" text-anchor="end" font-family="IBM Plex Mono" font-size="16" fill="${C.rule}">${i}/${total}</text>
  ${inner}
  <text x="${MID}" y="${H-FRAME-30}" text-anchor="middle" font-family="IBM Plex Mono" font-size="19" letter-spacing="2" fill="${C.ink3}">@${esc(BRAND.social.handles.instagram)}</text>
  ${watermark}
</svg>`;

const centred=(text,font,start,italic,fill,top,budget,weight)=>{
  const {z,l}=fit(text,font,start,FULLW,budget,1.32);
  const y0=top+(budget-l.length*z*1.32)/2+z*0.8;
  const fam=font.startsWith("Plex")?"IBM "+font.replace("Plex","Plex "):font;
  return l.map((ln,i)=>`<text x="${MID}" y="${y0+i*z*1.32}" text-anchor="middle" font-family="${fam}"${italic?' font-style="italic"':''} font-weight="${weight??(font==="Newsreader"?500:400)}" font-size="${z}" fill="${fill}">${esc(ln)}</text>`).join("");
};

/* Neither Newsreader nor the Plex subsets carry U+2192 — drawn, not typed. */
const arrowGlyph = (cx, yBaseline, color, len=30, headH=9) => {
  const yMid = yBaseline - headH*0.85;
  const x1 = cx-len/2, xTip = cx+len/2, xShaft = xTip-headH*0.9;
  return `<line x1="${x1}" y1="${yMid}" x2="${xShaft}" y2="${yMid}" stroke="${color}" stroke-width="2.5"/>
    <path d="M ${xShaft} ${yMid-headH/2} L ${xTip} ${yMid} L ${xShaft} ${yMid+headH/2} Z" fill="${color}"/>`;
};
const arrowLabel = (w1s, w2s, y, color, size, ls=2, gap=46) => {
  const w1 = tw(spaced(w1s),"Newsreader",size)+ls*w1s.length;
  const w2 = tw(spaced(w2s),"Newsreader",size)+ls*w2s.length;
  const total = w1+gap+w2, x1 = MID-total/2, x2 = x1+w1+gap;
  return `<text x="${x1}" y="${y}" text-anchor="start" font-family="IBM Plex Mono" font-size="${size}" letter-spacing="${ls}" fill="${color}">${esc(spaced(w1s))}</text>`
    + arrowGlyph(x1+w1+gap/2, y, color, gap*0.6)
    + `<text x="${x2}" y="${y}" text-anchor="start" font-family="IBM Plex Mono" font-size="${size}" letter-spacing="${ls}" fill="${color}">${esc(spaced(w2s))}</text>`;
};

/* The bilingual date line for the combined cover. Small — this is context,
 * not the headline. ES carmine / IT laurel, matching every other paired
 * element in the product. Handles weekend ranges. */
/* Date treatments for the combined cover.
 *   line  — small bilingual line, date as context
 *   large — same line, bigger
 *   leaf  — compact calendar-leaf header: month, numeral, weekday. Keeps
 *           the tear-off-calendar signature that the standalone date card
 *           had, without letting it eat the whole cover. */
const DATESTYLE = arg("--datestyle", "leaf");

function dateLine(y, size){
  const esTxt = dEnd
    ? `${DOW_ES[d.getDay()]}\u2013${DOW_ES[dEnd.getDay()]} ${d.getDate()}\u2013${dEnd.getDate()} de ${MON_ES[d.getMonth()]}`
    : `${DOW_ES[d.getDay()]} ${d.getDate()} de ${MON_ES[d.getMonth()]}`;
  const itTxt = dEnd
    ? `${DOW_IT[d.getDay()]}\u2013${DOW_IT[dEnd.getDay()]} ${d.getDate()}\u2013${dEnd.getDate()} ${MON_IT[d.getMonth()]}`
    : `${DOW_IT[d.getDay()]} ${d.getDate()} ${MON_IT[d.getMonth()]}`;
  const wide = tw(esTxt,"Newsreader",size) + 40 + tw(itTxt,"Newsreader",size) > FULLW;
  if (wide) {
    return `<text x="${MID}" y="${y}" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="${size}" fill="${C.es}">${esc(esTxt)}</text>`
         + `<text x="${MID}" y="${y+size*1.28}" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="${size}" fill="${C.it}">${esc(itTxt)}</text>`;
  }
  return `<text x="${MID-16}" y="${y}" text-anchor="end" font-family="Newsreader" font-style="italic" font-size="${size}" fill="${C.es}">${esc(esTxt)}</text>`
       + `<text x="${MID}" y="${y}" text-anchor="middle" font-family="Newsreader" font-size="${size}" fill="${C.rule}">\u00b7</text>`
       + `<text x="${MID+16}" y="${y}" text-anchor="start" font-family="Newsreader" font-style="italic" font-size="${size}" fill="${C.it}">${esc(itTxt)}</text>`;
}
const dateLineWide = (size) => {
  const esTxt = dEnd ? `${DOW_ES[d.getDay()]}\u2013${DOW_ES[dEnd.getDay()]} ${d.getDate()}\u2013${dEnd.getDate()} de ${MON_ES[d.getMonth()]}` : `${DOW_ES[d.getDay()]} ${d.getDate()} de ${MON_ES[d.getMonth()]}`;
  const itTxt = dEnd ? `${DOW_IT[d.getDay()]}\u2013${DOW_IT[dEnd.getDay()]} ${d.getDate()}\u2013${dEnd.getDate()} ${MON_IT[d.getMonth()]}` : `${DOW_IT[d.getDay()]} ${d.getDate()} ${MON_IT[d.getMonth()]}`;
  return tw(esTxt,"Newsreader",size) + 40 + tw(itTxt,"Newsreader",size) > FULLW;
};

/* Calendar-leaf header: month pair, big numeral, weekday pair. */
/* Leaf metrics. The numeral is positioned by cap height rather than by its
 * baseline: digits have no descender and sit entirely above the baseline, so
 * spacing it evenly by baseline alone leaves a big gap above and a tight one
 * below. CAP/ASC let the gaps above and below the numeral be genuinely equal
 * as measured on the ink, not on the text anchors. */
const LEAF_CAP = 0.70;   // digit cap height as a fraction of font size
const LEAF_ASC = 0.72;   // ascender height for the weekday line
const LEAF_DESC = 0.19;  // italic descender below the month baseline (agosto's 'g')
const LEAF_GAP = 30;     // equal optical gap above and below the numeral
const LEAF_TOP = 34;     // extra drop below the masthead before the month line
const LEAF_MON = 64;     // month size
const LEAF_DOW = 36;     // weekday size — capped here because a weekend range
                         // ("sábado–domingo / sabato–domenica") runs ~800px
                         // of the 821px usable width at this size

function leafNumSize(){
  const desired = dEnd ? 178 : 228;
  // Floor kept high on purpose: the numeral is the brand signature, and a
  // leaf that shrinks to fit is worse than one that holds its size and lets
  // a long pair sit a little tighter. Measured across the 30-slot calendar,
  // this keeps every cover within ~30% of the same numeral size.
  const floor   = dEnd ? 130 : 150;
  const fixed = 2*LEAF_GAP + LEAF_DESC*LEAF_MON + LEAF_ASC*LEAF_DOW + 12 + 42;
  const room  = 810 - fixed - 58 - LEAF_TOP - pairBlockHeight();
  return Math.max(floor, Math.min(desired, Math.round(room / LEAF_CAP)));
}

function dateLeaf(yTop){
  const numSize = leafNumSize();
  let o = "";
  o += `<text x="${MID-24}" y="${yTop}" text-anchor="end" font-family="Newsreader" font-style="italic" font-size="${LEAF_MON}" fill="${C.es}">${esc(MON_ES[d.getMonth()])}</text>`;
  o += `<text x="${MID+24}" y="${yTop}" text-anchor="start" font-family="Newsreader" font-style="italic" font-size="${LEAF_MON}" fill="${C.it}">${esc(MON_IT[d.getMonth()])}</text>`;
  // measured from the bottom of the month's descenders, not its baseline
  const numY = yTop + LEAF_DESC*LEAF_MON + LEAF_GAP + LEAF_CAP*numSize;
  const numTxt = dEnd ? `${d.getDate()}\u2013${dEnd.getDate()}` : `${d.getDate()}`;
  o += `<text x="${MID}" y="${numY}" text-anchor="middle" font-family="Newsreader" font-size="${numSize}" fill="${C.ink}">${esc(numTxt)}</text>`;
  const dowY = numY + LEAF_GAP + LEAF_ASC*LEAF_DOW;
  // Weekend ranges use short forms. Spelled out, "sábado–domingo /
  // sabato–domenica" runs ~800px of 821px usable and forces the numeral to
  // collapse; abbreviated, the range reads just as clearly and the numeral
  // keeps its size. Single days stay fully spelled out.
  const esD = dEnd ? `${DOW_ES[d.getDay()]}\u2013${DOW_ES[dEnd.getDay()]}` : DOW_ES[d.getDay()];
  const itD = dEnd ? `${DOW_IT[d.getDay()]}\u2013${DOW_IT[dEnd.getDay()]}` : DOW_IT[d.getDay()];
  o += `<text x="${MID-24}" y="${dowY}" text-anchor="end" font-family="Newsreader" font-style="italic" font-size="${LEAF_DOW}" fill="${C.es}">${esc(esD)}</text>`;
  o += `<text x="${MID+24}" y="${dowY}" text-anchor="start" font-family="Newsreader" font-style="italic" font-size="${LEAF_DOW}" fill="${C.it}">${esc(itD)}</text>`;
  return o;
}
const dateLeafHeight = () => LEAF_DESC*LEAF_MON + 2*LEAF_GAP + LEAF_CAP*leafNumSize() + LEAF_ASC*LEAF_DOW + 12;

/* The pair block: expressions, literal glosses, natural meanings.
 * yTop is where the vertical seam starts. */
function pairBlockHeight(){
  const es=wrap(E.es.text,"Newsreader",48,COLW), it=wrap(E.it.text,"Newsreader",48,COLW);
  const maxLines = Math.max(es.length, it.length);
  const esLit=wrap("\u201c"+E.es.literal+"\u201d","NewsreaderItalic",31,COLW), itLit=wrap("\u201c"+E.it.literal+"\u201d","NewsreaderItalic",31,COLW);
  const maxLit = Math.max(esLit.length, itLit.length);
  const esMean=wrap(E.es.meaning,"PlexSans",30,COLW), itMean=wrap(E.it.meaning,"PlexSans",30,COLW);
  const maxMean = Math.max(esMean.length, itMean.length);
  // 108 to first expression baseline, then each stack plus its gap
  return 108 + maxLines*58 + 36 + maxLit*40 + 42 + maxMean*39;
}

function pairBlock(yTop){
  const seamEnd = yTop + pairBlockHeight() - 10;
  let o=`<line x1="${MID}" y1="${yTop}" x2="${MID}" y2="${seamEnd}" stroke="${C.rule}" stroke-width="2"/>`;
  o+=`<text x="${MID-42}" y="${yTop+45}" text-anchor="end" font-family="IBM Plex Mono" font-size="24" letter-spacing="3" fill="${C.es}">ESPA\u00d1OL</text>`;
  o+=`<text x="${MID+42}" y="${yTop+45}" text-anchor="start" font-family="IBM Plex Mono" font-size="24" letter-spacing="3" fill="${C.it}">ITALIANO</text>`;
  const size=48;
  const es=wrap(E.es.text,"Newsreader",size,COLW), it=wrap(E.it.text,"Newsreader",size,COLW);
  const col=(L,x,a,f)=>L.map((l,i)=>`<text x="${x}" y="${yTop+108+i*58}" text-anchor="${a}" font-family="Newsreader" font-weight="500" font-size="${size}" fill="${f}">${esc(l)}</text>`).join("");
  o+=col(es,MID-42,"end",C.es)+col(it,MID+42,"start",C.it);
  const maxLines = Math.max(es.length, it.length);
  const litY = yTop+108+maxLines*58+36;
  const esLit=wrap("\u201c"+E.es.literal+"\u201d","NewsreaderItalic",31,COLW), itLit=wrap("\u201c"+E.it.literal+"\u201d","NewsreaderItalic",31,COLW);
  o+=esLit.map((l,i)=>`<text x="${MID-42}" y="${litY+i*40}" text-anchor="end" font-family="Newsreader" font-style="italic" font-size="31" fill="${C.ink3}">${esc(l)}</text>`).join("");
  o+=itLit.map((l,i)=>`<text x="${MID+42}" y="${litY+i*40}" text-anchor="start" font-family="Newsreader" font-style="italic" font-size="31" fill="${C.ink3}">${esc(l)}</text>`).join("");
  const maxLit = Math.max(esLit.length, itLit.length);
  const meanY = litY+maxLit*40+42;
  const esMean=wrap(E.es.meaning,"PlexSans",30,COLW), itMean=wrap(E.it.meaning,"PlexSans",30,COLW);
  o+=esMean.map((l,i)=>`<text x="${MID-42}" y="${meanY+i*39}" text-anchor="end" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">${esc(l)}</text>`).join("");
  o+=itMean.map((l,i)=>`<text x="${MID+42}" y="${meanY+i*39}" text-anchor="start" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">${esc(l)}</text>`).join("");
  return o;
}

/* COMBINED COVER — date line on top, pair below. Panel 1 of 4. */
function coverPanel(){
  const dy = 150+topOffset+LEAF_TOP;
  let head, headBottom;
  if (DATESTYLE === "leaf") {
    head = dateLeaf(dy);
    headBottom = dy + dateLeafHeight();
    // Subtle rule separating the calendar leaf from the pair below. Short and
    // centred so it reads as a fold in the page, not a table border.
    head += `<line x1="${MID-150}" y1="${headBottom+14}" x2="${MID+150}" y2="${headBottom+14}" stroke="${C.rule}" stroke-width="2"/>`;
    headBottom += 42;
  } else {
    const size = DATESTYLE === "large" ? 38 : 27;
    head = dateLine(dy, size);
    headBottom = dy + 46 + (dateLineWide(size) ? size*1.28 : 0);
  }
  const avail = 930 - headBottom;
  const slack = Math.max(0, avail - pairBlockHeight());
  return head + pairBlock(headBottom + slack*0.30);
}
/* SPLIT MODE panel 2 — pair only, no date. */
function pairPanel(){ return pairBlock(195+topOffset); }

function examplesPanel(){
  let o=`<text x="${MID}" y="${230+topOffset}" text-anchor="middle" font-family="IBM Plex Mono" font-size="26" letter-spacing="4" fill="${C.amber}">${esc(spaced("EN CONTEXTO \u00b7 IN CONTESTO"))}</text>`;
  o+=`<line x1="${MID-160}" y1="${272+topOffset}" x2="${MID+160}" y2="${272+topOffset}" stroke="${C.rule}" stroke-width="2"/>`;
  let y = 334+topOffset;
  o+=`<text x="${MID}" y="${y}" text-anchor="middle" font-family="IBM Plex Mono" font-size="24" letter-spacing="3" fill="${C.es}">ESPA\u00d1OL</text>`;
  y += 58;
  const esEx = wrap(E.es.example,"NewsreaderItalic",37,FULLW*0.94);
  o += esEx.map((l,i)=>`<text x="${MID}" y="${y+i*48}" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="37" fill="${C.ink}">${esc(l)}</text>`).join("");
  y += esEx.length*48+16;
  const esTr = wrap(E.es.exampleTranslation,"PlexSans",28,FULLW*0.94);
  o += esTr.map((l,i)=>`<text x="${MID}" y="${y+i*37}" text-anchor="middle" font-family="IBM Plex Sans" font-size="28" fill="${C.ink3}">${esc(l)}</text>`).join("");
  y += esTr.length*37+62;
  o+=`<text x="${MID}" y="${y}" text-anchor="middle" font-family="IBM Plex Mono" font-size="24" letter-spacing="3" fill="${C.it}">ITALIANO</text>`;
  y += 58;
  const itEx = wrap(E.it.example,"NewsreaderItalic",37,FULLW*0.94);
  o += itEx.map((l,i)=>`<text x="${MID}" y="${y+i*48}" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="37" fill="${C.ink}">${esc(l)}</text>`).join("");
  y += itEx.length*48+16;
  const itTr = wrap(E.it.exampleTranslation,"PlexSans",28,FULLW*0.94);
  o += itTr.map((l,i)=>`<text x="${MID}" y="${y+i*37}" text-anchor="middle" font-family="IBM Plex Sans" font-size="28" fill="${C.ink3}">${esc(l)}</text>`).join("");
  return o;
}

function bridgePanel(){
  let o=`<text x="${MID}" y="${255+topOffset}" text-anchor="middle" font-family="IBM Plex Mono" font-size="23" letter-spacing="4" fill="${C.amber}">${esc(spaced("EL PUENTE \u00b7 IL PONTE"))}</text>`;
  o+=`<line x1="${MID-160}" y1="${298+topOffset}" x2="${MID+160}" y2="${298+topOffset}" stroke="${C.rule}" stroke-width="2"/>`;
  o+=centred(E.bridge.note,"Newsreader",46,true,C.ink,344+topOffset,480,500);
  return o;
}

function trapsPanel(){
  let o=`<text x="${MID}" y="${230+topOffset}" text-anchor="middle" font-family="IBM Plex Mono" font-size="26" letter-spacing="4" fill="${C.amber}">${esc(spaced("LAS TRAMPAS \u00b7 LE TRAPPOLE"))}</text>`;
  o+=`<line x1="${MID-160}" y1="${272+topOffset}" x2="${MID+160}" y2="${272+topOffset}" stroke="${C.rule}" stroke-width="2"/>`;
  const es2it = wrap(E.bridge.interference.es_to_it,"PlexSans",37,FULLW*0.94);
  const it2es = wrap(E.bridge.interference.it_to_es,"PlexSans",37,FULLW*0.94);
  let y = 330+topOffset;
  o+=arrowLabel("ESPA\u00d1OL","ITALIANO",y,C.es,23);
  y+=52;
  o+=es2it.map((l,i)=>`<text x="${MID}" y="${y+i*48}" text-anchor="middle" font-family="IBM Plex Sans" font-size="37" fill="${C.ink2}">${esc(l)}</text>`).join("");
  y+=es2it.length*48+62;
  o+=arrowLabel("ITALIANO","ESPA\u00d1OL",y,C.it,23);
  y+=52;
  o+=it2es.map((l,i)=>`<text x="${MID}" y="${y+i*48}" text-anchor="middle" font-family="IBM Plex Sans" font-size="37" fill="${C.ink2}">${esc(l)}</text>`).join("");
  return o;
}

const panels = COVER === "split"
  ? [pairPanel, examplesPanel, bridgePanel, trapsPanel]      // date card generated separately
  : [coverPanel, examplesPanel, bridgePanel, trapsPanel];
const TOTAL = COVER === "split" ? panels.length + 1 : panels.length;
const startIndex = COVER === "split" ? 2 : 1;

const render = svg => new Resvg(svg,{fitTo:{mode:"width",value:W},font:{fontFiles,loadSystemFonts:false,defaultFontFamily:"Newsreader"}}).render().asPng();
mkdirSync(join(ROOT,"landing","social"),{recursive:true});
const base = OUTBASE ?? `daily-${ENTRY}`;
panels.forEach((fn,i)=>writeFileSync(join(ROOT,"landing","social",`${base}-panel${i+startIndex}.png`),render(shell(fn(),i+startIndex,TOTAL))));
console.log(`landing/social/ \u2190 ${base}-panel{${startIndex}..${startIndex+panels.length-1}} (entry ${ENTRY}, ${COVER} cover, ${DRAFT?'DRAFT':'approved'})`);
