// Home — the landing screen. A place to land and orient, not a feed.
//
// You arrive ready to act (Google Flights logic), quietly (Elsewhere logic):
//   1. destination + dates in one split pill, then Flights · Stays ·
//      Experiences tiles for booking it yourself
//   2. the agent one line below — "just ask," type or voice
//   3. PLANNING — the trip in motion
//   4. EXPLORE — a door into the feed, plus small city doors beneath it
// One job per zone, hairlines and ink only, imagery stays in its frames.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import FloatingNav from '../components/FloatingNav';
import { AVATARS, photo } from '../data/trip';
import { colors, fonts, radius } from '../theme';

const CITY_DOORS = [
  { name: 'Lisbon', uri: photo('lisbon') },
  { name: 'Kyoto', uri: photo('kyoto') },
  { name: 'Amalfi', uri: photo('amalfi') },
];

// Collections — Pinterest's board-as-moodboard cover (collaged imagery + a
// titled point of view) with Retro's journal intimacy (the curator's face and
// name as the trust signal — never counts).
const COLLECTIONS = [
  {
    title: 'Where I eat in CDMX',
    curator: 'Maya',
    avatar: AVATARS.maya,
    places: 12,
    images: [photo('dining'), photo('table'), photo('market')],
  },
  {
    title: 'Old Kyoto',
    curator: 'Tomo',
    avatar: AVATARS.tomo,
    places: 9,
    images: [photo('kyoto'), photo('suite'), photo('restaurant')],
  },
  {
    title: 'Hiking the Andes',
    curator: 'James',
    avatar: AVATARS.james,
    places: 14,
    images: [photo('peruAndes'), photo('safari'), photo('beachSunset')],
  },
];

