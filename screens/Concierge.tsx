// Concierge — the conversation. Where a vague idea becomes a trip.
//
// The concierge speaks de-bubbled: full-width typeset text on the page, never
// gray bubbles. The user's words sit in a quiet right-aligned hairline block.
// Status is narration ("Compared October weather…"), not a spinner. The
// canvas — destination candidates — arrives with a staggered settle, so the
// screen visibly responds to what was said. The composer is the home card's
// grammar re-used: a paper strip holding a white pill instrument.
//
// Prototype state: a first exchange, pre-scripted ("warm in October, five
// friends") that seeds the Peru storyline via Maya's provenance.

import { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS, photo } from '../data/trip';
import { colors, fonts, radius } from '../theme';

// Each candidate is carried by someone the user trusts — a friend or a
// curator they follow — with that person's actual take. Trust leads;
// weather and price drop to secondary meta.
// Each candidate is a COLLECTION the concierge assembled for THIS trip, backed
// by people you trust. The pick is featured as a collage cover (C); the
// alternates are compact strips (B). Both open into the trip's collection.
const CANDIDATES = [
  {
    variant: 'feature' as const,
    name: 'Lima & the Sacred Valley',
    gallery: [photo('peruAndes'), photo('dining'), photo('suite')],
    faces: [AVATARS.maya, AVATARS.james, AVATARS.tomo],
    who: 'Maya, James + 1',
    count: '20 places',
    quote: 'Eat your way through Lima, then let the valley slow you down. Best two weeks of my life.',
    by: 'Maya',
    meta: 'Lima + the Andes · dry season · from $5,800 pp',
  },
  {
    variant: 'strip' as const,
    name: 'Comporta, Portugal',
    gallery: [photo('beachSunset'), photo('dining'), photo('suite'), photo('table')],
    faces: [AVATARS.tomo, AVATARS.maya],
    who: 'Tomo + 1',
    count: '16 places',
    quote: 'The Portugal nobody posts — rice paddies, wild dune beaches, total quiet.',
    by: 'Tomo',
    meta: 'Warm autumn · Atlantic coast · from $4,600 pp',
  },
  {
    variant: 'strip' as const,
    name: 'San Sebastián, Spain',
    gallery: [photo('coastAerial'), photo('dining'), photo('restaurant'), photo('table')],
    faces: [AVATARS.maya, AVATARS.tomo, AVATARS.james],
    who: 'Maya + 2',
    count: '17 places',
    quote: 'Pintxos crawl in the old town, then one big Michelin lunch. Nowhere eats better.',
    by: 'Maya',
    meta: 'Pintxos season · Basque coast · from $4,900 pp',
  },
  {
    variant: 'strip' as const,
    name: 'Marrakech, Morocco',
    gallery: [photo('villa'), photo('market'), photo('restaurant'), photo('table')],
    faces: [AVATARS.james, AVATARS.maya],
    who: 'James + 1',
    count: '14 places',
    quote: 'The riads feel like staying inside a jewel box.',
    by: 'James',
    meta: 'Warm days, cool nights · from $3,900 pp',
  },
];

const STEERS = ['More remote', 'Closer to home', 'Surprise me'];

