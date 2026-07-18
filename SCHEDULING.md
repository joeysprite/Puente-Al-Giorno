# Scheduling

The day's entry is a **pure function of `(date, bank, events, overrides)`**. Nothing
is stored per day. There is no calendar table to drift out of sync, no cron job
that can silently miss a day, no backfill script. Tomorrow's send and the archive
from eight months ago are computed the same way, from nothing but the date.

Gaps are not *prevented*. They are **unrepresentable**.

---

## Precedence

Highest wins. Each layer removes days from the pool below it.

| # | Layer | Hardness | For |
|---|-------|----------|-----|
| 1 | `overrides.json` | **absolute** | manual force — sponsor tie-in, topical send, fixing a bad day |
| 2 | `events` | hard, *conditional* | occasions that may not happen this year |
| 3 | `pin` / `pinWindow` | hard | fixed calendar dates, every year |
| 4 | rotation | soft, seasonal | everything else |

A displaced pin is **reported, never dropped in silence.** An entry that vanishes
without anyone noticing is the failure this whole system exists to prevent.

---

## Why events are not pins

Your three examples turned out to be three different mechanisms:

- **Festa della Repubblica** — 2 June, every year. A `pin` would do.
- **Semana Santa / Pasqua** — moves. Needs the Easter computus (implemented;
  Carnevale falls out of it as Easter − 47).
- **Día de la Madre** — moves, *differently in each country*. Mexico fixes it to
  10 May. Spain uses the first Sunday of May, Italy the second. Hence the fourth
  recurrence kind, `nth_weekday` (`weekday` 0–6, `nth` 1–5 or −1 for last).
- **The World Cup** — **irregular.** 11 June – 19 July 2026, then nothing until
  2030 (Spain, Portugal and Morocco; dates not yet published).

A pin cannot express *"some years this does not happen."* That is why events live
in their own registry with explicit occurrences, and why an entry links to an event
with `requiresEvent: true`, meaning:

> In a year where this event does not occur, I stay **dormant**. I do not quietly
> fall back into the rotation.

Verified: the *essere in panchina* entry appears **twice in 2026** (World Cup
opening day, plus your forced override on the final) and **zero times in 2027**.

For the 2030 World Cup the registry holds an explicit `null` — *known event,
unknown dates*. The entry stays dormant and the validator warns, rather than the
scheduler guessing.

## One entry, two national days

Mexican Independence is 16 September. Festa della Repubblica is 2 June. Your entry
format is a **bilingual pair**, but holidays are **national** — so a single entry
cannot be pinned to "its" date, because it has two.

Hence `events` is an **array**. The *¡Viva México! / Viva l'Italia!* entry links to
both occasions and surfaces on each. Event placements are deliberately exempt from
the no-repeat rule; that recurrence is the point.

## Anchor-first placement

Within an event window, the first entry lands **on the anchor day**, and any others
spread evenly across the remaining days. Both halves matter:

- a single Festa della Repubblica entry must land **on 2 June**, not at the leading
  edge of its window four days earlier;
- a 39-day World Cup with several entries must not become 39 consecutive football
  idioms.

## Footnotes come in two halves

When one entry serves several occasions it will surface several times, and the
subscriber deserves to be told why. That note is a property of **(entry × occasion)**,
not of the entry — the *¡Viva!* pair needs a different explanation in June than in
September — so it lives on the event *link*, not on the entry.

It is written in two halves, and the split is load-bearing:

- **`link.note` — the durable half.** Written by a human. Says why this pair serves
  both languages. **Contains no dates and no counts.**
- **The calendar half — generated.** Produced by the scheduler, per year, from the
  registry: what today is, what else falls today, when the entry returns.

Because the calendar moves. **In 2026 the second Sunday of May *is* the 10th**, so
Italy's Festa della Mamma lands exactly on Mexico's fixed date, the entry appears
twice rather than three times, and a hand-written *"you'll see this three times in
May"* is simply false that year. The scheduler detects the collision and says
*"Today is Día de la Madre (México) — and, this year, also Festa della Mamma."*

The validator lints for notes that assert calendar facts and warns. Humans write the
language; the machine writes the dates.

## Exclusive vs. enhanced events

`requiresEvent` is the difference between two kinds of entry:

- **`true` — event-exclusive.** Meaningless outside the occasion. Placed in the
  window, dormant otherwise, never in the rotation. *Essere in panchina*: **2
  appearances in 2026, 0 in 2027.**
- **`false` — merely enhanced.** Good year-round; earns its keep during the event.
  Boosted into the window *and* keeps rotating. *Dar la talla / essere all'altezza*:
  **80 appearances in 2026**, one of them on the Olympic opening ceremony.

## Seasons

Meteorological, **northern hemisphere**. A deliberate choice: the expressions live
in Spain, Italy and Mexico, and Ferragosto is in August because August is summer
*in Italy*.

The cost is real. An Argentine or Chilean subscriber gets "summer" idioms in their
winter. The schedule is global — one entry per calendar day, for everyone — so this
cannot be personalised without forking the schedule, which would break pins. Accept
it knowingly, and reconsider if the Southern Cone becomes a real share of the list.

A seasonal entry is **never force-placed out of season.** If a cycle contains a
summer entry and no summer day, the entry waits for the next cycle rather than
surfacing in February. Verified across a full year: the summer entry appears only
in June/July/August, the winter entry only in December/January/February.

