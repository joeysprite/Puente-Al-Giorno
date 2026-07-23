#!/usr/bin/env node
/**
 * The introduction carousel — the pinned first post, generated once.
 *
 *   node tools/build-intro.mjs   ->  landing/social/intro-1.png … intro-4.png
 *
 * Not the daily format. A one-off "bat signal": here's what this is, here's the
 * flavour, follow if it's your kind of madness. Uses the brand system so it
 * sits seamlessly ahead of the real posts, but writes its own copy — hand-set,
 * because an intro is rhetoric, not a template.
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

/* 1 — the confession / hook */
function card1(){
  let o=centreLines("Spanish says you're like a goat. Italian says you're out like a balcony.","Newsreader",66,false,C.ink,300,380);
  o+=`<text x="${MID}" y="760" text-anchor="middle" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">Two languages. One daily expression each.</text>`;
  o+=`<text x="${MID}" y="800" text-anchor="middle" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">And the bridge between them.</text>`;
  return o;
}
/* 2 — the pair, side by side (the flavour) */
function card2(){
  let o=`<line x1="${MID}" y1="200" x2="${MID}" y2="645" stroke="${C.rule}" stroke-width="2"/>`;
  o+=`<text x="${MID-42}" y="250" text-anchor="end" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="${C.es}">ESPA\u00d1OL</text>`;
  o+=`<text x="${MID+42}" y="250" text-anchor="start" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="${C.it}">ITALIANO</text>`;
  const es=wrap("Estar como una cabra","Newsreader",52,COLW), it=wrap("Essere fuori come un balcone","Newsreader",52,COLW);
  const col=(L,x,a,f)=>L.map((l,i)=>`<text x="${x}" y="${340+i*62}" text-anchor="${a}" font-family="Newsreader" font-weight="500" font-size="52" fill="${f}">${esc(l)}</text>`).join("");
  o+=col(es,MID-42,"end",C.es)+col(it,MID+42,"start",C.it);
  o+=`<text x="${MID-42}" y="600" text-anchor="end" font-family="Newsreader" font-style="italic" font-size="28" fill="${C.ink3}">\u201cto be like a goat\u201d</text>`;
  o+=`<text x="${MID+42}" y="600" text-anchor="start" font-family="Newsreader" font-style="italic" font-size="28" fill="${C.ink3}">\u201cto be out like a balcony\u201d</text>`;
  o+=`<text x="${MID}" y="740" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">Both mean: you're a little crazy.</text>`;
  o+=`<text x="${MID}" y="784" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">Neither will let you translate the other.</text>`;
  return o;
}
/* 3 — the self-deprecating turn (Joe's mood) */
function card3(){
  let o=centreLines("Spanish says I'm missing a screw. Italian says I'm missing a Friday.","Newsreader",60,false,C.ink,240,320);
  o+=`<text x="${MID}" y="660" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">Either way \u2014 I built a whole thing</text>`;
  o+=`<text x="${MID}" y="704" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">about the space between these two</text>`;
  o+=`<text x="${MID}" y="748" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">languages. One pair a day.</text>`;
  return o;
}
/* 4 — the invitation */
function card4(){
  let o=`<text x="${MID}" y="380" text-anchor="middle" font-family="Newsreader" font-weight="500" font-size="72" fill="${C.ink}">Follow along.</text>`;
  o+=`<text x="${MID}" y="480" text-anchor="middle" font-family="IBM Plex Sans" font-size="34" fill="${C.ink2}">One Spanish\u2013Italian pair a day,</text>`;
  o+=`<text x="${MID}" y="524" text-anchor="middle" font-family="IBM Plex Sans" font-size="34" fill="${C.ink2}">and the trap between them.</text>`;
  o+=`<text x="${MID-70}" y="660" text-anchor="end" font-family="Newsreader" font-weight="500" font-size="44" fill="${C.es}">un puente</text>`;
  o+=`<text x="${MID}" y="660" text-anchor="middle" font-family="Newsreader" font-size="44" fill="${C.rule}">\u00b7</text>`;
  o+=`<text x="${MID+70}" y="660" text-anchor="start" font-family="Newsreader" font-weight="500" font-size="44" fill="${C.it}">al giorno</text>`;
  return o;
}

