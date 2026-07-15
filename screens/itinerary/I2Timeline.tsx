// I2 · Timeline — the draft as a day-dots rail inside the conversation.
//
// Lineage: Airbnb's living itinerary + the signature route-line / day-dots
// motif from the screen plan. The concierge speaks first (de-bubbled), the
// narration credits its sources, and then the plan runs down a thin rail:
// 3px dots, hairline connectors, tabular times in a muted left column, small
// square thumbs. Maras carries Maya's provenance chip. Steers close the turn.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration, Steers, Voice } from '../concierge/shared';
import { AVATARS, img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

type Item = { time: string; title: string; meta: string; thumb?: string; prov?: boolean };
type Day = { label: string; items: Item[] };

const DAYS: Day[] = [
  {
    label: 'Fri · Oct 16 — Cusco',
    items: [
      { time: '10:05', title: 'Land in Cusco · LA 2023', meta: 'LIM → CUZ · 1h 25m · go slow today' },
      { time: '15:00', title: 'Check in — Palacio Nazarenas', meta: 'San Blas · 3 nights', thumb: img('photo-1568729670692-0d2de9a3c027') },
      { time: '19:30', title: 'Dinner at Cicciolina', meta: 'Table for five · held', thumb: img('photo-1543067361-9bf996edf6ff') },
    ],
  },
  {
    label: 'Sat · Oct 17 — Sacred Valley',
    items: [
      { time: '08:00', title: 'Into the Sacred Valley', meta: 'Private van · door to door', thumb: img('photo-1717813864181-6d879c978f2d') },
      { time: '11:30', title: 'Maras salt terraces', meta: 'Best in late-morning light', thumb: img('photo-1599669846660-945c5c775181'), prov: true },
      { time: '14:00', title: 'Lunch in Urubamba', meta: 'Garden tables · unhurried' },
    ],
  },
  {
    label: 'Sun · Oct 18 — Machu Picchu',
    items: [
      { time: '06:40', title: 'Vistadome to Aguas Calientes', meta: 'PeruRail · glass roof · car C' },
      { time: '10:00', title: 'Machu Picchu · Circuit 2', meta: 'Entry 10:00–11:00 · guide at the gate', thumb: img('photo-1522743791393-522312deeebf') },
    ],
  },
];

function Row({ item, last }: { item: Item; last: boolean }) {
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View style={styles.dot} />
        {!last && <View style={styles.line} />}
      </View>
      <Text style={styles.time}>{item.time}</Text>
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{item.meta}</Text>
        {item.prov && (
          <View style={styles.prov}>
            <Image source={{ uri: AVATARS.maya }} style={styles.provAvatar} contentFit="cover" />
            <Text style={styles.provText}>Maya, Oct ’24</Text>
          </View>
        )}
      </View>
      {item.thumb && <Image source={{ uri: item.thumb }} style={styles.thumb} contentFit="cover" transition={200} />}
    </View>
  );
}

export default function I2Timeline({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Peru · Draft" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Narration text="Drafted from 6 saves and Maya’s trip" />
        <Voice style={styles.voice}>
          Here’s a first pass at the week — three days sketched, the rest held loose. Maras is in on Maya’s word,
          and Machu Picchu goes early to beat the crowds.
        </Voice>

        {DAYS.map((day) => (
          <View key={day.label} style={styles.day}>
            <Text style={styles.dayLabel}>{day.label.toUpperCase()}</Text>
            {day.items.map((item, i) => (
              <Row key={item.title} item={item} last={i === day.items.length - 1} />
            ))}
          </View>
        ))}

        <Steers items={['Swap a day', 'Slower mornings', 'Looks right']} style={styles.steers} />
      </ScrollView>

      <Composer hint="Change anything — type or talk" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  voice: { marginTop: 12 },

  day: { marginTop: 26 },
  dayLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginBottom: 10,
  },

  row: { flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 18 },
  rail: { width: 14, alignItems: 'center', alignSelf: 'stretch' },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: colors.ink, marginTop: 7 },
  line: { flex: 1, width: 1, backgroundColor: colors.hairline, marginTop: 5, marginBottom: -13 },
  time: {
    width: 46,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    marginTop: 1,
    fontVariant: ['tabular-nums'],
  },
  body: { flex: 1, paddingRight: 12 },
  title: { fontFamily: fonts.medium, fontSize: 15, color: colors.ink },
  meta: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 2, fontVariant: ['tabular-nums'] },

  prov: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  provAvatar: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.hairline },
  provText: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted },

  thumb: { width: 42, height: 42, borderRadius: radius.square, backgroundColor: colors.hairline },

  steers: { marginTop: 8 },
});
