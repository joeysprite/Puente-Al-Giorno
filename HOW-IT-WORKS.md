# How it all works — Un puente al giorno

One document to orient anyone (including future-us) in ten minutes. Detail lives
in SCHEMA.md (the entry format), SCHEDULING.md (placement and the desk), and
TODO.md (current state and next steps). This is the map.

---

## The idea, in one paragraph

A daily email pairs one Spanish and one Italian expression and explains the
**bridge** between them — what carries across, what doesn't, and the exact
mistake speakers of one language make in the other. The bridge is the moat: a
single-language product structurally cannot produce it. The email runs for a
year, testing 365 entries on real readers; the best of them then become a
bilingual tear-off calendar. The email is how the calendar gets written.

## The two design principles everything follows

**1. Nothing ships unreviewed — enforced mechanically, not by memory.**
Every rule that matters is a validator check, an allowlist, or a CI gate, never
a convention someone has to remember. This exists because the predecessor app
shipped an unflagged slang term: the rule was known, and forgotten. The failure
mode this system is built against is not malice; it is a busy Tuesday.

**2. Derived, never duplicated.**
The bank (a folder of JSON files) is the single source of truth. The schedule,
the landing page, the practice game, and the reviewer worklists are all
*computed* from it. Nothing is stored per-day and no content is copied anywhere,
so nothing can drift or gap. The day's entry is a pure function of
`(date, bank, events, overrides)` — the archive from eight months ago and
tomorrow's email are calculated the same way, from nothing but the date.

---

## The components

### The bank — `bank/*.json`
One file per entry; the filename is the id. Each entry carries both language
sides (expression, literal, meaning, example, translation, register, exam
safety, regions, sources), the **bridge** (note, tags, and *directional*
interference — the `es→it` trap is not the `it→es` trap, and each key must be
explicitly filled or explicitly null: silence has to be a decision), plus
scheduling fields, pedagogy (CEFR, difficulty), optional `hook` (card-front
teaser) and `cue` (English production prompt), and governance (review status,
who signed off). Statuses: `draft → needs_review → approved`, or `retired`
(with a reason, recoverable). **Only approved entries can ever reach a reader.**

### The validator — `node tools/validate.mjs bank reviewers.json events.json`
The rules that bite. Structural checks on every entry; strict checks (verified
sources, named native reviewers) that only bind at approval, so honest drafts
can exist; bank-level checks: unique ids, no duplicate expressions under
different ids, no pin collisions, and the **composition gate** — once 20+
entries are approved, at most 33% may be "easy-only" (charming twins) and at
least 50% must carry a high-value tag (false friends, auxiliary traps,
preposition splits, register splits). The gate exists because a bank curated by
delight drifts toward the pleasing and useless; the entries people pay for are
the ones that stop them making mistakes.

### The reviewer allowlist — `reviewers.json`
What "reviewed" means, mechanically. An entry can only be approved by ids on
this list, each tagged with the language they are *native* in — the validator
rejects an Italian reviewer signing off a Spanish side. A model is not a valid
reviewer, and can't be added by accident. This file is the trust boundary of
the whole product; changing it should be rare and visible.

### The reviewer worklists — `node tools/build-review-lists.mjs`
Generates `reviewers/REVIEW-ES.md` and `REVIEW-IT.md` — one file per language,
flagged entries first, five checks per entry (natural? accurate? example
natural? register/regions honest? source URL actually supports it?). Reviewers
never touch JSON; they read a document and reply however they like, and the
answers get recorded back into entries. A CI check fails the build if the bank
changes and the lists aren't regenerated.