const render=(svg)=>new Resvg(svg,{fitTo:{mode:"width",value:W},font:{fontFiles,loadSystemFonts:false,defaultFontFamily:"Newsreader"}}).render().asPng();
mkdirSync(join(ROOT,"landing","social"),{recursive:true});
// Variant B: the caption's voice — warmer, first-person, less declarative.
function b1(){
  let o=centreLines("Two languages I love, and the strange little gaps between them.","Newsreader",62,false,C.ink,300,400);
  o+=`<text x="${MID}" y="790" text-anchor="middle" font-family="IBM Plex Sans" font-size="30" fill="${C.ink2}">Spanish and Italian look like siblings…</text>`;
  return o;
}
function b2(){
  let o=`<line x1="${MID}" y1="210" x2="${MID}" y2="560" stroke="${C.rule}" stroke-width="2"/>`;
  o+=`<text x="${MID-42}" y="258" text-anchor="end" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="${C.es}">ESPAÑOL</text>`;
  o+=`<text x="${MID+42}" y="258" text-anchor="start" font-family="IBM Plex Mono" font-size="22" letter-spacing="3" fill="${C.it}">ITALIANO</text>`;
  const es=wrap("Estar como una cabra","Newsreader",50,COLW), it=wrap("Essere fuori come un balcone","Newsreader",50,COLW);
  const col=(L,x,a,f)=>L.map((l,i)=>`<text x="${x}" y="${345+i*60}" text-anchor="${a}" font-family="Newsreader" font-weight="500" font-size="50" fill="${f}">${esc(l)}</text>`).join("");
  o+=col(es,MID-42,"end",C.es)+col(it,MID+42,"start",C.it);
  o+=`<text x="${MID-42}" y="540" text-anchor="end" font-family="Newsreader" font-style="italic" font-size="26" fill="${C.ink3}">“like a goat”</text>`;
  o+=`<text x="${MID+42}" y="540" text-anchor="start" font-family="Newsreader" font-style="italic" font-size="26" fill="${C.ink3}">“out like a balcony”</text>`;
  o+=`<text x="${MID}" y="680" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">…until you try to cross from one</text>`;
  o+=`<text x="${MID}" y="724" text-anchor="middle" font-family="IBM Plex Sans" font-size="32" fill="${C.ink2}">to the other, and fall in.</text>`;
  return o;
}
function b3(){
  let o=centreLines("So: one pair a day, and the exact place speakers of each slip up in the other.","Newsreader",56,false,C.ink,250,380);
  o+=`<text x="${MID}" y="720" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="30" fill="${C.ink3}">Clearly I've got a screw loose.</text>`;
  o+=`<text x="${MID}" y="762" text-anchor="middle" font-family="Newsreader" font-style="italic" font-size="30" fill="${C.ink3}">(Or, if you ask an Italian, I'm missing a Friday.)</text>`;
  return o;
}
function b4(){
  let o=`<text x="${MID}" y="360" text-anchor="middle" font-family="Newsreader" font-weight="500" font-size="64" fill="${C.ink}">Follow if that's</text>`;
  o+=`<text x="${MID}" y="440" text-anchor="middle" font-family="Newsreader" font-weight="500" font-size="64" fill="${C.ink}">your kind of madness.</text>`;
  o+=`<text x="${MID-70}" y="600" text-anchor="end" font-family="Newsreader" font-weight="500" font-size="44" fill="${C.es}">un puente</text>`;
  o+=`<text x="${MID}" y="600" text-anchor="middle" font-family="Newsreader" font-size="44" fill="${C.rule}">·</text>`;
  o+=`<text x="${MID+70}" y="600" text-anchor="start" font-family="Newsreader" font-weight="500" font-size="44" fill="${C.it}">al giorno</text>`;
  return o;
}

const VARIANT = process.argv.includes("--variant") ? process.argv[process.argv.indexOf("--variant")+1] : "a";
const cards = VARIANT === "b" ? [b1,b2,b3,b4] : [card1,card2,card3,card4];
const prefix = VARIANT === "b" ? "intro-b" : "intro";
cards.forEach((fn,i)=>writeFileSync(join(ROOT,"landing","social",`${prefix}-${i+1}.png`),render(shell(fn(),i+1,cards.length))));
console.log(`landing/social/ \u2190 ${prefix} carousel (${cards.length} cards, 1080x1080)`);
