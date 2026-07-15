// Slide artifact — the concierge approval card, close-up.
//
// Photo-led like Resy, clean and white like a Flighty/airline card — no gray
// header, no wordmark clutter. A small alert chip carries the news; Central is
// the hero; the reservation sits in its own container with the swap designed
// inside it. Group state + one Approve close it.
//
// Renders frameless on a flat review canvas; the export is the card alone.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { AVATARS } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

const CARD_W = 460;

export function TheCard({ flat = false }: { flat?: boolean }) {
  return (
    <View style={[styles.card, flat && styles.cardFlat]}>
      {/* Venue photography — Central is the hero */}
      <Image source={require('../../assets/central_new_res_seafood.png')} style={styles.photo} contentFit="cover" />

      <View style={styles.body}>
        {/* The alert — a clean chip, not a banner */}
        <View style={styles.alert}>
          <Feather name="bell" size={13} color={colors.ink} />
          <Text style={styles.alertText}>New Reservation Available</Text>
        </View>

        {/* Venue identity */}
        <Text style={styles.venue}>Central</Text>
        <Text style={styles.venueMeta}>Tasting counter · Barranco, Lima</Text>

        {/* Reservation — its own container, swap designed inside */}
        <View style={styles.reservation}>
          <View style={styles.resRow}>
            <Text style={styles.resWhen}>Thu, Sep 19 · 8:30 PM</Text>
            <Text style={styles.resGuests}>4 Guests</Text>
          </View>
          <View style={styles.resDivider} />
          <View style={styles.resRow}>
            <View style={styles.resReplaces}>
              <View style={styles.replacesGlyph}>
                <Ionicons name="swap-horizontal" size={13} color={colors.inkMuted} />
              </View>
              <Text style={styles.replacesText}>
                Replaces{' '}
                <Text style={styles.replacesStruck}>Mérito · Thu 8:00 PM</Text>
              </Text>
            </View>
            <Text style={styles.resReleased}>Release</Text>
          </View>
        </View>

        {/* The group + the action */}
        <View style={styles.footer}>
          <View style={styles.groupSide}>
            <View style={styles.cluster}>
              {/* The travelers on this trip — ghosted = hasn't responded yet */}
              <Image source={{ uri: AVATARS.you }} style={styles.avatar} contentFit="cover" />
              <Image source={{ uri: AVATARS.priya }} style={[styles.avatar, styles.stacked]} contentFit="cover" />
              <Image source={{ uri: AVATARS.jules }} style={[styles.avatar, styles.stacked, styles.ghost]} contentFit="cover" />
            </View>
            <Text style={styles.tally}>2 of 4 confirmed</Text>
          </View>
          <View style={styles.actions}>
            <Pressable style={styles.decline} hitSlop={6}>
              <Text style={styles.declineText}>Modify</Text>
            </Pressable>
            <Pressable style={styles.approve}>
              <Text style={styles.approveText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function ApprovalCard() {
  // The card is composed at 460 for the slide close-up; on narrow review
  // viewports, scale it proportionally so the composition never reflows.
  const { width } = useWindowDimensions();
  const scale = Math.min(1, (width - 48) / CARD_W);
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.center}>
        <View style={{ width: CARD_W, transform: [{ scale }] }}>
          <TheCard />
        </View>
      </View>
    </View>
  );
}

// Export view — transparent background, flat card (no shadow), padded so the
// element screenshot has clean edges. Reached via ?export=approval for capture.
export function ApprovalCardExport() {
  return (
    <View style={styles.exportRoot}>
      <View collapsable={false} nativeID="export-target" style={styles.exportPad}>
        <TheCard flat />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Flat neutral canvas — review context only, not part of the artifact
  root: { flex: 1, backgroundColor: '#E7E6E3' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },

  card: {
    width: CARD_W,
    maxWidth: '100%',
    backgroundColor: colors.bg,
    borderRadius: radius.square,
    overflow: 'hidden',
    shadowColor: '#111',
    shadowOpacity: 0.12,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  cardFlat: { shadowOpacity: 0, elevation: 0 },
  exportRoot: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' },
  exportPad: { padding: 2 },

  photo: { width: '100%', height: 188, backgroundColor: colors.hairline },
  body: { paddingHorizontal: 24, paddingTop: 22, paddingBottom: 22 },

  // Alert chip
  // Heavier ink stroke — presence through definition, not fill, so it never
  // competes with the filled Approve button
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    alignSelf: 'flex-start',
    height: 32,
    paddingLeft: 13,
    paddingRight: 15,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },
  alertText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink },

  // Venue identity
  // 22 on the 460 canvas ≈ a 16pt content title at app scale — on-ladder
  venue: { fontFamily: fonts.medium, fontSize: 22, letterSpacing: -0.2, color: colors.ink, marginTop: 16 },
  venueMeta: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, marginTop: 4 },

  // Reservation container
  reservation: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.square,
    overflow: 'hidden',
  },
  resRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  resWhen: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  resGuests: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted },
  resDivider: { height: 1, backgroundColor: colors.hairline },
  resReplaces: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  resReleased: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted, marginLeft: 12 },
  replacesGlyph: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replacesText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },
  replacesStruck: { textDecorationLine: 'line-through' },

  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
  groupSide: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
  cluster: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.bg,
    backgroundColor: colors.hairline,
  },
  stacked: { marginLeft: -6 },
  ghost: { opacity: 0.35 },
  tally: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, fontVariant: ['tabular-nums'] },

  actions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 12 },
  // Equal-width pair — outlined secondary, filled primary
  decline: {
    width: 104,
    height: 40,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineText: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  approve: {
    width: 104,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveText: { fontFamily: fonts.medium, fontSize: 14, color: colors.bg },
});
