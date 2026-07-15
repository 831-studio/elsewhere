// C7 · Voice — the editorial voice mode: typography over photography, no orb.
//
// Lineage: ChatGPT's in-chat voice (transcript stays visible, content stays
// on screen) — but set like a magazine, not a glowing blob. Your words form
// as a large pull-quote on a white wash; the canvas breathes underneath and
// keeps reacting while you speak. State is written, not animated: a quiet
// "Listening…" where a spinner would be. Tap the pill to type instead.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ConciergeHeader, DESTINATIONS } from './shared';
import { colors, fonts, radius } from '../../theme';

export default function V7Voice({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      {/* The forming transcript — a pull-quote, not a bubble */}
      <View style={styles.quoteZone}>
        <Text style={styles.quote}>
          “Somewhere warm in October — a week with the girls…”
        </Text>
        <Text style={styles.listening}>Listening</Text>
      </View>

      {/* The canvas keeps breathing under the words */}
      <View style={styles.canvas}>
        <Image source={{ uri: DESTINATIONS[0].uri }} style={StyleSheet.absoluteFill} contentFit="cover" transition={260} />
        {/* White wash from above so the type zone reads as the page */}
        <LinearGradient
          colors={[colors.bg, 'rgba(255,255,255,0)']}
          locations={[0, 0.5]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        {/* …and a quiet floor so the caption reads over pale imagery */}
        <LinearGradient
          colors={['rgba(17,17,17,0)', 'rgba(17,17,17,0.55)']}
          locations={[0.55, 1]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <View style={styles.canvasCaption}>
          <Text style={styles.canvasPlace}>Sacred Valley, Peru</Text>
          <Text style={styles.canvasMeta}>Already surfacing · dry season · Maya, Oct ’24</Text>
        </View>
      </View>

      {/* Exit to typing — the instrument is always reachable */}
      <View style={styles.dock}>
        <Pressable style={styles.typePill}>
          <Text style={styles.typeText}>Tap to type instead</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  quoteZone: { paddingHorizontal: 24, paddingTop: 34 },
  quote: {
    fontFamily: fonts.regular,
    fontSize: 24,
    lineHeight: 33,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  listening: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 14 },

  canvas: { flex: 1, marginTop: 26, overflow: 'hidden' },
  canvasCaption: { position: 'absolute', left: 20, bottom: 110 },
  canvasPlace: { fontFamily: fonts.medium, fontSize: 16, color: colors.bg },
  canvasMeta: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.78)', marginTop: 3 },

  dock: { position: 'absolute', left: 16, right: 16, bottom: 34, alignItems: 'center' },
  typePill: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#111',
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  typeText: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
});
