// I1 · Issue — the itinerary as a magazine issue.
//
// Lineage: Claude Artifacts (the agent's output as a document, not messages)
// crossed with the travel magazine. The draft arrives as an issue: a
// full-bleed cover, then one spread per day — image, typeset prose, a quiet
// tabular meta line. No list rows; the plan is written, not itemized. The
// conversation stays reachable through the docked composer: talk, and the
// issue re-typesets.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader } from '../concierge/shared';
import { img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const DAYS = [
  {
    label: 'DAY ONE',
    kicker: 'Cusco, gently',
    uri: img('photo-1568729670692-0d2de9a3c027'),
    plan: [
      'You land mid-morning and go slow — the altitude asks for it. Check in at Palacio Nazarenas, coca tea in the courtyard, a first unhurried wander through San Blas.',
      'Dinner is Cicciolina, up a creaky staircase off the plaza. The table for five is already held.',
    ],
    meta: 'LIM → CUZ 10:05 · check-in 15:00 · Cicciolina 19:30',
  },
  {
    label: 'DAY TWO',
    kicker: 'The Sacred Valley',
    uri: img('photo-1717813864181-6d879c978f2d'),
    plan: [
      'A private van takes the five of you down into the valley while the light is still soft. The salt terraces at Maras are the centerpiece — Maya’s pick from last October, best before noon.',
      'Lunch in Urubamba under the trees, then back over the pass by dusk.',
    ],
    meta: 'Depart 08:00 · Maras 11:30 · back by 18:00 · Maya, Oct ’24',
  },
  {
    label: 'DAY THREE',
    kicker: 'Machu Picchu',
    uri: img('photo-1522743791393-522312deeebf'),
    plan: [
      'The Vistadome leaves early — a glass roof and the Urubamba running beside the tracks. You walk into the citadel on Circuit 2 ahead of the midday crowds, guide waiting at the gate.',
      'The evening train brings you back tired in the best way.',
    ],
    meta: 'Vistadome 06:40 · entry 10:00–11:00 · return 19:30',
  },
];

export default function I1Issue({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* The cover */}
        <View style={styles.cover}>
          <Image source={{ uri: img('photo-1501260928121-766a7feb7f8d') }} style={StyleSheet.absoluteFill} contentFit="cover" transition={220} />
          <LinearGradient
            colors={['rgba(17,17,17,0.42)', 'rgba(17,17,17,0)', 'rgba(17,17,17,0.66)']}
            locations={[0, 0.32, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <View style={styles.coverCaption}>
            <Text style={styles.coverTitle}>Peru</Text>
            <Text style={styles.coverMeta}>Oct 16–23 · five travelers · draft 1</Text>
          </View>
        </View>

        {/* The spreads */}
        {DAYS.map((day) => (
          <View key={day.label} style={styles.spread}>
            <Text style={styles.dayLabel}>{day.label}</Text>
            <Text style={styles.kicker}>{day.kicker}</Text>
            <Image source={{ uri: day.uri }} style={styles.dayImage} contentFit="cover" transition={220} />
            {day.plan.map((p) => (
              <Text key={p.slice(0, 24)} style={styles.plan}>
                {p}
              </Text>
            ))}
            <Text style={styles.dayMeta}>{day.meta}</Text>
          </View>
        ))}

        <Text style={styles.colophon}>Drafted from 6 saves and Maya’s trip — tell me what to change.</Text>
      </ScrollView>

      {/* Header floats over the cover */}
      <View style={styles.headerWrap}>
        <ConciergeHeader onBack={onBack} title="Peru · Draft" light />
      </View>

      <Composer hint="Change anything — type or talk" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  headerWrap: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4 },

  scroll: { flex: 1 },
  content: { paddingBottom: 140 },

  // Cover
  cover: { height: 396, justifyContent: 'flex-end', backgroundColor: colors.hairline },
  coverCaption: { paddingHorizontal: 20, paddingBottom: 24 },
  coverTitle: { fontFamily: fonts.medium, fontSize: 24, color: colors.bg },
  coverMeta: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.78)',
    marginTop: 6,
    fontVariant: ['tabular-nums'],
  },

  // Spreads
  spread: { paddingHorizontal: 20, marginTop: 36 },
  dayLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  kicker: { fontFamily: fonts.medium, fontSize: 16, color: colors.ink, marginTop: 6, marginBottom: 12 },
  dayImage: { width: '100%', height: 190, borderRadius: radius.square, backgroundColor: colors.hairline, marginBottom: 14 },
  plan: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: colors.ink, marginBottom: 10 },
  dayMeta: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },

  colophon: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    paddingHorizontal: 20,
    marginTop: 34,
  },
});
