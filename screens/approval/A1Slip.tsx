// A1 · Slip — the definitive intent-preview card as a paper slip.
//
// The canonical agentic consent card, set like a gallery placard: one voice
// line of context, then THE PLAN — three numbered steps on hairline rules,
// a rationale, the quiet time-boxed hold. Consent is the trio: one ink pill,
// two text links. The group develops as avatar dots. Reads in five seconds.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';
import { Composer, ConciergeHeader, Narration, Voice } from '../concierge/shared';

const STEPS = [
  { n: '1', text: 'Cancel Isolina', time: 'Thu 8:00' },
  { n: '2', text: 'Book Central — table for 5', time: 'Thu 8:30' },
  { n: '3', text: 'Move the Barranco walk to Friday morning', time: 'Fri a.m.' },
];

const GROUP = [
  { name: 'You', uri: AVATARS.you, approved: true },
  { name: 'Maya', uri: AVATARS.maya, approved: true },
  { name: 'Tomo', uri: AVATARS.tomo, approved: false },
  { name: 'Rosa', approved: false },
  { name: 'Dana', approved: false },
] as const;

function GroupRow({ dot = 22 }: { dot?: number }) {
  return (
    <View style={styles.groupRow}>
      <View style={styles.dots}>
        {GROUP.map((m, i) => {
          const shape = {
            width: dot,
            height: dot,
            borderRadius: dot / 2,
            marginLeft: i === 0 ? 0 : -6,
            opacity: m.approved ? 1 : 0.4,
          };
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
  );
}

export default function A1Slip({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* What the concierge did, then what it says */}
        <Narration text="Watched Central’s book for 12 days" />
        <Voice style={styles.voiceLine}>A table opened at Central. Here’s the move:</Voice>

        {/* The slip — paper, the concierge's material */}
        <View style={styles.slip}>
          <View style={styles.slipHead}>
            <Text style={styles.label}>The plan</Text>
            <Text style={styles.slipDate}>Lima · Thu, Oct 21</Text>
          </View>

          {STEPS.map((s, i) => (
            <View key={s.n} style={[styles.step, i > 0 && styles.stepRule]}>
              <Text style={styles.stepNum}>{s.n}</Text>
              <Text style={styles.stepText}>{s.text}</Text>
              <Text style={styles.stepTime}>{s.time}</Text>
            </View>
          ))}

          <View style={styles.slipFootRule}>
            <Text style={styles.rationale}>Central’s been full since June — you starred it in July.</Text>
            <Text style={styles.hold}>Held for 18 more minutes</Text>
          </View>

          <GroupRow />

          <Pressable style={styles.approve}>
            <Text style={styles.approveText}>Approve</Text>
          </Pressable>
          <View style={styles.linkRow}>
            <Pressable hitSlop={8}>
              <Text style={styles.link}>Edit the plan</Text>
            </Pressable>
            <Text style={styles.linkDivider}>·</Text>
            <Pressable hitSlop={8}>
              <Text style={styles.link}>I’ll handle it</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 140 },

  voiceLine: { marginTop: 12, marginBottom: 18 },

  slip: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.square,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
  },
  slipHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  slipDate: { fontFamily: fonts.medium, fontSize: 12, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  step: { flexDirection: 'row', alignItems: 'baseline', paddingVertical: 13 },
  stepRule: { borderTopWidth: 1, borderTopColor: colors.hairline },
  stepNum: {
    width: 22,
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
  },
  stepText: { flex: 1, fontFamily: fonts.medium, fontSize: 14.5, lineHeight: 20, color: colors.ink, paddingRight: 10 },
  stepTime: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, fontVariant: ['tabular-nums'] },

  slipFootRule: { borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 12 },
  rationale: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 18, color: colors.inkMuted },
  hold: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'], marginTop: 6 },

  groupRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dot: { borderWidth: 1.5, borderColor: colors.surfaceMuted, backgroundColor: colors.hairline },
  dotInitial: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, borderColor: colors.hairline, borderWidth: 1 },
  dotInitialText: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.inkMuted },
  groupCount: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  approve: {
    height: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  approveText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.bg },
  linkRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 14 },
  link: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.inkMuted },
  linkDivider: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted },
});
