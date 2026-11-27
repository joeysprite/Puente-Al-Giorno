#!/usr/bin/env node
/**
 * Render a reviewer worklist to PDF.
 *
 *   node tools/build-review-pdf.mjs reviewers/REVIEW-ES-ALL-UNAPPROVED.md
 *   node tools/build-review-pdf.mjs reviewers/*-ALL-UNAPPROVED.md
 *
 * The markdown worklists are built for a screen and for git. A reviewer
 * working through 112 entries wants something else: one entry never split
 * across a page break, tick boxes big enough for a pen, and somewhere to write
 * the correction. This adds those; it does not change a word of the content.
 *
 * Deliberately NOT a generic markdown-to-PDF: it keys off the worklist's own
 * shapes (### <id> — <expression>, the `> reviewer:` strip, the REGION and
 * QUESTION callouts) because those are what need special handling.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve, dirname } from "node:path";
import { execSync } from "node:child_process";
import { createRequire } from "node:module";

// The rest of the repo is zero-dependency node stdlib and stays that way.
// Playwright is the one thing a PDF needs and cannot be stdlib, so it is
// resolved from a global install rather than declared — the same arrangement
// build-cards.mjs has with @resvg/resvg-js.
let chromium;
{
  // Playwright's entry point is CommonJS, and a dynamic import() of it yields a
  // mangled namespace with no `chromium` on it. createRequire gets the real
  // exports. Tried in-tree first, then the global install.
  const require_ = createRequire(import.meta.url);
  const tryLoad = (spec) => {
    try {
      const m = require_(spec);
      return m?.chromium ? m.chromium : null;
    } catch {
      return null;
    }
  };
  chromium = tryLoad("playwright");
  if (!chromium) {
    try {
      const g = execSync("npm root -g", { encoding: "utf8" }).trim();
      chromium = tryLoad(join(g, "playwright", "index.js"));
    } catch {}
  }
  if (!chromium) {
    console.error("This tool needs Playwright, which is not declared as a repo");
    console.error("dependency on purpose. Install it globally, once:");
    console.error("");
    console.error("    npm install -g playwright && npx playwright install chromium");
    process.exit(1);
  }
}

const files = process.argv.slice(2).filter((a) => a.endsWith(".md"));
if (!files.length) {
  console.error("usage: node tools/build-review-pdf.mjs <worklist.md> [...]");
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Just enough markdown for the front matter and section notes: bold, italic,
// inline code, and bullet lists. Adding a parser dependency for this much
// would be the only dependency in the repo.
const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*]+)\*/g, "$1<em>$2</em>");

function md2html(src) {
  const out = [];
  let list = null;   // open <li> buffers
  let para = [];     // lines of the paragraph being accumulated
  // The source is hard-wrapped, so a newline is not a paragraph break — only a
  // BLANK line is. Treating each line as its own <p> set the measure to the
  // longest source line and left the page two-thirds empty.
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; } };
  const flushList = () => { if (list) { out.push(`<ul>${list.join("")}</ul>`); list = null; } };

  for (const raw of src.split("\n")) {
    const l = raw.trim();
    if (!l) { flushPara(); flushList(); continue; }

    const li = /^[-*]\s+(.*)$/.exec(l);
    if (li) { flushPara(); (list ??= []).push(`<li>${inline(li[1])}</li>`); continue; }
    // a wrapped continuation of the current list item
    if (list) { list[list.length - 1] = list[list.length - 1].replace(/<\/li>$/, " " + inline(l) + "</li>"); continue; }

    const h = /^(#{1,4})\s+(.*)$/.exec(l);
    if (h) { flushPara(); out.push(`<h${h[1].length + 2}>${inline(h[2])}</h${h[1].length + 2}>`); continue; }

    para.push(l);
  }
  flushPara(); flushList();
  return out.join("");
}

