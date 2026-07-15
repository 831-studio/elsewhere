// F3 · PickFirst — the recommendation.
//
// Lineage: the concierge as a well-traveled friend, not a search engine. One
// hero card carries the whole answer: the signature route line at full size,
// big tabular times, and three short reasons that cite the group and the
// profile. Alternatives exist — collapsed to quiet one-liners, because the
// concierge already did the comparing. Weight and order express confidence.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration, Voice } from '../concierge/shared';
import { img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const WHY = ['Fits Rosa’s late arrival', 'Aisle pair held, per your profile', 'Best cash-per-hour of the four'];

const ALTERNATIVES = [
  { times: '10:15 → 17:50', meta: 'Avianca 245 · 1 stop BOG', price: '$498' },
  { times: '21:30 → 05:12+1', meta: 'Delta 347 · red-eye', price: '$565' },
  { times: '13:25 → 22:48', meta: 'Copa 471 · 1 stop PTY', price: '$534' },
];

/** Signature route line, full size: codes at the ends, duration centered above. */
function RouteLine() {
  return (
    <View>
      <Text style={styles.routeDuration}>7h 55m</Text>
      <View style={styles.routeRow}>
        <Text style={styles.routeCode}>JFK</Text>
        <View style={styles.routeDot} />
        <View style={styles.routeTrack} />
        <View style={styles.routeDot} />
        <Text style={styles.routeCode}>LIM</Text>
      </View>
      <View style={styles.timesRow}>
        <Text style={styles.time}>08:40</Text>
        <Text style={styles.time}>14:05</Text>
      </View>
    </View>
  );
}

export default function F3PickFirst({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Flights · Peru" />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Narration text="Searched 41 fares · held the best 4" />

        <Voice style={styles.voice}>One clear winner for the five of you. The other three are below.</Voice>

        {/* The pick — one card, the whole answer */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Image
              source={{ uri: img('photo-1501260928121-766a7feb7f8d') }}
              style={styles.thumb}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.cardTopText}>
              <Text style={styles.cardTitle}>New York → Lima</Text>
              <Text style={styles.cardMeta}>Thu, Oct 16 · 5 travelers</Text>
            </View>
          </View>

          <RouteLine />

          <Text style={styles.fare}>LATAM 2412 · nonstop · $612 per seat</Text>

          <View style={styles.whyBlock}>
            {WHY.map((w) => (
              <View key={w} style={styles.whyRow}>
                <Feather name="check" size={12} color={colors.inkMuted} />
                <Text style={styles.whyText}>{w}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.hold}>
          <Text style={styles.holdText}>Hold all five seats</Text>
        </Pressable>

        {/* The also-rans, folded away */}
        <Text style={styles.altLabel}>Three alternatives</Text>
        {ALTERNATIVES.map((a) => (
          <View key={a.times} style={styles.altRow}>
            <Text style={styles.altTimes}>{a.times}</Text>
            <Text style={styles.altMeta} numberOfLines={1}>
              {a.meta}
            </Text>
            <Text style={styles.altPrice}>{a.price}</Text>
          </View>
        ))}
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  voice: { marginTop: 12 },

  card: {
    marginTop: 22,
    padding: 16,
    borderRadius: radius.square,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  thumb: { width: 44, height: 44, borderRadius: radius.square, backgroundColor: colors.hairline },
  cardTopText: { flex: 1 },
  cardTitle: { fontFamily: fonts.medium, fontSize: 15, color: colors.ink },
  cardMeta: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.inkMuted,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },

  routeDuration: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: 6,
    fontVariant: ['tabular-nums'],
  },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  routeCode: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
    letterSpacing: 0.5,
    fontVariant: ['tabular-nums'],
  },
  routeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.ink },
  routeTrack: { flex: 1, height: 1, backgroundColor: colors.ink },
  timesRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  time: { fontFamily: fonts.medium, fontSize: 16, color: colors.ink, fontVariant: ['tabular-nums'] },

  fare: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    marginTop: 14,
    fontVariant: ['tabular-nums'],
  },

  whyBlock: { marginTop: 16, borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 14, gap: 9 },
  whyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  whyText: { fontFamily: fonts.regular, fontSize: 13, color: colors.ink },

  hold: {
    height: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  holdText: { fontFamily: fonts.medium, fontSize: 14, color: colors.bg },

  altLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginTop: 30,
    marginBottom: 4,
  },
  altRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  altTimes: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  altMeta: { flex: 1, fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted },
  altPrice: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
});
