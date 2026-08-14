# Push bundle — 2026-08-14

Everything currently out of sync between this session and the repo. Folders
mirror the repo root. 103 files.

## Config — closes two long-standing gaps

**`overrides.json`** — the full Aug 10 – Sep 13 editorial calendar written in
as overrides (36 entries, up from 2). Until now this calendar existed only in
chat, so `schedule.mjs` proposed different entries for every date. Validated
by running `buildYear()` against it: **all 35 dates reproduce the calendar
exactly, zero mismatches.** Weekend pairs are written as two dates sharing one
entry, so either day resolves correctly.

**`events.json`** — adds a `us_labor_day` event (Sep 7, 2026).

**`bank/0060.json`** — event tag corrected `ferragosto` → `us_labor_day`. The
entry (*hacer puente / fare il ponte*) is placed on Labor Day in the calendar,
but its tag was firing it on Aug 15. Flagged repeatedly across sessions;
fixed here. Note the events schema is fixed month/day, so Labor Day is encoded
as Sep 7 — correct for 2026 only, and noted in the event's own `note` field.

## Bank — learner-facing text cleanup

Five entries whose `bridge.note` leaked internal references into text that
renders on cards:

| Entry | Was | Now |
|---|---|---|
| 0078 | "The freakiest twin in the bank" | "A freakishly exact twin" |
| 0098 | "the third temper idiom in the bank" | "Italian has more than one way to say it" |
| 0113 | "one of the few genuine one-to-one calques in the bank" | "a genuine one-to-one calque, which is rarer than it sounds" |
| 0211 | "The pair exists in the bank to say so out loud" | "Worth saying out loud, because not many are" |
| 0244 | "one of the few entries in the bank whose job is reassurance" | "one of the rare pairs whose job is reassurance" |

Each keeps the original editorial point. 0078's fix was made twice before and
lost to container resets without reaching the repo.

Verified after editing: no remaining `bank` self-references or raw entry IDs in
any `bridge.note`; all bank JSON parses; `tools/validate.mjs` passes (221
entries sound, 129 approved).

## Tool

**`tools/build-daily-carousel.mjs`** — the carousel generator. Has never been
in the repo despite every batch depending on it.

```
node tools/build-daily-carousel.mjs --entry 0080 --date 2026-08-17
node tools/build-daily-carousel.mjs --entry 0016 --date 2026-08-22 --end 2026-08-23
```

`--cover split` renders the previous 5-panel layout; `--datestyle`, `--end`,
`--allow-draft`, `--out` also available.

## Cards

**`landing/social/wk-*.png`** — 24 posts × 4 panels for Aug 17 – Sep 13, on
the current template. All 96 checked for frame overflow; none.

## Not included / still open

- **`tools/build-teaser.mjs` in the repo is the original.** Bilingual months,
  `--end` weekend ranges and the parameterized launch line were lost in a
  container reset. Standalone date cards and `--cover split` panel 1 will
  render in the old single-language style until that work is redone.
- Six entries have reviewer placeholders or unresolved region questions in
  `es.regionNote` (0210, 0254, 0255, 0273, 0288, 0305). No generator renders
  that field today, so nothing ships wrong — but it would if a future format
  picks it up.
- Aug 10–16 cards are not in this bundle; they were delivered earlier and are
  unchanged except 0078's panel 4, which this bundle's bank fix would alter on
  regeneration.
