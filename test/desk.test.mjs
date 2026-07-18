import { scheduleRange, validateOverride, writeOverride } from "../tools/desk-rules.mjs";

const show = (label, v) => {
  console.log(`\n${label}`);
  v.problems.forEach(p => console.log(`   BLOCKED  ${p}`));
  v.warnings.forEach(w => console.log(`   WARN     ${w}`));
  if (!v.problems.length && !v.warnings.length) console.log("   ok");
  if (v.displaced) console.log(`   displaces ${v.displaced.id} (${v.displaced.reason})`);
};

const { rows, catalogue } = scheduleRange("2026-07-13", "2026-07-17");
console.log("UPCOMING");
rows.forEach(r => console.log(`   ${r.date}  ${r.layer.padEnd(9)}  ${r.es} / ${r.it}`));
console.log(`   (${catalogue.length} approved entries selectable)`);

show("① Force an event-exclusive entry onto a random November day",
  validateOverride({ date: "2026-11-04", id: "0055", reason: "felt like it" }));

show("② Rewrite a day that already went out",
  validateOverride({ date: "2026-03-01", id: "0001", reason: "fixing" }));

show("③ Force a day but give no reason",
  validateOverride({ date: "2026-10-01", id: "0001", reason: "" }));

show("④ Displace Ferragosto",
  validateOverride({ date: "2026-08-15", id: "0001", reason: "sponsor wants the boxing one" }));

show("⑤ A legitimate edit: feature the auxiliary trap on 1 October",
  validateOverride({ date: "2026-10-01", id: "0007", reason: "newsletter tie-in on essere/avere" }));
