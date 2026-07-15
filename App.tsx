import { useState, type ReactElement } from 'react';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import {
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PhoneFrame from './components/PhoneFrame';
import Home from './screens/Home';
import Concierge from './screens/Concierge';
import CollectionDetail from './screens/CollectionDetail';
import GroupCanvas from './screens/GroupCanvas';
import TravelPassport from './screens/TravelPassport';
import InspirationFeed from './screens/InspirationFeed';
import { ApprovalCardExport } from './screens/slides/ApprovalCard';
import { SCREENS } from './screens/registry';
import { fonts } from './theme';

// Web-only: ?export=<key> renders a single slide artifact alone on a
// transparent page, for high-res element capture. Gated, harmless otherwise.
const EXPORT_KEY =
  typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('export') : null;
// Web-only: paint the page itself charcoal so nothing white leaks around the
// canvas. Skipped in export mode — captures need a transparent page background.
if (typeof document !== 'undefined' && !EXPORT_KEY) {
  document.body.style.backgroundColor = '#1A1A1A';
}

// Each screen inside the device on a transparent backdrop — floating-phone
// stills for the portfolio PDF, captured via #export-target.
const frame = (node: ReactElement) => (
  <PhoneFrame transparent nativeID="export-target">
    {node}
  </PhoneFrame>
);

const EXPORTS: Record<string, () => ReactElement> = {
  approval: () => <ApprovalCardExport />, // the reservation card, flat close-up
  home: () => frame(<Home />),
  concierge: () => frame(<Concierge />),
  collection: () => frame(<CollectionDetail />),
  group: () => frame(<GroupCanvas />),
  passport: () => frame(<TravelPassport />),
  feed: () => frame(<InspirationFeed />),
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
  });
  const [index, setIndex] = useState(0);
  const [booted, setBooted] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  if (EXPORT_KEY && EXPORTS[EXPORT_KEY]) {
    return <SafeAreaProvider>{EXPORTS[EXPORT_KEY]()}</SafeAreaProvider>;
  }

  const go = (i: number) => {
    setBooted(true);
    setIndex((i + SCREENS.length) % SCREENS.length);
  };
  const goTo = (key: string) => {
    const i = SCREENS.findIndex((s) => s.key === key);
    if (i >= 0) {
      setBooted(true);
      setIndex(i);
    }
  };
  const screen = SCREENS[index];

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        {screen.frameless ? (
          <View style={styles.frameless}>{screen.render({ goTo, booted })}</View>
        ) : (
          <PhoneFrame>{screen.render({ goTo, booted })}</PhoneFrame>
        )}

        {/* Dev switcher — presentation chrome, not part of the prototype */}
        <View style={styles.switcher} pointerEvents="box-none">
          <Pressable onPress={() => go(index - 1)} hitSlop={10}>
            <Feather name="chevron-left" size={14} color="#7C8888" />
          </Pressable>
          <Text style={styles.switcherLabel}>{screen.title}</Text>
          <Pressable onPress={() => go(index + 1)} hitSlop={10}>
            <Feather name="chevron-right" size={14} color="#7C8888" />
          </Pressable>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1A1A1A' }, // full charcoal working canvas — no seams around the frame
  frameless: { flex: 1 },
  switcher: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  switcherLabel: {
    fontFamily: fonts.medium,
    fontSize: 10,
    letterSpacing: 0.3,
    color: '#7C8888',
    minWidth: 64,
    textAlign: 'center',
  },
});