### Events and overrides — `events.json`, `overrides.json`
The calendar's knowledge. Events come in four recurrence kinds: `annual`
(Ferragosto), `computed` (Easter and its offsets), `nth_weekday` (Mother's Day —
three different dates in MX/ES/IT), and `irregular` (the World Cup: explicit
occurrences, so a football idiom is **dormant** in years with no tournament
rather than surfacing on a random Tuesday). Entries link to events; one entry
may serve several occasions (¡Viva! serves two national days) and each
appearance carries a footnote — the durable half written by a human, the dates
generated per year, because the calendar moves. `overrides.json` is the one
hand-edited scheduling file: force any entry onto any future date, with a
reason, as a reviewable git diff.

### The scheduler — `node tools/schedule.mjs 2026 [--check]`
Turns date into entry. Precedence: overrides beat events beat pins beat the
rotation. The rotation is a seeded permutation (nothing repeats until the bank
is exhausted), season-aware (a summer idiom never surfaces in February),
append-safe (a new entry joins the *next* cycle, so recomputing March later
still yields what was actually sent), and seam-guarded (no entry two days
running by accident — deliberate event pairs excepted). `--check` asserts seven
invariants across any year; CI runs it for this year and the next three.

### The desk — `node tools/serve.mjs` → localhost:4173
The editorial UI: see the upcoming schedule, click a day, force a different
entry onto it. The only thing it writes is `overrides.json` — a rotation day
can't be edited, only displaced, because there is no calendar table to edit.
Its guard rails: no unapproved entries, no event-exclusive entries outside
their windows, no rewriting past dates (the archive stays true), no override
without a reason.

### The landing page — `node tools/build-landing.mjs [--today] [--entries …] [--card compact|full] [--out …]`
The public face, generated from the bank so the demo can never drift from the
product. The hero card is a real entry — datebar, optional hook, the two
expressions meeting at the seam, bridge and directional traps below — with
yesterday and the day before beneath it, so the daily cadence is visible before
it's claimed. `--today` pulls all three from the live schedule (falls back to a
hand-picked set while nothing is approved). Variants audition different heroes.
Also in `landing/`: `privacy.html` (plain-language GDPR policy, placeholders to
fill), `404.html` (meter la pata, naturally), and `fonts/` — self-hosted type,
because Google Fonts transmits visitor IPs and the privacy page promises we
don't.

### The practice game — `node tools/build-match.mjs`
`landing/match.html`: match-the-pairs in three modes — Spanish↔meaning,
Italian↔meaning, and Spanish↔Italian counterparts, where the false-friend pairs
(the frittata) are the fun. Static, all data inlined, no requests after load.

### CI — `.github/workflows/`
`validate.yml` on every push: bank validation, worklist freshness, scheduler
invariants across four years. `daily-landing.yml` at 04:00 UTC: rebuild the
landing and practice pages from the live schedule and commit — the host then
auto-deploys. No servers anywhere in the system.

---

## The daily lifecycle, once live

1. **04:00 UTC** — the Action recomputes today from `(date, bank, events,
   overrides)`, rebuilds the pages, commits; the host deploys.
2. **The email** (renderer not yet built) will do the same: compute today's
   entry, render it L1-aware — each subscriber's `l1` (asked at signup) selects
   which interference direction they're shown — and hand it to the email
   provider's API.
3. **Joe** writes roughly one new entry a day and forwards reviewer answers as
   they arrive; recording them flips statuses, and every downstream surface
   updates on the next build.
4. **The desk** is opened only to force a day — sponsor tie-in, topical hook,
   fixing a bad send.

## What is deliberately manual

Adding reviewers (trust boundary). Approving entries (a human judgment,
recorded). Overrides (editorial, with reasons). Writing entries and hooks
(the product). Everything else is a build artifact.

## Honest current state (2026-07-15)

43 entries — all draft or needs-review, **0 approved**, because the reviewers
(Joe's teacher contacts) aren't onboarded yet; every green light in the system
funnels to that. The form posts to a placeholder pending an email provider.
The renderer is the last unbuilt component, deliberately queued behind first
approvals. The composition preview warns the bank is still 35% easy-only —
write traps. Full ledger: TODO.md.