const CSS = `
@page { size: A4; margin: 16mm 14mm 18mm; }

:root {
  --ink: #1a1a1a;
  --soft: #595959;
  --rule: #d4d4d4;
  --flag: #8a5a00;
  --flag-bg: #fdf6e8;
  --ask: #1f4d7a;
  --ask-bg: #eef4fa;
}

* { box-sizing: border-box; }
body {
  font: 10.5pt/1.5 Georgia, "Liberation Serif", serif;
  color: var(--ink);
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

/* ---- front matter ---- */
h1 {
  font: 600 22pt/1.2 "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif;
  margin: 0 0 4mm;
  letter-spacing: -0.015em;
}
.lede { font-size: 10pt; color: var(--soft); margin: 0 0 6mm; }
.lede strong { color: var(--ink); }
h3 {
  font: 600 10pt/1.3 "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--soft);
  margin: 7mm 0 2mm;
}
.intro { font-size: 9.8pt; }
.intro ul { padding-left: 5mm; margin: 2mm 0; }
.intro li { margin-bottom: 1.5mm; }

/* ---- sections ---- */
h2 {
  font: 600 13pt/1.3 "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif;
  margin: 0 0 1mm;
  padding-bottom: 2mm;
  border-bottom: 1.5pt solid var(--ink);
  break-after: avoid;
}
.section { break-before: page; }
.section:first-of-type { break-before: auto; }
.section-note {
  font-size: 9.2pt;
  color: var(--soft);
  margin: 2mm 0 5mm;
  break-after: avoid;
}
.section-note ul { padding-left: 5mm; margin: 1mm 0; }

/* ---- one entry, never split ---- */
.entry {
  break-inside: avoid;
  page-break-inside: avoid;
  padding: 3.5mm 0 0;
  margin-bottom: 4mm;
  border-top: 0.5pt solid var(--rule);
}
.entry-head {
  font: 600 12.5pt/1.3 Georgia, "Liberation Serif", serif;
  margin: 0 0 2mm;
}
.entry-head .id {
  font: 600 8.5pt/1 "Helvetica Neue", Helvetica, sans-serif;
  color: var(--soft);
  letter-spacing: 0.06em;
  vertical-align: 1.5pt;
  margin-right: 2.5mm;
}
.entry dl { margin: 0; }
.entry .f { margin: 0 0 1.2mm; font-size: 10pt; }
.entry .f .k {
  font: 600 8.5pt/1 "Helvetica Neue", Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--soft);
  display: inline-block;
  min-width: 17mm;
}
.entry .gloss { color: var(--soft); font-style: italic; }
.tags { font-size: 8.8pt; color: var(--soft); margin: 2mm 0 0; }
.tags code {
  font: 8.5pt/1 "SF Mono", Menlo, "DejaVu Sans Mono", monospace;
  background: #f2f2f2;
  padding: 0.3mm 1mm;
  border-radius: 1pt;
}

/* ---- callouts ---- */
.callout {
  margin: 2.5mm 0;
  padding: 2mm 3mm;
  border-left: 2.5pt solid;
  font-size: 9.6pt;
  line-height: 1.45;
}
.callout .lbl {
  font: 700 8.5pt/1 "Helvetica Neue", Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  display: block;
  margin-bottom: 1mm;
}
.region { border-color: var(--flag); background: var(--flag-bg); }
.region .lbl { color: var(--flag); }
.question { border-color: var(--ask); background: var(--ask-bg); }
.question .lbl { color: var(--ask); }
.aside { font-size: 9pt; color: var(--soft); font-style: italic; margin: 2mm 0; }

/* ---- the checklist and the space to write ---- */
.checks {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5mm 5mm;
  margin: 3mm 0 0;
  font: 9pt/1 "Helvetica Neue", Helvetica, "Liberation Sans", sans-serif;
}
.check { display: flex; align-items: center; gap: 1.8mm; }
.box {
  width: 4mm;
  height: 4mm;
  border: 0.8pt solid var(--ink);
  border-radius: 0.5pt;
  flex: 0 0 auto;
}
.write {
  margin-top: 2.5mm;
  border-bottom: 0.5pt solid var(--rule);
  height: 7mm;
  position: relative;
}
.write::before {
  content: "if something is off, write it here";
  position: absolute;
  top: 0.5mm;
  left: 0;
  font: 7.5pt/1 "Helvetica Neue", Helvetica, sans-serif;
  color: #b0b0b0;
  letter-spacing: 0.03em;
}
hr { display: none; }
`;

