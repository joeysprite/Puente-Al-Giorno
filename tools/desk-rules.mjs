/**
 * The rules that bite, for the desk.
 *
 * Extracted from the server so they can be tested without an HTTP round-trip —
 * and because these, not the UI, are the actual product of the editor. Every one
 * of them is a rule you would otherwise have to REMEMBER.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildYear, resolveEvent } from "./schedule.mjs";

export const ROOT = resolve(process.env.BANK_ROOT ?? ".");

const load = () => ({
  bank: readdirSync(join(ROOT, "bank"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(ROOT, "bank", f), "utf8"))),
  events: JSON.parse(readFileSync(join(ROOT, "events.json"), "utf8")),
  overrides: JSON.parse(readFileSync(join(ROOT, "overrides.json"), "utf8")),
});

const today = () => new Date().toISOString().slice(0, 10);
const addDays = (d, n) => new Date(Date.parse(`${d}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

// ───────────────────────────────────────────────────────────────── schedule

export function scheduleRange(from, to) {
  const { bank, events, overrides } = load();
  const years = new Set();
  for (let d = from; d <= to; d = addDays(d, 1)) years.add(Number(d.slice(0, 4)));

  const byId = new Map(bank.map((e) => [e.id, e]));
  const rows = [];
  for (const y of [...years].sort()) {
    const { schedule } = buildYear(y, bank, events, overrides);
    for (const [date, slot] of schedule) {
      if (date < from || date > to) continue;
      const e = byId.get(slot.id);
      rows.push({
        date,
        id: slot.id,
        reason: slot.reason,
        footnote: slot.footnote ?? null,
        layer: slot.reason.startsWith("override")
          ? "override"
          : slot.reason.startsWith("event:")
            ? "event"
            : slot.reason === "pin" || slot.reason === "pinWindow"
              ? "pin"
              : "rotation",
        es: e?.es?.text ?? "—",
        it: e?.it?.text ?? "—",
        tags: e?.bridge?.tags ?? [],
        cefr: e?.cefr ?? "",
        register: e?.es?.register ?? "",
      });
    }
  }
  rows.sort((a, b) => (a.date < b.date ? -1 : 1));

  const catalogue = bank
    .filter((e) => e.review?.status === "approved")
    .map((e) => ({
      id: e.id,
      es: e.es.text,
      it: e.it.text,
      cefr: e.cefr,
      tags: e.bridge?.tags ?? [],
      eventExclusive: (e.events ?? []).some((l) => l.requiresEvent),
      eventKeys: (e.events ?? []).map((l) => l.key),
    }))
    .sort((a, b) => (a.es < b.es ? -1 : 1));

  return { rows, catalogue };
}

// ─────────────────────────────────────────────────── the rules that bite

/**
 * Everything here is a rule you would otherwise have to REMEMBER. That is the
 * whole reason the editor exists rather than a text file and good intentions.
 */
export function validateOverride({ date, id, reason }) {
  const { bank, events, overrides } = load();
  const entry = bank.find((e) => e.id === id);
  const problems = [];
  const warnings = [];

  if (!entry) problems.push(`No entry with id "${id}".`);
  else if (entry.review?.status !== "approved") {
    problems.push(`Entry ${id} is "${entry.review?.status}", not approved. Unreviewed content does not ship.`);
  }

  if (!reason || !reason.trim()) {
    problems.push("Give a reason. Six months from now you will not remember why this day is forced.");
  }

  if (date < today()) {
    problems.push(`${date} is in the past. Overriding it rewrites what you already sent, and the archive stops being true.`);
  }

  // The failure this whole system exists to prevent: an entry that is meaningless
  // outside its occasion, surfacing on a random Tuesday.
  if (entry && (entry.events ?? []).some((l) => l.requiresEvent)) {
    const year = Number(date.slice(0, 4));
    const inSomeWindow = (entry.events ?? []).some((l) => {
      const w = resolveEvent(l.key, events.events?.[l.key], year);
      return w && date >= w.from && date <= w.to;
    });
    if (!inSomeWindow) {
      const keys = entry.events.map((l) => l.key).join(", ");
      problems.push(
        `Entry ${id} is event-exclusive (${keys}) and ${date} is outside every one of those windows. ` +
          `A World Cup idiom on a Tuesday in February is the thing this system exists to prevent. ` +
          `If you really want it year-round, set requiresEvent:false on the entry — don't force it here.`
      );
    }
  }

  // What is being pushed off the day?
  const year = Number(date.slice(0, 4));
  const { schedule } = buildYear(year, bank, events, overrides);
  const current = schedule.get(date);
  const displaced =
    current && current.id !== id
      ? { id: current.id, reason: current.reason, layer: current.reason.split(/[: ]/)[0] }
      : null;

  if (displaced && (displaced.reason === "pin" || displaced.reason.startsWith("event:"))) {
    warnings.push(
      `This displaces a ${displaced.reason.startsWith("event:") ? "scheduled occasion" : "hard pin"} ` +
        `(${displaced.id} — ${displaced.reason}). It will not appear at all this year.`
    );
  }

  // Same expression twice in a week reads as a bug even when it isn't.
  for (let k = -3; k <= 3; k++) {
    if (k === 0) continue;
    const near = addDays(date, k);
    const s = schedule.get(near);
    if (s?.id === id) warnings.push(`${id} is already scheduled on ${near}, ${Math.abs(k)} day(s) away.`);
  }

  return { problems, warnings, displaced };
}

export function writeOverride({ date, id, reason }) {
  const path = join(ROOT, "overrides.json");
  const file = JSON.parse(readFileSync(path, "utf8"));
  file.overrides = file.overrides ?? {};
  file.overrides[date] = { id, reason, setOn: today() };
  const sorted = Object.fromEntries(Object.entries(file.overrides).sort());
  file.overrides = sorted;
  writeFileSync(path, JSON.stringify(file, null, 2) + "\n");
}

export function removeOverride(date) {
  const path = join(ROOT, "overrides.json");
  const file = JSON.parse(readFileSync(path, "utf8"));
  delete file.overrides?.[date];
  writeFileSync(path, JSON.stringify(file, null, 2) + "\n");
}

