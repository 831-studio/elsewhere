// Shared primitives for the concierge conversation studies (C1–C10).
//
// Every variant explores a different chat × canvas balance, but all speak the
// same language: de-bubbled concierge voice, quiet hairline user blocks,
// narration instead of spinners, paper = the concierge's material, pills =
// instruments, 4px squares = content. These pieces keep the studies honest.

import type { ReactNode } from 'react';
import { Image } from 'expo-image';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';

import { AVATARS, img } from '../../data/trip';
import { colors, fonts, radius } from '../../theme';

// ── Fixture: the opening exchange ────────────────────────────────────────────
export type Destination = {
  name: string;
  short: string;
  meta: string;
  uri: string;
  weather: string;
  flight: string;
  price: string;
  provenance?: { avatar: string; note: string };
};

export const DESTINATIONS: Destination[] = [
  {
    name: 'Sacred Valley, Peru',
    short: 'Peru',
    meta: 'Dry season · 24° days · from $640',
    weather: 'Dry season · 24°',
    flight: '9h 40m',
    price: '$640',
    uri: img('photo-1501260928121-766a7feb7f8d'),
    provenance: { avatar: AVATARS.maya, note: 'Maya, Oct ’24' },
  },
  {
    name: 'Oaxaca, Mexico',
    short: 'Oaxaca',
    meta: 'Warm & dry · 27° days · from $410',
    weather: 'Warm & dry · 27°',
    flight: '5h 10m',
    price: '$410',
    uri: img('photo-1522743791393-522312deeebf'),
  },
  {
    name: 'Alentejo, Portugal',
    short: 'Alentejo',
    meta: 'Golden autumn · 23° days · from $520',
    weather: 'Golden autumn · 23°',
    flight: '7h 30m',
    price: '$520',
    uri: img('photo-1520529890308-f503006340b4'),
  },
];

export const STEERS = ['More remote', 'Under 6h flight', 'Surprise me'];
export const USER_ASK = 'Somewhere warm in October — a week with the girls';
export const NARRATION = 'Compared 14 destinations for October';
export const VOICE_SHORT =
  'October’s a sweet spot. Three that are warm and group-easy — Peru especially: dry season, and Maya was just there.';

// ── Chrome ───────────────────────────────────────────────────────────────────
export function ConciergeHeader({
  onBack,
  title = 'Concierge',
  light = false,
}: {
  onBack?: () => void;
  title?: string;
  light?: boolean;
}) {
  return (
    <View style={sh.header}>
      <View style={sh.titleCenter} pointerEvents="none">
        <Text style={[sh.title, light && { color: colors.bg }]}>{title}</Text>
      </View>
      <Pressable onPress={onBack} hitSlop={10}>
        <Feather name="chevron-left" size={22} color={light ? colors.bg : colors.ink} />
      </Pressable>
    </View>
  );
}

export function UserBlock({ text = USER_ASK, style }: { text?: string; style?: object }) {
  return (
    <View style={[sh.userBlock, style]}>
      <Text style={sh.userText}>{text}</Text>
    </View>
  );
}

export function Narration({ text = NARRATION, style }: { text?: string; style?: object }) {
  return (
    <View style={[sh.narration, style]}>
      <Feather name="check" size={12} color={colors.inkMuted} />
      <Text style={sh.narrationText}>{text}</Text>
    </View>
  );
}

export function Voice({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[sh.voice, style]}>{children}</Text>;
}

export function Steers({ items = STEERS, style }: { items?: string[]; style?: object }) {
  return (
    <View style={[sh.steerRow, style]}>
      {items.map((s) => (
        <Pressable key={s} style={sh.steer}>
          <Text style={sh.steerText}>{s}</Text>
        </Pressable>
      ))}
    </View>
  );
}

/** The docked composer — home's concierge-card grammar (paper strip, white pill). */
export function Composer({ hint = 'Type or talk', floating = false }: { hint?: string; floating?: boolean }) {
  return (
    <View style={[sh.composer, floating && sh.composerFloating]}>
      <View style={[sh.composerField, floating && sh.composerFieldShadow]}>
        <Text style={sh.composerHint}>{hint}</Text>
        <Ionicons name="mic-outline" size={17} color={colors.ink} />
      </View>
    </View>
  );
}

/** Under-image caption: name · provenance · meta. */
export function Caption({ d, nameSize = 15 }: { d: Destination; nameSize?: number }) {
  return (
    <>
      <View style={sh.capRow}>
        <Text style={[sh.capName, { fontSize: nameSize }]}>{d.name}</Text>
        {d.provenance && (
          <View style={sh.prov}>
            <Image source={{ uri: d.provenance.avatar }} style={sh.provAvatar} contentFit="cover" />
            <Text style={sh.provText}>{d.provenance.note}</Text>
          </View>
        )}
      </View>
      <Text style={sh.capMeta}>{d.meta}</Text>
    </>
  );
}

export const sh = StyleSheet.create({
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginTop: 8,
    paddingHorizontal: 16,
    zIndex: 4,
  },
  titleCenter: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  title: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },

  userBlock: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.square,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  userText: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.ink },

  narration: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  narrationText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted },

  voice: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23, color: colors.ink },

  steerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  steer: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  steerText: { fontFamily: fonts.medium, fontSize: 13, color: colors.ink },

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
  composerFloating: { backgroundColor: 'transparent', paddingTop: 0 },
  composerField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
  },
  composerFieldShadow: {
    shadowColor: '#111',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  composerHint: { flex: 1, fontFamily: fonts.regular, fontSize: 13.5, color: colors.inkMuted },

  capRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 },
  capName: { fontFamily: fonts.medium, color: colors.ink },
  prov: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  provAvatar: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.hairline },
  provText: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.inkMuted },
  capMeta: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 3 },
});
