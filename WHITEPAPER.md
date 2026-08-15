# Silence Must Be a Decision

## Designing a content system that assumes its own generator is unreliable

**A case study in machine-assisted editorial production**

*Un puente al giorno — technical whitepaper, July 2026*

*Figures in this paper are computed from the repository at commit time; see
`tools/build-docs-state.mjs` for the derivation used elsewhere in the docs.*

---

## Abstract

Spanish and Italian both describe reversing a situation as flipping a flat egg
dish in a pan. The Spanish means a triumphant comeback; the Italian means
manipulative spin. And the Spanish word for the egg dish means something else
again in Mexico. All three facts are true, none contradict each other, and a
generated entry can state the first without ever revealing the third.

Language-learning content is unusually hostile to machine generation. A model
asked for an idiom will always produce one. It will be fluent, it will cite a
dictionary, and it will often be wrong in a way the person asking cannot see.

The errors are rarely inventions. Far more often the expression is real and
something attached to it is not: a true phrase given a made-up etymology, a
genuine idiom marked casual when it is anything but, a correct meaning propped up
by a citation that says something else.

This paper describes a production system for bilingual Spanish–Italian
expression content built on the premise that its own generator cannot be
trusted, and that the humans operating it will forget the rules on a busy
Tuesday. We describe four architectural commitments — mechanical trust
boundaries, mandatory explicit silence, derivation over duplication, and a
composition gate against curatorial drift — and report the failure modes
observed in practice over roughly 150 generated entries.

We report two empirical results. Of 149 active entries, **129 have cleared
native-speaker review** in both languages, and the composition gate passes with
substantial margin (9% easy-only against a 33% ceiling; 91% high-value against a
50% floor).

More usefully, the returned reviewer worklists allow us to report **what native
review actually caught**: 29 substantive objections across 268 side-reviews
(~11%). Three concerned expressions the Italian reviewer did not recognize — one
of which she doubted existed at all, and which was deleted. The remaining 26
concerned claims that were true in some dialect, register, or category but
presented as true generally. We argue this ratio is the paper's most
transferable finding: after self-audit removes outright fabrication, what
dominates the residue is *unwarranted generalization* — a failure class that
source-checking cannot detect and only a situated native reviewer can.

---

## 1. The problem

### 1.1 A product that requires two languages

*Un puente al giorno* pairs one Spanish and one Italian expression per day and
explains **the bridge** between them: what carries across, what does not, and the
specific error a speaker of one language makes in the other.

The bridge is the product's structural moat. A Spanish-only or Italian-only
publication cannot produce it — not for want of effort, but because the artifact
does not exist within a single language. It is a relation, not a property.

Consider a pair that will recur throughout this paper:

> **Dar la vuelta a la tortilla** (ES) — *to flip the omelette.*
> To completely reverse a situation, turning it in one's favor.
>
> **Rivoltare la frittata** (IT) — *to flip the frittata.*
> To spin a situation to make oneself look better; to twist an argument and dodge
> blame.

Two Romance languages, the same kitchen gesture, the same flat egg dish turned
over in a pan. A learner who reasons from the imagery will conclude they are
equivalent, and be wrong in a way that matters. The Spanish is a *comeback* —
often triumphant, the underdog winning. The Italian is an *accusation* — someone
distorting the story to escape responsibility. A Spanish speaker describing their
team's late victory as *rivoltare la frittata* has just accused themselves of
spin.

This is the ordinary case, and it is already invisible to monolingual reference
work: no Italian dictionary has occasion to note what Spanish does with its
omelette.

But the pair has a second layer, and the second layer is the reason this paper
exists.

**The word *tortilla* is a false friend inside the idiom.** In Spain it is a
potato omelette; in Mexico it is a corn flatbread. The idiom exists in both
places — but the image under it is not the same image, and the phrasing diverges:
Mexican speakers more often say *voltear la tortilla*. An entry that records the
Spanish side as simply *dar la vuelta a la tortilla* is not false. It is true in
Spain, and presented as true everywhere.

That distinction — between a claim that is wrong and a claim that is *unmarked
for where it is right* — is the failure mode this system was built to catch, and,
as §5.5 reports, it is the one that survived every automated check and had to be
caught by a human standing in a particular place. We did not learn about
*voltear la tortilla* from a dictionary. We learned it because a Mexican reviewer
wrote it in a margin.

### 1.2 Why this content resists generation

Three properties make the domain adversarial to automated production:

**Fluency is uncorrelated with correctness.** A generated Italian idiom reads
exactly as well whether it is in daily use, archaic, regional, or invented.

**The evaluator is usually not competent to evaluate.** The operator building a
Spanish–Italian product is, typically, native in neither. The error surface is
invisible from inside.

**Errors are socially costly, not merely wrong.** Register mistakes are the
sharpest case. An expression that is warm between friends and insulting to a
superior will be flagged by no dictionary, and its misuse damages the user in
precisely the situation the product promised to help with.

