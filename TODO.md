# Un puente al giorno — open items
Rewritten 2026-07-24. Resolved items removed. Only live work below.

**Bank: 151 entries — 64 approved, 84 draft, 3 retired. `needs_review` is empty. Validator PASS.**
**Bridge review: 31 entries done. 74 `interference_risk` entries remain, plus 53 in the tagging blind spot.**
**Alternatives: A001–A009, A011.**

> ⚠️ **NONE OF THIS IS PUSHED.** Everything from 2026-07-23/24 lives in an ephemeral container plus the
> outputs folder. Today took the bank from 0 approved to 64. If the container goes, that goes with it.
> **This is the highest-value action available and it is not editorial work.**

---

## 1. Push (do this first)

Staged package is stale — it predates all 64 approvals, the 0009 dissolution, the region corrections,
and A009/A011. Needs rebuilding before it's applied. Say the word.

Already upstream and identical: 0113–0117. Your `landing/index.html` and `match.html` are untouched by anything here.

Two files the repo needs that it has never had:
- **`tools/font-metrics.json`** — missing entirely; `build-intro.mjs` reads it at line 19 and crashes. Reconstructed from the Newsreader TTF. Nobody can run the intro generator until this lands.
- **`tools/build-teaser.mjs`** — deliberately excluded so far: needs `@resvg/resvg-js` plus TTFs at `/tmp/cardfonts` converted from the shipped woff2, and that conversion step isn't checked in anywhere. Committing the script alone adds a second file nobody can run.

---

## 2. Bridge review — the next real task

**131 of 151 entries carry at least one interference direction. Not one has ever been reviewed.**
Both worklists were generated in `--simple` mode, which strips the bridge and traps. Reviewers have never
seen the product's actual payload — the thing the cards teach.

Three failures have already surfaced by accident, never by looking:
- **0028** — the ES reviewer's own example used *voltear la tortilla* in the blame-shifting sense the bridge asserts is Italian-only. Approved on your overrule, flag preserved on the entry.
- **0006** — tagged `register_differs` with both directions null; the question had been put to the reviewer and came back ticked, unanswered.
- **0060** — the it→es trap was right but understated: *hacer el puente* isn't just article-wrong, it means the gymnastic backbend (DLE `puente` sense 9).

Scope if you want the high-value tags only: `interference_risk` 87 · `preposition_differs` 42 · `false_friend` 28 · `register_differs` 23 · `auxiliary_trap` 7.

Build `--bridge` mode in `build-review-lists.mjs`: a third mode beside default and `--simple`, asking two
questions per entry — *is this mistake real?* and *is it dialect-specific?* — showing the trap for the
direction that reviewer produces, one question, nothing else.

---

## 3. Peninsular-bias sweep

Three instances found, all by accident: **0112** (I narrowed *dar la cara* to `['es']` with no evidence — validator caught it), **0024** ("Castilian Spanish" with nothing behind it), **0026** (`regions: ['es']` directly contradicted by the reviewer calling it natural).

All three narrowed Spanish toward Peninsular by default. **Your audience default is Mexican, so this bias runs the wrong way.** Nobody has looked systematically — worth sweeping every entry with a Peninsular/Castilian label against the fact that the ES reviewer is Mexican and her clean pass is a Mexican attestation.

Still carrying stale "Reviewer to confirm" instructions (both still draft, so no pass to close them with): **0210**, **0222**.

---

## 4. Entry-level decisions still open

