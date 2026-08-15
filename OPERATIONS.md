# Operations — services, pipeline, runbook

*The external-services layer. Internal architecture lives in `HOW-IT-WORKS.md`;
the entry format in `SCHEMA.md`; date→entry logic in `SCHEDULING.md`. This
document covers everything that touches the outside world.*

---

## 1. Architecture in one diagram

```
   bank/*.json  ──┐
   events.json    │
   overrides.json ├──►  GitHub Actions  ──►  commits generated files  ──┐
   brand.json   ──┘     (the only compute)     into landing/           │
                                                                        │
                                          ┌─────────────────────────────┘
                                          ▼
                         Netlify  ──►  serves landing/  ──►  public website
                                                                 │
                                                                 │ signup form POSTs
                                                                 ▼
                                                            Buttondown
                                                         (list + sending)

                         Instagram  ◄──  manual upload of generated PNGs
```

**The load-bearing principle: there are no servers.** Nothing is computed at
request time. Every public artifact is generated ahead of time, committed to
git, and served as a static file. This means:

- The site cannot go down because of a bug in our code — only because a host is
  down.
- Any past state is reproducible from the repository alone.
- There is no database. `bank/*.json` is the single source of truth, and every
  other surface is *derived* from it.

---

## 2. GitHub — the engine

**Repository:** `https://github.com/joeysprite/Puente-Al-Giorno` (public, `main`)

This is not merely storage. It is where all compute happens.

### Workflows — `.github/workflows/`

| Workflow | Trigger | What it does |
|---|---|---|
| `validate.yml` | every push | Runs the bank validator, checks reviewer worklists are current, asserts scheduler invariants across four years. **Fails the build if the bank is inconsistent.** |
| `daily-landing.yml` | 04:00 UTC daily | Recomputes today's entry, rebuilds the landing and practice pages, commits the result. Netlify then auto-deploys. |

### Why CI matters here

The governing rule of this project — *nothing ships unreviewed* — is enforced by
the validator, not by anyone remembering it. The validator is the trust boundary.
If CI is red, the correct response is to fix the bank, never to bypass the check.

**Operational note:** the repository is the only durable copy of this work. A
local working directory is disposable and has been lost before. Push often.

---

## 3. Netlify — the web host

**Site:** `aquamarine-biscochitos-58e5c1.netlify.app`
**Config:** `netlify.toml`, versioned in the repo (deliberately *not* configured
through the dashboard, so deploy settings live in git like everything else).

### Key configuration

```toml
[build]
  publish = "landing"
  command = ""          # ← empty. Netlify builds NOTHING.
```

**This is the single most important fact about Netlify here.** The build command
is empty. Netlify is a file server. All generation happens in GitHub Actions,
which commits its output into `landing/`; Netlify simply serves whatever is
there.

Consequences:

- **A change is only live if it was committed.** Regenerating a file locally does
  nothing until it is pushed.
- If the site looks stale, the question is never "did Netlify build correctly" —
  it is "was the file committed, and are deploys enabled."
- Deploys cannot fail from a build error, because there is no build.

### Headers set in `netlify.toml`

- `/fonts/*` — cached one year, immutable. Fonts are **self-hosted** because
  Google Fonts transmits visitor IPs, and the privacy policy promises otherwise.
  This is a compliance decision, not a performance one. Do not swap in a CDN font.
- `/cards/*` — cached one day.
- Global — `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`.

### ⚠ Current state

**Builds are STOPPED.** Nothing deploys until they are reactivated in the Netlify
dashboard. Any test against the live URL before reactivating is testing a stale
page and its result is meaningless.

**To bring the site current:**
1. Netlify dashboard → reactivate builds
2. Trigger deploy
3. Hard-refresh (`Cmd/Ctrl+Shift+R`) — otherwise you may be served a cached copy
4. Confirm the page content matches what you expect before drawing conclusions

### Waitlist vs live

`tools/build-landing.mjs` takes a `--waitlist` flag which switches the page
between two modes:

| | Waitlist (current) | Live |
|---|---|---|
| Robots | `noindex` | indexable |
| Eyebrow | "Opening soon" | "A daily email" |
| CTA | "Be there for entry one" | "Get tomorrow's pair" |

