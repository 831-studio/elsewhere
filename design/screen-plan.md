# Elsewhere — Phase 1 Portfolio Plan (9 screens)

Prototype target: 9 extremely polished screens shown inside the PhoneFrame mockup
(true transparent notch cutout — already built). React Native + Expo, tokens in
`theme.ts`. This doc is the source of truth for scope, experience decisions, and
the polish bar. Design system is still in exploration — iterate in `theme.ts`.

## Thesis (the portfolio story)

**One agent, many surfaces — never the same chat twice.**
Six of the nine screens are agent moments. The thesis is that a great agent
expresses itself through *different interaction patterns* per job — an approval
card, an authored document, a departure board, a decision canvas, a voice
overlay — not one endless chat thread. Personality concentrates in the wordmark
and a single presence mark; the chrome stays silent; the imagery and the
interactions carry the experience.

## Experience principles (research-derived)

1. **De-bubbled agent voice.** The agent speaks in full-width typeset text on the
   page (Body 16/24 Schibsted) — no gray bubbles, no avatar spam. User messages
   are quiet right-aligned hairline pills. (Claude/ChatGPT/Perplexity all
   dropped assistant bubbles; bubbles read "support widget.")
2. **Trust is people, not scores.** Every recommendation carries avatar-chip
   provenance — "via Maya's Rome trip" — never star ratings or review counts.
   Perplexity cites the web; Fin cites help docs; *nobody cites friends*. This
   is Elsewhere's unclaimed UI primitive and it appears on every screen it can.
3. **Consent is visual.** Agent proposals render provisional (reduced opacity /
   hairline state) and "develop" into full ink as each group member approves.
   Consequential actions (money, cancellations) get an intent-preview card —
   headline, numbered plain-language steps, **Proceed / Edit / I'll handle it**.
   Small actions get explain-and-undo instead ("Aisle seat, per your profile").
   Never approval-fatigue modals.
4. **Status is narration, not spinners.** The working agent shows staged,
   truthful steps in Meta type — "Checking LATAM nonstops · Comparing 3 stays in
   San Blas · Drafting day 2" — each resolving quietly, collapsing to one
   expandable "what I did" line when done. No fake typing, no fake progress.
