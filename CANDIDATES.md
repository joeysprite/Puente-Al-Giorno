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
