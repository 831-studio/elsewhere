// Concierge — how to present a recommended place. Three models for the card the
// concierge returns, so we can align before committing:
//   A · Single hero   — one photo, the recommender's quote up front (current)
//   B · Pinterest strip — a titled row of stacked images, faces + count (preview
//        of a collection that opens on tap)
//   C · Collage cover  — Home's NEW COLLECTIONS language reused (1 big + 2 small)
// Same place (Amalfi), same luxury scenario, so only the model varies.

import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS, photo } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const PLACE = {
  name: 'Amalfi Coast, Italy',
  gallery: [photo('amalfi'), photo('dining'), photo('suite'), photo('table')],
  recs: [AVATARS.maya, AVATARS.tomo, AVATARS.james],
  recLine: 'Maya, Tomo + 1',
  count: '18 saved places',
  quote: 'The dinners on the water ruined me for anywhere else.',
  lead: { avatar: AVATARS.maya, name: 'Maya', rel: 'Friend · went for a wedding' },
  meta: 'Warm sea · late Sept · from $6,200pp',
};

function Faces({ list, size = 20 }: { list: string[]; size: number }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {list.map((a, i) => (
        <Image
          key={i}
          source={{ uri: a }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            marginLeft: i ? -size * 0.32 : 0,
            borderWidth: 1.5,
            borderColor: colors.bg,
            backgroundColor: colors.hairline,
          }}
          contentFit="cover"
        />
      ))}
    </View>
  );
}

// A — Single hero (current model)
function Hero() {
  return (
    <View style={styles.block}>
      <Image source={{ uri: PLACE.gallery[0] }} style={styles.heroImg} contentFit="cover" />
      <Text style={styles.name}>{PLACE.name}</Text>
      <View style={styles.recRow}>
        <Image source={{ uri: PLACE.lead.avatar }} style={styles.recAvatar} contentFit="cover" />
        <Text style={styles.recName}>{PLACE.lead.name}</Text>
        <Text style={styles.recRel} numberOfLines={1}>· {PLACE.lead.rel}</Text>
      </View>
      <Text style={styles.quote}>“{PLACE.quote}”</Text>
      <Text style={styles.meta}>{PLACE.meta}</Text>
    </View>
  );
}

// B — Pinterest strip (preview of a collection)
function Strip() {
  return (
    <View style={styles.block}>
      <View style={styles.stripHead}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{PLACE.name}</Text>
          <Text style={styles.stripSub}>Recommended by 3 people you trust</Text>
        </View>
        <View style={styles.openBtn}>
          <Feather name="arrow-right" size={16} color={colors.ink} />
        </View>
      </View>
      <View style={styles.stripRow}>
        {PLACE.gallery.map((u, i) => (
          <Image key={i} source={{ uri: u }} style={styles.stripCell} contentFit="cover" />
        ))}
      </View>
      <View style={styles.stripFoot}>
        <Faces list={PLACE.recs} size={20} />
        <Text style={styles.footText}>{PLACE.recLine} · {PLACE.count}</Text>
      </View>
    </View>
  );
}

// C — Collage cover (Home's NEW COLLECTIONS language)
function Collage() {
  return (
    <View style={styles.block}>
      <View style={styles.collage}>
        <Image source={{ uri: PLACE.gallery[0] }} style={styles.collMain} contentFit="cover" />
        <View style={styles.collSide}>
          <Image source={{ uri: PLACE.gallery[1] }} style={styles.collCell} contentFit="cover" />
          <Image source={{ uri: PLACE.gallery[2] }} style={styles.collCell} contentFit="cover" />
        </View>
      </View>
      <Text style={styles.name}>{PLACE.name}</Text>
      <View style={styles.recRow}>
        <Faces list={PLACE.recs} size={18} />
        <Text style={styles.footText}>{PLACE.recLine} · {PLACE.count}</Text>
      </View>
      <Text style={styles.quote}>“{PLACE.quote}”</Text>
    </View>
  );
}

export default function ConciergeRecStudies() {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.h}>Presenting a place — 3 models</Text>
        <Text style={styles.sub}>Same place, same luxury scenario · only the card model changes</Text>

        <Text style={styles.caption}>A — Single hero (current) · quote leads, one photo</Text>
        <Hero />

        <Text style={styles.caption}>B — Collection strip · stacked images, opens on tap</Text>
        <Strip />

        <Text style={styles.caption}>C — Collage cover · Home's NEW COLLECTIONS language</Text>
        <Collage />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 16, paddingTop: 40, paddingBottom: 60 },
  h: { fontFamily: fonts.semibold, fontSize: 17, color: colors.ink },
  sub: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 3 },
  caption: { fontFamily: fonts.medium, fontSize: 11, color: colors.inkMuted, marginTop: 30, marginBottom: 12 },

  block: {},
  name: { fontFamily: fonts.medium, fontSize: 16, color: colors.ink, marginTop: 11 },

  // shared rec bits
  recRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 8 },
  recAvatar: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.hairline },
  recName: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
  recRel: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, flexShrink: 1 },
  quote: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.ink, marginTop: 8 },
  meta: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 8 },
  footText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },

  // A hero
  heroImg: { width: '100%', height: 150, borderRadius: radius.square, backgroundColor: colors.hairline },

  // B strip
  stripHead: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  stripSub: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 3 },
  openBtn: {
    width: 34, height: 34, borderRadius: 17, marginTop: 8,
    backgroundColor: colors.surfaceMuted, alignItems: 'center', justifyContent: 'center',
  },
  stripRow: { flexDirection: 'row', gap: 4, marginTop: 12 },
  stripCell: { flex: 1, height: 92, borderRadius: radius.square, backgroundColor: colors.hairline },
  stripFoot: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 11 },

  // C collage
  collage: { flexDirection: 'row', gap: 4, height: 150 },
  collMain: { flex: 2, borderRadius: radius.square, backgroundColor: colors.hairline },
  collSide: { flex: 1, gap: 4 },
  collCell: { flex: 1, borderRadius: radius.square, backgroundColor: colors.hairline },
});
