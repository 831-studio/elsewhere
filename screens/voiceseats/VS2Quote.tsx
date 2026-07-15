// VS2 · Quote — the transcript is the interface.
//
// The most editorial read of the exchange: your ask as a large pull-quote,
// the concierge's spoken reply typeset de-bubbled underneath (C1/C7 voice
// grammar), and the seat change compressed to two one-line strips — BEFORE in
// muted scatter, AFTER in settled medium. No map; the words carry the scene,
// the strips carry the proof, the delta carries the money.

import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ConciergeHeader } from '../concierge/shared';
import { colors, fonts, radius } from '../../theme';

const BEFORE = ['14C', '17A', '18F', '22B', '23E'];
const AFTER = ['15A', '15B', '15C', '16A', '16B'];

function SeatStrip({ label, seats, settled }: { label: string; seats: string[]; settled?: boolean }) {
  return (
    <View style={styles.strip}>
      <Text style={styles.stripLabel}>{label}</Text>
      <View style={styles.chipRow}>
        {seats.map((s) => (
          <View key={s} style={[styles.chip, settled && styles.chipSettled]}>
            <Text style={[styles.chipText, settled && styles.chipTextSettled]}>{s}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function VS2Quote({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Seats · LA 2412" />

      <View style={styles.body}>
        {/* You said — a pull-quote, not a bubble */}
        <Text style={styles.quote}>“Can you get us closer together — nothing crazy expensive.”</Text>

        {/* The concierge answers out loud — typeset, de-bubbled */}
        <Text style={styles.speaking}>Speaking</Text>
        <Text style={styles.voice}>
          Done-ish. Row 15 just opened — exit row, four of you together, Dana one row back on the
          aisle. I’m holding it while you look.
        </Text>

        {/* The proof — before scatter, after block */}
        <View style={styles.strips}>
          <SeatStrip label="Before" seats={BEFORE} />
          <SeatStrip label="After" seats={AFTER} settled />
        </View>

        <Text style={styles.delta}>+$36 total · 4 together + 1 across the aisle · exit-row legroom</Text>
      </View>

      {/* Decide, or drop to typing */}
      <View style={styles.dock}>
        <Pressable style={styles.approvePill}>
          <Text style={styles.approveText}>Approve</Text>
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

  body: { flex: 1, paddingHorizontal: 24, paddingTop: 30 },
  quote: { fontFamily: fonts.regular, fontSize: 24, lineHeight: 33, letterSpacing: -0.2, color: colors.ink },

  speaking: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 26 },
  voice: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.ink, marginTop: 10 },

  strips: { marginTop: 30, gap: 18 },
  strip: { gap: 8 },
  stripLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: {
    minWidth: 44,
    height: 32,
    paddingHorizontal: 8,
    borderRadius: radius.square,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSettled: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  chipTextSettled: { fontFamily: fonts.medium, color: colors.bg },

  delta: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, fontVariant: ['tabular-nums'], marginTop: 26 },

  dock: { alignItems: 'center', paddingBottom: 34, gap: 14 },
  approvePill: {
    height: 44,
    paddingHorizontal: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveText: { fontFamily: fonts.medium, fontSize: 14, color: colors.bg },
  typeInstead: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },
});
