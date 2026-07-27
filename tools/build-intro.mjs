#!/usr/bin/env node
/**
 * The introduction carousel — the pinned first post, generated once.
 *
 *   node tools/build-intro.mjs                          ->  landing/social/intro-1.png … intro-4.png (English, variant a)
 *   node tools/build-intro.mjs --variant b --lang es     ->  landing/social/intro-es-b-1.png … -4.png
 *
 * Not the daily format. A one-off "bat signal": here's what this is, here's the
 * flavour, follow if it's your kind of madness. Uses the brand system so it
 * sits seamlessly ahead of the real posts, but writes its own copy — hand-set,
 * because an intro is rhetoric, not a template.
 *
 * Three languages: en (default, original), es, it. Each is its own hand-set
 * rhetoric aimed at a native reader of that language — not a translation of
 * the English pass. The Spanish and Italian idiom examples themselves never
 * change (they ARE the two languages being compared); only the surrounding
 * voice, and the literal-meaning glosses, are localised per audience. The
 * brand lockup "un puente · al giorno" is the product's name and is never
 * translated.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(process.env.BANK_ROOT ?? ".");
const FONTS = resolve(process.argv.includes("--fonts") ? process.argv[process.argv.indexOf("--fonts")+1] : "/tmp/cardfonts");
const BRAND = JSON.parse(readFileSync(join(ROOT, "brand.json"), "utf8"));
const METRICS = JSON.parse(readFileSync(join(ROOT, "tools", "font-metrics.json"), "utf8"));
const C = BRAND.color;
const fontFiles = ["Newsreader.ttf","NewsreaderItalic.ttf","PlexMono.ttf","PlexSans.ttf"].map(f=>join(FONTS,f));
const esc = (s)=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const spaced = (s)=>s.replace(/ /g,"\u00a0\u200a");
const W=1080,H=1080,MID=540,FRAME=40,PAD=34,FULLW=(W-2*(FRAME+PAD+20))*0.92,COLW=(MID-42-FRAME-PAD)*0.90;

const tw=(s,f,z)=>{const m=METRICS[f]??METRICS.Newsreader;let w=0;for(const c of s)w+=(m[c]??m.n??50);return w*z/100;};
const wrap=(s,f,z,mx)=>{const L=[];let c="";for(const w of String(s).split(" ")){const t=c?c+" "+w:w;if(tw(t,f,z)>mx&&c){L.push(c);c=w;}else c=t;}if(c)L.push(c);return L;};
const fit=(s,f,st,mx,mh,r=1.4,mn=18)=>{let z=st;while(z>mn){const l=wrap(s,f,z,mx);if(Math.max(...l.map(x=>tw(x,f,z)))<=mx&&l.length*z*r<=mh)return{z,l};z-=2;}return{z,l:wrap(s,f,z,mx)};};

const shell=(inner,i,total)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${C.paper}"/>
  <rect x="${FRAME}" y="${FRAME}" width="${W-2*FRAME}" height="${H-2*FRAME}" fill="${C.card}" stroke="${C.rule}" stroke-width="2"/>
  <text x="${MID}" y="${FRAME+58}" text-anchor="middle" font-family="IBM Plex Mono" font-size="19" letter-spacing="4" fill="${C.ink3}">${esc(spaced(BRAND.name.toUpperCase()))}</text>
  <text x="${W-FRAME-24}" y="${FRAME+58}" text-anchor="end" font-family="IBM Plex Mono" font-size="16" fill="${C.rule}">${i}/${total}</text>
  ${inner}
  <text x="${MID}" y="${H-FRAME-30}" text-anchor="middle" font-family="IBM Plex Mono" font-size="19" letter-spacing="2" fill="${C.ink3}">@${esc(BRAND.social.handles.instagram)}</text>
</svg>`;

const centreLines=(text,font,start,italic,fill,budgetTop,budgetH)=>{
  const {z,l}=fit(text,font,start,FULLW,budgetH,1.32);
  const y0=budgetTop+(budgetH-l.length*z*1.32)/2+z*0.8;
  return l.map((ln,i)=>`<text x="${MID}" y="${y0+i*z*1.32}" text-anchor="middle" font-family="${font.startsWith("Plex")?"IBM "+font.replace("Plex","Plex "):font}"${italic?' font-style="italic"':''} font-weight="${font==="Newsreader"?500:400}" font-size="${z}" fill="${fill}">${esc(ln)}</text>`).join("");
};

/* ---------------------------------------------------------------------
 * The demonstration pair shown on card 2 / b2. Two options:
 *   goat — Estar como una cabra / Essere fuori come un balcone (default,
 *          original): different images, same rough meaning ("a bit crazy").
 *   egg  — Dar la vuelta a la tortilla / Rivoltare la frittata (bank 0028,
 *          editor-settled 2026-07-24): same image, OPPOSITE meaning — a
 *          comeback vs. a cover-up. The other kind of trap.
 * The idiom text itself never changes per language — it's the actual
 * Spanish/Italian phrase, constant regardless of who's reading.
 * ------------------------------------------------------------------- */
