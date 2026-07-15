// PlanView — hands-on exploration: search hotels, restaurants, activities
// yourself (vs. browsing inspo or the locked itinerary).
//
// A quiet search field and category chips up top, then imagery-led results in
// the editorial style — full-width photo, caption underneath (Artsy-like), no
// heavy cards. Save via a small bookmark on the caption row.

import { useState } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { img } from '../data/trip';
import { colors, fonts, radius } from '../theme';

const CATEGORIES = ['Hotels', 'Food', 'Experiences', 'Flights'] as const;

const RESULTS = [
  {
    uri: img('photo-1568729670692-0d2de9a3c027'),
    name: 'Palacio Nazarenas',
    meta: 'Hotel · San Blas, Cusco · $$$$',
  },
  {
    uri: img('photo-1520529890308-f503006340b4'),
    name: 'Atemporal',
    meta: 'Boutique stay · Miraflores, Lima · $$$',
  },
  {
    uri: img('photo-1599669846660-945c5c775181'),
    name: 'Explora Valle Sagrado',
    meta: 'Lodge · Sacred Valley · $$$$',
  },
];

export default function PlanView() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Hotels');

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Search */}
      <Pressable style={styles.search}>
        <Ionicons name="search-outline" size={17} color={colors.inkMuted} />
        <Text style={styles.searchHint}>Search stays, tables, guides…</Text>
      </Pressable>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chips}>
        {CATEGORIES.map((c) => {
          const active = category === c;
          return (
            <Pressable
              key={c}
              onPress={() => setCategory(c)}
              style={[styles.chip, active && styles.chipActive]}
              hitSlop={4}
            >
              <Text style={active ? styles.chipTextActive : styles.chipText}>{c}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Results */}
      <Text style={styles.sectionLabel}>{`${category} · CUSCO & AROUND`.toUpperCase()}</Text>
      {RESULTS.map((r) => (
        <Pressable key={r.name} style={styles.result}>
          <Image source={{ uri: r.uri }} style={styles.resultImage} contentFit="cover" transition={220} />
          <View style={styles.caption}>
            <View style={styles.captionText}>
              <Text style={styles.resultName}>{r.name}</Text>
              <Text style={styles.resultMeta}>{r.meta}</Text>
            </View>
            <Ionicons name="bookmark-outline" size={18} color={colors.ink} />
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 150 },

  // Search
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  searchHint: { fontFamily: fonts.regular, fontSize: 14, color: colors.inkMuted },

  // Chips
  chipsScroll: { marginTop: 14, marginHorizontal: -16, flexGrow: 0 },
  chips: { flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  chip: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { borderColor: colors.ink },
  chipText: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted },
  chipTextActive: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },

  // Results
  sectionLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginTop: 24,
    marginBottom: 14,
  },
  result: { marginBottom: 24 },
  resultImage: { width: '100%', height: 180, borderRadius: radius.square, backgroundColor: colors.hairline },
  caption: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  captionText: { flex: 1 },
  resultName: { fontFamily: fonts.medium, fontSize: 15, color: colors.ink },
  resultMeta: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, marginTop: 2 },
});
