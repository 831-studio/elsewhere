// P4 · Trust — the autonomy dial. Agent permissions as plain-language
// sentences with a single state word, grouped like a quiet settings page.
// At the bottom, the relationship moves: the concierge earns trust and
// proposes its own promotion on paper. Nobody in travel has designed this.

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConciergeHeader } from './../concierge/shared';
import { colors, fonts, radius } from '../../theme';

type Rule = { text: string; state: 'On' | 'Ask first' };

const GROUPS: { label: string; rules: Rule[] }[] = [
  {
    label: 'BOOKINGS',
    rules: [
      { text: 'Book anything under $50 without asking', state: 'On' },
      { text: 'Hold free, cancellable reservations', state: 'On' },
      { text: 'Book flights or hotels', state: 'Ask first' },
    ],
  },
  {
    label: 'CHANGES',
    rules: [
      { text: 'Shift dinner times to fit the day', state: 'On' },
      { text: 'Change flights, ever', state: 'Ask first' },
      { text: 'Cancel anything nonrefundable', state: 'Ask first' },
    ],
  },
  {
    label: 'SPENDING',
    rules: [
      { text: 'Use my Amex for approved bookings', state: 'On' },
      { text: 'Transfer points between programs', state: 'Ask first' },
    ],
  },
];

export default function P4Trust({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <ConciergeHeader onBack={onBack} title="You" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>What your concierge may do on its own. Change any of these, any time.</Text>

        {GROUPS.map((g) => (
          <View key={g.label} style={styles.group}>
            <Text style={styles.sectionLabel}>{g.label}</Text>
            {g.rules.map((r, i) => (
              <Pressable key={r.text} style={[styles.rule, i === 0 && styles.ruleFirst]}>
                <Text style={styles.ruleText}>{r.text}</Text>
                <Text style={[styles.ruleState, r.state === 'Ask first' && styles.ruleStateMuted]}>{r.state}</Text>
              </Pressable>
            ))}
          </View>
        ))}

        {/* Earned trust — the concierge proposes its own promotion */}
        <View style={styles.proposal}>
          <Text style={styles.proposalText}>
            I’ve gotten 3 bookings right — want me to handle sub-$100 activities myself?
          </Text>
          <View style={styles.proposalActions}>
            <Pressable style={styles.allow}>
              <Text style={styles.allowText}>Allow</Text>
            </Pressable>
            <Pressable hitSlop={8}>
              <Text style={styles.keepAsking}>Keep asking</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 48 },

  intro: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: colors.ink, marginBottom: 30 },

  group: { marginBottom: 30 },
  sectionLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginBottom: 4,
  },
  rule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  ruleFirst: { borderTopWidth: 0 },
  ruleText: { flex: 1, fontFamily: fonts.regular, fontSize: 14.5, lineHeight: 20, color: colors.ink },
  ruleState: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, fontVariant: ['tabular-nums'] },
  ruleStateMuted: { color: colors.inkMuted },

  proposal: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.square,
    padding: 16,
    marginTop: 4,
  },
  proposalText: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: colors.ink },
  proposalActions: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 14 },
  allow: {
    height: 36,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allowText: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.bg },
  keepAsking: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.inkMuted },
});
