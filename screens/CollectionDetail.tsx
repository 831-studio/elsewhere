// Collection detail — the concierge's Peru pick, opened. Trip-specific (this
// celebration, four travelers, late September), NOT the open Inspiration Feed.
//
// A menu, not a decision: hero → title + trust line → straight into the curated
// stay / eat / experience collections, each place carrying the face of whoever
// vouched for it. No summary prose, no delay — the recommendations lead.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS, photo } from '../data/trip';
import { colors, fonts, radius } from '../theme';

const GROUPS = [
  {
    label: 'Where to stay',
    places: [
      { name: 'Hotel B, Barranco', note: 'Belle-époque art hotel in Lima’s coolest barrio.', by: AVATARS.maya, byName: 'Maya', img: photo('hotel') },
      { name: 'Explora Valle Sagrado', note: 'All-inclusive; the guided hikes are unreal.', by: AVATARS.maya, byName: 'Maya', img: photo('suite') },
      { name: 'Sol y Luna', note: 'Relais & Châteaux casitas + horse stables.', by: AVATARS.tomo, byName: 'Tomo', img: photo('villa') },
      { name: 'Tambo del Inka', note: 'Its own rail station to Machu Picchu.', by: AVATARS.james, byName: 'James', img: photo('suite') },
    ],
  },
  {
    label: 'Where to eat',
    places: [
      { name: 'Central, Lima', note: 'Virgilio Martínez’s altitude menu — ranked world #1.', by: AVATARS.tomo, byName: 'Tomo', img: photo('dining') },
      { name: 'Maido, Lima', note: 'Mitsuharu’s Nikkei tasting. Book both.', by: AVATARS.maya, byName: 'Maya', img: photo('restaurant') },
      { name: 'MIL, Moray', note: 'The Central team, up at altitude in the valley.', by: AVATARS.tomo, byName: 'Tomo', img: photo('table') },
      { name: 'Cicciolina, Cusco', note: 'The institution locals actually book.', by: AVATARS.james, byName: 'James', img: photo('market') },
    ],
  },
  {
    label: 'Experiences',
    places: [
      { name: 'Machu Picchu at dawn', note: 'Private guide, before the crowds.', by: AVATARS.james, byName: 'James', img: photo('peruAndes') },
      { name: 'Maras & Moray', note: 'Salt terraces + the Inca circles.', by: AVATARS.maya, byName: 'Maya', img: photo('safari') },
      { name: 'Barranco, ceviche + pisco', note: 'A Lima food crawl through the art district.', by: AVATARS.maya, byName: 'Maya', img: photo('dining') },
    ],
  },
];

function Faces({ list, size = 22 }: { list: string[]; size?: number }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {list.map((a, i) => (
        <Image
          key={i}
          source={{ uri: a }}
          style={[styles.face, { width: size, height: size, borderRadius: size / 2, marginLeft: i ? -size * 0.32 : 0 }]}
          contentFit="cover"
        />
      ))}
    </View>
  );
}

export default function CollectionDetail({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View>
          <Image source={{ uri: photo('peruAndes') }} style={styles.hero} contentFit="cover" transition={220} />
          <Pressable onPress={onBack} hitSlop={10} style={styles.back}>
            <Feather name="chevron-left" size={20} color={colors.ink} />
          </Pressable>
          {/* Product signal, not agent opinion */}
          <View style={styles.matchBadge}>
            <Text style={styles.matchBadgeText}>Best match</Text>
          </View>
        </View>

        {/* Title block — straight into the menu, no summary prose */}
        <View style={styles.body}>
          <Text style={styles.eyebrow}>Tailored for your celebration</Text>
          <Text style={styles.title}>Lima &amp; the Sacred Valley</Text>
          <Text style={styles.context}>Late September · 4 travelers · from $5,800 pp</Text>
          <View style={styles.backedRow}>
            <Faces list={[AVATARS.maya, AVATARS.james, AVATARS.tomo]} />
            <Text style={styles.backedText}>20 places · from Maya, James &amp; Tomo</Text>
          </View>
        </View>

        {/* Curated places — each category is its own horizontal collection */}
        {GROUPS.map((g) => (
          <View key={g.label} style={styles.group}>
            <Text style={styles.groupLabel}>{g.label}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.row}
            >
              {g.places.map((pl) => (
                <View key={pl.name} style={styles.pcard}>
                  <Image source={{ uri: pl.img }} style={styles.pcardImg} contentFit="cover" transition={220} />
                  <Text style={styles.pcardName} numberOfLines={1}>{pl.name}</Text>
                  <Text style={styles.pcardNote} numberOfLines={2}>{pl.note}</Text>
                  <View style={styles.pcardBy}>
                    <Image source={{ uri: pl.by }} style={styles.pcardByAvatar} contentFit="cover" />
                    <Text style={styles.pcardByText}>{pl.byName}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      {/* Docked action bar — context left, compact CTA right (the Airbnb/Resy
          detail pattern): clearly a button, anchored instead of floating */}
      <View style={styles.dock}>
        <Text style={styles.dockPrice}>from $5,800 pp</Text>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>Build this trip</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 120 },

  hero: { width: '100%', height: 300, backgroundColor: colors.hairline },
  back: {
    position: 'absolute',
    top: 14,
    left: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: colors.ink,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  matchBadgeText: { fontFamily: fonts.medium, fontSize: 12, color: colors.bg, letterSpacing: 0.2 },

  body: { paddingHorizontal: 20 },

  eyebrow: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted, marginTop: 20 },
  title: { fontFamily: fonts.medium, fontSize: 16, letterSpacing: -0.2, color: colors.ink, marginTop: 6 },
  context: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 5 },
  backedRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 14 },
  backedText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, flexShrink: 1 },

  face: { borderWidth: 1.5, borderColor: colors.bg, backgroundColor: colors.hairline },

  // Curated collections (horizontal)
  group: { marginTop: 26 },
  groupLabel: { fontFamily: fonts.regular, fontSize: 14, letterSpacing: -0.1, color: colors.ink, paddingHorizontal: 20 },
  row: { paddingHorizontal: 20, paddingTop: 12, gap: 12 },
  pcard: { width: 176 },
  pcardImg: { width: 176, height: 128, borderRadius: radius.square, backgroundColor: colors.hairline },
  pcardName: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink, marginTop: 9 },
  pcardNote: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 17, color: colors.inkMuted, marginTop: 3 },
  pcardBy: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  pcardByAvatar: { width: 15, height: 15, borderRadius: 7.5, backgroundColor: colors.hairline },
  pcardByText: { fontFamily: fonts.medium, fontSize: 12, color: colors.ink },

  // Docked action bar — slim, informational left + compact ink CTA right
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  dockPrice: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  // Same button class as the Group canvas "Confirm" — one compact CTA size app-wide
  cta: {
    height: 34,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: { fontFamily: fonts.medium, fontSize: 13, color: colors.bg },
});
