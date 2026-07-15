// C9 · Rail — a live shortlist rail pinned above the composer.
//
// Lineage: Kayak Ask AI's measured insight — people refine the brief in chat
// but decide from a live, browsable set, never from prose alone. The
// transcript scrolls; the rail persists. Every spoken constraint visibly
// re-sorts it: say "under 6 hours" and Peru dims with the reason attached.
// The conversation is a query editor; the rail is the truth.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, DESTINATIONS, Narration, UserBlock, Voice } from './shared';
import { colors, fonts, radius } from '../../theme';

export default function V9Rail({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      {/* Transcript — the query being edited */}
      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <UserBlock />
        <Narration style={styles.narration} />
        <Voice style={styles.voice}>Three candidates on your rail — warm, group-easy, October-proof.</Voice>

        <UserBlock text="Keep it cheaper, and under 6 hours flying" style={styles.turn2} />
        <Narration text="Re-sorted · 2 of 3 match" style={styles.narration} />
        <Voice style={styles.voice}>
          That trims it to Oaxaca and Alentejo — Peru’s a 9-hour run, so I’ve set it aside, not thrown it out.
        </Voice>
      </ScrollView>

      {/* The live shortlist — persists while the conversation refines it */}
      <View style={styles.rail}>
        <Text style={styles.railLabel}>LIVE SHORTLIST · 2 OF 3 MATCH</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railRow}>
          {DESTINATIONS.map((d) => {
            const excluded = d.short === 'Peru';
            return (
              <View key={d.name} style={[styles.card, excluded && styles.cardExcluded]}>
                <Image source={{ uri: d.uri }} style={styles.cardImage} contentFit="cover" transition={200} />
                <Text style={styles.cardName}>{d.short}</Text>
                <Text style={styles.cardMeta}>{excluded ? 'set aside · 9h 40m' : `${d.price} · ${d.flight}`}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <Composer />
    </View>
  );
}

const RAIL_BOTTOM = 90; // sits directly on the composer dock

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 260 },
  narration: { marginTop: 16 },
  voice: { marginTop: 10 },
  turn2: { marginTop: 26 },

  rail: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: RAIL_BOTTOM,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  railLabel: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 0.8,
    color: colors.inkMuted,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  railRow: { paddingHorizontal: 16, gap: 10 },
  card: { width: 118 },
  cardExcluded: { opacity: 0.38 },
  cardImage: { width: 118, height: 56, borderRadius: radius.square, backgroundColor: colors.hairline },
  cardName: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink, marginTop: 5 },
  cardMeta: {
    fontFamily: fonts.regular,
    fontSize: 10.5,
    color: colors.inkMuted,
    marginTop: 1,
    fontVariant: ['tabular-nums'],
  },
});
