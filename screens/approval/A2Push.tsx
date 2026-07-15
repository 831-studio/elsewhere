// A2 · Push → card — the whole proactive arc in one still.
//
// Two stages, one frame. Top: the push as it lands — a compact hairline card
// with the app glyph, quiet and curious, no specifics. Below: what tapping
// reveals — the same intent slip, condensed. The push earns the tap; the
// card carries the plan. Editorial stage labels make the sequence legible.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';
import { Composer, ConciergeHeader } from '../concierge/shared';

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

export default function A2Push({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stage one — the push, quiet and curious */}
        <Text style={styles.stage}>The push · 4:12 pm</Text>
        <View style={styles.push}>
          <View style={styles.glyph}>
            <Text style={styles.glyphText}>e</Text>
          </View>
          <View style={styles.pushBody}>
            <Text style={styles.pushMeta}>elsewhere · now</Text>
            <Text style={styles.pushLine}>A table opened at Central — I have an idea</Text>
          </View>
        </View>

        {/* The seam between stages */}
        <View style={styles.seam}>
          <View style={styles.seamRule} />
          <Feather name="chevron-down" size={13} color={colors.inkMuted} />
        </View>

        {/* Stage two — what tapping reveals */}
        <Text style={styles.stage}>Tap opens the plan</Text>
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

          <View style={styles.slipFoot}>
            <Text style={styles.rationale}>Central’s been full since June — you starred it in July.</Text>
            <Text style={styles.hold}>Held for 18 more minutes</Text>
          </View>

          <View style={styles.groupRow}>
            <View style={styles.dots}>
              {GROUP.map((m, i) => {
                const shape = { marginLeft: i === 0 ? 0 : -6, opacity: m.approved ? 1 : 0.4 };
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

          <Pressable style={styles.approve}>
            <Text style={styles.approveText}>Approve</Text>
          </Pressable>
          <View style={styles.linkRow}>
            <Pressable hitSlop={8}>
              <Text style={styles.link}>Edit the plan</Text>
            </Pressable>
            <Text style={styles.link}>·</Text>
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

  stage: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginBottom: 10,
    fontVariant: ['tabular-nums'],
  },

  push: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.square,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  glyph: {
    width: 30,
    height: 30,
    borderRadius: radius.square,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.bg, marginTop: -2 },
  pushBody: { flex: 1 },
  pushMeta: { fontFamily: fonts.medium, fontSize: 11, color: colors.inkMuted, marginBottom: 2 },
  pushLine: { fontFamily: fonts.medium, fontSize: 13.5, lineHeight: 18, color: colors.ink },

  seam: { alignItems: 'center', paddingVertical: 14, gap: 2 },
  seamRule: { width: 1, height: 16, backgroundColor: colors.hairline },

  slip: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.square,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 16,
  },
  slipHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  slipDate: { fontFamily: fonts.medium, fontSize: 12, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  step: { flexDirection: 'row', alignItems: 'baseline', paddingVertical: 11 },
  stepRule: { borderTopWidth: 1, borderTopColor: colors.hairline },
  stepNum: { width: 20, fontFamily: fonts.medium, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  stepText: { flex: 1, fontFamily: fonts.medium, fontSize: 14, lineHeight: 19, color: colors.ink, paddingRight: 10 },
  stepTime: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink, fontVariant: ['tabular-nums'] },

  slipFoot: { borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 11 },
  rationale: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 18, color: colors.inkMuted },
  hold: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'], marginTop: 5 },

  groupRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: colors.surfaceMuted, backgroundColor: colors.hairline },
  dotInitial: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.hairline },
  dotInitialText: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.inkMuted },
  groupCount: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  approve: { height: 44, borderRadius: radius.pill, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  approveText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.bg },
  linkRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12 },
  link: { fontFamily: fonts.medium, fontSize: 13, color: colors.inkMuted },
});