### 1.3 Why the bar is set at print

The daily feed is not the terminal product. It is a testing ground: hundreds of
pairings are published, and the ones that demonstrably land are collected into a
bilingual **tear-off calendar** — a physical object, one pair per leaf, 4.25 ×
5.5in trim (Figure 2).

This changes the cost function for the entire system, and it is the reason the
verification bar is set where it is.

A wrong entry in an email is embarrassing and correctable; a correction goes out
the next morning. A wrong entry in a website archive is a one-line commit. **A
wrong entry printed across a print run is permanent.** It cannot be patched, it
sits in someone's kitchen for a year, and it is wrong on a specific dated page
that the buyer will reach on a specific morning.

Two architectural consequences follow directly:

1. **Verification cannot be probabilistic.** A 95%-correct daily feed is a good
   feed. A 95%-correct calendar has eighteen wrong days in it.
2. **The schedule must be gap-free and deterministic**, because a physical
   calendar has no mechanism for a missing day. This is why the date→entry
   mapping is a pure function (§2.4) rather than a stored table that could be
   incompletely populated.

The rest of this paper describes a system whose caution is calibrated to print,
even though print is the last surface it will reach.

### 1.4 The design premise

We therefore treat the generator as a **proposal mechanism with no epistemic
authority**. It may draft; it may not attest. Every claim that reaches a reader
must be traceable to a named human competent to make it.

This is not a statement about any particular model's quality. It is an
architectural stance: a system whose correctness depends on the generator being
right is a system that will eventually ship something wrong, and will have no
mechanism to notice.

---

## 2. Architecture

### 2.1 The unit of content

The bank is a directory of JSON files, one per entry, the filename being the id.
There is no database. Each entry carries both language sides — expression,
literal gloss, meaning, example, translation, register, exam-safety, regions —
plus the bridge, scheduling fields, pedagogy metadata, and governance:

```json
{
  "id": "0089",
  "type": "idiom",
  "es": { "text": "…", "literal": "…", "meaning": "…",
          "sources": [{ "authority": "…", "url": "…",
                        "verifiedOn": null, "verifiedBy": null }] },
  "it": { … },
  "bridge": {
    "note": "…",
    "tags": ["false_friend", "register_differs"],
    "interference": { "es_to_it": "…", "it_to_es": null }
  },
  "review": { "status": "draft", "esReviewer": null, "itReviewer": null }
}
```

Statuses progress `draft → needs_review → approved`, with `retired` as a
recoverable terminal state carrying a reason. **Only `approved` entries can reach
a reader**, and that is enforced at every read site, not by convention.

**A complete entry.** The skeleton above is abstract; below is entry 0028 — the
pair from §1.1 — with every reader-facing field filled in. This is the whole
artifact a subscriber receives, and it is what the reviewers, the validator, and
the composition gate are all protecting.

| Field | Spanish | Italian |
|---|---|---|
| Expression | Dar la vuelta a la tortilla | Rivoltare la frittata |
| Literal | to flip the omelette | to flip the frittata |
| Meaning | To completely reverse a situation, turning it in one's favor. | To spin a situation to make oneself look better; to twist an argument to dodge blame. |
| Example | *Íbamos perdiendo 2-0, pero logramos **dar la vuelta a la tortilla** y ganamos el partido.* | *Ha sbagliato lui, ma ha **rivoltato la frittata** e ora sembra colpa mia.* |
| Translation | We were losing 2-0, but we managed to turn things around and won the match. | He was the one who made the mistake, but he flipped the frittata and now it looks like it's my fault. |
| Register | colloquial, neutral formality | colloquial, neutral formality |
| Source | RAE (DLE), *tortilla* | Treccani, *frittata* |

> **Bridge.** Nearly identical cooking imagery — a flat egg dish being flipped —
> hiding a real divergence in meaning. Spanish *dar la vuelta a la tortilla* is a
> genuine, often triumphant reversal of fortune; Italian *rivoltare la frittata*
> is manipulative — someone distorting the story to dodge blame. The examples
> show it: Spain's is a comeback, Italy's is an accusation.

> **Trap, Spanish → Italian.** Using *rivoltare la frittata* for a genuine
> comeback misfires badly — you are accusing yourself of spin. For the
> sports-comeback sense Italian says *ribaltare la situazione* or *ribaltare il
> risultato*.

> **Trap, Italian → Spanish.** *Dar la vuelta a la tortilla* does not carry the
> blame-shifting accusation; a Spanish listener hears a neutral or positive
> turnaround. For manipulative spin Spanish reaches elsewhere (e.g.
> *tergiversar*).

Tagged `shared_metaphor` and `false_friend`; CEFR B2; difficulty 3 of 5.

