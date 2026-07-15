// VS3 · Slip — the change slip: the proposal as a document, not a scene.
//
// Boarding-pass energy in the system's materials: one hairline slip (square,
// paper header) that reads like something the concierge just set on the
// table. Five traveler rows — old seat struck through in muted, new seat in
// settled medium tabular — then the money split, then the hold clock. The
// voice framing stays as a whisper at the top: "Listening" + the live line.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AVATARS } from '../../data/trip';
import { ConciergeHeader } from '../concierge/shared';
import { colors, fonts, radius } from '../../theme';

const TRAVELERS: { name: string; avatar?: string; initial?: string; from: string; to: string }[] = [
  { name: 'Maya', avatar: AVATARS.maya, from: '14C', to: '15A' },
  { name: 'You', avatar: AVATARS.you, from: '17A', to: '15B' },
  { name: 'Tomo', avatar: AVATARS.tomo, from: '18F', to: '15C' },
  { name: 'Rosa', initial: 'R', from: '22B', to: '16A' },
  { name: 'Dana', initial: 'D', from: '23E', to: '16B' },
];

export default function VS3Slip({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ConciergeHeader onBack={onBack} title="Seats · LA 2412" />

      {/* Voice stays a whisper — the live line, then the document */}
      <View style={styles.voiceZone}>
        <Text style={styles.listening}>Listening</Text>
        <Text style={styles.transcript}>“…closer together — nothing crazy expensive.”</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.slip}>
          <View style={styles.slipHeader}>
            <Text style={styles.flightLabel}>Flight</Text>
            <Text style={styles.flightValue}>LA 2412 · JFK→LIM · Oct 16</Text>
          </View>

          {TRAVELERS.map((t) => (
            <View key={t.name} style={styles.row}>
              {t.avatar ? (
                <Image source={{ uri: t.avatar }} style={styles.avatar} contentFit="cover" />
              ) : (
                <View style={[styles.avatar, styles.avatarBlank]}>
                  <Text style={styles.avatarInitial}>{t.initial}</Text>
                </View>
              )}
              <Text style={styles.name}>{t.name}</Text>
              <Text style={styles.oldSeat}>{t.from}</Text>
              <Text style={styles.arrow}>→</Text>
              <Text style={styles.newSeat}>{t.to}</Text>
            </View>
          ))}

          <View style={styles.deltaRow}>
            <Text style={styles.deltaLabel}>Difference</Text>
            <Text style={styles.deltaValue}>+$36 · split 5 ways · $7.20 each</Text>
          </View>
        </View>

        <Text style={styles.held}>Row 15 held for 8 more minutes — exit-row legroom</Text>
      </View>

      <View style={styles.dock}>
        <Pressable style={styles.approvePill}>
          <Text style={styles.approveText}>Approve for the group</Text>
        </Pressable>
        <Pressable hitSlop={8}>
          <Text style={styles.typeInstead}>Tap to type instead</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  voiceZone: { paddingHorizontal: 24, paddingTop: 26 },
  listening: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },
  transcript: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 23, color: colors.ink, marginTop: 6 },

  body: { flex: 1, paddingHorizontal: 24, paddingTop: 26 },
  slip: { borderWidth: 1, borderColor: colors.hairline, borderRadius: radius.square, overflow: 'hidden' },

  slipHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: colors.surfaceMuted,
  },
  flightLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  flightValue: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, fontVariant: ['tabular-nums'] },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    gap: 10,
  },
  avatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.hairline },
  avatarBlank: { alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { fontFamily: fonts.medium, fontSize: 10, color: colors.inkMuted },
  name: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.ink },
  oldSeat: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.inkMuted,
    textDecorationLine: 'line-through',
    fontVariant: ['tabular-nums'],
  },
  arrow: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted },
  newSeat: {
    width: 34,
    textAlign: 'right',
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },

  deltaRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  deltaLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 0.88,
    textTransform: 'uppercase',
    color: colors.inkMuted,
  },
  deltaValue: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink, fontVariant: ['tabular-nums'] },

  held: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 14 },

  dock: { alignItems: 'center', paddingBottom: 34, gap: 14 },
  approvePill: {
    height: 44,
    paddingHorizontal: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveText: { fontFamily: fonts.medium, fontSize: 14, color: colors.bg },
  typeInstead: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },
});
