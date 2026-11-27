// Shared entry classifier.
//
// These patterns were the inline definitions in build-review-queue.mjs. They
// are here so build-review-lists.mjs can select the same cohorts without a
// second copy drifting out of step with the first.

export const OPEN_Q = /reviewer to (confirm|add|drop|check|verify)/i;
export const LOAD_BEARING =
  /(THIS DECIDES THE ENTRY|IS THE ENTRY AND IT IS UNVERIFIED|IS THE ENTRY|MINE AND UNVERIFIED|UNVERIFIED AND IS WHAT THE ENTRY RESTS ON|whole bridge rests|the entry has no bridge|MAY NOT BE A PAIR)/i;
export const WEAK = /(NO TRAP EXISTS|confidence-builder|HONEST WEIGHT ASSESSMENT|close to the floor)/i;
export const EDITORIAL = /(REGISTER FLAG|EDITORIAL FLAG|sexist|slur|should probably not ship|not ship a slur)/i;

// A citation nobody can verify by opening a dictionary: it needs REPLACING,
// not ticking, so an entry resting on one is not ready for a native reviewer.
export const isCorpusCited = (e) =>
  ["es", "it"].some((s) => (e[s]?.sources ?? []).some((x) => x.authority === "Corpus"));

// Ready for Stage 3: still unapproved, sourced to something openable, and not
// waiting on a decision only the editor can make.
//
// The order matters and mirrors build-review-queue.mjs's chain. An entry whose
// notes raise BOTH a load-bearing question and a weight question is still
// reviewable: the reviewer's answer is what settles the weight question, so
// holding it back inverts the dependency. Only a standalone weight doubt
// (band 4) is the editor's call to make first.
export function readyForReviewer(e) {
  const st = e.review?.status;
  const n = e.review?.notes ?? "";
  if (st === "approved" || st === "retired") return false;
  if (isCorpusCited(e)) return false;
  if (EDITORIAL.test(n)) return false;      // band 2 — editor decides
  if (LOAD_BEARING.test(n)) return true;    // band 3 — cheapest review, one question
  if (WEAK.test(n)) return false;           // band 4 — editor decides
  return st === "needs_review";             // band 5 — ordinary queue; band 6 drafts excluded
}
