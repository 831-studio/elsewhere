# Elsewhere — Image Asset Manifest

Every photographic asset the mocks need, so real imagery can be sourced and
dropped into `/assets`. This is a **living doc** — I add rows as we build each
new screen.

**How to hand off:** drop a file into `/assets` with the **suggested filename**
(JPG or PNG, either is fine). I'll wire it in, replacing the current Unsplash
placeholder via `require`, and crop it to the display aspect. Source generously
(larger than needed) — I handle the crop.

**Priority:** placeholders (curated Unsplash IDs in `data/trip.ts`) already look
decent, so **heroes matter most**. Small thumbnails/collage cells can stay on
placeholders if you'd rather not source everything. ⭐ = hero, worth sourcing first.

Aspect ratio = the display crop, not the source.

---

## Avatars — faces, shared across every screen
Real people, warm, not stock-y. Square, ≥ 240px.

| Slot | Who | Suggested filename |
|---|---|---|
| ⭐ you | primary user (Elena Marchetti) | `avatar-you` |
| ⭐ maya | friend — foodie, Mexico City | `avatar-maya` |
| ⭐ james | friend — the Andes | `avatar-james` |
| tomo | curator — Kyoto | `avatar-tomo` |
| priya | trip companion (girls' trip) | `avatar-priya` |
| jules | trip companion | `avatar-jules` |
| nadia | trip companion | `avatar-nadia` |

---

## 1 · Home
| Slot | Subject | Aspect | Suggested filename |
|---|---|---|---|
| ⭐ Explore hero | dramatic wanderlust landscape — aerial turquoise coastline or similar | ~16:5 wide banner | `home-explore-hero` |
| ⭐ Peru trip thumb | misty Andes / Machu Picchu | 1:1 square | `trip-peru` |
| ⭐ City · Lisbon | terracotta rooftops | 3:2 | `city-lisbon` |
| ⭐ City · Kyoto | cherry blossoms over a canal | 3:2 | `city-kyoto` |
| ⭐ City · Amalfi | white town over blue sea | 3:2 | `city-amalfi` |
| Collection "Where I eat in CDMX" | 1) warm restaurant table  2) overhead table spread + hands  3) colorful market | mixed collage | `coll-cdmx-1/2/3` |
| Collection "Old Kyoto" | 1) blossoms  2) serene hotel room  3) moody dining room | mixed collage | `coll-kyoto-1/2/3` |
| Collection "Hiking the Andes" | 1) Andes ridgeline  2) golden-hour landscape  3) calm sea at dusk | mixed collage | `coll-andes-1/2/3` |

---

## 2 · Reservation card (closeup)
| Slot | Subject | Aspect | Status |
|---|---|---|---|
| Venue photo — "Central" | restaurant / dish hero | ~16:9 | ✅ provided (`central_sample_image.png`) |

---

## 3 · Concierge conversation
Scenario: a luxury celebration trip for 4 girlfriends, this fall — **they choose
Peru**. Each candidate is a **collection**. The pick (Sacred Valley, Peru) is a
collage (1 main + 2); the alternates are 4-image strips.

**Lima & the Sacred Valley** — featured collage (3 images)
| Slot | Subject | Aspect | Suggested filename |
|---|---|---|---|
| ⭐ Peru · Andes | Machu Picchu / Sacred Valley (main) | ~4:5 | `peru-andes` |
| ⭐ Peru · dining | Lima fine dining (Central / Maido) | ~1:1 | `peru-dining` |
| ⭐ Peru · stay | luxury lodge room (Sol y Luna / explora) | ~1:1 | `peru-stay` |

**Comporta, Portugal** — strip alternate · `comporta-1..4` (dune beach, dining, room, table)
**San Sebastián, Spain** — strip alternate · `sansebastian-1..4` (La Concha bay, pintxos, restaurant, table)
**Marrakech, Morocco** — strip alternate · `marrakech-1..4` (riad, souk, dining, experience)

> Strips currently reuse placeholder photos — real sets will differentiate them.

## 4 · Trip collection detail (opened — Lima & the Sacred Valley)
Hero + three curated collections (stay / eat / do) spanning the Lima leg and the
valley leg. Each place its own photo.

Hero: `peru-andes` (Machu Picchu / valley)

**Where to stay** (4 · Lima + valley)
| Slot | Subject | Aspect | Suggested filename |
|---|---|---|---|
| Hotel B, Barranco (Lima) | belle-époque art hotel / suite | 1:1 | `peru-stay-hotelb` |
| explora Valle Sagrado | lodge room / grounds | 1:1 | `peru-stay-explora` |
| Sol y Luna | Relais & Châteaux casita / pool | 1:1 | `peru-stay-solyluna` |
| Tambo del Inka | riverside luxury room | 1:1 | `peru-stay-tambo` |

**Where to eat** (4 · Lima + valley)
| Slot | Subject | Aspect | Suggested filename |
|---|---|---|---|
| Central, Lima | plated tasting course | 1:1 | `peru-eat-central` |
| Maido, Lima | Nikkei plate / room | 1:1 | `peru-eat-maido` |
| MIL, Moray | altitude tasting / room | 1:1 | `peru-eat-mil` |
| Cicciolina, Cusco | tapas / restaurant | 1:1 | `peru-eat-cicciolina` |

**The experiences** (3)
| Slot | Subject | Aspect | Suggested filename |
|---|---|---|---|
| Machu Picchu at dawn | ruins at sunrise (reuses `peru-andes`) | 1:1 | `peru-do-machupicchu` |
| Maras & Moray | salt terraces / Inca circles (⚠ currently a wrong-continent placeholder) | 1:1 | `peru-do-maras` |
| Barranco, ceviche + pisco | Lima food/art district | 1:1 | `peru-do-barranco` |

## 5 · Travel Passport
Mostly the shared avatar + a reused Peru thumbnail.

| Slot | Subject | Aspect | Suggested filename |
|---|---|---|---|
| Passport avatar | the user (reuses `avatar-you`) | 1:1 | `avatar-you` |

## 6 · Inspiration Feed
An open masonry of collections from the people you follow — reuses the curated
photo library as pin covers (real product would have bespoke covers). Each pin
also carries a curator avatar.

Pins reuse: `peru-andes`, dining, kyoto, amalfi, lisbon, beach, market, villa.
Curators: maya, james, tomo.

## 7 · Group trip canvas
No place photography — it's faces + data. Needs the travel-companion avatars
(`avatar-you`, `avatar-priya`, `avatar-jules`, `avatar-nadia`).
