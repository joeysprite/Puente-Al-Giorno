# Apply to joeysprite/Puente-Al-Giorno
Checked against upstream `cdafc63` ("landing: 2026-07-26"). Bank counts already match (151 each) —
you've applied the six deletions. Nothing to delete this time.

## 1. Bank — 94 changed files
    cp to-apply/bank/*.json  <repo>/bank/

- **61 draft → approved** · **3 needs_review → approved** · **30 draft → draft** (bridges, region fixes, cleanup)
- Takes you from **0 approved upstream → 64 approved**

## 2. Root files
    cp to-apply/alternatives.json to-apply/CANDIDATES.md to-apply/TODO.md  <repo>/

- `alternatives.json` — A009 (*uña y carne*) and A011 (*essere a pezzi*, linked to 0088)
- `CANDIDATES.md` — *dar la cara*, *estar hecho pedazos*, *estar hecho polvo*, plus the multi-mapping policy note

## 3. Tools — the intro generator is broken upstream without this
    cp to-apply/tools/*  <repo>/tools/

- **`font-metrics.json` still does not exist upstream.** `build-intro.mjs` reads it at line 19 and crashes.
  Reconstructed from the Newsreader TTF. Without it nobody can regenerate the intro cards.
- `build-intro.mjs` — b1 drops "strange little", b3 drops "So: "

## 4. Landing
    cp to-apply/landing/*.png  <repo>/landing/

## 5. Verify
    node tools/validate.mjs
    # expect: PASS — 151 entries structurally sound; 64 approved and shippable

---

## Before you generate carousels

**Five entries carry an editorial flag for social:** 0005, 0008, 0026, 0068, 0105. Their shipping text names
vulgar register — *coger* in Mexico and the Río de la Plata, *estar hasta la madre*, the *madre* family, the
euphemism behind *mandar al quinto pino*. All accurate and all staying in the bank; whether the wording goes
verbatim onto a public card is a per-post call. The flag is in each entry's review notes.

**All shipping fields are now free of review commentary** — no "reviewer to confirm", no names, no internal
markers. `review.notes` still carries full provenance, deliberately: that is the audit trail and it is internal.

**17 entries still have an empty interference direction**, four of them approved. Some are deliberate
(0033, 0113, 0116 are clean transfers where the bridge says so); the rest are unwritten.