Going live is a one-flag change — but it should not be flipped until entries are
approved, because live mode promises a daily email the system cannot yet send.

---

## 4. Buttondown — the list and the sender

**Slug:** `unpuentealgiorno`
**Form endpoint:** `https://buttondown.com/api/emails/embed-subscribe/unpuentealgiorno`

### The form contract

The signup form in `landing/index.html` posts these fields:

| Field | Purpose |
|---|---|
| `embed=1` | hidden; tells Buttondown this is an embedded form |
| `email` | the subscriber address |
| `metadata__l1` | **the important one** — `en` \| `es` \| `it` |

`metadata__l1` captures the subscriber's *starting* language. Buttondown's
convention is that any field prefixed `metadata__` becomes subscriber metadata.

### Why `l1` is load-bearing

The bridge warnings are **directional**. A Spanish speaker learning Italian and
an Italian learning Spanish need *different* warnings from the same entry
(`bridge.interference.es_to_it` vs `it_to_es`). `l1` is what selects which
direction a given subscriber is shown.

**If `l1` is not captured, the email cannot be personalised and the product's
core differentiator silently degrades to a generic idiom newsletter.** This is
why testing the metadata round-trip matters more than testing that signup
"works."

### ⚠ Current state and the test that matters

Never tested end to end. No email has ever been sent. **The email renderer does
not exist** — it is the last unbuilt component, deliberately queued behind first
approvals.

**Signup test procedure:**
1. Reactivate Netlify builds and deploy first (see §3) — otherwise you test a
   stale form
2. Submit a real address you control, selecting **Español** — *not* the default
   English, since `en` is pre-checked and would pass even if the radios were
   broken
3. Buttondown → Subscribers → confirm the record exists **and carries
   `l1 = es`**
4. Confirm the confirmation email arrives

**The failure mode to watch for:** subscriber appears but with *no* metadata.
That means the `metadata__` prefix is not being honoured on the current plan or
settings, and the directional feature has no data to work from. Find this before
scale, not after.

---

## 5. Instagram — the audience surface

**Handle:** `@unpuentealgiorno` (also registered on X and Bluesky)

Posting is **manual by design**. There is no auto-poster and no Instagram API
integration. Assets are generated locally and uploaded by hand. This is a
deliberate constraint: the review gate means a human should be in the loop at
publish time anyway.

### Generated assets

| Tool | Output | Notes |
|---|---|---|
| `tools/build-social.mjs` | daily entry carousel, 1080×1080 | ⚠ **Format is currently ambiguous — see below** |
| `tools/build-intro.mjs` | 4-card intro carousel; `--variant b` for the warmer voice | one-off pinned post |
| `tools/build-teaser.mjs` | single launch teaser card | `--date`, whole square renders as a calendar page |
| `tools/build-archive.mjs` | website archive page | `--posted 0041,0089,…` — the backfill mechanism |

### ⚠ Known inconsistency: panel count

The **code comments** in `build-social.mjs` describe a three-panel format (pair /
bridge / traps). The **cards actually on disk** are five-panel sets, generated by
an earlier revision. These disagree.

This must be resolved before the format becomes a public template — either
update the code to match the five-panel output, or regenerate all cards to
three. A related open question is square (1080×1080) vs 4:5 (1080×1350); the code
builds square while a comment argues for 4:5.

### The backfill strategy

Instagram is the primary surface; the website *accumulates* what has been posted.
`build-archive.mjs --posted <ids>` takes the ordered list of published entries
and renders a reverse-chronological archive page. Today that list is maintained
by hand; a future posting workflow should append to it automatically.

---

## 6. Fonts — an operational gotcha

Three families: **Newsreader** (serif, the expressions), **IBM Plex Mono**
(labels and metadata), **IBM Plex Sans** (body copy). All open-source.

The `.ttf` files live **outside the repository** (conventionally `/tmp/cardfonts`)
because of their size, and generators reference them at render time via a
`--fonts` flag. Two consequences:

1. **Image generation breaks on a fresh machine until fonts are fetched.** Text,
   HTML, and email work are unaffected.
