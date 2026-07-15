// S1 · Duel — hotel vs. casa as two columns, facts aligned row by row.
//
// Lineage: C10 Compare's grid discipline applied to screen 7's decision
// canvas. Two candidates side by side, the group's needs as the row labels,
// the better answer per row marked by weight alone — then the concierge's
// judgment as one de-bubbled paragraph citing the five by name.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration, Steers, UserBlock, Voice } from '../concierge/shared';
import { AVATARS, img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const HOTEL_IMG = img('photo-1568729670692-0d2de9a3c027');
const CASA_IMG = img('photo-1543067361-9bf996edf6ff');

const ROWS: { label: string; hotel: string; casa: string; pick: 'hotel' | 'casa'; tabular?: boolean }[] = [
  { label: 'BEDS', hotel: '2 twins share', casa: '5 real beds', pick: 'casa' },
  { label: 'QUIET', hotel: 'Courtyard rooms', casa: 'Back bedroom', pick: 'casa' },
  { label: 'MORNINGS', hotel: 'Restaurant', casa: 'The courtyard', pick: 'casa' },
  { label: 'SPA', hotel: 'On site', casa: '—', pick: 'hotel' },
  { label: 'PP·NIGHT', hotel: '$212', casa: '$126', pick: 'casa', tabular: true },
];

export default function S1Duel({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Cusco · Stay" />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <UserBlock text="Hotel or a whole casa? We can’t agree" />
        <Narration text="Held the two best of 11 stays against the group" style={styles.narration} />

        {/* Column heads — the two contenders */}
        <View style={[styles.gridRow, styles.headRow]}>
          <View style={styles.labelCell} />
          <View style={styles.colCell}>
            <Image source={{ uri: HOTEL_IMG }} style={styles.colImage} contentFit="cover" transition={200} />
            <Text style={styles.colName}>Palacio Nazarenas</Text>
            <Text style={styles.colProv}>Hotel · concierge pick</Text>
          </View>
          <View style={styles.colCell}>
            <Image source={{ uri: CASA_IMG }} style={styles.colImage} contentFit="cover" transition={200} />
            <Text style={styles.colName}>Casa Killa</Text>
            <View style={styles.provRow}>
              <Image source={{ uri: AVATARS.tomo }} style={styles.provAvatar} contentFit="cover" />
              <Text style={styles.colProv}>Tomo’s find</Text>
            </View>
          </View>
        </View>

        {/* The needs, row by row — better answer carries the weight */}
        {ROWS.map((row) => (
          <View key={row.label} style={[styles.gridRow, styles.factRow]}>
            <View style={styles.labelCell}>
              <Text style={styles.rowLabel}>{row.label}</Text>
            </View>
            <View style={styles.colCell}>
              <Text
                style={[styles.value, row.tabular && styles.tabular, row.pick === 'hotel' && styles.valueBest]}
              >
                {row.hotel}
              </Text>
            </View>
            <View style={styles.colCell}>
              <Text
                style={[styles.value, row.tabular && styles.tabular, row.pick === 'casa' && styles.valueBest]}
              >
                {row.casa}
              </Text>
            </View>
          </View>
        ))}

        {/* The judgment — the grid decides, the concierge concludes */}
        <Voice style={styles.verdict}>
          Rosa needs a quiet room; the casa’s back bedroom solves it. Five real beds means no one draws the
          short twin, and mornings happen together in the courtyard — at $86 a night less per person. The
          hotel wins exactly one thing, the spa, and I can book that as a day trip for all five of you.
        </Voice>

        <Steers items={['The casa', 'The hotel', 'Group votes']} style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },
  narration: { marginTop: 18 },

  gridRow: { flexDirection: 'row', gap: 10 },
  headRow: { marginTop: 16, marginBottom: 4, alignItems: 'flex-end' },
  labelCell: { width: 62, justifyContent: 'center' },
  colCell: { flex: 1, justifyContent: 'center' },
  colImage: { width: '100%', height: 110, borderRadius: radius.square, backgroundColor: colors.hairline },
  colName: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.ink, marginTop: 8 },
  provRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3, marginBottom: 8 },
  provAvatar: { width: 13, height: 13, borderRadius: 6.5, backgroundColor: colors.hairline },
  colProv: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, marginTop: 3, marginBottom: 8 },

  factRow: { paddingVertical: 11, borderTopWidth: 1, borderTopColor: colors.hairline },
  rowLabel: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    textTransform: 'uppercase',
  },
  value: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 17, color: colors.inkMuted },
  valueBest: { fontFamily: fonts.medium, color: colors.ink },
  tabular: { fontVariant: ['tabular-nums'] },

  verdict: { marginTop: 20 },
  steers: { marginTop: 18 },
});
