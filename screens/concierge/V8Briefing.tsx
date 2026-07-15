// C8 · Briefing — the reply as a structured, sectioned answer.
//
// Lineage: Perplexity's answer-first structure, translated from citations-
// and-web to sections-and-people. The concierge responds like a well-typeset
// briefing: a one-line read, a ranked shortlist with tabular figures, what's
// worth knowing, and who the intelligence came from (faces, not footnotes).
// Minimal imagery — thumbnails, not heroes. For the information-first user.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, DESTINATIONS, Steers, UserBlock } from './shared';
import { AVATARS } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const NOTES = [
  'Peru needs 2 days of altitude ease-in — plan slow starts.',
  'Oaxaca is Día de Muertos season — book stays now, not later.',
];

export default function V8Briefing({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <UserBlock />

        <Text style={styles.section}>OCTOBER, BRIEFLY</Text>
        <Text style={styles.lede}>Warm nearly everywhere that matters — the trick is picking your kind of warm.</Text>

        <Text style={styles.section}>THE SHORTLIST</Text>
        {DESTINATIONS.map((d, i) => (
          <View key={d.name} style={styles.row}>
            <Text style={styles.rank}>{i + 1}</Text>
            <Image source={{ uri: d.uri }} style={styles.thumb} contentFit="cover" transition={200} />
            <View style={styles.rowText}>
              <Text style={styles.rowName}>{d.name}</Text>
              <Text style={styles.rowMeta}>{d.weather}</Text>
            </View>
            <View style={styles.figures}>
              <Text style={styles.figure}>{d.flight}</Text>
              <Text style={styles.figureMuted}>{d.price} pp</Text>
            </View>
          </View>
        ))}

        <Text style={styles.section}>WORTH KNOWING</Text>
        {NOTES.map((n) => (
          <View key={n} style={styles.note}>
            <View style={styles.noteDash} />
            <Text style={styles.noteText}>{n}</Text>
          </View>
        ))}

        {/* Sources are people */}
        <View style={styles.sources}>
          <View style={styles.sourceAvatars}>
            <Image source={{ uri: AVATARS.maya }} style={styles.sourceAvatar} contentFit="cover" />
            <Image source={{ uri: AVATARS.tomo }} style={[styles.sourceAvatar, styles.stacked]} contentFit="cover" />
          </View>
          <Text style={styles.sourcesText}>Drawing on Maya’s trip and 2 collections you follow</Text>
        </View>

        <Steers style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  section: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginTop: 24,
    marginBottom: 8,
  },
  lede: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22, color: colors.ink },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  rank: { width: 14, fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  thumb: { width: 44, height: 44, borderRadius: radius.square, backgroundColor: colors.hairline },
  rowText: { flex: 1 },
  rowName: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  rowMeta: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted, marginTop: 2 },
  figures: { alignItems: 'flex-end' },
  figure: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink, fontVariant: ['tabular-nums'] },
  figureMuted: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, marginTop: 2, fontVariant: ['tabular-nums'] },

  note: { flexDirection: 'row', gap: 10, marginBottom: 8, alignItems: 'flex-start' },
  noteDash: { width: 10, height: 1, backgroundColor: colors.ink, marginTop: 9 },
  noteText: { flex: 1, fontFamily: fonts.regular, fontSize: 13.5, lineHeight: 19, color: colors.ink },

  sources: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 },
  sourceAvatars: { flexDirection: 'row' },
  sourceAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.bg,
    backgroundColor: colors.hairline,
  },
  stacked: { marginLeft: -6 },
  sourcesText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted },

  steers: { marginTop: 22 },
});
