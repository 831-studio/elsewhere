// F2 · Points — the points desk.
//
// Lineage: the plan's intent-preview pattern + the points panel (screen 6's
// hero detail). Cash vs points as a calm two-line comparison on the
// concierge's paper; the recommendation is medium ink with a muted why-line —
// weight decides, never hue. Before anything consequential happens, the plan
// is spelled out in numbered plain language, then one ink pill to approve —
// and a quiet way out for people who'd rather do it themselves.

import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration, Voice } from '../concierge/shared';
import { colors, fonts, radius } from '../../theme';

const STEPS = [
  'Transfer 45,000 Amex MR → British Airways Avios',
  'Book LATAM 2412, Oct 16 · five seats, economy',
  'Hold the seats together, aisle pair per your profile',
];

/** Signature route line, small: origin ·──· dest with duration above. */
function RouteLine() {
  return (
    <View style={styles.route}>
      <Text style={styles.routeDuration}>7h 55m</Text>
      <View style={styles.routeRow}>
        <Text style={styles.routeCode}>JFK</Text>
        <View style={styles.routeDot} />
        <View style={styles.routeTrack} />
        <View style={styles.routeDot} />
        <Text style={styles.routeCode}>LIM</Text>
      </View>
    </View>
  );
}

export default function F2Points({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Flights · Peru" />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Narration text="Checked 3 ways to pay across your cards" />

        <Voice style={styles.voice}>
          LATAM 2412 is held. Cash works — but your Amex points are worth more here than they’ll ever be at the
          portal. Here’s the smarter way to pay.
        </Voice>

        {/* The points desk — the concierge's paper */}
        <View style={styles.paper}>
          <RouteLine />

          <Text style={styles.payLabel}>Pay</Text>

          <View style={styles.option}>
            <Text style={styles.optionCash}>$612 cash</Text>
            <Text style={styles.optionWhy}>Per seat · refundable for 24h</Text>
          </View>

          <View style={styles.optionDivider} />

          <View style={styles.option}>
            <Text style={styles.optionPick}>45,000 Amex MR → Avios</Text>
            <Text style={styles.optionWhy}>~1.4¢ per point · saves $180 — the best rate on your cards</Text>
          </View>
        </View>

        {/* Intent preview — the plan in plain language, before anything moves */}
        <Text style={styles.planLabel}>The plan</Text>
        {STEPS.map((s, i) => (
          <View key={s} style={styles.step}>
            <Text style={styles.stepNum}>{i + 1}</Text>
            <Text style={styles.stepText}>{s}</Text>
          </View>
        ))}

        <Pressable style={styles.approve}>
          <Text style={styles.approveText}>Approve the plan</Text>
        </Pressable>
        <Pressable hitSlop={8}>
          <Text style={styles.handle}>I’ll handle it myself</Text>
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

  voice: { marginTop: 12 },

  paper: {
    marginTop: 22,
    padding: 16,
    borderRadius: radius.square,
    backgroundColor: colors.surfaceMuted,
  },

  route: { marginBottom: 18 },
  routeDuration: {
    fontFamily: fonts.regular,
    fontSize: 10.5,
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: 5,
    fontVariant: ['tabular-nums'],
  },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  routeCode: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.ink,
    letterSpacing: 0.4,
    fontVariant: ['tabular-nums'],
  },
  routeDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: colors.ink },
  routeTrack: { flex: 1, height: 1, backgroundColor: colors.ink },

  payLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginBottom: 12,
  },
  option: { paddingVertical: 2 },
  optionCash: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
  },
  optionPick: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },
  optionWhy: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.inkMuted,
    marginTop: 3,
    fontVariant: ['tabular-nums'],
  },
  optionDivider: { height: 1, backgroundColor: colors.hairline, marginVertical: 12 },

  planLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginTop: 26,
    marginBottom: 4,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  stepNum: {
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 19,
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
  },
  stepText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },

  approve: {
    height: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  approveText: { fontFamily: fonts.medium, fontSize: 14, color: colors.bg },
  handle: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    textAlign: 'center',
    marginTop: 14,
  },
});
