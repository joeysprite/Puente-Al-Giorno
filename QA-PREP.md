# Prepared answers — anticipated questions on the whitepaper

*Internal. Not for distribution. Figures verified against the repository
2026-07-30.*

---

## The governing principle for this Q&A

The paper's credibility comes from what it concedes, not what it claims. So:
**concede fast, concede specifically, and cite the section that already says it.**
A questioner raising a limitation the paper states is confirming your honesty, not
catching you out. The only way to lose these exchanges is to defend something the
paper already admits.

Three answers you should be able to give without hesitating, because hesitation
reads as concealment:

1. *"No — explicit silence has never demonstrably prevented an error."*
2. *"Correct — no reviewer has ever seen a bridge or a trap."*
3. *"No — unwarranted generalization is not a new phenomenon. The framing is what's mine."*

---

## 1. Technical / systems architecture

**How do you guarantee reviewer allowlists cannot be bypassed?**
I don't, and I'd resist the word *guarantee*. Anyone with commit access can edit
`reviewers.json`. What the allowlist does is make forged attribution fail
*validation* rather than fail *review* — it converts a silent error into a loud
one, and leaves an audit trail in git. It raises the cost of an accidental
forgery. It is not tamper-proof against a determined operator, and no
single-repository design could be.

**What prevents forged provenance in future versions?**
Nothing yet, because provenance for null-setting doesn't exist yet (§2.3.1). The
intended design is a `setBy` / `setOn` pair on each interference field, validated
against the same allowlist. That makes forgery detectable by the same mechanism
that already catches forged reviewer ids — which is the one failure of this kind
we actually observed (§3).

**How will you measure reviewer diligence?**
Currently I can't — a sign-off and a careful reading are identical in the data
model (§6). The concrete fix is to store reviewer *deltas* as first-class
objects: what was proposed, what came back, what changed. That gives a per-
reviewer change rate, which is a proxy for engagement. Note this is
retrospective-only; it tells you who *has* been careful, not who will be.

**How will you close the gap between recorded and competent silence?**
Two options, and they're not exclusive. Route interference fields to reviewers so
a native sets the null. Or add provenance so at minimum you know it was the
operator. The first is correct; the second is cheap. I'd do the second
immediately and the first as the next review cycle.

**Will interference fields be routed to reviewers?**
Yes — that's the single highest-value change to the system. The `--simple`
reviewer mode was built to reduce reviewer burden, and it succeeded at that while
withholding exactly the content that most needs checking. That tradeoff was wrong.

**How do you ensure deterministic scheduling under real-world constraints?**
The date→entry mapping is a pure function of `(date, bank, events, overrides)`
with no stored state, so determinism is structural rather than maintained. Seven
invariants are asserted by `schedule.mjs --check`, and CI runs it across a
four-year window on every push, which is where leap years, moving feasts, and
nth-weekday rules get exercised. Recomputing a past month yields what was
actually sent, because new entries join the *next* rotation cycle rather than
being interleaved.

**What happens at thousands of entries?**
Measured, not estimated: the validator takes ~860ms on 152 entries and the
scheduler's full-year invariant check ~85ms. Both are linear and run on every
push. At 10× the bank, validation is still under ten seconds — fine for CI. The
binding constraint at that scale isn't compute, it's review capacity.

**How will you recalibrate the thresholds once the gate rejects something?**
Honestly: I'll have learned something the moment it fires, and not before. It
currently sits at 9% against a 33% ceiling (§5.1), so it has never been the
binding constraint, and its calibration is untested in the only way that matters.
If it starts firing I'd expect to discover the ceiling is in the wrong place.

**How do you prevent small pockets of low-value content slipping through?**
Currently: human judgment, not the system. §5.3 shows exactly this — fourteen
near-identical cognate formulas were held back by a person, and the counterfactual
confirms approving all of them still passes the gate at 11%. A ratio gate catches
bulk drift and is structurally blind to small cheap pockets. A per-*type* floor
(e.g. capping `marker` and `collocation` entries as a share of the whole) would
be the mechanical fix.

