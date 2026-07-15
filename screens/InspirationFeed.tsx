// Inspiration Feed — the open, imagery-led browse of collections from the people
// you follow. Distinct from the concierge's trip-specific results: this is where
// you wander, not plan. Same "collection" unit (a curated board backed by a
// person), presented as a Pinterest-style masonry so photography leads. Every
// pin carries the face of whoever made it — trust, not an algorithm.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import FloatingNav from '../components/FloatingNav';
import { AVATARS, photo } from '../data/trip';
import { colors, fonts, radius } from '../theme';

const FILTERS = ['All', 'Connections', 'Curators', 'Saved'];

// ar = aspectRatio (width/height); < 1 is tall, > 1 is short — the varied
// heights give the masonry its rhythm.
const FEED = [
  { title: 'Hiking the Andes', by: 'James', rel: 'Friend', avatar: AVATARS.james, img: photo('peruAndes'), ar: 0.78 },
  { title: 'Where I eat in CDMX', by: 'Maya', rel: 'Friend', avatar: AVATARS.maya, img: photo('dining'), ar: 1 },
  { title: 'Old Kyoto', by: 'Tomo', rel: 'Curator', avatar: AVATARS.tomo, img: photo('kyoto'), ar: 0.8 },
  { title: 'Amalfi, off-season', by: 'Maya', rel: 'Friend', avatar: AVATARS.maya, img: photo('amalfi'), ar: 1.2 },
  { title: 'Lisbon on foot', by: 'Tomo', rel: 'Curator', avatar: AVATARS.tomo, img: photo('lisbon'), ar: 0.85 },
  { title: 'Comporta', by: 'Tomo', rel: 'Curator', avatar: AVATARS.tomo, img: photo('beachSunset'), ar: 1.3 },
  { title: 'Marrakech markets', by: 'James', rel: 'Friend', avatar: AVATARS.james, img: photo('market'), ar: 0.82 },
  { title: 'A week in Puglia', by: 'Maya', rel: 'Friend', avatar: AVATARS.maya, img: photo('villa'), ar: 1 },
];

function Pin({ item }: { item: (typeof FEED)[number] }) {
  return (
    <View style={styles.pin}>
      <Image source={{ uri: item.img }} style={[styles.pinImg, { aspectRatio: item.ar }]} contentFit="cover" transition={220} />
      <Text style={styles.pinTitle} numberOfLines={1}>{item.title}</Text>
      <View style={styles.pinBy}>
        <Image source={{ uri: item.avatar }} style={styles.pinAvatar} contentFit="cover" />
        <Text style={styles.pinByText} numberOfLines={1}>{item.by}</Text>
      </View>
    </View>
  );
}

export default function InspirationFeed({ onHome }: { onHome?: () => void }) {
  const left = FEED.filter((_, i) => i % 2 === 0);
  const right = FEED.filter((_, i) => i % 2 === 1);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Masthead */}
        <Text style={styles.title}>Inspiration</Text>
        <Text style={styles.sub}>Discover new places & experiences</Text>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((f, i) => (
            <View key={f} style={[styles.filter, i === 0 && styles.filterActive]}>
              <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{f}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Masonry */}
        <View style={styles.masonry}>
          <View style={styles.col}>{left.map((it) => <Pin key={it.title} item={it} />)}</View>
          <View style={styles.col}>{right.map((it) => <Pin key={it.title} item={it} />)}</View>
        </View>
      </ScrollView>

      <FloatingNav onHome={onHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 150 },

  title: { fontFamily: fonts.medium, fontSize: 16, letterSpacing: -0.2, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, marginTop: 4 },

  // Filters
  filterScroll: { marginHorizontal: -16, marginTop: 18, flexGrow: 0 },
  filterRow: { paddingHorizontal: 16, gap: 8 },
  filter: {
    height: 34,
    paddingHorizontal: 15,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  filterText: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
  filterTextActive: { color: colors.bg },

  // Masonry
  masonry: { flexDirection: 'row', gap: 12, marginTop: 22 },
  col: { flex: 1, gap: 18 },
  pin: {},
  pinImg: { width: '100%', borderRadius: radius.square, backgroundColor: colors.hairline },
  pinTitle: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink, marginTop: 9 },
  pinBy: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  pinAvatar: { width: 17, height: 17, borderRadius: 8.5, backgroundColor: colors.hairline },
  pinByText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted },
});
