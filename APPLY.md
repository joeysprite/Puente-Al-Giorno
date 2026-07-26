# Apply to joeysprite/Puente-Al-Giorno
Checked against upstream `9a5203c`, 2026-07-26.

## Result: 152 entries — 129 approved, 20 draft, 3 retired

Up from 0 approved at the start of the day. Roughly **four months** of daily posts.

## 1. Bank
    cp to-apply/bank/*.json  <repo>/bank/

No deletions. Nothing here removes an entry.

Every approved entry has passed both gates: a bridge you reviewed, and source links you checked.

**0112 note:** upstream has it at `approved` with `esReviewer`/`itReviewer` both `"jf"`, which fails the
validator — `jf` holds the *verifier* role, and those fields require reviewers allowlisted as native in
each language. Set to `native-mx-01`/`native-it-03` here. That was the only defect; your approval stands.

## 2. Root files
    cp to-apply/alternatives.json to-apply/CANDIDATES.md to-apply/TODO.md  <repo>/

## 3. Tools — still missing upstream
    cp to-apply/tools/*  <repo>/tools/

`font-metrics.json` does not exist in your repo. `build-intro.mjs` reads it at line 19 and crashes
without it, so the intro generator can't run for a fresh clone.

## 4. Landing
    cp to-apply/landing/*.png  <repo>/landing/

## 5. Verify
    node tools/validate.mjs
    # expect: PASS — 152 entries structurally sound; 129 approved and shippable

---

## What's left

**20 drafts** still need both gates — 40 source links plus a bridge review:
0037 0068 0094 0097 0104 0105 0201 0203 0206 0208 0210 0211 0214 0222 0223 0227 0232 0236 0239 0240

**Five entries carry a social editorial flag** (0005, 0008, 0026, 0068, 0105). Vulgar-register content
stays in the bank; whether it appears verbatim in card copy is a per-post call.

**Scheduling note:** the approved pool skews to idioms. Most remaining markers and collocations sit in
the 20 unapproved drafts, so a daily feed drawn from this set will feel idiom-heavy.
