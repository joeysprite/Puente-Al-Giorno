#!/usr/bin/env node
/**
 * Idiom Bank scheduler.
 *
 *   node tools/schedule.mjs <year> [--from YYYY-MM-DD] [--to YYYY-MM-DD] [--check]
 *
 * The day's entry is a PURE FUNCTION of (date, bank, events, overrides).
 * Nothing is stored per day. There is no calendar table to drift, no cron job
 * that can silently miss a day, no backfill script. Gaps are not prevented —
 * they are unrepresentable.
 *
 * PRECEDENCE, highest first:
 *   1. override    manual force. Wins over everything. Displacements are reported.
 *   2. event       resolved against events.json FOR THAT YEAR. May not occur.
 *   3. pin         fixed calendar date, every year.
 *   4. pinWindow   fixed date range, every year.
 *   5. rotation    season-constrained cyclic permutation over what's left.
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// ───────────────────────────────────────────────────────── date plumbing

const iso = (d) => d.toISOString().slice(0, 10);
const parse = (s) => new Date(`${s}T00:00:00Z`);
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

export function daysInYear(year) {
  const out = [];
  for (let d = parse(`${year}-01-01`); d.getUTCFullYear() === year; d = addDays(d, 1)) {
    out.push(iso(d));
  }
  return out;
}

/**
 * Meteorological seasons, NORTHERN hemisphere.
 *
 * This is a deliberate choice, not an oversight. The expressions live in Spain,
 * Italy and Mexico — all northern. Ferragosto is in August because August is
 * summer *in Italy*. The cost: an Argentine or Chilean subscriber gets "summer"
 * idioms in their winter. The schedule is global (one entry per calendar day for
 * everyone), so this cannot be personalised without forking the schedule, which
 * would break pins. Accept it, and know you accepted it.
 */
export function seasonOf(dateStr) {
  const m = Number(dateStr.slice(5, 7));
  if (m === 12 || m <= 2) return "winter";
  if (m <= 5) return "spring";
  if (m <= 8) return "summer";
  return "autumn";
}

/** Anonymous Gregorian computus. Easter Sunday for a given year. */
function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ───────────────────────────────────────────────────── deterministic PRNG

