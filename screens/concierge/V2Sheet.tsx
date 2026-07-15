// C2 · Sheet — conversation as a paper sheet over a living canvas.
//
// Lineage: Kayak Ask AI's split attention (chat steers, results react), calmed.
// The destination canvas fills the screen — a two-column masonry that re-sorts
// as you talk. The conversation lives in a docked paper sheet: the concierge's
// last line, steering chips, and the composer. Chat never buries the imagery;
// the canvas never loses the thread.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, DESTINATIONS, Narration, Steers, UserBlock, sh } from './shared';
import { img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const CANVAS_LEFT = [
  { ...DESTINATIONS[0], h: 190 },
  { name: 'Cusco, Peru', meta: 'Dry season · 22°', uri: img('photo-1568729670692-0d2de9a3c027'), h: 140 },
  { name: 'Atacama, Chile', meta: 'Clear skies · 25°', uri: img('photo-1599669846660-945c5c775181'), h: 170 },
];
const CANVAS_RIGHT = [
  { ...DESTINATIONS[1], h: 150 },
  { ...DESTINATIONS[2], h: 190 },
  { name: 'Maras, Peru', meta: 'Dry season · 24°', uri: img('photo-1717813864181-6d879c978f2d'), h: 150 },
];

function CanvasTile({ t }: { t: { name: string; meta: string; uri: string; h: number } }) {
  return (
    <View style={styles.tileBlock}>
      <Image source={{ uri: t.uri }} style={[styles.tile, { height: t.h }]} contentFit="cover" transition={220} />
      <Text style={styles.tileName}>{t.name}</Text>
      <Text style={styles.tileMeta}>{t.meta}</Text>
    </View>
  );
}

export default function V2Sheet({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      {/* The canvas — what the conversation is acting on */}
      <ScrollView style={styles.body} contentContainerStyle={styles.canvas} showsVerticalScrollIndicator={false}>
        <UserBlock style={styles.ask} />
        <View style={styles.columns}>
          <View style={styles.column}>
            {CANVAS_LEFT.map((t) => (
              <CanvasTile key={t.name} t={t} />
            ))}
          </View>
          <View style={styles.column}>
            {CANVAS_RIGHT.map((t) => (
              <CanvasTile key={t.name} t={t} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* The conversation sheet — paper, docked, never buries the canvas */}
      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <Narration text="Re-sorted for October warmth · 6 candidates" />
        <Text style={styles.sheetVoice}>
          Peru’s pulling ahead — dry season, and Maya was just there. Keep steering me.
        </Text>
        <Steers style={styles.sheetSteers} />
        <View style={styles.sheetField}>
          <Text style={sh.composerHint}>Type or talk</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  canvas: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 320 },
  ask: { marginBottom: 16 },
  columns: { flexDirection: 'row', gap: 8 },
  column: { flex: 1 },
  tileBlock: { marginBottom: 14 },
  tile: { width: '100%', borderRadius: radius.square, backgroundColor: colors.hairline },
  tileName: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, marginTop: 6 },
  tileMeta: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, marginTop: 1 },

  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 34,
    backgroundColor: colors.surfaceMuted,
    borderTopLeftRadius: radius.square,
    borderTopRightRadius: radius.square,
  },
  grabber: {
    alignSelf: 'center',
    width: 32,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.hairline,
    marginTop: 8,
    marginBottom: 14,
  },
  sheetVoice: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22, color: colors.ink, marginTop: 10 },
  sheetSteers: { marginTop: 14 },
  sheetField: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    marginTop: 12,
  },
});