export default function Home({
  onOpenTrip,
  onExplore,
  onConcierge,
}: {
  onOpenTrip?: () => void;
  onExplore?: () => void;
  onConcierge?: () => void;
}) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Destination + dates — the page leads with the search */}
        <View style={styles.searchPill}>
          <Pressable style={styles.whereField}>
            <Ionicons name="search-outline" size={17} color={colors.inkMuted} />
            <Text style={styles.fieldHint}>Where to?</Text>
          </Pressable>
          <View style={styles.pillDivider} />
          <Pressable style={styles.datesField}>
            <Ionicons name="calendar-clear-outline" size={15} color={colors.inkMuted} />
            <Text style={styles.fieldHint}>Select dates</Text>
          </Pressable>
        </View>

        {/* Book it yourself */}
        <View style={styles.catRow}>
          <Pressable style={styles.cat}>
            <Text style={styles.catLabel}>Flights</Text>
          </Pressable>
          <Pressable style={styles.cat}>
            <Text style={styles.catLabel}>Hotels</Text>
          </Pressable>
          <Pressable style={styles.cat}>
            <Text style={styles.catLabel}>Experiences</Text>
          </Pressable>
        </View>

        {/* …or hand it to the concierge — clean white, a centered invitation
            over its own input; the mic and copy carry it, no tonal surface */}
        <Pressable style={styles.ask} onPress={onConcierge}>
          <Text style={styles.askTitle}>Build a trip with your concierge</Text>
          <View style={styles.askField}>
            <Text style={styles.askHint} numberOfLines={1}>Start with any idea…</Text>
            <Ionicons name="mic-outline" size={17} color={colors.ink} />
          </View>
        </Pressable>

        {/* Trip being planned */}
        <Text style={styles.sectionLabel}>Planning</Text>
        <Pressable style={styles.tripCard} onPress={onOpenTrip}>
          <Image source={{ uri: photo('peruAndes') }} style={styles.tripThumb} contentFit="cover" />
          <View style={styles.tripText}>
            <Text style={styles.tripTitle} numberOfLines={1}>Lima &amp; the Sacred Valley</Text>
            <Text style={styles.tripMeta}>Sep 18–26</Text>
          </View>
          <View style={styles.tripAvatars}>
            {/* The travelers on this trip (placeholder images — will be swapped) */}
            <Image source={{ uri: AVATARS.priya }} style={styles.tripAvatar} contentFit="cover" />
            <Image source={{ uri: AVATARS.jules }} style={[styles.tripAvatar, styles.stacked]} contentFit="cover" />
          </View>
          <Feather name="chevron-right" size={16} color={colors.inkMuted} />
        </Pressable>

        {/* Explore — the feed door, then small city doors */}
        <Text style={styles.sectionLabel}>Explore</Text>
        <Pressable onPress={onExplore}>
          <Image
            source={{ uri: photo('coastAerial') }}
            style={styles.exploreImage}
            contentFit="cover"
            transition={220}
          />
        </Pressable>
        <View style={styles.cityRow}>
          {CITY_DOORS.map((c) => (
            <Pressable key={c.name} style={styles.city} onPress={onExplore}>
              <Image source={{ uri: c.uri }} style={styles.cityImage} contentFit="cover" transition={220} />
              <Text style={styles.cityName}>{c.name}</Text>
            </Pressable>
          ))}
        </View>

        {/* Fresh points of view from friends and curators */}
        <Text style={styles.sectionLabel}>New Collections</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.collScroll}
          contentContainerStyle={styles.collRow}
        >
          {COLLECTIONS.map((c) => (
            <Pressable key={c.title} style={styles.coll}>
              <View style={styles.collCover}>
                <Image source={{ uri: c.images[0] }} style={styles.collMain} contentFit="cover" transition={220} />
                <View style={styles.collSide}>
                  <Image source={{ uri: c.images[1] }} style={styles.collCell} contentFit="cover" transition={220} />
                  <Image source={{ uri: c.images[2] }} style={styles.collCell} contentFit="cover" transition={220} />
                </View>
              </View>
              <Text style={styles.collTitle} numberOfLines={1}>{c.title}</Text>
              <View style={styles.collCurator}>
                <Image source={{ uri: c.avatar }} style={styles.collAvatar} contentFit="cover" />
                <Text style={styles.collCuratorText}>{c.curator} · {c.places} places</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Home scrolls now — the fade honestly signals more below */}
      <FloatingNav active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 190 },

  // Destination + dates — one pill, split
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  whereField: {
    flex: 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingLeft: 18,
    height: '100%',
  },
  datesField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 14,
    height: '100%',
  },
  pillDivider: { width: 1, height: 24, backgroundColor: colors.hairline },
  fieldHint: { fontFamily: fonts.regular, fontSize: 14, color: colors.inkMuted },

  // Self-serve chips — each hugs its word with equal padding, so every chip
  // has the same optical density; pill-shaped to echo the search field above
  catRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  cat: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  catLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },

  // Concierge space — a filled tonal surface (Retro fills its containers; the
  // fill is the container and the presence). Cool-gray "concierge material"
  // holds the centered invitation + a white input that pops against the tint.
  ask: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: radius.square,
    backgroundColor: colors.surfaceMuted,
  },
  // Centered: the concierge line is an invitation, set like one
  askTitle: { fontFamily: fonts.regular, fontSize: 14.5, color: colors.ink, textAlign: 'center' },
  // White input pops against the tint — no border needed; contrast does it.
  askField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    marginTop: 14, // below the invitation, before the input
  },
  askHint: { flex: 1, fontFamily: fonts.regular, fontSize: 13.5, color: colors.inkMuted },

  // Sections
  // Sentence-case ink section titles — matches Decisions / Flights / Where to
  // stay across the app (the Pinterest register), replacing the old gray caps
  sectionLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    letterSpacing: -0.1,
    color: colors.ink,
    marginTop: 22,
    marginBottom: 10,
  },

  // Trip being planned
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 64,
    paddingHorizontal: 12,
    borderRadius: radius.square,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  tripThumb: { width: 44, height: 44, borderRadius: radius.square, backgroundColor: colors.hairline },
  tripText: { flex: 1, paddingRight: 6 }, // air between a truncated title and the avatar cluster
  tripTitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  tripMeta: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 2 },
  tripAvatars: { flexDirection: 'row', alignItems: 'center' },
  tripAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.bg,
    backgroundColor: colors.hairline,
  },
  stacked: { marginLeft: -6 },

  // Explore
  exploreImage: { width: '100%', height: 102, borderRadius: radius.square, backgroundColor: colors.hairline },
  cityRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  city: { flex: 1 },
  cityImage: { width: '100%', height: 52, borderRadius: radius.square, backgroundColor: colors.hairline },
  // Matches collTitle — one caption style for every image-over-title object;
  // regular weight so bare captions never outweigh their section header
  cityName: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, marginTop: 7 },

  // Collections — collaged cover, titled point of view, curator as trust
  collScroll: { marginHorizontal: -16, flexGrow: 0 },
  collRow: { paddingHorizontal: 16, gap: 12 },
  coll: { width: 156 },
  collCover: {
    flexDirection: 'row',
    gap: 2,
    height: 96,
    borderRadius: radius.square,
    overflow: 'hidden',
  },
  collMain: { flex: 2, backgroundColor: colors.hairline },
  collSide: { flex: 1, gap: 2 },
  collCell: { flex: 1, backgroundColor: colors.hairline },
  collTitle: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, marginTop: 8 },
  collCurator: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  collAvatar: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.hairline },
  collCuratorText: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted },
});
