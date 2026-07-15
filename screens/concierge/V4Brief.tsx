// C4 · Brief — the conversation writes a document; the document is the star.
//
// Lineage: Claude Artifacts / ChatGPT Canvas. Instead of scrolling chat, the
// concierge maintains a living TRIP BRIEF — a pinned paper artifact holding
// everything decided so far (when, who, vibe) with a version tag. Replies
// edit the brief; the shortlist reads as compact document rows, not hero
// cards. Density over drama — for users who want the plan, not the feed.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, DESTINATIONS, Narration, Voice } from './shared';
import { colors, fonts, radius } from '../../theme';

const BRIEF = [
  { label: 'WHEN', value: 'October · one week' },
  { label: 'WHO', value: '5 travelers · the girls' },
  { label: 'VIBE', value: 'Warm · unhurried · group-easy' },
];

export default function V4Brief({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* The artifact — pinned, versioned, always current */}
        <View style={styles.brief}>
          <View style={styles.briefHead}>
            <Text style={styles.briefTitle}>TRIP BRIEF</Text>
            <Text style={styles.briefVersion}>v1 · just now</Text>
          </View>
          {BRIEF.map((row) => (
            <View key={row.label} style={styles.briefRow}>
              <Text style={styles.briefLabel}>{row.label}</Text>
              <Text style={styles.briefValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <Narration text="Brief started · 14 destinations compared" style={styles.narration} />
        <Voice style={styles.voice}>
          Here’s where we are. Three candidates fit the brief — react to any of them and I’ll revise.
        </Voice>

        {/* Shortlist as document rows */}
        <Text style={styles.listLabel}>SHORTLIST</Text>
        {DESTINATIONS.map((d) => (
          <Pressable key={d.name} style={styles.row}>
            <Image source={{ uri: d.uri }} style={styles.rowThumb} contentFit="cover" transition={200} />
            <View style={styles.rowText}>
              <Text style={styles.rowName}>{d.name}</Text>
              <Text style={styles.rowMeta}>
                {d.meta}
                {d.provenance ? `  ·  ${d.provenance.note}` : ''}
              </Text>
            </View>
            <Feather name="chevron-right" size={16} color={colors.inkMuted} />
          </Pressable>
        ))}
      </ScrollView>

      <Composer hint="Change anything — type or talk" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 140 },

  brief: {
    borderRadius: radius.square,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
  },
  briefHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  briefTitle: { fontFamily: fonts.semibold, fontSize: 11, letterSpacing: 0.88, color: colors.ink },
  briefVersion: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted },
  briefRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(33,28,23,0.06)',
  },
  briefLabel: { width: 64, fontFamily: fonts.semibold, fontSize: 10.5, letterSpacing: 0.8, color: colors.inkMuted },
  briefValue: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.ink },

  narration: { marginTop: 20 },
  voice: { marginTop: 10 },

  listLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginTop: 24,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  rowThumb: { width: 52, height: 52, borderRadius: radius.square, backgroundColor: colors.hairline },
  rowText: { flex: 1 },
  rowName: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.ink },
  rowMeta: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted, marginTop: 2 },
});
