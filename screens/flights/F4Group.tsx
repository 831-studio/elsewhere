// F4 · Group — five seats, one fare.
//
// Lineage: the multiplayer thesis (plan principle 3: consent is visual) worn
// by the flights screen. The flight recedes to a section label; the people
// lead. Each traveler gets a row — preference honored, seat in tabular
// figures — and approval renders as avatars developing from ghosted to full
// ink as confirmations land. One fare line settles the money story.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration, Steers, Voice } from '../concierge/shared';
import { AVATARS } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

type Traveler = { name: string; pref: string; seat: string; avatar?: string; confirmed?: boolean };

const TRAVELERS: Traveler[] = [
  { name: 'Maya', pref: 'Window, sleeps early', seat: '14A · window', avatar: AVATARS.maya, confirmed: true },
  { name: 'James', pref: 'Aisle', seat: '14C · aisle', avatar: AVATARS.james },
  { name: 'You', pref: 'Aisle, per your profile', seat: '14D · aisle', avatar: AVATARS.you, confirmed: true },
  { name: 'Tomo', pref: 'Window', seat: '14F · window', avatar: AVATARS.tomo },
  { name: 'Rosa', pref: 'No red-eyes · aisle', seat: '15C · aisle' },
];

function Face({ t, size, ghosted }: { t: Traveler; size: number; ghosted?: boolean }) {
  const round = { width: size, height: size, borderRadius: size / 2 };
  if (t.avatar)
    return (
      <Image source={{ uri: t.avatar }} style={[styles.face, round, ghosted && styles.ghost]} contentFit="cover" />
    );
  return (
    <View style={[styles.face, styles.initial, round, ghosted && styles.ghost]}>
      <Text style={styles.initialText}>{t.name[0]}</Text>
    </View>
  );
}

export default function F4Group({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Flights · Peru" />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Narration text="Held 5 seats on LATAM 2412 · rows 14–15" />

        <Text style={styles.legLabel}>LATAM 2412 · JFK → LIM · OCT 16</Text>

        {TRAVELERS.map((t) => (
          <View key={t.name} style={styles.travelerRow}>
            <Face t={t} size={24} />
            <View style={styles.travelerText}>
              <Text style={styles.travelerName}>{t.name}</Text>
              <Text style={styles.travelerPref}>{t.pref}</Text>
            </View>
            <Text style={styles.seat}>{t.seat}</Text>
          </View>
        ))}

        {/* The money, settled in one line */}
        <View style={styles.fareRow}>
          <Text style={styles.fareLabel}>Fare</Text>
          <Text style={styles.fare}>$612 × 5 · $3,060 · splits via the trip</Text>
        </View>

        {/* Approvals — consent rendered as development */}
        <View style={styles.approvals}>
          <View style={styles.faces}>
            {TRAVELERS.map((t, i) => (
              <View key={t.name} style={[styles.faceWrap, i > 0 && styles.faceOverlap]}>
                <Face t={t} size={26} ghosted={!t.confirmed} />
              </View>
            ))}
          </View>
          <Text style={styles.approvalNote}>3 haven’t confirmed</Text>
        </View>

        <Voice style={styles.voice}>
          Everyone’s seated to their preferences — Rosa’s aisle opened up this morning. Once the other three
          confirm, I’ll book and split it.
        </Voice>

        <Steers items={['Nudge the others', 'Swap my seat']} style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  legLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    fontVariant: ['tabular-nums'],
    marginTop: 24,
    marginBottom: 4,
  },

  travelerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  face: { backgroundColor: colors.hairline },
  initial: { alignItems: 'center', justifyContent: 'center' },
  initialText: { fontFamily: fonts.semibold, fontSize: 10.5, color: colors.inkMuted },
  ghost: { opacity: 0.4 },
  travelerText: { flex: 1 },
  travelerName: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  travelerPref: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted, marginTop: 2 },
  seat: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.ink, fontVariant: ['tabular-nums'] },

  fareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  fareLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  fare: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.ink, fontVariant: ['tabular-nums'] },

  approvals: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 20 },
  faces: { flexDirection: 'row' },
  faceWrap: {
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.bg,
    backgroundColor: colors.bg,
  },
  faceOverlap: { marginLeft: -8 },
  approvalNote: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  voice: { marginTop: 22 },
  steers: { marginTop: 18 },
});
