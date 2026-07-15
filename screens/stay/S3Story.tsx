// S3 · Story — each stay gets its spread; the concierge closes on paper.
//
// Lineage: C3 Spread's editorial seduction, disciplined into a decision. The
// concierge makes each option's best case as a magazine spread — full-width
// image, name on a scrim, its argument typeset beneath — then steps out of
// the magazine onto its own paper (surfaceMuted) to give the verdict against
// what the group actually cares about. Advocacy first, judgment last.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Steers, UserBlock, Voice } from '../concierge/shared';
import { AVATARS, img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const SPREADS = [
  {
    name: 'Palacio Nazarenas',
    line: 'The case for polish · $212 pp/night',
    uri: img('photo-1568729670692-0d2de9a3c027'),
    caseText:
      'Beds turned down, breakfast appearing, a spa two floors away, and the plaza at the end of the block — nobody lifts a finger all week. The catch is the beds themselves: five means two of you sharing twins, and the quietest rooms face the courtyard, not away from it.',
    provenance: null as null | { avatar: string; note: string },
  },
  {
    name: 'Casa Killa',
    line: 'The case for a home · $126 pp/night',
    uri: img('photo-1543067361-9bf996edf6ff'),
    caseText:
      'Five real beds, a courtyard made for slow coffee, and a back bedroom quiet enough for Rosa — Dana can be up at six without waking a soul. It’s Tomo’s find, and at $86 a night less per person it buys the whole group its spa day with change.',
    provenance: { avatar: AVATARS.tomo, note: 'Tomo’s find' },
  },
];

export default function S3Story({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Cusco · Stay" />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <UserBlock text="Make the case for each — then tell us" />

        {SPREADS.map((s) => (
          <View key={s.name} style={styles.spread}>
            <View style={styles.imageWrap}>
              <Image source={{ uri: s.uri }} style={styles.image} contentFit="cover" transition={220} />
              <View style={styles.scrim}>
                <Text style={styles.spreadName}>{s.name}</Text>
                <Text style={styles.spreadLine}>{s.line}</Text>
              </View>
            </View>
            {s.provenance && (
              <View style={styles.provRow}>
                <Image source={{ uri: s.provenance.avatar }} style={styles.provAvatar} contentFit="cover" />
                <Text style={styles.provText}>{s.provenance.note}</Text>
              </View>
            )}
            <Voice style={styles.caseText}>{s.caseText}</Voice>
          </View>
        ))}

        {/* The verdict — the concierge steps onto its own paper */}
        <View style={styles.verdictCard}>
          <Text style={styles.verdictLabel}>Your concierge’s take</Text>
          <Voice style={styles.verdictText}>
            The casa. Rosa needs a quiet room and the back bedroom solves it; the mornings you keep talking
            about happen in that courtyard, not a restaurant. Book the Palacio’s spa as a day and you’ve kept
            the hotel’s one advantage.
          </Voice>
          <View style={styles.verdictDivider} />
          <Text style={styles.careLine}>
            What the five of you care about: real beds, Rosa’s quiet, shared mornings — the casa takes all three.
          </Text>
        </View>

        <Steers items={['The casa', 'The hotel', 'Ask the group']} style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  spread: { marginTop: 22 },
  imageWrap: { borderRadius: radius.square, overflow: 'hidden' },
  image: { width: '100%', height: 200, backgroundColor: colors.hairline },
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 22,
    paddingBottom: 12,
    backgroundColor: 'rgba(22, 18, 14, 0.42)',
  },
  spreadName: { fontFamily: fonts.semibold, fontSize: 16, color: colors.bg },
  spreadLine: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },
  provRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 9 },
  provAvatar: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.hairline },
  provText: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted },
  caseText: { marginTop: 10 },

  verdictCard: {
    marginTop: 26,
    padding: 16,
    borderRadius: radius.square,
    backgroundColor: colors.surfaceMuted,
  },
  verdictLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    textTransform: 'uppercase',
  },
  verdictText: { marginTop: 8 },
  verdictDivider: { height: 1, backgroundColor: colors.hairline, marginTop: 14, marginBottom: 12 },
  careLine: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 18, color: colors.inkMuted },

  steers: { marginTop: 18 },
});