const PAIRS = {
  goat: { es: "Estar como una cabra", it: "Essere fuori come un balcone" },
  egg:  { es: "Dar la vuelta a la tortilla", it: "Rivoltare la frittata" },
};

/* ---------------------------------------------------------------------
 * Hand-set copy per language. The idiom pair itself (Estar como una
 * cabra / Essere fuori come un balcone) is constant across all three —
 * it's the demonstration, not the pitch. Everything else is its own
 * native-voice pass, not a translation of the English.
 * ------------------------------------------------------------------- */
const COPY = {
  en: {
    a: {
      hook: "Spanish says you're like a goat. Italian says you're out like a balcony.",
      sub1: "Two languages. One daily expression each.",
      sub2: "And the bridge between them.",
      examples: {
        goat: {
          esGloss: "\u201cto be like a goat\u201d",
          itGloss: "\u201cto be out like a balcony\u201d",
          close1: "Both mean: you're a little crazy.",
          close2: "Neither will let you translate the other.",
        },
        egg: {
          esGloss: "\u201cto flip the omelette\u201d",
          itGloss: "\u201cto flip the frittata\u201d",
          close1: "Same egg dish. Only one of them is accusing you.",
          close2: "Spain wins the match \u2014 Italy dodges the blame.",
        },
      },
      hook3: "Spanish says I'm missing a screw. Italian says I'm missing a Friday.",
      turn1: "Either way \u2014 I built a whole thing",
      turn2: "about the space between these two",
      turn3: "languages. One pair a day.",
      cta: "Follow along.",
      ctaSub1: "One Spanish\u2013Italian pair a day,",
      ctaSub2: "and the trap between them.",
    },
    b: {
      hook: "Two languages I love, and the gaps between them.",
      sub1: "Spanish and Italian look like siblings\u2026",
      examples: {
        goat: {
          esGloss: "\u201clike a goat\u201d",
          itGloss: "\u201cout like a balcony\u201d",
          close1: "\u2026until you try to cross from one",
          close2: "to the other, and fall in.",
        },
        egg: {
          esGloss: "\u201ca comeback\u201d",
          itGloss: "\u201ca cover-up\u201d",
          close1: "\u2026except here, the same flip means",
          close2: "a comeback in one, a cover-up in the other.",
        },
      },
      hook3: "One pair a day, and the exact place speakers of each slip up in the other.",
      turn1: "Clearly I've got a screw loose.",
      turn2: "(Or, if you ask an Italian, I'm missing a Friday.)",
      cta1: "Follow if that's",
      cta2: "your kind of madness.",
    },
  },
  es: {
    a: {
      hook: "El espa\u00f1ol dice que est\u00e1s como una cabra. El italiano dice que est\u00e1s fuera como un balc\u00f3n.",
      sub1: "Dos idiomas. Una expresi\u00f3n al d\u00eda de cada uno.",
      sub2: "Y el puente entre ambos.",
      examples: {
        goat: {
          esGloss: "\u00abcomo una cabra\u00bb",
          itGloss: "\u00abfuera como un balc\u00f3n\u00bb",
          close1: "Ambas significan lo mismo: un poco loco.",
          close2: "Pero ninguna te deja traducir la otra.",
        },
        egg: {
          esGloss: "una remontada gen\u00edna",
          itGloss: "desviar la culpa",
          close1: "El mismo plato de huevo. Solo uno te acusa.",
          close2: "Espa\u00f1a gana el partido \u2014 Italia esquiva la culpa.",
        },
      },
      hook3: "El espa\u00f1ol dice que me falta un tornillo. El italiano dice que me falta un viernes.",
      turn1: "De cualquier manera, constru\u00ed todo esto",
      turn2: "sobre el espacio entre estos dos",
      turn3: "idiomas. Una pareja al d\u00eda.",
      cta: "S\u00edguenos.",
      ctaSub1: "Una pareja espa\u00f1ol\u2013italiano al d\u00eda,",
      ctaSub2: "y la trampa entre ellas.",
    },
    b: {
      hook: "Dos idiomas que amo, y los huecos entre ellos.",
      sub1: "El espa\u00f1ol y el italiano parecen hermanos\u2026",
      examples: {
        goat: {
          esGloss: "\u00abcomo una cabra\u00bb",
          itGloss: "\u00abfuera como un balc\u00f3n\u00bb",
          close1: "\u2026hasta que intentas cruzar de uno",
          close2: "al otro, y te caes.",
        },
        egg: {
          esGloss: "una remontada",
          itGloss: "un encubrimiento",
          close1: "\u2026salvo que aqu\u00ed, el mismo giro significa",
          close2: "una remontada en uno, un encubrimiento en el otro.",
        },
      },
      hook3: "Una pareja al d\u00eda, y el punto exacto donde los hablantes de cada uno tropiezan en el otro.",
      turn1: "Claramente me falta un tornillo.",
      turn2: "(O, si le preguntas a un italiano, me falta un viernes.)",
      cta1: "S\u00edguenos si esa es",
      cta2: "tu clase de locura.",
    },
  },
  it: {
    a: {
      hook: "Lo spagnolo dice che sei come una capra. L'italiano dice che sei fuori come un balcone.",
      sub1: "Due lingue. Un'espressione al giorno per ciascuna.",
      sub2: "E il ponte che le unisce.",
      examples: {
        goat: {
          esGloss: "\u00abcome una capra\u00bb",
          itGloss: "\u00abfuori come un balcone\u00bb",
          close1: "Vogliono dire la stessa cosa: sei un po' pazzo.",
          close2: "Ma nessuna si lascia tradurre nell'altra.",
        },
        egg: {
          esGloss: "una vera rimonta",
          itGloss: "scaricare la colpa",
          close1: "Stesso piatto di uova. Solo uno ti accusa.",
          close2: "La Spagna vince la partita \u2014 l'Italia scarica la colpa.",
        },
      },
      hook3: "Lo spagnolo dice che mi manca una vite. L'italiano dice che mi manca un venerd\u00ec.",
      turn1: "Comunque sia, ho costruito tutto questo",
      turn2: "sullo spazio tra queste due",
      turn3: "lingue. Una coppia al giorno.",
      cta: "Seguici.",
      ctaSub1: "Una coppia spagnolo\u2013italiano al giorno,",
      ctaSub2: "e la trappola tra loro.",
    },
    b: {
      hook: "Due lingue che amo, e i vuoti tra di loro.",
      sub1: "Lo spagnolo e l'italiano sembrano fratelli\u2026",
      examples: {
        goat: {
          esGloss: "\u00abcome una capra\u00bb",
          itGloss: "\u00abfuori come un balcone\u00bb",
          close1: "\u2026finch\u00e9 non provi a passare",
          close2: "dall'una all'altra, e ci caschi.",
        },
        egg: {
          esGloss: "una rimonta",
          itGloss: "una copertura",
          close1: "\u2026tranne che qui, lo stesso gesto significa",
          close2: "una rimonta in uno, una copertura nell'altro.",
        },
      },
      hook3: "Una coppia al giorno, e il punto esatto in cui chi parla l'una inciampa nell'altra.",
      turn1: "Chiaramente mi manca una vite.",
      turn2: "(O, se lo chiedi a uno spagnolo, mi manca un venerd\u00ec.)",
      cta1: "Seguici se questa \u00e8",
      cta2: "la tua follia.",
    },
  },
};

