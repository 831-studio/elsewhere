// S2 · Needs — the brief comes first; the properties answer to it.
//
// Lineage: C4 Brief's document logic turned on a decision. Instead of leading
// with photography, the screen leads with THE BRIEF, FOR FIVE — the group's
// needs as typeset rows, each answered by "Casa", "Hotel", or "Both" in
// medium ink. The two stays arrive after, demoted to compact evidence rows.
// Structure persuades; imagery corroborates; one pill closes.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration, Voice } from '../concierge/shared';
import { img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const NEEDS: { need: string; answer: 'Casa' | 'Hotel' | 'Both' }[] = [
  { need: 'Five real beds — no one shares a twin', answer: 'Casa' },
  { need: 'A quiet room for Rosa, away from the street', answer: 'Casa' },
  { need: 'Slow mornings together, coffee in hand', answer: 'Casa' },
  { need: 'One proper spa day for the group', answer: 'Hotel' },
  { need: 'Walk to the Plaza de Armas', answer: 'Both' },
];

const STAYS = [
  {
    name: 'Casa Killa',
    meta: 'Rental house · Tomo’s find · 5 beds · courtyard',
    price: '$126',
    uri: img('photo-1543067361-9bf996edf6ff'),
  },
  {
    name: 'Palacio Nazarenas',
    meta: 'Hotel · spa · breakfast · closest to the plaza',
    price: '$212',
    uri: img('photo-1568729670692-0d2de9a3c027'),
  },
];

export default function S2Needs({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Cusco · Stay" />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Narration text="Read the group thread and everyone’s profiles" />

        {/* The brief — the group's needs, answered */}
        <Text style={styles.sectionLabel}>The brief, for five</Text>
        {NEEDS.map((n, i) => (
          <View key={n.need} style={[styles.needRow, i > 0 && styles.needRowBorder]}>
            <Text style={styles.needText}>{n.need}</Text>
            <Text style={styles.needAnswer}>{n.answer}</Text>
          </View>
        ))}

        {/* The evidence — two stays, demoted to compact rows */}
        <Text style={[styles.sectionLabel, styles.sectionSpace]}>The two in the running</Text>
        {STAYS.map((s, i) => (
          <View key={s.name} style={[styles.stayRow, i > 0 && styles.needRowBorder]}>
            <Image source={{ uri: s.uri }} style={styles.thumb} contentFit="cover" transition={200} />
            <View style={styles.stayText}>
              <Text style={styles.stayName}>{s.name}</Text>
              <Text style={styles.stayMeta} numberOfLines={1}>
                {s.meta}
              </Text>
            </View>
            <View style={styles.priceCell}>
              <Text style={styles.price}>{s.price}</Text>
              <Text style={styles.priceUnit}>pp/night</Text>
            </View>
          </View>
        ))}

        {/* The verdict — one line, then one instrument */}
        <Voice style={styles.verdict}>
          The casa answers four of five — the spa I’d book as a day at the Palacio, which costs less than
          four nights of the difference.
        </Voice>

        <Pressable style={styles.holdPill}>
          <Text style={styles.holdText}>Hold the casa</Text>
        </Pressable>
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  sectionLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    textTransform: 'uppercase',
    marginTop: 22,
    marginBottom: 6,
  },
  sectionSpace: { marginTop: 28 },

  needRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 13,
  },
  needRowBorder: { borderTopWidth: 1, borderTopColor: colors.hairline },
  needText: { flex: 1, fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.ink },
  needAnswer: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },

  stayRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  thumb: { width: 52, height: 52, borderRadius: radius.square, backgroundColor: colors.hairline },
  stayText: { flex: 1 },
  stayName: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  stayMeta: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted, marginTop: 2 },
  priceCell: { alignItems: 'flex-end' },
  price: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink, fontVariant: ['tabular-nums'] },
  priceUnit: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.inkMuted, marginTop: 1 },

  verdict: { marginTop: 24 },

  holdPill: {
    alignSelf: 'flex-start',
    height: 38,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  holdText: { fontFamily: fonts.medium, fontSize: 13, color: colors.bg },
});
