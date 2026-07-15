// F1 · Board — the departure board.
//
// Lineage: Flighty's airport-board hierarchy. One line per flight: the times
// are the headline (16 medium, tabular), everything else — carrier, flight
// number, routing — is quiet meta beneath. Price holds the right edge. The
// concierge's pick is marked by weight alone, with one rationale line that
// cites the profile; no hue, no badge. Hairlines do the separating.

import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration, Steers, Voice } from '../concierge/shared';
import { colors, fonts } from '../../theme';

type Row = {
  times: string;
  meta: string;
  price: string;
  pick?: boolean;
  rationale?: string;
};

type Leg = { label: string; rows: Row[] };

const LEGS: Leg[] = [
  {
    label: 'JFK → LIM · THU OCT 16',
    rows: [
      {
        times: '08:40 → 14:05',
        meta: 'LATAM 2412 · nonstop',
        price: '$612',
        pick: true,
        rationale: 'Nonstop, lands in daylight — and aisle seats held, per your profile',
      },
      { times: '10:15 → 17:50', meta: 'Avianca 245 · 1 stop BOG', price: '$498' },
      { times: '21:30 → 05:12+1', meta: 'Delta 347 · nonstop · red-eye', price: '$565' },
    ],
  },
  {
    label: 'LIM → CUZ · THU OCT 16',
    rows: [
      {
        times: '15:55 → 17:20',
        meta: 'LATAM 2027 · nonstop',
        price: '$84',
        pick: true,
        rationale: 'Meets the 14:05 arrival with time to spare airside',
      },
      { times: '18:10 → 19:34', meta: 'Sky 213 · nonstop', price: '$61' },
    ],
  },
];

function BoardRow({ r }: { r: Row }) {
  return (
    <View style={styles.rowWrap}>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <Text style={[styles.times, r.pick && styles.timesPick]}>{r.times}</Text>
          <Text style={styles.meta}>{r.meta}</Text>
        </View>
        <Text style={[styles.price, r.pick && styles.pricePick]}>{r.price}</Text>
      </View>
      {r.rationale && (
        <View style={styles.rationale}>
          <Feather name="check" size={11} color={colors.inkMuted} />
          <Text style={styles.rationaleText}>{r.rationale}</Text>
        </View>
      )}
    </View>
  );
}

export default function F1Board({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Flights · Peru" />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Narration text="Searched 41 fares · held the best 4" />

        <Voice style={styles.voice}>
          Here’s the board for October 16. The morning LATAM is the one — the rest are below if the group wants
          options.
        </Voice>

        {LEGS.map((leg) => (
          <View key={leg.label} style={styles.leg}>
            <Text style={styles.legLabel}>{leg.label}</Text>
            {leg.rows.map((r) => (
              <BoardRow key={r.times} r={r} />
            ))}
          </View>
        ))}

        <Steers items={['Cheaper', 'Red-eye is fine', 'Book it']} style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  voice: { marginTop: 12 },

  leg: { marginTop: 26 },
  legLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
    marginBottom: 4,
  },

  rowWrap: { borderBottomWidth: 1, borderBottomColor: colors.hairline, paddingVertical: 14 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  rowLeft: { flex: 1 },
  times: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },
  timesPick: { fontFamily: fonts.medium },
  meta: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, marginTop: 4 },
  price: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
  },
  pricePick: { fontFamily: fonts.medium, color: colors.ink },

  rationale: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 8, paddingRight: 24 },
  rationaleText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, lineHeight: 17, color: colors.inkMuted },

  steers: { marginTop: 24 },
});
