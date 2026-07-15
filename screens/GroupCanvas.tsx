// Group trip canvas — the multiplayer layer. One shared space where the four of
// them settle the trip: decisions to approve or vote on (the concierge's holds
// included), and the money, split cleanly via Stripe. Trust faces everywhere —
// you always see who's in and who still owes. A group-chat composer docks below.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AVATARS } from '../data/trip';
import { colors, fonts, radius } from '../theme';

const GROUP = [AVATARS.you, AVATARS.priya, AVATARS.jules, AVATARS.nadia];

function Faces({ list, size = 22 }: { list: string[]; size?: number }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {list.map((a, i) => (
        <Image
          key={i}
          source={{ uri: a }}
          style={[styles.face, { width: size, height: size, borderRadius: size / 2, marginLeft: i ? -size * 0.34 : 0 }]}
          contentFit="cover"
        />
      ))}
    </View>
  );
}

export default function GroupCanvas({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={10}>
          <Feather name="chevron-left" size={22} color={colors.ink} />
        </Pressable>
        <View style={styles.headerCenter} pointerEvents="none">
          <Text style={styles.headerTitle}>Trip Canvas</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trip identity + who's going */}
        <Text style={styles.tripName}>Lima &amp; the Sacred Valley</Text>
        <View style={styles.tripMetaRow}>
          <Text style={styles.tripMeta}>Sep 18–26</Text>
          <Faces list={GROUP} size={24} />
          <Text style={styles.tripMeta}>4 going</Text>
        </View>

        {/* Hairline seam between the trip identity and the working canvas */}
        <View style={styles.titleDivider} />

        {/* Decisions */}
        <Text style={styles.sectionTitle}>Decisions</Text>

        {/* A hold from the concierge — approve */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={styles.iconSq}><Ionicons name="time-outline" size={15} color={colors.ink} /></View>
            <Text style={[styles.tagText, { flex: 1 }]}>Pending</Text>
            <Text style={styles.tally}>2 of 4 confirmed</Text>
          </View>
          <Text style={styles.cardTitle}>Dinner at Central, Lima</Text>
          <Text style={styles.cardMeta}>Thu, Sep 19 · 8:30 PM · tasting counter</Text>
          <View style={styles.cardDivider} />
          <View style={styles.cardFoot}>
            <Faces list={[AVATARS.you, AVATARS.priya]} size={22} />
            <View style={styles.confirmedRow}>
              <Feather name="check" size={14} color={colors.ink} />
              <Text style={styles.confirmedText}>You confirmed</Text>
            </View>
          </View>
        </View>

        {/* A vote between two options */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={styles.iconSq}><Feather name="bar-chart-2" size={15} color={colors.ink} /></View>
            <Text style={[styles.tagText, { flex: 1 }]}>Group vote</Text>
            <Text style={styles.tally}>1 vote left</Text>
          </View>
          <Text style={styles.cardTitle}>Where to stay in the valley</Text>
          <View style={styles.voteRow}>
            {/* Your vote — ink border + check mark it as yours */}
            <View style={[styles.voteOpt, styles.voteOptSelected]}>
              <View style={styles.voteNameRow}>
                <Text style={[styles.voteName, { flex: 1 }]}>Explora Valle Sagrado</Text>
                <Feather name="check" size={14} color={colors.ink} />
              </View>
              <View style={styles.voteFaces}><Faces list={[AVATARS.you, AVATARS.jules]} size={20} /><Text style={styles.voteCount}>2</Text></View>
            </View>
            <View style={styles.voteOpt}>
              <View style={styles.voteNameRow}>
                <Text style={[styles.voteName, { flex: 1 }]}>Sol y Luna</Text>
              </View>
              <View style={styles.voteFaces}><Faces list={[AVATARS.priya]} size={20} /><Text style={styles.voteCount}>1</Text></View>
            </View>
          </View>
        </View>

        {/* Proposed by a member */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Image source={{ uri: AVATARS.priya }} style={styles.byAvatar} contentFit="cover" />
            <Text style={[styles.tagText, { flex: 1 }]}>Priya proposed</Text>
            <Text style={styles.tally}>3 of 4 confirmed</Text>
          </View>
          <Text style={styles.cardTitle}>Machu Picchu · private sunrise guide</Text>
          <Text style={styles.cardMeta}>Sep 24 · +$180 pp</Text>
          <View style={styles.cardDivider} />
          <View style={styles.cardFoot}>
            <Faces list={[AVATARS.priya, AVATARS.jules, AVATARS.nadia]} size={22} />
            <Pressable style={styles.confirmBtn}><Text style={styles.confirmBtnText}>Confirm</Text></Pressable>
          </View>
        </View>

        {/* Estimated cost — decisions are still in motion, so no split or
            payment state yet; the split happens via Stripe at booking */}
        <Text style={styles.sectionTitle}>Estimated cost</Text>
        <View style={styles.splitCard}>
          <Text style={styles.splitTotal}>$23,200</Text>
          <Text style={styles.splitSub}>$5,800 pp · 4 travelers</Text>
          <View style={styles.cardDivider} />
          <Text style={styles.splitFootText}>Split evenly via Stripe at booking</Text>
        </View>
      </ScrollView>

      {/* Group chat composer */}
      <View style={styles.composer}>
        <View style={styles.composerField}>
          <Text style={styles.composerHint}>Message the group</Text>
          <Ionicons name="mic-outline" size={17} color={colors.ink} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  headerCenter: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  headerTitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },

  content: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 130 },

  tripName: { fontFamily: fonts.medium, fontSize: 16, letterSpacing: -0.2, color: colors.ink },
  tripMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  tripMeta: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted },
  titleDivider: { height: 1, backgroundColor: colors.hairline, marginTop: 20 },

  face: { borderWidth: 1.5, borderColor: colors.bg, backgroundColor: colors.hairline },

  sectionTitle: { fontFamily: fonts.regular, fontSize: 14, letterSpacing: -0.1, color: colors.ink, marginTop: 26, marginBottom: 10 },

  // Decision cards — softly elevated (premium grouping)
  card: {
    backgroundColor: colors.bg,
    borderRadius: radius.square,
    padding: 16,
    marginBottom: 14,
    shadowColor: 'rgba(17, 17, 17, 0.07)',
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  // Header zone — an icon in a light-gray square (or an avatar) anchors the
  // card, Marriott-style; the context label and tally stay quiet.
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  iconSq: {
    width: 30,
    height: 30,
    borderRadius: radius.square,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },
  byAvatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.hairline },
  cardDivider: { height: 1, backgroundColor: colors.hairline, marginTop: 14, marginBottom: 12 },
  tally: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  cardTitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  cardMeta: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, marginTop: 4 },
  cardFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  // A plain check = your done state; a filled pill = an action still to take
  confirmedRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  confirmedText: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },
  confirmBtn: {
    height: 34,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: { fontFamily: fonts.medium, fontSize: 13, color: colors.bg },

  // Vote — names reserve two lines so the faces rows align across options;
  // the user's own vote carries an ink border + check
  voteRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  voteOpt: { flex: 1, borderWidth: 1, borderColor: colors.hairline, borderRadius: radius.square, padding: 12 },
  voteOptSelected: { borderColor: colors.ink },
  voteNameRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  voteName: { fontFamily: fonts.medium, fontSize: 13.5, lineHeight: 18, minHeight: 36, color: colors.ink },
  voteFaces: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  voteCount: { fontFamily: fonts.medium, fontSize: 13, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  // Split
  splitCard: {
    backgroundColor: colors.bg,
    borderRadius: radius.square,
    padding: 18,
    shadowColor: 'rgba(17, 17, 17, 0.07)',
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  splitTotal: { fontFamily: fonts.medium, fontSize: 22, letterSpacing: -0.4, color: colors.ink, fontVariant: ['tabular-nums'] },
  splitSub: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, marginTop: 3 },
  splitFootText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },

  // Composer
  composer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: colors.surfaceMuted,
  },
  composerField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
  },
  composerHint: { flex: 1, fontFamily: fonts.regular, fontSize: 13.5, color: colors.inkMuted },
});