/* 1 — the confession / hook */
function card1(t){
  let o=centreLines(t.hook,"Newsreader",66,false,C.ink,300,380);
  o+=`<text x="${MID}" y="760" text-anchor="middle" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">${esc(t.sub1)}</text>`;
  o+=`<text x="${MID}" y="800" text-anchor="middle" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">${esc(t.sub2)}</text>`;
  return o;
}
/* 2 — the pair, side by side (the flavour) */
function card2(t,example){
  const p = PAIRS[example], ex = t.examples[example];
  let o=`<line x1="${MID}" y1="200" x2="${MID}" y2="645" stroke="${C.rule}" stroke-width="2"/>`;
  o+=`<text x="${MID-42}" y="250" text-anchor="end" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="${C.es}">ESPA\u00d1OL</text>`;
  o+=`<text x="${MID+42}" y="250" text-anchor="start" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="${C.it}">ITALIANO</text>`;
  const es=wrap(p.es,"Newsreader",52,COLW), it=wrap(p.it,"Newsreader",52,COLW);
  const col=(L,x,a,f)=>L.map((l,i)=>`<text x="${x}" y="${340+i*62}" text-anchor="${a}" font-family="Newsreader" font-weight="500" font-size="52" fill="${f}">${esc(l)}</text>`).join("");
  o+=col(es,MID-42,"end",C.es)+col(it,MID+42,"start",C.it);
  o+=`<text x="${MID-42}" y="600" text-anchor="end" font-family="Newsreader" font-style="italic" font-size="28" fill="${C.ink3}">${esc(ex.esGloss)}</text>`;
  o+=`<text x="${MID+42}" y="600" text-anchor="start" font-family="Newsreader" font-style="italic" font-size="28" fill="${C.ink3}">${esc(ex.itGloss)}</text>`;
  o+=`<text x="${MID}" y="740" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">${esc(ex.close1)}</text>`;
  o+=`<text x="${MID}" y="784" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">${esc(ex.close2)}</text>`;
  return o;
}
/* 3 — the self-deprecating turn (Joe's mood) */
function card3(t){
  let o=centreLines(t.hook3,"Newsreader",60,false,C.ink,240,320);
  o+=`<text x="${MID}" y="660" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">${esc(t.turn1)}</text>`;
  o+=`<text x="${MID}" y="704" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">${esc(t.turn2)}</text>`;
  o+=`<text x="${MID}" y="748" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">${esc(t.turn3)}</text>`;
  return o;
}
/* 4 — the invitation */
function card4(t){
  let o=`<text x="${MID}" y="380" text-anchor="middle" font-family="Newsreader" font-weight="500" font-size="72" fill="${C.ink}">${esc(t.cta)}</text>`;
  o+=`<text x="${MID}" y="480" text-anchor="middle" font-family="IBM Plex Sans" font-size="34" fill="${C.ink2}">${esc(t.ctaSub1)}</text>`;
  o+=`<text x="${MID}" y="524" text-anchor="middle" font-family="IBM Plex Sans" font-size="34" fill="${C.ink2}">${esc(t.ctaSub2)}</text>`;
  o+=`<text x="${MID-70}" y="660" text-anchor="end" font-family="Newsreader" font-weight="500" font-size="44" fill="${C.es}">un puente</text>`;
  o+=`<text x="${MID}" y="660" text-anchor="middle" font-family="Newsreader" font-size="44" fill="${C.rule}">\u00b7</text>`;
  o+=`<text x="${MID+70}" y="660" text-anchor="start" font-family="Newsreader" font-weight="500" font-size="44" fill="${C.it}">al giorno</text>`;
  return o;
}

