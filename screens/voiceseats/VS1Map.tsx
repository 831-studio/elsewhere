// VS1 · Map — the live map: voice as a layer over the seat chart.
//
// C7's grammar (pull-quote transcript, written state, no orb) applied to a
// task surface. The user's ask sits at the top as typeset speech; below it the
// concierge's work is visible *as seats* — the group's current squares in full
// ink, the proposed row-15 block still "developing" at ~45% while the hold is
// live. The delta resolves in tabular figures; exit to typing never leaves.

import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ConciergeHeader } from '../concierge/shared';
import { colors, fonts, radius } from '../../theme';

type SeatState = 'open' | 'taken' | 'group' | 'new';
const COLS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Rows 14–18 of LA 2412. 22B / 23E sit further back — noted below the map.
const ROWS: { n: number; exit?: boolean; s: SeatState[] }[] = [
  { n: 14, s: ['taken', 'taken', 'group', 'taken', 'open', 'taken'] },
  { n: 15, exit: true, s: ['new', 'new', 'new', 'open', 'taken', 'taken'] },
  { n: 16, s: ['new', 'new', 'open', 'taken', 'taken', 'taken'] },
  { n: 17, s: ['group', 'taken', 'taken', 'open', 'taken', 'taken'] },
  { n: 18, s: ['taken', 'open', 'taken', 'taken', 'taken', 'group'] },
];

const SEAT = 28;

function Seat({ state, letter }: { state: SeatState; letter: string }) {
  return (
    <View
      style={[
        styles.seat,
        state === 'open' && styles.seatOpen,
        state === 'taken' && styles.seatTaken,
        (state === 'group' || state === 'new') && styles.seatInk,
        state === 'new' && { opacity: 0.45 },
      ]}
    >
      {(state === 'group' || state === 'new') && <Text style={styles.seatLetter}>{letter}</Text>}
    </View>
  );
}

function SeatMap() {
  return (
    <View style={styles.map}>
      <View style={styles.mapRow}>
        <View style={styles.aisleCell} />
        {COLS.slice(0, 3).map((c) => (
          <Text key={c} style={styles.colLabel}>{c}</Text>
        ))}
        <View style={styles.aisleCell} />
        {COLS.slice(3).map((c) => (
          <Text key={c} style={styles.colLabel}>{c}</Text>
        ))}
        <View style={styles.exitCell} />
      </View>
      {ROWS.map((r) => (
        <View key={r.n} style={styles.mapRow}>
          <Text style={[styles.rowLabel, styles.aisleCell]}>{r.n}</Text>
          {r.s.slice(0, 3).map((s, i) => (
            <Seat key={COLS[i]} state={s} letter={COLS[i]} />
          ))}
          <Text style={[styles.rowLabel, styles.aisleCell]}>{r.n}</Text>
          {r.s.slice(3).map((s, i) => (
            <Seat key={COLS[i + 3]} state={s} letter={COLS[i + 3]} />
          ))}
          <Text style={styles.exitCell}>{r.exit ? 'EXIT' : ''}</Text>
        </View>
      ))}
    </View>
  );
}

export default function VS1Map({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Seats · LA 2412" />

      {/* The forming transcript — a pull-quote, not a bubble */}
      <View style={styles.quoteZone}>
        <Text style={styles.quote}>“Can you get us closer together — nothing crazy expensive.”</Text>
        <Text style={styles.status}>Working — holding row 15</Text>
      </View>

      {/* The task canvas — seats develop as the concierge works */}
      <View style={styles.canvas}>
        <SeatMap />
        <Text style={styles.footnote}>22B · 23E sit further back — moving too</Text>

        <View style={styles.legend}>
          <View style={[styles.key, { backgroundColor: colors.ink }]} />
          <Text style={styles.legendText}>Yours now</Text>
          <View style={[styles.key, { backgroundColor: colors.ink, opacity: 0.45 }]} />
          <Text style={styles.legendText}>Proposed</Text>
          <View style={[styles.key, { backgroundColor: colors.hairline }]} />
          <Text style={styles.legendText}>Taken</Text>
        </View>

        <Text style={styles.delta}>+$36 total · 4 together + 1 across the aisle · exit-row legroom</Text>
      </View>

      {/* Decide, or drop to typing — voice never traps you */}
      <View style={styles.dock}>
        <Pressable style={styles.keepPill}>
          <Text style={styles.keepText}>Keep these seats</Text>
        </Pressable>
        <Pressable hitSlop={8}>
          <Text style={styles.typeInstead}>Tap to type instead</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  quoteZone: { paddingHorizontal: 24, paddingTop: 30 },
  quote: { fontFamily: fonts.regular, fontSize: 23, lineHeight: 32, letterSpacing: -0.2, color: colors.ink },
  status: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 12 },

  canvas: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  map: { gap: 7 },
  mapRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  colLabel: {
    width: SEAT,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
  },
  rowLabel: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
  },
  aisleCell: { width: 20 },
  exitCell: {
    width: 30,
    fontFamily: fonts.semibold,
    fontSize: 8,
    letterSpacing: 0.7,
    color: colors.inkMuted,
    textAlign: 'left',
    paddingLeft: 4,
  },
  seat: { width: SEAT, height: SEAT, borderRadius: radius.square, alignItems: 'center', justifyContent: 'center' },
  seatOpen: { borderWidth: 1, borderColor: colors.hairline },
  seatTaken: { backgroundColor: colors.hairline },
  seatInk: { backgroundColor: colors.ink },
  seatLetter: { fontFamily: fonts.semibold, fontSize: 9, color: colors.bg },

  footnote: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, marginTop: 14 },

  legend: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 18 },
  key: { width: 10, height: 10, borderRadius: 2 },
  legendText: { fontFamily: fonts.regular, fontSize: 11, color: colors.inkMuted, marginRight: 8 },

  delta: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
    marginTop: 22,
    textAlign: 'center',
  },

  dock: { alignItems: 'center', paddingBottom: 34, gap: 14 },
  keepPill: {
    height: 44,
    paddingHorizontal: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keepText: { fontFamily: fonts.medium, fontSize: 14, color: colors.bg },
  typeInstead: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },
});