---

## 2. Research / academic

**Is unwarranted generalization a new failure class distinct from hallucination?**
No — and I'd push back on the premise. That models default to high-resource,
majority language varieties is well documented. The phenomenon isn't mine. What I
think is modestly new is the *position* of the finding: that after self-audit
removes fabrication, generalization is what's left, and it survives every check
that asks *is this true?* because every individual claim checks out. Claim the
framing, not the phenomenon.

**How does it relate to existing literature on dialectal variation?**
It's consistent with it and adds nothing to it methodologically. My n is 24
objections from one reviewer per language. That is an anecdote with a suggestive
shape, not a measurement.

**How many reviewers are needed to cover dialect space?**
I don't know, and my data can't answer it. What I can say is that one is
demonstrably not enough for Spanish: the bank tags entries for `mx`, `es`, `ar`,
`co` — four varieties — and has been reviewed by a Mexican speaker only. Every
Argentine and Colombian regional claim in 129 approved entries is unverified.
That's a coverage gap I can state precisely, which is more useful than a number I'd
be guessing at.

**Is native review one category or a vector of positional competencies?**
The latter, and §5.6 is the evidence: the Spanish reviewer's objections were
almost entirely regional, the Italian reviewer's almost entirely taxonomic
(*"I would not call it an idiom"*, five times). Neither could have found the
other's. But note this is two reviewers — enough to show the axes differ, not
enough to characterize them.

**How generalizable beyond Spanish–Italian idioms?**
The architecture is domain-neutral; the evidence is not. One domain, one operator,
two reviewers, 29 objections. Treat the paper as an existence proof that these
mechanisms can be built and a report of what happened once — not as a result that
transfers.

**How will you measure correctness in the field?**
Reader-reported error rate per published entry, once anything is published. Right
now zero entries have reached a reader, so "correct under review" is the only
claim available, and it's the weaker one.

---

## 3. Product / industry

**What's the cost model for native review at scale?**
Per-entry paid review by a native, in both languages — so cost scales linearly
with content and doubles for a bilingual product. Commercial terms are agreed
privately and deliberately kept out of the repository. The honest framing: this is
the dominant marginal cost of the product, and any claim that the architecture
"scales" has to mean *the review budget scales*, because nothing else is the
constraint.

**Can it support daily or high-volume content?**
Daily, yes — that's what it's built for, and the bank holds over a year of
approved material. High-volume in the sense of hundreds of items a day, no. The
gate is a human and doesn't parallelize cheaply.

**What happens when review capacity drops?**
The system ships nothing. That's correct behavior and a commercial hazard, and
§6 says so. The mitigation isn't architectural — it's maintaining an approved
buffer deep enough to absorb a reviewer being unavailable for a month. Currently
that buffer is about a year, which is the strongest operational position the
project has.

**How does this plug into an existing CMS?**
It's a static pipeline: JSON source, generators, committed artifacts, a dumb host.
The transferable parts are the *gates*, not the plumbing — an allowlist, a
publish-time status check, and a derived-not-duplicated build. Those drop into
most editorial systems. The repo-as-database choice is a small-scale convenience,
not a recommendation.

**Is print-level caution transferable to digital-only products?**
Probably not wholesale, and it shouldn't be. §1.3 argues the bar is set by print's
irrevocability — a 95%-correct feed is fine, a 95%-correct calendar has eighteen
wrong days. A digital-only product with a correction path can rationally accept
more risk. The transferable question is *what does your worst irrevocable surface
look like*, and calibrating to that.

---

## 4. Governance / ethics

**Does the architecture meet traceability and accountability standards?**
It provides per-claim attribution to a named, allowlisted human, with dates, in
version control. It does not provide independent identity verification, diligence
measurement, or tamper-resistance against the operator. Whether that meets a
given standard depends on the standard; I wouldn't assert compliance with any
framework I haven't read.