Note what the two traps are *not*: they are not each other's mirror image. The
Spanish speaker's error is social — self-accusation. The Italian speaker's error
is a failure to land an accusation at all. This asymmetry is why the schema
requires two independent fields rather than one shared note, and it is the
subject of §2.3.

Note also what is **absent**. The entry says nothing about *voltear la tortilla*,
the Mexican variant. Every field above is correct. The omission is invisible from
inside the record, and no validator can detect it — which is the finding of §5.5,
visible here in the artifact itself.

### 2.2 Commitment I — trust boundaries are mechanical

The rule "nothing ships unreviewed" is worthless as a policy, because policies
are remembered by people who are tired. It is implemented as a validator gate.

An entry may be approved only if:

1. `review.esReviewer` and `review.itReviewer` are ids present in
   `reviewers.json`;
2. each reviewer is tagged native in the language whose side they signed — the
   validator rejects an Italian reviewer approving a Spanish side;
3. every source carries `verifiedOn` (a valid past ISO date) and `verifiedBy`
   (an allowlisted id);
4. sources verified more than 24 months ago raise a staleness warning.

The reviewer allowlist is the trust boundary of the entire product, and it
contains a comment stating the operative constraint plainly: *a model is not a
valid reviewer, and cannot be added by accident.*

Critically, these checks are **strict-mode only** — they bind at approval, not at
draft. Honest incomplete work is permitted to exist. This matters: a system that
forbids unverified drafts produces either paralysis or dishonest metadata. What
must be impossible is not *having* unverified content, but *shipping* it.

### 2.3 Commitment II — silence must be a decision

The bridge carries **directional** interference. The trap a Spanish speaker meets
in Italian is not the trap an Italian meets in Spanish; they are different facts
about different learners.

```
bridge.interference = { es_to_it: string | null,
                        it_to_es: string | null }
```

Both keys are **required to be present**. `null` is legal; omitting the key fails
validation with the message *"Silence has to be a decision."*

The enforcement is real and was verified for this paper: an entry with a missing
direction key is rejected, an entry with an explicit `null` passes, and an entry
that carries a trap tag while stating no trap in either direction is rejected at
approval. What the check enforces, however, is **syntactic presence, not
epistemic provenance** — see §2.3.1.

This is the paper's title and its most transferable idea. The distinction between
"there is nothing here" and "nobody has looked here" is invisible in most data
models, and the two are routinely conflated by systems that treat absence as a
default. In a verification pipeline that conflation is fatal, because unexamined
fields masquerade as examined ones and the reviewer has no way to tell which is
which. Making silence explicit converts an unknown into a record.

A related check catches internal contradiction: if an entry's tags *claim* a trap
(`false_friend`, `auxiliary_trap`, `interference_risk`, `preposition_differs`,
`register_differs`) but both interference directions are empty, validation fails.
The entry is asserting a hazard it declines to describe.

#### 2.3.1 What the mechanism does not establish

A field cannot record who filled it. The validator can require that a decision
was *made*; it cannot verify that a *competent human* made it. In this bank the
gap is not hypothetical: reviewer worklists were generated in a simplified mode
that omitted all bridge and interference content (§6), so **no native reviewer
ever saw an interference field.** Every `null` in the bank was written by the
drafting process or by the operator, who is native in neither language.

Three of 129 approved entries carry a null direction. Their review notes show two
were banked from a third-party source and one was submitted by the operator as a
deliberate calibration test — none record a native judgment that the direction is
genuinely trap-free.

The honest formulation is therefore weaker than the section title suggests:
**the schema forces silence to be recorded as a decision; it does not establish
whose decision, or whether it was informed.** Closing that gap requires either
routing interference fields to reviewers, or a provenance field recording who
set each null and when. Neither exists today. We retain the principle because
recording the decision is a precondition for auditing it — but a precondition is
not the thing itself.

### 2.4 Commitment III — derived, never duplicated

The day's entry is a **pure function** of `(date, bank, events, overrides)`.
Nothing is stored per day. There is no calendar table, no cron job that can
silently miss a day, no backfill script.

The consequence is worth stating precisely: **gaps are not prevented, they are
unrepresentable.** There is no state in which a day exists without an entry,
because days do not have stored entries — they have computed ones.

Precedence runs `overrides → events → pins → rotation`. The rotation is a seeded
permutation (nothing repeats until the bank is exhausted), season-aware,
append-safe (a new entry joins the *next* cycle, so recomputing a past month
still yields what was actually sent), and seam-guarded against accidental
repetition on consecutive days. A `--check` mode asserts seven invariants across
any year; CI runs it over a four-year window.

Every downstream surface — website, archive, practice game, reviewer worklists,
and this documentation set's own state sections — is generated from the same
bank. Nothing is copied, so nothing can drift.

### 2.5 Commitment IV — a gate against curatorial drift

A bank curated by delight drifts toward the charming and useless. Twin
expressions that mirror each other across languages are pleasant to write, easy
to verify, and teach nothing: the learner who guesses will be right.

