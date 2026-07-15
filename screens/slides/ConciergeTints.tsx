// Concierge module — tint studies. Back to a filled background (the fill is the
// container, Retro-style), exploring the color. Everything is identical across
// options except the card's background tint, so the color is the only variable.
// White input pops against the tint; centered invitation; no border, no shadow.

import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius } from '../../theme';

// Muted, editorial tints — all very low-saturation so none reads as a "loud
// primary." Blue-gray is a whisper of the brand accent (#3D43FB); the rest are
// warm/cool neutrals to feel out temperature.
const TINTS: { name: string; bg: string }[] = [
  { name: 'Cool gray', bg: '#ECECEE' },
  { name: 'Warm sand', bg: '#EFE8DE' },
  { name: 'Sage', bg: '#E7EDE8' },
  { name: 'Blue-gray · accent whisper', bg: '#E7EBF3' },
  { name: 'Blush', bg: '#F1E9E4' },
  { name: 'Lavender', bg: '#ECEAF1' },
];

function Module({ bg }: { bg: string }) {
  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Text style={styles.title}>Build a trip with your concierge</Text>
      <View style={styles.input}>
        <Text style={styles.hint} numberOfLines={1}>Start with any idea…</Text>
        <Ionicons name="mic-outline" size={17} color={colors.ink} />
      </View>
    </View>
  );
}

export default function ConciergeTints() {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.h}>Concierge — tint studies</Text>
        <Text style={styles.sub}>Filled container · white input · centered invitation</Text>
        {TINTS.map((t) => (
          <View key={t.name}>
            <Text style={styles.caption}>{t.name} · {t.bg}</Text>
            <Module bg={t.bg} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingTop: 40, paddingBottom: 60 },
  h: { fontFamily: fonts.semibold, fontSize: 17, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 3, marginBottom: 6 },
  caption: { fontFamily: fonts.medium, fontSize: 11, color: colors.inkMuted, marginTop: 24, marginBottom: 10 },

  card: {
    borderRadius: radius.square,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
  },
  title: { fontFamily: fonts.regular, fontSize: 14.5, color: colors.ink, textAlign: 'center' },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    marginTop: 14,
  },
  hint: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.inkMuted },
});
