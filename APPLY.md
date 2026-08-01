# Apply to joeysprite/Puente-Al-Giorno
Checked against upstream `main` (87 commits, `landing: 2026-07-30`), 2026-08-01.

## Packaging convention

**Every upload bundle is a zip that mirrors the repo directory structure**, paths relative to repo root.
Unzip it and drag the top-level folders onto the repo in the GitHub web UI; paths match, so files land where
they belong. No `to-apply/` wrapper, no manual `cp` step.

Consequence worth remembering: **drag-and-drop only adds and overwrites. It cannot delete.** Anything that
needs removing has to be deleted in the web UI by hand.

## Result: 152 entries — 129 approved, 20 draft, 3 retired. Validator PASS.

## 1. Assets — 82 new PNGs
    landing/cards/    41 files, 1200x630
    landing/social/   41 files, 1080x1080

Closes the asset gap: every approved entry now has both. **All 82 are new files — nothing is overwritten.**
Committed assets were deliberately left alone; regenerating one yields a visually identical but not
byte-identical PNG, and churning 88 files for an invisible diff is not worth it.

## 2. Calendar
    bank/0060.json    ferragosto -> us_labor_day
    events.json       adds us_labor_day (nth_weekday, first Monday of September, window 3 before)
    overrides.json    2026-08-10 -> 0034 (launch day)

0060 *hacer puente / fare il ponte* now lands 2026-09-07. Scheduler invariants verified for 2026, 2027,
2028 and 2030.

**Launch day.** 0034 *acabo de llegar / sono appena arrivato* is forced onto 2026-08-10. It displaces
*quien fue a Sevilla* cleanly to the 11th and cascades the rest of c2 by a day. One wrinkle: 0034 still
comes round naturally on 2026-09-11, so the launch pair repeats 32 days later. Left as is — flag if that
should be suppressed.

**This leaves Ferragosto vacant** — 15 August falls to plain rotation, five days after launch. See TODO §10
for the three options and why none was picked.

## 3. Reviewer worklists
    reviewers/REVIEW-ES.md
    reviewers/REVIEW-IT.md

**Not optional.** `validate.yml` runs `build-review-lists.mjs --check` on every push, and these were stale —
last generated 2026-07-22, before the approval wave. Pushing without them fails CI. The diff is large because
it absorbs every status change since that date, not just 0060.

## 4. Log
    TODO.md           adds §10 — this session

## 5. Verify
    node tools/validate.mjs bank reviewers.json events.json
    node tools/build-review-lists.mjs --check
    # expect: PASS — 152 entries structurally sound; 129 approved and shippable
    #         Reviewer lists are current.

---

## Not in this bundle

**Delete by hand in the web UI:** `landing/cards/` and `landing/social/` each hold `0009`, `0027`, `0042`,
which have no bank entry. A zip cannot remove them.

**Ferragosto replacement** — undecided. 0075 attaches cleanly; 0080 fits better thematically but carries
`season: summer`, which the validator forbids alongside an event link; or 0060 can multi-link back onto
`ferragosto` alongside `us_labor_day`, with a note per link.

**Launch opener** — decided: **0034** *acabo de llegar / sono appena arrivato*, forced via `overrides.json`
for 2026-08-10. See §2 below.

**20 drafts** still need both gates — 40 source links plus a bridge review:
0037 0068 0094 0097 0104 0105 0201 0203 0206 0208 0210 0211 0214 0222 0223 0227 0232 0236 0239 0240

At 129 approved the pool runs roughly four months of daily posts, to early December.
