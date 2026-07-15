// A4 · Thread — the same moment scaled down into the conversation.
//
// No takeover, no big pill: the proactive change arrives as one more turn in
// the thread. Narration check-line, a short de-bubbled voice paragraph, then
// the plan as a COMPACT slip module — three tight rows, the hold, the group
// dots — and consent handled by the steer pills themselves. Proves the slip
// is a module in the concierge's closed vocabulary, not a special screen.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';
import { Composer, ConciergeHeader, Narration, Steers, Voice } from '../concierge/shared';

const STEPS = [
  { n: '1', text: 'Cancel Isolina', time: 'Thu 8:00' },
  { n: '2', text: 'Book Central — table for 5', time: 'Thu 8:30' },
  { n: '3', text: 'Barranco walk → Friday morning', time: 'Fri a.m.' },
];

const GROUP = [
  { name: 'You', uri: AVATARS.you, approved: true },
  { name: 'Maya', uri: AVATARS.maya, approved: true },
  { name: 'Tomo', uri: AVATARS.tomo, approved: false },
  { name: 'Rosa', approved: false },
  { name: 'Dana', approved: false },
] as const;

export default function A4Thread({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Burst rhythm: one timestamp per turn, set quietly on the axis */}
        <Text style={styles.turnStamp}>Thursday · 4:12 pm</Text>

        <Narration text="Watched Central’s book for 12 days" />
        <Voice style={styles.voice}>
          A table for five just opened at Central — Thursday at 8:30. I’d take it: cancel Isolina, nudge the
          Barranco walk to Friday morning. The hold gives us 20 minutes.
        </Voice>

        {/* The slip, compact — the same module at conversation scale */}
        <View style={styles.slip}>
          <View style={styles.slipHead}>
            <Text style={styles.label}>The plan</Text>
            <Text style={styles.hold}>Held for 18 more minutes</Text>
          </View>

          {STEPS.map((s, i) => (
            <View key={s.n} style={[styles.step, i > 0 && styles.stepRule]}>
              <Text style={styles.stepNum}>{s.n}</Text>
              <Text style={styles.stepText}>{s.text}</Text>
              <Text style={styles.stepTime}>{s.time}</Text>
            </View>
          ))}

          <View style={styles.slipFoot}>
            <View style={styles.dots}>
              {GROUP.map((m, i) => {
                const shape = { marginLeft: i === 0 ? 0 : -5, opacity: m.approved ? 1 : 0.4 };
                return 'uri' in m ? (
                  <Image key={m.name} source={{ uri: m.uri }} style={[styles.dot, shape]} contentFit="cover" />
                ) : (
                  <View key={m.name} style={[styles.dot, styles.dotInitial, shape]}>
                    <Text style={styles.dotInitialText}>{m.name[0]}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.groupCount}>2 of 4 approved</Text>
          </View>
        </View>

        <Text style={styles.rationale}>Central’s been full since June — you starred it in July.</Text>

        {/* Consent lives in the steers — the thread's native instrument */}
        <Steers items={['Approve', 'Keep Isolina', 'Ask the group']} style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 140 },

  turnStamp: {
    fontFamily: fonts.medium,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: 18,
    fontVariant: ['tabular-nums'],
  },

  voice: { marginTop: 12, marginBottom: 16 },

  slip: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.square,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
  },
  slipHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  hold: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  step: { flexDirection: 'row', alignItems: 'baseline', paddingVertical: 9 },
  stepRule: { borderTopWidth: 1, borderTopColor: colors.hairline },
  stepNum: { width: 18, fontFamily: fonts.medium, fontSize: 12, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  stepText: { flex: 1, fontFamily: fonts.medium, fontSize: 13.5, lineHeight: 18, color: colors.ink, paddingRight: 8 },
  stepTime: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink, fontVariant: ['tabular-nums'] },

  slipFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    paddingTop: 10,
  },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: colors.surfaceMuted, backgroundColor: colors.hairline },
  dotInitial: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.hairline },
  dotInitialText: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.inkMuted },
  groupCount: { fontFamily: fonts.medium, fontSize: 12, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  rationale: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 18, color: colors.inkMuted, marginTop: 10 },
  steers: { marginTop: 18 },
});
