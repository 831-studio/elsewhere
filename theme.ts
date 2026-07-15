// theme.ts — Elsewhere design tokens (light, v1)
//
// Single source of truth for color + type. The card and every screen read
// from here so nothing is hardcoded. When we add dark mode, create a parallel
// `colorsDark` object with the same keys and swap at the provider level.

export const colors = {
  bg: '#FFFFFF',
  surface: '#FFFFFF',     // cards sit on white; separation comes from imagery + hairline
  surfaceMuted: '#F2F2F3', // cool gray (light) — the concierge's material; the one tonal surface that marks the agent's space without breaking the calm
  ink: '#211C17',         // warm near-black (revisit vs #1A1A1A if it ever reads muddy)
  inkMuted: '#717171',    // secondary text, meta
  hairline: '#EAEAEA',    // borders, dividers
  accent: '#3D43FB',      // electric — actions, links, small highlights. Not body text.
} as const;

// Base UI typeface — Inter. Chosen for mobile: it's the open-source cousin of
// iOS's San Francisco, purpose-built for UI, highly legible at small sizes, and
// renders consistently across preview + PDF export. Body, labels, controls.
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

// Display typeface — Bricolage Grotesque. The "magazine moment": trip names and
// hero headlines only. Never body. Hierarchy still comes from size + spacing.
export const displayFonts = {
  semibold: 'BricolageGrotesque_600SemiBold',
  bold: 'BricolageGrotesque_700Bold',
  extrabold: 'BricolageGrotesque_800ExtraBold',
} as const;

// Type scale. fontSize / lineHeight in pt; letterSpacing absolute (RN units).
// Spread one of these straight onto a <Text style={...}>.
export const type = {
  display: { fontFamily: displayFonts.extrabold, fontSize: 44, lineHeight: 46, letterSpacing: -0.5 },
  title:   { fontFamily: displayFonts.bold,      fontSize: 26, lineHeight: 30, letterSpacing: -0.2 },
  heading: { fontFamily: fonts.semibold,  fontSize: 20, lineHeight: 25 },
  body:    { fontFamily: fonts.regular,   fontSize: 16, lineHeight: 24 },
  meta:    { fontFamily: fonts.medium,    fontSize: 13, lineHeight: 18 },
  label:   {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.96, // ~0.08em at 12pt
    textTransform: 'uppercase' as const,
  },
} as const;

// Starting values — adjust freely; these aren't sacred like the color/type above.
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

// Geometry — a two-shape system:
//   pill (fully round)  = instruments: fields, chips, buttons, the nav capsule
//   square (radius 4)   = everything else: imagery, covers, cards, surfaces
// Circles are reserved for people (avatars) and 1:1 instruments (e.g. the mic,
// a pill at 1:1). Nested corners never exceed the parent's. The rounder it is,
// the more it's an instrument; the squarer, the more it's the world.
export const radius = { square: 4, pill: 999 } as const;

export const theme = { colors, fonts, displayFonts, type, spacing, radius } as const;
export type Theme = typeof theme;
export default theme;