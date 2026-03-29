# Elsewhere

## What it is
Elsewhere is an agentic concierge travel planner that centers on trusted recommendations and special features to make group travel easier.

Potential tagline: "Every trip, curated with recommendations by people you trust."

## Brand story
"Elsewhere" is an invitation to explore and enjoy life beyond your everyday environment — to ask: what is life like elsewhere? It should feel like a well-traveled friend who always knows the right place — not a booking engine dressed up in friendly copy. The tone is smart, whimsical, and grounded. The design should make trip planning feel like part of the experience, not a chore before it.

## Design aesthetic
Sophisticated and artistic. Trip planning should feel delightful — like flipping through a beautifully curated travel magazine, not filling out a form.

References: Pinterest, VSCO, Retro (photo app), ShopMy, Artsy, Intercom

- Rich imagery is load-bearing — photography and visual content should drive the UI, not decorate it
- Typography-forward moments balanced with full-bleed visuals
- Interactions feel considered and calm — no aggressive animations or notification spam
- Dark and light modes should both feel intentional, not like one is the afterthought
- Color palette leans muted/editorial with warm accents — avoid loud primary palettes

## Stack
React Native + Expo + TypeScript

## Core screens

1. **Search** — voice, chat, and filter-based search for flights, hotels, activities. The entry point. Should feel conversational and fast, not form-heavy.

2. **Public profile / Trip recommendations** — user profiles showcasing past trips and recommendations. Followable. Feels more like a curated travel journal than a social feed.

3. **Travel Preference Profile** — stores seat preferences, dietary needs, loyalty program numbers, credit cards, travel style. Powers the agent's personalization. Should feel like a profile you want to fill out.

4. **Activities booking** — browse and book experiences for the trip. Imagery-led. Closer to Airbnb Experiences or Artsy than a ticketing site.

5. **Agentic concierge flow** — AI-powered agent helps coordinate group trips: asks follow-up questions, surfaces conflicts, proposes itineraries, collects approvals. Should feel like texting a very capable friend, not submitting a support ticket.

6. **Group coordination** — shared trip canvas, proposal/approval flows, group chat, split payments via Stripe. The multiplayer layer of the app.

## Things to avoid
- Corporate travel-booking energy (no Expedia/Kayak vibes)
- Generic SaaS UI — no dashboard grids, no card-heavy layouts without visual hierarchy
- Aggressive onboarding flows or permission prompts
- Busy, cluttered screens — Elsewhere should feel like breathing room
- Bright, loud primary color palettes
- Anything that makes the user feel like they're doing admin

## APIs (decided)
Duffel (flights), Hotelbeds (hotels), GetYourGuide + Viator (experiences), Plaid + AwardWallet (points/cards), Stripe (payments), Claude API (agent), Google Maps (geo)

## Status
Expo project scaffolded. Core screens, API stack, and personas defined.
Design system TBD — do not build screens until typography and color are defined and added here.
