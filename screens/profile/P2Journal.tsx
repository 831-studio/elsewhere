// P2 · Journal — the contributor page. Profile as an editorial magazine bio:
// name and one-line bio set larger, collections as collaged board covers
// (Pinterest cover grammar), trips as quiet list rows, preferences demoted
// to a single drill-in row. Identity reads as authorship, not settings.

import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConciergeHeader } from './../concierge/shared';
import { AVATARS, img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const COLLECTIONS = [
  {
    title: 'Peru, together',
    count: '24 saves',
    main: img('photo-1501260928121-766a7feb7f8d'),
    cells: [img('photo-1543067361-9bf996edf6ff'), img('photo-1568729670692-0d2de9a3c027')],
  },
  {
    title: 'Someday',
    count: '9 saves',
    main: img('photo-1534094830444-3a1e21f7e3e7'),
    cells: [img('photo-1717813864181-6d879c978f2d'), img('photo-1599669846660-945c5c775181')],
  },
];

const TRIPS = [
  { name: 'Sacred Valley, Peru', dates: 'Oct 12–19, 2025' },
  { name: 'Oaxaca, Mexico', dates: 'Mar 3–9, 2025' },
  { name: 'Alentejo, Portugal', dates: 'Sep 14–21, 2024' },
];

export default function P2Journal({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <ConciergeHeader onBack={onBack} title="You" />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contributor bio */}
        <Image source={{ uri: AVATARS.you }} style={styles.avatar} contentFit="cover" />
        <Text style={styles.name}>Shavonne Hart</Text>
        <Text style={styles.bio}>Slow mornings, long lunches, museums at opening time.</Text>
        <Text style={styles.byline}>Chicago · traveling with Maya, James & Tomo</Text>

        {/* Collections as collaged covers */}
        <Text style={styles.sectionLabel}>COLLECTIONS</Text>
        <View style={styles.boards}>
          {COLLECTIONS.map((c) => (
            <Pressable key={c.title} style={styles.board}>
              <View style={styles.collage}>
                <Image source={{ uri: c.main }} style={styles.collageMain} contentFit="cover" transition={220} />
                <View style={styles.collageStack}>
                  {c.cells.map((uri, i) => (
                    <Image key={i} source={{ uri }} style={styles.collageCell} contentFit="cover" transition={220} />
                  ))}
                </View>
              </View>
              <Text style={styles.boardTitle}>{c.title}</Text>
              <Text style={styles.boardCount}>{c.count}</Text>
            </Pressable>
          ))}
        </View>

        {/* Past trips as quiet rows */}
        <Text style={styles.sectionLabel}>TRIPS</Text>
        {TRIPS.map((t, i) => (
          <Pressable key={t.name} style={[styles.row, i === 0 && styles.rowFirst]}>
            <Text style={styles.rowName}>{t.name}</Text>
            <Text style={styles.rowDates}>{t.dates}</Text>
          </Pressable>
        ))}

        {/* Preferences, demoted */}
        <Pressable style={styles.prefsRow}>
          <Text style={styles.rowName}>Travel preferences</Text>
          <View style={styles.prefsRight}>
            <Text style={styles.rowDates}>4 set</Text>
            <Feather name="chevron-right" size={16} color={colors.inkMuted} />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingTop: 28, paddingBottom: 48 },

  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.hairline, marginBottom: 16 },
  name: { fontFamily: fonts.semibold, fontSize: 26, lineHeight: 31, color: colors.ink, letterSpacing: -0.2 },
  bio: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.ink, marginTop: 6 },
  byline: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 8, marginBottom: 34 },

  sectionLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    color: colors.inkMuted,
    marginBottom: 12,
  },

  boards: { flexDirection: 'row', gap: 12, marginBottom: 34 },
  board: { flex: 1 },
  collage: { flexDirection: 'row', gap: 2, borderRadius: radius.square, overflow: 'hidden' },
  collageMain: { flex: 2, height: 110, backgroundColor: colors.hairline },
  collageStack: { flex: 1, gap: 2 },
  collageCell: { flex: 1, backgroundColor: colors.hairline },
  boardTitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink, marginTop: 8 },
  boardCount: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.inkMuted,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  rowFirst: { borderTopWidth: 1, borderTopColor: colors.hairline },
  rowName: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.ink },
  rowDates: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  prefsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  prefsRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
