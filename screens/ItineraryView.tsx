// ItineraryView — the trip's confirmed details, day by day.
//
// This is where the group's locked-in plans live: flights, stays, tables,
// activities. Calm and structured — a quiet timeline, not a booking dashboard.
// Times sit in a muted left rail; each item is a title + one line of meta with
// an optional thumbnail. Pending group approvals are the single accent moment.

import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS, img } from '../data/trip';
import { colors, fonts, radius } from '../theme';

type Item = {
  time: string;
  title: string;
  sub: string;
  thumb?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  pending?: boolean;
};

type Day = { label: string; items: Item[] };

const DAYS: Day[] = [
  {
    label: 'Fri · Oct 16',
    items: [
      { time: '10:05', title: 'LIM → CUZ · LA 2023', sub: 'LATAM · 1h 25m · seats 14A–D', icon: 'airplane-outline' },
      { time: '15:00', title: 'Check in — Palacio Nazarenas', sub: 'San Blas, Cusco · 3 nights', thumb: img('photo-1568729670692-0d2de9a3c027') },
      { time: '19:30', title: 'Dinner at Cicciolina', sub: 'Table for 4 · confirmed', thumb: img('photo-1543067361-9bf996edf6ff') },
    ],
  },
  {
    label: 'Sat · Oct 17',
    items: [
      { time: '08:00', title: 'Sacred Valley & salt mines', sub: 'Private guide · 8 hrs', thumb: img('photo-1717813864181-6d879c978f2d') },
      { time: '18:00', title: 'Planetarium Cusco', sub: 'Awaiting 2 approvals', pending: true, thumb: img('photo-1501260928121-766a7feb7f8d') },
    ],
  },
  {
    label: 'Sun · Oct 18',
    items: [
      { time: '06:40', title: 'Vistadome to Aguas Calientes', sub: 'PeruRail · car C, seats 21–24', icon: 'train-outline' },
      { time: '10:00', title: 'Machu Picchu', sub: 'Circuit 2 · entry 10:00–11:00', thumb: img('photo-1522743791393-522312deeebf') },
    ],
  },
];

function Avatar({ uri, style }: { uri: string; style?: object }) {
  return <Image source={{ uri }} style={[styles.avatar, style]} contentFit="cover" />;
}

export default function ItineraryView() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Trip summary — dates + the group locking these details in */}
      <View style={styles.summary}>
        <View>
          <Text style={styles.dates}>Oct 16 – 23</Text>
          <Text style={styles.region}>Cusco & the Sacred Valley</Text>
        </View>
        <View style={styles.avatarStack}>
          <Avatar uri={AVATARS.maya} />
          <Avatar uri={AVATARS.james} style={styles.stacked} />
          <Avatar uri={AVATARS.you} style={styles.stacked} />
          <View style={[styles.avatar, styles.stacked, styles.plus]}>
            <Text style={styles.plusText}>+1</Text>
          </View>
        </View>
      </View>

      {DAYS.map((day) => (
        <View key={day.label}>
          <Text style={styles.dayLabel}>{day.label.toUpperCase()}</Text>
          {day.items.map((item) => (
            <View key={item.title} style={styles.item}>
              <Text style={styles.time}>{item.time}</Text>
              <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={[styles.itemSub, item.pending && styles.itemPending]}>{item.sub}</Text>
              </View>
              {item.thumb ? (
                <Image source={{ uri: item.thumb }} style={styles.thumb} contentFit="cover" transition={200} />
              ) : item.icon ? (
                <View style={styles.iconWrap}>
                  <Ionicons name={item.icon} size={16} color={colors.inkMuted} />
                </View>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 150 },

  // Summary
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  dates: { fontFamily: fonts.semibold, fontSize: 17, color: colors.ink },
  region: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, marginTop: 3 },

  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: colors.bg,
    backgroundColor: colors.hairline,
  },
  stacked: { marginLeft: -8 },
  plus: { backgroundColor: colors.bg, borderColor: colors.hairline, alignItems: 'center', justifyContent: 'center' },
  plusText: { fontFamily: fonts.semibold, fontSize: 9, color: colors.inkMuted },

  // Days
  dayLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginTop: 24,
    marginBottom: 4,
  },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  time: { width: 48, fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted },
  itemBody: { flex: 1, paddingRight: 12 },
  itemTitle: { fontFamily: fonts.medium, fontSize: 15, color: colors.ink },
  itemSub: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, marginTop: 2 },
  itemPending: { color: colors.accent },
  thumb: { width: 44, height: 44, borderRadius: radius.square, backgroundColor: colors.hairline },
  iconWrap: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
