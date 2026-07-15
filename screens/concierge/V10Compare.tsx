// C10 · Compare — the reply as a decision canvas.
//
// Lineage: Flighty's airport-board data discipline + the plan's screen-7
// decision pattern. When the real question is "which one?", the concierge
// answers with structure: three candidates in columns, the facts in aligned
// tabular rows, its pick marked by weight — then one line of judgment in its
// own voice. Prose persuades; grids decide. (Group trips argue — this settles.)

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, DESTINATIONS, Steers, UserBlock, Voice } from './shared';
import { colors, fonts, radius } from '../../theme';

const ROWS: { label: string; values: string[]; pick?: number }[] = [
  { label: 'WEATHER', values: ['24° · dry', '27° · dry', '23° · golden'], pick: 0 },
  { label: 'FLIGHT', values: ['9h 40m', '5h 10m', '7h 30m'], pick: 1 },
  { label: 'FROM', values: ['$640', '$410', '$520'], pick: 1 },
  { label: 'CROWDS', values: ['Low', 'Festival', 'Low'], pick: 0 },
];

export default function V10Compare({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <UserBlock text="OK — Peru vs Oaxaca vs Portugal. Settle it." />

        <Voice style={styles.voice}>Side by side, since the group will want receipts:</Voice>

        {/* Column headers */}
        <View style={styles.gridRow}>
          <View style={styles.labelCell} />
          {DESTINATIONS.map((d) => (
            <View key={d.name} style={styles.colCell}>
              <Image source={{ uri: d.uri }} style={styles.colImage} contentFit="cover" transition={200} />
              <Text style={styles.colName}>{d.short}</Text>
            </View>
          ))}
        </View>

        {/* Fact rows — aligned, tabular, hairline-separated */}
        {ROWS.map((row) => (
          <View key={row.label} style={[styles.gridRow, styles.factRow]}>
            <View style={styles.labelCell}>
              <Text style={styles.rowLabel}>{row.label}</Text>
            </View>
            {row.values.map((v, i) => (
              <View key={i} style={styles.colCell}>
                <Text style={[styles.value, row.pick === i && styles.valueBest]}>{v}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* The judgment — structure decides, the concierge concludes */}
        <Voice style={styles.verdict}>
          My pick for five: Peru. The flight costs you a day; the week repays it — and Maya’s list is ready to go.
        </Voice>

        <Steers items={['Book Peru', 'The group votes', 'Push back']} style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },
  voice: { marginTop: 18 },

  gridRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  labelCell: { width: 64 },
  colCell: { flex: 1 },
  colImage: { width: '100%', height: 56, borderRadius: radius.square, backgroundColor: colors.hairline },
  colName: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink, marginTop: 6, marginBottom: 6 },

  factRow: { paddingVertical: 10, borderTopWidth: 1, borderTopColor: colors.hairline },
  rowLabel: { fontFamily: fonts.semibold, fontSize: 10, letterSpacing: 0.8, color: colors.inkMuted },
  value: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  valueBest: { fontFamily: fonts.medium, color: colors.ink },

  verdict: { marginTop: 20 },
  steers: { marginTop: 18 },
});
