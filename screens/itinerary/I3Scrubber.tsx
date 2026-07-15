// I3 · Scrubber — the draft as a versioned document you flip through.
//
// Lineage: Claude Artifacts / ChatGPT Canvas — the agent's output is a
// persistent, versioned artifact the conversation edits. Versions read as
// pages: v1 · v2 · v3 chips at the top (v3 live), one plain-language change
// note, and a "changed" hairline tag on the lines that moved. The document
// animates between drafts; the chat never re-litigates them.

import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, Narration } from '../concierge/shared';
import { colors, fonts, radius } from '../../theme';

const VERSIONS = ['v1', 'v2', 'v3'];

type Item = { time: string; title: string; meta: string; changed?: boolean };
type Day = { label: string; items: Item[] };

const DAYS: Day[] = [
  {
    label: 'Fri · Oct 16 — Cusco',
    items: [
      { time: '10:05', title: 'Land in Cusco · LA 2023', meta: 'LIM → CUZ · 1h 25m' },
      { time: '15:00', title: 'Check in — Palacio Nazarenas', meta: 'San Blas · 3 nights' },
      { time: '19:30', title: 'Dinner at Cicciolina', meta: 'Table for five · held' },
    ],
  },
  {
    label: 'Sat · Oct 17 — Sacred Valley',
    items: [
      { time: '08:00', title: 'Into the Sacred Valley', meta: 'Private van · door to door' },
      { time: '11:30', title: 'Maras salt terraces', meta: 'Maya, Oct ’24 · late-morning light', changed: true },
      { time: '14:00', title: 'Lunch in Urubamba', meta: 'Garden tables · moved up 30 min', changed: true },
    ],
  },
  {
    label: 'Sun · Oct 18 — Machu Picchu',
    items: [
      { time: '06:40', title: 'Vistadome to Aguas Calientes', meta: 'PeruRail · glass roof · car C' },
      { time: '10:00', title: 'Machu Picchu · Circuit 2', meta: 'Entry 10:00–11:00' },
    ],
  },
];

export default function I3Scrubber({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Peru · Draft" />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* The scrubber — drafts as pages */}
        <View style={styles.versions}>
          {VERSIONS.map((v, i) => {
            const active = i === VERSIONS.length - 1;
            return (
              <Pressable key={v} style={[styles.versionChip, active && styles.versionChipActive]}>
                <Text style={[styles.versionText, active && styles.versionTextActive]}>{v}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.changeNote}>v3 — swapped the museum for Maras, per Maya</Text>

        <Narration text="Rechecked day 2 after the swap — lunch shifts, everything else holds" style={styles.narration} />

        {/* The document at v3 */}
        {DAYS.map((day) => (
          <View key={day.label}>
            <Text style={styles.dayLabel}>{day.label.toUpperCase()}</Text>
            {day.items.map((item) => (
              <View key={item.title} style={styles.item}>
                <Text style={styles.time}>{item.time}</Text>
                <View style={styles.itemBody}>
                  <View style={styles.titleRow}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.changed && (
                      <View style={styles.changedTag}>
                        <Text style={styles.changedText}>changed</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.itemMeta}>{item.meta}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Composer hint="Change anything — type or talk" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },

  // Scrubber
  versions: { flexDirection: 'row', gap: 8 },
  versionChip: {
    height: 30,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  versionChipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  versionText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  versionTextActive: { color: colors.bg },
  changeNote: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 12 },

  narration: { marginTop: 20 },

  // Document
  dayLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginTop: 26,
    marginBottom: 4,
  },
  item: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 11 },
  time: {
    width: 48,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    marginTop: 1,
    fontVariant: ['tabular-nums'],
  },
  itemBody: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemTitle: { fontFamily: fonts.medium, fontSize: 15, color: colors.ink, flexShrink: 1 },
  changedTag: {
    height: 18,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changedText: { fontFamily: fonts.medium, fontSize: 10, color: colors.inkMuted },
  itemMeta: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.inkMuted,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },
});