function Faces({ list, size = 20 }: { list: string[]; size?: number }) {
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

function CandidateCard({ c, index, onOpen }: { c: (typeof CANDIDATES)[number]; index: number; onOpen?: () => void }) {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(t, {
      toValue: 1,
      duration: 320,
      delay: 300 + index * 140,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [t, index]);

  const feature = c.variant === 'feature';

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: t, transform: [{ translateY: t.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] },
      ]}
    >
      <Pressable onPress={onOpen}>
        {feature ? (
          // Collage cover — the concierge's pick, elevated
          <View style={styles.collage}>
            <Image source={{ uri: c.gallery[0] }} style={styles.collMain} contentFit="cover" transition={220} />
            <View style={styles.collSide}>
              <Image source={{ uri: c.gallery[1] }} style={styles.collCell} contentFit="cover" transition={220} />
              <Image source={{ uri: c.gallery[2] }} style={styles.collCell} contentFit="cover" transition={220} />
            </View>
            {/* Product signal (not agent opinion) — the strongest fit for the brief */}
            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>Best match</Text>
            </View>
          </View>
        ) : (
          // Strip — compact collection preview
          <View style={styles.strip}>
            {c.gallery.map((u, i) => (
              <Image key={i} source={{ uri: u }} style={styles.stripCell} contentFit="cover" transition={220} />
            ))}
          </View>
        )}

        {/* Title + an affordance that this opens into a collection */}
        <View style={styles.titleRow}>
          <Text style={styles.cardName} numberOfLines={1}>{c.name}</Text>
          <Feather name="arrow-right" size={16} color={colors.inkMuted} />
        </View>

        {/* Who recommends it — the trust layer. Their words live one level
            deeper, in the opened collection, so the conversation stays scannable. */}
        <View style={styles.recRow}>
          <Faces list={c.faces} size={20} />
          <Text style={styles.whoText} numberOfLines={1}>{c.who} · {c.count}</Text>
        </View>

        {/* Logistics — quiet */}
        <Text style={styles.cardMeta}>{c.meta}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function Concierge({ onBack, onOpenCollection }: { onBack?: () => void; onOpenCollection?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header — back + the concierge's name, centered (its spaces may center) */}
      <View style={styles.header}>
        <View style={styles.titleCenter} pointerEvents="none">
          <Text style={styles.title}>Concierge</Text>
        </View>
        <Pressable onPress={onBack} hitSlop={10}>
          <Feather name="chevron-left" size={22} color={colors.ink} />
        </Pressable>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* You said — how someone actually talks to a travel agent */}
        <View style={styles.userBlock}>
          <Text style={styles.userText}>
            I’m planning a trip with three friends to celebrate some of our recent accomplishments! We
            want to go all out on a luxury experience — somewhere with unforgettable food &amp; wine. Budget is
            flexible if it’s worth it. Thinking this fall — where would you send us?
          </Text>
        </View>

        {/* What the concierge did — narration, not a spinner */}
        <View style={styles.narration}>
          <Feather name="check" size={12} color={colors.inkMuted} />
          <Text style={styles.narrationText}>Four curated recommendations for your trip</Text>
        </View>

        {/* No agent monologue — the signal above says it; the canvas shows it */}

        {/* The canvas responds — trusted recommendations */}
        {CANDIDATES.map((c, i) => (
          <CandidateCard key={c.name} c={c} index={i} onOpen={onOpenCollection} />
        ))}

        {/* Steer the conversation */}
        <View style={styles.steerRow}>
          {STEERS.map((s) => (
            <Pressable key={s} style={styles.steer}>
              <Text style={styles.steerText}>{s}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Composer — the home card's grammar, docked */}
      <View style={styles.composer}>
        <View style={styles.composerField}>
          <Text style={styles.composerHint}>Type or talk</Text>
          <Ionicons name="mic-outline" size={17} color={colors.ink} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // Header
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  titleCenter: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  title: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },

  // Conversation
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  userBlock: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.square,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  userText: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.ink },

  narration: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 18, marginBottom: 22 },
  narrationText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },

  voice: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.ink, marginTop: 12, marginBottom: 22 },

  // Canvas — each candidate is a collection assembled for this trip
  card: { marginBottom: 28 },

  // Feature (collage cover) — the concierge's pick, elevated
  collage: { flexDirection: 'row', gap: 3, height: 188, borderRadius: radius.square, overflow: 'hidden' },
  collMain: { flex: 2, backgroundColor: colors.hairline },
  collSide: { flex: 1, gap: 3 },
  collCell: { flex: 1, backgroundColor: colors.hairline },

  // Strip — compact collection preview (the alternates)
  strip: { flexDirection: 'row', gap: 3, height: 86, borderRadius: radius.square, overflow: 'hidden' },
  stripCell: { flex: 1, backgroundColor: colors.hairline },

  // Best-match badge — a computed product signal overlaid on the pick
  matchBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.ink,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  matchBadgeText: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.bg, letterSpacing: 0.2 },

  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 12 },
  cardName: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink, flexShrink: 1 },

  // Who vouched — the trust layer
  recRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 9 },
  face: { borderWidth: 1.5, borderColor: colors.bg, backgroundColor: colors.hairline },
  whoText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, flexShrink: 1 },

  recQuote: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.ink, marginTop: 9 },
  by: { color: colors.inkMuted },

  // Logistics — quiet
  cardMeta: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 8 },

  // Steering
  steerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
  steer: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  steerText: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },

  // Composer — paper strip holding a white pill (home grammar)
  composer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: colors.surfaceMuted,
  },
  composerField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
  },
  composerHint: { flex: 1, fontFamily: fonts.regular, fontSize: 13.5, color: colors.inkMuted },
});