const render=(svg)=>new Resvg(svg,{fitTo:{mode:"width",value:W},font:{fontFiles,loadSystemFonts:false,defaultFontFamily:"Newsreader"}}).render().asPng();
mkdirSync(join(ROOT,"landing","social"),{recursive:true});

// Variant B: the caption's voice — warmer, first-person, less declarative.
function b1(t){
  let o=centreLines(t.hook,"Newsreader",62,false,C.ink,300,400);
  o+=`<text x="${MID}" y="790" text-anchor="middle" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">${esc(t.sub1)}</text>`;
  return o;
}
function b2(t,example){
  const p = PAIRS[example], ex = t.examples[example];
  let o=`<line x1="${MID}" y1="210" x2="${MID}" y2="560" stroke="${C.rule}" stroke-width="2"/>`;
  o+=`<text x="${MID-42}" y="258" text-anchor="end" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="${C.es}">ESPA\u00d1OL</text>`;
  o+=`<text x="${MID+42}" y="258" text-anchor="start" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="${C.it}">ITALIANO</text>`;
  const es=wrap(p.es,"Newsreader",50,COLW), it=wrap(p.it,"Newsreader",50,COLW);
  const col=(L,x,a,f)=>L.map((l,i)=>`<text x="${x}" y="${345+i*60}" text-anchor="${a}" font-family="Newsreader" font-weight="500" font-size="50" fill="${f}">${esc(l)}</text>`).join("");
  o+=col(es,MID-42,"end",C.es)+col(it,MID+42,"start",C.it);
  o+=`<text x="${MID-42}" y="540" text-anchor="end" font-family="Newsreader" font-style="italic" font-size="26" fill="${C.ink3}">${esc(ex.esGloss)}</text>`;
  o+=`<text x="${MID+42}" y="540" text-anchor="start" font-family="Newsreader" font-style="italic" font-size="26" fill="${C.ink3}">${esc(ex.itGloss)}</text>`;
  o+=`<text x="${MID}" y="680" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">${esc(ex.close1)}</text>`;
  o+=`<text x="${MID}" y="724" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">${esc(ex.close2)}</text>`;
  return o;
}
function b3(t){
  let o=centreLines(t.hook3,"Newsreader",56,false,C.ink,250,380);
  o+=`<text x="${MID}" y="720" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="30" fill="${C.ink3}">${esc(t.turn1)}</text>`;
  o+=`<text x="${MID}" y="762" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="30" fill="${C.ink3}">${esc(t.turn2)}</text>`;
  return o;
}
function b4(t){
  let o=`<text x="${MID}" y="360" text-anchor="middle" font-family="Newsreader" font-weight="500" font-size="64" fill="${C.ink}">${esc(t.cta1)}</text>`;
  o+=`<text x="${MID}" y="440" text-anchor="middle" font-family="Newsreader" font-weight="500" font-size="64" fill="${C.ink}">${esc(t.cta2)}</text>`;
  o+=`<text x="${MID-70}" y="600" text-anchor="end" font-family="Newsreader" font-weight="500" font-size="44" fill="${C.es}">un puente</text>`;
  o+=`<text x="${MID}" y="600" text-anchor="middle" font-family="Newsreader" font-size="44" fill="${C.rule}">\u00b7</text>`;
  o+=`<text x="${MID+70}" y="600" text-anchor="start" font-family="Newsreader" font-weight="500" font-size="44" fill="${C.it}">al giorno</text>`;
  return o;
}