function renderEntry(block) {
  const lines = block.split("\n");
  const head = lines[0].replace(/^###\s+/, "");
  const m = /^(\d{4})\s*—\s*(.*)$/.exec(head);
  const id = m ? m[1] : "";
  const expr = m ? m[2] : head;

  let out = `<div class="entry"><p class="entry-head">${
    id ? `<span class="id">${id}</span>` : ""
  }${esc(expr)}</p>`;

  let checks = null;
  for (const raw of lines.slice(1)) {
    const l = raw.trim();
    if (!l) continue;

    // the checklist strip
    if (/^>\s*reviewer:/i.test(l)) {
      checks = [...l.matchAll(/\[\s*\]\s*([^\[]+)/g)].map((x) => x[1].trim().replace(/\s+/g, " "));
      continue;
    }
    // callouts
    let c = /^-\s*⚑\s*\*\*REGION:\*\*\s*(.*)$/.exec(l);
    if (c) {
      out += `<div class="callout region"><span class="lbl">Region claim — does this match your experience?</span>${esc(c[1])}</div>`;
      continue;
    }
    c = /^-\s*⚑\s*\*\*QUESTION:\*\*\s*(.*)$/.exec(l);
    if (c) {
      out += `<div class="callout question"><span class="lbl">Question — the entry is waiting on this</span>${esc(c[1])}</div>`;
      continue;
    }
    c = /^-\s*\*\((.*)\)\*$/.exec(l);
    if (c) {
      out += `<p class="aside">${esc(c[1])}</p>`;
      continue;
    }
    // the tag line
    if (/^-\s*\*\*register:\*\*/.test(l)) {
      out += `<p class="tags">${l
        .replace(/^-\s*/, "")
        .replace(/\*\*(.+?):\*\*/g, "$1:")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/·/g, "&nbsp;·&nbsp;")}</p>`;
      continue;
    }
    // lit / meaning / example
    c = /^-\s*\*\*(.+?)\*\*\s*(.*)$/.exec(l);
    if (c) {
      out += `<p class="f"><span class="k">${esc(c[1].replace(/:$/, ""))}</span>${esc(c[2])}</p>`;
      continue;
    }
    // the example's english gloss, an em-dashed italic continuation
    c = /^—\s*\*(.*)\*$/.exec(l);
    if (c) {
      out += `<p class="f"><span class="k"></span><span class="gloss">${esc(c[1])}</span></p>`;
      continue;
    }
    out += `<p class="f">${esc(l.replace(/^-\s*/, ""))}</p>`;
  }

  if (checks?.length) {
    out += `<div class="checks">${checks
      .map((t) => `<span class="check"><span class="box"></span>${esc(t)}</span>`)
      .join("")}</div><div class="write"></div>`;
  }
  return out + `</div>`;
}

function toHtml(md, title) {
  // Split on headings, keeping the shapes this worklist actually uses.
  const parts = md.split(/\n(?=###?\s)/);
  const front = parts.shift();

  const fm = /^#\s+(.*)$/m.exec(front);
  const h1 = fm ? fm[1] : title;
  const afterTitle = front.replace(/^#\s+.*$/m, "");
  const [ledeRaw, ...introRaw] = afterTitle.split(/\n(?=###\s)/);

  let body = `<h1>${esc(h1)}</h1><div class="lede">${md2html(
    ledeRaw.replace(/^---$/gm, "").trim()
  )}</div><div class="intro">${md2html(introRaw.join("\n").replace(/^---$/gm, "").trim())}</div>`;

  let open = false;
  for (const p of parts) {
    if (/^##\s/.test(p)) {
      if (open) body += `</div>`;
      const lines = p.split("\n");
      const h = lines[0].replace(/^##\s+/, "");
      const note = lines.slice(1).join("\n").replace(/^---$/gm, "").trim();
      body += `<div class="section"><h2>${esc(h)}</h2>`;
      if (note) body += `<div class="section-note">${md2html(note)}</div>`;
      open = true;
    } else if (/^###\s+\d{4}\s/.test(p)) {
      body += renderEntry(p.replace(/^---$/gm, "").trim());
    } else {
      // A ### that is not an entry id is prose — "How to return this" and the
      // like. renderEntry would treat each of its lines as a field and emit
      // one paragraph per source line, which is what left the front matter
      // set line-by-line down a third of the page.
      body += `<div class="intro">${md2html(p.replace(/^---$/gm, "").trim())}</div>`;
    }
  }
  if (open) body += `</div>`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(h1)}</title><style>${CSS}</style></head><body>${body}</body></html>`;
}

const browser = await chromium.launch();
for (const f of files) {
  const src = resolve(f);
  const md = readFileSync(src, "utf8");
  const name = basename(src, ".md");
  const html = toHtml(md, name);
  const htmlPath = join(dirname(src), name + ".html");
  writeFileSync(htmlPath, html);

  const page = await browser.newPage();
  await page.goto("file://" + htmlPath, { waitUntil: "load" });
  const pdf = join(dirname(src), name + ".pdf");
  const lang = /-ES-/.test(name) ? "Spanish" : /-IT-/.test(name) ? "Italian" : "";
  await page.pdf({
    path: pdf,
    format: "A4",
    printBackground: true,
    margin: { top: "16mm", bottom: "18mm", left: "14mm", right: "14mm" },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font:7.5pt 'Helvetica Neue',Helvetica,sans-serif;color:#8a8a8a;width:100%;padding:0 14mm;display:flex;justify-content:space-between"><span>un puente al giorno · ${lang} review</span><span></span></div>`,
    footerTemplate: `<div style="font:7.5pt 'Helvetica Neue',Helvetica,sans-serif;color:#8a8a8a;width:100%;padding:0 14mm;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
  });
  await page.close();
  const entries = (md.match(/^###\s+\d{4}\s/gm) ?? []).length;
  console.log(`${pdf} ← ${entries} entries`);
}
await browser.close();
