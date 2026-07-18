#!/usr/bin/env node
/**
 * Idiom Bank validator (schema v2).
 *
 * Zero dependencies. Run in CI on every commit:
 *   node tools/validate.mjs [bankDir] [reviewersFile]
 *
 * Exit 0 = every entry is structurally sound and the bank's composition is sane.
 * Exit 1 = at least one ERROR. Nothing ships.
 *
 * Design note: every rule here exists because the alternative is *remembering*
 * the rule. An unreviewed, unsourced, or unflagged entry must be structurally
 * impossible to ship, not merely discouraged.
 */

import { readFileSync, readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";

// ---------------------------------------------------------------- enums

const TYPES = ["idiom", "proverb", "formula", "collocation", "marker"];
const REGISTERS = ["standard", "colloquial", "slang", "vulgar", "literary", "dated"];
const FORMALITY = ["ok_in_exam", "neutral", "avoid_in_exam"];
const CEFR = ["A2", "B1", "B2", "C1"];
const STATUS = ["draft", "needs_review", "approved", "retired"];
const SEASONS = ["winter", "spring", "summer", "autumn"];
const AUTHORITIES = ["RAE (DLE)", "Treccani", "De Mauro", "Cervantes", "Corpus"];

const ES_REGIONS = ["es", "mx", "ar", "cl", "co", "pe", "uy", "ve", "cr", "latam"];
const IT_REGIONS = ["it", "ch", "north", "south"];

const TAGS = [
  "shared_metaphor",
  "cognate_pair",
  "false_friend",
  "auxiliary_trap",
  "interference_risk",
  "preposition_differs",
  "register_differs",
];

/** Tags that mean "this entry teaches something a learner would otherwise get wrong." */
const HIGH_VALUE_TAGS = [
  "false_friend",
  "auxiliary_trap",
  "interference_risk",
  "preposition_differs",
  "register_differs",
];

/** Tags that mean "this entry is pleasant." Necessary; not sufficient. */
const EASY_TAGS = ["shared_metaphor", "cognate_pair"];

// -------------------------------------------------------------- knobs

const COMPOSITION = {
  /** Below this many approved entries the ratios are noise, so don't enforce. */
  minBankSizeToEnforce: 20,
  /** Entries tagged ONLY with easy tags may be at most this share of the bank. */
  maxEasyShare: 0.33,
  /** Entries carrying >=1 high-value tag must be at least this share. */
  minHighValueShare: 0.5,
};

const SOURCE_STALE_MONTHS = 24;
const MIN_BRIDGE_NOTE_CHARS = 40;
const PRODUCT_READY_ENTRIES = 30;

// ------------------------------------------------------------ reporting

let EVENTS = {};

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

// ------------------------------------------------------------- helpers

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const isPlainObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

/** Present-but-null is meaningful in this schema; absent is not the same thing. */
const hasKey = (obj, k) => isPlainObject(obj) && Object.prototype.hasOwnProperty.call(obj, k);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MMDD = /^\d{2}-\d{2}$/;

function isValidISODate(s) {
  if (!ISO_DATE.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function isValidUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

function monthsSince(isoDate) {
  const then = new Date(`${isoDate}T00:00:00Z`);
  const now = new Date();
  return (now.getFullYear() - then.getUTCFullYear()) * 12 + (now.getMonth() - then.getUTCMonth());
}

function isValidMonthDay(month, day) {
  if (!Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (month < 1 || month > 12) return false;
  // 29 Feb is allowed as a pin; the scheduler is responsible for common years.
  const maxDay = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  return day >= 1 && day <= maxDay;
}

// ------------------------------------------------------- reviewer registry

function loadEvents(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8")).events ?? {};
  } catch {
    console.error(`FATAL: cannot read events file at ${path}`);
    process.exit(1);
  }
}

function loadReviewers(path) {
  let raw;
  try {
    raw = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    console.error(`FATAL: cannot read reviewers file at ${path}: ${e.message}`);
    process.exit(1);
  }
  const people = raw.people ?? {};
  return {
    /** A model is not a valid reviewer. The allowlist is how that is enforced. */
    canVerify(id) {
      const p = people[id];
      return Boolean(p && Array.isArray(p.roles) && p.roles.includes("verifier"));
    },
    canReviewLang(id, lang) {
      const p = people[id];
      return Boolean(
        p &&
          Array.isArray(p.roles) &&
          p.roles.includes("reviewer") &&
          Array.isArray(p.lang) &&
          p.lang.includes(lang)
      );
    },
    known(id) {
      return Boolean(people[id]);
    },
  };
}

// --------------------------------------------------------- side validation

function validateSide(entry, lang, where, reviewers, strict) {
  const side = entry[lang];
  const W = `${where} [${lang}]`;

  if (!isPlainObject(side)) {
    err(W, "missing or not an object — an entry is valid only if BOTH sides are complete");
    return;
  }

  for (const f of ["text", "literal", "meaning", "example", "exampleTranslation"]) {
    if (!isNonEmptyString(side[f])) err(W, `\`${f}\` must be a non-empty string`);
  }

  if (!REGISTERS.includes(side.register)) {
    err(W, `\`register\` must be one of ${REGISTERS.join(" | ")} — there is no "unset"`);
  }
  if (!FORMALITY.includes(side.formality)) {
    err(W, `\`formality\` must be one of ${FORMALITY.join(" | ")}`);
  }

  // regions
  const allowed = lang === "es" ? ES_REGIONS : IT_REGIONS;
  if (!Array.isArray(side.regions) || side.regions.length === 0) {
    err(W, "`regions` must be a non-empty array — an entry with no region is served as neutral, and that is the bug");
  } else {
    for (const r of side.regions) {
      if (!allowed.includes(r)) err(W, `unknown region "${r}" (allowed: ${allowed.join(", ")})`);
    }
  }

  // The Peninsular rule: LatAm is the default audience, so a Spain-only entry
  // must carry an explicit note or it will be served as if it were neutral.
  if (lang === "es" && Array.isArray(side.regions)) {
    const peninsularOnly = side.regions.length === 1 && side.regions[0] === "es";
    if (peninsularOnly && !isNonEmptyString(side.regionNote)) {
      err(W, "regions is [\"es\"] (Peninsular-only) so `regionNote` is required — it must not be served as neutral");
    }
  }

  // sources
  if (!Array.isArray(side.sources) || side.sources.length === 0) {
    err(W, "`sources` must contain at least one entry — cite the dictionary, write your own gloss");
    return;
  }
  side.sources.forEach((src, i) => {
    const S = `${W}.sources[${i}]`;
    if (!isPlainObject(src)) {
      err(S, "not an object");
      return;
    }
    if (!AUTHORITIES.includes(src.authority)) {
      err(S, `\`authority\` must be one of ${AUTHORITIES.join(" | ")}`);
    }
    if (!isNonEmptyString(src.url) || !isValidUrl(src.url)) {
      err(S, "`url` must be a real http(s) URL");
    }
    if (!isNonEmptyString(src.headword)) err(S, "`headword` is required");

    if (!isNonEmptyString(src.verifiedOn) || !isValidISODate(src.verifiedOn)) {
      if (strict) err(S, "`verifiedOn` must be a YYYY-MM-DD date");
      else if (src.verifiedOn != null && !isValidISODate(src.verifiedOn)) err(S, "`verifiedOn` must be a YYYY-MM-DD date or null");
      else warn(S, "source not yet verified — required before approval");
    } else {
      const today = new Date().toISOString().slice(0, 10);
      if (src.verifiedOn > today) err(S, "`verifiedOn` is in the future");
      else if (monthsSince(src.verifiedOn) > SOURCE_STALE_MONTHS) {
        warn(S, `verified ${monthsSince(src.verifiedOn)} months ago — re-open the page and re-verify`);
      }
    }

    if (!isNonEmptyString(src.verifiedBy)) {
      if (strict) err(S, "`verifiedBy` is required");
    } else if (!reviewers.canVerify(src.verifiedBy)) {
      err(
        S,
        `\`verifiedBy\` "${src.verifiedBy}" is not an allowlisted human verifier in reviewers.json — ` +
          "a model is not a valid verifier"
      );
    }
  });
}

// ------------------------------------------------------- bridge validation

function validateBridge(entry, where) {
  const b = entry.bridge;
  const W = `${where} [bridge]`;

  if (!isPlainObject(b)) {
    err(W, "missing — the bridge IS the product; an entry without one is just a flashcard");
    return;
  }

  if (!isNonEmptyString(b.note)) {
    err(W, "`note` is required");
  } else if (b.note.trim().length < MIN_BRIDGE_NOTE_CHARS) {
    const msg = `\`note\` is ${b.note.trim().length} chars; a bridge under ${MIN_BRIDGE_NOTE_CHARS} is a label, not an explanation`;
    if (entry?.review?.status === "approved") err(W, msg); else warn(W, msg);
  }

  if (!Array.isArray(b.tags) || b.tags.length === 0) {
    err(W, "`tags` must be a non-empty array");
  } else {
    for (const t of b.tags) {
      if (!TAGS.includes(t)) err(W, `unknown tag "${t}" (allowed: ${TAGS.join(", ")})`);
    }
  }

  // The v2 change. Direction is not symmetric, so it cannot be one field.
  const intf = b.interference;
  if (!isPlainObject(intf)) {
    err(W, "`interference` must be an object with BOTH `es_to_it` and `it_to_es` keys");
    return;
  }
  for (const dir of ["es_to_it", "it_to_es"]) {
    if (!hasKey(intf, dir)) {
      err(
        W,
        `\`interference.${dir}\` key is missing. null is a legal value and means ` +
          "\"a human checked and there is no trap this direction\" — but the key must be present. " +
          "Silence has to be a decision."
      );
    } else if (intf[dir] !== null && !isNonEmptyString(intf[dir])) {
      err(W, `\`interference.${dir}\` must be a non-empty string or null`);
    }
  }

  // You may not claim a trap and then decline to say what it is.
  const tags = Array.isArray(b.tags) ? b.tags : [];
  const claimsTrap = tags.some((t) => HIGH_VALUE_TAGS.includes(t));
  const statesTrap =
    isNonEmptyString(intf.es_to_it) || isNonEmptyString(intf.it_to_es);
  if (claimsTrap && !statesTrap) {
    const which = tags.filter((t) => HIGH_VALUE_TAGS.includes(t)).join(", ");
    const msg = `tagged [${which}] but both interference directions are null — ` +
      "if there is a trap, name it; if there is no trap, drop the tag";
    if (entry?.review?.status === "approved") err(W, msg); else warn(W, msg);
  }
}

// -------------------------------------------------------- entry validation

function validateEntry(entry, file, reviewers) {
  const where = basename(file);

  if (!isPlainObject(entry)) {
    err(where, "not a JSON object");
    return;
  }

  // identity
  if (!isNonEmptyString(entry.id)) {
    err(where, "`id` is required");
  } else if (entry.id !== basename(file, ".json")) {
    err(where, `filename must match id — id is "${entry.id}" but file is "${basename(file)}"`);
  }
  if (!TYPES.includes(entry.type)) err(where, `\`type\` must be one of ${TYPES.join(" | ")}`);

  // languages
  const strict = entry?.review?.status === "approved";
  validateSide(entry, "es", where, reviewers, strict);
  validateSide(entry, "it", where, reviewers, strict);

  // the differentiator
  validateBridge(entry, where);

  // events — an entry may attach to several occasions (one "Viva!" entry serves
  // both Mexican Independence and Festa della Repubblica; they are different dates)
  if (entry.events != null) {
    if (!Array.isArray(entry.events)) {
      err(where, "`events` must be an array (possibly empty)");
    } else {
      for (const link of entry.events) {
        if (!isPlainObject(link) || !isNonEmptyString(link.key)) {
          err(where, "each `events` link needs a `key`");
          continue;
        }
        if (!EVENTS[link.key]) {
          err(where, `unknown event "${link.key}" — not in events.json`);
        }
        if (link.note != null && !isNonEmptyString(link.note)) {
          err(where, `events["${link.key}"].note must be a non-empty string or absent`);
        }
        // A footnote must not assert calendar facts. The scheduler generates those
        // per year, because they MOVE: in 2026 Italy's second Sunday of May is the
        // 10th, colliding with Mexico's fixed date, and a note promising "three
        // times in May" is a lie that year. Humans write the language; the machine
        // writes the dates.
        if (isNonEmptyString(link.note)) {
          const volatile_ = /\b(next|last|this)\s+(sunday|monday|week|month)\b|\b(twice|three times|four times)\b|\b\d{1,2}(st|nd|rd|th)?\s+(of\s+)?(january|february|march|april|may|june|july|august|september|october|november|december)\b/i;
          if (volatile_.test(link.note)) {
            warn(where, `events["${link.key}"].note asserts a calendar fact ("${link.note.slice(0, 50)}…"). ` +
              "Dates and counts move between years — leave them to the scheduler and keep the note about the language.");
          }
        }
        if (typeof link.requiresEvent !== "boolean") {
          err(where, `events["${link.key}"].requiresEvent must be true or false — ` +
            "true means the entry stays DORMANT in a year the event does not happen");
        }
      }
      // If one entry serves several occasions, EACH occasion must explain itself.
      // A subscriber who sees the same expression twice in May deserves to be told
      // why, and the reason differs by occasion — so an auto-generated note is not
      // good enough. Write all three.
      if (entry.events.length > 1) {
        const missing = entry.events.filter((l) => !isNonEmptyString(l?.note)).map((l) => l?.key);
        if (missing.length) {
          err(where, `links to ${entry.events.length} occasions but has no footnote for [${missing.join(", ")}] — ` +
            "each appearance must explain why it is appearing today");
        }
      }

      // An event window already implies a time of year. A season on top of it is
      // either redundant or contradictory, and the scheduler would have to pick.
      if (entry.events.length > 0 && entry.season != null) {
        err(where, "an entry cannot have both `events` and a `season` — the event window already places it");
      }
      if (entry.events.length > 0 && (entry.pin != null || entry.pinWindow != null)) {
        err(where, "an entry cannot have both `events` and a `pin`/`pinWindow` — pick one placement mechanism");
      }
    }
  }

  // hook: optional card-front teaser (headline + subhead). Written per entry,
  // shown when present, cleanly absent otherwise — never auto-generated.
  if (entry.hook != null) {
    if (!isPlainObject(entry.hook) || !isNonEmptyString(entry.hook.headline) || !isNonEmptyString(entry.hook.subhead)) {
      err(where, "`hook` must be null or { headline, subhead }, both non-empty");
    }
  }

  // cue: optional English production prompt
  if (entry.cue != null && !isNonEmptyString(entry.cue)) {
    err(where, "`cue` must be a non-empty string or null");
  }

  // pedagogy
  if (!CEFR.includes(entry.cefr)) err(where, `\`cefr\` must be one of ${CEFR.join(" | ")}`);
  if (!Number.isInteger(entry.difficulty) || entry.difficulty < 1 || entry.difficulty > 5) {
    err(where, "`difficulty` must be an integer 1–5");
  }
  if (entry.season != null && !SEASONS.includes(entry.season)) {
    err(where, `\`season\` must be null or one of ${SEASONS.join(" | ")}`);
  }
  if (entry.themes != null && !Array.isArray(entry.themes)) {
    err(where, "`themes` must be an array");
  }

  // scheduling
  if (entry.pin != null) {
    if (!isPlainObject(entry.pin) || !isValidMonthDay(entry.pin.month, entry.pin.day)) {
      err(where, "`pin` must be null or { month: 1–12, day: valid-for-month }");
    }
  }
  if (entry.pinWindow != null) {
    const w = entry.pinWindow;
    if (!isPlainObject(w) || !MMDD.test(w.from ?? "") || !MMDD.test(w.to ?? "")) {
      err(where, '`pinWindow` must be null or { from: "MM-DD", to: "MM-DD" }');
    }
  }
  const hasEventLink = Array.isArray(entry.events) && entry.events.length > 0;
  if (entry.type === "formula" && entry.pin == null && entry.pinWindow == null && !hasEventLink) {
    err(where, "type is `formula` but there is no pin, pinWindow, or event link — a greeting with no occasion is not a greeting");
  }

  // governance
  const r = entry.review;
  if (!isPlainObject(r)) {
    err(where, "`review` block is required");
  } else {
    if (!STATUS.includes(r.status)) {
      err(where, `\`review.status\` must be one of ${STATUS.join(" | ")}`);
    }
    if (strict) {
      if (!isNonEmptyString(r.esReviewer) || !reviewers.canReviewLang(r.esReviewer, "es")) {
        err(where, `\`review.esReviewer\` ("${r.esReviewer ?? "—"}") must be an allowlisted reviewer who is NATIVE in Spanish`);
      }
      if (!isNonEmptyString(r.itReviewer) || !reviewers.canReviewLang(r.itReviewer, "it")) {
        err(where, `\`review.itReviewer\` ("${r.itReviewer ?? "—"}") must be an allowlisted reviewer who is NATIVE in Italian`);
      }
      if (!isNonEmptyString(r.reviewedOn) || !isValidISODate(r.reviewedOn)) {
        err(where, "`review.reviewedOn` must be a YYYY-MM-DD date");
      }
    } else if (r.esReviewer != null && !reviewers.canReviewLang(r.esReviewer, "es")) {
      err(where, `\`review.esReviewer\` ("${r.esReviewer}") is set but is not an allowlisted native-Spanish reviewer`);
    } else if (r.itReviewer != null && !reviewers.canReviewLang(r.itReviewer, "it")) {
      err(where, `\`review.itReviewer\` ("${r.itReviewer}") is set but is not an allowlisted native-Italian reviewer`);
    }
    if (r.status === "retired" && !isNonEmptyString(entry.retiredReason)) {
      err(where, "status is `retired` but `retiredReason` is empty — say why, so it isn't re-added");
    }
  }

  if (!isNonEmptyString(entry.createdOn) || !isValidISODate(entry.createdOn)) {
    err(where, "`createdOn` must be a YYYY-MM-DD date");
  }
}

// ---------------------------------------------------------- bank-level rules

function validateBank(entries) {
  // id uniqueness
  const seen = new Map();
  for (const { file, entry } of entries) {
    const id = entry?.id;
    if (!isNonEmptyString(id)) continue;
    if (seen.has(id)) err("BANK", `duplicate id "${id}" in ${basename(file)} and ${basename(seen.get(id))}`);
    else seen.set(id, file);
  }

  // Each expression appears in exactly one entry (reverted 2026-07-17 to the
  // strict rule; spaced-repetition siblings were explored and set aside — may
  // return later). Retired entries are exempt: an entry may be retired and
  // rewritten under a new id.
  for (const side of ["es", "it"]) {
    const seenText = new Map();
    for (const { file, entry } of entries) {
      if (entry?.review?.status === "retired") continue;
      const t = entry?.[side]?.text?.trim().toLowerCase();
      if (!t) continue;
      if (seenText.has(t)) {
        err("BANK", `duplicate ${side} expression "${entry[side].text}" in ${basename(file)} and ${basename(seenText.get(t))} — same idiom, two ids`);
      } else {
        seenText.set(t, file);
      }
    }
  }

  // CEFR steering (policy 2026-07-17): the product centers on B1–B2. A2 is for
  // freebies and pacing; C1 sparingly. Soft signal only — editorial, not a gate.
  {
    const active = entries.filter(({ entry }) => entry?.review?.status !== "retired");
    const mix = {};
    for (const { entry } of active) mix[entry.cefr] = (mix[entry.cefr] ?? 0) + 1;
    const n = active.length;
    const core = ((mix.B1 ?? 0) + (mix.B2 ?? 0)) / n;
    console.log(`CEFR mix (active): ` + ["A2","B1","B2","C1"].map(l => `${l} ${mix[l] ?? 0}`).join(" · ") + ` — B1+B2 = ${Math.round(core*100)}%`);
    if (core < 0.6) {
      warn("BANK", `B1+B2 share is ${Math.round(core*100)}% of the active bank — policy says mostly B1–B2; favor them in new entries and approvals`);
    }
  }

  // pin collisions — two hard pins on one date means one of them silently loses
  const pinned = new Map();
  for (const { file, entry } of entries) {
    if (entry?.review?.status !== "approved" || entry?.pin == null) continue;
    const key = `${String(entry.pin.month).padStart(2, "0")}-${String(entry.pin.day).padStart(2, "0")}`;
    if (pinned.has(key)) {
      err("BANK", `pin collision on ${key}: ${basename(file)} and ${basename(pinned.get(key))} — one would silently lose`);
    } else {
      pinned.set(key, file);
    }
  }

  // composition
  const approved = entries
    .map((e) => e.entry)
    .filter((e) => e?.review?.status === "approved" && Array.isArray(e?.bridge?.tags));

  const n = approved.length;
  if (n === 0) {
    warn("BANK", "no approved entries — nothing can be scheduled");
    const all = entries.map((e) => e.entry).filter((e) => Array.isArray(e?.bridge?.tags));
    if (all.length >= COMPOSITION.minBankSizeToEnforce) {
      const easy = all.filter((e) => e.bridge.tags.length && e.bridge.tags.every((t) => EASY_TAGS.includes(t))).length;
      const hv = all.filter((e) => e.bridge.tags.some((t) => HIGH_VALUE_TAGS.includes(t))).length;
      const pc = (x) => `${((x / all.length) * 100).toFixed(0)}%`;
      console.log(`\nWorklist composition preview (${all.length} entries, all statuses): ` +
        `easy-only ${easy} (${pc(easy)}, ceiling 33%) | high-value ${hv} (${pc(hv)}, floor 50%)`);
      if (easy / all.length > COMPOSITION.maxEasyShare) {
        warn("BANK", `if everything were approved as-is, the composition gate would FAIL: ${pc(easy)} easy-only. ` +
          "Approve the traps first, or write more of them before approving the charming ones.");
      }
    }
    return;
  }

  const easyOnly = approved.filter(
    (e) => e.bridge.tags.length > 0 && e.bridge.tags.every((t) => EASY_TAGS.includes(t))
  );
  const highValue = approved.filter((e) => e.bridge.tags.some((t) => HIGH_VALUE_TAGS.includes(t)));

  const easyShare = easyOnly.length / n;
  const hvShare = highValue.length / n;

  const pct = (x) => `${(x * 100).toFixed(0)}%`;

  console.log(
    `\nBank composition: ${n} approved | easy-only ${easyOnly.length} (${pct(easyShare)}) | ` +
      `high-value ${highValue.length} (${pct(hvShare)})`
  );

  if (n < COMPOSITION.minBankSizeToEnforce) {
    console.log(
      `  (composition not enforced below ${COMPOSITION.minBankSizeToEnforce} approved entries — the ratios would be noise)`
    );
  } else {
    if (easyShare > COMPOSITION.maxEasyShare) {
      err(
        "BANK",
        `${pct(easyShare)} of the approved bank is easy-only (shared_metaphor / cognate_pair), ceiling is ` +
          `${pct(COMPOSITION.maxEasyShare)}. The pleasing ones are drifting out of hand. ` +
          "The fix is not to raise the ceiling; the fix is to go write some false friends."
      );
    }
    if (hvShare < COMPOSITION.minHighValueShare) {
      err(
        "BANK",
        `only ${pct(hvShare)} of the approved bank carries a high-value tag (false_friend, auxiliary_trap, ` +
          `interference_risk, preposition_differs, register_differs); floor is ${pct(COMPOSITION.minHighValueShare)}. ` +
          "These are the entries people pay for."
      );
    }
  }

  if (n < PRODUCT_READY_ENTRIES) {
    warn("BANK", `${n} approved entries — below ${PRODUCT_READY_ENTRIES} this is a prototype, not a product`);
  }

  // CEFR spread
  const byLevel = {};
  for (const e of approved) byLevel[e.cefr] = (byLevel[e.cefr] ?? 0) + 1;
  for (const [lvl, count] of Object.entries(byLevel)) {
    if (n >= COMPOSITION.minBankSizeToEnforce && count / n > 0.6) {
      warn("BANK", `${pct(count / n)} of the bank is ${lvl} — the level gating will feel thin elsewhere`);
    }
  }
}

// ---------------------------------------------------------------- main

function main() {
  const bankDir = resolve(process.argv[2] ?? "bank");
  const reviewersFile = resolve(process.argv[3] ?? "reviewers.json");
  const reviewers = loadReviewers(reviewersFile);
  EVENTS = loadEvents(resolve(process.argv[4] ?? "events.json"));

  let files;
  try {
    files = readdirSync(bankDir)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .map((f) => join(bankDir, f));
  } catch (e) {
    console.error(`FATAL: cannot read bank directory ${bankDir}: ${e.message}`);
    process.exit(1);
  }

  const entries = [];
  for (const file of files) {
    let entry;
    try {
      entry = JSON.parse(readFileSync(file, "utf8"));
    } catch (e) {
      err(basename(file), `invalid JSON: ${e.message}`);
      continue;
    }
    entries.push({ file, entry });
    validateEntry(entry, file, reviewers);
  }

  validateBank(entries);

  // ------------------------------------------------------------- report
  console.log(`\nChecked ${entries.length} entr${entries.length === 1 ? "y" : "ies"} in ${bankDir}`);

  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`  WARN  ${w}`);
  }

  if (errors.length) {
    console.log(`\n${errors.length} error(s):`);
    for (const e of errors) console.log(`  ERROR ${e}`);
    console.log("\nFAIL — nothing ships until these are fixed.\n");
    process.exit(1);
  }

  const nApproved = entries.filter((e) => e.entry?.review?.status === "approved").length;
  console.log(`\nPASS — ${entries.length} entries structurally sound; ${nApproved} approved and shippable.\n`);
  process.exit(0);
}

main();