/** mulberry32. Same seed → same sequence, on every machine, forever. */
function prng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(...parts) {
  let h = 2166136261 >>> 0;
  for (const p of parts) {
    for (const ch of String(p)) {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h, 16777619) >>> 0;
    }
    h ^= 0x5f;
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

/** Fisher–Yates. A PERMUTATION, not a draw: nothing recurs until all are used. */
function shuffle(arr, rnd) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ───────────────────────────────────────────────────────── event resolution

/**
 * Resolve an event to a concrete [from, to] window in a given year, or null if
 * it does not occur. `null` is the important return value — it is what lets a
 * World Cup entry stay silent in 2028.
 */
export function resolveEvent(key, ev, year) {
  const anchorWindow = (anchorIso) => {
    const w = ev.window ?? { before: 0, after: 0 };
    const a = parse(anchorIso);
    return {
      key,
      name: ev.name,
      anchor: anchorIso,
      from: iso(addDays(a, -(w.before ?? 0))),
      to: iso(addDays(a, w.after ?? 0)),
    };
  };

  switch (ev.recurrence) {
    case "annual": {
      if (ev.month === 2 && ev.day === 29 && !isLeap(year)) return null;
      return anchorWindow(
        `${year}-${String(ev.month).padStart(2, "0")}-${String(ev.day).padStart(2, "0")}`
      );
    }
    case "nth_weekday": {
      // "first Sunday of May" / "second Sunday of May". nth = -1 means LAST.
      const first = parse(`${year}-${String(ev.month).padStart(2, "0")}-01`);
      const shift = (ev.weekday - first.getUTCDay() + 7) % 7;
      if (ev.nth === -1) {
        let d = addDays(first, shift);
        while (true) {
          const next = addDays(d, 7);
          if (next.getUTCMonth() !== first.getUTCMonth()) break;
          d = next;
        }
        return anchorWindow(iso(d));
      }
      const d = addDays(first, shift + (ev.nth - 1) * 7);
      if (d.getUTCMonth() !== first.getUTCMonth()) return null; // e.g. no 5th Sunday
      return anchorWindow(iso(d));
    }
    case "computed": {
      const easter = easterSunday(year);
      if (ev.rule === "easter") return anchorWindow(easter);
      if (ev.rule === "easter_offset") {
        return anchorWindow(iso(addDays(parse(easter), ev.offsetDays ?? 0)));
      }
      return null;
    }
    case "irregular": {
      const occ = (ev.occurrences ?? {})[String(year)];
      if (!occ) return null; // absent OR explicitly null (known event, unknown dates)
      return { key, name: ev.name, anchor: occ.from, from: occ.from, to: occ.to };
    }
    default:
      return null;
  }
}

function datesBetween(fromIso, toIso, year) {
  const out = [];
  for (let d = parse(fromIso); iso(d) <= toIso; d = addDays(d, 1)) {
    if (d.getUTCFullYear() === year) out.push(iso(d));
  }
  return out;
}

/**
 * Place k entries in an event window: THE ANCHOR FIRST, then spread the rest.
 *
 * Anchor-first matters. A single Festa della Repubblica entry must land on 2 June,
 * not on the leading edge of its window four days earlier. But a 39-day World Cup
 * with several entries must not become 39 consecutive football idioms — so the
 * remainder is spread evenly across what's left.
 */
function placeInWindow(slots, anchor, k) {
  if (k <= 0 || slots.length === 0) return [];
  const picked = [];
  const pool = [...slots];

  const ai = pool.indexOf(anchor);
  if (ai >= 0) picked.push(...pool.splice(ai, 1));
  else if (pool.length) {
    // anchor taken (override, or outside the year) — use the nearest free day
    let best = 0;
    for (let i = 1; i < pool.length; i++) {
      if (Math.abs(Date.parse(pool[i]) - Date.parse(anchor)) <
          Math.abs(Date.parse(pool[best]) - Date.parse(anchor))) best = i;
    }
    picked.push(...pool.splice(best, 1));
  }

  const rest = k - picked.length;
  for (let i = 0; i < rest && pool.length; i++) {
    const idx = Math.floor((i * pool.length) / Math.max(rest, 1));
    picked.push(...pool.splice(Math.min(idx, pool.length - 1), 1));
  }
  return picked.sort();
}

// ─────────────────────────────────────────────────────────── the scheduler

export function buildYear(year, bank, eventsFile, overridesFile, opts = {}) {
  const WEEKEND = opts.weekend === true;
  const notes = [];
  const schedule = new Map(); // dateIso -> { id, reason }
  const days = daysInYear(year);
  const daySet = new Set(days);

  const approved = bank.filter((e) => e.review?.status === "approved");
  const byId = new Map(approved.map((e) => [e.id, e]));

  // ── 1. OVERRIDES ─────────────────────────────────────────────────────────
  const overrides = overridesFile.overrides ?? {};
  for (const [date, o] of Object.entries(overrides)) {
    if (!daySet.has(date)) continue;
    if (!byId.has(o.id)) {
      notes.push(`ERROR override ${date} → "${o.id}" is not an approved entry`);
      continue;
    }
    schedule.set(date, { id: o.id, reason: `override — ${o.reason ?? "manual"}` });
  }

  // ── 2. EVENTS ────────────────────────────────────────────────────────────
  const evDefs = eventsFile.events ?? {};
  const occurring = new Map(); // key -> window
  for (const [key, ev] of Object.entries(evDefs)) {
    const w = resolveEvent(key, ev, year);
    if (w) occurring.set(key, w);
  }

  /** Entries locked out: they require an event that does not occur this year. */
  const dormant = new Set();
  for (const e of approved) {
    for (const link of e.events ?? []) {
      if (link.requiresEvent && !occurring.has(link.key)) {
        dormant.add(e.id);
        notes.push(
          `DORMANT ${e.id} requires "${link.key}", which does not occur in ${year} — ` +
            `correctly silent, not shoved into the rotation`
        );
      }
    }
  }

  const placedByEvent = new Set();
  for (const [key, win] of occurring) {
    const linked = approved.filter((e) => (e.events ?? []).some((l) => l.key === key));
    if (linked.length === 0) continue;

    const windowDays = datesBetween(win.from, win.to, year).filter((d) => !schedule.has(d));
    if (windowDays.length === 0) {
      notes.push(`WARN "${key}" window is fully taken (by an override, or by another event ` +
        `landing on the same day this year); ${linked.length} entr(ies) skipped`);
      continue;
    }

    // Deterministic order, then spread across the window so a 39-day World Cup
    // doesn't become 39 consecutive football idioms.
    const rnd = prng(hashSeed(year, "event", key));
    const ordered = shuffle(linked, rnd);
    const slots = placeInWindow(windowDays, win.anchor, Math.min(ordered.length, windowDays.length));

    slots.forEach((date, i) => {
      const e = ordered[i];
      const link = (e.events ?? []).find((l) => l.key === key);

      // FOOTNOTES COME IN TWO HALVES, and the split is load-bearing.
      //
      //   link.note  — the DURABLE half. Written by a human. Says why this pair
      //                serves both languages. Contains no dates and no counts.
      //   calendar   — the VOLATILE half. Generated here, per year, from the
      //                registry.
      //
      // Because the calendar moves. In 2026 the second Sunday of May IS the 10th,
      // so Italy's Festa della Mamma lands exactly on Mexico's fixed date and the
      // entry appears twice, not three times. A hand-written "you'll see this
      // three times in May" is simply false that year. Humans write the language;
      // the machine writes the dates.

      // Everything this entry is linked to that ALSO falls today (collisions).
      const alsoToday = (e.events ?? [])
        .filter((l) => l.key !== key)
        .map((l) => occurring.get(l.key))
        .filter((w) => w && w.anchor === date);

      // ...and everything it returns for later in the year.
      const returnsOn = (e.events ?? [])
        .filter((l) => l.key !== key)
        .map((l) => occurring.get(l.key))
        .filter((w) => w && w.anchor !== date)
        .sort((a, b) => (a.anchor < b.anchor ? -1 : 1));

      let today = `Today is ${win.name}`;
      if (alsoToday.length) {
        today += ` — and, this year, also ${alsoToday.map((w) => w.name).join(" and ")}`;
      }
      today += ".";

      // Group by date — in a collision year two occasions share one day, and
      // listing "2026-05-10 (Mexico), 2026-05-10 (Italy)" reads like a bug.
      const byDate = new Map();
      for (const w of returnsOn) {
        if (!byDate.has(w.anchor)) byDate.set(w.anchor, []);
        byDate.get(w.anchor).push(w.name);
      }
      const later = byDate.size
        ? ` It returns on ${[...byDate].map(([d, names]) => `${d} (${names.join(" and ")})`).join(", ")}.`
        : "";

      const footnote = `${today}${link?.note ? " " + link.note : ""}${later}`;

      schedule.set(date, { id: e.id, reason: `event: ${win.name}`, footnote });
      placedByEvent.add(e.id);
    });

    if (ordered.length > slots.length) {
      notes.push(`WARN "${key}": ${ordered.length} entries but only ${slots.length} free days in window`);
    }
  }

  // ── 3. PINS ──────────────────────────────────────────────────────────────
  const placedByPin = new Set();
  for (const e of approved) {
    if (dormant.has(e.id) || placedByEvent.has(e.id)) continue;

    if (e.pin) {
      const date = `${year}-${String(e.pin.month).padStart(2, "0")}-${String(e.pin.day).padStart(2, "0")}`;
      if (!daySet.has(date)) {
        notes.push(`WARN ${e.id} pinned to ${e.pin.month}/${e.pin.day}, which does not exist in ${year}`);
        continue;
      }
      const held = schedule.get(date);
      if (held) {
        // Loudly. A displaced pin that vanishes silently is exactly the class of
        // bug this whole system exists to prevent.
        notes.push(`WARN ${e.id} is PINNED to ${date} but displaced by [${held.reason}] — it will not appear`);
        continue;
      }
      schedule.set(date, { id: e.id, reason: "pin" });
      placedByPin.add(e.id);
    } else if (e.pinWindow) {
      const from = `${year}-${e.pinWindow.from}`;
      const to = `${year}-${e.pinWindow.to}`;
      const free = datesBetween(from, to, year).filter((d) => !schedule.has(d));
      if (free.length === 0) {
        notes.push(`WARN ${e.id} pinWindow ${e.pinWindow.from}..${e.pinWindow.to} is fully taken — will not appear`);
        continue;
      }
      const rnd = prng(hashSeed(year, "pinwin", e.id));
      const date = free[Math.floor(rnd() * free.length)];
      schedule.set(date, { id: e.id, reason: "pinWindow" });
      placedByPin.add(e.id);
    }
  }

  // ── 4. ROTATION ──────────────────────────────────────────────────────────
  // An entry is EVENT-EXCLUSIVE only if some link says requiresEvent:true —
  // meaning it is meaningless outside the occasion. An entry whose links are all
  // requiresEvent:false is merely *enhanced* by the event: it gets boosted into
  // the window AND continues to rotate normally the rest of the year.
  const eventExclusive = (e) => (e.events ?? []).some((l) => l.requiresEvent);

  const pool = approved.filter(
    (e) =>
      !dormant.has(e.id) &&
      !placedByPin.has(e.id) &&
      !e.pin &&
      !e.pinWindow &&
      !(placedByEvent.has(e.id) && eventExclusive(e))
  );

  // With --weekend, Sundays are not filled here; they mirror the preceding
  // Saturday after rotation. A Sunday that already holds a pin/event keeps it.
  const isSunday = (d) => parse(d).getUTCDay() === 0;
  const freeDays = days.filter((d) => !schedule.has(d) && !(WEEKEND && isSunday(d)));
  const prevDay = (d) => iso(addDays(parse(d), -1));
  const nextDay = (d) => iso(addDays(parse(d), 1));

  if (pool.length === 0) {
    notes.push(`ERROR rotation pool is empty; ${freeDays.length} days cannot be filled`);
    return { year, schedule, notes, stats: { approved: approved.length, pool: 0, dormant: dormant.size } };
  }

  // Day-by-day, not slice-by-slice. Each day we take the first entry in the
  // current cycle's remaining roster that is ALLOWED on that day (season match,
  // or no season at all). A summer entry simply waits inside the cycle until a
  // summer day comes up. If nothing left in the cycle can be placed today, the
  // cycle ENDS and the survivors roll into the next shuffle — they are never
  // force-placed out of season.
  let cycle = 0;
  let remaining = [];
  let lastId = null; // what we put out yesterday, whatever placed it

  const canPlace = (e, day) => e.season == null || e.season === seasonOf(day);

  const newCycle = (day) => {
    cycle++;
    // createdOn <= day is what makes the schedule append-safe: an entry added in
    // June joins the NEXT cycle rather than being spliced into one already under
    // way, so recomputing March 4th months later still gives what you sent.
    const eligible = pool.filter((e) => (e.createdOn ?? "0000-00-00") <= day);
    remaining = shuffle(eligible.length ? eligible : pool, prng(hashSeed(year, "cycle", cycle)));

    // THE SEAM. A permutation guarantees no repeat *within* a cycle and says
    // nothing about the join between two cycles. With a 30-entry bank the
    // rotation recycles ~12x a year, so the seam comes round often — and the
    // subscriber sees the same idiom two mornings running, which reads as a bug
    // even though the maths is fine. Push a duplicate off the front.
    if (remaining.length > 1 && remaining[0].id === lastId) {
      const swapWith = remaining.findIndex((e, i) => i > 0 && canPlace(e, day));
      if (swapWith > 0) [remaining[0], remaining[swapWith]] = [remaining[swapWith], remaining[0]];
    }
  };

  /**
   * First entry in the cycle that fits today, isn't what we sent yesterday, and
   * isn't what is ALREADY SCHEDULED for tomorrow.
   *
   * Looking forward matters as much as looking back: events and pins are laid onto
   * the calendar *before* the rotation runs, so the rotation can happily place an
   * entry the day before that same entry's own event slot. A non-exclusive entry
   * like "dar la talla" rotated on 5 Feb and the Olympics placed it again on the
   * 6th. Same visible bug, opposite direction.
   */
  const pickStrict = (day) => {
    const tomorrow = schedule.get(nextDay(day))?.id ?? null;
    return remaining.findIndex(
      (e) => canPlace(e, day) && e.id !== lastId && e.id !== tomorrow
    );
  };

  for (const day of freeDays) {
    // Yesterday may have been an event or a pin, not a rotation day. Look at what
    // was actually SENT, not merely at what the rotation last emitted.
    lastId = schedule.get(prevDay(day))?.id ?? lastId;

    let idx = pickStrict(day);

    if (idx === -1) {
      // Either the cycle is exhausted, or everything left in it is out of season
      // today, or the only thing left is yesterday's entry. All three mean: the
      // cycle is over. Survivors roll into the next shuffle — never force-placed.
      newCycle(day);
      idx = pickStrict(day);
    }

    if (idx === -1) {
      // Pathological: a one-entry pool, or every entry is out of season today.
      // Place the least-bad option rather than leave a gap — and say so out loud.
      idx = remaining.findIndex((e) => canPlace(e, day));
      if (idx === -1) idx = 0;
      notes.push(`WARN ${day}: constraints could not be satisfied; placed ${remaining[idx]?.id} anyway`);
    }

    const [e] = remaining.splice(idx, 1);
    schedule.set(day, {
      id: e.id,
      reason: `rotation c${cycle}${e.season ? ` (${e.season})` : ""}`,
    });
    lastId = e.id;

    if (cycle > 5000) {
      notes.push("ERROR cycle guard tripped");
      break;
    }
  }

  // ── 5. WEEKEND MIRROR ────────────────────────────────────────────────────
  // Sunday repeats Saturday. Runs after everything else so a genuinely pinned
  // Sunday (a holiday greeting, say) is left alone; only empty Sundays inherit.
  if (WEEKEND) {
    let mirrored = 0;
    for (const day of days) {
      if (!isSunday(day) || schedule.has(day)) continue;
      const sat = schedule.get(prevDay(day));
      if (sat) { schedule.set(day, { id: sat.id, reason: "weekend (shares Saturday)" }); mirrored++; }
    }
    notes.push(`weekend mode: ${mirrored} Sundays share the preceding Saturday`);
  }

  return {
    year,
    schedule,
    notes,
    stats: { approved: approved.length, pool: pool.length, dormant: dormant.size, cycles: cycle },
  };
}

// ─────────────────────────────────────────────────────────────── invariants

export function check(year, bank, result, EVENTS, OVERRIDES, opts = {}) {
  const fails = [];
  const days = daysInYear(year);

  // 1. No gaps. Every single day has an entry.
  const missing = days.filter((d) => !result.schedule.has(d));
  if (missing.length) fails.push(`${missing.length} day(s) with no entry (first: ${missing[0]})`);

  // 2. Determinism. Recompute from scratch; must be byte-identical.
  const again = buildYear(year, bank, EVENTS, OVERRIDES, opts);
  for (const d of days) {
    if (again.schedule.get(d)?.id !== result.schedule.get(d)?.id) {
      fails.push(`NOT DETERMINISTIC on ${d}`);
      break;
    }
  }

  // 3. Dormant entries never appear.
  const evDefs = EVENTS.events ?? {};
  const occurs = new Set(
    Object.entries(evDefs).filter(([k, e]) => resolveEvent(k, e, year)).map(([k]) => k)
  );
  for (const e of bank) {
    const needs = (e.events ?? []).filter((l) => l.requiresEvent).map((l) => l.key);
    if (needs.length && !needs.some((k) => occurs.has(k))) {
      const appears = days.filter((d) => result.schedule.get(d)?.id === e.id);
      if (appears.length) fails.push(`dormant entry ${e.id} appeared on ${appears[0]}`);
    }
  }

  // 4. Event entries land inside AT LEAST ONE of their event windows.
  //    (Entry 0070 attaches to both Mexican Independence and Festa della
  //    Repubblica. Those are different dates. It must satisfy one, not all.)
  for (const e of bank) {
    const wins = (e.events ?? [])
      .map((l) => resolveEvent(l.key, evDefs[l.key], year))
      .filter(Boolean);
    if (wins.length === 0) continue;
    for (const d of days) {
      const slot = result.schedule.get(d);
      if (slot?.id === e.id && slot.reason.startsWith("event:")) {
        if (!wins.some((w) => d >= w.from && d <= w.to)) {
          fails.push(`${e.id} placed on ${d}, outside every window it is linked to`);
        }
      }
    }
  }

  // 5. Seasonal entries land in their season (when the rotation placed them).
  for (const e of bank) {
    if (!e.season) continue;
    for (const d of days) {
      const slot = result.schedule.get(d);
      if (slot?.id === e.id && slot.reason.startsWith("rotation") && seasonOf(d) !== e.season) {
        fails.push(`${e.id} (${e.season}) placed on ${d}, which is ${seasonOf(d)}`);
      }
    }
  }

  // 6. No repeat within a rotation cycle.
  const byCycle = new Map();
  for (const d of days) {
    const s = result.schedule.get(d);
    if (!s?.reason.startsWith("rotation")) continue;
    const c = s.reason.match(/^rotation (c\d+)/)?.[1];
    if (!byCycle.has(c)) byCycle.set(c, new Set());
    if (byCycle.get(c).has(s.id)) fails.push(`repeat of ${s.id} within ${c} on ${d}`);
    byCycle.get(c).add(s.id);
  }

  // 7. No ACCIDENTAL repeat on consecutive days. The cycle seam is where this
  //    breaks, and a subscriber reads it as a bug even when the maths is sound.
  //
  //    But two EVENT placements back to back are deliberate and must be allowed.
  //    In 2027 Italy's Festa della Mamma (2nd Sunday = 9 May) is immediately
  //    followed by Mexico's fixed 10 May. The same entry fires on both days, and
  //    that is correct — the footnotes are what make it legible rather than
  //    baffling. Only flag a repeat that the ROTATION caused.
  for (let i = 1; i < days.length; i++) {
    const a = result.schedule.get(days[i - 1]);
    const b = result.schedule.get(days[i]);
    if (!a || !b || a.id !== b.id) continue;
    const deliberate = (s) => s.reason.startsWith("event:") || s.reason === "pin" || s.reason.startsWith("override");
    if (deliberate(a) && deliberate(b)) continue;
    fails.push(`${b.id} on consecutive days ${days[i - 1]} and ${days[i]} (${a.reason} → ${b.reason})`);
  }

  return fails;
}

// ──────────────────────────────────────────────────────────────── CLI entry

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  // ──────────────────────────────────────────────────────────────────── main

  const _args = process.argv.slice(3);
  const _rootIdx = _args.indexOf("--root");
  const ROOT = resolve(_rootIdx >= 0 ? _args[_rootIdx + 1] : ".");
  const EVENTS = JSON.parse(readFileSync(join(ROOT, "events.json"), "utf8"));
  const OVERRIDES = JSON.parse(readFileSync(join(ROOT, "overrides.json"), "utf8"));
  const BANK = readdirSync(join(ROOT, "bank"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8")));

  const year = Number(process.argv[2] ?? new Date().getFullYear());
  const args = process.argv.slice(3);
  const flag = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : null;
  };

  const weekend = args.includes("--weekend");
  const result = buildYear(year, BANK, EVENTS, OVERRIDES, { weekend });
  const titles = new Map(BANK.map((e) => [e.id, `${e.es.text} / ${e.it.text}`]));

  console.log(`\n── ${year} ── ${result.stats.approved} approved, ${result.stats.pool} in rotation, ` +
    `${result.stats.dormant} dormant, ${result.stats.cycles} cycles\n`);

  if (args.includes("--check")) {
    if (result.stats.approved === 0) {
      console.log("SKIPPED — no approved entries; nothing can be scheduled, so there is nothing to check.");
      console.log("This is the honest state of the bank until a reviewer signs off. Not an error.");
      process.exit(0);
    }
    const fails = check(year, BANK, result, EVENTS, OVERRIDES, { weekend });
    console.log(fails.length ? `INVARIANTS FAILED:\n  ${fails.join("\n  ")}` : "All invariants hold:");
    if (!fails.length) {
      console.log("  ✓ every day of the year has an entry (no gaps, structurally)");
      console.log("  ✓ recomputing from scratch gives an identical schedule");
      console.log("  ✓ dormant entries (World Cup in a non-Cup year) never appear");
      console.log("  ✓ event entries land inside their event window");
      console.log("  ✓ seasonal entries land in their season");
      console.log("  ✓ no entry repeats within a rotation cycle");
      console.log("  ✓ no ACCIDENTAL repeat on consecutive days (deliberate event pairs allowed)");
    }
    process.exit(fails.length ? 1 : 0);
  }

  const from = flag("--from") ?? `${year}-01-01`;
  const to = flag("--to") ?? `${year}-12-31`;
  for (const d of daysInYear(year)) {
    if (d < from || d > to) continue;
    const s = result.schedule.get(d);
    const mark = s.reason.startsWith("override") ? "!!" : s.reason.startsWith("event:") ? " *" : s.reason === "pin" ? " @" : "  ";
    console.log(`${mark} ${d}  ${(titles.get(s.id) ?? s.id).padEnd(42)} ${s.reason}`);
    if (s.footnote && args.includes("--footnotes")) console.log(`        ↳ ${s.footnote}`);
  }

  if (result.notes.length) {
    console.log("\nNotes:");
    for (const n of result.notes) console.log(`  ${n}`);
  }
  console.log();

}