The validator therefore enforces composition once 20 or more entries are
approved (below that, ratios are noise):

| Constraint | Threshold |
|---|---|
| Entries tagged **only** with easy tags (`shared_metaphor`, `cognate_pair`) | ≤ 33% |
| Entries carrying ≥ 1 high-value tag | ≥ 50% |

The high-value set is precisely the set of things that cost a learner something
to get wrong: false friends, auxiliary traps, preposition splits, register
splits, and general interference risk.

The gate is a statement about what the product is *for*. Charming pairs justify a
subscription; traps justify a price. Tag distribution across the 129 **approved**
entries:

| Tag | Count | Class |
|---|---|---|
| `interference_risk` | 94 | high-value |
| `shared_metaphor` | 61 | easy |
| `preposition_differs` | 36 | high-value |
| `false_friend` | 23 | high-value |
| `cognate_pair` | 19 | easy |
| `register_differs` | 17 | high-value |
| `auxiliary_trap` | 8 | high-value |

The validator additionally emits a **preview** warning — *if everything were
approved as-is, would composition pass?* — so the constraint is visible while
drafting rather than at the moment of approval, when it would be expensive.

---

## 3. Observed failure modes

This section reports actual errors produced during roughly 150 entries of
machine-assisted drafting. It is included because the literature on this class of
system is heavy on architecture and light on empirical failure description, and
because the specific *shape* of the errors motivated most of the design above.

All were caught by human audit, validator gate, or both, and none survived into
an approved entry. The bank has since passed native review in both languages,
which converts this list from a set of near-misses into an audit trail with an
independent check behind it.

**Invented etymology on a true expression.** A real idiom was supplied with a
confident and fabricated historical origin. The expression, meaning, and usage
were correct; only the story was invented. This is the archetypal failure: *the
true core makes the false detail credible.* A later entry was flagged in-place
after a similar origin story could only be established as tradition rather than
fact — the flag is now part of the entry's review notes.

**Invented human attribution.** A reviewer name — "María" — was generated and
recorded as though a real person had verified content. This is the most serious
failure observed, because it forges precisely the artifact the trust boundary
exists to protect. It directly motivated the allowlist design: reviewer ids must
now resolve against `reviewers.json`, so a fabricated name cannot validate.

**Citation that does not support the claim.** A source URL was supplied that was
real, plausible, and did not contain the referenced material.

**Unverified precision.** A dating claim was asserted with specificity the
evidence did not support.

**Claimed work not performed.** Work was reported as complete without having been
executed — a failure of process honesty rather than of content.

**Identifier collision.** Two entries were assigned the same id, now prevented by
a bank-level uniqueness check.

The pattern across all of these is consistent enough to state as a design rule:
**plausible detail accretes on true cores.** The dangerous output is not the
fabricated expression, which a native speaker will catch instantly. It is the
genuine expression wearing one invented ornament, which survives casual review
precisely because everything around it is correct.

### 3.1 Discovery is not authority

A corollary emerged from working with published reference books and third-party
educational material. Such sources are **discovery instruments**: they establish
that an expression exists and roughly what it means. They cannot establish that
it is *natural* — that a speaker would actually reach for it today, in this
register, in this region.

The operating rule is therefore asymmetric:

> Published books are citable authorities for **existence and meaning**.
> Naturalness always requires a **named human reviewer**. No exceptions.

Discovery sources are recorded in review notes rather than presented as
verification, and all glosses and examples are authored fresh rather than
reproduced.

---

## 4. Operational surfaces

Three public surfaces read from the bank, deliberately sequenced by the cost of
being wrong.

**Instagram** is first because a post costs nothing to skip and promises nothing.
It is where format is proven. Publication is manual by design — consistent with a
review gate that already assumes a human at the moment of shipping.

**The website** is second, as accumulated back-catalog. It is *backfilled* from
what has already been posted, so it is useful immediately without a second
content stream. It is served as static files; the host runs no build step and
executes none of our code.

**The email** is last, because it is the only real promise. A daily newsletter
asserts that tomorrow there will be something worth sending, and that commitment
cannot be quietly withdrawn. Subscriber language is captured at signup, because
directional interference means two subscribers must receive *different warnings
from the same entry*.

The sequencing is itself an application of the paper's thesis: exposure is
granted in proportion to confidence.

---

## 5. Results

### 5.1 The gate opened

At the time of writing, **129 of 149 active entries have been approved**. Every
approval carries a Spanish reviewer (`native-mx-01`) and an Italian reviewer
(`native-it-03`), both allowlisted natives in the language whose side they
signed, with 261 source verifications recorded against the operator.

The composition gate — active above 20 approved entries — passes comfortably:

