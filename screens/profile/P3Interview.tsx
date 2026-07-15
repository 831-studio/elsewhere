// P3 · Interview — preferences captured in conversation. The concierge asks
// one question at a time on its paper surface; answered questions collapse
// into stamp rows, the live one offers big tappable pills. Progress is felt
// through the accumulating stack — never a bar. (Duolingo/Spotify onboarding
// grammar, in the concierge's voice.)

import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConciergeHeader, Voice } from './../concierge/shared';
import { colors, fonts, radius } from '../../theme';

const ANSWERED = [
  { q: 'Window or aisle?', a: 'Window, always' },
  { q: 'Early flights?', a: 'Only if they save the day' },
  { q: 'Dietary needs in the group?', a: 'Vegetarian-friendly' },
];

const LIVE = {
  q: 'How adventurous is dinner?',
  options: ['Street food, always', 'Book somewhere nice', 'Depends who’s coming'],
};

export default function P3Interview({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <ConciergeHeader onBack={onBack} title="You" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Why the concierge is asking */}
        <Voice style={styles.voice}>
          A few questions, whenever you feel like it. The more I know, the less you plan.
        </Voice>

        <Text style={styles.sectionLabel}>SO FAR</Text>

        {/* Answered — collapsed stamp rows on paper */}
        <View style={styles.stack}>
          {ANSWERED.map((item) => (
            <View key={item.q} style={styles.stampRow}>
              <Feather name="check" size={13} color={colors.inkMuted} />
              <Text style={styles.stampQ}>{item.q}</Text>
              <Text style={styles.stampA}>{item.a}</Text>
            </View>
          ))}

          {/* The live question */}
          <View style={styles.live}>
            <Text style={styles.liveQ}>{LIVE.q}</Text>
            <View style={styles.options}>
              {LIVE.options.map((o) => (
                <Pressable key={o} style={styles.option}>
                  <Text style={styles.optionText}>{o}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.skip}>Skip this one</Text>
          </View>
        </View>

        <Text style={styles.footnote}>Answer in any order — I remember everything, and you can change any of it later.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 48 },

  voice: { marginBottom: 28 },

  sectionLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginBottom: 12,
  },

  stack: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.square,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 20,
  },
  stampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  stampQ: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, flex: 1 },
  stampA: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },

  live: { paddingTop: 20 },
  liveQ: { fontFamily: fonts.semibold, fontSize: 18, lineHeight: 24, color: colors.ink },
  options: { gap: 8, marginTop: 14 },
  option: {
    height: 44,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  optionText: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  skip: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 14 },

  footnote: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.inkMuted,
    marginTop: 16,
  },
});
