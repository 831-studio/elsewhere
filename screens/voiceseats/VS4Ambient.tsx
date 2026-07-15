// VS4 · Ambient — the ambient bar: the task IS the screen, voice is a ribbon.
//
// C7's dock inverted: instead of a canvas breathing under a quote, the seat
// map (rows 12–18) takes the whole page and the conversation compresses into
// a slim paper strip at the bottom — one live transcript line in quotes, a
// written "Listening", and an [End] pill. The delta floats quietly above the
// strip in tabular figures. Nothing pulses; the developing row-15 block is
// the only thing that reads "in progress".

import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ConciergeHeader } from '../concierge/shared';
import { colors, fonts, radius } from '../../theme';

type SeatState = 'open' | 'taken' | 'group' | 'new';
const COLS = ['A', 'B', 'C', 'D', 'E', 'F'];

const ROWS: { n: number; exit?: boolean; s: SeatState[] }[] = [
  { n: 12, s: ['taken', 'taken', 'open', 'taken', 'taken', 'taken'] },
  { n: 13, s: ['taken', 'open', 'taken', 'taken', 'taken', 'open'] },
  { n: 14, s: ['taken', 'taken', 'group', 'taken', 'open', 'taken'] },
  { n: 15, exit: true, s: ['new', 'new', 'new', 'open', 'taken', 'taken'] },
  { n: 16, s: ['new', 'new', 'open', 'taken', 'taken', 'taken'] },
  { n: 17, s: ['group', 'taken', 'taken', 'open', 'taken', 'taken'] },
  { n: 18, s: ['taken', 'open', 'taken', 'taken', 'taken', 'group'] },
];

const SEAT = 30;

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

export default function VS4Ambient({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Seats · LA 2412" />

      {/* The cabin — the whole page is the task */}
      <View style={styles.canvas}>
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
        <Text style={styles.footnote}>22B · 23E sit further back — moving too</Text>
      </View>

      {/* The delta floats above the ribbon */}
      <Text style={styles.delta}>+$36 total · 4 together + 1 across the aisle · exit-row legroom</Text>

      {/* The voice ribbon — paper strip, written state, always an exit */}
      <View style={styles.strip}>
        <View style={styles.stripText}>
          <Text style={styles.transcript} numberOfLines={1}>
            “Can you get us closer together — nothing crazy expensive.”
          </Text>
          <Text style={styles.listening}>Listening</Text>
        </View>
        <Pressable style={styles.endPill}>
          <Text style={styles.endText}>End</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  canvas: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  map: { gap: 9 },
  mapRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
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
  aisleCell: { width: 22 },
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

  footnote: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, marginTop: 16 },

  delta: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
    marginBottom: 14,
    paddingHorizontal: 16,
  },

  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 34,
    backgroundColor: colors.surfaceMuted,
  },
  stripText: { flex: 1 },
  transcript: { fontFamily: fonts.regular, fontSize: 14, color: colors.inkMuted },
  listening: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted, marginTop: 4 },
  endPill: {
    height: 36,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endText: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
});