| Constraint | Threshold | Actual | |
|---|---|---|---|
| Easy-only entries | ≤ 33% | **9%** (11 of 129) | pass |
| High-value entries | ≥ 50% | **91%** (118 of 129) | pass |

The margin is wider than the design anticipated. A bank assembled by an operator
who could not evaluate the content in either language nevertheless converged on a
composition dominated by exactly the material the gate was written to protect.
We do not claim the gate *caused* this — the operator was aware of the constraint
while drafting, and the validator emits a running preview, so the mechanism
plausibly worked by influencing authorship rather than by rejecting output. That
is a legitimate mode of action for a constraint, but it is not the one usually
measured, and it means the gate has never actually had to refuse anything.

### 5.2 Explicit silence was exercised, and it is rare

Of the 129 approved entries, 126 carry a stated trap in **both** directions, one
carries a trap in a single direction, and two record explicit `null` in both:
a human looked in both directions and found nothing to warn about.

Three entries in 129 is a small number, and §2.3.1 explains why it is weaker
evidence than it first appears: no native reviewer saw an interference field, so
these nulls record the *drafting process* finding no trap, not a competent human
confirming there is none.

What the mechanism does deliver is auditability. Because the three are
syntactically distinguishable from entries nobody examined, they can be found,
listed, and routed to a reviewer — which is how they were identified for this
paper. That is a real property, and a narrower one than the section title
claims.

### 5.3 What did not clear review — the more interesting result

Twenty entries remain unapproved, and they are not a random remainder. They fall
into two distinct groups.

**Six idioms** were held back individually, including entries already flagged
internally during drafting — one whose Spanish side was marked as Peninsular and
awaiting a Mexican re-pairing, and one flagged as a rare reversal of the usual
figurative/literal polarity. These are ordinary editorial holds and the system
handled them as designed.

**Fourteen are near-identical cognate formulas**: *a propósito / a proposito*,
*a decir verdad / a dire il vero*, *poco a poco / a poco a poco*, *de nuevo / di
nuovo*, *en realidad / in realtà*. By type they are markers and collocations
rather than idioms.

This is the paper's most useful negative finding. These entries are the easiest
possible content to produce — the two languages hand them over for free — and
they are also the content that teaches least, because a learner who simply
guesses will be right. They are precisely what a bank drifts toward when
generation is cheap and evaluation is hard.

They did not clear review. Whether that was reviewer judgment, operator triage,
or simple ordering, the effect is that the cheapest material is the material
still sitting outside the gate.

We tested the counterfactual: approving all twenty would move easy-only from 9%
to 11% and high-value from 91% to 89% — still passing. **So the gate would not
have stopped them.** The formulas were held back by human judgment, not by the
mechanism. This is worth stating plainly because it is evidence against the
architecture's sufficiency: a ratio gate tuned to catch bulk drift does not catch
a small, cheap, low-value block, and something outside the system caught it
instead.

### 5.4 What review actually caught

The reviewer worklists were returned as annotated documents, which makes it
possible to report the paper's most-wanted figure: **the rate at which native
review found errors in machine-drafted content.**

Across 119 Spanish and 149 Italian side-reviews (268 total), reviewers raised
**29 substantive objections — approximately 11%.**

**Spanish (Mexican reviewer): 15 flags on 119 entries (13%)**

