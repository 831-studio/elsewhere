// C6 · Board — chat and canvas as two named surfaces you flip between.
//
// Lineage: ChatGPT Canvas / Claude Artifacts made mobile-native as tabs.
// Chat stays pure conversation — but everything visual the concierge
// mentions accrues to a Board (a growing moodboard of the trip). A quiet
// inline receipt in chat ("Added to your board") stitches the two together.
// For people who want to talk first and look later.

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, DESTINATIONS, Narration, Steers, UserBlock, Voice } from './shared';
import { img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const BOARD = [
  { ...DESTINATIONS[0], h: 180 },
  { ...DESTINATIONS[1], h: 140 },
  { ...DESTINATIONS[2], h: 150 },
  { name: 'Maras, Peru', meta: 'Day trip · salt terraces', uri: img('photo-1717813864181-6d879c978f2d'), h: 170 },
];

export default function V6Board({ onBack }: { onBack?: () => void }) {
  const [tab, setTab] = useState<'chat' | 'board'>('chat');

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      {/* Two surfaces, named */}
      <View style={styles.tabs}>
        {(['chat', 'board'] as const).map((t) => {
          const active = tab === t;
          return (
            <Pressable key={t} style={styles.tabItem} hitSlop={6} onPress={() => setTab(t)}>
              <Text style={active ? styles.tabActive : styles.tab}>{t === 'chat' ? 'Chat' : 'Board'}</Text>
              {active && <View style={styles.tabUnderline} />}
            </Pressable>
          );
        })}
      </View>

      {tab === 'chat' ? (
        <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <UserBlock />
          <Narration style={styles.narration} />
          <Voice style={styles.voice}>
            October’s a sweet spot. I put three candidates on your board — Peru’s the sleeper: dry season, and Maya
            was just there.
          </Voice>

          {/* The receipt that stitches chat to board */}
          <Pressable style={styles.receipt} onPress={() => setTab('board')}>
            <Feather name="layers" size={14} color={colors.ink} />
            <Text style={styles.receiptText}>Added to your board — Sacred Valley, Oaxaca, Alentejo</Text>
            <Feather name="chevron-right" size={14} color={colors.inkMuted} />
          </Pressable>

          <Steers style={styles.steers} />
        </ScrollView>
      ) : (
        <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.columns}>
            <View style={styles.column}>
              {BOARD.filter((_, i) => i % 2 === 0).map((t) => (
                <View key={t.name} style={styles.tileBlock}>
                  <Image source={{ uri: t.uri }} style={[styles.tile, { height: t.h }]} contentFit="cover" transition={220} />
                  <Text style={styles.tileName}>{t.name}</Text>
                  <Text style={styles.tileMeta}>{t.meta}</Text>
                </View>
              ))}
            </View>
            <View style={styles.column}>
              {BOARD.filter((_, i) => i % 2 === 1).map((t) => (
                <View key={t.name} style={styles.tileBlock}>
                  <Image source={{ uri: t.uri }} style={[styles.tile, { height: t.h }]} contentFit="cover" transition={220} />
                  <Text style={styles.tileName}>{t.name}</Text>
                  <Text style={styles.tileMeta}>{t.meta}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      <Composer hint={tab === 'chat' ? 'Type or talk' : 'React to the board — type or talk'} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  tabs: { flexDirection: 'row', justifyContent: 'center', gap: 22, marginTop: 16 },
  tabItem: { position: 'relative', paddingBottom: 6 },
  tab: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted },
  tabActive: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
  tabUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.ink,
  },

  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 140 },
  narration: { marginTop: 16 },
  voice: { marginTop: 10 },
  steers: { marginTop: 20 },

  receipt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radius.square,
    backgroundColor: colors.surfaceMuted,
  },
  receiptText: { flex: 1, fontFamily: fonts.regular, fontSize: 12.5, color: colors.ink },

  columns: { flexDirection: 'row', gap: 8 },
  column: { flex: 1 },
  tileBlock: { marginBottom: 14 },
  tile: { width: '100%', borderRadius: radius.square, backgroundColor: colors.hairline },
  tileName: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, marginTop: 6 },
  tileMeta: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, marginTop: 1 },
});
