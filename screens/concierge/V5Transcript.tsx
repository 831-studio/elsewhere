// C5 · Transcript — chat-first: the conversation's full rhythm, visible.
//
// Lineage: iMessage's effortless turn-taking + Claude/ChatGPT's de-bubbled
// replies. Multiple exchanges on screen; imagery embeds as inline horizontal
// strips inside the concierge's replies (never full-width heroes), so the
// transcript stays scannable and the back-and-forth is the point. This is
// the variant that most says "we talked it into existence."

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Composer, ConciergeHeader, DESTINATIONS, Narration, Steers, UserBlock, Voice } from './shared';
import { img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const PERU_REGIONS = [
  { name: 'Sacred Valley', meta: '24° · quiet', uri: img('photo-1501260928121-766a7feb7f8d') },
  { name: 'Cusco', meta: '22° · lively', uri: img('photo-1568729670692-0d2de9a3c027') },
  { name: 'Maras', meta: '24° · day trip', uri: img('photo-1717813864181-6d879c978f2d') },
];

function Strip({ items }: { items: { name: string; meta: string; uri: string }[] }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.stripScroll}
      contentContainerStyle={styles.strip}
    >
      {items.map((c) => (
        <View key={c.name} style={styles.stripCard}>
          <Image source={{ uri: c.uri }} style={styles.stripImage} contentFit="cover" transition={200} />
          <Text style={styles.stripName}>{c.name}</Text>
          <Text style={styles.stripMeta}>{c.meta}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default function V5Transcript({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Turn 1 */}
        <UserBlock />
        <Narration style={styles.narration} />
        <Voice style={styles.voice}>
          October’s a sweet spot. Three warm, group-easy places — Peru’s the sleeper.
        </Voice>
        <Strip items={DESTINATIONS.map((d) => ({ name: d.short, meta: d.weather, uri: d.uri }))} />

        {/* Turn 2 */}
        <UserBlock text="Peru — but which part?" style={styles.turn2} />
        <Narration text="Mapped 3 regions against your week" style={styles.narration} />
        <Voice style={styles.voice}>
          Base in the Sacred Valley, day-trip to Cusco — calmer nights, and Maya’s picks are all within reach.
        </Voice>
        <Strip items={PERU_REGIONS} />

        <Steers items={['Sounds right', 'More lively', 'What did Maya do?']} style={styles.steers} />
      </ScrollView>

      <Composer />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 140 },
  narration: { marginTop: 16 },
  voice: { marginTop: 10 },
  turn2: { marginTop: 26 },
  steers: { marginTop: 22 },

  stripScroll: { marginTop: 14, marginHorizontal: -16, flexGrow: 0 },
  strip: { paddingHorizontal: 16, gap: 10 },
  stripCard: { width: 124 },
  stripImage: { width: 124, height: 88, borderRadius: radius.square, backgroundColor: colors.hairline },
  stripName: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink, marginTop: 6 },
  stripMeta: { fontFamily: fonts.regular, fontSize: 11, color: colors.inkMuted, marginTop: 1 },
});
