// P1 · Passport — the travel passport. Identity as a collected object:
// stamp-chips for preferences (with ghost invitations), Retro-style filmstrip
// rows for past trips, people as faces and names. Beautiful at 40% complete.

import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConciergeHeader } from './../concierge/shared';
import { AVATARS, img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const STAMPS = ['Window seat', 'Vegetarian-friendly group', 'oneworld Sapphire', 'Slow mornings'];
const GHOSTS = ['Home airport', 'Room style'];

const TRIPS = [
  {
    name: 'Sacred Valley',
    dates: 'Oct ’25',
    photos: [
      img('photo-1501260928121-766a7feb7f8d'),
      img('photo-1543067361-9bf996edf6ff'),
      img('photo-1568729670692-0d2de9a3c027'),
      img('photo-1599669846660-945c5c775181'),
    ],
  },
  {
    name: 'Oaxaca',
    dates: 'Mar ’25',
    photos: [
      img('photo-1522743791393-522312deeebf'),
      img('photo-1534094830444-3a1e21f7e3e7'),
      img('photo-1717813864181-6d879c978f2d'),
    ],
  },
  {
    name: 'Alentejo',
    dates: 'Sep ’24',
    photos: [
      img('photo-1520529890308-f503006340b4'),
      img('photo-1717813864181-6d879c978f2d'),
      img('photo-1534094830444-3a1e21f7e3e7'),
    ],
  },
];

const PEOPLE = [
  { name: 'Maya', avatar: AVATARS.maya },
  { name: 'James', avatar: AVATARS.james },
  { name: 'Tomo', avatar: AVATARS.tomo },
];

export default function P1Passport({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <ConciergeHeader onBack={onBack} title="You" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Identity */}
        <View style={styles.identity}>
          <Image source={{ uri: AVATARS.you }} style={styles.avatar} contentFit="cover" />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Shavonne Hart</Text>
            <Text style={styles.meta}>Chicago · 14 countries · traveling since 2019</Text>
          </View>
        </View>

        {/* Preferences as stamps */}
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.stampRow}>
          {STAMPS.map((s) => (
            <View key={s} style={styles.stamp}>
              <Text style={styles.stampText}>{s}</Text>
            </View>
          ))}
          {GHOSTS.map((g) => (
            <Pressable key={g} style={styles.ghost}>
              <Feather name="plus" size={12} color={colors.inkMuted} />
              <Text style={styles.ghostText}>{g}</Text>
            </Pressable>
          ))}
        </View>

        {/* Trips as filmstrips */}
        <Text style={styles.sectionLabel}>TRIPS</Text>
        {TRIPS.map((t) => (
          <View key={t.name} style={styles.strip}>
            <View style={styles.stripEdge}>
              <Text style={styles.stripName}>{t.name}</Text>
              <Text style={styles.stripDates}>{t.dates}</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.stripScroll}
              contentContainerStyle={styles.stripPhotos}
            >
              {t.photos.map((uri, i) => (
                <Image key={`${t.name}-${i}`} source={{ uri }} style={styles.frame} contentFit="cover" transition={220} />
              ))}
            </ScrollView>
          </View>
        ))}

        {/* People */}
        <Text style={styles.sectionLabel}>PEOPLE</Text>
        <View style={styles.people}>
          <View style={styles.cluster}>
            {PEOPLE.map((p, i) => (
              <Image
                key={p.name}
                source={{ uri: p.avatar }}
                style={[styles.clusterAvatar, i > 0 && { marginLeft: -10 }]}
                contentFit="cover"
              />
            ))}
          </View>
          <Text style={styles.peopleText}>Maya, James & Tomo — your usual crew</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 48 },

  identity: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 30 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.hairline },
  name: { fontFamily: fonts.semibold, fontSize: 20, lineHeight: 25, color: colors.ink },
  meta: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    marginTop: 3,
    fontVariant: ['tabular-nums'],
  },

  sectionLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginBottom: 12,
  },

  stampRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 32 },
  stamp: {
    height: 32,
    paddingHorizontal: 13,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink },
  ghost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 32,
    paddingHorizontal: 13,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  ghostText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },

  strip: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  stripEdge: { width: 86, paddingRight: 10 },
  stripName: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.ink },
  stripDates: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.inkMuted,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },
  stripScroll: { flex: 1, marginRight: -16 },
  stripPhotos: { flexDirection: 'row', gap: 3, paddingRight: 16 },
  frame: { width: 64, height: 64, borderRadius: radius.square, backgroundColor: colors.hairline },

  people: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cluster: { flexDirection: 'row' },
  clusterAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.bg,
    backgroundColor: colors.hairline,
  },
  peopleText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink },
});
