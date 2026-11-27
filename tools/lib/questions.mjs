// Pull the question addressed to one reviewer out of review.notes.
//
// review.notes is an audit trail, not a message: ~930 characters averaging
// several sections, most of them for the editor (what was sourced, what came
// in from candidates, what was corrected). Buried in 73% of them is a direct
// question to a named reviewer. The --simple packets strip notes wholesale,
// which hides those questions — so an entry whose approval depends on one
// could never be answered, and 112 entries sat unapproved partly for that
// reason.
//
// This isolates the addressed span: start at a marker naming the reviewer,
// stop at the next marker of any kind. The marker vocabulary below was taken
// from the notes themselves (every all-caps run of 2+ words across the 112
// unapproved entries), not guessed — so a new section heading that nobody has
// written yet will not terminate a span, and the question will run long rather
// than be truncated. Long is the safe failure here.

// Markers that OPEN a span addressed to a reviewer.
const ADDRESS = {
  es: /\b(?:FOR\s+THE\s+(?:SPANISH|ES)\s+REVIEWER|(?:ES|SPANISH)\s+REVIEWER)\b\s*(?:\([^)]*\))?\s*[,:]?\s*/gi,
  it: /\b(?:FOR\s+THE\s+(?:ITALIAN|IT)\s+REVIEWER|(?:IT|ITALIAN)\s+REVIEWER)\b\s*(?:\([^)]*\))?\s*[,:]?\s*/gi,
  both: /\b(?:BOTH\s+REVIEWERS|QUESTIONS\s+FOR\s+REVIEWERS)\b\s*[,:]?\s*/gi,
};

// Markers that CLOSE it — the next section of the audit trail. Includes the
// other language's address marker, so a two-reviewer note splits cleanly.
const CLOSE = new RegExp(
  "\\b(?:" +
    [
      "(?:FOR\\s+THE\\s+)?(?:ES|IT|SPANISH|ITALIAN|BOTH)\\s+REVIEWERS?",
      "QUESTIONS\\s+FOR\\s+REVIEWERS",
      "SOURCES\\s+NOT\\s+HUMAN-VERIFIED",
      "CROSS-REF(?:ERENCE)?(?:\\s+FIX)?",
      "COPY\\s+FIX",
      "NOTE\\s+(?:ON|IS|WHAT)",
      "(?:SCHEDULING|DESIGN)\\s+NOTE",
      "EDITORIAL\\s+FLAG",
      "REGISTER\\s+FLAG",
      "TIER\\s+[A-C]",
      "EXAMPLES\\s+ARE\\s+ORIGINAL",
      "CAME\\s+IN\\s+(?:AS|MARKED)",
      "(?:AUTHORITY|TAG)\\s+GAP",
      "READ\\s+THIS",
      "HONEST\\s+WEIGHT\\s+ASSESSMENT",
      "PAIRING\\s+IS",
      "NOT\\s+PAIRED\\s+WITH",
      "NO\\s+TRAP\\s+FOUND",
      "CHECK\\s+BOTH",
      "WHY\\s+THIS\\s+PAIRING",
      "SCOPE\\s+REVERSAL",
    ].join("|") +
    ")\\b" +
    // Plus any single ALL-CAPS word used as a heading — "PLACEMENT:",
    // "SCHEMA:", "ENTRY:". The two-word inventory above missed these, and a
    // span that ran past one picked up editor and engineering notes: 0292's
    // Spanish question ran on into the pin-vs-events-registry decision, which
    // is Joe's problem and not something to put in front of a reviewer.
    // REVIEWER(S) is excluded because that is an OPEN marker, not a close.
    // REVIEWER(S) is excluded because it is an OPEN marker. QUESTION is
    // excluded because it INTRODUCES the ask rather than ending it — notes
    // write "ES REVIEWER, THIS IS THE DECIDING QUESTION: in MX, does…", and
    // closing there threw away the question it was announcing.
    "|\\b(?!REVIEWERS?\\b|QUESTIONS?\\b)[A-Z][A-Z0-9]{3,}(?:-[A-Z0-9]+)?:"
);

// Internal vocabulary. A context sentence containing any of it is editor- or
// engineering-directed and is dropped rather than shown to a reviewer.
// Two tests. The vocabulary catches named internals. The structural one
// catches the rest: a sentence carrying its own ALL-CAPS heading ("ACTION:",
// "PLACEMENT:") is a note to the editor — reviewers are addressed in prose,
// never under a heading — so it is dropped whatever words it uses.
const INTERNAL =
  /\b(validator|events\.json|pin[Ww]indow|alternatives\.json|CANDIDATES\.md|Joe|batch \d|overrides|cross-ref|registry|schema|headword|ficha|Top picks)\b|\b[A-Z]{4,}:/;

const allCaps = (s) => !/[a-z]/.test(s);

/**
 * The question(s) for `lang`'s reviewer, or null. Spans addressed to BOTH are
 * included for either language — they were written to be answered twice.
 */
export function questionFor(entry, lang) {
  const notes = (entry.review?.notes ?? "").replace(/\s+/g, " ").trim();
  if (!notes) return null;

  const spans = [];
  for (const key of [lang, "both"]) {
    const rx = new RegExp(ADDRESS[key].source, "gi");
    for (const m of notes.matchAll(rx)) {
      const rest = notes.slice(m.index + m[0].length);

      // Take the first close position that leaves actual prose behind. An
      // emphatic all-caps lead-in ("THIS IS THE DECIDING …") is not the end of
      // anything, so a cut that yields only capitals is the wrong cut — keep
      // looking past it.
      let stop = -1;
      let from = 0;
      while (true) {
        const rel = rest.slice(from).search(CLOSE);
        if (rel === -1) break;
        const at = from + rel;
        if (!allCaps(rest.slice(0, at))) { stop = at; break; }
        from = at + 1;
      }
      let span = (stop === -1 ? rest : rest.slice(0, stop)).trim();

      // A cut can orphan the first word or two of the NEXT heading when that
      // heading carries no colon ("… old-fashioned? SCHEMA"). A trailing run
      // of capitals is never part of the question, so drop it.
      span = span.replace(/(?:\b[A-Z][A-Z0-9-]{2,}\b[\s.]*){1,6}$/, "").trim();
      // Drop a dangling connective left by the cut.
      span = span.replace(/[,;:—-]\s*$/, "").trim();

      // Some spans open mid-clause, because the address marker sits inside a
      // sentence rather than starting one ("… deliberately non-specific per
      // the regional-variation principle. ES REVIEWER, if you want that
      // sharpened…"). Alone that reads as a fragment, so carry the preceding
      // sentence in, labelled, so it is not mistaken for part of the ask.
      if (/^[a-z]/.test(span)) {
        const prev = notes.slice(0, m.index).trim().split(/(?<=[.?!])\s+/).pop();
        if (prev && prev.length > 20 && prev.length < 320 && !allCaps(prev) && !INTERNAL.test(prev)) {
          span = `(context: ${prev}) ${span}`;
        }
      }

      if (span.length > 12) spans.push(span);
    }
  }
  if (!spans.length) return null;

  // De-duplicate: a BOTH span can also match the language marker inside it.
  const seen = [];
  for (const s of spans) if (!seen.some((t) => t.includes(s) || s.includes(t))) seen.push(s);
  return seen.join("  ");
}
