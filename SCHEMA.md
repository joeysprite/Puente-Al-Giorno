# Idiom Bank — Entry Schema (v2)

Changes from v1, and why:

1. **`bridge.interference` is directional.** `es_to_it` and `it_to_es` are
   different warnings for different learners, and one does not imply the other.
   A Spanish speaker learning Italian trips on the two-auxiliary system; an
   Italian learning Spanish trips on `ser`/`estar`, which Italian never prepared
   them for. Both keys are **required to be present**; `null` is a legal value
   and means *"a human looked and there is no trap this direction."* Omitting the
   key is not the same as `null` and fails validation. Silence must be a decision.
2. **English is a support rail, not the frame.** `bridge.note` is written
   ES↔IT-first: it explains the two languages to each other, and only reaches for
   English where English genuinely clarifies. `exampleTranslation` stays in
   English because that's the shared rail your buyers can read. But an entry whose
   *bridge* only makes sense by routing through English is a weak entry.
3. **Bank composition is validated, not hoped for.** A bank built from
   "idioms that pleasingly match" drifts toward the charming and the useless.
   `tirar la toalla` / `gettare la spugna` is lovely and no Spanish speaker will
   ever get it wrong in a way that costs them anything. The entries that earn the
   subscription are the ones that *don't* map: `salire`, `burro`, `imbarazzata`.
   The validator enforces a ceiling on the easy ones and a floor on the hard ones.
4. **Reviewer identity is an allowlist, not a string.** v1 said "a `verifiedBy`
   that is a person." That's a rule you have to *remember*. `reviewers.json` is a
   rule that *bites*: an id not on the list fails CI, and a reviewer may only sign
   off in a language they are native in.

Everything else from v1 survives: nothing ships unreviewed, register is required,
sources are for authority rather than for copying, content is channel-agnostic,
pins are hard and seasons are soft.

---

## Schema

```jsonc
{
  // ---- identity ----
  "id": "0042",                    // stable, never reused, never renumbered.
                                   // Filename MUST be <id>.json.
  "type": "idiom",                 // idiom | proverb | formula | collocation | marker
                                   //   marker = particle or discourse item (ojalá/magari, o sea/cioè)

  // ---- the two languages ----
  // Each side stands alone. An entry is valid only if BOTH sides are complete.
  "es": {
    "text": "Salir",
    "literal": "to leave / to go out",
    "meaning": "To exit, or to go out.",        // YOUR wording, never the dictionary's
    "example": "Salgo de casa a las ocho.",
    "exampleTranslation": "I leave the house at eight.",   // English = support rail

    "register": "standard",   // standard | colloquial | slang | vulgar | literary | dated
    "formality": "ok_in_exam",// ok_in_exam | neutral | avoid_in_exam
                              //   drives the "safe for CILS/DELE oral?" badge

    "regions": ["mx", "es", "ar"],  // where it is ACTUALLY used. Non-empty.
    "regionNote": null,             // REQUIRED if regions === ["es"] — a
                                    // Peninsular-only entry must never be served
                                    // as neutral to a LatAm default audience.

    "sources": [                    // >= 1 required for approval
      {
        "authority": "RAE (DLE)",   // RAE | Treccani | De Mauro | Cervantes | Corpus
        "url": "https://dle.rae.es/salir",
        "headword": "salir",
        "verifiedOn": "2026-07-12", // when a HUMAN opened the page
        "verifiedBy": "native-mx-01"// must exist in reviewers.json with role "verifier"
      }
    ]
  },

  "it": {
    "text": "Salire",
    "literal": "to go up / to climb / to board",
    "meaning": "To ascend; to get on (a vehicle).",
    "example": "Salgo sull'autobus.",
    "exampleTranslation": "I'm getting on the bus.",
    "register": "standard",
    "formality": "ok_in_exam",
    "regions": ["it"],
    "regionNote": null,
    "sources": [
      {
        "authority": "Treccani",
        "url": "https://www.treccani.it/vocabolario/salire/",
        "headword": "salire",
        "verifiedOn": "2026-07-12",
        "verifiedBy": "native-it-03"
      }
    ]
  },

  // ---- the differentiator ----
  // Single-language products structurally cannot produce this field. It is the moat.
  "bridge": {
    "note": "Identical-looking verbs, opposite directions of travel: Spanish salir goes OUT, Italian salire goes UP. Italian's 'to leave' is uscire — which is exactly the verb a Spanish speaker will not reach for.",

    "tags": ["false_friend"],
      // >= 1 required, from:
      //   shared_metaphor      — the pleasing ones. CAPPED. See composition rules.
      //   cognate_pair         — safe cognates. Also counts as "easy".
      //   false_friend         — looks the same, means something else. HIGH VALUE.
      //   auxiliary_trap       — essere/avere vs. haber. HIGH VALUE.
      //   interference_risk    — L1 structure leaks into L2. HIGH VALUE.
      //   preposition_differs  — the silent fossiliser. HIGH VALUE.
      //   register_differs     — same meaning, different social danger. HIGH VALUE.

    "interference": {
      // BOTH keys required. null is legal and means "checked; no trap this way."
      "es_to_it": "A Spanish speaker will use 'salire' to mean 'to leave' and say the opposite of what they intend. Italian 'to leave' is uscire.",
      "it_to_es": "Milder in reverse: an Italian reaching for 'salir' to mean 'go up' will be understood as 'go out'. The Spanish verb is subir."
    }
  },

  // ---- scheduling ----
  "pin": null,                     // HARD. { "month": 1, "day": 1 }
  "pinWindow": null,               // HARD-ish. { "from": "12-20", "to": "12-26" }
  "season": null,                  // SOFT weighting: winter | spring | summer | autumn
  "themes": ["movement", "false_friends"],

  // ---- pedagogy ----
  "cefr": "A2",                    // A2 | B1 | B2 | C1 — gates which tier sees it
  "difficulty": 2,                 // 1–5, within-level ordering

  // ---- governance ----
  "review": {
    "status": "approved",          // draft | needs_review | approved | retired
                                   // ONLY `approved` may be scheduled or sent.
    "esReviewer": "native-mx-01",  // must be in reviewers.json, role "reviewer",
    "itReviewer": "native-it-03",  //   and native in the language they signed off
    "reviewedOn": "2026-07-12",
    "notes": null
  },

  "createdOn": "2026-07-12",
  "retiredReason": null
}
```