- **0071 / 0074** — headword change or example rewrite? Reviewer wrote *despilfarrado* over *manirroto*, and *se le van las cabras* over *tener pájaros en la cabeza*. The second reads as a different idiom. Both still draft.
- **0056** *Al que madruga, Dios **le** ayuda* — Torres #19 gives Mexican *lo ayuda* (leísmo divergence). Held out of the first approval batch for this; still unresolved, still draft.
- **0092** — approved as *la última gota que hace rebosar la copa*; Torres #63 gives *la gota que derramó el vaso*, closer to the Italian and more Mexican. Would need un-approving to change.
- **0033** *Menos mal* — typed `idiom` but patterns with the markers around it (*O sea*, *Ojalá* are both `marker`). Approved as-is.
- **0107 resurrection** — deleted whole, but the Spanish side (*ir por lana y volver trasquilado*) is real and Torres-attested (#61); only the Italian pairing was phantom. Queued in CANDIDATES.md.
- **0024 bridge** — offered to rewrite around your line ("one keeps the fish in the water, the other takes it out"), never answered. Better than what's in the entry.

---

## 5. Policy items

**Multi-mapping (decided 2026-07-24, unenforceable):** one expression may map to two or more others, provided
each generates a valid bridge. **The validator forbids this** (line ~472, hard error on duplicate expressions).
The code records it as a deliberate reversal: *"reverted 2026-07-17 to the strict rule; spaced-repetition
siblings were explored and set aside — may return later."* Before re-enabling, recover *why* they were set
aside — the outcome is in the repo, the reasoning isn't. Live consequence: *essere a pezzi* + *estar hecho
pedazos* becomes bankable again the moment the rule relaxes.

**Not idiom-only (decided 2026-07-24):** if a pairing generates a valid bridge it belongs, whatever its type.
Closes the IT reviewer's 50 taxonomy objections as non-blocking. Verified: all 40 of the 0201–0240 block were
already correctly typed `marker`/`collocation`, and every entry in the bank has a bridge note.

**Dialect stance** — half-decided in practice (0025 swapped to Mexican, A009 archives the Castilian, `reviewers.json`
has both slots). Never formally stated. The Peninsular-bias finding above makes this more urgent, not less.

**Reviewer terms** — paid or credited, and who owns their contributions. Your own EDITOR note said settle this
before the first correction arrives. Several have now arrived.

---

## 6. Remaining approval work

84 drafts, **169 unverified source links**. The two batches done today (27 explicit + 28 implicit) were the
entries reviewers had actually seen. Most of the remaining 84 were never sent to review at all.

---

## 7. Content pipeline

**Torres, 100 Mexican Idioms** — 94 of 100 not in the bank. Citable for existence and meaning; examples written fresh.
Twins spotted: *dormirse en sus laureles* / *dormire sugli allori* · *ahogarse en un vaso de agua* / *affogare in un bicchiere d'acqua* · *cuando el gato no está…* / *quando il gatto non c'è i topi ballano* · *tener la sangre fría* / *avere il sangue freddo* · *llorar lágrimas de cocodrilo* / *lacrime di coccodrillo* · *no todo lo que brilla es oro* / *non è tutto oro quel che luccica* · *aunque la mona se vista de seda* / *l'abito non fa il monaco*. Italian sides are Claude proposals, unverified.

**MXPA subjunctive expressions** — 14 items from the ES reviewer. Reduplicative frame (V-subj + *lo que* + V-subj),
which maps unevenly onto Italian — that unevenness is the useful part: near-twins (*sea como sea* / *sia come sia*),
structural divergence (*pase lo que pase* → *qualunque cosa succeda*), total divergence (*aunque sea* → *almeno*, no subjunctive).

**CANDIDATES.md holds** — *dar la cara* (ES solid, IT side to re-hunt) · *estar hecho pedazos* · *estar hecho polvo*.

---

## 8. Housekeeping

- **`tools/brand.json`** — stale orphan, safe to delete; all seven generators read the root copy.
- **Path drift** — `build-intro.mjs` writes to `landing/social/`, committed PNGs live in `landing/`.
- **Teaser** — the changes you had queued for it were never made; we never got to them.
- **Domain** — name settled in practice, domain not.
- **Privacy blanks** — legal name, contact email, postal address.
- **EDITOR worklist** — schema demos 0060/0090/0120 (all three now approved, keep/re-pair/drop still yours) · alternatives A001–A008 anchors all clean now · retired formulas 0070/0100/0110 · themed sequences yes/no.