**How do you prevent fabricated reviewer identities?**
The allowlist — which exists specifically because a fabricated reviewer name was
generated in an early session (§3). Forged ids now fail validation. What this
doesn't prevent is a real operator adding a fake person deliberately.

**How do you ensure fair representation across dialects?**
Currently I don't, and this is the honest weak point. Mexican Spanish is the
declared default; 35 approved entries carry an explicit region note, and the rest
assert regional applicability that only a Mexican reviewer has checked. The
system *records* dialect (`regions`, `regionNote`) but does not *verify* it beyond
one variety.

**Does the system risk presenting reviewed content as universally correct?**
Yes, and that's the sharpest ethical point in the list. An `approved` flag reads
as a universal claim, but §5.5 shows correctness is positional. The fix is
presentational as much as architectural: approval should be scoped and displayed
as scoped — *approved for Mexican Spanish* rather than *approved*.

---

## 5. Philosophical / conceptual

**Is explicit silence a new epistemic primitive?**
No. Distinguishing "known absent" from "unknown" is standard — SQL's `NULL`
semantics, `Option`/`Maybe` types, the open-world assumption in ontologies, the
missing-data taxonomy in statistics. What's uncommon is applying it to *editorial*
content, where absent fields are conventionally treated as "not applicable" rather
than "not examined." The contribution is transfer, not invention.

**Is "derived, never duplicated" generalizable to safety-critical pipelines?**
The principle predates me by decades — single source of truth, idempotent builds,
normalization. My narrow claim is the phrasing in §2.4: prefer making bad states
*unrepresentable* to *detecting* them. Gaps in the schedule aren't prevented; they
have no representation.

**Are you proposing a formal separation between drafting and attestation?**
Yes, and I think it's the paper's most portable idea: a generator may propose but
may not attest, and every reader-facing claim traces to a human competent to make
it. But note my own system violates the spirit of this — all 261 source
verifications are recorded against an operator native in neither language (§6).
The separation is cleanly implemented for naturalness and self-certified for
citations.

**Is truth in language inherently local?**
For usage claims, largely yes — naturalness, register, and currency are properties
of a community at a time, not of a language. Existence claims are less local. My
data supports the weaker version: *some* claims that read as universal are local,
and you cannot tell which from inside the record.

---

## 6. The five to rehearse verbatim

**Didn't the AI just make things up?**
> Once, confirmed. *Riso giallo* — the Italian reviewer wrote "never heard, I
> highly doubt that exists," and I deleted the entry. Two others she didn't
> recognize and replaced. That's three of 268 side-reviews. The other 26
> objections were real expressions whose scope I'd overstated. So: fabrication
> happens and native review catches it, but it wasn't the dominant failure.

**Can you show a real example of explicit silence preventing an error?**
> No. Three of 129 approved entries carry a null direction. One was my own
> deliberate calibration test, two came from a third-party source, and none
> records a native judgment that the direction is genuinely trap-free. The
> mechanism is a precondition for auditing, not an audit. §2.3.1 says this.

**Your reviewers never saw the bridge — isn't your differentiator unverified?**
> Correct. Worklists were generated in simplified mode: the Italian document
> contains no Spanish text and no interference notes. The 129 approvals evidence
> monolingual correctness on both sides. Not one bridge claim has been checked by
> anyone. It's the first limitation in §6 and the next thing I'm fixing.

**How do you know the composition gate is doing work?**
> I don't. It sits at 9% against a 33% ceiling and has never rejected anything.
> It may have worked by shaping what I wrote rather than by refusing output —
> that's a legitimate mode of action, but it isn't the one people assume, and
> §5.1 says so.

**Isn't this just human-in-the-loop with extra steps?**
> Largely, yes. The claim isn't a new paradigm. It's about which steps: attest
> mechanically, require explicit null, derive rather than duplicate, and gate
> composition. Each is individually unremarkable.

**Why should anyone believe this works with zero published entries?**
> They shouldn't, fully. Nothing has reached a reader. Correctness under review
> and correctness in the field are different claims and I only have the first.
> This is the strongest argument for publishing the paper after launch, not
> before.