const argv=process.argv;
const arg=(n,d)=>{const i=argv.indexOf(n);return i>=0?argv[i+1]:d;};
const VARIANT = arg("--variant","a");
const LANG = arg("--lang","en");
const EXAMPLE = arg("--example","goat");
const t = COPY[LANG]?.[VARIANT];
if(!t){ console.error(`No copy for --lang ${LANG} --variant ${VARIANT}`); process.exit(1); }
if(!PAIRS[EXAMPLE]){ console.error(`No pair for --example ${EXAMPLE}`); process.exit(1); }

const cards = VARIANT === "b" ? [b1,b2,b3,b4] : [card1,card2,card3,card4];
const base = VARIANT === "b" ? "intro-b" : "intro";
const prefix = LANG === "en" ? base : (VARIANT === "b" ? `intro-${LANG}-b` : `intro-${LANG}`);
const suffix = EXAMPLE === "goat" ? "" : `-${EXAMPLE}`;
// Card 2 (index 1) is the only one that uses the example pair. Passing a
// non-default --example implies "just redo that card" unless --card says
// otherwise (--card all forces the full 4-card set to be re-written).
const CARD = arg("--card", EXAMPLE === "goat" ? "all" : "2");
const only = CARD === "all" ? null : Number(CARD)-1;

cards.forEach((fn,i)=>{
  if(only!==null && i!==only) return;
  writeFileSync(join(ROOT,"landing","social",`${prefix}${suffix}-${i+1}.png`),render(shell(fn(t,EXAMPLE),i+1,cards.length)));
});
console.log(`landing/social/ \u2190 ${prefix}${suffix} carousel (lang=${LANG}, example=${EXAMPLE}${only!==null?`, card ${only+1} only`:''})`);
