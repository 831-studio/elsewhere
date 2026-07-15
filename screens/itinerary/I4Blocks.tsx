// I4 · Blocks — the draft as proposal blocks the group develops into ink.
//
// Lineage: the "provisional opacity" pattern (consent is visual, never
// checkbox admin) on the concierge's paper material. Each day is a paper
// card; every line inside is a proposal. Approved lines sit in full ink with
// tiny avatar dots; pending lines render ghosted (~0.45) with a quiet
// "2 of 5" count, developing to ink as approvals land — a photograph
// developing, not a form completing.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Voice } from '../concierge/shared';
import { AVATARS } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

type Item = { time: string; title: string; meta: string; approved?: boolean; count?: string };
type Day = { label: string; items: Item[] };

const DAYS: Day[] = [
  {
    label: 'Fri · Oct 16 — Cusco',
    items: [
      { time: '10:05', title: 'LIM → CUZ · LA 2023', meta: 'LATAM · 1h 25m · five seats held', approved: true },
      { time: '15:00', title: 'Check in — Palacio Nazarenas', meta: 'San Blas · 3 nights', approved: true },
      { time: '19:30', title: 'Dinner at Cicciolina', meta: 'Table for five · held to Thursday', count: '3 of 5' },
    ],
  },
  {
    label: 'Sat · Oct 17 — Sacred Valley',
    items: [
      { time: '08:00', title: 'Into the Sacred Valley', meta: 'Private van · door to door', count: '2 of 5' },
      { time: '11:30', title: 'Maras salt terraces', meta: 'Maya, Oct ’24 · late-morning light', approved: true },
    ],
  },
  {
    label: 'Sun · Oct 18 — Machu Picchu',
    items: [
      { time: '06:40', title: 'Vistadome to Aguas Calientes', meta: 'PeruRail · glass roof · car C', count: '4 of 5' },
      { time: '10:00', title: 'Machu Picchu · Circuit 2', meta: 'Entry 10:00–11:00', count: '2 of 5' },
    ],
  },
];

function Row({ item }: { item: Item }) {
  return (
    <View style={[styles.row, !item.approved && styles.rowGhost]}>
      <Text style={styles.time}>{item.time}</Text>
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.meta}</Text>
      </View>
      {item.approved ? (
        <View style={styles.avatars}>
          <Image source={{ uri: AVATARS.maya }} style={styles.avatar} contentFit="cover" />
          <Image source={{ uri: AVATARS.james }} style={[styles.avatar, styles.avatarStacked]} contentFit="cover" />
        </View>
      ) : (
        <Text style={styles.count}>{item.count}</Text>
      )}
    </View>
  );
}

export default function I4Blocks({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Peru · Draft" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.summary}>3 approved · 4 awaiting the group</Text>

        {DAYS.map((day) => (
          <View key={day.label} style={styles.card}>
            <Text style={styles.dayLabel}>{day.label.toUpperCase()}</Text>
            {day.items.map((item) => (
              <Row key={item.title} item={item} />
            ))}
          </View>
        ))}

        <Voice style={styles.voice}>
          As the others weigh in, each line settles from ghost to ink. Once a day is whole I’ll hold every
          booking — nothing is charged until you say go.
        </Voice>
      </ScrollView>

      <Composer hint="Change anything — type or talk" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  summary: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
    marginBottom: 4,
    fontVariant: ['tabular-nums'],
  },

  // Paper day cards
  card: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.square,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 6,
    marginTop: 12,
  },
  dayLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginBottom: 4,
  },

  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  rowGhost: { opacity: 0.45 },
  time: {
    width: 46,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
  },
  body: { flex: 1, paddingRight: 10 },
  title: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.ink },
  meta: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 2, fontVariant: ['tabular-nums'] },

  avatars: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.surfaceMuted,
    backgroundColor: colors.hairline,
  },
  avatarStacked: { marginLeft: -5 },
  count: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  voice: { marginTop: 24 },
});