---

## Validation rules

Run `node tools/validate.mjs` on every commit. Two severities:

- **ERROR** — blocks the commit. The entry cannot be scheduled or delivered.
- **WARN** — reported, does not block. Mostly staleness and bank health.

### Per-entry (ERROR)

- `review.status === "approved"` before an entry may be scheduled *(draft entries
  are allowed to exist and are skipped by the delivery-readiness checks)*
- filename matches `id`; `id` unique across the bank
- both `es` and `it` complete: `text`, `literal`, `meaning`, `example`,
  `exampleTranslation`, `register`, `formality`, non-empty `regions`
- both sides have `sources.length >= 1`, each with a plausible `url`, an
  `authority` from the enum, a `verifiedOn` that is not in the future, and a
  `verifiedBy` present in `reviewers.json` **with role `verifier`**
- `review.esReviewer` / `review.itReviewer` present in `reviewers.json` with role
  `reviewer` **and native in that language** (an Italian reviewer cannot sign off
  the Spanish side)
- `bridge.note` non-empty and >= 40 chars (a one-liner is not a bridge)
- `bridge.tags` non-empty, all from the enum
- `bridge.interference` has **both** `es_to_it` and `it_to_es` keys present
- if any HIGH-VALUE tag is present (`false_friend`, `auxiliary_trap`,
  `interference_risk`, `preposition_differs`, `register_differs`), then **at least
  one** interference direction must be non-null. You cannot claim a trap and then
  decline to say what it is.
- if `es.regions` is exactly `["es"]`, `es.regionNote` must be non-empty
- if `type === "formula"`, a `pin` or `pinWindow` is present
- no two entries pinned to the same date
- `cefr` in enum; `difficulty` 1–5

### Bank composition (ERROR, once the bank is big enough to mean anything)

Evaluated across **approved** entries only, and only once there are >= 20 of them
(below that the ratios are noise):

- entries tagged **only** with `shared_metaphor` and/or `cognate_pair` — the easy,
  pleasing ones — must be **<= 33%** of the approved bank
- entries carrying **at least one** high-value tag must be **>= 50%**

This is the rule that stops the bank drifting toward the delightful and useless.
If it fires, the fix is not to loosen the threshold. The fix is to go write some
false friends.

### WARN

- any source `verifiedOn` older than 24 months → re-verify
- approved bank < 30 entries → not yet a product
- CEFR spread heavily skewed to one level

---

## What is stored per user

The schedule is a pure function of `(date, bank)`, so per-user storage stays small:

- `startedOn` — anchors their archive
- **`l1`** — `es` | `it` | `en`. **New in v2.** This is what selects which
  `bridge.interference` direction is served. An English-L1 learner sees the
  `bridge.note` and no interference warning; it isn't for them.
- `target` — `it` | `es` | `both`
- `known` / `favorites` — entry ids
- `tier` — free | paid
- `channels` — email / whatsapp, each with **opt-in timestamp and source**

One bank, two directional products, no fork.

---

## The honest bottleneck (unchanged)

The system is a month. Getting to 100 approved entries with two native reviewers
is the year — and v2 makes it *harder*, deliberately, because half of them now
have to be false friends and auxiliary traps rather than charming boxing
metaphors. Those take longer to find and longer to write.

That is the correct trade. If the bank stalls at 30, you have learned something
cheap and true.
