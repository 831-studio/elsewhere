// A3 · Develop — approval as visual state, on the itinerary itself.
//
// Principle 3 made literal: instead of describing the change, Thursday is
// shown twice-in-one. What the plan would drop sits ghosted and struck; what
// it would become sits full ink with a hairline NEW tag and the group's
// avatar dots developing on it. Consent is one voice line and one pill —
// the itinerary is the intent preview.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';
import { Composer, ConciergeHeader, Voice } from '../concierge/shared';

const GROUP = [
  { name: 'You', uri: AVATARS.you, approved: true },
  { name: 'Maya', uri: AVATARS.maya, approved: true },
  { name: 'Tomo', uri: AVATARS.tomo, approved: false },
  { name: 'Rosa', approved: false },
  { name: 'Dana', approved: false },
] as const;

function DevelopDots() {
  return (
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
  );
}

function Row({
  time,
  title,
  meta,
  state,
}: {
  time: string;
  title: string;
  meta?: string;
  state: 'ghost' | 'new';
}) {
  const ghost = state === 'ghost';
  return (
    <View style={[styles.row, ghost && styles.rowGhost]}>
      <Text style={[styles.rowTime, ghost && styles.struck]}>{time}</Text>
      <View style={styles.rowBody}>
        <View style={styles.rowTitleLine}>
          <Text style={[styles.rowTitle, ghost && styles.struckMuted]}>{title}</Text>
          {!ghost && (
            <View style={styles.newTag}>
              <Text style={styles.newTagText}>New</Text>
            </View>
          )}
        </View>
        {meta ? <Text style={[styles.rowMeta, ghost && styles.struckMuted]}>{meta}</Text> : null}
        {!ghost && <DevelopDots />}
      </View>
    </View>
  );
}

export default function A3Develop({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Voice>A table opened at Central. Here’s Thursday if you say yes —</Voice>

        <Text style={styles.dayLabel}>Thursday · Oct 21 · Lima</Text>
        <View style={styles.day}>
          <Row time="8:00" title="Dinner at Isolina" meta="Barranco · booked Sep 30" state="ghost" />
          <Row time="8:30" title="Dinner at Central" meta="Table for 5 · Barranco" state="new" />
          <Row time="5:00" title="Barranco gallery walk" meta="Moves to Friday" state="ghost" />
        </View>

        <Text style={styles.dayLabel}>Friday · Oct 22</Text>
        <View style={styles.day}>
          <Row time="9:30" title="Barranco gallery walk" meta="Moved from Thursday" state="new" />
        </View>

        <View style={styles.foot}>
          <Text style={styles.rationale}>Central’s been full since June — you starred it in July.</Text>
          <View style={styles.holdRow}>
            <Text style={styles.hold}>Held for 18 more minutes</Text>
            <Text style={styles.hold}>2 of 4 approved</Text>
          </View>
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
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 140 },

  dayLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginTop: 26,
    marginBottom: 4,
    fontVariant: ['tabular-nums'],
  },
  day: {},

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  rowGhost: { opacity: 0.45 },
  rowTime: {
    width: 46,
    fontFamily: fonts.medium,
    fontSize: 13.5,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
    lineHeight: 20,
  },
  rowBody: { flex: 1 },
  rowTitleLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowTitle: { fontFamily: fonts.medium, fontSize: 15, lineHeight: 20, color: colors.ink },
  rowMeta: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 2 },
  struck: { textDecorationLine: 'line-through' },
  struckMuted: { textDecorationLine: 'line-through', color: colors.inkMuted },

  newTag: {
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.square,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  newTagText: {
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },

  dots: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: colors.bg, backgroundColor: colors.hairline },
  dotInitial: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.hairline },
  dotInitialText: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.inkMuted },

  foot: { marginTop: 22 },
  rationale: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 18, color: colors.inkMuted },
  holdRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  hold: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  approve: {
    height: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  approveText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.bg },
  linkRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 14 },
  link: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.inkMuted },
});
