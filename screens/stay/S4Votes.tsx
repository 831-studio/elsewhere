// S4 · Votes — group consensus as a designed object.
//
// Lineage: the research digest's "reactions as approvals" + provisional
// opacity. Each stay is a card carrying the live group state: five avatar
// dots beneath it that develop from ghosted (0.4) to full ink as votes land.
// The tally reads like a scoreboard in tabular figures; the concierge stays
// neutral and only manages the process — nudge, decide, or wait.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration, Steers, Voice } from '../concierge/shared';
import { AVATARS, img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

type Person = { key: string; name: string; avatar?: string };

const FIVE: Person[] = [
  { key: 'you', name: 'You', avatar: AVATARS.you },
  { key: 'maya', name: 'Maya', avatar: AVATARS.maya },
  { key: 'tomo', name: 'Tomo', avatar: AVATARS.tomo },
  { key: 'rosa', name: 'Rosa' },
  { key: 'dana', name: 'Dana' },
];

const OPTIONS = [
  {
    name: 'Casa Killa',
    meta: 'Rental house · Tomo’s find · $126 pp/night · 5 beds · courtyard',
    uri: img('photo-1543067361-9bf996edf6ff'),
    votedFor: ['maya', 'tomo'],
  },
  {
    name: 'Palacio Nazarenas',
    meta: 'Hotel · $212 pp/night · spa · walkable · breakfast',
    uri: img('photo-1568729670692-0d2de9a3c027'),
    votedFor: ['you'],
  },
];

function VoteDot({ person, voted }: { person: Person; voted: boolean }) {
  return (
    <View style={[styles.dot, !voted && styles.dotGhost]}>
      {person.avatar ? (
        <Image source={{ uri: person.avatar }} style={styles.dotImage} contentFit="cover" />
      ) : (
        <View style={styles.dotInitialWrap}>
          <Text style={styles.dotInitial}>{person.name[0]}</Text>
        </View>
      )}
    </View>
  );
}

export default function S4Votes({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Cusco · Stay" />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Narration text="Sent both stays to the group last night" />

        {OPTIONS.map((o) => (
          <View key={o.name} style={styles.card}>
            <Image source={{ uri: o.uri }} style={styles.cardImage} contentFit="cover" transition={220} />
            <Text style={styles.cardName}>{o.name}</Text>
            <Text style={styles.cardMeta} numberOfLines={1}>
              {o.meta}
            </Text>
            <View style={styles.dotRow}>
              {FIVE.map((p) => (
                <VoteDot key={p.key} person={p} voted={o.votedFor.includes(p.key)} />
              ))}
              <Text style={styles.dotCount}>
                {o.votedFor.length} of 5
              </Text>
            </View>
          </View>
        ))}

        {/* The scoreboard */}
        <Text style={styles.tally}>Casa 2 · Hotel 1 · 2 open</Text>

        <Narration text="Rosa and Dana haven’t weighed in" style={styles.waiting} />

        {/* The concierge manages the process, not the outcome */}
        <Voice style={styles.voice}>
          Both are held through Friday, so there’s no rush — but the casa’s courtyard rooms tend to go first.
          I can nudge Rosa and Dana quietly, or call it from what I know of the five of you.
        </Voice>

        <Steers items={['Nudge them', 'Decide for us', 'Wait']} style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const DOT = 26;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  card: { marginTop: 22 },
  cardImage: { width: '100%', height: 130, borderRadius: radius.square, backgroundColor: colors.hairline },
  cardName: { fontFamily: fonts.medium, fontSize: 15, color: colors.ink, marginTop: 9 },
  cardMeta: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 3 },

  dotRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2, overflow: 'hidden' },
  dotGhost: { opacity: 0.4 },
  dotImage: { width: '100%', height: '100%', backgroundColor: colors.hairline },
  dotInitialWrap: {
    width: '100%',
    height: '100%',
    borderRadius: DOT / 2,
    borderWidth: 1,
    borderColor: colors.inkMuted,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInitial: { fontFamily: fonts.semibold, fontSize: 11, color: colors.ink },
  dotCount: {
    fontFamily: fonts.regular,
    fontSize: 11.5,
    color: colors.inkMuted,
    marginLeft: 4,
    fontVariant: ['tabular-nums'],
  },

  tally: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
    marginTop: 24,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  waiting: { marginTop: 10 },

  voice: { marginTop: 16 },
  steers: { marginTop: 18 },
});