| Category | n | Example |
|---|---|---|
| Not used in this dialect | 5 | *"No es una frase que usaríamos en México."* |
| Regional variant preferred | 4 | **0028 — the pair from §1.1**: Mexico says *voltear la tortilla*, and *tortilla* is a flatbread there, not an omelette; 0048 — the destination is *la Villa* (the Virgin of Guadalupe's), not Sevilla |
| Meaning misdescribed | 3 | 0055 *estar en el banquillo* means to be **on trial**, not benched; 0065 *me late que* expresses a hunch and takes the future |
| Correct but dated | 1 | 0071 *manirroto* — *"español antiguo"*, rarely used in Mexico |
| Grammatical preference | 2 | 0075 also takes *ser* (*es de buen diente*); *de* preferred over *por* |

**Italian: 14 flags on 149 entries (9%)**

| Category | n | Example |
|---|---|---|
| **Type misclassified** | 6 | *"I would not call it an idiom"* — 0029 *c'era una volta*, 0030 *due anni fa*, 0031 *magari*, 0034 *appena*, 0055 *in panchina*, 0215 *per conto mio* |
| **Expression not recognized** | 3 | 0024 *sentirsi come un pesce nell'acqua* and 0025 *essere pane e cacio* — *"I've never heard this"*, with replacements supplied and adopted. 0082 *riso giallo* — **"Never heard, I highly doubt that exists"**; the entry was deleted outright |
| Example unnatural | 3 | 0009 *essere a pezzi* is used emotionally; the supplied example was rewritten |
| Wrong form | 2 | 0078 is *essere in quattro gatti*; 0095 is fixed as the negative imperative *non mettere il carro...* |

### 5.5 What dominates the residue is generalization

The pair this paper opened with is in that table. Nothing in the system could
have flagged *dar la vuelta a la tortilla* — the phrase is real, the sources
support it, the meaning is correct, and the validator has no concept of *where*.
It took a reviewer in Mexico City writing a sentence in a margin.

This result partly **contradicts** §3, and the contradiction is the finding.

The failure modes documented in §3 — invented etymology, unsupported citation,
fabricated attribution — are *fabrication* errors: assertions of things that are
not so. Those were caught during drafting, by operator audit and validator gate.

That is not mostly what native review caught. **Three of 29 objections were
recognition failures.** The Italian reviewer had never heard *sentirsi come un
pesce nell'acqua* or *essere pane e cacio* and supplied replacements, which were
adopted. Of *riso giallo* she wrote: **"Never heard, I highly doubt that
exists"** — and that entry was deleted rather than re-paired. The other 26 were
claims that were true *somewhere* — in some dialect, some register, some category
— presented as true *generally*. The Spanish flags
are overwhelmingly Peninsular-vs-Mexican; the Italian flags are largely
taxonomic, where genuine expressions had been over-classified as idioms.

These three deserve care rather than a convenient reading, and they are not all
alike. *Sentirsi come un pesce nell'acqua* and *essere pane e cacio* are attested
in Italian reference works, so two interpretations are available and our data
cannot separate them: either the entries were bad, or the expressions are real
but absent from this speaker's variety — in which case they are further instances
of the generalization problem rather than exceptions to it.

*Riso giallo* does not admit that reading. The reviewer did not merely fail to
recognize it; she doubted it existed, and the operator's response was deletion
rather than re-pairing. **That is a fabrication, and the paper should say so
plainly rather than reclassify it as a scope error.** One in 268 side-reviews is
a low rate, and it is not zero. The project's own standard (§3.1) settles how to
read all three: a native saying "I've never heard this" is the operative signal,
and appealing to a dictionary over her is precisely the move that standard
forbids.

The generalizable claim is therefore a ratio rather than an absolute:

> **After self-audit removes fabrication, what dominates the residue is
> unwarranted generalization** — 26 of 29 objections here, with one confirmed
> fabrication surviving to native review. A verification
> architecture that checks whether a claim is *true* will not catch a claim that
> is true elsewhere. Only a reviewer situated in a specific dialect, register, and
> moment can catch that — which is an argument for native review that no amount of
> source-checking replaces.

This also settles, empirically, a question the project had left open. The bank
carried an undecided policy on whether Spanish should default to Mexican or
Castilian usage. The reviewer answered it unprompted, five times, without being
asked about dialect at all — the strongest available evidence that the question
was real and that the default was wrong.

### 5.6 Two reviewers, two error classes

The reviewers found **categorically different** things, and neither could have
found the other's.

The Spanish reviewer's objections are almost entirely **regional**. The Italian
reviewer's are almost entirely **taxonomic** — five of nine say, in effect, *this
is a real expression but it is not an idiom.*

Neither pattern is predictable from the other, and neither is discoverable
without a native in that specific position. This is a concrete argument against
treating "native speaker review" as a single interchangeable checkpoint: what a
reviewer catches depends on where they stand, and two competent natives of
different languages audited along entirely different axes.

---

## 6. Honest limitations

**The bridge itself was never reviewed.** This is the most serious limitation in
the paper. Reviewer worklists were generated in a simplified mode that presented
each reviewer only with expressions in *their own language* — the Italian
document contains no Spanish text, no interference notes, and no bridge prose.
Reviewers therefore verified that phrases are real, natural, and correctly
glossed within one language. **Nobody verified the claims about how the two
languages relate**, which is precisely the product's differentiator and the
subject of §1.1. The 129 approvals evidence monolingual correctness on both
sides; they do not evidence that a single bridge note is accurate.

**Source verification was performed by the operator, not by natives.** All 261
source verifications are recorded against the operator (`jf`), who is native in
neither language. The architecture separates *attestation of naturalness* (native
reviewers) from *attestation that a source says what is claimed* (operator), and
only the first is independently competent. A reader is entitled to treat the
citation layer as self-certified.

**Review depth is unmeasured.** We record *that* a native approved an entry, not
how long they spent or what they changed. A sign-off and a careful reading are
indistinguishable in the data model. This is a real gap: the trust boundary
verifies identity and competence, but not diligence.

**The objection counts in §5.4 were miscounted twice.** An earlier draft reported
24 objections and asserted that *none* were recognition failures. Corrected once,
it reported 28 and two. The true figures are 29 and three, including one
expression the reviewer doubted existed. Each correction came from the operator
reading the source document; each time, automated extraction had missed comments
whose text was interleaved across column boundaries in the annotated PDF. The error came from automated extraction of an annotated PDF that
undercounted the Italian reviewer's inline comments, and it was caught by the
operator reading the source document rather than by any check. This is worth
recording rather than quietly fixing, because it reproduces the paper's own
thesis at the level of the paper: a true core — most objections concern
generalization — acquired a cleaner, more memorable, false overlay ("zero
fabrications"). A result that arrives at exactly zero should attract suspicion,
including from its author.

**Corrections were recovered from documents, not from the system.** §5.4 reports
what review caught, but that data was extracted post hoc from returned PDFs — one
annotated inline, one using PDF comment objects. The bank itself stores only
amended text, with no diff and no link between an objection and the entry it
changed. Several Spanish comments could only be anchored to a page rather than an
entry, so a few attributions in §5.4 are inferred. Reviewer deltas should be
first-class data; that they had to be reconstructed is a design defect.

**Reviewers were informed of the drafting method only after completing the
work.** They were subsequently told that AI was used and asked to review this
paper before publication. This matters for what §5.4 evidences: a reviewer who
knows a model produced the text reads more adversarially, hunting for the
specific failure shapes in §3. The 9% objection rate was produced by reviewers
who believed they were checking human-written phrases, and is therefore a
*lower* bound of uncertain tightness.

**One reviewer, one dialect.** §5.5 concludes that generalization is the residual
failure mode, on evidence from a single Mexican reviewer. A Castilian reviewer
would presumably have flagged a different five entries. This strengthens the
claim that dialect matters and weakens any claim about which default is correct.

**No content has reached a reader.** 129 approved entries have been published
nowhere. Correctness under review and correctness in the field are different
claims, and only the first is evidenced here.

**Thresholds remain unvalidated.** The 33% / 50% ratios and the 24-month source
staleness window are reasoned, not derived. §5.1 shows the composition gate has
never been the binding constraint, so its calibration is untested in the only way
that would matter.

**Single-operator bias.** One person writes, edits, verifies sources, and ships.
The architecture's resilience to a second operator with different habits is
untested.

**The binding constraint is social.** Review at this scale is substantial paid
labor. The architecture's response to unavailable review capacity is to ship
nothing — correct behavior, and also a dead product. A verification gate is only
as good as the capacity behind it, and capacity is a budget problem no
architecture solves.

## 7. Future work

Each item below names the limitation it closes and the mechanism intended to
close it. They are ordered by how much they would strengthen the claims in §5.

**1. Route interference fields to reviewers.** Closes the paper's most serious
limitation: no native has seen a bridge or a trap. The `--simple` worklist mode
was built to reduce reviewer burden and succeeded at that while withholding
exactly the content that most needs checking. A second worklist mode should
present each reviewer the interference direction written *for* their language,
with the foreign expression glossed. Until this exists, the 129 approvals
evidence monolingual correctness only.

**2. Store reviewer deltas as first-class data.** Closes the gap that forced §5.4
to be reconstructed from returned PDFs. A `revisions` array on each entry —
`{field, before, after, by, on, reason}`, appended rather than overwriting — would
yield per-reviewer change rates and per-field error concentration directly. This
is the single change that would most improve the evidentiary basis of any future
version of this paper.

**3. Add provenance to explicit silence.** Closes §2.3.1. A `setBy` / `setOn` pair
on each interference field, validated against the reviewer allowlist, would
distinguish *a native judged this direction trap-free* from *nobody has looked*.
Today those are the same record. The mechanism is the one that already catches
forged reviewer ids.

**4. Add per-type composition floors.** Closes the blindness demonstrated in
§5.3. The current gate is tag-based and therefore cannot see that fourteen
held-back entries were markers and collocations rather than idioms. A ceiling on
low-yield types as a share of approved entries would catch mechanically what
human judgment caught here.

**5. Scope approval, and display it as scoped.** An `approved` flag reads as a
universal claim, but §5.5 establishes that correctness is positional. Approval
should carry the variety it was granted for — *approved for Mexican Spanish* —
and reader-facing surfaces should show that scope rather than a bare checkmark.
This is a presentational fix as much as an architectural one.

**6. Extend dialect coverage to match what the bank claims.** Entries are tagged
for Mexican, Peninsular, Argentine, and Colombian Spanish, and have been reviewed
by a Mexican speaker only. Every Argentine and Colombian regional claim across
129 approved entries is currently unverified. Either the coverage or the claims
should change.

**7. Define who is competent to verify a bridge.** The trust model in §2.2 has a
gap the paper did not previously acknowledge. Every reviewer in `reviewers.json`
is registered with a *single* language, and the validator's rule is that a
reviewer must be native in the language whose side they signed. But a bridge is a
claim about the *relation* between two languages — that *rivoltare la frittata*
carries blame where *dar la vuelta a la tortilla* does not. **No monolingual
native is competent to verify that.** The Italian reviewer can confirm the Italian
is natural; he cannot confirm what Spanish does, because he does not speak it.

This makes item 1 harder than it appears: routing interference fields to existing
reviewers does not work, because existing reviewers are not qualified to receive
them. Bridge verification requires either a reviewer native in one language and
genuinely competent in the other — a rarer and more expensive person — or a
two-reviewer protocol where each confirms only the half they can see. The trust
boundary is well-formed for phrases and **undefined for the artifact the product
actually sells.**

**8. Investigate whether the audience can supply verification capacity.** §6
states that review capacity is a budget problem no architecture solves. That may
be too pessimistic for one product shape. If the product serves *reciprocal*
learners — a Spanish speaker learning Italian and an Italian speaker learning
Spanish — then each user is a native of the language their counterpart is
learning, and is exactly the person qualified to judge one direction of the
interference pair. The entries already support this structurally: `es_to_it` and
`it_to_es` are independent fields, so a single entry is a complete shared lesson
in which each participant is the other's authority. Whether elicited judgments
from learners can meet the standard set by paid native review is an open question,
and a testable one.

**9. Measure correctness in the field.** Reader-reported error rate per published
entry, once anything is published. This is the only measurement that would
convert the paper's central claim from *survived review* to *survived contact
with readers*, and it cannot begin until the product ships.

Items 1–3 are prerequisites for a stronger version of this paper. Item 7 is a
prerequisite for it being about a working system rather than a designed one.

---

## 8. Transferable conclusions

For practitioners building machine-assisted content systems in domains where the
operator cannot evaluate the output:

1. **Treat the generator as a proposal mechanism with no authority.** Draft
   freely; attest never. Every reader-facing claim should trace to a named human
   competent to make it.

2. **Make trust boundaries mechanical.** A rule enforced by memory is not
   enforced. Allowlist the humans who may attest, and make forged attribution
   fail validation rather than review.

3. **Distinguish "nothing here" from "nobody looked."** Require explicit null.
   The unexamined field is the one that ships wrong, and it is indistinguishable
   from the examined one unless the data model forces the difference. But note
   the limit: a required field proves a decision was recorded, not that a
   competent party made it. If provenance matters, store it — who set this value,
   and when. We did not, and §2.3.1 is the cost.

4. **Permit honest incompleteness.** Gate at publication, not at authorship.
   Systems that forbid unverified drafts get dishonest metadata instead of
   verified content.

5. **Derive rather than duplicate.** If a surface is computed from source, it
   cannot drift from it. Prefer making bad states unrepresentable to detecting
   them.

6. **Guard against curatorial drift explicitly.** Left alone, any curated
   collection drifts toward what is pleasant to produce. If the valuable content
   is the difficult content, encode that as a ratio the system enforces.

7. **Expect plausible detail on true cores.** Design review processes to attack
   ornament rather than substance. The wholly fabricated item is easy; the true
   item wearing one invented decoration is the one that survives.

8. **Expect generalization, not fabrication, as the residual failure.** Once
   self-audit removes invented facts, what remains is claims that are true
   somewhere and presented as true everywhere — wrong dialect, wrong register,
   wrong era, wrong category. Source-checking cannot detect this, because every
   individual claim checks out. Only a reviewer situated in a specific variety
   can.

9. **Reviewers are not interchangeable checkpoints.** Two competent natives
   audited along entirely different axes — one found regional errors almost
   exclusively, the other taxonomic ones. Neither could have found the other's.
   Plan review coverage by *position*, not by headcount.

10. **Record what review changed, not just that it happened.** A status field
   proves an entry was seen. It cannot distinguish a careful reading from a fast
   sign-off, and it discards the most valuable data the process produces. Store
   reviewer deltas as first-class objects.

11. **Verify that your gates are actually binding.** A constraint that always
   passes may be well-calibrated, or may simply never have been tested. We found
   our composition gate passing at 9% against a 33% ceiling while a block of
   low-value content was held back by human judgment the gate would not have
   caught. Measure whether a mechanism has ever refused anything before crediting
   it with the outcome.

---

## Appendix — component inventory

| Component | Function |
|---|---|
| `bank/*.json` | Source of truth; one file per entry |
| `validate.mjs` | Structural, strict-mode, and composition checks |
| `reviewers.json` | Trust boundary; allowlist of humans who may attest |
| `schedule.mjs` | Date → entry, pure function, `--check` asserts invariants |
| `build-review-lists.mjs` | Reviewer worklists; reviewers never touch JSON |
| `build-landing.mjs` | Public site, generated so the demo cannot drift |
| `build-archive.mjs` | Website backfill from published entries |
| `build-social.mjs` | Social cards, measured typography |
| `build-docs-state.mjs` | Regenerates this documentation's state sections; CI-gated |
| CI (`validate.yml`) | Bank validation, worklist freshness, scheduler invariants, doc freshness |

---

*Un puente al giorno · https://github.com/joeysprite/Puente-Al-Giorno*
