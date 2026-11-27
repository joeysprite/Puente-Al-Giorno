# Candidates queue — organised by bank-review outcome

Rewritten 2026-07-29. Previous version was sorted by review priority alone. This version
is organised around the same question the bank's own review process asks — will this
survive it — using the two failure patterns actually documented in the repo, so the same
mistakes aren't repeated at scale:

1. **Scope exclusion.** 0070, 0100, and 0110 were drafted, reviewed, and approved —
   then retired. Not for bad sourcing: their own `retiredReason` field says `type: formula`
   is out of scope for v1, with a note to recover them if a tear-off calendar ships. The
   entries were fine; the type wasn't wanted yet. Formula-shaped candidates (greetings,
   farewells, wishes) get pulled into their own section up front so review time isn't
   spent on something the product doesn't currently use, however well-sourced.
2. **Shape or overlap mismatch.** 0009 was dissolved because its Spanish side kept being
   the wrong shape for its Italian side — covering senses the Italian didn't, or colliding
   with an entry that already existed. Candidates already flagged with the same pattern —
   a meaning/valence mismatch, or a collision with something already banked — are
   consolidated into one section instead of being scattered where they'd get missed.

This maps onto `REVIEW_PROCESS.md`'s stages: **Ready** below is what can start Stage 1
drafting now; **Needs research** is still Stage 0; **Formula** and **Risk** are both flagged
specifically so they are NOT drafted until the reason is resolved — a scope decision
changes, or a reviewer settles the meaning question.

> **Drafting progress.** Rows already turned into bank entries are prefixed
> **DRAFTED → bank/NNNN.json** in the Note column. All land at `needs_review` with
> `verifiedOn`/`verifiedBy` null — drafting is Stage 1 only; source verification (Stage 2)
> and native review (Stage 3) still have to happen. A drafted row is not a finished row.
>
> Done so far: batch 1 = 0245–0249, batch 2 = 0250–0254, batch 3 = 0255–0259,
> batch 4 = 0260–0264 (**Top picks complete**), batch 5 = 0265–0269 (Freebies, trap-bearing),
> batch 6 = 0270–0275 (Freebies with content; closes Risk 5 as well). batch 7 = 0276–0281,
> batch 8 = 0282–0287. **All 23 freebies now drafted.** Second trap-hunt on the six
> marked 'no trap' found real content in five of them (gemination, existential particles,
> the mano/mani split, the dai ambiguity, ogni+plural); 0282 alone is genuinely trap-free
> and says so in its own notes.
>
> **Next: 36 Strong divergent imagery, then 6 remaining Risk rows.**

> **Standing policy — examples are never copied.** Sources establish that an expression
> exists and what it means, never the example sentence. See REVIEW_PROCESS.md, Stage 1.

---

## Formula — out of scope for v1, do not draft  (3)

Same type as 0070/0100/0110, retired for scope, not quality. Leave these until the
product takes on formula-type content again (e.g. a tear-off calendar) — see those three
entries' `retiredReason` for the exact condition.

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | ¡Que tengas un buen día! | Buona giornata! | ES reviewer (3rd-party PDF) | Structural-loss finding — Valuable for a different reason than the rest: it's interesting because it does NOT match structurally. Spanish marks the wish grammatically with a subjunctive verb (*tengas*); Italian drops the verb entirely and just states the noun. A wish losing its grammar across the crossing, not just its wording — but this needs more editorial thought before it's a normal bank entry. |
| 2 | ¡Que te vaya bien! | — | ES reviewer (3rd-party PDF) | Weak match — Same family as the retired-formula question (0070/0100/0110). No strong Italian candidate found. |
| 3 | ¡Dios quiera! | — | ES reviewer (3rd-party PDF) | Overlaps existing entry — Sits on the same wish-particle-pulls-subjunctive axis as banked 0031 (*Ojalá* / *Magari*). Probably not worth a separate entry — recommend a cross-reference note on 0031 instead of duplicating. |

## Risk — meaning mismatch or overlap, resolve before drafting  (12)

The 0009 failure pattern: a near-identical surface form hiding a different meaning, or a
pairing that collides with an entry already in the bank. Do not draft any of these without
a reviewer confirming the sense first, or checking the overlap resolves cleanly.

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Caerse de su burro | cadere dal pero? | ES idioms book | ⚑ VALENCE CHECK: ES = admit you were wrong; IT cadere dal pero = naive realisation. Not equivalent — do not pair without a reviewer |
| 2 | Dar en un hueso | trovare un osso duro | ES idioms book | ⚑ both BONES: ES hits one (a snag), IT finds a hard one (a tough opponent) — meanings differ, check before pairing |
| 3 | No es cosa del otro mundo | non è niente di che / non è cosa dell'altro mondo | ES idioms book | ⚑ IT has a near-calque 'roba dell'altro mondo' but meaning FLIPS (=outrageous, not unremarkable) — VALENCE CHECK, do not pair without reviewer |
| 4 | Avere le fette di salame sugli occhi | tener una venda en los ojos | Instagram set (Joe) | salami vs blindfold; note valence — IT is unwitting, 'hacer la vista gorda' is deliberate, do not conflate |
| 5 | Essere un pezzo di pane | ser un pedazo de pan | IT reviewer (own material) | **CLOSED BY bank/0275.json** — drafted as ser un pedazo de pan / essere un pezzo di pane, which was the tighter of the two competing pairings. Collides with L9 above (*buono come il pane* / *ser un pedazo de pan*) — and this is arguably the TIGHTER match: *pezzo* = *pedazo*, both literally "piece," where *buono come il pane* ("as good as bread") doesn't share that structure at all. Recommend swapping L9's Italian anchor to this phrase, rather than banking both against the same Spanish side while the multi-pairing policy is still deferred. Related thread: *pezzo* shows up three times across this queue with three different meanings — kind person here, "big shot" in *un pezzo grosso* (L29, already flagged there as a false-friend risk against *pez*), and shattered/exhausted in *essere a pezzi* (A011/0088) — worth a themed note eventually. |
| 6 | Cortar el bacalao | comandare / essere il capo | ES idioms book | ⚑ cutting the codfish = who rules; IT lacks the fish, check 'tenere il coltello dalla parte del manico' — pairs with banked 0015 sartén/manico! |
| 7 | Quien no se arriesga no pasa la mar | chi non risica non rosica | ES idioms book | ⚑ ALREADY BANKED as 0054 (different ES side). This is a SECOND Spanish proverb for the same Italian — alternatives-layer candidate for 0054 |
| 8 | Tener un tornillo flojo | avere una rotella fuori posto | ES idioms book | loose screw vs cog out of place — pairs with banked 0111 |
| 9 | Passare la notte in bianco | pasar la noche en blanco | europassitalian.com | exact twin incl. color; pairs with 0017 |
| 10 | Essere giù di corda | estar de capa caída (tentative) | IT reviewer (own material) | Weaker match — flagging rather than recommending. *Giù di corda* has a specific, narrow etymology (wind-up clocks with a counterweight on a cord; when the cord runs out, the clock stops — DELI/GRADIT confirm over the rival theory of a liturgical *sursum corda* pun). *Capa caída* carries broader baggage — health, fortune, general decline, not just mood — and overlaps with the *morale a terra* entry above. Tried *quedarse/estar sin cuerda* as a tighter clockwork-for-clockwork match; too thin in the wild, mostly toys and machines, not people. Needs either a better ES partner or acceptance that this is the looser of the two "feeling low" entries. |
| 11 | Mettere troppa carne al fuoco | poner toda la carne en el asador | europassitalian.com | ⚑ VALENCE FLIP, 0037-class: IT = overcommit (bad), ES = go all-in (good). Same barbecue, opposite verdict — bank soon |
| 12 | Cadere in piedi | caer de pie | IT reviewer (own material) | ⚑ SENSE DRIFT, check before drafting. Same cat-landing image both sides, but the emphasis may not match. The IT source glosses it as RECOVERING WELL from a difficult situation — an outcome you arrived at. Spanish dictionaries (Reverso: *tener buena fortuna en lo que se hace*; RAE-derived: *tener suerte*) frame it as LUCK — a disposition you have. "Siempre cae de pie" describes a lucky person, not someone who handled a crisis well. Possibly a real difference (earned recovery vs. innate luck), possibly just dictionary phrasing. Needs the ES reviewer to settle which before this is drafted — if the drift is real it's a good entry, if not it's a freebie. |

## Ready — Stage 1 drafting can start now  (113)

Confirmed on both sides, no known meaning risk, no overlap. Ordered from the strongest
individual finds down to the thematic groups.