2. `tools/font-metrics.json` holds real advance widths extracted from the actual
   TTFs. This is why generated cards never overflow: line breaking is *measured*,
   not estimated. If a font is ever swapped, these metrics must be regenerated or
   layouts will silently drift.

Note the separate, self-hosted copy under `landing/fonts/` served by Netlify —
that one exists for the privacy reason in §3 and is unrelated to card rendering.

---

## 7. Runbook

**Add entries and publish**
```bash
node tools/validate.mjs bank reviewers.json events.json   # must PASS
node tools/build-review-lists.mjs                          # refresh worklists
git add -A && git commit -m "…" && git push                # CI validates
```

**Record reviewer sign-off** — set `review.status`, `esReviewer`/`itReviewer`
(must be allowlisted ids in `reviewers.json`), and `verifiedOn`/`verifiedBy` on
each source. The validator enforces all of this at approval; drafts may be
incomplete, approvals may not.

**Rebuild the public site**
```bash
node tools/build-landing.mjs --today        # add --waitlist while unapproved
node tools/build-match.mjs
git commit && git push                       # Netlify serves on deploy
```

**Generate social assets**
```bash
node tools/build-social.mjs --only 0041 --date 2026-08-15
node tools/build-teaser.mjs --date 2026-08-15
node tools/build-intro.mjs --variant b
```

**Check the schedule**
```bash
node tools/schedule.mjs 2026 --check          # asserts invariants
node tools/schedule.mjs 2026 --weekend        # Sat+Sun share one entry
```

---

## 8. Known gaps and stale items

<!-- STATE:BEGIN -->
<!-- GENERATED by tools/build-docs-state.mjs — do not hand-edit. Run the tool. -->

*State derived from the repository on 2026-07-30.*

### Content

| | |
|---|---|
| Entries in bank | **152** (149 active, 3 retired) |
| By status | approved: 129 · draft: 20 · retired: 3 |
| **Approved and shippable** | **129** |
| CEFR mix (active) | A2: 30 · B1: 65 · B2: 54 — B1+B2 = 80% |
| Sketched in queue | ~212 |
| Alternative pairings | 10 (1 rejected) |
| Allowlisted reviewers | jf (en), native-mx-01 (es), native-es-02 (es), native-it-03 (it) |

### Components

| Component | Built |
|---|---|
| Email renderer | **no** |
| Landing page builder | yes |
| Social card builder | yes |
| Teaser builder | yes |
| Archive backfill | yes |
| Scheduler | yes |
| Validator | yes |
| Netlify config | yes |
| CI workflows | yes |

Tooling: 18 generators in `tools/`.

### Automatically detected issues

- Email renderer not built — the newsletter cannot send.

<!-- STATE:END -->

### Hand-maintained gaps

*Not machine-detectable. Review these whenever the state block above changes.*

| Item | Status |
|---|---|
| Email renderer | **Does not exist.** Last unbuilt component. |
| Buttondown flow | Never tested end to end |
| Netlify builds | **Stopped** — must be reactivated before any live test |
| Social panel count | Code says 3, disk has 5 — unresolved |
| Card aspect ratio | Square vs 4:5 — undecided |

| `HOW-IT-WORKS.md` | Stale — its "current state" section reports 43 entries; actual is 152 |
| `privacy.html` | Contains unfilled placeholders |
| Custom domain | Not set up; `SITE_URL` still points at the Netlify subdomain |
| **Bridge content has no qualified reviewer** | Every reviewer in `reviewers.json` is registered with a single language, and the validator requires a native of the side being signed. A bridge is a claim about the *relation* between two languages, so no monolingual native is competent to verify it. **Consequence: whitepaper §7 item 1 (route interference to reviewers) cannot be executed with the current roster.** Needs either a reviewer native in one language and competent in the other, or a two-reviewer protocol where each confirms only the half they can see. |
| Reviewer terms | Italian commercial terms agreed; Spanish terms unsettled. **Credit lines and ownership of corrections unsettled for both** — resolve before the next review batch. Rates and personal contact details are deliberately kept out of this public repository. |