## The cycle seam

A seeded permutation guarantees no repeat *within* a cycle. It says **nothing about
the join between two cycles** — and with a small bank the rotation recycles often,
so the seam comes round constantly. The subscriber sees the same idiom two mornings
running and reads it as a bug, even though the maths is fine.

The scheduler explicitly guards this, and an invariant test asserts it.

## Append-safety

Each cycle's roster is `entries where createdOn <= cycleStart`. An entry added in
June joins the **next** cycle rather than being spliced into one already under way.
So recomputing 4 March months later still yields what you actually sent. **Your
archive stays true** while the bank keeps growing — which it will, all year.

---

## Invariants (`node tools/schedule.mjs 2026 --check`)

1. Every day of the year has an entry — no gaps, structurally
2. Recomputing from scratch gives an identical schedule — determinism
3. Dormant entries never appear
4. Event entries land inside a window they are linked to
5. Seasonal entries land in their season
6. No entry repeats within a rotation cycle
7. No entry lands on two consecutive days — the seam holds

Run this in CI alongside the bank validator.

---

## The number you should actually look at

With the current **5-entry rotation pool**, each non-seasonal entry appears
**~105 times in 2026** — every three or four days.

Scale it:

| rotation pool | appearances per entry per year |
|---|---|
| 5 | ~105 |
| 30 | ~12 |
| 100 | ~3.6 |
| 365 | 1 |

Cycling is a feature, not a bug — it is spaced repetition, and you should vary the
*prompt* on a repeat (recall the meaning vs. produce the phrase) so it isn't
visibly identical. But at 30 entries a subscriber meets every idiom you own once a
month, and they will notice.

The scheduler is finished. The bank is the product, and it is still the year.


---

# The desk

    node tools/serve.mjs        →  http://localhost:4173

See what is going out. Click a day. Force something else onto it.

## Why `overrides.json` is the only writable thing

The schedule is a pure function of `(date, bank, events, overrides)`. A rotation day
is therefore **not something you can edit** — it is something you can *displace*.
There is no calendar table to open and no cell to type into, because there is no
calendar table. Every change made at the desk is an override, with a reason attached,
landing as a git diff you review like any other change.

That falls out of the architecture rather than being a rule bolted on top of it,
which is why it holds.

## What the desk refuses to let you do

The rules live in `tools/desk-rules.mjs`, separate from the server, because *they*
are the product of the editor — the UI is only transport. Each is a rule you would
otherwise have to remember:

| Action | Response |
|---|---|
| Force an entry that isn't approved | **blocked** — unreviewed content does not ship |
| Force an **event-exclusive** entry outside its window | **blocked** — a World Cup idiom on a Tuesday in November is precisely what this system exists to prevent. If you want it year-round, set `requiresEvent: false` on the entry; don't force it here |
| Override a date **in the past** | **blocked** — that rewrites what you already sent, and the archive stops being true |
| Save without a reason | **blocked** — in six months the reason is the only thing that will explain the day |
| Displace a **pin** or an **occasion** | allowed, but says loudly what will now never appear this year |
| Schedule an entry within 3 days of itself | allowed, but warned |

## The rail

Colour is spent on exactly one thing: **which mechanism placed this day.** Rotation
gets no colour — it is the default state, and colouring the default would be
decoration rather than information. Scan a month and the locked days stand out from
the free ones as bands down the left edge.


## Access, on the desk and in the product

**The desk is a single-user internal tool** — `node tools/serve.mjs`, run locally.
It is nonetheless keyboard-operable, screen-reader legible, and usable on a phone,
because the cost of that was one afternoon and the cost of retrofitting it later is
not.

What was actually wrong, and is now fixed:

- **Colour contrast.** Four failures, measured rather than eyeballed. The worst was
  self-inflicted: the mechanism label inherited the rail colour, so the word
  "rotation" rendered at **2.0:1** — under half the required 4.5. The rail colour
  and the label colour are now separate variables.
- **Day rows were `<article>` with a click handler.** Not focusable, no keyboard
  activation. They are now real `<button>`s with a descriptive `aria-label`.
- **The panel was not a dialog.** No `role`, no focus trap, focus never returned to
  the row you came from, and when closed it stayed in the tab order behind the
  scrim. It is now a proper modal: `inert` when shut, trapped when open, focus
  handed back on close.
- **Validation messages were silent.** A screen-reader user picked an entry, was
  blocked, and heard nothing. `role="status"` now announces them.
- **Tap targets** below 44px; **phone layout** collapsed the ES/IT columns badly.

### The one that transfers to the product

Every expression is now marked `lang="es"` or `lang="it"`.

On a page declared `lang="en"`, a screen reader pronounces *gettare la spugna* with
an English voice and makes noise of *¡Feliz Día de la Madre!*. For a page that is
mostly Spanish and Italian, that is not a detail of presentation — it destroys the
content. And **the same is true of every email you are ever going to send.** A daily
idiom in a screen reader's wrong accent is worse than no email.

This is the accessibility work that actually matters, and it belongs in the renderer
that does not exist yet, not in the desk. When you build it: `lang` on every
expression, a real plain-text alternative, and no meaning carried by colour alone.
