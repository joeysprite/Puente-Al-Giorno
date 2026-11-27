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
    ")\\b"
);

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
      const stop = rest.search(CLOSE);
      let span = (stop === -1 ? rest : rest.slice(0, stop)).trim();
      // Drop a dangling connective left by the cut.
      span = span.replace(/[,;:—-]\s*$/, "").trim();
      if (span.length > 12) spans.push(span);
    }
  }
  if (!spans.length) return null;

  // De-duplicate: a BOTH span can also match the language marker inside it.
  const seen = [];
  for (const s of spans) if (!seen.some((t) => t.includes(s) || s.includes(t))) seen.push(s);
  return seen.join("  ");
}
