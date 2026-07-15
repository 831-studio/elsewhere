// Concierge module — hierarchy studies, informed by Retro's toolkit:
// flat gray fills as containers, a tiny gray eyebrow over a bold near-black
// line, outlined pills for actions, and value/weight (not color, not shadow)
// carrying the hierarchy. Three strategies for the Home "build a trip" module,
// stacked for side-by-side comparison. The winner gets applied to Home.
//
// Palette is strictly ink + one featured gray + white — no accent, no shadow.

import { Feather, Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius } from '../../theme';

// Retro's gray reads because it is a clean, neutral step darker than our old
// warm "paper" — enough value contrast to register as a real surface on white.
const FILL = '#ECEBE7';

function Caption({ children }: { children: string }) {
  return <Text style={styles.caption}>{children}</Text>;
}

// A — Filled gray container (Retro "Getting Started" card): tiny eyebrow, bold
// left title, a crisp white input pill that pops against the gray.
function VariantA() {
  return (
    <View style={styles.cardFill}>
      <Text style={styles.eyebrow}>YOUR CONCIERGE</Text>
      <Text style={styles.title}>Build a trip with your concierge</Text>
      <View style={styles.inputWhite}>
        <Text style={styles.inputHint} numberOfLines={1}>Start with any idea…</Text>
        <Ionicons name="mic-outline" size={17} color={colors.ink} />
      </View>
    </View>
  );
}

// B — Outlined container (the reservation-card language): hairline stroke, no
// fill; the input flips to a gray fill (Retro's search bar). Container defined
// by line, input defined by fill — the inverse of A.
function VariantB() {
  return (
    <View style={styles.cardOutline}>
      <Text style={styles.eyebrow}>YOUR CONCIERGE</Text>
      <Text style={styles.title}>Build a trip with your concierge</Text>
      <View style={styles.inputFill}>
        <Text style={styles.inputHint} numberOfLines={1}>Start with any idea…</Text>
        <Ionicons name="mic-outline" size={17} color={colors.ink} />
      </View>
    </View>
  );
}

// C — Filled gray + identity: the concierge gets a face/mark and a name, so the
// module reads as "text a capable friend." Conversational prompt, white input.
function VariantC() {
  return (
    <View style={styles.cardFill}>
      <View style={styles.identity}>
        <View style={styles.mark}>
          <Feather name="compass" size={14} color={colors.bg} />
        </View>
        <Text style={styles.identityName}>Your concierge</Text>
      </View>
      <Text style={styles.titleLg}>Where are we headed next?</Text>
      <View style={styles.inputWhite}>
        <Text style={styles.inputHint} numberOfLines={1}>Start with any idea…</Text>
        <Ionicons name="mic-outline" size={17} color={colors.ink} />
      </View>
    </View>
  );
}

export default function ConciergeStudies() {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.h}>Concierge — hierarchy studies</Text>
        <Text style={styles.sub}>Ink · one gray · no shadow · no accent</Text>

        <Caption>A — Gray fill · eyebrow + bold title · white input</Caption>
        <VariantA />

        <Caption>B — Outlined · line-drawn container · gray input</Caption>
        <VariantB />

        <Caption>C — Gray fill · concierge identity · conversational</Caption>
        <VariantC />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingTop: 40, paddingBottom: 60 },
  h: { fontFamily: fonts.semibold, fontSize: 17, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 3, marginBottom: 8 },
  caption: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.inkMuted,
    marginTop: 26,
    marginBottom: 10,
  },

  // Shared surfaces
  cardFill: {
    backgroundColor: FILL,
    borderRadius: radius.square,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },
  cardOutline: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.square,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },

  // Type hierarchy — tiny gray eyebrow over a bold near-black line (Retro)
  eyebrow: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.9,
    color: colors.inkMuted,
    marginBottom: 9,
  },
  title: { fontFamily: fonts.semibold, fontSize: 17, letterSpacing: -0.2, color: colors.ink },
  titleLg: { fontFamily: fonts.semibold, fontSize: 20, letterSpacing: -0.3, color: colors.ink },

  // Inputs — white-on-gray (A/C) vs gray-on-white (B)
  inputWhite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    marginTop: 16,
  },
  inputFill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: FILL,
    marginTop: 16,
  },
  inputHint: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.inkMuted },

  // C — concierge identity
  identity: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 12 },
  mark: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  identityName: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
});
