// InspirationBoard — Elsewhere trip board (Inspiration tab)
//
// A caption-less image masonry in the spirit of a travel magazine. Attribution
// lives in quiet corner cues instead of name pills:
//   sparkle  → an Elsewhere pick
//   avatar   → a friend's recommendation
//   stack    → a saved collection
// All color, type, and geometry read from theme.ts.

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FloatingNav from '../components/FloatingNav';
import Wordmark from '../components/Wordmark';
import ItineraryView from './ItineraryView';
import PlanView from './PlanView';
import { AVATARS, img } from '../data/trip';
import { colors, fonts, radius } from '../theme';



type Cue =
  | { kind: 'pick' }
  | { kind: 'friend'; avatar: string }
  | { kind: 'stack' }
  | null;

type Tile = { uri: string; height: number; cue: Cue };

const LEFT: Tile[] = [
  { uri: img('photo-1520529890308-f503006340b4'), height: 200, cue: { kind: 'pick' } },
  { uri: img('photo-1568729670692-0d2de9a3c027'), height: 130, cue: null },
  { uri: img('photo-1522743791393-522312deeebf'), height: 168, cue: null },
  { uri: img('photo-1534094830444-3a1e21f7e3e7'), height: 108, cue: null },
];

const RIGHT: Tile[] = [
  { uri: img('photo-1717813864181-6d879c978f2d'), height: 150, cue: { kind: 'friend', avatar: AVATARS.maya } },
  { uri: img('photo-1543067361-9bf996edf6ff'), height: 190, cue: { kind: 'stack' } },
  { uri: img('photo-1501260928121-766a7feb7f8d'), height: 120, cue: null },
  { uri: img('photo-1599669846660-945c5c775181'), height: 180, cue: null },
];

// Section tabs. Inspiration = browse inspo → Plan = explore & build yourself →
// Itinerary = the group's locked-in details.
const TABS = [
  { key: 'inspiration', label: 'Inspiration' },
  { key: 'plan', label: 'Plan' },
  { key: 'itinerary', label: 'Itinerary' },
] as const;
type TabKey = (typeof TABS)[number]['key'];

// ── Pieces ───────────────────────────────────────────────────────────────────
function CueBadge({ cue }: { cue: Cue }) {
  if (!cue) return null;

  if (cue.kind === 'friend') {
    return <Image source={{ uri: cue.avatar }} style={styles.cueAvatar} contentFit="cover" />;
  }

  const isPick = cue.kind === 'pick';
  return (
    <View style={[styles.cueBadge, isPick ? styles.cueTopLeft : styles.cueTopRight]}>
      {isPick ? (
        <Ionicons name="sparkles" size={12} color={colors.ink} />
      ) : (
        <Feather name="layers" size={12} color={colors.ink} />
      )}
    </View>
  );
}

function ImageTile({ tile }: { tile: Tile }) {
  return (
    <Pressable style={[styles.tile, { height: tile.height }]}>
      <Image source={{ uri: tile.uri }} style={StyleSheet.absoluteFill} contentFit="cover" transition={220} />
      <CueBadge cue={tile.cue} />
    </Pressable>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function InspirationBoard({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [tab, setTab] = useState<TabKey>('inspiration');

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        {/* Brand row — wordmark alone */}
        <View style={styles.brandRow}>
          <Wordmark height={18} />
        </View>

        {/* Context row — trip switcher, then section tabs, all left-aligned */}
        <View style={styles.contextRow}>
          <Pressable style={styles.tripSelector} hitSlop={8}>
            <Text style={styles.tripName}>Peru</Text>
            <Feather name="chevron-down" size={16} color={colors.inkMuted} />
          </Pressable>

          <View style={styles.tabs}>
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <Pressable key={t.key} style={styles.tabItem} hitSlop={6} onPress={() => setTab(t.key)}>
                  <Text style={active ? styles.tabActive : styles.tab}>{t.label}</Text>
                  {active && <View style={styles.tabUnderline} />}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* Body */}
      {tab === 'inspiration' && (
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.columns}>
            <View style={styles.column}>
              {LEFT.map((t) => (
                <ImageTile key={t.uri} tile={t} />
              ))}
            </View>
            <View style={styles.column}>
              {RIGHT.map((t) => (
                <ImageTile key={t.uri} tile={t} />
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {tab === 'plan' && <PlanView />}
      {tab === 'itinerary' && <ItineraryView />}

      {/* A trip hub lives under the Trips destination */}
      <FloatingNav active="trips" onHome={onNavigateHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // Header — wordmark brand row + a context row (trip switcher · tabs)
  header: { paddingHorizontal: 16, paddingTop: 8 },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 18,
  },
  tripSelector: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  tripName: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },

  // Tabs — quiet section nav; active marked by tone + a short underline
  tabs: { flexDirection: 'row', gap: 16 },
  tabItem: { position: 'relative' },
  tab: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted },
  tabActive: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
  tabUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -6,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.ink,
  },

  // Body
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 150 },
  columns: { flexDirection: 'row', gap: 8 },
  column: { flex: 1, gap: 8 },

  // Tiles
  tile: {
    width: '100%',
    borderRadius: radius.square,
    overflow: 'hidden',
    backgroundColor: colors.hairline,
  },
  cueBadge: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cueTopLeft: { top: 8, left: 8 },
  cueTopRight: { top: 8, right: 8 },
  cueAvatar: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.bg,
    backgroundColor: colors.hairline,
  },

});
