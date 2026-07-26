# Un puente al giorno — open items
Rewritten 2026-07-26.

**Bank: 151 entries — 64 approved, 84 draft, 3 retired. `needs_review` empty. Validator PASS.**
**Bridge review: 75 of 148 done. ✅ ALL 64 approved entries now have a reviewed bridge — zero outstanding.**
**All shipping fields are free of review commentary. `review.notes` keeps full provenance (internal, deliberate).**

> **Ready to apply:** `puente-al-giorno-2026-07-26.zip` — 94 bank files, alternatives, candidates, both tools,
> two PNGs. Checked against upstream `cdafc63`. Takes the repo 0 → 64 approved. No deletions needed.

---

## 1. ✅ Approved pool complete
All 64 approved entries have a reviewed bridge. Done in three batches on 2026-07-26: 18 never-scoped, then 25
tagged, plus the 7-entry narrow pass. 0033's empty directions were confirmed deliberate, not a gap.

## 2. In progress — 49 remaining `interference_risk` entries
`bridge-review.md`. All drafts, so corrections are cheap. All have both directions written — claims to check,
no gaps to fill. Only one (0233) makes a dialect claim. **Also needs 99 source links verified** before any can
be approved; bridge approval alone won't move them.

## 3. Then: the tagging blind spot
`shared_metaphor` or `cognate_pair` without `interference_risk` — never scoped into any pass. 31 of them are
approved. The narrow pass proved the risk is real: all 7 entries checked had genuine calque failures nobody
had written down, and one (0002, *cabra/capra*) turned out to be an unmarked false friend.

---

## 4. Source verification — 84 drafts, 169 links
Nothing else can reach `approved` without this. The two batches done so far covered the entries reviewers had
actually seen; most of the remaining 84 were never sent to review at all.

---

## 5. Known-open decisions

- **0071 / 0074** — headword change or example rewrite? Reviewer wrote *despilfarrado* over *manirroto*, and
  *se le van las cabras* over *tener pájaros en la cabeza*. The second reads as a different idiom. Both draft.
- **0056** *Al que madruga, Dios **le** ayuda* — Torres #19 gives Mexican *lo ayuda*. Held out of the first
  approval batch for this; still unresolved.
- **0092** — approved as *la última gota que hace rebosar la copa*; Torres #63 gives *la gota que derramó el
  vaso*, closer to the Italian and more Mexican. Changing it means un-approving it.
- **0033** *Menos mal* — typed `idiom` but patterns with the markers around it. Approved as-is.
- **0107 resurrection** — Spanish side (*ir por lana y volver trasquilado*) is real and Torres-attested (#61);
  only the Italian pairing was phantom. Queued in CANDIDATES.md.
- **0024 bridge** — offered to rewrite around your line ("one keeps the fish in the water, the other takes it
  out"), never answered. Better than what's in the entry.
- **17 entries still missing a direction** — 0002 0004 0005 0008 0010 0011 0012 0033 0113 0116 0208 0211 0222
  0227 0232 0239 0240. Several are deliberate (0033, 0113, 0116 are clean transfers). The rest are unwritten.

---

## 6. Structural problems worth fixing before they compound

**No reviewer for Argentina or Colombia.** The bank claims Argentine currency for 134 expressions and Colombian
for 129. `reviewers.json` has `native-mx-01`, a slot for `native-es-02`, and `native-it-03` — nobody for either.
55 of those entries are approved. Every regional claim in that set rests on nothing.

**Peninsular bias in `regions`.** Four instances found by accident, never by looking: 0112, 0024, 0026, and the
0018 dialect argument. All narrowed Spanish toward Peninsular by default, against a Mexican-default audience.
Nobody has swept for it.

**Tags decide review scope, and tags were guesses.** An entry got `interference_risk` when it was written, before
anyone looked for a trap — so the tag encoded an assumption and then hid everything it excluded. Sections 1–3
above are all consequences of this.

---

## 7. Policy

**Multi-mapping (2026-07-24)** — one expression may map to two or more others if each generates a valid bridge.
**Unenforceable: the validator rejects duplicates** (line ~472), a deliberate 2026-07-17 reversal recorded in
the code as *"spaced-repetition siblings were explored and set aside — may return later."* Recover *why* before
re-enabling. Live consequence: *essere a pezzi* + *estar hecho pedazos* becomes bankable the moment it relaxes.

**Not idiom-only (2026-07-24)** — if a pairing generates a valid bridge it belongs, whatever its type. Closes the
IT reviewer's 50 taxonomy objections. Verified: all 40 of the 0201–0240 block were already correctly typed.

**Vulgarity: bank vs. socials (2026-07-26)** — accurate register warnings stay in the bank; whether they appear
verbatim in public copy is a per-post editorial call. Flagged on **0005, 0008, 0026, 0068, 0105**.

**Dialect stance** — half-decided in practice (0025 Mexican, A009 archives the Castilian). Never formally stated.

**Reviewer terms** — paid or credited, and who owns contributions. Several corrections have now arrived.

---

## 8. Content pipeline

**Torres, 100 Mexican Idioms** — 94 of 100 not banked. Twins spotted: *dormirse en sus laureles* / *dormire sugli
allori* · *ahogarse en un vaso de agua* / *affogare in un bicchiere d'acqua* · *cuando el gato no está…* /
*quando il gatto non c'è i topi ballano* · *tener la sangre fría* / *avere il sangue freddo* · *llorar lágrimas
de cocodrilo* / *lacrime di coccodrillo* · *no todo lo que brilla es oro* / *non è tutto oro quel che luccica*.

**MXPA subjunctive** — 14 items from the ES reviewer. The uneven mapping onto Italian is the useful part.

**CANDIDATES.md** — *dar la cara* (ES solid, IT to re-hunt) · *estar hecho pedazos* · *estar hecho polvo*.

**A standing note may be worth it for *coger*** — vulgar across Mexico and the Río de la Plata, so it recurs
anywhere Italian *prendere* maps onto Spanish. Currently repeated per entry (0005, 0008).

---

## 9. Housekeeping

- **`tools/brand.json`** — stale orphan, safe to delete; all seven generators read the root copy.
- **Path drift** — `build-intro.mjs` writes to `landing/social/`, committed PNGs live in `landing/`.
- **`build-teaser.mjs`** — still not in the repo: needs `@resvg/resvg-js` and TTFs at `/tmp/cardfonts` converted
  from the shipped woff2, and that conversion isn't checked in. Committing the script alone adds a dead file.
- **Teaser** — the changes you had queued were never made.
- **Domain** · **privacy blanks** (legal name, contact email, postal address).
- **EDITOR worklist** — schema demos 0060/0090/0120 · alternatives A001–A008 · retired formulas 0070/0100/0110 ·
  themed sequences yes/no.
