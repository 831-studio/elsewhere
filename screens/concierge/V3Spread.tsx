// C3 · Spread — one destination at a time, as a full-bleed magazine spread.
//
// Lineage: editorial photo essays + story paging. Each candidate gets the
// whole screen: photography full-bleed, the concierge's case for it typeset
// on a scrim, provenance where it exists. Swipe sideways for the next spread;
// dots mark the shortlist. The composer floats alone — ask and the spreads
// change. Chat recedes to a whisper; the canvas IS the reply.

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, DESTINATIONS } from './shared';
import { colors, fonts } from '../../theme';

const CASES = [
  'Dry season in the Andes, 24° days, and Maya was just there — the sleeper pick for five.',
  'Warmest of the three, the shortest flight, and the best food block by block.',
  'Golden light, empty roads, wine country — the quiet option.',
];

export default function V3Spread({ onBack }: { onBack?: () => void }) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.pager}
        onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
        onMomentumScrollEnd={(e) => {
          if (size.w) setPage(Math.round(e.nativeEvent.contentOffset.x / size.w));
        }}
      >
        {DESTINATIONS.map((d, i) => (
          <View key={d.name} style={{ width: size.w || 1, height: size.h || 1 }}>
            <View style={styles.spread}>
              <Image source={{ uri: d.uri }} style={StyleSheet.absoluteFill} contentFit="cover" transition={260} />
              <LinearGradient
                colors={['rgba(17,17,17,0)', 'rgba(17,17,17,0.62)']}
                locations={[0.35, 1]}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
              <View style={styles.caption}>
                <Text style={styles.place}>{d.name}</Text>
                <Text style={styles.case}>{CASES[i]}</Text>
                <Text style={styles.meta}>
                  {d.meta}
                  {d.provenance ? `  ·  ${d.provenance.note}` : ''}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Shortlist dots */}
      <View style={styles.dots} pointerEvents="none">
        {DESTINATIONS.map((d, i) => (
          <View key={d.name} style={[styles.dot, i === page && styles.dotActive]} />
        ))}
      </View>

      <Composer floating hint="Steer me — type or talk" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  pager: { flex: 1, marginTop: 10 },
  spread: { flex: 1, overflow: 'hidden' },
  caption: { position: 'absolute', left: 20, right: 20, bottom: 118 },
  place: { fontFamily: fonts.medium, fontSize: 22, color: colors.bg },
  case: { fontFamily: fonts.regular, fontSize: 14.5, lineHeight: 21, color: 'rgba(255,255,255,0.92)', marginTop: 8 },
  meta: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.72)', marginTop: 10 },

  dots: {
    position: 'absolute',
    bottom: 96,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'rgba(255,255,255,0.45)' },
  dotActive: { backgroundColor: colors.bg },
});
