// Explore — the inspiration feed, one tap from home.
//
// A destination for wandering (not the landing surface): recommendations from
// friends and people you follow. Pure browsing — a back chevron, the wordmark,
// then the masonry leads. Tiles carry corner provenance cues (friend avatar /
// Elsewhere pick / collection) and a one-line place caption — no ratings, no
// counts, trust is faces.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import FloatingNav from '../components/FloatingNav';
import Wordmark from '../components/Wordmark';
import { AVATARS, img } from '../data/trip';
import { colors, fonts, radius } from '../theme';



type Cue =
  | { kind: 'pick' }
  | { kind: 'friend'; avatar: string }
  | { kind: 'stack' }
  | null;

type Tile = { uri: string; height: number; place: string; cue: Cue };

const LEFT: Tile[] = [
  { uri: img('photo-1522743791393-522312deeebf'), height: 210, place: 'Mexico City', cue: { kind: 'friend', avatar: AVATARS.james } },
  { uri: img('photo-1520529890308-f503006340b4'), height: 150, place: 'Lisbon', cue: { kind: 'pick' } },
  { uri: img('photo-1501260928121-766a7feb7f8d'), height: 180, place: 'Sacred Valley, Peru', cue: null },
  { uri: img('photo-1534094830444-3a1e21f7e3e7'), height: 120, place: 'Kyoto', cue: null },
];

const RIGHT: Tile[] = [
  { uri: img('photo-1717813864181-6d879c978f2d'), height: 160, place: 'Maras, Peru', cue: { kind: 'friend', avatar: AVATARS.maya } },
  { uri: img('photo-1543067361-9bf996edf6ff'), height: 200, place: 'Porto', cue: { kind: 'stack' } },
  { uri: img('photo-1568729670692-0d2de9a3c027'), height: 130, place: 'Cusco', cue: null },
  { uri: img('photo-1599669846660-945c5c775181'), height: 190, place: 'Atacama, Chile', cue: { kind: 'pick' } },
];

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

function FeedTile({ tile }: { tile: Tile }) {
  return (
    <Pressable style={styles.block}>
      <View style={[styles.tile, { height: tile.height }]}>
        <Image source={{ uri: tile.uri }} style={StyleSheet.absoluteFill} contentFit="cover" transition={220} />
        <CueBadge cue={tile.cue} />
      </View>
      <Text style={styles.place}>{tile.place}</Text>
    </Pressable>
  );
}

export default function Explore({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header — back to home, wordmark centered */}
      <View style={styles.header}>
        <View style={styles.navRow}>
          <View style={styles.brandCenter} pointerEvents="none">
            <Wordmark height={18} />
          </View>
          <Pressable onPress={onBack} hitSlop={10}>
            <Feather name="chevron-left" size={22} color={colors.ink} />
          </Pressable>
        </View>
      </View>

      {/* Feed */}
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        <View style={styles.columns}>
          <View style={styles.column}>
            {LEFT.map((t) => (
              <FeedTile key={t.uri} tile={t} />
            ))}
          </View>
          <View style={styles.column}>
            {RIGHT.map((t) => (
              <FeedTile key={t.uri} tile={t} />
            ))}
          </View>
        </View>
      </ScrollView>

      <FloatingNav onHome={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  // Header
  header: { paddingHorizontal: 16, paddingTop: 8 },
  navRow: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  brandCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  // Feed
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 150 },
  columns: { flexDirection: 'row', gap: 8 },
  column: { flex: 1 },
  block: { marginBottom: 16 },
  tile: {
    width: '100%',
    borderRadius: radius.square,
    overflow: 'hidden',
    backgroundColor: colors.hairline,
  },
  place: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted, marginTop: 6 },

  // Cues
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
