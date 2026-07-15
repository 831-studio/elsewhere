// FloatingNav — the app's floating capsule navigation + the bottom content
// fade, shared by every top-level screen. Active tab renders filled (iOS
// convention); screens that aren't a nav destination pass no `active`.
//
// IA: Home (orient) · Search (find) · Trips (everything you're planning or
// have taken) · You. Saving is an action that lives on content, not a place —
// saved things land in trips and collections.

import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import HomeIcon from './HomeIcon';
import TripsIcon from './TripsIcon';
import { AVATARS } from '../data/trip';
import { colors, radius } from '../theme';

export type NavTab = 'home' | 'search' | 'trips' | 'profile';

export default function FloatingNav({
  active,
  fade = true,
  onHome,
  onSearch,
  onTrips,
  onProfile,
}: {
  active?: NavTab;
  /** Set false when imagery should run cleanly off the bottom of the screen. */
  fade?: boolean;
  onHome?: () => void;
  onSearch?: () => void;
  onTrips?: () => void;
  onProfile?: () => void;
}) {
  return (
    <>
      {fade && (
        <LinearGradient
          colors={['rgba(255,255,255,0)', colors.bg]}
          locations={[0, 0.5]}
          style={styles.fade}
          pointerEvents="none"
        />
      )}
      <View style={styles.nav}>
        <Pressable onPress={onHome} hitSlop={10}>
          <HomeIcon size={20} color={colors.ink} filled={active === 'home'} />
        </Pressable>
        <Pressable onPress={onSearch} hitSlop={10}>
          <Ionicons name={active === 'search' ? 'search' : 'search-outline'} size={20} color={colors.ink} />
        </Pressable>
        <Pressable onPress={onTrips} hitSlop={10}>
          <TripsIcon size={20} color={colors.ink} filled={active === 'trips'} />
        </Pressable>
        <Pressable onPress={onProfile} hitSlop={10}>
          {/* Active state: an ink ring around the avatar marks "you are here" */}
          <View style={[styles.avatarWrap, active === 'profile' && styles.avatarWrapActive]}>
            <Image source={{ uri: AVATARS.you }} style={styles.avatar} contentFit="cover" />
          </View>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Runs to the very bottom: solid white from the nav zone down, so content
  // scrolling beneath the pill dissolves instead of poking out around it.
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 180 },
  nav: {
    position: 'absolute',
    bottom: 26,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 24,
    height: 52,
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    shadowColor: '#111',
    shadowOpacity: 0.13,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  avatarWrap: { padding: 2, borderRadius: 14, borderWidth: 1.5, borderColor: 'transparent' },
  avatarWrapActive: { borderColor: colors.ink },
  avatar: { width: 22, height: 22, borderRadius: 11 },
});