### Top picks  (40)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Dar la cara | metterci la faccia (drafted, withdrawn) / cerca altro | Editor pullback | ⚑ ES side is SOLID: RAE, `cara`, two senses — "responder de los propios actos y afrontar sus consecuencias" and "adoptar una actitud comprometida y valiente, mientras otros se inhiben". Unrestricted/general, no dialect tag. IT side is the open question: *metterci la faccia* is Treccani-listed and shares the anatomy, but leans modern/public-facing (politics, business, staking your reputation) where the ES side is broader and older — the face-for-face match may be flattering the pairing. Look for an IT partner that carries the "answers for it while others hide" sense without the PR/media colouring. Candidates to test: *dare la faccia*, *assumersi le proprie responsabilità* (too plain?), *farsi avanti*, *non tirarsi indietro*. Keep ES side fixed; hunt the IT side. |
| 2 | Sbiancare | ponerse blanco / quedarse blanco | IT reviewer (own material) | RAE dictionary-grade: *blanco* sense 4 is explicitly defined as pale due to strong emotion, a fright, or a surprise. Clean, well-sourced pair. An academic phraseology paper (Landes) confirms the same white-from-shock mapping recurs across Spanish, French, Portuguese, and Italian independently — so this family is genuinely cross-linguistic, not a coincidence. |
| 3 | Quieras o no | ✅ **DRAFTED 0246** — Volente o nolente | ES reviewer (3rd-party PDF) | **DRAFTED → bank/0246.json** (needs_review; sources unverified). Confirmed pair — **Best find in the batch.** Dictionary-grade both sides (Treccani, Accademia della Crusca) — but NOT a subjunctive match at all: *nolente* is a fossilized Latin present participle (from *nolle*, "to not want") that survives in Italian only inside this one phrase. Spanish forces a live, everyday subjunctive; Italian preserves a grammatical fossil. Draft this one first. |
| 4 | Avere il morale a terra | tener la moral por los suelos | IT reviewer (own material) | Near-exact calque — both literally "morale on the ground." Colloquial confirmation ("con la moral por el piso") shows it's live, spoken register on both sides, not just dictionary. Thinnest trap of the batch; may need the reviewer to find one, or bank as a rare confidence-building pair like 0244. |
| 5 | Essere un osso duro | ✅ **DRAFTED 0249** — ser un hueso duro de roer | IT reviewer (own material) | **DRAFTED → bank/0249.json** (needs_review; sources unverified). Strong, dictionary-grade both sides (Enciclopedia Universal, Collins). NOTE — relates to L206 above: that row pairs a different Spanish phrase (*dar en un hueso*, to hit a snag) with a different Italian phrase (*trovare un osso duro*, to encounter a tough opponent), and was already flagged there as a meaning mismatch. This new pairing uses the BE-form on both sides (*essere*/*ser*, describing a person's or situation's character) rather than the encounter-form, and fits tighter. Recommend this as the primary *osso duro* entry; L206 either gets a different, encounter-specific Italian partner later, or is dropped. Trap: Spanish needs the "de roer" tail for the full idiomatic form — Italian stops bare at *duro*, no equivalent "difficult to gnaw" clause. |
| 6 | Essere al settimo cielo | ✅ **DRAFTED 0245** — estar en el séptimo cielo | IT reviewer (own material) | **DRAFTED → bank/0245.json** (needs_review; sources unverified). Exact calque, both traced to the same Ptolemaic/Dantean seven-heavens cosmology — Treccani's own magazine piece even cites the *Paradiso* as a likely source, meaning Italian may be the origin language here, not just a parallel borrower. TRAP FOUND: the preposition doesn't travel. Italian is fixed as *essere/salire AL settimo cielo* (a + il); Spanish is *estar EN el séptimo cielo*. Confirmed across multiple IT sources with no "nel" variant attested. Worth banking on the strength of that one preposition alone. |
| 7 | Vedere tutto nero | verlo todo negro | IT reviewer (own material) | Both mean pessimism, confirmed. Natural companion piece to *essere nero* above — same color, adjacent but distinct meaning (temperament vs. mood/outlook). Could bank as one entry with two senses noted, or two entries; recommend two, since the bank's one-expression-one-entry norm has held elsewhere. |
| 8 | Diventare rosso come un peperone | ponerse rojo como un tomate | IT reviewer (own material) | **DRAFTED → bank/0250.json** (needs_review; sources unverified). Same blush, different produce — confirmed common usage both sides. Good contrastive entry: the meaning, structure, and trigger are identical; only the vegetable changes. |
| 9 | Avere una fifa blu | ponerse amarillo (tentative, weak source) | IT reviewer (own material) | Italian side is Treccani-solid: intense fear turning the face bluish, French has an exact parallel (*avoir une peur bleue*), English's "blue funk" too. Spanish has no color idiom for fear at this level of dictionary quality — nearest is *ponerse amarillo*, attested in an academic fear-phraseology paper (Landes) rather than RAE, and RAE's own `blanco` entry lists *amarillo* only as a loose synonym for "coward," not as a dynamic "turned yellow with fear" idiom. Real cross-language color-of-fear pattern, but the Spanish half needs a native reviewer to confirm it's actually said this way, or needs a better source before it's bankable. |
| 10 | Vaciar el costal | vuotare il sacco | ES idioms book | ⚑ near-exact twin: both empty a SACK to confess — freebie, pairs with 0045 |
| 11 | Echar agua al mar | portare acqua al mare | ES idioms book | **DRAFTED → bank/0251.json** (needs_review; sources unverified). ⚑ near-exact twin: both throw/carry water TO the sea = pointless — freebie, pairs with the water cluster |
| 12 | Un viento de mil demonios | un vento del diavolo | ES idioms book | **DRAFTED → bank/0252.json** (needs_review; sources unverified). ⚑ both DEMONIC wind: ES a thousand demons, IT the devil's — freebie, strong |
| 13 | No poder ver a alguien ni en pintura | non poter vedere qualcuno nemmeno dipinto | ES idioms book | ⚑ near-EXACT twin incl. 'not even in a painting' — freebie, strong |
| 14 | Perder los estribos | perdere le staffe | ES idioms book | ⚑ near-EXACT twin: both LOSE THE STIRRUPS = lose temper — freebie, the cleanest cognate idiom yet |
| 15 | Fare una cosa al volo | ✅ **DRAFTED 0247** — hacer algo al vuelo | IT reviewer (own material) | **DRAFTED → bank/0247.json** (needs_review; sources unverified). Same words, same flying image, both dictionary-real — but the SCOPE narrows crossing into Spanish. RAE defines *al vuelo* almost entirely as catching an idea or explanation quickly (*captar/coger algo al vuelo*, "to be quick on the uptake") — a cognitive trap, not a general one. Italian's *al volo* is broader: doing any task rapidly, on the fly, no preparation. A Spanish speaker hearing *"lo faccio al volo"* about fixing a shelf would reach for *al vuelo* and produce something that reads as "I'll understand it quickly," not "I'll do it quickly." Same phrase, narrower target on one side — genuinely useful trap. |
| 16 | Sea como sea | Sia come sia | ES reviewer (3rd-party PDF) | **DRAFTED → bank/0253.json** (needs_review; sources unverified). Confirmed pair — Near-exact twin, same frame, both fixed and current. Slightly thinner sourcing trail than 1–4 (identified in an earlier session, not re-verified this pass) — worth a quick Treccani check before drafting. |
| 17 | Essere nero | estar negro | IT reviewer (own material) | Both mean furious/angry, confirmed dictionary-adjacent (Spanish source lists *estar negro* as anger, contrasted with *ponerse negro* as the process of becoming angry — an aspectual distinction Italian doesn't obviously mirror with *essere/diventare nero*, worth a reviewer check). |
| 18 | Essere in gamba | ser un hacha | IT reviewer (own material) | **DRAFTED → bank/0254.json** (needs_review; sources unverified). Dictionary-grade (Enciclopedia Universal, Diccionario de dichos y refranes), colloquial, means excelling at something. Narrower than the Italian, though: *ser un hacha* leans toward skill in a specific domain ("es un hacha en matemáticas"), while *essere in gamba* also covers general competence/maturity as a person, not tied to one activity ("è un ragazzo in gamba"). A WordReference thread flags *ser un hacha* as traditional/slightly dated next to newer slang (*una pasada*, etc.) — worth a register check with the reviewer. *Ser un crack* or *estar espabilado* may be closer for the general-competence sense; flagging both as alternates. |
| 19 | Non stare più nella pelle | ✅ **DRAFTED 0248** — no caber en sí (de gozo/contento/alegría) | IT reviewer (own material) | **DRAFTED → bank/0248.json** (needs_review; sources unverified). Not a calque — and this is the most valuable find of the batch. The word-for-word guess, *no caber en el pellejo*, is real Spanish, but Collins and multiple dictionaries give it as **being overweight**, not excitement — "esta camisa no te queda bien, no cabes en el pellejo." An Italian learner translating literally lands on the wrong idiom entirely. The actual Spanish equivalent drops the skin image altogether: *no caber en sí*, reflexive, no noun. |
| 20 | Avere la puzza sotto il naso | creerse la última coca-cola del desierto | IT reviewer (own material) | **DRAFTED → bank/0255.json** (needs_review; sources unverified). Real, colorful, well-documented (Reverso, multiple Spanish-language sources), Latin-American-leaning register. Not a perfect semantic match: the Spanish phrase centers on vanity/self-importance, while the Italian's bad-smell imagery is specifically about looking down on others — related but not identical axes. *Tener humos* is a structurally closer alternate (verb + plural noun, same shape as *avere la puzza*) if the reviewer prefers matching grammar over matching color. |
| 21 | Como sea | Comunque sia | ES reviewer (3rd-party PDF) | **DRAFTED → bank/0256.json** (needs_review; sources unverified). Confirmed pair — De Mauro-cited, dictionary-grade, exact sense match ("in any case," takes subjunctive). Clean, low-risk draft. |
| 22 | A donde quiera que vayas | Ovunque tu vada | ES reviewer (3rd-party PDF) | **DRAFTED → bank/0257.json** (needs_review; sources unverified). Confirmed pair — Confirmed across multiple grammar sources, textbook-standard construction on both sides. Clean, low-risk draft. |
| 23 | Al buen entendedor, pocas palabras | a buon intenditor poche parole | ES proverb list (Joe) | near-exact cognate twin (entendedor/intenditor) — freebie |
| 24 | Dime con quién andas y te diré quién eres | dimmi con chi vai e ti dirò chi sei | ES proverb list (Joe) | exact twin — freebie, worth labelling as such |
| 25 | Finché c'è vita, c'è speranza | mientras hay vida, hay esperanza | IT proverb list (Joe) | exact twin — freebie |
| 26 | Non rimandare a domani… | no dejes para mañana lo que puedas hacer hoy | IT proverb list (Joe) | exact twin — freebie |
| 27 | Chi trova un amico, trova un tesoro | quien encuentra un amigo, encuentra un tesoro | IT proverb list (Joe) | exact twin — freebie |
| 28 | L'appetito vien mangiando | el apetito viene comiendo | IT proverb list (Joe) | exact twin — freebie |
| 29 | L'amore è cieco | el amor es ciego | IT proverb list (Joe) | exact twin — freebie |
| 30 | Che peccato | qué pena / qué lástima | Italian Matters list | **DRAFTED → bank/0258.json** (needs_review; sources unverified). near-twin; MX pena also = embarrassment, false-friend adjacent |
| 31 | Può darsi | puede ser | Italian Matters list | **DRAFTED → bank/0259.json** (needs_review; sources unverified). twin — freebie |
| 32 | Sul serio | ¿en serio? | Italian Matters list | **DRAFTED → bank/0260.json** (needs_review; sources unverified). twin — freebie |
| 33 | Hai ragione | tienes razón | Italian Matters list | twin (avere/tener ragione — reason you HAVE) — freebie |
| 34 | A dire il vero | a decir verdad | Italian Matters list | near-twin — freebie |
| 35 | Acostarse con las gallinas | andare a letto con le galline | ES idioms book | exact twin incl. the hens — freebie |
| 36 | No oír ni el vuelo de una mosca | non sentire volare una mosca | ES idioms book | **DRAFTED → bank/0261.json** (needs_review; sources unverified). exact twin incl. the fly — freebie |
| 37 | Sacar las castañas del fuego | togliere le castagne dal fuoco | ES idioms book | **DRAFTED → bank/0262.json** (needs_review; sources unverified). near-exact twin incl. chestnuts — freebie |
| 38 | Essere di corsa | ir volando | IT reviewer (own material) | **DRAFTED → bank/0263.json** (needs_review; sources unverified). Dictionary-grade both sides: RAE/Vox's *volando* sense 4 defines it exactly as walking or going somewhere with speed ("me voy volando al trabajo"), sense 7 extends it to doing a task quickly ("vuela a comprar el periódico"). Neat mismatch of imagery: Italian pictures a run, Spanish a flight — both physical-motion metaphors for haste, different verb. |
| 39 | Prendere una boccata d'aria | tomar una bocanada de aire (fresco) | IT reviewer (own material) | **DRAFTED → bank/0264.json** (needs_review; sources unverified). Strong near-twin: *boccata*/*bocanada* both descend from "mouth" imagery (bocca/boca), both meaning a puff or mouthful. Real, common, well-documented on the Spanish side; clean, low-risk draft. |
| 40 | Fare due passi | dar una vuelta / dar un paseo | IT reviewer (own material) | Meaning confirmed (both mean going for a short, casual walk), but not re-verified against a dictionary this session — treat as solid but do a quick RAE/Treccani check before drafting. Note: distinct from banked 0116 (*essere a due passi* / *estar a dos pasos*, meaning close by in distance) — same "due passi" words, different idiom, no collision. |

### Freebies — exact or near-exact twins  (23)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Hablar con el corazón en la mano | parlare col cuore in mano | ES idioms book | **DRAFTED → bank/0276.json** (needs_review; sources unverified). near-twin, but IT 'cuore in mano' leans generous/open-handed vs ES frank/sincere — nuance check |
| 2 | El tiempo lo cura todo | il tempo guarisce tutte le ferite | ES proverb list (Joe) | **DRAFTED → bank/0277.json** (needs_review; sources unverified). near twin; IT names the wounds |
| 3 | Encomendar las ovejas al lobo | dare le pecore in custodia al lupo | ES idioms book | **DRAFTED → bank/0278.json** (needs_review; sources unverified). near twin; EN swaps to fox/henhouse — the odd one out is English again |
| 4 | Andar pisando huevos | camminare sulle uova | ES idioms book | **DRAFTED → bank/0273.json** (needs_review; sources unverified). CHECK BEFORE BANKING — possible sense divergence, not a calque. Spanish centres on SLOWNESS (moving maddeningly slowly); Italian 'camminare sulle uova' centres on CAUTION (treading delicately). Same eggs, different lesson. If that holds, this belongs in Risk, not Freebies. |
| 5 | Buono come il pane | ser un pedazo de pan | FluentU 40 | **DRAFTED → bank/0275 (collision resolved — folded in as the IT simile variant).json** (needs_review; sources unverified). TRAP — structural, plus an unresolved collision. Italian is a SIMILE (good AS bread); Spanish a METAPHOR (a PIECE of bread) — different figure under identical vocabulary. Also flagged in REGISTRY.md: 'ser un pedazo de pan' maps to two Italians, this and 'essere un pezzo di pane' (Risk 5). Resolve the collision, then BANK. |
| 6 | Affogare in un bicchier d'acqua | ahogarse en un vaso de agua | FluentU 40 | **DRAFTED → bank/0267.json** (needs_review; sources unverified). TRAP FOUND — grammatical, and it bites. Spanish is reflexive (ahogarSE), Italian is not (affogare, bare) — a Spanish speaker produces 'affogarsi in un bicchier d'acqua'. Second trap: Italian apocopates inside the fixed phrase, bicchier d'acqua not bicchiere d'acqua. Two real errors in one short idiom. BANK. |
| 7 | Rompere il ghiaccio | romper el hielo | FluentU 40 | **DRAFTED → bank/0282.json** (needs_review; sources unverified). NO TRAP FOUND. Identical image and structure; no preposition, article, reflexive or register divergence. Honest verdict: teaches nothing beyond 'it is the same'. Bank only as a deliberate confidence-builder (cf. 0244), and cap how many of those ship. |
| 8 | Matar la gallina de los huevos de oro | uccidere la gallina dalle uova d'oro | spanishexpress.co.uk (Peninsular) | **DRAFTED → bank/0268.json** (needs_review; sources unverified). TRAP FOUND — preposition plus irregular plural. Spanish DE los huevos, Italian DALLE uova; and 'uovo' is one of Italian's masculine-singular/feminine-plural irregulars, so 'dalle uova' surprises twice. Both languages say HEN where English says goose — English is the outlier. BANK. |
| 9 | Cercare un ago nel pagliaio | buscar una aguja en un pajar | europassitalian.com | **DRAFTED → bank/0270.json** (needs_review; sources unverified). TRAP — article. Italian takes the definite (NEL pagliaio); Spanish the indefinite (EN UN pajar). Minor, real, teachable. BANK. |
| 10 | Essere due gocce d'acqua | ser como dos gotas de agua | europassitalian.com | **PULLED — COLLIDES WITH BANKED 0101, AND THE AUDIT VERDICT HERE WAS WRONG.** 0101 already pairs 'Parecerse como dos gotas de agua' with 'Somigliarsi COME due gocce d'acqua' — with the come. So the trap claimed in the earlier audit pass (that Italian drops the simile marker) is contradicted by the bank's own entry: Italian has both the bare form and the come form. Do not draft. If anything survives here it is a note on 0101 about the two Italian variants, not a new entry. Recorded rather than deleted so the mistaken verdict is not repeated. |
| 11 | Non c'è due senza tre | no hay dos sin tres | europassitalian.com | **DRAFTED → bank/0283.json** (needs_review; sources unverified). NO TRAP FOUND. Structurally identical. Confidence-builder or skip. |
| 12 | Piove sul bagnato | llueve sobre mojado | storylearning.com | **DRAFTED → bank/0271.json** (needs_review; sources unverified). CHECK BEFORE BANKING — possible valence split. Italian may run BOTH ways (fortune compounding OR misfortune piling on); Spanish 'llueve sobre mojado' is generally negative only. If so this is a valence entry (0037-class), not a freebie. |
| 13 | Matto da legare | loco de atar | storylearning.com | **DRAFTED → bank/0269.json** (needs_review; sources unverified). TRAP — preposition. Italian DA legare, Spanish DE atar. Small, but exactly the one-letter slip that marks a speaker as foreign. BANK. |
| 14 | Cavallo di battaglia | caballo de batalla | storylearning.com | **DRAFTED → bank/0272.json** (needs_review; sources unverified). CHECK BEFORE BANKING — asymmetric polysemy. Both mean a signature piece or mainstay, but Spanish ALSO means the main point of contention in a dispute, a sense Italian does not appear to share. Safe one direction, misleading the other. |
| 15 | Dai tempo al tempo | dar tiempo al tiempo | storylearning.com | **DRAFTED → bank/0284.json** (needs_review; sources unverified). NO TRAP FOUND. Word-for-word identical. Confidence-builder or skip. |
| 16 | Ogni due per tre | cada dos por tres | storylearning.com | **DRAFTED → bank/0285.json** (needs_review; sources unverified). NO TRAP FOUND in form. Only hook is the origin claim — trivia, not a learning point. Confidence-builder or skip. |
| 17 | Farfalle nello stomaco | mariposas en el estómago | storylearning.com | **DRAFTED → bank/0281.json** (needs_review; sources unverified). NO FORM TRAP, but a PROVENANCE note worth making explicit: both sides are recent calques FROM ENGLISH, not parallel native developments. Say that in the bridge rather than implying an ancient shared image. Bank on that basis, or skip. |
| 18 | Lacrime di coccodrillo | lágrimas de cocodrilo | storylearning.com | **DRAFTED → bank/0286.json** (needs_review; sources unverified). NO TRAP FOUND. Shared classical ancestor, parallel structure. Confidence-builder or skip. |
| 19 | Mettere il dito nella piaga | meter el dedo en la llaga | IT reviewer (own material) | **DRAFTED → bank/0274.json** (needs_review; sources unverified). NO FORM TRAP, but the strongest CONTENT hook in the set: both descend from the same Doubting Thomas episode (John 20). Teaches shared ancestry rather than a learner error — legitimate, but a different KIND of entry from a trap entry. |
| 20 | Avere le mani legate | tener las manos atadas | IT reviewer (own material) | **DRAFTED → bank/0287.json** (needs_review; sources unverified). NO TRAP FOUND. avere/tener, legate/atadas — parallel throughout. Confidence-builder or skip. |
| 21 | Vedere il bicchiere mezzo vuoto / mezzo pieno | ver el vaso medio vacío / medio lleno | IT reviewer (own material) | **DRAFTED → bank/0265 + 0266 (split into optimist/pessimist).json** (needs_review; sources unverified). TRAP FOUND, a false friend hiding inside a calque. Spanish 'vaso' = drinking glass; Italian 'vaso' = VASE. A Spanish speaker saying 'il vaso mezzo pieno' has described a half-full flower vase; Italian needs 'bicchiere'. Strongest trap in the freebie set, and it was filed as a no-trap twin. BANK (as two entries, pessimist/optimist). |
| 22 | Vedere la luce in fondo al tunnel | ver la luz al final del túnel | IT reviewer (own material) | **DRAFTED → bank/0279.json** (needs_review; sources unverified). Exact twin; well-attested in Spanish (Collins sentence bank, expresiones.info with press citations). Both carry the same secondary near-death-experience reading, noted in ES sources — a shared ambiguity, not a divergence. Modern/journalistic register on both sides rather than folk-proverbial; worth a register note when drafted. |
| 23 | Idem | ídem | italianario (IG, tier C) | **DRAFTED → bank/0280.json** (needs_review; sources unverified). Same Latin word, alive in both languages, both meaning 'likewise/same here' as a conversational reply. Genuine cognate freebie — but check two things: (a) Spanish writes the accent, *ídem*, Italian does not; (b) register may not match — in Spanish *ídem* can read slightly bookish or jokey where Italian *idem* is ordinary casual speech. If (b) holds, this is a register_differs entry rather than a pure freebie. Source card framed it as the 'native' upgrade over *anche io*, which supports the Italian side being genuinely colloquial. |

### Strong divergent imagery — the product's core material  (36)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Lo barato sale caro | chi più spende meno spende | ES proverb list (Joe) | ⚑ inverted framing: ES cheap turns expensive, IT spending more spends less |
| 2 | La pazienza è la virtù dei forti | la paciencia es la madre de la ciencia | IT proverb list (Joe) | ⚑ IT credits the STRONG, ES credits KNOWLEDGE — and the ES rhymes |
| 3 | Far venire il latte alle ginocchia | MX sacar de quicio / dar lata | IT proverb list (Joe) | ⚑ milk to the knees — no ES image comes close |
| 4 | Essere come il prezzemolo | estar hasta en la sopa | IT proverb list (Joe) | ⚑ parsley vs being IN THE SOUP — both culinary ubiquity, strong |
| 5 | Avere un diavolo per capello | echar chispas / estar hecho una furia | Instagram set (Joe) | ⚑ a devil per HAIR vs throwing SPARKS — density vs emission |
| 6 | Darle perro a uno | dare buca a qualcuno | ES idioms book | ⚑ standing someone up: ES gives a DOG, IT gives a HOLE — strong |
| 7 | Darle a uno una buena lejía | fare una lavata di capo | ES idioms book | ⚑ BOTH WASH: ES bleach, IT a head-washing — strong |
| 8 | Cortar los lazos | tagliare i ponti | ES idioms book | ⚑ ES cuts TIES, IT burns/cuts BRIDGES — and our product is named for a bridge. Strong, slightly on the nose |
| 9 | Descubrir el polvorín | scoprire gli altarini | ES idioms book | ⚑ ES uncovers the POWDER MAGAZINE (explosive), IT the little ALTARS (shameful private shrines) — excellent |
| 10 | Tener ángel | avere un certo non so che | ES idioms book | ⚑ ES 'have an angel'=charm, IT 'a certain I-don't-know-what' — charm named vs unnameable, lovely |
| 11 | Decirle a alguien cuatro verdades | dirne quattro a qualcuno | ES idioms book | ⚑ both use FOUR: ES four truths, IT just 'say four' — number-idiom twin |
| 12 | No saber ni papa de | non capire un'acca | ES idioms book | ⚑ ES not a POTATO, IT not an H (silent letter) — both 'know nothing', great imagery |
| 13 | Essere verde d'invidia | estar/ponerse verde de envidia | IT reviewer (own material) | Exact calque, same color, same preposition (de/di). No trap in the phrase itself. Caution rather than trap: *verde* does NOT behave the same everywhere in either language — it already means "broke" in Italian's *essere al verde* (L62 above), which has no color relation to Spanish's red-for-broke. A learner who assumes *verde* is a safe, portable color across both languages' whole idiom families will get burned elsewhere, just not here. |
| 14 | In realtà | en realidad | Italian Matters list | twin, but IT 'in realtà' contradicts more strongly — check |
| 15 | Más feo que el pecado | brutto come la fame / il peccato | ES idioms book | ⚑ ugly as SIN both?? or IT ugly as HUNGER — check which |
| 16 | Meno male che | menos mal que | Italian Matters list | the che/que clause extension of banked 0033 |
| 17 | Infatti | de hecho / efectivamente | Italian Matters list | infatti confirms, de hecho can pivot — subtle, good B2 |
| 18 | Largar a otro el mochuelo | scaricare il barile | ES idioms book | owl vs barrel — both hand off an unwanted thing |
| 19 | Sacudir la mosca | sganciare (la grana) | ES idioms book | fly-shaking vs unhooking cash |
| 20 | Pagar el pato | pagare per tutti / fare da capro espiatorio | ES idioms book | duck vs scapegoat |
| 21 | Ponerse las botas | fare soldi a palate | ES idioms book | boots vs shovelfuls |
| 22 | Estar de veinticinco alfileres | essere in ghingheri | ES idioms book | 25 pins vs ghingheri — both opaque, good B2/C1 |
| 23 | Bailar en la cuerda floja | camminare sul filo del rasoio | ES idioms book | slack rope vs razor's edge |
| 24 | Tascar el freno | scalpitare | ES idioms book | champ the bit vs paw the ground |
| 25 | Ponerse de jarras | mettersi con le mani sui fianchi | ES idioms book | ES pitchers, IT plain description |
| 26 | Hacerse un lío | fare un pasticcio | ES idioms book | mess-making; IT pasticcio is a pie — food again |
| 27 | Quedar a la altura de su zapatilla | fare una figuraccia | ES idioms book | ES measures failure in slipper-height, IT just "make a bad figure" — figura/figuraccia is a whole entry of its own |
| 28 | La pelota está aún en el tejado | la partita è ancora aperta | ES idioms book | ES ball still on the roof, IT match still open — sport both sides |
| 29 | Tragarle a uno la tierra | sparire nel nulla / ingoiato dalla terra | ES idioms book | earth swallows you = vanish |
| 30 | Fumarse una clase | marinare la scuola / bigiare | ES idioms book | skip class; ES 'smoke' the class |
| 31 | Destornillarse de risa | sbellicarsi dalle risa | ES idioms book | ES unscrew, IT un-belly-button oneself laughing — both bodily-comic |
| 32 | Avere le mani di pasta frolla | ser un manazas (ES) / MX ? | IT proverb list (Joe) | pastry hands vs big-hands; needs MX form |
| 33 | Llevarse el gato al agua | spuntarla / avere la meglio | ES idioms book | cat-to-water vs plain victory verbs; IT may have no animal |
| 34 | Haberle visto las orejas al lobo | scamparla bella | ES idioms book | third wolf idiom; IT has no wolf here |
| 36 | Essere stanco morto | estar muerto de cansancio | italianario (IG, tier C) | Both languages reach for DEATH to mean exhaustion, and the grammar of the reach differs. Italian juxtaposes two adjectives with no link at all — *stanco morto*, tired-dead — a construction Wikizionario and Dizionario Italiano both record as fixed. Spanish needs the scaffolding: *muerto DE cansancio*, dead FROM tiredness, with the cause spelled out. Same metaphor, one language compresses it and the other explains it. POSSIBLY RESOLVES AN UNMATCHED ROW: *estar hecho polvo* has been sitting in the Unmatched tier since 0009 was dissolved; check whether it or *muerto de cansancio* is the better ES side here before drafting — if it's *hecho polvo*, that row leaves Unmatched. SATURATION CHECK: banked 0049 (*morire di fame* / *morirse de hambre*) already uses death-hyperbole; confirm this is a distinct enough entry, not the same lesson twice. |
| 35 | Avere una fame da lupi | tener un hambre canina / de lobo | ines.tutoring (IG, tier C) | Dictionary-grade ES side (Collins lists *tener un hambre canina o de lobo* together, glossed 'to be ravenous'). The bridge is a NUMBER and an ANIMAL CHOICE: Italian is fixed plural — *da lupi*, a pack of wolves, hunger as something a group has — while Spanish is singular and offers two animals, *de lobo* (wolf) or *canina* (dog). A learner who says *fame da lupo* has picked the wrong number; one who says *hambre de lobos* has picked the wrong one too, in the other direction. Also worth checking with the ES reviewer whether MX prefers *canina*, *de lobo*, or reaches for *me comería un caballo* instead. FOURTH wolf idiom in the queue (cf. rows 34, *in bocca al lupo* at banked 0039) — the wolf cluster is now large enough to be worth an editorial note of its own. |

### Subjunctive frame — where the pattern breaks  (4)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Cueste lo que cueste | Costi quel che costi | ES reviewer (3rd-party PDF) | Confirmed pair — Treccani-cited, same reduplicative frame as the Spanish. Possible bonus hook: a popular (likely folk) attribution ties its recent surge in currency to a Mario Draghi speech translating "whatever it takes" — worth checking before including in the bridge note. |
| 2 | Hagas lo que hagas | Qualunque cosa tu faccia | ES reviewer (3rd-party PDF) | Confirmed, divergent frame — Confirmed via grammar-teaching source. Real trap: the frame BREAKS here — *"faccia quel che faccia"* is not idiomatic Italian. Teaches that the Spanish reduplicative habit doesn't transfer past a certain point. |
| 3 | Pase lo que pase | Qualunque cosa succeda | ES reviewer (3rd-party PDF) | Confirmed, divergent frame — Reduplicative frame fully abandoned on the Italian side. Well-established from an earlier session's research. |
| 4 | Aunque sea *(meaning "at least")* | Almeno | ES reviewer (3rd-party PDF) | Confirmed, divergent frame — Complete divergence — no subjunctive on the Italian side at all. A Spanish speaker reaching for a subjunctive here produces nothing an Italian would say. Well-established. |

### Proverb twins with a small axis of difference  (5)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Ojos que no ven, corazón que no siente | occhio non vede, cuore non duole | ES proverb list (Joe) | twin; ES heart doesn't FEEL, IT heart doesn't HURT |
| 2 | El que mucho abarca poco aprieta | chi troppo vuole nulla stringe | ES proverb list (Joe) | ES embraces too much, IT WANTS too much — verb axis differs |
| 3 | Más vale prevenir que lamentar | prevenire è meglio che curare | ES proverb list (Joe) | ES contrasts prevent/REGRET (emotional), IT prevent/CURE (medical) |
| 4 | Chi fa da sé, fa per tre | (no rhyming ES twin) | IT proverb list (Joe) | IT rhymes sé/tre and quantifies by three |
| 5 | Chi non fa, non falla | el que no hace, no yerra | IT proverb list (Joe) | IT rhymes fa/falla |

### The santo cluster — Spanish Catholic imagery  (5)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Hacer su santa voluntad | fare il proprio comodo | ES idioms book | do as one pleases; santa intensifier |
| 2 | Aquello fue llegar y besar el santo | è stato un gioco da ragazzi | ES idioms book | easy as pie; saint-kissing vs child's play |
| 3 | Tener el santo de espaldas | avere la sfortuna alle calcagna | ES idioms book | saint's back turned = unlucky; the santo cluster is very ES-Catholic |
| 4 | Todos los santos tienen novena | verrà anche il tuo momento | ES idioms book | your time will come |
| 5 | Alzarse con el santo y la limosna | fare man bassa / prendere cassa e baracca | ES idioms book | clear off with everything; saint imagery is ES-only |

## Needs research — still Stage 0  (77)

Real candidates, but sourcing is thin, one side is a guess, or there's an open editorial
question. Worth pursuing, not yet worth drafting.

### Discourse markers and high-frequency function words  (7)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Ci penso io | yo me encargo | Italian Matters list | delegation formulas |
| 2 | Allora | entonces / pues | Italian Matters list | workhorse discourse openers — deserves care, high frequency |
| 3 | Insomma | en fin / total | Italian Matters list | summing-up markers; insomma also = 'so-so' when alone |
| 4 | Pazzesco | qué locura (MX) / increíble | Italian Matters list | amazement adjectives |
| 5 | Non ci credo | no lo puedo creer / no inventes (MX) | Italian Matters list | disbelief; the ci is a micro-lesson |
| 6 | Dunque | pues bien / así que | Italian Matters list | formal-leaning; C1 shelf candidate |
| 7 | Comunque | de todos modos / igual (AR) | Italian Matters list | concessive workhorses |

### Register and editorial calls  (6)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Rompere le scatole | dar lata (MX) / romper las pelotas (vulgar) | Instagram set (Joe) | ⚑ BOTH languages use a mild euphemism standing in for a vulgar original — a register entry about euphemism itself |
| 2 | Quedarse para vestir santos | rimanere zitella | ES idioms book | ⚑ REGISTER/DATED: 'remain a spinster'. Both dated & arguably sexist — editorial call before banking |
| 3 | Ma dai | ¡no manches! (MX) / ¡anda ya! | Italian Matters list | disbelief; no manches register care (softened no mames) |
| 4 | Cornuto | cornudo | FluentU 40 | exact twin incl. gesture; register care |
| 5 | Sono nei casini | estar en un lío / MX estar en un pedo | italianario (IG, tier C) | REGISTER FLAG, not a linguistic problem. *Casini* is the plural of *casino*, whose original sense is brothel — the word has drifted to mean 'mess/chaos' and is very common in speech, but it is not neutral and would be out of place in an exam or a formal register. The MX candidate *estar en un pedo* has exactly the same problem in the other language (literally 'fart', broadly vulgar). Either bank as a deliberately colloquial pair with the register marked honestly on both sides, or pick tamer partners (*sono nei guai* / *estar en un lío*). Decide before drafting; do not let the vulgarity travel unlabelled. |
| 6 | Sono preso bene | estar de buenas | italianario (IG, tier C) | ES side found and it is solid: *estar de buenas* is in the DLE, colloquial, and attested across MX, CO, VE and Spain — not regionally narrow. The real find is that BOTH sides come as a matched pair with a built-in opposite: Italian *preso bene* / *preso male*, Spanish *de buenas* / *de malas*. Two languages independently building mood as a binary switch rather than a scale. That symmetry is the bridge. REMAINING ASYMMETRY, and it is the thing to check: *estar de buenas* is dictionary-established and stable; *preso bene* is recent Italian youth slang with no dictionary-grade source. Ask the Italian reviewer whether it is durable enough to bank, since entries are meant to stay usable. If it is not, *essere di buon umore* is the safe partner and this becomes a plain pair with no lesson in it. |

### Acknowledged weak pairings  (3)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Essere alla mano | ser campechano/a | IT reviewer (own material) | Weakest match of this batch — flagging rather than recommending. *Campechano* is real and well-attested for "approachable, down-to-earth, no airs," but it's a single adjective with no image, where *essere alla mano* is a fixed prepositional phrase ("to be at hand" → always accessible). Different word class, similar meaning. Worth asking the Spanish reviewer whether a closer multi-word equivalent exists before banking this as the anchor. |
| 2 | El amor todo lo puede | l'amore vince tutto | ES proverb list (Joe) | both descend from Virgil's omnia vincit amor — thin bridge, low priority |
| 3 | Ride bene chi ride ultimo | el que ríe último, ríe mejor | IT proverb list (Joe) | IT laughs WELL, ES laughs BEST — tiny axis |

### General — thin sourcing or unconfirmed Italian/Spanish side  (61)

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Pane al pane e vino al vino | al pan, pan y al vino, vino | FluentU 40 | word-order mirror! strong |
| 2 | Ti sta a pennello | te queda pintado / como anillo al dedo | FluentU 40 | 'pintado' shares the paint! strong |
| 3 | Un pezzo grosso | un pez gordo | FluentU 40 | pezzo/pez false-ish friend! strong |
| 4 | La curiosidad mató al gato | tanto va la gatta al lardo che ci lascia lo zampino | spanishexpress.co.uk (Peninsular) | both cats, both cautionary, DIFFERENT morals: curiosity vs pressing your luck — strong |
| 5 | Buio pesto | oscuro como boca de lobo | storylearning.com | ⚑ the Spanish darkness is a WOLF'S MOUTH — cross-references 0039's in bocca al lupo; two wolf-mouths, opposite omens |
| 6 | Vabbè | bueno / pues nada | Italian Matters list | resignation markers; MX 'ni modo' is the richer pairing — check |
| 7 | ¡A otro perro con ese hueso! | a un altro cane con quest'osso? / racconta ad altri | ES idioms book | check IT fixedness |
| 8 | Quemarse las pestañas | studiare sodo / bruciarsi le ciglia? | ES idioms book | burn eyelashes = burn midnight oil; check IT fixedness |
| 9 | Digan lo que digan | Dicano quel che dicano / dicano ciò che dicano | ES reviewer (3rd-party PDF) | Confirmed, weaker sourcing — Attested in the wild (bab.la corpus: "che dicano ciò che dicano non guasta") rather than a dictionary headword. Real, not just a calque guess, but needs the reviewer to confirm *quel che* vs. *ciò che* is the more natural choice. |
| 10 | Venga lo que venga | venga quel che venga *(tentative)* | ES reviewer (3rd-party PDF) | Unconfirmed — Same family as the confirmed reduplicative set, plausible given how productive the pattern is — but no direct attestation found this session. Needs a real source before drafting. |
| 11 | Estar entre dos aguas | essere in mezzo al guado / non sapere che pesce prendere | ES idioms book | between two waters = undecided; check overlap with banked 0073 |
| 12 | L'erba del vicino è sempre più verde | la hierba del vecino... / el pasto | FluentU 40 | twin proverb |
| 13 | A mali estremi, estremi rimedi | a grandes males, grandes remedios | FluentU 40 | twin, quantifier differs |
| 14 | Minestra riscaldata | recalentado (MX!) | FluentU 40 | MX 'recalentado' also = day-after party food — rich |
| 15 | Sale in zucca | dos dedos de frente | FluentU 40 | different imagery |
| 16 | Morto un papa se ne fa un altro | a rey muerto, rey puesto | FluentU 40 | pope vs KING — pairs with 0041! |
| 17 | Togliti dai piedi | quítate de en medio | FluentU 40 | prep contrast |
| 18 | Alla come viene, viene | al ahí se va (MX) | FluentU 40 | MX gold — 'al ahí se va' culture |
| 19 | Attaccare il cappello | colgar los guantes/hábitos | FluentU 40 | which garment hangs? |
| 20 | Farsene un baffo | me importa un pepino/bledo | FluentU 40 | mustache vs cucumber |
| 21 | Tale madre tale figlia | de tal palo, tal astilla | FluentU 40 | stick/splinter vs parent/child |
| 22 | Calare le brache | bajarse los pantalones | FluentU 40 | exact anatomical twin |
| 23 | Cervello di gallina | cerebro de chorlito / memoria de pollo? | FluentU 40 | bird differs |
| 24 | Avere le braccine corte | ser codo (MX!) / más agarrado que... | FluentU 40 | MX 'codo' is gold |
| 25 | Raro come una mosca bianca | más raro que un perro verde | FluentU 40 | white fly vs green dog |
| 26 | Che palle | qué hueva (MX) / qué palo (ES) | FluentU 40 | vulgar-ish; register entry |
| 27 | Estar de mala leche | avere la luna storta | spanishexpress.co.uk (Peninsular) | bad milk vs crooked moon; ES side mildly coarse — register care |
| 28 | No ver tres en un burro | essere cieco come una talpa | spanishexpress.co.uk (Peninsular) | donkey vs mole; eyesight humor |
| 29 | Chi dorme non piglia pesci | camarón que se duerme se lo lleva la corriente | europassitalian.com | MX GOLD: sleeping shrimp swept by the current vs sleeping fisherman catching nothing — bank soon |
| 30 | Prendere fischi per fiaschi | confundir la gimnasia con la magnesia | europassitalian.com | both encode mishearing AS a near-rhyme — form mirrors meaning |
| 31 | Passare dalla padella alla brace | salir de Guatemala y entrar en Guatepeor | europassitalian.com | MX pun pairing; also plain 'de mal en peor' |
| 32 | Sudare sette camicie | sudar la gota gorda | europassitalian.com | seven shirts vs the fat drop |
| 33 | Conoscere come le proprie tasche | conocer como la palma de la mano | europassitalian.com | pockets vs palm |
| 34 | Alzarsi col piede sbagliato | levantarse con el pie izquierdo | europassitalian.com | wrong foot vs LEFT foot — superstition delta |
| 35 | Avere fegato | tener agallas | europassitalian.com | organ swap: liver vs gills |
| 36 | Essere al verde | estar en números rojos / sin un peso | europassitalian.com | broke in green vs red |
| 37 | In quattro e quattr'otto | en un dos por tres | europassitalian.com | arithmetic speed idioms, different sums |
| 38 | Piantare in asso | dejar plantado | europassitalian.com | both plant somebody! shared verb, cards vs pot |
| 39 | Capitare a fagiolo | venir como anillo al dedo | europassitalian.com | bean vs ring |
| 40 | Acqua in bocca | punto en boca | europassitalian.com | water vs stitch, same mouth |
| 41 | Fare i conti senza l'oste | hacer las cuentas de la lechera | europassitalian.com | innkeeper vs milkmaid — different folk-math fable |
| 42 | Mettere i bastoni fra le ruote | poner palos en las ruedas | europassitalian.com | near twin |
| 43 | Meglio tardi che mai | más vale tarde que nunca | europassitalian.com | twin proverb, different frame verb |
| 44 | Prendere lucciole per lanterne | dar gato por liebre | storylearning.com | deception pairs: fireflies-for-lanterns vs cat-for-hare — seller vs victim framing differs |
| 45 | Avere il cuore in gola | con el corazón en la boca | storylearning.com | organ same, location differs: throat vs mouth |
| 46 | Leccarsi i baffi | chuparse los dedos | storylearning.com | mustache vs fingers — same delicious verdict |
| 47 | Fare a polpette | hacer picadillo | storylearning.com | culinary violence twin: meatballs vs mincemeat |
| 48 | Stare sulle spine | estar en ascuas | storylearning.com | thorns vs embers — both torture the waiter |
| 49 | Sei un coniglio | ser gallina | storylearning.com | coward zoology: rabbit vs hen (and English chicken) |
| 50 | Vai a farti benedire | vete a freír espárragos | storylearning.com | dismissal registers: get blessed vs go fry asparagus — sacred vs kitchen |
| 51 | Mettere lo zampino | meter la cuchara (MX) | storylearning.com | meddling: paw vs spoon — MX-flavored |
| 52 | Buon viso a cattivo gioco | al mal tiempo, buena cara | storylearning.com | grin-and-bear: bad GAME vs bad WEATHER, same good face |
| 53 | Stare sullo stomaco | caerle gordo a alguien (MX) | storylearning.com | dislike idioms; MX caer gordo is gold, grammar differs (dative) |
| 54 | Avere una cotta | estar clavado (MX) / estar flechado | storylearning.com | crush idioms: cooked vs nailed vs arrow-struck |
| 55 | Due pesi e due misure | doble rasero / dos varas de medir | storylearning.com | double standards: two weights vs one measuring stick |
| 56 | Ci sta | va / queda bien | Italian Matters list | trendy IT approval marker; ES pairing uncertain |
| 57 | No partir peras con nadie | fare da solo / non spartire | ES idioms book | pears; IT twin uncertain |
| 58 | Essere sulla buona strada | ir por buen camino | IT reviewer (own material) | Both use a road/path image for "on the right track", and both are common — but neither side re-verified against a dictionary this session, and ES has several competing forms (*ir por buen camino*, *estar en el buen camino*, *llevar buen camino*). Needs a source check plus the ES reviewer's call on which form is canonical, and whether MX prefers a different one. |
| 59 | Andare tutto liscio | ir sobre ruedas / salir a pedir de boca | IT reviewer (own material) | IT is smooth-surface imagery; the closest ES candidates change the metaphor entirely — *sobre ruedas* is wheels, *a pedir de boca* is food/asking. No smooth-for-smooth ES equivalent found. Real divergent-imagery entry if it holds, but both ES candidates need verifying and one needs choosing. |
| 60 | Essere in alto mare | (ES side unresolved) | IT reviewer (own material) | The IT is well-known: far from finished, still a long way to go. No confident ES pairing found this session — *estar en pañales* is about being at an early/immature stage (closer to inexperience than to unfinished work), *faltar mucho* is plain description, not an idiom. Interesting because Italy reaches for the OPEN SEA to mean unfinished, which is not an obvious image for that meaning. Worth a dedicated hunt for the ES side rather than forcing one of the above. |
| 61 | Essere acqua passata | ser agua pasada | IT reviewer (own material) | Both real and both mean 'over and done with' — but check against banked 0102 first (*Acqua passata non macina più* / *Agua pasada no mueve molino*). That entry is the full PROVERB with the mill; this is the bare ADJECTIVAL phrase. Likely a legitimate separate entry rather than a duplicate — the proverb argues a point, the phrase just labels something — but it is the same water and the same image, so the multiple-pairings/duplicate question applies. Decide before drafting. |

## Unmatched — one side has no known counterpart  (11)

Still an open question, not yet decided: whether the bank ever ships a "no-twin" entry —
where the absence is the lesson — or whether these stay parked until a real partner turns
up. No schema support for a single-sided entry either way; `type` in SCHEMA.md assumes
two sides for all five allowed types.

| # | Has: | Missing: | Source | Note |
|---|---|---|---|---|
| 1 | Si te caes siete veces, levántate ocho | (no fixed IT twin known) | ES proverb list (Joe) | Japanese proverb naturalised into ES; needs an IT reviewer's judgment |
| 2 | Nessuna nuova, buona nuova | (no fixed ES refrán — 'sin noticias, buenas noticias' is a calque) | IT proverb list (Joe) | possible no-twin entry |
| 3 | Non tutte le ciambelle riescono col buco | (no fixed ES twin; MX 'no siempre se puede') | IT proverb list (Joe) | doughnut imagery is IT-only |
| 4 | Ecco | he aquí?? / ya está / aquí tienes | Italian Matters list | ecco resists ES; possible no-twin entry |
| 5 | Hacer buenas migas con alguien | (no obvious IT idiom) | ES idioms book | crumbs; possible no-twin entry, needs reviewer |
| 6 | Estar hecho pedazos | (no IT partner assigned — *essere a pezzi* went to 0088 instead) | Dissolved 0009 | Covers BOTH senses — bodily exhaustion and emotional devastation (Collins: "estoy hecho pedazos → I'm worn out"; also "mi corazón está hecho pedazos"). Mexican-current. Its natural Italian twin *essere a pezzi* is now parked against 0088 (A011), so pairing the two again would recreate the entry that was just dissolved — find a different IT partner, or leave it. Source: Collins, `pedazo`. Corpus tier, no RAE headword for the participle form. |
| 7 | Estar hecho polvo | (no IT partner assigned) | Dissolved 0009 | Peninsular, EXHAUSTION ONLY — narrower than *hecho pedazos*, which is why it lost the anchor slot. RAE-sourced (dle.rae.es/polvo). Was 0009's original ES side, then briefly alternative A010 before 0009 dissolved. Mexican speakers front *estoy muerto* or *estoy hecho pedazos* instead. |
| 8 | Ensartar perlas | perdere tempo | ES idioms book | pearls; IT likely no twin |
| 9 | Hai voluto la bicicletta? Pedala! | ¿querías bicicleta? — no fixed ES twin; 'ajo y agua' | FluentU 40 | divergent |
| 10 | Te conozco bacalao aunque vengas disfrazado | te conozco… / IT? | ES idioms book | second bacalao idiom; likely no IT twin — possible no-twin entry |
| 11 | Que no te digan, que no te cuenten | (no IT equivalent found) | ES reviewer (3rd-party PDF) | No match found — Doesn't fit the "no matter what" family at all — it's a warning against believing gossip/rumors, a different speech-act entirely. Needs more digging, or may not have a natural Italian twin. |

## Rejected or parked, no partner found  (11)

Kept for the record so they aren't rediscovered and re-researched.

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Cane non mangia cane | perro no come perro / entre bueyes no hay cornadas | FluentU 40 | check ES currency |
| 2 | I frutti proibiti sono i più dolci | la fruta prohibida es la más dulce? | FluentU 40 | check fixedness |
| 3 | Figurati (decline-apology sense) | — | Italian Matters list | second sense of 0067; keep with entry |
| 4 | L'amore domina senza regole | en el amor y la guerra... | FluentU 40 | divergent proverbs |
| 5 | Llevarse calabazas | prendere un due di picche | ES idioms book | ⚑ rejection: ES pumpkins, IT the two of spades (cards) — strong |
| 6 | Conosco i miei polli | conozco a mis clásicos? / sé de qué pie cojea | FluentU 40 | hard pairing |
| 7 | È tutto pepe | ser pura pimienta? no — 'ser puro fuego'? | FluentU 40 | weak pairing |
| 8 | Troppi atti in commedia | muchos frentes abiertos? | FluentU 40 | weak |
| 9 | Tutto fa brodo | todo suma / de todo hay en la viña | FluentU 40 | weak fixed twin |
| 10 | Estar al pedo (AR) | — | spanishexpress.co.uk (Peninsular) | Argentine, vulgar-adjacent; parking for a possible regional-register shelf |
| 11 | No llegarle a uno al tobillo | non arrivare alla caviglia | ES idioms book | ⚑ IT form UNCERTAIN — may be 'non essere degno di allacciargli le scarpe'. Needs the reviewer, do not bank on my recall |
---

## Appendix — decisions, rejections, and source tiers

Preserved from earlier versions of this file; record-keeping, not a queue.

### Source tiers

| Tier | Sources | Why |
|---|---|---|
| **A** | IT reviewer's own teaching material; editor pullbacks | A native speaker who teaches the phrase is the strongest non-dictionary evidence of current usage |
| **B** | ES reviewer-supplied 3rd-party PDF; Spanish idioms book; Joe's own lists | Vouched for or curated by a known person, but not authored by a native reviewer |
| **C** | FluentU, storylearning, europassitalian, spanishexpress, ines.tutoring (IG), italianario (IG) | Learner-site and social discovery sources — fine for finding candidates, weak as evidence. NOTE: ines.tutoring is a verified Italian-tutor Instagram account, but is NOT our Italian reviewer (@learnandloveitalian) — do not confuse the two; material from it carries no reviewer weight. |

### Rejected: authored quotes, not folk expressions

Rejected from Joe's Spanish proverb list (2026-07-18) — attributable, authored lines with
no fixed Italian counterpart, so any "bridge" would be a translation rather than a pairing:
*"La belleza que atrae rara vez coincide con la belleza que enamora"*; *"La acción es la
clave fundamental para todo éxito"*; *"El hombre que se levanta es aún más grande que el
que no ha caído."*

Rejected from Joe's Italian proverb list (2026-07-18), same reasoning: *"La vita è come una
fotografia. Se sorridi, viene meglio"* (modern quote/meme); *"Noi non potremo avere perfetta
vita senza amici"* (literary); *"Della sua istessa colpa, amor è scusa"* (literary, archaic).

Also rejected on editorial rather than linguistic grounds: *"Alle belle donne, le più volte
toccano i brutti uomini"* — a stereotype about women's appearance, not folk wisdom, and not
something a subscriber should receive on a Tuesday.

Flagged for register review rather than rejected: *quedarse para vestir santos* — dated and
arguably sexist. Decide before it ships.

### Why entry 0009 was dissolved (2026-07-24)

Its Spanish side kept being the wrong shape for its Italian side. *Essere a pezzi* spans both
exhaustion and heartbreak; every Spanish candidate covered one half or collided with an
existing entry (*tener el corazón hecho pedazos* is already 0088). The two freed Spanish
expressions are in the tiers above, marked as needing Italian partners. This is the source
pattern for the "Risk" section at the top of this file.

### Why 0070, 0100, 0110 were retired (undated, from `retiredReason`)

`type: formula` was declared out of scope for v1. Not a quality problem — RECOVER note on
file for a tear-off calendar. Source pattern for the "Formula" section at the top of this
file.

### Policy decided 2026-07-24 — multiple pairings permitted

One expression MAY map to two or more others. Multiple pairings are legitimate provided each
generates a valid bridge; review exists to confirm meaning and example, not to enforce
one-to-one. **Deferred in practice** — one pairing each for now, and the validator still
rejects duplicates per an earlier 2026-07-17 decision whose reasoning isn't recorded in the
repo.

### Saturation note (2026-07-21, sixth book batch)

The bank has strong coverage of temper, madness, laughter, confession, and ugliness. Several
book idioms are the fourth or fifth entry on their theme and were queued rather than banked
unless the bridge was genuinely new. Worth applying the same filter to future batches.

### Already handled — checked and needing no action

From the Italian proverb list: *il mattino ha l'oro in bocca* (0056), *chi dorme non piglia
pesci* (0051), *a caval donato* (0016), *cercare il pelo nell'uovo* (0022 IT side). Also
already queued: *chi troppo vuole*, *l'abito non fa il monaco*, *meglio tardi che mai*,
*capitare a fagiolo*, *quale il padre tale il figlio*.

From the Italian reviewer's batches: *non vedere l'ora* is banked at 0040; *avere la testa
fra le nuvole* is banked at 0001 (the banked form uses *tra*, the reviewer's uses *fra* —
free variants, not a different idiom). *Dare una mano* is banked at 0018. *Stare con le mani
in mano* overlaps banked 0114 (same idiom, that entry is the negated imperative form).

---

## Seasonal / calendar candidates (2026-08-01)

Raised by Joe: Christmas, Lent and Easter material. Two drafted this session — 0288
(*estar como unas pascuas* / *essere contento come una Pasqua*) and 0289 (*más largo que
un día sin pan* / *lungo come la quaresima*). The rows below are what turned up alongside
them and are NOT drafted.

**Scope warning that governs this whole section.** 0070, 0100 and 0110 — the bank's only
three retired entries — are all holiday greetings, retired because `type: formula` is out
of scope for v1 (see their `retiredReason`). *Feliz Navidad / Buon Natale*, *Felices
Pascuas / Buona Pasqua* and *Feliz Nochebuena* are the same type and would be retired the
same way. Everything below is deliberately an IDIOM that uses calendar vocabulary, not a
greeting tied to a date. If the calendar product ever ships, the retired three come back
and the greetings become draftable — not before.

**The false friend sitting under all of it.** Spanish *Pascua(s)* covers Christmas as well
as Easter; Italian *Pasqua* is Easter only (PONS gives *¡felices Pascuas!* → *buon
Natale*). Recorded in `events.json` under the new `navidad_natale` event so the scheduler
cannot quietly run an Easter-tagged entry at Christmas.

| # | Expression A | Expression B / sketch | Source | Note |
|---|---|---|---|---|
| 1 | De Pascuas a Ramos | ogni morte di papa | Claude research | ES = from Easter to Palm Sunday, i.e. almost a full year apart, meaning very rarely. COLLIDES WITH BANKED 0041 (*cada muerte de obispo* / *ogni morte di papa*) — this would be a second Spanish expression against the same Italian. Blocked by the deferred multiple-pairings policy, not by quality. If that policy is switched on, this is a strong candidate: the ES imagery is calendar-based where 0041's is clerical. |
| 2 | Natale con i tuoi, Pasqua con chi vuoi | (no ES twin found) | Claude research | Famous Italian proverb — Christmas with your family, Easter with whoever you like. No Spanish equivalent located; the Spanish-speaking world does not appear to draw the same contrast between the two feasts. Candidate for the Unmatched tier rather than a pairing. Would be a strong Christmas-window entry if a partner is ever found. |
| 3 | Hacer la pascua a alguien | rompere le scatole a qualcuno | Claude research | ES = to mess someone about, ruin things for them (PONS glosses it as *stuzzicare*). Cheerful-sounding phrase with a hostile meaning — a good trap. IT side is a guess and *rompere le scatole* is already queued elsewhere; needs a better partner or the collision resolving. |
| 4 | ¡Y santas pascuas! | punto e basta | Claude research | ES discourse marker closing an argument — and that's that. PONS pairs it with *punto e basta*. Register informal both sides. Unverified beyond PONS. |
| 5 | Quando il padre fa carnevale, ai figlioli tocca far quaresima | (no ES twin found) | Treccani (`quaresima`) | Treccani marks this proverb as now rare — if the father is a spendthrift, the family pays for it. Recorded because it is well sourced, but flagged as DATED: the bank should not ship material a dictionary itself calls rare without a reviewer saying it is still heard. |
| 6 | Flor de Pascua | stella di Natale | Claude research | Poinsettia. ES names it for Pascua, IT for Natale — the same plant filed under different feasts, which is the Pascua/Pasqua scope difference showing up in botany. Charming but it is a NOUN, not an idiom; would need a decision on whether the bank takes vocabulary pairs at all. |

### "Boil the ocean" — not drafted, and probably not bankable (2026-08-01)

Raised alongside "a watched pot never boils" (drafted as 0296). The two behave completely
differently and the contrast is worth recording.

*A watched pot never boils* is old folk material with independent roots in both target
languages — Italian keeps the pot, Spanish reaches for *quien espera, desespera*.

*Boil the ocean* is late-20th-century Anglophone management-consulting jargon meaning to
attempt something impossibly broad. Neither Spanish nor Italian appears to have a native
fixed expression for it; what exists in business speech is calqued from English or
paraphrased ad hoc. **Not drafted, because the honest options are all bad:** invent a
pairing, bank a calque as though it were idiomatic, or force it against a neighbour that
does not mean the same thing.

The nearest genuine relatives are about overreach rather than impossible scale, and they
are ALREADY PAIRED WITH EACH OTHER in this file at L211 — *el que mucho abarca poco
aprieta* / *chi troppo vuole nulla stringe*. Those two mean you will fail by taking on too
much; *boil the ocean* means the task was never possible at any scale. Related, not
equivalent, and that row should not be repurposed for this.

Worth keeping as a data point for the source-tier question: English business idioms are a
category where both languages tend to borrow rather than invent, so seeds from that
register will keep producing calques. Compare 0281 (*farfalle nello stomaco*) and 0279
(*luce in fondo al tunnel*), both flagged as shared borrowings from English, and the "my
two cents" finding recorded on 0295.

| 2 | Descubrir / inventar el hilo negro | scoprire l'acqua calda | Claude research | The COMPETING Mexican partner for *scoprire l'acqua calda*, not banked. Banked instead as 0305 against *descubrir el agua tibia*, because that produces a near-twin with a single-word temperature trap (calda/tibia) where hilo negro would be a divergent-imagery entry. Both are defensible and hilo negro may well be the more common Mexican form — Tureng glosses it as "reinvent the wheel", and a WordReference native offers it and *agua tibia* side by side. If the reviewer says hilo negro dominates, 0305 should be re-anchored and this row promoted. Do not bank both while the multiple-pairings policy is off. |

---

## Binomial pairs — @ines.tutoring 19-item set (2026-08-01)

**Tier C.** @ines.tutoring is a verified Italian-tutor Instagram account and is NOT our Italian
reviewer (@learnandloveitalian) — do not confuse them; this carries no reviewer weight.

The set is one coherent type: X-and-Y frozen pairs. **3 drafted** — 0306 (*de la mano* /
*mano nella mano*, carrying the *mano a mano* false friend), 0307 (*paso a paso* / *passo
dopo passo*, the a/dopo connector split), 0308 (*tarde o temprano* / *prima o poi*). **1
already banked** — *poco a poco* is 0236. The rest below are logged, not drafted.

**The one systematic finding worth chasing:** Italian sequences repeated-noun binomials with
**dopo** where Spanish points with **a** — *passo dopo passo* / *paso a paso*, *giorno dopo
giorno* / *día a día*. But Italian keeps *a* for *faccia a faccia* and *fianco a fianco*, so
it is not a clean rule. Whether a rule exists at all is the open question logged on 0307 and
it needs the Italian reviewer.

| # | Italian | Spanish / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Giorno dopo giorno | día a día | ines.tutoring (IG, tier C) | Same a/dopo split as 0307 and would teach the identical point — bank one or the other, not both. |
| 2 | Faccia a faccia | cara a cara | ines.tutoring (IG, tier C) | Both take *a*, so no connector trap. The interest is lexical: Italian reaches for *faccia*, Spanish for *cara* — the same split already banked in *dar la cara* / *pagare di persona*, where Spanish's *cara* had no Italian home at all. Possible themed thread on faccia/viso/cara rather than a standalone entry. |
| 3 | Fianco a fianco | codo con codo / hombro con hombro | ines.tutoring (IG, tier C) | Genuine divergent imagery: Italian uses the FLANK, Spanish the ELBOW or the SHOULDER. Neither Spanish option is a flank. Worth drafting properly — one of the better rows here. |
| 4 | Testa a testa | mano a mano / cabeza a cabeza | ines.tutoring (IG, tier C) | CAUTION: the natural Spanish for a head-to-head is *mano a mano*, which collides directly with 0306's false friend — Spanish uses the HAND where Italian uses the HEAD, and Italian's *mano a mano* means gradually. Do not draft in isolation; it is the other half of 0306 and may belong inside that entry rather than beside it. |
| 5 | Cuore a cuore | de corazón a corazón | ines.tutoring (IG, tier C) | Spanish adds prepositions Italian omits (*de … a*). Thin. |
| 6 | Uno per uno | uno por uno | ines.tutoring (IG, tier C) | Exact twin, per/por cognates. Trap-free — treat like the confidence-builder set. |
| 7 | Bene o male | bien o mal | ines.tutoring (IG, tier C) | POSSIBLE FALSE FRIEND, needs checking. Italian *bene o male* often means roughly, more or less, one way or another — not literally good-or-bad. If Spanish *bien o mal* stays literal, this is a Risk row, not a twin. Flagged, not drafted. |
| 8 | Bianco e nero | blanco y negro | ines.tutoring (IG, tier C) | Both Romance languages put WHITE first; English inverts to black-and-white. No ES/IT trap, but a nice three-language aside if the format ever wants one. |
| 9 | Avanti e indietro | de aquí para allá / adelante y atrás | ines.tutoring (IG, tier C) | Italian is forward-and-back; the common Spanish is a place-based *de aquí para allá*, here-to-there. Different axis — motion vs location. Needs research. |
| 10 | Su e giù / qua e là / dentro e fuori / questo e quello / tutto o niente / ora o mai più | arriba y abajo / aquí y allá / dentro y fuera / esto y aquello / todo o nada / ahora o nunca | ines.tutoring (IG, tier C) | Six near-twins grouped because none has a trap worth an entry on its own. Only one detail stands out: Italian *ora o mai più* adds the *più* — now or never MORE — where Spanish stops at *ahora o nunca*. If any single row here is drafted, that is the one. |

---

## *Italian Idioms: Top 100* — Maria Consonni (book, 2026-08-09)

**Source type: published book, tier B.** Photographed pages covering entries 1–40.

**COPYRIGHT HANDLING — read before using this section.** The expressions themselves are folk
material and not the author's property, so listing them is fine. Her per-idiom essays are her
own prose and must not be reproduced, paraphrased closely, or mined for bridge notes or
examples. Every origin story below that we might want to use has to be independently sourced
before it goes anywhere near an entry — several of her etymologies (the Ernesto Nathan story
for *trippa per gatti*, the Turin chocolatier for *figura del cioccolataio*, the Florentine
comedian for *fare fiasco*) are the kind of colourful account that circulates widely and may
or may not survive checking. Treat this as a DISCOVERY LIST ONLY. The standing no-copied-
examples rule applies with extra force here.

Of the ~34 legible expressions: **7 already banked** (*ogni morte di papa* 0041, *cercare il
pelo nell'uovo* 0022, *avere la luna storta* 0093, *piantare in asso* 0099, *essere come il
prezzemolo* 0091, *fette di salame sugli occhi* 0096 — note the book has *prosciutto* where
the bank has *salame*, worth a reviewer check on which is standard, and *pezzo di pane* 0275).
**4 already queued** (*occhio non vede cuore non duole* L210, *morto un papa se ne fa un
altro* L281, *capitare a fagiolo* L304, *cervello di gallina* L288). The rest are new.

| # | Italian | Spanish / sketch | Source | Note |
|---|---|---|---|---|
| 1 | Nella botte piccola c'è il vino buono | (ES side unresearched) | Consonni book (tier B) | Good things come in small packages — used self-deprecatingly about height. ES may have *en frasco pequeño está la buena esencia* / *el buen perfume se vende en frasco pequeño*. VERIFY INDEPENDENTLY. |
| 2 | Non c'è trippa per gatti | (ES side unresearched) | Consonni book (tier B) | Nothing doing; no resources to spare. Distinctively Roman. No obvious ES twin — likely divergent or unmatched. |
| 3 | Gallina vecchia fa buon brodo | (ES side unresearched) | Consonni book (tier B) | ES has a near-identical *gallina vieja hace buen caldo*. Probable freebie; check for the same age/experience framing and whether either side carries a sexist edge in current use before drafting. |
| 4 | Fare la figura del cioccolataio | quedar a la altura de su zapatilla? | Consonni book (tier B) | Cuts across the existing *figuraccia* cluster (banked 0010, queued L186). Do NOT draft standalone — resolve the whole figura family first. |
| 5 | Attaccati al tram! | ¡ajo y agua! / ¡arréglatelas! | Consonni book (tier B) | Dismissive refusal of help. Register is rude-ish both sides — confirm before shipping. |
| 6 | Gridare ai quattro venti | pregonar a los cuatro vientos | Consonni book (tier B) | Likely near-twin, both with four winds. Check the verb: IT *gridare* (shout) vs ES *pregonar* (proclaim). |
| 7 | Salvarsi in calcio d'angolo | (ES side unresearched) | Consonni book (tier B) | Football metaphor for a last-second escape. ES football idioms exist but may not use the corner kick — potential divergent-imagery entry. |
| 8 | Spezzare una lancia a favore di qualcuno | romper una lanza por alguien | Consonni book (tier B) | ES has the same chivalric image. Probable near-twin; the preposition differs (*a favore di* vs *por*). |
| 9 | Un pollo da spennare | (ES side unresearched) | Consonni book (tier B) | Someone easy to fleece. NOTE the book flags that IT *pollo* = naive/foolish where EN *chicken* = cowardly — that contrast is worth checking against Spanish, where *gallina* IS the coward. Possible three-way false friend, but VERIFY INDEPENDENTLY. |
| 10 | Avere le orecchie che fischiano | (ES side unresearched) | Consonni book (tier B) | Ears ringing = being talked about. ES *me zumban los oídos* / *se me calientan las orejas* — check which carries the being-talked-about sense. |
| 11 | Avere la coda di paglia | (ES side unresearched) | Consonni book (tier B) | Guilty conscience making you defensive. ES *tener rabo de paja* exists in some varieties — verify currency and region. |
| 12 | Specchietto per le allodole | (ES side unresearched) | Consonni book (tier B) | A decoy, a lure. ES *canto de sirena* is the nearest but changes the myth entirely. |
| 13 | Non si può avere la botte piena e la moglie ubriaca | no se puede estar en misa y repicando | Consonni book (tier B) | ⚑ EDITORIAL FLAG: the IT names a drunk wife, and the book itself notes it is now often considered sexist. The ES equivalent (*misa y repicando*, or *no se puede nadar y guardar la ropa*) carries no such content. If drafted, use a ES side that does not import the problem, and expect a register/appropriateness question at review. Compare the standing flag on *quedarse para vestir santos*. |
| 14 | Se non è zuppa è pan bagnato | (ES side unresearched) | Consonni book (tier B) | Six of one, half a dozen of the other. ES *olivo y aceituno, todo es uno* or *lo mismo da*. |
| 15 | Dare via qualcosa per un piatto di lenticchie | vender por un plato de lentejas | Consonni book (tier B) | Shared biblical origin (Esau). Probable near-twin — the kind of shared-ancestor entry 0274 already models. |
| 16 | Trovare pane per i tuoi denti | (ES side unresearched) | Consonni book (tier B) | To meet your match. ES *encontrar la horma de su zapato* — shoe vs bread, genuine divergent imagery. Promising. |
| 17 | Essere un pappa molle | (ES side unresearched) | Consonni book (tier B) | A spineless person. ES *ser un blandengue* / *un pusilánime*. |
| 18 | Fare le nozze con i fichi secchi | (ES side unresearched) | Consonni book (tier B) | To attempt something on nothing. ES *hacer una fiesta con pan y agua*? Needs research. |
| 19 | Sotto la pioggia fame, sotto la neve pane | (ES side unresearched) | Consonni book (tier B) | Farmers' weather proverb. ES *año de nieves, año de bienes* is the closest — both weather-as-harvest, different precipitation. Good candidate. |
| 20 | Meglio mangiare pane e cipolla a casa tua che maccheroni a casa di altri | (ES side unresearched) | Consonni book (tier B) | ES *más vale pan con amor que gallina con dolor*, or *casa mía, por pobre que sea*. |
| 21 | Far polpette di qualcuno | hacer picadillo a alguien | Consonni book (tier B) | Both grind an opponent into mince. Probable near-twin — check whether ES *picadillo* and IT *polpette* differ in what the meat becomes (mince vs meatballs). |
| 22 | Tirare il pacco | dar plantón | Consonni book (tier B) | To stand someone up. ES *dar plantón* is well established; IT is more slang. Register check needed. |
| 23 | A pisielle pavammo | — | Consonni book (tier B) | NEAPOLITAN DIALECT, not standard Italian. Out of scope unless the bank takes dialect — same question as *va a ciapà i ratt* below. |
| 24 | Va a ciapà i ratt! | — | Consonni book (tier B) | MILANESE DIALECT. Same scope question. Both dialect entries are interesting but would need a policy decision first: the bank's IT side has so far been standard Italian throughout. |

### Consonni book, entries 41–59 (second batch, 2026-08-09)

Same tier-B source and **the same copyright handling applies** — expressions only, her prose
and etymologies not to be reproduced or mined. Of 18 legible: **2 already banked** (*tirare
l'acqua al proprio mulino* 0081, *l'abito non fa il monaco* drafted today as 0299), **2
already queued** (*a buon intenditor poche parole* L109, *l'appetito vien mangiando* L114).
14 new below.

| # | Italian | Spanish / sketch | Source | Note |
|---|---|---|---|---|
| 25 | Uomo avvisato, mezzo salvato | hombre prevenido vale por dos | Consonni book (tier B) | **BEST OF THIS BATCH.** Both languages do arithmetic on a forewarned man and get different answers: Italian says he is HALF saved, Spanish says he is worth TWO. One measures what he keeps, the other what he becomes — a fraction against a multiple, on identical semantics. Verify both independently, then draft. |
| 26 | Non dire gatto se non ce l'hai nel sacco | no vender la piel del oso antes de cazarlo | Consonni book (tier B) | Don't count your chickens. Italian holds a cat in a sack; Spanish sells a bear's skin. Both about premature celebration, completely different animal and transaction. Strong divergent imagery. NOTE the cat cluster — check saturation against banked 0078 and the queued cat rows. |
| 27 | Le disgrazie non vengono mai sole | las desgracias nunca vienen solas | Consonni book (tier B) | Near-exact twin. Probable freebie; run the trap-hunt before drafting, since the last freebie audit found real traps in five of six rows that looked exactly this safe. Also check overlap with 0271 (*piove sul bagnato*), which covers adjacent ground. |
| 28 | Il gioco non vale la candela | no vale la pena / el juego no vale la vela | Consonni book (tier B) | Spanish has BOTH a calque with the candle and a native form with *pena*. Which one a speaker reaches for is the entry — and the calque may be the trap, in the same shape as the *por lo que valga* finding on 0294. Worth research. |
| 29 | Il diavolo fa le pentole ma non i coperchi | (ES side unresearched) | Consonni book (tier B) | Wrongdoing eventually shows. ES nearest is *la mentira tiene las patas cortas* (lies have short legs) — a completely different image for the same idea. Promising divergent pair if it holds. |
| 30 | Chi ha il pane non ha i denti e chi ha i denti non ha il pane | (ES side unresearched) | Consonni book (tier B) | Those who have it can't enjoy it. Long, chiastic, memorable. Do NOT confuse with row 16 above (*trovare pane per i tuoi denti*) — same two nouns, unrelated meaning, and the lookup flagged them as near-collisions. |
| 31 | Il buon marinaio si conosce al cattivo tempo | (ES side unresearched) | Consonni book (tier B) | Character shows under pressure. ES may use *en el peligro se conoce al amigo* or a sailing form — needs research. |
| 32 | Rosso di sera, bel tempo si spera | cielo rojo al atardecer, buen tiempo va a haber | Consonni book (tier B) | Weather-lore rhyme; English has *red sky at night*. All three rhyme, which is the point — three languages independently building the same forecast into verse. Check the ES form, which I have only from memory. |
| 33 | Far cuocere qualcuno nel suo brodo | dejar que se cueza en su propia salsa | Consonni book (tier B) | Let them stew. IT broth, ES sauce — small but real lexical divergence on an otherwise parallel image. |
| 34 | Impara l'arte e mettila da parte | (ES side unresearched) | Consonni book (tier B) | Learn a skill, save it for later. Rhymes in Italian (arte/parte). ES equivalent unknown; if none rhymes, that asymmetry is the entry. |
| 35 | Un padre campa cento figli e cento figli non campano un padre | (ES side unresearched) | Consonni book (tier B) | A father supports a hundred children; a hundred children can't support one father. Bleak, chiastic. ES may have a close parallel — research. |
| 36 | A Santo vecchio non si accendono più candele | (ES side unresearched) | Consonni book (tier B) | Yesterday's powerful get forgotten. Joins the santo cluster already flagged in this file (currently 5 rows, all ES-side Catholic imagery — this is the first IT-side santo entry, which is worth noting for that thread). |
| 37 | Chi aspetta, Dio l'assetta | (ES side unresearched) | Consonni book (tier B) | Patience is rewarded — and it DIRECTLY CONTRADICTS banked 0296 (*quien espera, desespera*, waiting makes it worse). Two proverbs, opposite advice, and 0296's Spanish half is the one Italian is arguing with. That is either a great entry or a scheduling hazard; do not run them near each other either way. |
| 38 | Chi va piano va sano e va lontano | (ES side unresolved) | Consonni book (tier B) | DUPLICATE of the calendar-batch row above, now with more information: the book records the darker completion *chi va forte va alla morte*. That rhyming full form may make the ES pairing easier to find, since Spanish proverbs of this type also rhyme. Merge with the earlier row rather than logging twice. |

### Consonni book, entries 60–79 (third batch, 2026-08-09)

Same tier-B source, same copyright handling. **1 already banked** (*il mattino ha l'oro in
bocca* 0056), **2 already queued** (*buon viso a cattivo gioco* L317, *Natale con i tuoi*
L464 — already logged in the seasonal section as having no ES twin, and the book's account
of it independently supports that).

**⚑ THE BOOK PRINTS ONE OF THESE BACKWARDS.** Entry 61 appears as *"far buon **gioco** a
cattivo **viso**"*, glossed as reacting well to a mean face. The established Italian proverb
is *far buon **viso** a cattivo **gioco*** — put a good FACE on a bad GAME — which is what
L317 already has, sourced separately. The book has swapped the two nouns and then written an
explanation that fits the swap. **Do not take the book's form.** This is the clearest possible
demonstration of why her prose can't be used as a source: a published, professionally set
book has an error in the headword itself, and the surrounding explanation makes it look
deliberate. Verify everything from this source independently.

| # | Italian | Spanish / sketch | Source | Note |
|---|---|---|---|---|
| 39 | Del senno del poi son piene le fosse | a toro pasado, todos somos toreros | Consonni book (tier B) | **BEST OF THIS BATCH.** Hindsight is worthless. Italian buries it — the ditches are full of after-the-fact wisdom. Spanish stages it — once the bull has passed, we're all bullfighters. A grave against an arena, same contempt for the armchair expert. Also check *después de la guerra, todos generales*. Strong candidate. |
| 40 | La sera leoni, la mattina conigli | (ES side unresearched) | Consonni book (tier B) | Lions at night, rabbits in the morning. Note IT *coniglio* = coward, which is a genuine three-way tangle worth checking: EN uses *chicken*, ES uses *gallina*, IT uses *coniglio* — three languages, three different frightened animals. That may be a better entry than the proverb itself. |
| 41 | Non sputare nel piatto dove mangi | no escupas en el plato donde comes | Consonni book (tier B) | Probable near-twin. Run the trap-hunt — the freebie audit found real traps in five of six rows that looked this safe. |
| 42 | La verità è nel vino | en el vino está la verdad | Consonni book (tier B) | Both from Latin *in vino veritas*, so shared-ancestor rather than parallel invention — the 0274 pattern. Check whether either language keeps the Latin more often than the vernacular. |
| 43 | Una mezza bugia è una menzogna intera | (ES side unresearched) | Consonni book (tier B) | A half-lie is a whole lie. Note IT uses TWO different words for lie in one sentence (*bugia*, *menzogna*); Spanish has *mentira* and *embuste* but may not pair them this way. If Spanish can't make the same two-word move, that asymmetry is the entry. |
| 44 | A lavar la testa all'asino si perde il ranno e il sapone | (ES side unresearched) | Consonni book (tier B) | Wasted effort on the unteachable. ES has a close relative in *lavar la cabeza al asno, perdimiento de jabón* — verify, since if it holds this is a near-twin with a shared donkey. |
| 45 | Chi va a letto senza cena, tutta notte si dimena | (ES side unresearched) | Consonni book (tier B) | Rhymes (*cena*/*dimena*). ES *quien se acuesta sin cena, toda la noche pena* is almost certainly the twin AND ALSO RHYMES (*cena*/*pena*) — if confirmed, that is a rare case of two languages independently rhyming the same proverb, which is worth an entry on its own terms. |
| 46 | A pagare e a morire si è sempre in tempo | (ES side unresearched) | Consonni book (tier B) | Never too late to pay or die. Bleakly funny. No obvious ES twin — research needed. |
| 47 | L'Epifania tutte le feste porta via | (ES side unresearched) | Consonni book (tier B) | **SEASONAL — pins to 6 January.** Marks the end of the Christmas season, which is exactly the window 0291 (*buone feste*, 12-20 to 01-06) closes on. If the calendar product ships, this is the natural last page of that run. ES may have a Reyes equivalent; check. |
| 48 | Chi pratica lo zoppo impara a zoppicare | dime con quién andas y te diré quién eres | Consonni book (tier B) | Bad company rubs off. ES's famous version is about telling who you are from your company — a different mechanism (diagnosis vs contagion) for the same worry. Good divergent pair if it holds. ⚑ REGISTER FLAG: the Italian's image is a disabled person and the book's own gloss leans on it. Handle carefully or skip. |
| 49 | Si vive bene all'ombra del campanile | (ES side unresearched) | Consonni book (tier B) | Life is easy under powerful protection. Related to Italian *campanilismo* (parish-pump localism), a concept Spanish has no single word for — that gap may be the entry. |
| 50 | Prima di parlare, taci | (ES side unresearched) | Consonni book (tier B) | Veneto. Think before speaking. ES *en boca cerrada no entran moscas* is the famous neighbour but says something different (silence protects you, not others). Check. |
| 51 | Avere fortuna come un cane in chiesa | (ES side unresearched) | Consonni book (tier B) | Florentine, ironic — a dog in a church is unwelcome, so this means very UNlucky. The irony is the trap: a learner reads *fortuna* and gets it backwards. Promising. |
| 52 | Rubando poco si va in galera, rubando tanto si fa carriera | (ES side unresearched) | Consonni book (tier B) | Venetian, rhyming (*galera*/*carriera*), cynical about scale of theft. Likely no clean ES twin; flag for the unmatched tier if research comes up empty. |
| 53 | A Milano, anche i gelsi fanno l'uva / Fiorentini ciechi e Pisani traditori / Arno non cresce se Sieve non mesce | — | Consonni book (tier B) | THREE CITY-SPECIFIC ITEMS grouped: Milanese civic pride, a Florence–Pisa insult, and a Florentine river proverb. All depend on local geography or rivalry that a Mexican or Spanish learner has no access to, and the Pisa one is an ethnic slur between neighbouring cities. Recorded for completeness; recommend NOT drafting. |

### Consonni book, entries 81–100 (final batch — book complete, 2026-08-09)

Same tier-B source, same copyright handling. **1 already banked** — *cadere dalla padella
alla brace* is 0106, where the bank has *nella brace* against the book's *alla brace*; both
circulate, worth a reviewer note on which is standard. Everything else is new.

**Book now fully logged (100/100 across four batches.)** Overall yield: roughly 20 already
banked or queued, ~70 logged as candidates, a handful set aside as dialect or city-specific.
The single most useful thing it produced was not an expression but the **error at entry 61**
(*far buon gioco a cattivo viso*, printed with the nouns swapped) — concrete proof that a
professionally published source still needs independent verification.

| # | Italian | Spanish / sketch | Source | Note |
|---|---|---|---|---|
| 54 | Rimandare alle calende greche | remitir a las calendas griegas | Consonni book (tier B) | **STRONGEST OF THIS BATCH.** Both languages postpone something to a date that cannot exist — the Greeks had no calends, so the deadline is unreachable by construction. Shared Latin ancestry (attributed to Augustus), so a shared-ancestor entry in the 0274 mould, and the joke only lands if you know the Roman calendar, which makes the bridge do real work. |
| 55 | Colosso coi piedi d'argilla | coloso con pies de barro | Consonni book (tier B) | Both from Daniel 2 — a shared biblical image. Check the material: IT *argilla* (clay) vs ES *barro* (clay/mud), which may be a genuine lexical split rather than free variation. |
| 56 | Avere la pazienza di Giobbe | tener la paciencia de Job | Consonni book (tier B) | Shared biblical figure, near-exact. NOTE: L161 already queues a different patience proverb (*la pazienza è la virtù dei forti*) — check they don't crowd each other. |
| 57 | Fare di tutta l'erba un fascio | meter todo en el mismo saco | Consonni book (tier B) | To lump everything together. Italian bundles GRASS, Spanish puts it in a SACK. Clean divergent imagery on identical meaning — good candidate. |
| 58 | Diffondersi a macchia d'olio | extenderse como mancha de aceite | Consonni book (tier B) | Both spread like an oil stain — where English uses wildfire. A case where the two Romance languages agree and English is the outlier, which the bank has hit before (goose/hen, black-and-white). Probable near-twin; hunt for a trap. |
| 59 | Alzare la cresta | subírsele los humos | Consonni book (tier B) | To get cocky. Italian raises a bird's crest; Spanish has smoke going to the head. Note *tener humos* is ALREADY logged as an alternate for 0255 (*puzza sotto il naso*) — resolve which Spanish expression anchors which Italian before drafting either. |
| 60 | Tutti i nodi vengono al pettine | (ES side unresearched) | Consonni book (tier B) | Every knot reaches the comb — problems deferred still arrive. ES may use *todo se sabe* or *la verdad siempre sale a flote*; if neither has a physical image, the concreteness gap is the entry. |
| 61 | Levarsi la sete col prosciutto | (ES side unresearched) | Consonni book (tier B) | To make a problem worse by the supposed cure — prosciutto is salty, so it deepens the thirst. Sharp, funny, and very Italian in its ingredient. ES equivalent unknown; possibly unmatched. |
| 62 | Il figlio del gatto prende i topi | de tal palo, tal astilla | Consonni book (tier B) | COLLIDES with the queued *tale madre tale figlia* row (L276), which already pairs the same Spanish. Do not bank both against *de tal palo*; pick one, or wait for the multiple-pairings policy. |
| 63 | Essere l'ago della bilancia | (ES side unresearched) | Consonni book (tier B) | The deciding factor. ES may have *inclinar la balanza*, but that is a verb phrase where the Italian names a person — a word-class difference worth checking. Note the near-collision with drafted 0270 (*ago nel pagliaio*), same noun, unrelated idiom. |
| 64 | Ammainare le vele | (ES side unresearched) | Consonni book (tier B) | To furl sails, i.e. wind down. Direct opposite of banked 0103 (*andare a gonfie vele*). If both ship, they are a natural pair — but they must not run close together. |
| 65 | Trovare terreno morbido | (ES side unresearched) | Consonni book (tier B) | To find easy going. Thin on its own; check whether ES has a soil metaphor at all. |
| 66 | Ad ogni poeta manca un verso | (ES side unresearched) | Consonni book (tier B) | Nothing is ever quite finished. Elegant. Likely no ES twin — candidate for the unmatched tier. |
| 67 | Fare il giro delle sette chiese | (ES side unresearched) | Consonni book (tier B) | To go round the houses. Rome-specific (a Holy Week pilgrimage), so the image needs explaining, but the meaning is universal and ES may have a saints-based parallel — the santo cluster is now large enough to be worth checking against. |
| 68 | Essere un Bastian Contrario | llevar la contraria | Consonni book (tier B) | A habitual contrarian. Italian names a PERSON (a Piedmontese figure); Spanish describes the BEHAVIOUR. Same shape as the *gnorri* finding in 0243, where Italian invents a character and Spanish borrows a saint — possible recurring thread. |
| 69 | Fare una frittata / Essere la fabbrica del Duomo / Fare un quarantotto / Ai tempi che Berta filava | — | Consonni book (tier B) | FOUR GROUPED, all needing a decision before research. *Fare una frittata* (make a mess) collides with banked 0028's *rivoltare la frittata* — same dish, different idiom, check saturation. The other three are locked to Italian specifics: the Duomo of Florence's build time, the revolutions of 1848, and a 13th-century legend. Same category as the city-specific group in the previous batch — recommend NOT drafting. |

### @learnandloveitalian basic-vs-idiom carousel, 2026-08-26

Tier A (the Italian reviewer's own account). **1 drafted** — 0319 (*ir como un tiro* /
*andare come un treno*). *Non capisci un tubo* is a second-person variant of banked **0310**
and needs no new row.

**⚑ THE EUPHEMISM CLUSTER IS NOW FOUR AND SHOULD BE HANDLED AS ONE DECISION.** Across recent
intake, four separate Italian expressions have turned out to be the same move — a harmless
noun standing in for a coarse one:

| Expression | Stands in for | Status |
|---|---|---|
| Non capirci un **tubo** | anatomical | banked 0310, formality set avoid_in_exam |
| Non capire un **cavolo** | *cazzo* | in queue, from the 2026-08-19 card |
| **Rompere** le **scatole** | *coglioni* | L247, already flagged as "a register entry about euphemism itself" |
| **Girare** le **scatole** | *coglioni* | NEW, below |

Banking these separately would teach the identical lesson four times, and each card would
have to explain the euphemism from scratch without being able to reference the others (per
the standing no-cross-reference rule). Three options: pick ONE as the euphemism entry and
drop the rest; bank them as ordinary entries and let the euphemism go unremarked; or treat
the pattern itself as the entry, which the current schema has no shape for. **Recommend
deciding this before drafting any more of them** — it is the same structural question the
register-ladder finding raised, and the two may want the same answer.

| # | Italian | Spanish / sketch | Source | Note |
|---|---|---|---|---|
| 73 | Mi girano le scatole | (ES side unresolved) | IT reviewer (own account) | Fourth member of the euphemism cluster above — *scatole* for *coglioni*, and *girare* rather than *rompere*. ES candidates all collide or misfit: *estar hasta las narices* is banked at 0026, *estar hasta la madre* is genuinely vulgar rather than euphemistic (so it loses the point), and *colmar el plato* is about the last straw, not sustained anger. Needs a Spanish euphemism of the same politeness level — which may not exist, in which case the asymmetry is the entry. |
| 74 | Avere una marcia in più | (ES side unresolved) | IT reviewer (own account) | ⚑ THE CARD'S OWN GLOSS IS NARROW. It renders this as "he/she is really smart", but Italian dictionaries give it as *essere superiore agli altri per doti particolari o mezzi a disposizione* — having an edge, by talent OR by resources, not intelligence specifically. Do not take the card's English. ES has no gear metaphor for a person; *estar en otra liga* changes the image to a sporting division and *llevar ventaja* is plain. Also check saturation against banked 0242 (*tener madera* / *avere i numeri*), which is adjacent — innate capability vs having an edge. |

---

## Italian proverb book, PROVERBIO 1–150 (photographed 2026-08-30)

**Source tier: C.** Below the Consonni book, and not usable as a citation for anything.
Evidence, all visible in the pages themselves:

- **The descriptions are templated.** Nearly every entry runs *"Italians use it to…"* /
  *"This proverb reflects the Italian belief that…"*, and makes cultural claims no source
  supports. **No prose from this book may enter any shipping field.**
- **PROVERBIO 70 and 114 are the same expression** (*Il troppo stroppia*), printed twice
  with the same gloss, 44 entries apart. **118 repeats 10.** **88 repeats 81.**
- **62 and 71 contradict each other** — *A tavola non si invecchia* (attested) and
  *A tavola si invecchia bene* (not).
- **The book contains both an invented proverb and its real counterpart.** #3 gives
  *Il tempo è il miglior maestro*; #147 gives *Il tempo è galantuomo*, which is the real
  one. A human compiler working from Italian sources does not do this.
- **PROVERBIO 139 ships with "(CORRETTO)" printed in its heading.** No proofreading pass
  happened.
- **Three descriptions misread their own proverb.** #102 *L'abito non fa il monaco* is
  explained as being about *habits revealing character* — the English word "habit" read
  back into Italian *abito*, which only means garment. Banked **0299** teaches exactly
  this trap. #138 *Mettere i puntini sulle i* is glossed as puncturing false modesty; it
  means to clarify. #149's English reverses the sense — knots reaching the comb is a
  reckoning arriving, not, as the book has it, a resolution.
- **#35 inverts a real proverb.** The attested Italian is *amore vecchio non fa ruggine*
  (old love does not rust — it endures). The book gives *non fa buon brodo* and reverses
  the meaning. Verified 2026-08-30 against multiple Italian proverb collections.

### How to read the Confidence column

**⚑ The confidence marks below are Claude's unverified judgement, and they have a known
error rate.** Three were spot-checked on 2026-08-30 and one of the three was wrong:

- *Amore vecchio non fa ruggine* — call confirmed.
- *La fortuna gira* (#83) — **discard was wrong.** *La ruota della fortuna gira* is
  attested; the book printed a shortened form of a real proverb. Moved to `form?`.
- *A pensar male…* (#148) — **claim was wrong.** Not a modern proverb by Andreotti. It
  belongs to Pius XI, reached Andreotti in 1939 via Cardinal Marchetti Selvaggiani, and
  Carlo Gozzi already cites it as proverbial in *La Zobeide* (18th c.).

The error pattern: confidence tracked how *proverbial something sounded*, which is a bad
test — a great many attested Italian proverbs are plain declarative sentences. **The
`doubtful?` rows are therefore a sorting hint, not a verdict. Nothing here has been
removed on my say-so.** Recheck before discarding, especially in the luck chapter
(81–100), where the attested corpus is far larger than I assumed.

**Every row still needs Treccani or De Mauro before drafting**, including rows marked
`attested` — that mark means "sounds real to me", not "cited". All 150 are Italian-only;
each needs a Spanish side researched at Stage 0. ES sketches below are starting points
to verify, never to draft from.

| # | Italian | Spanish / sketch | Confidence | Note |
|---|---|---|---|---|
| 1 | Chi va piano, va sano e va lontano | — | **logged** | L603 |
| 2 | L'erba del vicino è sempre più verde | — | **logged** | L277 |
| 3 | Il tempo è il miglior maestro | — | doubtful? | Attested Italian is *il tempo è galantuomo* — which this book also carries, at #147. Compare the two. |
| 4 | Sbagliando si impara | de los errores se aprende | attested | Collides with L599 and L632; check the learning cluster isn't oversubscribed. |
| 5 | Ogni cosa a suo tempo | cada cosa a su tiempo | attested | Near-exact twin. Thin bridge. |
| 6 | La fretta è cattiva consigliera | las prisas son malas consejeras | attested | Check whether MX prefers singular *la prisa*. |
| 7 | Chi semina vento raccoglie tempesta | — | **banked 0303** | — |
| 8 | L'esperienza è la madre della saggezza | — | form? | Attested form is *madre della **scienza***. Also collides with L161's *la paciencia es la madre de la ciencia* — three proverbs competing for one frame. |
| 9 | Chi cerca trova | el que busca, encuentra | attested | IT can be used menacingly; confirm whether ES carries that. |
| 10 | Non tutto il male vien per nuocere | no hay mal que por bien no venga | attested | ⚑ Strong divergent pair. IT negates the harm's purpose; ES asserts a good outcome. Duplicated by the book at #118. |
| 11 | Meglio tardi che mai | — | **logged** | L308 |
| 12 | Chi ben comincia è a metà dell'opera | obra empezada, medio acabada | attested | IT counts from the start, ES from the finish. Verify ES currency in MX. |
| 13 | Le apparenze ingannano | las apariencias engañan | attested | Exact twin, freebie. Weakened duplicate at #108. |
| 14 | La pazienza è la virtù dei forti | — | **logged** | L161 |
| 15 | Chi ha pazienza vince | — | form? | Attested is *chi la dura la vince*. Patience already has two queued rows. |
| 16 | Il mondo è fatto a scale | — | attested | Full form *…c'è chi scende e c'è chi sale* rhymes. ES *la vida da muchas vueltas* uses a wheel — possible divergence. |
| 17 | Non si può avere tutto | — | doubtful? | Ordinary sentence. Collides with L567. |
| 18 | Ogni promessa è debito | lo prometido es deuda | attested | Near-exact; IT quantifies with *ogni*. |
| 19 | Chi troppo pensa poco fa | — | doubtful? | Attested neighbour is *chi troppo vuole nulla stringe* (L211, and #146 below). |
| 20 | Il buon giorno si vede dal mattino | — | attested | No obvious ES twin — likely a divergence entry. |
| 21 | L'amore è cieco | — | **logged** | L115 |
| 22 | Al cuor non si comanda | al corazón no se le manda | attested | Check the ES clitic; reviewer decides. |
| 23 | Lontano dagli occhi, lontano dal cuore | ojos que no ven, corazón que no siente | attested | ⚑ **Top find.** Same two organs, opposite verdict. IT mourns the distance; ES is quietly relieved by it — often said as permission. Real interference risk both ways. |
| 24 | Chi ama teme | — | attested | Literary and old; confirm current use. |
| 25 | L'amore non è bello se non è litigarello | — | attested | Rhymes (bello/litigarello). No fixed rhyming ES twin found — the asymmetry may be the entry. |
| 26 | Amore e tosse non si nascondono | el amor y la tos no se pueden ocultar | attested | Verify the ES independently — may be a translation artifact. |
| 27 | Chi si assomiglia si piglia | Dios los cría y ellos se juntan | attested | ⚑ IT is reflexive and agentless; ES inserts God as the breeder. Agency is the axis. |
| 28 | Tra moglie e marito non mettere il dito | — | **banked 0058** | — |
| 29 | Amore con amore si paga | amor con amor se paga | attested | Exact twin, freebie. |
| 30 | (Il) cuore non invecchia | — | attested | Book drops the article. Adjacent to banked 0088/0276 — check saturation. |
| 31 | Il primo amore non si scorda mai | el primer amor nunca se olvida | attested | ⚑ *Scordare* is literally *un-heart*, from *cuore*. That etymology is the entry. |
| 32 | Matrimonio e melone, non si sa mai come sono | — | form? | Widely attested form is *la moglie e il melone* — about the **wife**. The book's version may be a sanitised rewrite; if the real form is the sexist one, handle as L567. |
| 33 | L'amore passa, la fame resta | — | doubtful? | — |
| 34 | Chi troppo ama troppo soffre | — | doubtful? | — |
| 35 | Amore vecchio non fa buon brodo | — | **INVERTED** | Attested: *amore vecchio non fa **ruggine***, meaning the opposite — old love endures. Confirmed 2026-08-30. "Buon brodo" appears imported from *gallina vecchia fa buon brodo* (L557). Do not draft the book's form. |
| 36 | Chi ama davvero perdona | — | doubtful? | — |
| 37 | L'amore vuole amore | — | doubtful? | — |
| 38 | Chi ama bene, ama poco | — | doubtful? | Self-contradicting: the book glosses *ama poco* as "loves wisely". It means *loves little*. |
| 39 | L'amore è come il fuoco | — | doubtful? | Generic simile. |
| 40 | Chi ama troppo dimentica sé stesso | — | doubtful? | — |
| 41 | Chi lavora mangia | — | doubtful? | Duplicate of #59. |
| 42 | Il lavoro nobilita l'uomo | el trabajo dignifica | attested | ⚑ Register warning: used ironically in Italian, usually with a joking completion, and sits close to slogans best not evoked. The irony must be in the entry. |
| 43 | Senza fatica non si ottiene nulla | — | doubtful? | — |
| 44 | Chi più spende meno spende | — | **logged** | L160 |
| 45 | Il pane quotidiano non cade dal cielo | — | doubtful? | — |
| 46 | Chi ha (un) mestiere non muore di fame | el que tiene oficio no pasa hambre? | attested | Attested with the article in most sources. ES sketch unverified. |
| 47 | Il lavoro fatto bene si paga due volte | — | doubtful? | — |
| 48 | Chi non risparmia spreca | — | doubtful? | — |
| 49 | Il guadagno facile dura poco | — | doubtful? | — |
| 50 | Chi dorme non guadagna | — | **logged** | Variant of banked 0051 (*chi dorme non piglia pesci*). |
| 51 | Il bisogno aguzza l'ingegno | la necesidad agudiza el ingenio | attested | Near-exact, cognate for cognate. Thin. |
| 52 | Chi troppo risparmia nulla gode | — | doubtful? | — |
| 53 | Chi fa da sé fa per tre | — | **logged** | L213 |
| 54 | A lavoro finito si conta il guadagno | — | doubtful? | — |
| 55 | Chi vive sperando muore lavorando | — | form? | Attested is *chi di speranza vive, disperato muore*. The colloquial completion of *chi vive sperando…* is vulgar, not *lavorando* — book's form looks bowdlerised. |
| 56 | Il lavoro non manca mai | — | doubtful? | — |
| 57 | Chi ha fretta perde tempo | vísteme despacio que tengo prisa | form? | ⚑ Weak form. Draft *la gatta frettolosa fa i gattini ciechi* instead — the hurried cat's kittens are born blind. Against the Spanish, that's a strong entry: IT shows the damage, ES the paradox. |
| 58 | Il lavoro duro forma il carattere | — | doubtful? | — |
| 59 | Chi non lavora non mangia | el que no trabaja no come | attested | ⚑ Politically loaded both sides — biblical, later a state slogan in more than one regime, and in Italy the setup for a famous song lyric. Confirm neutral current use. |
| 60 | Il mestiere fa l'uomo | — | doubtful? | — |
| 61 | L'appetito vien mangiando | — | **logged** | L114 |
| 62 | A tavola non si invecchia | — | attested | ⚑ No ES twin — Spanish put this value into a noun instead, *sobremesa*. A proverb against a word is a good card. Contradicted by the book at #71. |
| 63 | Buon vino fa buon sangue | — | attested | Register risk: reads as endorsing drinking. |
| 64 | A stomaco pieno si ragiona meglio | — | doubtful? | — |
| 65 | Dove c'è gusto, non c'è perdenza | — | attested | Colloquial. *Perdenza* is rare enough to need glossing. |
| 66 | In vino veritas | — | **logged** | L626 (as *la verità è nel vino*). ⚑ The book prints the **Latin** as the Italian entry. |
| 67 | A bocca asciutta non si canta | — | form? | Usually *a gola asciutta*. |
| 68 | Chi mangia solo si strozza | — | form? | Attested is *chi mangia solo, crepa solo* — dies alone, not chokes. The softening removes the point. |
| 69 | Buono come il pane | — | **logged** | Closed by banked 0275 (*essere un pezzo di pane*). |
| 70 | Il troppo stroppia | lo poco agrada y lo mucho enfada | attested | Both sides rhyme internally — check whether that's real or coincidence. Printed twice by the book (see #114). |
| 71 | A tavola si invecchia bene | — | doubtful? | Contradicts #62, which is the attested one. |
| 72 | Chi beve solo acqua ha qualcosa da nascondere | — | attested | A joke saying; register flag. |
| 73 | Non tutte le ciambelle riescono col buco | — | **logged** | L339 |
| 74 | Buon vino non ha bisogno di frasca | el buen paño en el arca se vende | attested | Both say quality needs no advertising via a dead commercial custom — the *frasca* was the branch hung out to signal a wine seller. |
| 75 | Chi ha pane non ha denti | — | **logged** | L595 (fuller chiastic form). |
| 76 | Pane al pane, vino al vino | — | **logged** | L266 |
| 77 | Dopo il dolce viene l'amaro | — | doubtful? | — |
| 78 | Non si vive di solo pane | no solo de pan vive el hombre | attested | Both Matthew 4:4 — shared ancestor. ES keeps *el hombre*, IT drops it; that asymmetry is the entry. |
| 79 | A buon intenditor poche parole | — | **logged** | L109 |
| 80 | Meglio un uovo oggi che una gallina domani | — | **banked 0052** | — |
| 81 | La fortuna aiuta gli audaci | la fortuna favorece a los audaces | attested | Both from Virgil's *audentes fortuna iuvat*. IT *aiuta* vs ES *favorece* — a real difference in what fortune does. Duplicated by the book at #88. |
| 82 | La fortuna è cieca | la suerte es ciega | attested | Confirmed attested 2026-08-30. Banked 0230 already covers the *fortuna/suerte* split, which is the better observation — check saturation. |
| 83 | La fortuna gira | — | form? | ⚑ **My discard was wrong.** *La ruota della fortuna gira* is attested; the book printed a shortened form. Draft the wheel form. |
| 84 | Ogni medaglia ha il suo rovescio | toda moneda tiene dos caras | attested | IT names only the *reverse*; ES counts *two faces*. Verify equivalence before pairing. |
| 85 | Il destino fa le carte | — | doubtful? | ⚑ Recheck — luck-chapter discards are unreliable, see header. |
| 86 | Il caso ci vede benissimo | — | doubtful? | ⚑ Recheck. Note *la fortuna è cieca ma la sfiga ci vede benissimo* is an attested modern comic variant — the book may have mangled it. |
| 87 | La fortuna è come il vetro: quando brilla, si rompe | — | doubtful? | ⚑ Recheck. |
| 88 | La fortuna bacia chi osa | — | doubtful? | Duplicates #81. |
| 89 | Il fato è beffardo | — | doubtful? | ⚑ Recheck. |
| 90 | La sorte è capricciosa | — | doubtful? | ⚑ Recheck. |
| 91 | Il destino è scritto | — | doubtful? | ⚑ Recheck. |
| 92 | Il caso governa metà della vita | — | doubtful? | ⚑ Recheck. |
| 93 | La fortuna va e viene | — | doubtful? | ⚑ Recheck — *buona fortuna non dura* is attested and adjacent. |
| 94 | La fortuna va aiutata | a la suerte hay que ayudarla | attested | Likely the IT half of *aiutati che il ciel t'aiuta*, which is better attested — draft that instead. |
| 95 | Il destino sa essere ironico | — | doubtful? | ⚑ Recheck. |
| 96 | Non tutto è scritto | — | doubtful? | ⚑ Recheck. |
| 97 | La fortuna arriva quando meno te l'aspetti | — | doubtful? | ⚑ Recheck. |
| 98 | Il caso fa scherzi strani | — | doubtful? | ⚑ Recheck. |
| 99 | La fortuna è donna | — | attested | ⚑ Machiavelli, *Il Principe* ch. 25 — a literary quotation, not folk, and its original context is about mastering fortune by force. Decide how to handle before shipping. |
| 100 | La fortuna non guarda in faccia nessuno | — | attested | Verify. |
| 101 | Ognuno tira l'acqua al suo mulino | cada quien arrima el ascua a su sardina | attested | ⚑ **Top find.** Same accusation of self-interest, each language using its own domestic scene: IT diverts the millstream, ES drags the ember under its own sardine. Neither guessable from the other. Confirm ES currency in MX. |
| 102 | L'abito non fa il monaco | — | **banked 0299** | ⚑ And the book's description falls into the exact trap 0299 teaches. |
| 103 | Dalle parole si conoscono gli stolti, dai fatti i saggi | — | form? | Reads assembled; overlaps #110. Attested neighbour is *dai frutti si conosce l'albero*. Pick one of the three. |
| 104 | Chi nasce tondo non muore quadrato | genio y figura hasta la sepultura | attested | ⚑ Very strong. IT makes geometry of it — born round, won't die square. ES rhymes character with the grave. Same claim, shape against rhyme. Adjacent to #143. |
| 105 | L'invidia è una brutta bestia | la envidia es mala consejera | attested | IT makes envy an ugly animal, ES a bad advisor. Verify the IT is fixed. |
| 106 | L'orgoglio precede la caduta | quien mucho sube, más alto cae | form? | ⚑ Proverbs 16:18 in English dress. The Italian proverb is *la superbia va a cavallo e torna a piedi* — pride rides out and walks home. **Draft that instead**; it pairs far better. |
| 107 | La pazienza ha un limite | — | doubtful? | — |
| 108 | L'apparenza inganna spesso | — | doubtful? | Weakened duplicate of #13. |
| 109 | Chi parla troppo, poco conclude | — | doubtful? | — |
| 110 | Dai fatti si conosce l'uomo | obras son amores y no buenas razones | attested | ⚑ If both hold, good: ES is pointed — deeds are love, *not fine words* — and names the rival explicitly. Verify the IT form. |
| 111 | Non tutti sono uguali | — | doubtful? | — |
| 112 | Le persone cambiano poco | — | doubtful? | — |
| 113 | Chi si loda, s'imbroda | — | attested | Rhymes (loda/imbroda). ES has no fixed rhyming twin — the asymmetry is the entry, same shape as #25. |
| 114 | Il troppo stroppia | — | **duplicate** | Verbatim repeat of #70. |
| 115 | Chi ha orecchie per intendere, intenda | el que tenga oídos para oír, que oiga | attested | Biblical, shared ancestor. ES doubles the ear verb; IT doesn't. |
| 116 | Il silenzio è d'oro | en boca cerrada no entran moscas | attested | ⚑ Strong divergence. IT values silence abstractly (half of *la parola è d'argento…*); ES gives a concrete, comic reason: flies. Decide half-form vs full form. |
| 117 | Chi ha la coscienza pulita dorme tranquillo | quien nada debe, nada teme | attested | ES shifts from conscience to debt — possible divergence. |
| 118 | Non tutti i mali vengono per nuocere | — | **duplicate** | Repeat of #10. |
| 119 | Chi non sa, parla | — | doubtful? | — |
| 120 | L'abitudine è una seconda natura | la costumbre es otra naturaleza | attested | Both from Cicero's *consuetudo altera natura*. Thin unless register differs. |
| 121 | Ride bene chi ride ultimo | — | **logged** | L260 |
| 122 | Chi tace, acconsente | quien calla, otorga | attested | ⚑ **Top find.** Near-exact twin with one real difference: ES *otorga* is a legal verb — to grant, to bestow, used of wills and deeds. Spanish makes silence a formal act; Italian just calls it consent. |
| 123 | Chi è senza peccato scagli la prima pietra | el que esté libre de pecado que tire la primera piedra | attested | John 8:7, shared ancestor. *Tirar* vs *scagliare* (hurl — more violent). |
| 124 | Chi fa il furbo resta fregato | — | attested | *Furbo* is culturally loaded enough to deserve an entry of its own. Register check: *fregato* sits near the edge. |
| 125 | Chi ha paura di sbagliare non fa nulla | — | doubtful? | — |
| 126 | Chi guarda il dito perde la luna | — | form? | Usual Italian is *quando il saggio indica la luna, lo stolto guarda il dito* — longer, better attested, has the sage in it. |
| 127 | Chi è troppo buono, viene fregato | — | doubtful? | Duplicates #124's frame. |
| 128 | Chi non risica, non rosica | — | **banked 0054** | — |
| 129 | Chi crede a tutti, resta deluso | — | doubtful? | — |
| 130 | Chi promette troppo, mantiene poco | — | doubtful? | — |
| 131 | Chi cerca scuse, trova scuse | — | doubtful? | — |
| 132 | Chi dice sempre la verità non ha amici | — | doubtful? | — |
| 133 | Tanto rumore per nulla | — | form? | ⚑ This is the Italian **title of Shakespeare's *Much Ado About Nothing***. It is used idiomatically, but any entry must say where it comes from. |
| 134 | Il bue che dice cornuto all'asino | el burro hablando de orejas | attested | ⚑ **Top find.** Funnier than the English pot and kettle: the ox calls the donkey horned, when the ox has horns; the donkey talks about ears. Both accuse the accuser using the accuser's own anatomy. Check *dijo la sartén al cazo* as the ES alternative. |
| 135 | Di buone intenzioni è lastricata la via dell'inferno | el camino al infierno está empedrado de buenas intenciones | form? | English-origin proverb imported into both. Two translations of a third language's proverb is a weak pair. |
| 136 | Non c'è peggior sordo di chi non vuol sentire | no hay peor sordo que el que no quiere oír | attested | Exact twin, freebie. IT *sentire* vs ES *oír* — and ES also has *escuchar*; which the proverb takes is worth a line. |
| 137 | Due pesi e due misure | — | **logged** | L320 |
| 138 | Mettere i puntini sulle i | poner los puntos sobre las íes | attested | Near-exact — both dot the same letter; ES pluralises it. ⚑ Ignore the book's description, which is wrong. |
| 139 | Chi va con lo zoppo impara a zoppicare | — | **logged** | L632. ⚑ Register flag already standing. The book prints this one with "(CORRETTO)" in the heading. |
| 140 | Guardare il pelo nell'uovo | — | **banked 0022** | ⚑ Banked with the correct verb, *cercare*. The book's *guardare* is wrong. |
| 141 | Chi è causa del suo mal, pianga sé stesso | — | attested | Old and formal. ES sketches found so far are colloquial and mismatched — may end up unpaired. |
| 142 | Meglio solo che male accompagnato | más vale solo que mal acompañado | attested | Exact twin, freebie. Both use the *meglio/más vale* comparative frame. |
| 143 | Il lupo perde il pelo ma non il vizio | — | **banked 0302** | Adjacent to #104 — same lesson, check saturation. |
| 144 | Tra il dire e il fare c'è di mezzo il mare | — | **banked 0301** | — |
| 145 | Non è tutto oro quel che luccica | — | **banked 0300** | — |
| 146 | Chi troppo vuole, nulla stringe | — | **logged** | L211 |
| 147 | Il tempo è galantuomo | el tiempo pone a cada uno en su lugar | attested | ⚑ Italian personifies time as a *gentleman* — courteous, fair, unhurried. Spanish has no equivalent personification. Also the real proverb the book invented a rival for at #3. |
| 148 | A pensar male si fa peccato, ma spesso si indovina | — | attested | ⚑ **My earlier note was wrong.** Not a modern Andreotti coinage. It belongs to Pius XI, reached Andreotti in 1939 via Cardinal Marchetti Selvaggiani, and Carlo Gozzi cites it as already proverbial in *La Zobeide* (18th c.). Still a good candidate — no ES twin known — but the provenance line has to be right. |
| 149 | I nodi vengono sempre al pettine | — | **logged** | L659. ⚑ The book's English reverses it: knots reaching the comb is a reckoning arriving, not a resolution. |
| 150 | La verità viene sempre a galla | la verdad siempre sale a flote | attested | Adjacent to #149 — decide which truth-surfaces proverb to run. |

**Tally: 29 already in bank or queue · 3 duplicates or inversions · 12 needing a corrected
form · 44 marked attested · 62 marked doubtful (unverified — see header).**

---

## @ines.tutoring — food idiom carousel (2026-09-13)

Tier A account (same source as the 19-item binomial set). Eleven items, all food-based.
Two are already banked and three are queued; **six are new and clear to draft.**

The set is unusually coherent: it is one semantic field (kitchen and table) used to judge
*people* — fool, clumsy, airhead, sensible, good-hearted. Worth considering as a themed
run rather than six scattered entries.

| Italian | Gloss (source) | Spanish / sketch | Status |
|---|---|---|---|
| Essere un salame | to be a fool | ser un merluzo | **new** — ⚑ IT reaches for cured meat, ES for a *hake*. Cold cuts against fish. Confirm the ES is current in MX; *merluzo* may read Peninsular, and MX may prefer *ser un tapado*. |
| Acqua in bocca! | keep it secret | punto en boca | queued **L305** — water vs stitch, same mouth |
| Liscio come l'olio | smooth as silk | como la seda | **new** — IT measures smoothness by oil, ES by silk. Kitchen against loom; the English gloss happens to match the Spanish, which is a nice thing to point out. |
| Sano come un pesce | fit as a fiddle | más sano que una pera | **new** — ⚑ Strong. IT picks a fish, ES a pear, English a fiddle. Three languages, three unrelated images, one meaning. Check *como un roble* as the ES alternative. |
| Tutto fa brodo | every little bit helps | todo suma | queued **L363** — flagged there as a weak fixed twin |
| Essere una patata | to be a bit clumsy | — | **new** — ⚑ **Register check before anything else.** *Patata* carries a vulgar anatomical sense in parts of the Spanish-speaking world. Establish that before drafting, and the ES side may need to avoid the cognate entirely. |
| Pieno come un uovo | stuffed to the brim | hasta los topes | **new** — IT fills an egg, ES hits the stops. Note *un uovo* also appears in banked 0022 (*cercare il pelo nell'uovo*) and #80 of the proverb book — the egg is getting crowded. |
| Essere una zucca vuota | to be an airhead | ser un cabeza hueca | **new** — see below |
| Avere sale in zucca | to have common sense | tener dos dedos de frente | **banked 0050, approved** |
| Fare una frittata | to make a mess of things | — | queued **L668**, inside the four-item group still awaiting a decision |
| Essere un pezzo di pane | to be a good person | ser un pedazo de pan | **banked 0275, needs_review** |

### ⚑ The zucca problem — and the better card hiding inside it

*Essere una zucca vuota* and banked **0050** (*avere sale in zucca*) are the same noun with
opposite verdicts: the head as a gourd, either salted or hollow. Under the
no-cross-reference rule, a *zucca vuota* card would have to explain *zucca* = head from
scratch, duplicating work 0050 already did. That is the euphemism-cluster problem again.

But there is a sharper entry available than either. Spanish has the same gourd —
*calabaza* — and puts it to a completely different job: **dar calabazas** means to reject
a suitor, or to fail someone in an exam. So the pumpkin exists in both languages as a
metaphor and lands nowhere near the same place: Italian makes it your skull, Spanish makes
it a rejection. That is a real false-friend axis, it is not covered by 0050, and it would
justify its own card rather than a sibling of one.

**Recommend:** verify *dar calabazas* (RAE, and MX currency), then decide between the
weak sibling and the strong false friend. Not both.

---

## Instagram intake, 2026-10-11 — four accounts

Four sources in one batch, at three different tiers:

- **@learnandloveitalian** — 14-card month-by-month calendar carousel. **Tier A** (the
  Italian reviewer's own account).
- **@dailyitalianwithelena** — 8-card carousel, each idiom with an ORIGINE panel and an
  example. **Tier C**, new to the queue. Better made than most Tier C: it gives
  etymology and a worked example rather than a one-line gloss. Still not a citation.
- **@kamithepolyglot** — EN→IT "idiom vs modern" cards. **Tier C**, and structurally
  the wrong shape: these are English-anchored, so the Italian is a translation target
  rather than a native starting point. Mine for Italian halves only.
- **@italianteachertony** — 12-card "Latin phrases that still live in Italian", 10 legible.
  **Tier C**, a suggested (not followed) account, but the best-sourced Tier C seen so far:
  every card names its classical source (Terence, Virgil, Seneca, Caesar) and several
  check out. See the Latin section below — the set is worth more as a pattern than as
  ten entries.

### ⚑ The Tier A carousel is largely mined out — and that is the useful finding

Of the six legible cards from @learnandloveitalian, **three are already banked and two
are already queued.** Only *rompere le scatole* is unresolved, and it is unresolved for a
reason that has nothing to do with this carousel.

| Card | Status |
|---|---|
| Avere le mani bucate | **banked 0071, approved** (↔ *ser un manirroto*) |
| Non sapere che pesce prendere | **banked 0073, approved** (↔ *no saber a qué carta quedarse*) |
| Avere le fette di salame sugli occhi | **banked 0096, approved** (↔ *tener telarañas en los ojos*) |
| Sudare sette camicie | queued **L297** (↔ *sudar la gota gorda*) |
| Avere un diavolo per capello | queued **L164** (↔ *echar chispas*) |
| Rompere le scatole | queued **L247** — ⚑ euphemism cluster, still undecided |

An independent Tier A source and the bank agreeing on five of six is a real validation
signal: the bank's selection instincts match what a native teacher picks for a calendar.
It also means this particular carousel has little left to give. **Worth checking the
remaining eight cards of the 14 against the bank before photographing more of it.**

**The euphemism cluster is now blocking a Tier A card.** *Rompere le scatole* has been
sitting at L247 since the cluster question was raised, and that question is still the
same three options: pick ONE of the four as the euphemism entry and drop the rest; bank
them as ordinary entries and let the euphemism go unremarked; or treat the pattern as
the entry, which the schema has no shape for. This is the second batch in a row where
new material has landed on it. **Recommend deciding it before the next intake.**

### A — new, attested, worth researching

| Italian | Spanish / sketch | Source | Note |
|---|---|---|---|
| Menare il can per l'aia | irse por las ramas | elena (C) | ⚑ **Best of this batch.** Both refuse to get to the point, and both picture it as going the wrong way round something. Italian walks a dog in circles on a threshing floor — a working image that stopped being legible when threshing floors went; Spanish climbs off the trunk into the branches. Elena's origin panel (oxen threshed, a dog doing it is pure useless wandering) is the explanation the card would need — **write it fresh, do not reuse her wording.** |
| Conosco i miei polli | sé de qué pie cojea | elena (C) | ⚑ **Form correction before drafting.** The card gives the infinitive *conoscere i propri polli*; the living, attested form is first-person — **conosco i miei polli** — and that is how it is actually said. Same class of error as the book's *guardare* for banked 0022's *cercare*. Confirmed attested 2026-10-11. The ES sketch shifts the metaphor from livestock to a limp; check *conocer el paño* and MX alternatives before settling. |
| Per me è arabo | está en chino / me suena a chino | kami (C) | ⚑ **Strong, and bigger than a pair.** Each language names a different language as the unintelligible one: Italian says Arabic, Spanish says Chinese, English says Greek. The card shows the IT↔EN half by accident; the ES↔IT axis is the one the bank wants. Confirm *está en chino* is the MX-current form (it is common there, but verify) and check whether Italian also has *per me è ostrogoto*, which would give a register ladder inside the Italian side alone. |

### B — attested but needs a decision first

| Italian | Issue |
|---|---|
| Avere la coda di paglia | Already queued at **L565** from the Consonni book, where the note already flags that ES *tener rabo de paja* exists in some varieties. Elena's card adds the origin (a fox with a straw tail keeping clear of fire) and an example. **No new row needed** — but this is now double-sourced, and the ES twin is close enough that it may be a near-freebie. Worth promoting in the queue. |
| Ho fatto un casino / ho combinato un guaio | Collides with **L251** (*sono nei casini*), which already carries the register flag on *casino*. Same word, same problem. Resolve L251 first rather than adding a second row. |

### C — the Latin set: one entry, not ten

Ten of Tony's twelve cards are legible. Listed with the Italian rendering he gives and
whether that rendering is a **living Italian expression** or **a translation made for the
card** — which is the distinction that matters here:

| Latin | Italian given | Living Italian? | Classical source cited |
|---|---|---|---|
| Carpe diem | Cogli l'attimo | **living** | Horace (implied) |
| Dum spiro, spero | Finché c'è vita, c'è speranza | **living** — queued **L111** | — |
| Facta, non verba | Contano i fatti, non le parole | **living** | — |
| Audentes fortuna iuvat | La fortuna aiuta gli audaci / chi osa | **living** — proverb book **#81** | Virgil, *Aeneid* X (Turnus) |
| Fortis fortuna iuvat | La fortuna aiuta i forti | marginal | Terence, *Phormio* |
| Veni, vidi, vici | Venni, vidi, vinsi | translation — Italians say the Latin | Caesar, Zela 47 BC |
| In hoc signo vinces | Con questo simbolo vincerai | translation — stays Latin | Constantine, Milvian Bridge 312 |
| Per aspera ad astra | Superando le difficoltà, si arriva in alto | translation — stays Latin | Kansas motto (1861) |
| Non ducor, duco | Non mi lascio guidare: sono io a guidare | translation — stays Latin | São Paulo arms (1917) |
| Aut viam inveniam aut faciam | Un modo lo troverò, o lo creerò | translation — stays Latin | Seneca, *Hercules Furens* |

**⚑ The pattern is the entry, and it is sharper than it first looked.** The Latin tags that
went native in Italian are the ones that are *proverbs about ordinary life* — seize the
day, where there's life there's hope, deeds not words, fortune favours the bold. The ones
that stayed Latin are all *mottoes*: a battle standard, a general's dispatch, a city's
coat of arms, a state seal. Italian absorbed the folk wisdom and left the heraldry in
Latin.

**And the same test can be run on Spanish, which is what makes it a bank entry rather
than a trivia card.** Spanish nativized the same folk-wisdom tags — *mientras hay vida
hay esperanza*, *obras son amores y no buenas razones*, *la fortuna favorece a los
audaces* — and likewise keeps the mottoes in Latin. If that holds, the two languages
made the *same* choice, and the interesting residue is where they differ: ***carpe diem*
appears to be the standout, nativized in Italian as *cogli l'attimo* but normally left in
Latin in Spanish.** One card, built on that asymmetry.

**Verify before building:** (a) that *carpe diem* really is the ordinary Spanish form with
no nativized twin; (b) that *cogli l'attimo* is as current in Italian as it appears;
(c) that *contano i fatti, non le parole* is fixed rather than Tony's phrasing — the
bare *fatti, non parole* is the better-attested form.

⚑ **Correction, now settled.** The proverb-book row #81 (*La fortuna aiuta gli audaci*)
says "both from Virgil's *audentes fortuna iuvat*." That was over-specific, and this
carousel proves it from the inside: **Tony runs *Audentes Fortuna Iuvat* and *Fortis
Fortuna Iuvat* as two separate cards with two different classical sources** — Virgil's
*Aeneid* X and Terence's *Phormio*. Both tags are independently transmitted and Terence's
is earlier. Verified 2026-10-11. The bridge note on #81 must not claim a single ancestor,
and the two Italian renderings (*gli audaci* / *chi osa* vs *i forti* / *chi ha coraggio*)
need a reviewer to say which is current.

⚑ **New cluster forming around deeds-vs-words.** *Facta non verba* now joins proverb-book
**#110** (*Dai fatti si conosce l'uomo*) and **#103** (*Dalle parole si conoscono gli
stolti, dai fatti i saggi*), all three competing for the same Spanish anchor, *obras son
amores y no buenas razones*. Three Italian expressions, one Spanish side. **Same shape as
the euphemism cluster — decide once, before drafting any of them.**

**Batch yield: 3 already banked · 4 already queued · 3 new and worth researching · 1 pattern
entry to verify · 1 correction settled · 1 new cluster flagged.**

---

## @howtospanish — Mexican slang carousel (2026-10-13)

**Tier C.** 7 of 9 cards legible. **None of the seven is in the bank or the queue** — this
is the first batch in a while with no duplicates at all.

⚑ **But read the queue direction before drafting any of them.** Measured against the
repo's current `CANDIDATES.md`:

| Unpaired rows | count |
|---|---|
| Italian expression waiting for a **Spanish** half | **48** |
| Spanish expression waiting for an **Italian** half | **1** |

The queue's gap is Spanish halves for *specific* Italian expressions already logged —
mostly from the Consonni book. These seven are new **Spanish** expressions, each of which
opens its own unpaired row needing an Italian half found from scratch. They do not fill
the 48, and they are the hardest kind to pair: MX-pinned slang, where the Italian
equivalent is usually a plain verb rather than an idiom.

Combined with the 2026-10-11 audit finding — 102 finished cards blocked at native review,
rotation at 2.9 cycles/year — **this batch is good material at low priority.** Log it,
don't draft it yet.

### The seven

ES sides are from the cards. **Every Italian sketch below is Claude's, unverified, and
carries the known error rate** — treat as a starting point for Stage 0, never as a pair.

| Spanish (MX) | Literal | Means | Italian sketch — UNVERIFIED | Assessment |
|---|---|---|---|---|
| Se me fue el avión | the plane left me | brain checked out, missed it entirely | *sono andato in tilt* | ⚑ **Best of the batch.** Both are machine-age images for a mental blank: ES a plane departing without you, IT a pinball machine going *tilt* and freezing. Two 20th-century machines, same failure. If *andare in tilt* checks out this is a strong card. |
| No te agüites | don't become watery | don't get discouraged | *non ti buttare giù* / *non ti abbattere* | ⚑ Good axis if it holds: ES **liquefies** under discouragement, IT **falls down**. Confirm *agüitarse* is current MX and not dated. |
| Hazme un paro | make me a stop | I need a favour | *dammi una mano* | Workable: an opaque MX idiom against a transparent body idiom. The asymmetry (idiom vs plain phrase) may be the entry, or may make it too thin. |
| Da el gatazo | it gives the "cat-ness" | passes as legit, convincing enough to fool | *fare la sua figura* | ⚑ **Collides with the figura cluster** — banked **0010**, queued **L186**, Consonni **#4** (*fare la figura del cioccolataio*). That cluster was already flagged "do NOT draft standalone — resolve the whole figura family first." This is a fourth member. |
| Está bien perro | it's very dog | awesome **or** difficult, by context | *è tosto* | ⚑ The **valence flip is the entry**, not the dog. An intensifier that means both "great" and "brutal" depending on context is a real trap, and IT *tosto* swings similarly. Worth researching for that alone. |
| Está con madre | it's with mother | it's freaking awesome | *è una figata* | ⚑ **Register.** A *madre* construction — the bank already carries a vulgar-register flag on 0005, 0008, 0026, 0068, 0105, and **0068** (*¡Madre mía!*, `draft`) is the adjacent card. The register-matched Italian is also vulgar-adjacent. Not exam-safe on either side. |
| Que se arme | let it assemble itself | let's make it happen; enough talking | (none found) | Weakest. No Italian idiom found with the same shape; the natural IT is a plain exhortation. Likely unmatched. |

### Two standing flags this batch touches

**The `formality: ok_in_exam` shelf.** Two of the seven (*está con madre*, *está bien
perro*) are not exam-safe, and a third (*hazme un paro*) is informal-only. The audit found
only **2 difficulty-4 entries in 231** — the hard shelf is nearly empty — but hard is not
the same as unshippable slang. These add to the colloquial pile, not the advanced one.

**The figura cluster is now four.** *Da el gatazo* joins banked 0010, L186 and Consonni #4.
That makes **three** unresolved clusters: euphemism (4 members), deeds-vs-words (3), figura
(4). All three are one editorial sitting, no research, and all three now block draftable
rows.

---

## @learnandloveitalian — slang calendar, 2nd series (2026-10-14)

**Tier A** (the Italian reviewer's own account). 12 of 14 cards legible. **All twelve are
new — no collisions with bank or queue.**

⚑ **Correction to the 2026-10-11 entry above.** That section called the Tier A carousel
"largely mined out" and suggested checking "the remaining eight cards of the 14." That was
wrong in one respect: this account runs **more than one** 14-card month calendar. The
October 11 series was idioms (*avere le mani bucate*, *sudare sette camicie*…); this is a
separate series on contemporary spoken register. The idiom series is mined out; **the
account is not.** Expect further series.

### Why this batch is different from everything else in the queue

The bank is 117 idioms, 46 collocations, 34 markers, 25 proverbs, 9 formulas — overwhelmingly
*fixed figurative language*. These twelve are none of that. They are **contemporary spoken
and texting register**: bare exclamations, clipped vocatives, one-word verdicts. Several
cards are literally screenshots of WhatsApp threads.

That is a layer the bank does not currently have, and arguably the layer a learner hits
first in real conversation. It is also the layer that **dates fastest**, which creates a
problem specific to this material and no other:

**⚑ The rotation makes perishability a real risk.** `schedule.mjs` cycles at ~2.9×/year, so
a card posted today reappears in roughly 127 days and again around 254. Slang current in
October 2026 may read stale on its third showing. Two of these (*Top!*, *Che trash!*) are
English borrowings, the most volatile category of all. **Before drafting any of them,
decide whether this register gets a currency re-check interval** — the schema has
`pin` / `pinWindow` / `season`, but nothing that says "re-verify this is still said."

**Type decision needed first.** Are these `marker` or `formula`? `formula` was retired for
v1 and then recovered (0070, 0100, 0110). Several here (*Adoro*, *Top*, *Palese*) are bare
interjections rather than discourse markers. The answer changes how they hit the
composition gates, and "discourse" is already the bank's largest theme at 24.

### The twelve

**Every Spanish sketch below is Claude's, unverified, with the known error rate.** MX forms
proposed because the product's anchor is Mexican Spanish.

| Italian | Card's gloss | Spanish sketch — UNVERIFIED | Assessment |
|---|---|---|---|
| Amo | Babe! Bestie! | *(see note)* | ⚑ **Best of the batch, and it is a false friend.** Italian *amo* here is a clipped vocative from *amore* — what you call a friend in a text. Spanish ***amo*** is a noun meaning **master / owner** (and the 1sg of *amar*). A Spanish speaker reading the card's own screenshot, "Ok amo," sees *"OK, master."* This is exactly the trap class the product exists for. The ES side is not a translation but a register equivalent — *amiga*, *reina*, MX *mija* — and picking it is a reviewer call. |
| Che disagio! | So awkward! | ¡Qué oso! (MX) | ⚑ **Very strong.** Italian reaches for an **abstract noun** — *disagio*, discomfort, unease. Mexican Spanish reaches for a **bear**. Identical use, opposite levels of abstraction, and the MX form is vivid and unguessable. |
| Anche meno! | Tone it down! | ¡Bájale! (MX) | ⚑ Strong. Italian understates — literally *"even less"*, a litotes used as a reprimand. Spanish gives a plain imperative, *lower it*. Indirection against directness, same job. |
| Che sbatti! | What a hassle! | ¡Qué flojera! (MX) | ⚑ Good divergence: Italian names **the effort** (*sbatti*, the hassle itself); MX names **the reluctance to make it** (*flojera*, the laziness). Opposite ends of the same transaction. |
| Palese! | Obviously! | ¡Obvio! (MX) | Both truncate an adjective into a standalone one-word verdict. Near-twin in behaviour, different word — a clean, low-risk card. |
| Adoro! | I'm obsessed! | ¡Me encanta! | ⚑ Grammar asymmetry is the entry: Italian uses the bare verb **absolutely**, with no object and no pronoun — *Adoro.* Spanish cannot, and needs the dative construction *me encanta*. A Spanish speaker's instinct produces *"Adoro"* with an object, which is grammatical but not the interjection. |
| Muoio! | I'm dying! (laughing) | ¡Me muero! | Near-twin, but ⚑ Italian drops the reflexive and Spanish keeps it. Small, real, and testable. |
| Che ansia! | This is stressing me out! | ¡Qué estrés! (MX) | Workable. Italian uses the clinical-sounding *ansia* casually; check whether ES *ansiedad* can do the same or whether only *estrés* works. |
| Ma anche no! | Yeah… absolutely not! | ¡Pues no! / MX *nel* | Sarcastic refusal. The Italian's force comes from *ma anche* (but also) used ironically — hard to reproduce. May end up an asymmetry entry. |
| Mai una gioia! | Can't catch a break! | *(no fixed ES twin found)* | Attested and very current in Italian. No fixed Spanish equivalent came to mind; MX would likely use a full clause. Possible Unmatched entry. |
| Top! | Perfect! Amazing! | ¡Chido! / ¡Padre! (MX) | ⚑ **English borrowing.** The interesting fact is that Italian borrowed *top* as a bare adjective while Mexican Spanish reached for its own slang. That contrast is the card — but it is also the most perishable item here. |
| Che trash! | That's so tacky! | ¡Qué naco! (MX) | ⚑ Same borrowing pattern, and the MX equivalent carries a **class connotation** (*naco* is loaded in a way *trash* is not quite). **Register and sensitivity check before drafting** — this one could land badly. |

### What to do with it

1. **Settle the type and the currency policy first.** Both are one decision, no research,
   and both affect all twelve.
2. **Draft *Amo* first** regardless of what else happens — it is a genuine false friend,
   it is Tier A on the Italian side, and it does not depend on the slang question, because
   the Spanish *amo* = master collision is permanent.
3. *Che disagio*, *Anche meno*, *Che sbatti* next — all three have vivid MX counterparts.
4. Hold *Top!* and *Che trash!* until the currency policy exists. *Che trash* additionally
   needs the *naco* sensitivity call.

**Batch yield: 12 new · 1 false friend · 4 strong divergences · 2 held on perishability ·
1 likely unmatched.**

---

## @easyspanishwithivanna — Mexican expressions carousel (2026-10-14)

**Tier C.** 7 of 9 cards legible. **1 already queued, 6 new.**

⚑ **Source label.** Instagram marks two of these cards **"AI content"** and one "From
Spanish culture" — the platform's own generated-imagery labels. That concerns the artwork,
not necessarily the language, but after the proverb book it is worth stating the rule
plainly: **a card's confident layout is not evidence.** Every row below still needs a
dictionary.

### ⚑ One card independently confirms yesterday's sketch

Yesterday I proposed, unverified, that *Che disagio!* pairs with MX **¡Qué oso!**. This
carousel — an independent Mexican-Spanish source — carries ***¡Qué oso!*** with exactly
that gloss: *"What a bear!" → How embarrassing!*, example *"Me caí enfrente de todos."*

That is one sketch confirmed from outside. Given the one-in-three error rate recorded in
this file, it is worth logging as calibration data, not as proof: **confirmation of the
Spanish side is not confirmation of the pairing.** The IT↔ES bridge still needs a reviewer.

### ⚑ The euphemism cluster is not an Italian quirk — Spanish does it too

**¡No manches!** is already queued at **L249** (↔ *Ma dai*), where the note reads
"register care (softened *no mames*)". That is the same move the cluster is built on: a
harmless word standing in for a coarse one.

Which means the cluster now looks like this:

| Language | Euphemism | Stands in for |
|---|---|---|
| IT | non capirci un **tubo** | anatomical — banked 0310 |
| IT | non capire un **cavolo** | *cazzo* |
| IT | **rompere** / **girare** le **scatole** | *coglioni* — L247 |
| **ES** | **¡no manches!** | ***¡no mames!*** — L249 |

**This materially changes the decision that has been pending for three batches.** Treated
as four Italian expressions, the cluster was a duplication problem — four cards teaching
one lesson. Treated as a *shared strategy both languages use*, it is a single strong
bridge: both Spanish and Italian soften a vulgar expression by swapping in an innocuous
noun, and a learner needs to recognise the move in both directions. **That is one card,
and a good one** — and it resolves the "schema has no shape for it" objection, because it
is now an ordinary ES↔IT pair (*no manches* ↔ one of the Italian four) whose bridge
happens to be about euphemism itself.

Recommend: draft ***¡No manches!* ↔ *non capire un cavolo*** (or whichever Italian member
the reviewer prefers) as the euphemism entry, and retire the other three Italian members
to Unmatched rather than banking them separately.

### A — new, worth researching

**Italian sketches are Claude's and unverified unless marked otherwise.**

| Spanish (MX) | Literal | Means | Italian sketch | Assessment |
|---|---|---|---|---|
| ¡Me da cosa! | it gives me a thing | it makes me uncomfortable | *mi fa senso* | ⚑ **This one opened a better entry than itself — see below.** Both languages name the feeling with a deliberately vague noun: ES *cosa* (a thing), IT *senso* (a sense). ⚑ But the **strength differs** — *me da cosa* is squeamish unease; *mi fa senso* is closer to revulsion. Confirm the match before pairing, or pick *mi mette a disagio* instead. |
| ¡Aguas! | waters! | watch out! | *Occhio!* | ⚑ **Strong and clean.** Both are a single shouted noun used as a warning: Mexico shouts **waters**, Italy shouts **eye**. Neither is guessable from the other, both are everyday, and the grammar is identical (bare noun as interjection). Note *occhio* is already in banked 0003 in a different idiom — check saturation, but the interjection is a separate use. |
| ¡Qué padre! | what a father! | that's so cool | *Che figata!* (register flag) | ⚑ **False friend, and part of an MX family.** Spanish *padre* as "cool" has no Italian counterpart — *padre* in Italian is only the parent, so a Spanish speaker's "che padre" is nonsense in Italian. Note also that MX uses **both** *padre* and *madre* as intensifiers (cf. *está con madre*, logged 2026-10-13), which is a pattern worth one card rather than two. The register-matched Italian (*che figata*) is vulgar-adjacent; *che forte* is the safe form. |
| ¿Qué onda? | what wave? | what's up? | *Come butta?* / *Che si dice?* | Workable but thin. ES has a vivid noun (*onda*), Italian's casual equivalents are verb-based. The asymmetry may be the entry; otherwise low priority. |
| ¡Está cañón! | it's a cannon | it's really difficult | *è tosto* | ⚑ **Collides with the 2026-10-13 batch.** *Está bien perro* was logged two days ago with the same Italian sketch (*è tosto*) and the note that it means "awesome **or** difficult by context". *Está cañón* is the difficulty-only sibling. **Two MX intensifiers, one Italian anchor — this is a new cluster forming.** Decide which MX form anchors before drafting either. |
| ¡Qué oso! | what a bear! | how embarrassing | *Che disagio!* | Logged 2026-10-14 from the Italian side. ⚑ Now double-sourced — Italian from Tier A, Spanish from this Tier C card. **The strongest draft candidate across both batches.** Still needs a reviewer on the bridge. |

### ⚑ The real find: *avere senso* vs *fare senso*

Chasing the Italian for *me da cosa* surfaced something better, and it is confirmed:
Italian distinguishes

- ***avere senso*** = to make sense
- ***fare senso*** = to disgust, to revolt

These are a single-verb apart and mean completely different things, and the confusion is
common enough that Italian-teaching sources run explicit lessons on it ("how to say *it
makes sense* — and avoid saying *it's gross* by accident"). Verified 2026-10-14.

**Spanish makes this trap worse, not better.** Spanish has ***tener sentido*** = to make
sense — built with *tener*, the cognate of *avere*. So a Spanish speaker mapping
*tener sentido* → *avere senso* lands correctly, but the neighbouring *fare senso* sits
one verb away meaning something they would never intend. The interference runs in exactly
the direction the product cares about.

**Recommend drafting this as its own entry**, independent of *me da cosa*. It is a
grammar-shaped trap with a cognate anchor, both sides are dictionary-checkable, and it is
the kind of card that is useful at B1 rather than being slang that dates.

**Batch yield: 1 already queued · 6 new · 1 sketch confirmed from outside · 1 cluster
reframed (euphemism) · 1 new cluster flagged (MX intensifiers) · 1 strong new entry found
off-card (*avere/fare senso*).**

---

## @anyways.experiences — "What Italians really say" (2026-10-24)

**Tier C.** 5 of 7 cards legible. **3 new · 2 already logged from another account.**

⚑ **Source-quality note.** Three proofreading errors across five cards — *"fristrated"*,
*"funy"*, *"embarassing"*. Doesn't make the Italian wrong, but it's the same signal the
proverb book gave: no editorial pass happened. Dictionary check still required on every
row below.

### ⚑ Two cards are now double-sourced — and that partly answers the perishability worry

***Muoio!*** and ***Ma anche no!*** both appear in the @learnandloveitalian slang calendar
logged 2026-10-14. Two independent Italian accounts, ten days apart, teaching the same
items.

That matters for the open **currency question** raised in that section. The worry was that
contemporary slang might be one creator's idiolect, or already fading. Independent
double-sourcing raises confidence that these are genuinely current. **It does not settle
whether they will still be current on the third rotation pass (~254 days out)** — that
still needs the re-check policy — but it moves *Muoio* and *Ma anche no* to the front of
the slang set.

*Ma anche no* also gains a better gloss here: the card renders it *"I'd rather not" /
"not really" / "yeah, no thanks"*, which is more useful than the calendar's *"Yeah…
absolutely not!"* and closer to how the sarcasm actually lands.

### A — new rows

**Italian confirmed where stated; Spanish sketches are Claude's and unverified.**

| Italian | Literal | Means | Spanish sketch | Assessment |
|---|---|---|---|---|
| Fra / Bro | brother | dude, mate | *carnal* / *compa* / *bro* (MX) | ⚑ **Strongest here, and it completes a cluster.** Italian clips a kinship term into a vocative — *fratello → fra* — exactly as it does with *amore → amo* (logged 2026-10-14). **Mexican Spanish does both the same things:** it clips kinship (*compadre → compa*) and reaches for blood (*carnal*, literally "of the flesh"). **And both languages have separately imported English *bro*.** That is three parallel moves on one card: clipping, kinship-as-friendship, and the same English borrowing. Bank this as the vocative entry and let *Amo* be the false-friend entry — they are different lessons. |
| Sclero / sclerare | — | to lose it, freak out, get overwhelmed | *me saca de quicio* / MX *me estresa* | ⚑ **Interesting origin, and it needs a sensitivity call.** *Sclerare* is **youth slang** (confirmed — it is catalogued under *linguaggio giovanile*) built on the medical root *scler-*, from *sclerosi*. Italian turned a disease name into an everyday word for frustration. That derivation is the entry — but it is also the risk: **the bank should decide whether a condition-derived slang term ships**, the same call already standing on vulgar-register entries. Also an **age-register flag**: youth slang, not neutral colloquial. |
| Un sacco | a sack / a bag | a lot, very much | *un montón* / MX *un chorro* | ⚑ **Check saturation first — *sacco* is getting crowded.** Already banked at **0043** (*con le mani nel sacco*) and queued at **L96** (*vaciar el costal ↔ vuotare il sacco*). This would be a third. The quantifier sense is genuinely different from both, and the pairing is decent — Italian measures with a **sack**, MX with a **stream** (*chorro*), Peninsular with a **pile** (*montón*) — but three *sacco* cards in one bank is a composition question. Note also this appeared on the @kamithepolyglot card of 2026-10-11 (*"Ho un sacco di cose da fare"*), so it is double-sourced too. |

### Where this leaves the contemporary-register set

Across three batches (2026-10-14 slang calendar, 2026-10-13 howtospanish, this one) there
is now a coherent **vocative and intensifier layer** that the bank entirely lacks:

- **Vocatives:** IT *amo*, *fra*, *bro* ↔ MX *carnal*, *compa*, *mija*, *bro*
- **Intensifiers:** IT *un sacco*, *top* ↔ MX *un chorro*, *está cañón*, *está bien perro*
- **Reactions:** IT *muoio*, *che ansia*, *sclero*, *che disagio* ↔ MX *qué oso*, *me da cosa*

**This is probably two or three entries, not fifteen.** Each row above teaches the same
structural point as its neighbours, which is the duplication problem the euphemism cluster
already raised. Recommend grouping before drafting: one vocative card, one intensifier
card, one reaction card — each picking the sharpest pair and letting the rest go to
Unmatched.

**Batch yield: 3 new · 2 double-sourced confirmations · 1 sensitivity flag (*sclero*) ·
1 saturation flag (*sacco* ×3) · 1 grouping recommendation.**

---

## @learnandloveitalian — discourse expressions carousel (2026-10-27)

**Tier A** (the Italian reviewer's own account). 5 of 7 cards legible. **1 already banked,
4 new.**

⚑ **This is the durable register, and it is worth more than the slang.** Same account as
the 2026-10-14 slang calendar, but the opposite kind of material: *ci mancherebbe*,
*tanto vale*, *non c'entra* are B1–B2 workhorse discourse items that have been current for
decades and will not date. **Consequence for the currency policy proposed on 10-14: it
has to be per-entry, not per-source.** This account produces both perishable and durable
material in the same format, so a blanket "re-check anything from Instagram" rule would
either over-police these or under-police the slang.

### Already banked

***Ne vale la pena*** → **0035** (`approved`), *Valer la pena ↔ Valere la pena*. The card
adds nothing: 0035 is built on exactly the feature the card shows, the partitive **ne**,
and its example is literally *"Ne vale la pena."* Its bridge already explains that Spanish
has no counterpart for *ne* and that Spanish speakers drop it. **No action.**

### A — new, all four worth drafting

**Italian is Tier A; Spanish sketches are Claude's and unverified.**

| Italian | Means | Spanish sketch | Assessment |
|---|---|---|---|
| Ci mancherebbe altro! | Of course! / Don't mention it! — also: absolutely not! | ¡Faltaba más! | ⚑ **Best of the batch, and close to a perfect entry.** Same verb (*mancare* / *faltar*, to lack), same structure, same literal sense ("more would be lacking"), **and the same dual polarity** — both languages use it to wave away thanks *and* to refuse something flatly, with context deciding. **The trap is the mood: Italian takes the conditional (*mancherebbe*), Spanish the imperfect (*faltaba*).** A Spanish speaker reasoning from *faltaba* produces *"ci mancava altro"* — which is real Italian but means something else (a complaint: "that's all we needed"). Cognate idiom, divergent tense, live interference both directions. |
| Tanto vale… | Might as well… | *ya que…, mejor* / MX *de una vez* | ⚑ **False friend against a form the bank already teaches.** Italian *tanto vale* = resigned convenience ("might as well"). Spanish ***más vale*** = prudent warning ("better to"). Same verb, same quantifier-plus-*vale* shape, **opposite stance** — one shrugs, the other cautions. This is sharpened by the fact that *más vale* is already established in the bank at **0052** (*más vale pájaro en mano*) and queued again in the Ready list (*más vale prevenir que lamentar*). ⚑ Spanish has no tidy one-phrase equivalent for *tanto vale*, so the ES side needs the reviewer. |
| Non c'entra niente! | It has nothing to do with it! | No tiene nada que ver | ⚑ **Strong divergence on an awkward verb.** Italian uses ***entrarci*** — a pronominal verb that barely exists outside this construction, literally "to enter into it". Spanish reaches for **seeing**: *nada que ver*. Entering against seeing, for the same denial. *Entrarci* has no clean Spanish analogue and is exactly the kind of construction a Spanish speaker never produces unprompted. |
| A questo punto… | At this point / given the circumstances | A estas alturas / llegados a este punto | ⚑ Both mark a moment in a process with a spatial metaphor, but in **different dimensions**: Italian fixes a **point** on a line; Spanish (*a estas alturas*) climbs to a **height**, and pluralises it. Note Spanish also has the closer calque *llegados a este punto* — **the reviewer should pick which ES form anchors**, because the card is only interesting if the ES side is *alturas*. |

### Composition note

All four are `marker`-shaped. The bank already holds **34 markers** and "discourse" is its
**largest theme at 24**, so these push the most crowded category. That is worth accepting
here rather than elsewhere: unlike the slang batch, these are high-frequency, durable, and
three of the four carry a real trap (mood, false friend, pronominal verb). **If anything
gets cut for composition balance, cut from the slang set, not this one.**

**Batch yield: 1 already banked · 4 new, all draftable · 3 carrying genuine traps · 1
policy correction (currency must be per-entry, not per-source).**

---

## @learnandloveitalian — idiom carousel (2026-10-29)

**Tier A.** 5 of 7 cards legible. **1 variant of a banked entry · 2 euphemism-cluster
members · 2 new.**

### ⚑ The euphemism cluster is now Tier A-confirmed and should be decided

Two of the four cluster members appear in this single carousel — ***non capisci un
cavolo*** (L683) and ***non rompere le scatole*** (L247) — and the *cavolo* card states
the mechanism in its own words:

> "*Cavolo* (cabbage) is a mild substitute for a swear word, used to make the expression
> less vulgar."

That is the Italian reviewer's own account teaching the substitution explicitly. **The
cluster has been pending since August across six batches; this is the source authority it
was waiting for.** Recommend closing it now: one euphemism entry, the rest to Unmatched.

⚑ **Correction to my 2026-10-14 note.** In the @easyspanishwithivanna section I presented
"the euphemism cluster is not an Italian quirk — Spanish does it too" as a new finding.
**It was already in the queue.** L247's note has read, since the original Instagram
intake: *"BOTH languages use a mild euphemism standing in for a vulgar original — a
register entry about euphemism itself."* What was actually new on 10-14 was identifying
***no manches*** as a specific Spanish member; the general insight was logged months
earlier. The recommendation stands, but it was not mine.

### ⚑ One card is a variant of a banked entry, not a new one

***Avere il prosciutto sugli occhi*** matches banked **0096** (`approved`) —
*Avere le fette di salame sugli occhi ↔ Tener telarañas en los ojos*. Same construction,
same meaning, **different cured meat**.

Do not draft it. But it is worth a line in 0096's notes: Italian carries at least two
charcuterie variants of this idiom (*salame*, *prosciutto*), while the Spanish side reaches
for **cobwebs** — so the ES↔IT asymmetry 0096 teaches is wider than one pairing suggests.
A reviewer could say which Italian form is more current.

### A — new, both strong, and both need the card corrected first

| Italian | Card says | Spanish sketch | Assessment |
|---|---|---|---|
| Fare le corna | "to cheat on someone" | Poner los cuernos | ⚑ **Strong card, but the source conflates two senses.** *Fare le corna* is primarily the **apotropaic gesture** — the horn sign made to ward off bad luck or the *malocchio* — which is exactly what the card's hand image shows. The cuckoldry sense is normally *fare le corna **a** qualcuno* or *mettere le corna*. So the card pairs the protective-gesture image with the cheating gloss. **The real entry is better than the card:** both languages use horns for cuckoldry (*poner los cuernos* ↔ *mettere le corna*), but the **gesture diverges** — in Italy the sign is mainly protective, while making horns at someone in Spanish-speaking contexts accuses them of being cuckolded. Same symbol, opposite function. Confirm both with the reviewers before drafting. |
| Ma che faccia tosta! | "What a toasted face!" / How shameless | ¡Qué cara dura! | ⚑ **Near-exact twin — and the card's literal gloss is wrong.** *Tosto/tosta* is the ordinary Italian adjective for **hard, tough** (verified). It descends from Latin *tostus*, roasted → hardened, so "toasted" is the etymological ancestor, **not the modern sense** — and the card's toast image teaches the folk reading. Against Spanish ***cara dura***, the pair is near-exact on the real sense: both call a shameless person **hard-faced**. Write the literal gloss as *hard face*, and the *tostus* history belongs in the bridge, where it is genuinely interesting, not in the gloss. |

### ⚑ Pattern worth naming: Tier A is reliable on usage, not on etymology

This is the **second Tier A card this month with a content error**. The first was
*conoscere i propri polli* (2026-10-14), where the citation form was given in the
infinitive when the living form is first-person *conosco i miei polli*. Now *faccia tosta*
is glossed from a folk etymology, and *fare le corna* is paired with the wrong image.

None of these makes the account a bad source — **what Italians actually say is exactly what
Tier A is for**, and this carousel supplied the euphemism confirmation that six batches of
Tier B and C could not. But the standing rule should be stated: **take the expression from
Tier A, take the gloss and the etymology from a dictionary.** That is already how the
process treats Tier B and C; it applies here too.

**Batch yield: 1 variant (note on 0096, do not draft) · 2 cluster members, now Tier
A-confirmed · 2 new and strong, both needing the card's own gloss corrected · 1 correction
to my earlier claim · 1 source-handling rule.**

---

## @howtospanish — three MX carousels (2026-10-29 intake; posts 2026-07-22, 07-28, and same-day)

**Tier C.** 17 cards. **1 already logged · 16 new.** Largest single intake since the
proverb book, and the yield is better than the 2026-10-13 batch from the same account
because several of these have real Italian partners rather than needing one invented.

### ⚑ A second sketch confirmed from an outside source

On 2026-10-11 I proposed, unverified, *Per me è arabo* ↔ MX ***está en chino***, with the
note *"confirm this is the MX-current form (it is common there, but verify)."* Carousel B
carries ***ESTÁ EN CHINO*** with the gloss *"impossible to understand."*

**That is the second sketch confirmed by an independent Mexican source** (the first was
*¡Qué oso!* on 10-14). Same caveat as then: the Spanish side being right is not the
pairing being right. But the three-language chain — Italian says **Arabic**, Spanish says
**Chinese**, English says **Greek** — now has both halves sourced, and it remains the
strongest unbuilt card in the queue.

### A — the ones worth drafting

**Spanish is from the cards; Italian sketches are Claude's unless marked verified.**

| Spanish (MX) | Literal | Means | Italian | Assessment |
|---|---|---|---|---|
| Ya me cayó el veinte | the twenty-centavo coin dropped | it finally clicked | *mi si è accesa la lampadina* | ⚑ **Best of the batch.** The *veinte* is the coin you fed a Mexican payphone — the call connected when it dropped (origin documented; Condusef has catalogued the coin-derived phrases). So Spanish dates its "aha" to the **telephone**, and Italian to the **lightbulb**. Two technologies, two eras, same instant of understanding. English "the penny dropped" shares the Spanish mechanism, which makes the Italian the odd one out — a genuinely good bridge. |
| Hierba mala nunca muere | bad weed never dies | the awful survive everything | **L'erba cattiva non muore mai** (verified) | ⚑ **Near-exact twin, and a proverb rather than slang** — so it dodges the whole currency question. Attested on both sides, including a Sicilian variant (*la mala erba non mori mai*). The only work is the bridge: both languages blame the *weed*, so the entry has to find its interest in register or in who it gets said about. Low risk, quick draft. |
| No me toques ese son | don't play me that tune | don't bring that up | *non toccare quel tasto* | ⚑ **Strong — both musical, different instruments.** Spanish names a **son** (a song form); Italian names a **key** on a keyboard. Same prohibition, same music metaphor, neither guessable from the other. |
| Andas en la luna | you're on the moon | spaced out, distracted | *avere la testa fra le nuvole* | ⚑ Good: Spanish sends you to the **moon**, Italian only as far as the **clouds**. ⚑ **But check saturation — *luna* is taken.** Banked **0093** is *Avere la luna storta ↔ Tener mal templada la guitarra*, where *luna* carries **mood**. Two *luna* entries with two different senses need the reviewer to confirm they don't confuse each other. |
| Se me subió el muerto | the dead climbed on me | sleep paralysis | *(no idiom — Italian says* paralisi del sonno*)* | ⚑ **The asymmetry is the entry**, and it is the same shape as the Latin-nativization finding: Mexico has a **folk image** for the experience, Italy reaches for the **clinical term**. Not a health claim — it names a folk belief about a known phenomenon — but worth a reviewer's eye on how the card frames it. |
| Se puso hasta las chanclas | he got as far as the sandals | blind drunk | *ubriaco fradicio* | ⚑ Nice axis: Spanish measures drunkenness by **how far down it reached**; Italian by **saturation** (*fradicio* = soaked through). Depth against wetness. |
| Ando bien crudo | I'm very raw | hungover | *(no vivid IT idiom)* | Spanish has the image, Italian has only *i postumi* (the after-effects). Another asymmetry entry if the ES is drafted. |
| Estuvo equis | it was X | meh, mid | *niente di che* | ⚑ Spanish marks indifference with a **letter of the alphabet** — unusual and modern. Italian's equivalent is a plain phrase. Thin, but the X is genuinely odd enough to carry a card. |
| No hagas un pancho | don't make a *pancho* | don't make a scene | *non fare storie* / *una scenata* | Spanish builds the idiom on a **proper name**; Italian on the plain noun. Worth checking whether the *Pancho* etymology is documented before leaning on it. |
| Eres bien fresa | you're very strawberry | posh, snobby | *(register-matched IT needed)* | MX picks a **fruit** for class pretension. The Italian equivalents all carry their own class baggage — reviewer call. |
| Me dio el avión | gave me the airplane | humoured me and ignored me | *(unresolved)* | ⚑ See the *avión* note below. |
| Ando filoso | I'm sharp | sassy, on edge today | *(unresolved)* | Niche. Low priority. |

### ⚑ Three findings that matter more than the individual rows

**1. Mexico has two different *avión* idioms, and the queue now holds both.**
*Me dio el avión* (he humoured me and ignored me) is **not** *se me fue el avión* (my brain
checked out), logged 2026-10-13. Same noun, unrelated meanings, both MX-current. That is
a Spanish-internal minimal pair — interesting, but **a disambiguation risk if both are
drafted**: a subscriber meeting one card has no way to know the other exists, under the
no-cross-reference rule. **Pick one.**

**2. The euphemism cluster gains a second Spanish member.**
***Me vale gorro*** is the softened form of the vulgar *me vale madres* — the same
substitution move as *no manches* for *no mames* (L249). So the Spanish side of that
cluster is now **two documented members**, matching the four on the Italian side. Combined
with the Tier A confirmation from 10-29 (*cavolo* card stating the mechanism outright),
**the euphemism entry now has sourced members on both sides and should be drafted.**

**3. Sensitivity flag: *es un mandilón*.**
"Apron man" — a man mocked for deferring to his wife or doing domestic work; the card's own
gloss is "simp". The Italian counterpart (*essere sotto la scarpa*) carries the same
gendered freight. This belongs with the standing flags on *naco*, *quedarse para vestir
santos*, and *la botte piena e la moglie ubriaca* (L567). **Do not draft without an
explicit call.**

### Composition warning

Sixteen new Spanish-first rows in one batch, on top of the 7 from 10-13 and 6 from 10-14.
**That is ~29 new MX colloquialisms in under three weeks**, against a bank whose
`formality: ok_in_exam` shelf is the paid tier's spine and whose difficulty-4 shelf holds
**two entries in 231**. Almost none of this material is exam-safe or advanced. It is good
material and it should be logged — but **the gap it fills is the one the bank is least
short of.**

**Batch yield: 16 new · 1 sketch confirmed externally · 1 verified freebie proverb
(*hierba mala*) · 1 strong new card (*me cayó el veinte*) · euphemism cluster now
double-sourced on the Spanish side · 1 sensitivity flag · 1 disambiguation decision
(*avión* ×2) · 1 saturation check (*luna* ×2).**

---

## @learnandloveitalian — exclamations calendar, 3rd series (2026-11-11)

**Tier A.** 12 of 14 cards legible. **2 already banked · 1 queued · 1 cross-series
duplicate · 8 new.**

⚑ **This is the account's third 14-card month calendar.** Idioms (2026-10-11), spoken
slang (2026-10-14), now exclamations — plus the discourse carousel (10-27) and the idiom
carousel (10-29). Five distinct series in a month. The 10-11 note calling this account
"largely mined out" has now been wrong twice; treat it as a standing recurring source.

### Already covered — no action

| Card | Where |
|---|---|
| Mi cadono le braccia! | **banked 0087** (`approved`) — *Cadere le braccia ↔ Caérsele a uno las alas del corazón*. Its own example is *"gli sono cadute le braccia."* Exact. |
| Ma io boh! | **banked 0069** (`approved`) — *Boh ↔ ¡Sepa!* — but see the note below. |
| Ma che cavolo! | queued **L683** — euphemism cluster. |
| Anche meno! | **cross-series duplicate** — already logged 2026-10-14 from this account's slang calendar. |

⚑ **0069 needs a variant note, not a new card.** The bank holds bare ***Boh*** = *I don't
know*. The card gives ***Ma io boh!*** and glosses it **"I just can't!"** — exasperation,
not ignorance. That is a real sense shift carried by the *ma io* frame, and a learner who
has met 0069 would read the exclamation wrongly. Worth a line in 0069's notes for the
reviewer to confirm or reject; not worth a second entry under the no-cross-reference rule.

### A — new, worth drafting

**Spanish sketches are Claude's and unverified.**

| Italian | Literal | Means | Spanish sketch | Assessment |
|---|---|---|---|---|
| Siamo alla frutta! | we're at the fruit | we've hit rock bottom | *estamos en las últimas* | ⚑ **Best of the batch.** Italian dates the end of things to **the last course of a meal** — the fruit comes after everything else, so being "at the fruit" is being at the end of what there is. Spanish counts down anonymously (*las últimas*). A culture that measures a situation by where it has got to in dinner is the whole card, and it needs no trap to earn its place. |
| Ma chi me l'ha fatto fare?! | but who made me do it? | why did I even bother? | *¿quién me mandó?* | ⚑ **Near-exact rhetorical twin.** Both languages express self-reproach by inventing an instigator and demanding to know who it was — and both use a verb of *ordering* (*far fare* / *mandar*). Same move, same grammar, independently arrived at. Check whether MX prefers *¿quién me manda?* in the present. |
| Manco morto/a! | not even dead | not in a million years | *¡ni muerto!* | Near twin, both refusing via death. ⚑ **Two checks before drafting.** *Manco* is a colloquial regional variant of *nemmeno* — confirm it is neutral enough to ship. And **the card prints the slash form, *morto/a***, which runs against the precedent set on **0034**, where the Italian text was deliberately left as *"Sono appena arrivato"* rather than showing agreement. Same decision applies here. |
| Mi sale il crimine! | crime is rising in me | I'm about to lose it | *(no ES equivalent found)* | ⚑ Vivid and distinctly modern — Italian names the impulse to commit a crime as a thing that *rises* in you. No Spanish counterpart came to mind; likely an asymmetry entry. ⚑ **Currency flag:** this reads as recent slang, so it belongs with the perishability question raised on 10-14, not with the durable material. |
| Ma roba da matti! | but stuff of madmen | this is insane | *¡esto es de locos!* | Near twin, both routing outrage through madness. Thin but clean. |
| Non esiste proprio! | it really doesn't exist | absolutely no way | *¡ni hablar!* / *¡ni de broma!* | Italian refuses by **denying the thing's existence**; Spanish by refusing to *discuss* it or by calling it a joke. Different route to the same flat no. |
| Adesso basta! | that's enough now | that's enough | *¡ya basta!* | Exact twin including the adverb slot (*adesso*/*ya*). Freebie — thin bridge, but a clean A2 card. |
| Non me ne può fregare di meno! | I couldn't care less | — | MX *me vale gorro* | ⚑ **Both halves are euphemisms — see below.** |

### ⚑ The euphemism cluster gains its best candidate pair

*Non me ne può fregare di meno* is built on ***fregare***, which is itself the softened
stand-in for a coarser verb. The Mexican expression logged on 2026-10-29,
***me vale gorro***, is the softened form of *me vale madres*.

So this is a pair in which **both sides are euphemisms for the same sentiment in their own
language** — not one language's quirk observed from outside, but the same move performed
twice, independently, for the same phrase. Every earlier cluster member had a euphemism on
one side and a plain expression on the other.

That makes it a stronger candidate for **the** euphemism entry than *no manches ↔ non
capire un cavolo*, which was the 10-29 recommendation. **Both should go to the reviewers
together and let them pick** — the question is which pair a native would reach for first,
and that is exactly a Stage 3 question.

**Batch yield: 2 banked · 1 queued · 1 cross-series duplicate · 8 new · 1 variant note on
0069 · 1 agreement decision inherited from 0034 · 1 upgraded candidate for the euphemism
entry.**

---

## @learnandloveitalian — connectors carousel (2026-11-12)

**Tier A.** 4 of 7 cards legible. **1 already banked · 1 saturated against a banked entry ·
2 clear to draft.**

Sixth distinct series from this account in five weeks, and the same durable discourse
register as the 2026-10-27 carousel — not the perishable slang layer.

### Already covered

***Per caso*** → **banked 0229** (`approved`), *Por casualidad ↔ per caso*. Fully covered,
and the examples nearly collide: 0229 uses *"Hai visto per caso le mie chiavi?"*, the card
uses *"Hai una penna, per caso?"* — same frame, same slot. **No action.**

### ⚑ *Sotto sotto* is saturated — the reduplication lesson is already banked

The obvious card for *sotto sotto* is that **Italian doubles a word to make an adverb** and
Spanish does not. But that is precisely what **banked 0046** (`approved`) already teaches:

> *Piano piano ↔ Despacito* — "Italian softens by SAYING IT TWICE (piano piano —
> reduplication), Spanish by SHRINKING THE WORD (despacio becomes despacito, the
> diminutive)."

Under the no-cross-reference rule a *sotto sotto* card would have to explain Italian
reduplication from scratch, teaching the same structural point a second time. **Same
problem as the euphemism cluster, in a different corner of the grammar.**

⚑ **There is a thinner card still available, if you want it.** Spanish answers Italian
reduplication **differently each time**: with a *diminutive* against *piano piano*, and
with a *noun phrase* (*en el fondo*, "at the bottom") against *sotto sotto*. So the
Spanish side is the variable one, not the Italian. That is a real observation but a
subtle one, and it is the opposite of how 0046 is framed. **Recommend: hold, and decide
alongside the other saturation calls rather than drafting it on its own.**

### A — clear to draft

**Spanish sketches are Claude's and unverified.**

| Italian | Means | Spanish sketch | Assessment |
|---|---|---|---|
| Tra l'altro | by the way / besides | *por cierto* | ⚑ **Better of the two, and it carries a production trap.** The two languages justify the aside on completely different grounds. Italian is **partitive** — *tra l'altro*, "among the other [things]" — framing the new remark as already belonging to the set under discussion. Spanish *por cierto* is etymologically "for certain" and has drifted into the same job from the opposite direction: an assertion of certainty, not of membership. ⚑ **The trap:** the tempting Spanish calque, *entre otras cosas*, is literally "among other things" and does **not** work as a topic-shifter — a Spanish speaker reasoning from the Italian will produce it and be misread. Confirm *por cierto* is the MX-current connector before drafting. |
| Nel frattempo | meanwhile | *mientras tanto* / *entretanto* | Both languages fuse a preposition to a second element to build the same connector, and pick different elements: Italian fuses *fra* + *tempo* and names **time** outright; Spanish fuses *entre* + *tanto* and names **quantity**. Clean, modest, no trap. ⚑ Worth asking the reviewer which of *mientras tanto* and *entretanto* is current in MX — they are not equally common, and the one-word form is the structural parallel to the Italian. |

### Standing note

Across six series this account has now supplied material that is **already banked or
saturated about half the time** — 2 of 4 here, 4 of 12 on 2026-11-11, 5 of 6 on
2026-10-11. That is a good sign about the bank's coverage of this register rather than a
problem with the source, but it is worth running the lookup before photographing a whole
carousel.

**Batch yield: 1 banked · 1 saturated (hold) · 2 clear to draft · 1 production trap worth
the card (*entre otras cosas*).**

---

## Single card — *Con un ojo al gato y otro al garabato* (2026-11-17)

**Tier C** (Instagram, Mexican Spanish). **New — no match in bank or queue.**

### ⚑ The etymology is the entry, and it is better than the card's gloss

A ***garabato*** is a **meat hook**. In kitchens before refrigeration, meat hung from an
overhead hook to keep it away from rodents — and the household cat was the other threat
to it. So the saying is literally *one eye on the cat, one eye on the meat*: two threats
to the same thing, coming from different directions, both needing watching at once.

That is a sharper sense than the card's English suggests. The card reads as generic
divided attention ("one eye on the cat and the other on the scribble" — *garabato* also
means scribble, which is why the gloss drifts). The attested sense is **vigilance against
more than one danger**, not multitasking. **Draft the vigilance sense, and do not use
"scribble" in the literal gloss** — it is a real meaning of the word but the wrong one
here, and it makes the image incoherent.

### ⚑ No Italian partner found — and I checked the one I expected

I went in expecting ***un occhio alla padella e uno alla gatta***, which would have been
an extraordinary pair: same two eyes, same cat, same kitchen. **It did not verify.**
Nothing in Italian proverb collections carries it, and I am not confident it exists.
Recorded here so the guess is not quietly reused as a finding later.

What Italian does have nearby, and why none of it fits:

| Italian | Why it is not the pair |
|---|---|
| *Tenere d'occhio* | Plain verb phrase — "keep an eye on". Carries the vigilance but names nothing, so there is no image to put against the Spanish. |
| *Salvar la capra e i cavoli* | Goat and cabbages — about finding a solution that satisfies two competing demands, not about watching two threats. Different job. |
| *Mettere troppa carne al fuoco* | Too much meat on the fire — overcommitting, taking on more than you can handle. ⚑ Note it is also a **kitchen-and-meat** image, which makes it tempting, but the meaning is wrong: that is doing too much, not watching carefully. |

**So this is an Unmatched / asymmetry candidate.** Spanish names the two things being
watched and builds a whole pre-refrigeration kitchen out of it; Italian expresses the same
alertness with a bare verb. That gap is a legitimate entry on its own terms — the bank has
taken this shape before (*a tavola non si invecchia*, where Spanish has a noun and no
proverb) — but it needs the editorial call on whether Unmatched entries ship.

⚑ **One pairing worth testing with the reviewer, if the sense is allowed to flex.** If the
MX usage in practice leans toward *juggling two things* rather than *guarding against two
threats*, then *mettere troppa carne al fuoco* becomes arguable. The Mexican source is
clear that the original sense is threat-watching, so **the reviewer should say which sense
a Mexican speaker actually reaches for today** — that single answer decides whether this
is a pair or an Unmatched.

### Saturation note

*Gato* is accumulating on the Spanish side: queued **L591** (*non dire gatto se non ce
l'hai nel sacco ↔ no vender la piel del oso*), *da el gatazo* logged 2026-10-14, now this.
Three cat rows, none banked yet. Worth deciding which one carries the cat before any of
them is drafted.

**Yield: 1 new · etymology corrects the card's own gloss · 1 expected Italian pair
disconfirmed · likely Unmatched pending one reviewer question · 1 saturation flag (*gato*
×3).**

---

## Spanish idiom list, 14 expressions (2026-11-21)

Supplied as text with Italian halves mostly attached. **1 already banked · 1 already
queued · 12 new.**

### ⚑ Dialect pass needed before any of these is drafted

Six of the fourteen are markedly **Peninsular**, not Mexican: *tirar los tejos*,
*a buenas horas, mangas verdes* (historical, from the Santa Hermandad), *hacer el agosto*,
*estar como una cuba*, *hablar por los codos*, *pedir peras al olmo*. The bank's anchor is
Mexican Spanish, and entries **0024, 0026 and 0112** have already been corrected once for
Peninsular bias in the `regions` field.

**Recommend running the whole list past the Spanish reviewer for MX currency before
drafting any of it**, rather than drafting and correcting afterwards. *A buenas horas,
mangas verdes* in particular is tied to a 15th-century Castilian militia and may not read
at all in Mexico.

### Already covered

| Expression | Where |
|---|---|
| El mundo es un pañuelo ↔ Il mondo è piccolo | **banked 0104** (`draft`) — exact match, same Italian. No new row; it needs finishing, not re-adding. |
| De tal palo, tal astilla | queued **L286** — but paired there with ***Tale madre tale figlia***, not the *tale padre tale figlio* given here. ⚑ Two Italian forms for one Spanish anchor; the reviewer should pick, and the choice has a gender dimension worth a deliberate call. |

### ⚑ One supplied Italian half is wrong — and the real one is better

***Agarrarse a un clavo ardiendo*** is given as *aggrapparsi a un filo di paglia*. **That
is not an Italian idiom** — it is a literal rendering of the English "clutch at straws."
The attested Italian is ***arrampicarsi sugli specchi*** — "to climb up mirrors" (verified;
Italian dictionaries and teaching sources carry it under exactly this sense).

And it makes a far better card than the calque would have:

> Spanish grabs a **red-hot nail** — something you cannot hold because it burns.
> Italian climbs **mirrors** — something you cannot hold because there is nothing to grip.
> Two different impossibilities, same desperation.

Same failure mode as the proverb book: an English idiom translated into Italian and
presented as Italian. ⚑ **Worth asking where this list came from** — if the other Italian
halves share a source, they each need the same check.

### ⚑ One pairing is plausible but the images do not match

***Pedir peras al olmo*** ↔ *chiedere la luna*. Both mean asking the impossible, but they
are impossible in **different ways**, and the bridge has to say so or the card teaches a
false equivalence:

- Spanish is a **category error** — an elm cannot produce pears, so you are asking the
  wrong *source*. The thing asked for exists; this supplier cannot provide it.
- Italian is a **distance problem** — the moon is real and singular, just out of reach.

That difference is the entry, and it is a good one. But no Italian idiom with the elm's
*wrong-source* logic surfaced, so confirm *chiedere la luna* is what a native would reach
for here before drafting.

### A — the rest, clear to draft pending the dialect pass

| Spanish | Italian (as given) | Note |
|---|---|---|
| Dios los cría y ellos se juntan | Dio li fa e poi li accoppia | ⚑ **Strong, and it supersedes an earlier sketch.** On 2026-10-11 I proposed this Spanish as the partner for proverb-book #27 (*Chi si assomiglia si piglia*). This Italian is much closer: **both invoke God as the agent** — Spanish has Him raise them and leaves the joining to them, Italian has Him make them *and* pair them. ⚑ But that now makes two Italian candidates for one Spanish anchor. Reviewer picks; recommend this one. |
| No tener ni pies ni cabeza | Non avere né capo né coda | ⚑ Near-exact, and the mismatch is the card: Spanish denies **feet and head**, Italian denies **head and tail**. Both use the body to mean "no coherent shape", and each picks a different end to be missing. Clean, cheap, good. |
| A la tercera va la vencida | La terza è quella buona | Near twin. Spanish names the *victory* (*la vencida*); Italian just calls the third one *good*. Small but real. |
| Estar como una cuba | Essere ubriaco fradicio | ⚑ Spanish measures drunkenness by a **barrel**, Italian by **saturation** (*fradicio* = soaked through). Note this collides with the 2026-10-29 row *se puso hasta las chanclas ↔ ubriaco fradicio* — **two Spanish forms competing for the same Italian**. Pick one. |
| Salir el tiro por la culata | Ritorcersi contro | Spanish is vivid (the shot comes out of the gun's **butt**); the Italian given is a plain reflexive verb. Asymmetry rather than a pair — check whether Italian has something with an image. |
| Tirar los tejos | Fare il filo a qualcuno | Both are oblique courtship metaphors — Spanish throws *tejos* (discs, from a tossing game), Italian spins a *thread*. ⚑ Peninsular; MX would say *tirar la onda* or *echar los perros*. Confirm before anchoring. |
| Ponerse las pilas | Darsi una mossa | ⚑ Spanish puts **batteries** in, Italian gives itself a **shove** — electrical against mechanical. Current in MX as well as Spain, so this is one of the safer rows. |
| Hacer el agosto | Fare affari d'oro | Spanish names a **month** (the August harvest); Italian names **gold**. Season against metal. Peninsular-leaning — confirm. |
| Hablar por los codos | *(none given)* | Spanish talks "through the elbows". Italian's usual equivalents (*parlare a raffica*, *non stare mai zitto*) are plain, so likely an asymmetry entry. |
| A buenas horas, mangas verdes | *(none given)* | ⚑ Historical and strongly Peninsular — the green sleeves were the Santa Hermandad's, always arriving after the crime. Hard to pair and possibly unreadable in MX. Lowest priority. |

**Yield: 1 banked · 1 queued · 12 new · 1 Italian half disconfirmed and replaced · 1
pairing needing a semantic caveat · 1 earlier sketch superseded · 2 new collisions
(*ubriaco fradicio* ×2, *tale padre/madre*) · dialect pass required on 6.**

---

## Spanish idiom list, 15 more (2026-11-21, second batch)

English glosses only, no Italian supplied. **2 already banked · 1 queued · 12 new.**

### Already covered

| Expression | Where |
|---|---|
| Dar la cara | **banked 0112** (`approved`) ↔ *Pagare di persona* — "Spanish shows the face; Italian pays the bill." |
| El hábito no hace al monje | **banked 0299** (`needs_review`) ↔ *L'abito non fa il monaco*. ⚑ This is the *hábito/abito* false friend — the one the proverb book walked straight into on 2026-10-29 by glossing the Italian as being about *habits*. |
| Cortar el bacalao | queued **L70** — but paired there with ***comandare / essere il capo***, which are plain verbs, not an idiom. The row still needs an Italian **image** found; as it stands it is an asymmetry, not a pair. |

### ⚑ *Cara o cruz* saturates against a banked entry

*Cara o cruz* ↔ *testa o croce* is a near-twin with one swap: Spanish calls it **face**,
Italian calls it **head**. Lovely — except **banked 0003** already teaches exactly that
swap: *Costar un ojo de la cara ↔ Costare un occhio della testa*, whose bridge is about
Spanish reaching for the face where Italian reaches for the head.

Under the no-cross-reference rule a *cara o cruz* card would have to establish the
cara/testa pattern from scratch, teaching 0003's lesson a second time. **Same shape as the
*piano piano* / *sotto sotto* saturation flagged on 2026-11-12.** Hold it with those.

(The coin is still interesting — Spanish and Italian both keep the **cross**, while English
abandoned it for *tails*. But that is a three-language observation and the bank is a
two-language product.)

### A — new, worth drafting

**Italian sketches are Claude's and unverified unless marked.**

| Spanish | Italian sketch | Assessment |
|---|---|---|
| Cría cuervos y te sacarán los ojos | *allevare una serpe in seno* | ⚑ **Best of the batch.** Both warn that what you nurture will turn on you, and each picks a different creature and a different wound: Spanish raises **ravens** that take your **eyes**; Italian warms a **snake** at the **breast**. The Italian family is attested (*allevare / scaldare una serpe in seno*, *nutrire una vipera in seno*) — ⚑ reviewer picks the form. Real divergence, no overlap with anything banked. |
| Borrón y cuenta nueva | *voltare pagina* | ⚑ Good: Spanish is **bookkeeping** — blot the entry, open a new account; Italian is **reading** — turn the page. Ledger against book, same fresh start. |
| De perdidos, al río | *o la va o la spacca* | Both commit once things are already bad. Spanish throws itself in the river; Italian says it either goes or it breaks. Peninsular — confirm MX currency. |
| A palabras necias, oídos sordos | *(unresolved)* | Attested and proverbial on the Spanish side. No fixed Italian equivalent came to mind; likely an asymmetry entry. |
| Cruza los dedos | *incrociare le dita* | Exact twin, same gesture, same verb. Freebie — thin, but A2-clean and both cultures share the superstition. |
| Darlo todo | *darci dentro* | Both plain-ish intensifiers. Low priority. |
| Corta el rollo | *piantala* / *smettila* | Spanish has the image (*rollo* = the roll, the spiel); Italian is a bare imperative. Peninsular. |
| Casarse de penalti | *matrimonio riparatore* | ⚑ Spanish borrows from **football** — married on a penalty. Italian's term is legal-sounding and flat. Vivid, but the concept is loaded and the Italian carries no equivalent wink. Peninsular; register call needed. |
| A otra cosa, mariposa | *(no rhyming IT twin)* | ⚑ **Rhyme asymmetry — and this is now a pattern worth one card of its own.** The queue already holds *chi si loda s'imbroda* (L-row from the proverb book) and *l'amore non è bello se non è litigarello*, both Italian rhymes with no Spanish twin. This is the reverse: a Spanish rhyme (*cosa/mariposa*) with no Italian one. **Three rows all saying "this language rhymes here and the other doesn't."** Decide once whether rhyme itself is an entry, rather than drafting three thin ones. |
| Dejarse la piel | *farsi in quattro* | ⚑ **Collides with L297** (*sudar la gota gorda ↔ sudare sette camicie*), which already covers extreme effort. Two Spanish forms, adjacent Italian ones — pick one before drafting. |
| Disfrutar como un enano | — | ⚑ **Sensitivity call before anything else.** *Enano* is the word for a person with dwarfism. This belongs with the standing flags on *naco* (10-14), *mandilón* (10-29) and *la botte piena e la moglie ubriaca* (L567). Also Peninsular. Do not draft without an explicit decision. |

### ⚑ The dialect problem is now systemic across both lists

Across the two lists sent today — 29 expressions — roughly **eleven are markedly
Peninsular**: *tirar los tejos*, *a buenas horas mangas verdes*, *hacer el agosto*,
*estar como una cuba*, *pedir peras al olmo*, *hablar por los codos*, *casarse de penalti*,
*cortar el bacalao*, *disfrutar como un enano*, *de perdidos al río*, *corta el rollo*.

That is over a third, from a bank whose anchor is Mexican and which has already been
corrected once for Peninsular bias (0024, 0026, 0112). **Recommend one dialect pass over
both lists with the Spanish reviewer before drafting any of it** — it is a single ask that
prevents ~11 corrections later.

**Yield: 2 banked · 1 queued (still needs an Italian image) · 12 new · 1 saturation flag
(*cara o cruz* vs 0003) · 1 collision (*dejarse la piel* vs L297) · 1 sensitivity flag
(*enano*) · 1 pattern to decide once (rhyme asymmetry, 3 rows).**

---

## Spanish idiom list, 15 more (2026-11-21, third batch)

**1 queued ×2 · 12 new · and one entry answers an open question on a banked card.**

### ⚑ This list answers 0319's standing question — the entry should be rebuilt

**0319** (*Ir como un tiro ↔ Andare come un treno*, `needs_review`) carries this in its own
notes, written at draft time:

> "I claim … (b) Spanish *estar como un tren* means attractive, not fast. **If (b) is
> right it is a genuine false friend and the entry should probably be rebuilt around it**
> rather than around speed … BOTH REVIEWERS: please confirm or correct, and if (b) holds,
> flag whether the ES form is *estar como un tren* (Peninsular) and whether it is current
> in MX at all."

This list supplies: ***Estar como un tren — look gorgeous / stunning***.

**That confirms (b) from an independent source, and confirms the predicted form.** So the
false friend is real: ***como un tren*** means **attractive** in Spanish while ***come un
treno*** means **fast** in Italian. By 0319's own instruction, the entry should be rebuilt
around that rather than around the *tiro/treno* imagery split.

⚑ **Two parts of the question are still open, and one of them is decisive:**

1. **Claim (a) is still unconfirmed** — that Italian *va come un treno* said of a person
   can be a coarse physical compliment. Nothing here touches it. Italian reviewer.
2. **MX currency is still unknown.** This list is Peninsular throughout, which is exactly
   what the note predicted. If *estar como un tren* is Spain-only, rebuilding 0319 around
   it fights the Mexican anchor, and the note already anticipated that: *"the entry may
   need a different ES anchor for a Mexican audience."* **Ask the Spanish reviewer this
   one question before rebuilding.**

### Already queued

| Expression | Where |
|---|---|
| Estar de mala leche | **L292** ↔ *avere la luna storta* — and already tagged *(Peninsular)* at source. ⚑ Third "bad mood" row, with *estoy de malas* (2026-10-29) and banked **0093**, which already uses *avere la luna storta*. Two Spanish forms, one Italian. Pick one. |
| Está para chuparse los dedos | **L311** ↔ *leccarsi i baffi* — fingers vs moustache, already logged. |

### A — new, worth drafting

| Spanish | Italian sketch (unverified) | Assessment |
|---|---|---|
| Hablando del rey de Roma, por la puerta asoma | *parli del diavolo e spuntano le corna* | ⚑ **Best of the batch, and the irony is the card.** Both summon someone by naming them, and pick opposite figures: Spanish invokes the **King of Rome**, Italian invokes the **devil**. ⚑ The Spanish proverb names Rome and the Italian one does not — a detail worth the bridge on its own. Spanish also rhymes (*Roma/asoma*); Italian doesn't. |
| Hecha la ley, hecha la trampa | *fatta la legge, trovato l'inganno* | ⚑ Near-exact, down to the paired participles. One real difference: Spanish **makes** the loophole (*hecha*), Italian **finds** it (*trovato*) — invention against discovery, which is a nice small moral distinction. |
| Es el último grito | *l'ultimo grido* | Exact cognate twin — both call the latest fashion "the last shout." Freebie, but a satisfying one. |
| Estar como un flan | *tremare come una foglia* | ⚑ Spanish wobbles like a **dessert**, Italian trembles like a **leaf**. Kitchen against nature, same nerves. |
| Estar pez | *essere una capra* | ⚑ Both use an animal for ignorance — Spanish a **fish**, Italian a **goat**. But ⚑ **saturation: banked 0024 is *Estar como pez en el agua ↔ Essere un pesce fuor d'acqua***, which already runs the fish on both sides. A third *pez* row needs a deliberate call. |
| Hacer la pelota | *leccare i piedi* | Spanish makes a **ball**, Italian **licks feet**. Note the Italian is harsher in register than the Spanish — flag for the reviewer. |
| Enrollarse como una persiana | *essere un fiume in piena* | Spanish rolls out like a **window blind**, Italian floods like a **river**. Both for someone who won't stop. |
| Estar para mojar pan | — | ⚑ Third "attractive" item in this list alone, with *estar como un tren* and (loosely) *chuparse los dedos*. The bank has none; three at once is a composition question, and two of them are food-based. |
| Está chupado | *è una passeggiata* | Easy task. Spanish "it's sucked", Italian "it's a walk". Modest. |
| Estar en la onda | — | ⚑ Collides with MX *¿qué onda?*, logged 2026-10-14. Same *onda*, different idiom — check they don't confuse each other. |
| Entre broma y broma, la verdad asoma | *(no rhyming IT twin)* | ⚑ **Fourth rhyme row.** With *a otra cosa mariposa*, *chi si loda s'imbroda* and *l'amore non è bello se non è litigarello*. The rhyme-asymmetry decision is now overdue — four thin rows or one real card. |
| Ir como pollo sin cabeza | *(check for calque)* | ⚑ The Spanish is well established, but the obvious Italian (*come un pollo senza testa*) looks like a rendering of the English "headless chicken". **Verify before pairing** — same failure mode as *aggrapparsi a un filo di paglia* in the first list. |

### Running dialect tally

Three lists today, **44 expressions**, of which roughly **sixteen are markedly Peninsular**
— this batch adding *estar de mala leche* (tagged Peninsular at source), *estar como un
tren*, *hacer la pelota*, *está chupado*, *estar pez*, *enrollarse como una persiana*. The
single dialect pass recommended on the first list now covers all three.

**Yield: 2 queued · 12 new · 1 banked entry unblocked (0319, rebuild pending one MX
question) · 1 saturation (*pez* vs 0024) · 2 collisions (*mala leche*, *onda*) · 1 calque
to verify · rhyme decision now 4 rows deep.**

---

## Spanish idiom list, 15 more (2026-11-21, fourth batch)

**1 duplicate of a pending row · 2 saturate against banked entries · 5 are not idioms ·
7 worth drafting.**

### ⚑ Five of these are not idioms

*Depende de ti* ("it's up to you"), *lo primero es lo primero*, *hacer la vida imposible*,
*como si estuvieras en tu casa* — all ordinary, fully transparent phrases that a learner
composes rather than memorises. They have no trap, no image and no bridge.

⚑ ***Desvelar un secreto* is the worst of them**, because the gloss hides the problem:
it is given as *"let the cat out of the bag"*, but **the Spanish is not an idiom at all** —
*desvelar un secreto* is literally "reveal a secret." The English idiom has been attached
to a plain Spanish phrase. The real Spanish idioms for that sense are ***irse de la
lengua*** or ***descubrir el pastel***, and either would make a genuine card. Worth the
same caution the earlier list earned with *aggrapparsi a un filo di paglia*: **the glosses
on this list are doing work the Spanish does not do.**

### Already logged / saturated

| Expression | Status |
|---|---|
| Mala hierba nunca muere | ⚑ **Already logged 2026-10-29** as *hierba mala nunca muere*, with the Italian **verified**: *L'erba cattiva non muore mai* (incl. the Sicilian *la mala erba non mori mai*). Word-order variant only — the reviewer should say which order is standard in MX. No new row. |
| Cuesta un riñón | ⚑ **Saturates against banked 0003** (*Costar un ojo de la cara ↔ Costare un occhio della testa*). Verified: Italian has **no** *costare un rene* — it routes back to the eye, which 0003 already banks. ⚑ The real observation is a footnote for 0003, not a card: **Spanish prices things in two body parts (eye, kidney), Italian in one.** |
| Baja de las nubes | ⚑ **Banked 0001** is *Estar en las nubes ↔ Avere la testa tra le nuvole*; this is its imperative. Third cloud-and-distraction row, with *andas en la luna* (2026-10-29). Decide which carries the clouds. |
| Marear la perdiz | ⚑ **Third "beat around the bush."** *Menare il can per l'aia* (IT) and *irse por las ramas* (ES) were both logged 2026-10-11. Two Spanish forms, one Italian — pick one. |

### A — worth drafting

| Spanish | Italian sketch (unverified) | Assessment |
|---|---|---|
| Liarse la manta a la cabeza | *(no close IT found)* | ⚑ **Best of the batch.** Wrapping the blanket round your head and going anyway — reckless commitment, and completely opaque from outside. Italian's equivalents (*buttarsi*, *fare il grande passo*) are plain verbs with no image. Strong asymmetry candidate. |
| A vivir, que son dos días | *si vive una volta sola* | ⚑ Nice axis: Spanish counts the **days** ("it's only two"), Italian counts the **lives** ("you only live once"). Same urgency, different arithmetic. ⚑ Connects to the Latin-nativization finding of 2026-10-11 — Italian turned *carpe diem* into *cogli l'attimo* while Spanish mostly kept the Latin. Worth deciding whether that is one theme or several cards. |
| Más fresco que una lechuga | *fresco come una rosa* | ⚑ **Draft this one, not the rose.** This list also offers *despertarse como una rosa*, which is the near-twin of the Italian and therefore a freebie. The **lettuce** is the divergence: Spanish has two freshness similes, one of which Italian shares and one it does not. Pairing lettuce against rose is the card; pairing rose against rose is not. |
| Ir de flor en flor | *essere un farfallone* | Spanish moves **flower to flower**, Italian calls the person a **big butterfly** — the Spanish names the behaviour, the Italian names the man. ⚑ Note Spanish reaches for a butterfly too, in *a otra cosa, mariposa* (third list) — two butterfly rows now. |
| Más feliz que un regaliz | *(no rhyming IT twin)* | ⚑ **Fifth rhyme row** (*feliz/regaliz*). With *entre broma y broma*, *a otra cosa mariposa*, *chi si loda s'imbroda*, *l'amore non è bello se non è litigarello*. **Five thin rows now ride on one undecided question.** |
| Despertarse como una rosa | *fresco come una rosa* | Near-exact twin. Freebie — hold behind the lettuce above. |
| Desvelar un secreto → *irse de la lengua* | *farsi scappare* / *vuotare il sacco* | ⚑ If the Spanish is replaced with a real idiom (see above), this becomes draftable. *Irse de la lengua* — "the tongue gets away from you" — against Italian *vuotare il sacco*, "empty the bag", which is ⚑ **already queued at L96** (*vaciar el costal ↔ vuotare il sacco*). Check that collision first. |

### Running tally across all four lists today

**59 expressions.** Roughly **sixteen markedly Peninsular**, **five non-idioms**, **five
rhyme rows**, and at least **seven collisions or saturations** with banked or queued
material (*cara o cruz*/0003, *cuesta un riñón*/0003, *baja de las nubes*/0001,
*estar pez*/0024, *dejarse la piel*/L297, *estar de mala leche*/0093, *marear la
perdiz*/10-11).

⚑ That hit rate — roughly a third of everything sent today already covered, saturated or
not an idiom — suggests **running the lookup over a list before sending it** would save
more time than it costs. The tool takes a plain-text list on stdin.

**Yield: 7 draftable · 1 duplicate · 3 saturations · 5 not idioms · 1 gloss error worth
fixing into a real entry (*irse de la lengua*).**

---

## Spanish idiom list, 15 more (2026-11-21, fifth batch)

**4 are variants of queued rows · 1 pair contradicts itself · 10 new.**

### ⚑ Two entries on this list are inverses of each other, and one is labelled a "variant"

> *Más vale malo conocido que bueno por conocer* — better the devil you know
> *Mejor bueno conocido que malo por conocer* — **"variant of the 'devil you know' one above"**

They are not variants. They say **opposite things**: the first prefers the bad you know,
the second prefers the good you know. The attested Spanish proverb is the **first** —
*más vale malo conocido* — and the second is its deliberate inversion, a form that
circulates as a rhetorical exercise in flipping proverbs rather than as a saying in its
own right.

⚑ **This is the same failure the proverb book produced** with *amore vecchio non fa buon
brodo* (10-30), where an inverted proverb sat in the same collection as the real one.
**Draft only *más vale malo conocido*, and do not treat the second line as a regional or
stylistic variant.**

### ⚑ *Me suena a chino* — the Oct 11 chain is now complete

This is the **third independent confirmation** of the sketch made on 2026-10-11: *Per me è
arabo* ↔ Spanish *chino*. The Mexican form *está en chino* was confirmed 2026-10-29; the
Peninsular form *me suena a chino* arrives here. **Both Spanish variants are now sourced.**

And this list's own gloss supplies the third leg: *"it sounds **Greek** to me."* So the
full chain is documented from outside — **Italian says Arabic, Spanish says Chinese,
English says Greek.** Each language picks a different language to be the unintelligible
one. ⚑ The card is ES↔IT, but the English gloss is a legitimate aside in the bridge since
subscribers read English.

This has been the strongest unbuilt card in the queue since 11 October. It is now fully
sourced on both sides, with a regional variant for each.

### ⚑ *No hay tu tía* — the Spanish is a misunderstanding of itself

Verified against **RAE's *Diccionario panhispánico de dudas***: the phrase is not about
anyone's aunt. It is ***no hay tutía*** — *tutía* (also *atutía*) was a **zinc-oxide
medicinal ointment**, so the saying means *there is no remedy*. The spelling *tu tía* is a
folk reanalysis that stuck after the ointment went out of use.

That makes an unusual card: a Spanish idiom whose literal reading is wrong **in Spanish**,
not just in translation. The bank has nothing of that shape. Italian equivalent
(*non c'è niente da fare*) is plain, so it is likely an asymmetry entry where the
etymology carries it.

### Variants of rows already queued

| This list | Queued as | Note |
|---|---|---|
| Más vale prevenir que **curar** | **L212** — *Más vale prevenir que lamentar ↔ prevenire è meglio che curare* | ⚑ **This list's Spanish is the better half.** L212 pairs *lamentar* with Italian *curare*; the *curar* form given here matches the Italian exactly. Worth swapping. |
| Mejor tarde que nunca | **L308** — *más vale tarde que nunca* | *mejor* / *más vale* variant. |
| Nadar entre dos aguas | **L276** — *Estar entre dos aguas* | *nadar* / *estar* variant. L276's Italian is *essere in mezzo al guado*; ⚑ *tenere il piede in due scarpe* may be the closer pair — ES swims between two waters, IT stands in two shoes. |
| Mejor solo/a que mal acompañado/a | pending proverb-book row **#142** (logged 2026-10-30) — *Meglio solo che male accompagnato* | *mejor* / *más vale* variant again. |

### A — new, worth drafting

| Spanish | Italian sketch (unverified) | Assessment |
|---|---|---|
| Perder el norte | *perdere la bussola* | ⚑ Strong: Spanish loses **the north**, Italian loses **the compass** — the direction itself against the instrument that finds it. ⚑ Note the *perder/perdere* family is filling up: **L100** is *perder los estribos ↔ perdere le staffe*. Different meaning, same verb pair — check they read distinctly. |
| No dar tu brazo a torcer | *non darla vinta* | Spanish refuses to let its **arm be twisted**; Italian just refuses to concede. Spanish has the image, Italian the abstraction. |
| No estoy católico/a | *non mi sento in forma* | ⚑ Spanish borrows **religious** vocabulary for ordinary ill health — "I'm not catholic" meaning "I'm off-colour." No Italian counterpart does this. ⚑ Religion is already the bank's joint-largest theme at 16 with a standing saturation warning on the *santo* cluster; this is a different use of religious register, but count it. |
| Me importa tres pepinos | *non me ne importa un fico secco* | ⚑ **Third "couldn't care less"**, after *me vale gorro* (10-29) and *non me ne può fregare di meno* (11-11). But this one may be the best pair of the three: both languages dismiss by **naming a worthless food item and counting it** — three cucumbers against a dried fig. Decide the three together. |
| Montar un pollo | *fare una scenata* | ⚑ **Second "make a scene"**, after *no hagas un pancho* (10-29). Also ⚑ second *pollo*, with *ir como pollo sin cabeza* (third list). Two collisions on one row. |
| Me pone enfermo/a | *mi fa venire il nervoso* | Thin — close to transparent on both sides. |
| No hay tanto pan para tanto chorizo | — | ⚑ Peninsular, and it carries a **pun**: *chorizo* in Spain is also slang for a thief. The saying is about too many grasping hands, not just scarcity. Hard to pair and the pun will not survive; low priority. |

### Running tally, five lists

**74 expressions today.** Across them: ~16 markedly Peninsular, 5 non-idioms, 5 rhyme
rows, 2 inverted or mislabelled proverbs, and ~11 collisions or saturations against banked
or queued material.

**Yield: 10 new · 4 variants of queued rows (1 of which improves L212) · 1 inverted
proverb to discard · 1 chain completed (*chino*) · 1 RAE-verified etymology (*tutía*) ·
2 new collisions.**

---

## Spanish idiom list, 15 more (2026-11-21, sixth batch)

**1 already banked · 3 already queued · 2 are not idioms · 9 new.**

⚑ **Highest already-logged rate of the six lists** — and two of the hits were exactly the
pairings I would have proposed, already sitting in the queue with the same Italian.

### Already covered

| Expression | Where |
|---|---|
| Que sea lo que Dios quiera | **banked 0293** (`needs_review`) ↔ *Che Dio ce la mandi buona*. |
| Perder los estribos | queued **L100** ↔ *perdere le staffe* — noted there as a near-exact twin (both lose the **stirrups**). |
| Ser más raro que un perro verde | queued **L290** ↔ *Raro come una mosca bianca*. ⚑ The pairing is as good as it looks: both reach for an **impossibly coloured animal** — a green dog against a white fly — and neither is guessable from the other. Already logged; nothing to add. |
| Ser un gallina | queued **L314** ↔ *Sei un coniglio* — coward as **hen** against coward as **rabbit**. |

### ⚑ Spanish's hen does two jobs Italian splits between two animals

This list contains both ***ser un gallina*** (coward) and ***tener la piel de gallina***
(goosebumps). Against Italian:

| Sense | Spanish | Italian |
|---|---|---|
| coward | *gallina* — **hen** | *coniglio* — **rabbit** (L314) |
| goosebumps | *piel de gallina* — **hen** skin | *pelle d'oca* — **goose** skin |

**Spanish uses one bird for both; Italian uses two different animals, neither of them the
hen.** That is a cleaner observation than either row alone, and it is the kind of thing
the bank is for. ⚑ But under the no-cross-reference rule it cannot be said across two
cards — so either *piel de gallina* is drafted as its own entry (hen vs goose, which is
also the English split) and the coward row stays at L314 separately, or the two are
decided together. **Worth one editorial minute.**

### A — new, worth drafting

| Spanish | Italian sketch (unverified) | Assessment |
|---|---|---|
| Te falta un verano | *ti manca una rotella* | ⚑ **Best of the batch.** Both say someone is missing a part, and pick from completely different worlds: Spanish is missing a **season**, Italian a **little wheel**. Time against machinery for the same madness. ⚑ Check against banked **0002** (*estar como una cabra ↔ essere fuori come un balcone*), which already covers "crazy" — this is a different mechanism (something absent, not something odd), but confirm they read distinctly. |
| Tener la piel de gallina | *avere la pelle d'oca* | ⚑ Near-twin with one swap: Spanish's **hen**, Italian's **goose**. English sides with Italian, which makes the Spanish the odd one out — a useful note for an English-reading subscriber. See the hen table above before drafting. |
| Pillar el truco | *prenderci la mano* | Spanish **catches the trick**, Italian **gets the hand into it**. Modest but clean, and both are high-frequency. |
| Ponerse morado | *abbuffarsi* | ⚑ Spanish turns **purple** from overeating. Collides with the ***ponerse* + colour** frame in **0250** (*ponerse rojo como un tomate*) — same construction, different colour and sense. Check they do not blur. |
| Pillar el toro | *(unresolved)* | ⚑ Two flags. Bullfighting imagery, which the bank may or may not want; and **L623** already carries *a toro pasado, todos somos toreros*, so this would be a second *toro* row. Peninsular. |
| Ser un caradura | *avere una bella faccia tosta* | ⚑ **Collides with the 2026-10-29 row** *Ma che faccia tosta!* ↔ *¡Qué cara dura!*. Same expression in noun form. One row, not two — and the earlier note already corrected the card's "toasted face" gloss to *hard face*. |
| Ser un melón | *essere una zucca* | ⚑ **Crowded corner.** *Zucca* already appears in banked **0050** (*avere sale in zucca*) and in *essere una zucca vuota* (ines food set, 10-11); *melone* appears in proverb-book **#32**. Four rows around the same gourd. Decide the gourd before adding to it. |
| Por si las moscas | *non si sa mai* | Spanish has the image (literally "in case of the flies"), Italian the plain phrase. Likely an asymmetry entry. ⚑ Note *moscas* also appears in the *mosca bianca* pairing at L290 and in *en boca cerrada no entran moscas* (sketched 2026-08-30). |
| Ser firme como una roca | *solido come una roccia* | Near-exact calque in both directions. Freebie, very thin. |

### ⚑ Two entries are not idioms

*Por tu propio bien* ("for your own good") is an ordinary phrase.

And ***Qué hace una estrella tan bonita volando tan bajito*** is a ***piropo*** — a
chat-up line, not a fixed expression. Two problems beyond length: it has no Italian
counterpart to pair with (Italian *rimorchiare* lines are not fixed the same way), and
**whether the product teaches pickup lines at all is an editorial call**, not a drafting
one. Recommend leaving it out.

### Running tally, six lists

**89 expressions today.** Roughly: ~18 Peninsular, 7 non-idioms, 5 rhyme rows, 2 inverted
or mislabelled proverbs, ~15 collisions or saturations against banked or queued material.

**Yield: 9 new · 1 banked · 3 queued (two of them the exact pairings I'd have proposed) ·
2 not idioms · 1 structural finding (the hen) · 4 collisions.**

---

## Spanish idiom list, final batch (2026-11-21, seventh)

**1 already queued · 8 new · 2 puns (correctly excluded).**

### ⚑ *Tirar de la manta* is the idiom the fourth list was missing

The fourth list glossed ***desvelar un secreto*** as "let the cat out of the bag", and I
flagged it as a plain phrase with an English idiom pinned to it. ***Tirar de la manta*** —
"pull the blanket off" — **is** the real Spanish idiom for that sense, and it carries a
sharper meaning than the English: not an accidental slip but a **deliberate exposure**,
usually of a scandal someone else wanted buried.

**Use this row and drop *desvelar un secreto*.** ⚑ Second *manta* row though, with
*liarse la manta a la cabeza* (fourth list) — different sense, same noun.

### ⚑ The dismissal pair is euphemism-on-euphemism — the third such pair

***Vete a freír espárragos*** is already queued at **L315** against ***Vai a farti
benedire*** — and both are **softened stand-ins**: Italian sends you "to get yourself
blessed", Spanish "to fry asparagus", each in place of something coarser.

***Vete a hacer puñetas*** is the same move again, and its etymology is worth the card:
*puñetas* were the **lace cuffs on magistrates' robes**, laborious to embroider, so
sending someone to make them was sending them on a tedious, pointless errand (RAE's
*Diccionario histórico* carries *puñeta*; the legal press still writes about *idos a hacer
puñetas*). ⚑ **Register check**: *puñeta* is vulgar-adjacent in modern use, which is
exactly why the euphemism exists.

That makes **three pairs where both halves are euphemisms**: *no manches ↔ non capire un
cavolo*, *me vale gorro ↔ non me ne può fregare di meno* (11-11), and now this one. **The
euphemism entry has more good candidates than it needs — pick one and close it.**

### ⚑ Religion is about to become a composition problem, with numbers

Current bank themes: discourse **24**, food **20**, time **19**, religion **16**, animals
**16**.

The 2026-10-11 audit flagged that the five *santo* rows sitting in the Ready list would
push religion to **21** and make it second-largest. This list adds two more —
***tiene más razón que un santo*** and ***una verdad como un templo*** — which would take
it to **23**, past food and time and within one of discourse.

**Recommend capping it now**: pick at most two religious-register rows from the whole
standing set rather than deciding each on its own merits. Of the ones on the table,
*una verdad como un templo* is the more interesting (a truth measured by the size of a
building), and *más razón que un santo* is closer to filler.

### A — new, worth drafting

| Spanish | Italian sketch (unverified) | Assessment |
|---|---|---|
| Tomar la penúltima | *(no IT equivalent known)* | ⚑ **Best of the batch, and the superstition is the card.** You never order *la última* — naming the last drink invites the last of other things — so you order the **second-to-last**, however many of those there are. The word exists to dodge an omen. Nothing in Italian does this; likely an asymmetry entry, and a memorable one. |
| Tener vista de lince | *avere occhio di lince* | ⚑ **Same animal — and that is the finding, inverted.** Spanish and Italian both pick the **lynx**; English picks the **eagle**. That is the mirror image of the *chino / arabo / Greek* chain, where all three differ. Thin on the ES↔IT axis precisely because they agree — the interest lives in the English contrast, which the bridge can only note in passing. Draft as a freebie or not at all. |
| Tener más cara que espalda | *avere una bella faccia tosta* | ⚑ **Third shamelessness-via-face row**, with *ser un caradura* (sixth list) and *¡Qué cara dura! ↔ Ma che faccia tosta!* (10-29). Three Spanish forms, one Italian. This one is the most vivid — more face than back — but they cannot all ship. |
| Una verdad como un templo | *una verità sacrosanta* | ⚑ Both measure truth with religious vocabulary: Spanish by the **size of a building**, Italian by **sanctity**. Good pair — but see the religion cap above. |
| Tener pocas luces | *non essere una cima* | Spanish is short of **lights**, Italian is not a **peak**. ⚑ The alternative Italian (*essere una zucca*) runs into the gourd pile already noted — 0050, *zucca vuota*, *melón*. Use *cima*. |
| Tiene más razón que un santo | *(plainer in IT)* | Filler relative to the others, and it adds to the religion count. Lowest priority of the new nine. |

### The two puns — correctly out of scope

You already marked these as not idioms, which is right, and the reason is structural:
**a pun cannot have a pair.** *Es pera / espera* works only because of how those two
Spanish strings sound; there is no Italian expression it corresponds to, so there is
nothing to put in the `it` field. The schema has no shape for a one-sided joke.

⚑ There is a legitimate entry *near* them — that neither language's wordplay survives the
crossing — but that is an essay, not a card, and it would break the no-cross-reference
rule by needing examples from both sides.

### Across all seven lists

**98 expressions** sent today. Roughly:

| | count |
|---|---|
| Already banked | 8 |
| Already queued (incl. variants of queued rows) | 14 |
| Not idioms, or puns | 9 |
| Collide or saturate against banked/queued material | ~17 |
| Inverted, mislabelled or wrongly glossed | 4 |
| **Genuinely new and worth drafting** | **~55** |
| …of which markedly Peninsular | ~18 |

**The four decisions that now block the most rows**, none of which needs research:

1. **Dialect pass** on the ~18 Peninsular rows — one ask to the Spanish reviewer, prevents
   eighteen later corrections.
2. **Rhyme asymmetry** — five rows waiting (*más feliz que un regaliz*, *a otra cosa
   mariposa*, *entre broma y broma*, *chi si loda s'imbroda*, *l'amore non è bello…*).
3. **Euphemism entry** — now three strong candidate pairs; pick one, retire the rest.
4. **Religion cap** — before the *santo* rows and these two take the theme to 23.

---

## Italian register ladders, basic → advanced (2026-11-24)

**A different shape from the other lists:** each row is Italian-to-Italian, a plain way of
saying something beside a more idiomatic one. **These are not candidate pairs** — each
*advanced* form is a candidate **Italian half** that still needs a Spanish partner found.

**1 already banked · 1 overlaps a pending row · 5 new.**

| Advanced form | Status |
|---|---|
| Ti sto prendendo in giro | **banked 0006** (`approved`) — *Prendere in giro ↔ Tomar el pelo*. Covered. |
| Non c'entro niente | overlaps the *Non c'entra niente* row logged 2026-10-27, but ⚑ **not the same entry**: that one is third-person ("it has nothing to do with it"), this is first-person and means **"it's not my fault."** Same verb, different speech act — the reviewer should say whether one card can carry both. |

### ⚑ The real finding: five of these seven are clitic constructions, and the bank barely covers them

| Advanced form | Construction |
|---|---|
| **Ti** va un caffè? | dative clitic + impersonal *andare* |
| **Mi** sa di no | dative clitic + *sapere* used for a hunch |
| Non **c'**entro niente | locative *ci*, lexicalised into *entrarci* |
| Non **te la** prendere | *prendersela* — reflexive + fossilised *la* |
| Non **me la** sento | *sentirsela* — reflexive + fossilised *la* |

Only *sono di corsa* and *prendere in giro* are ordinary.

Searching the bank for entries whose bridge actually teaches this territory returns
**four**: 0012, 0035 (*valere la pena* — the partitive *ne*, and the best of them), 0295
and 0310. **Four entries out of 236 for what is arguably the single most systematic gap
between the two languages.**

⚑ **But the trap is not the one it looks like, and getting this wrong would make a bad
card.** Spanish is not missing the machinery — it has lexicalised-clitic verbs of exactly
this kind: *arreglárselas*, *apañárselas*, *vérselas con*, *jugársela*. A Spanish speaker
is entirely at home with a verb that carries a meaningless *la*.

What Spanish lacks is **the specific inventory**: no locative *ci*, no partitive *ne*, and
a different set of verbs carrying the fossilised clitic. So the real interference is
**overgeneralisation, not absence** — the speaker reaches confidently for a construction
they own and picks the wrong verb for it. That is a harder and more useful card than
"Italian has clitics and Spanish doesn't," which is false.

### Spanish partners worth researching

| Italian | Spanish sketch (unverified) | Note |
|---|---|---|
| Ti va un caffè? | *¿Te apetece…?* / MX *¿Se te antoja…?* | ⚑ **Strongest structural twin here.** Both put the person in the **dative** and let the thing do the verb — the coffee goes to you, the coffee appeals to you. Spanish has this exact shape, which makes it a clean way into the pattern. ⚑ *Apetecer* is Peninsular; MX *antojarse* is the anchor form. |
| Mi sa di no | *Me da que no* / MX *me late que no* | ⚑ Both build a hunch from a **sense verb plus dative** — Italian from tasting/smelling (*sapere di*), MX Spanish from a heartbeat (*latir*). Good divergence, same grammar. |
| Non te la prendere | *No te lo tomes a mal* / *no te piques* | Both reflexive, both with a clitic standing for nothing nameable. |
| Non me la sento | *(no clean ES form found)* | Hardest of the five. Likely an asymmetry entry. |
| Sono di corsa | MX *ando apurado* / *voy con prisa* | Plain on both sides; low priority. |

### Recommendation

**This is one or two cards, not five.** Every row above teaches the same structural point,
and under the no-cross-reference rule five cards would each have to introduce the dative
or the fossilised clitic from scratch. Same grouping decision as the vocative/intensifier
cluster (2026-10-24) and the rhyme rows.

Pick the sharpest pair for each of the two distinct mechanisms — **dative-subject**
(*ti va* ↔ *se te antoja*) and **fossilised clitic** (*non te la prendere* ↔ *no te lo
tomes a mal*) — and let the rest go to Unmatched.

**Yield: 1 banked · 1 overlapping · 5 new Italian halves needing Spanish partners · 1
structural gap identified (clitics: 4 entries in 236) · 1 correction to how that gap
should be framed.**

---

## @learnandloveitalian — Valentine's calendar, 4th series (2026-11-24)

**Tier A.** 12 months legible. **1 already queued · 1 drafted to the bank (0325) · 10 new.**

Fourth distinct 14-card calendar from this account, after idioms (10-11), spoken slang
(10-14) and exclamations (11-11).

### ⚑ The Valentine's framing doesn't survive contact with the schedule

The bank already has a Valentine's card: **0077** (*Ti voglio bene*, `approved`), pinned to
a window of **02-12 → 02-14**. That is **three days**. Twelve cards cannot go into a
three-day window, so this set cannot be seasonal in the way the calendar implies — at most
two or three could be pinned, and the rest have to earn ordinary rotation slots on merit.

Worth noting the existing seasonal distribution while deciding: **Christmas has six**
entries (0290, 0291, 0292, 0312, 0313, 0314 — all `needs_review`), **Valentine's has one**,
and there are four loose season tags (autumn, summer, winter ×2). The calendar is lopsided
toward December, so one or two more February cards is reasonable; twelve is not.

### ⚑ Drafted: 0325 — *Te extraño ↔ Mi manchi*

The strongest card in this batch and in several weeks, so I wrote it rather than queuing it.
**A2, difficulty 2** — and A2 is the bank's thinnest band at 41 of 236.

The two languages put the subject in opposite places. *Te extraño* makes the **speaker** the
subject: the sentence is about my state. *Mi manchi* makes the **absent person** the subject
and the speaker a dative: the sentence reports something you are doing by not being there.

**The trap reverses the meaning.** A Spanish speaker mapping word for word produces
***ti manco*** — grammatical Italian meaning *"you miss me."*

And the nice part: **Spanish has both constructions.** *Me haces falta* puts the absent
person back in the subject slot, exactly as Italian does — so the Italian shape is not alien
to Spanish, it is simply not the default. Entry filed `needs_review`, deliberately unpinned.

### Already queued

***Ti va di fare due passi*** → **L126**, *Fare due passi ↔ dar una vuelta / dar un paseo*,
from the Italian reviewer's own material. No new row.

### ⚑ *Ti va di…* appears three times, which settles yesterday's question

March, October and December all use it. Combined with *Ti va un caffè?* from the register
ladders (11-24), that is **four sightings of the same construction from Tier A material in
two days**.

That removes any doubt about frequency. The recommendation from the ladders section stands
and is now better evidenced: ***Ti va di…* ↔ MX *¿Se te antoja…?*** should be the
dative-subject card. Both put the person in the dative and let the thing do the verb.

### A — the rest

| Italian | Spanish sketch (unverified) | Note |
|---|---|---|
| Mi piaci (un sacco) | *Me gustas (un montón)* | ⚑ **Structurally identical** — both dative, both with the liked person as subject. A freebie, but very high frequency and A1/A2. ⚑ Tension worth noting: this being identical is what makes 0325 surprising, but the no-cross-reference rule means 0325 cannot lean on it. *Un sacco* also logged 10-24. |
| Sei nei miei pensieri | *Estás en mis pensamientos* | Near-exact calque both ways. Thin. |
| Hai un bel sorriso / Hai degli occhi bellissimi | *Tienes una sonrisa preciosa* / *unos ojos preciosos* | ⚑ The grammar is the only content: Italian needs the partitive *degli* where Spanish uses bare *unos*. That is a real B1 point, but it is a **grammar note wearing a compliment as a costume** — decide whether the bank teaches partitives this way. |
| Mi piace stare con te | *Me gusta estar contigo* | Transparent both ways. Not an idiom. |
| Hai da fare stasera? | *¿Tienes algo que hacer esta noche?* | ⚑ Italian *avere da* + infinitive has no clean Spanish parallel — that is the entry, not the question itself. |
| Posso offrirti un caffè? / Mi dai il tuo numero? | — | ⚑ **Chat-up lines.** Same editorial question as the *piropo* on 2026-11-21, which was left out. *Mi dai il tuo numero* is squarely a pickup line; *posso offrirti un caffè* is ordinary politeness. Decide the category once rather than per card. |

**Yield: 1 queued · 1 drafted (0325) · 10 new · 1 scheduling constraint surfaced (3-day
Valentine's window vs 12 cards) · 1 construction confirmed four times over (*ti va*).**