5. **Airport-board data language.** All times, prices, flight numbers, PNRs in
   tabular figures (Flighty's move). One signature data visualization — the
   thin route line / day-dots — reused at every size so the app has a
   recognizable data language.
6. **Color discipline.** `#3D43FB` appears on at most ~2 elements per screen
   (primary action, presence mark, or pending state). Chrome is ink on white
   with hairlines; photography is the only other color. No sparkle emoji, no
   purple AI gradients — the agent is identified by voice and typography.
7. **Phase-aware surfaces.** Cards and screens are explicit state machines
   (Flighty's 15 flight states; Airbnb's "living itinerary"): the same
   component reads differently 3 weeks out vs. day-of. Portfolio gold: show one
   component in two states.
8. **A strict motion budget.** One shared-element hero transition per flow
   (card image → detail header) plus 2–3 semantic micro-moments (save
   confirmation, approval develop, presence mark). 200–300ms, ease-out
   entrances; nothing bounces; nothing loops.

## The presence mark (agent motion identity) — ON HOLD

One 24px element in accent blue expresses agent state everywhere: **idle** (still
dot) · **listening** (soft breathing) · **working** (dot elongates into a moving
hairline) · **speaking** (subtle amplitude). Small and peripheral — never a
full-screen orb.

**Status:** paused per user (2026-07-04) — a lone accent dot read as random, not
brand. No accent-colored graphic elements anywhere until the core UI settles;
brand color/graphic moments get designed as a system afterward. The
`PresenceMark` component stays in the codebase, unused, pending that pass.

## App IA (differs from portfolio presentation order)

Splash → **Home**, a land-and-orient launcher (Google Flights logic):
destination + dates pill with Flights · Hotels · Experiences chips (book it
yourself), the concierge card (build it in conversation), PLANNING, EXPLORE +
city doors, NEW COLLECTIONS. The feed and trip hubs are destinations one tap
from home — the app never lands on a feed.

**Nav (confirmed):** Home · Search · Trips · You. Trips (custom suitcase icon)
is the collection of trip hubs — the trip is the app's core object. Saving is
an *action on content* (bookmark glyph on cards), never a nav destination;
trip-less saves land in a "Someday" collection.

## Geometry (confirmed) — a two-shape system

**Pill = instrument** (fields, chips, buttons, nav capsule) · **square,
radius 4 = everything else** (imagery, covers, cards, surfaces) · **circles =
people** (avatars; a 1:1 instrument like the mic button is a pill at 1:1).
Nested corners never exceed the parent's. One sentence: *the rounder it is,
the more it's an instrument; the squarer, the more it's the world.* Tokens:
`radius.square` / `radius.pill` in theme.ts — no other radii.

## Voice (confirmed)

- **"Elsewhere" is capitalized in running text.** Lowercase belongs to the
  wordmark only (logotype styling, not an orthography rule).
- **The agent is "your concierge"** in UI copy — warmer than "agent," and
  distinguishes the conversation from the app itself. Say "your Elsewhere
  concierge" only where the brand isn't already present; when the wordmark is
  on screen, drop the brand name (it reads as the brand naming itself).
- Concierge card copy (home): "Build a trip with your concierge" /
  "Start with any idea — type or talk" (placeholder inside the pill input).
- **Concierge surface pattern (confirmed):** a `surfaceMuted` paper card
  (square) holding a white pill input, with a CENTERED headline above the
  pill. Centered prompt-over-input is the recognized AI-assistant convention
  (Gemini/ChatGPT) and the only centered text besides the wordmark — the
  concierge's spaces behave specially, everything else keeps the left axis.
  Reuse this grammar wherever the concierge appears.

## The nine screens (presented in journey order)

Portfolio ordering tells a story: brand → identity → dreaming → deciding →
planning → booking → the agent quietly working for you.

### 1. Splash
- **Job:** the brand's first breath. Quiet white field → the script wordmark
  is *signed*: a left-to-right write-on reveal (~900ms, ease-in-out), brief
  hold, then dissolve into the first screen. No tagline, no spinner, no loop.
- **Hero detail:** the signature write-on itself — the launch moment is the
  brand signing its name. No added elements, no color; the accent stays
  reserved for the agent's presence mark inside the app.

### 2. Traveler profile — "the travel passport"
- **Job:** the identity that powers the agent (screen 3 in original list).
  One scrollable screen: preferences, friends, pins/favorites.
- **Form:** a collection, not a form. Preferences as elegant stamps/chips
  (window seat, vegetarian, oneworld Sapphire); a visited-places moment; past
  trips as horizontal filmstrips (Retro pattern); friends as quiet avatar
  clusters — names, never counts.
- **Hero detail:** the **autonomy dial** — plain-language trust settings
  ("Book anything under $50 without asking" / "Always ask before changing
  flights"). Nobody in travel has designed agent-trust as a relationship
  moment. Empty slots are designed invitations, beautiful at 40% complete.

### 3. Inspiration feed (by city/country)
- **Job:** discovery + saving for current/future trips; recommendations from
  friends and people you follow. Lives behind the EXPLORE door on home — a
  destination for wandering, never the landing surface.
- **Form:** Pinterest uneven-bottom masonry, caption-less tiles, corner cues.
  Save = curation: tap → soft confirmation → lightweight "which trip?" sheet
  with collaged trip covers (board-as-moodboard).
- **Hero detail:** friend-avatar provenance chips on tiles; a city header that
  is the one Bricolage "magazine moment" of the screen ("Mexico City").

### 4. Where to go — exploratory discovery
- **Job:** agent helps pick the destination (weather, seasonality, vibe).
- **Form:** browsing, not chat. Full-bleed destination canvas; the agent's
  de-bubbled voice sits as a sheet over it; each user utterance visibly
  re-sorts the canvas (Kayak split-attention, calmed). Season/weather
  intelligence as quiet Meta chips ("Dry season · 24° days · shoulder pricing").
- **Hero detail:** the canvas *reacting* to conversation — the user sees the
  agent listening.

### 5. Initial itinerary — the artifact
- **Job:** agent develops and presents a first itinerary.
- **Form:** agent output as a *document*, not messages (Claude Artifacts
  pattern): a beautifully typeset trip document — full-bleed day headers,
  timeline items with the day-dots motif, friend citations on picks.
  Build-up uses staged narration (principle 4), then the document reveals.
- **Hero detail:** the **version scrubber** — "v3 · after Maya's museum swap" —
  flip through drafts like pages. Conversation edits the document; the document
  animates, not the chat.

### 6. Flights + points optimization
- **Job:** agent presents flight options and the smartest way to pay.
- **Form:** departure-board rows (Flighty): `10:05 → 15:20 · LIM–CUZ` in
  tabular figures, airline/price quiet, one status tint. The agent's pick
  marked by the presence dot + one rationale line referencing the profile.
- **Hero detail:** the **points panel**: "Pay $612 — or 45k Amex → Avios,
  ~1.4¢/pt" as a calm comparison, with the agent's recommendation and an
  intent-preview card to execute the transfer/booking.

### 7. Hotel vs. house — the decision canvas
- **Job:** agent helps 5 women decide: hotel or rental house in Peru.
- **Form:** structure-led (vs. #4's imagery-led browsing): two editorial
  columns side by side — one hotel, one casa — photography on top, then a
  quiet needs matrix rendered against *the group*: 5 beds · shared mornings ·
  spa · walkability · per-person/night in tabular figures.
- **Hero detail:** the agent's take as a short de-bubbled paragraph at the
  bottom citing group context ("Rosa needs a quiet room; the casa's back
  bedroom solves it") + friend provenance on each property.

### 8. Proactive change — the approval card
- **Job:** agent noticed a table opened at a wanted restaurant; asks to change
  that night's plan and update the itinerary.
- **Form:** quiet push ("A table opened at Central — I have an idea") → opens
  directly to an inline **intent-preview card**: the specific change as
  numbered steps (cancel Isolina Thu → book Central 8:30 → shift Barranco walk
  to Fri), rationale line, **Proceed / Edit / I'll handle it**.
- **Hero detail:** the group layer — Maya and James's avatars on the card
  developing from provisional to full ink as approvals land ("2 of 4 approved").
  This screen carries the multiplayer thesis.

### 9. Voice — seat change
- **Job:** voice interaction; agent re-seats the group closer together,
  optimizing price/comfort.
- **Form:** **editorial voice UI** (unclaimed territory): no orb takeover. The
  seat map stays fully visible; a slim listening bar with the presence mark
  sits at the bottom; live transcription set like a magazine pull-quote; seats
  visibly re-assign as the agent works; price/comfort delta resolves in
  tabular figures ("4 together · +$36 total · exit row").
- **Hero detail:** interruption works — speak and the agent stops. Voice as a
  layer over the task, never instead of it.

## Shared component strategy

Build once, reuse across screens:
- `PhoneFrame`, `Wordmark` — done
- `PresenceMark` — the agent dot (idle/listening/working/speaking)
- `AgentVoice` — de-bubbled agent text block; `UserPill` — quiet user message
- `IntentCard` — headline / numbered steps / Proceed–Edit–Handle-myself
- `ApprovalCluster` — overlapping avatars with provisional→ink develop states
- `StatusNarration` — staged working steps that collapse to a summary line
- `ProvenanceChip` — tiny avatar + "via Maya's Rome trip"
- `BoardRow` — tabular-figure flight/option row; `RouteLine` — signature viz
- `SaveSheet` — trip picker with collaged covers
- `SectionLabel`, `Chips`, `Filmstrip`
- `data/trip.ts` grows into the single fixture for people/places/flights
- A **screen registry + dev switcher** so all 9 screens live in the frame and
  can be flipped through for capture (and later, a scripted walkthrough).

## Apple-grade polish checklist (audit every screen before calling it done)

Type: every element maps to a named scale step — no invented sizes ·
tabular figures for all data · baselines and hairlines on the grid.
Spacing: 8pt rhythm, one constant screen margin · nothing within 8pt of the
home indicator · touch targets ≥ 44pt.
Motion: 200–300ms ease-out entrances, ~150ms micro-feedback · no bounce, no
loops, no linear · one shared-element transition per flow · interruptible.
States: every component designed in default / loading / empty / error ·
skeletons (hairline-colored) over spinners · empty states are invitations ·
pressed states on everything tappable (~0.96 scale or 8% overlay).
Color: accent on ≤2 elements per screen · status tints only other chrome hue.
Chrome: opaque white with hairlines (no glassy content cards); imagery may run
under translucent bars only if legibility holds.

## Build order

1. **Foundations:** screen registry/switcher · PresenceMark motion · tabular
   numeral audit · shared components as needed
2. **Splash** (cheap, sets the brand + presence-mark birth)
3. **Inspiration feed** (evolve existing board to city feed + save sheet)
4. **Profile / travel passport**
5. **Itinerary artifact** (anchors the agent's document pattern)
6. **Flights + points** (BoardRow + IntentCard)
7. **Hotel vs. house** (decision canvas)
8. **Proactive approval card** (IntentCard + ApprovalCluster)
9. **Where to go** (canvas + conversation)
10. **Voice seat change** last — richest motion, benefits from every prior piece

Honest constraints: prototype imagery is stand-in Unsplash; haptics and Live
Activities are described in the portfolio, not implemented in the web preview;
voice is simulated (scripted transcript), not actual speech recognition.
