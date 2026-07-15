// Splash — the brand's first breath.
//
// The wordmark is a script signature, so the launch moment is it being
// *signed*: a left-to-right write-on reveal (a white wipe sliding off the
// letterforms), ~900ms, no new elements, no color, no loop. With an onFinish
// handler the scene then dissolves and hands off to the app (total brand time
// < 2.5s). Without one (dev switcher), it plays once and holds — ideal for
// capture. Tap to replay.

import { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

import Wordmark from '../components/Wordmark';
import { colors } from '../theme';

const WORDMARK_H = 26;
const WORDMARK_W = WORDMARK_H * (193.2 / 35.26); // logotype aspect ratio

export default function Splash({ onFinish }: { onFinish?: () => void }) {
  const reveal = useRef(new Animated.Value(0)).current; // write-on wipe
  const scene = useRef(new Animated.Value(1)).current; // dissolve out

  const play = useCallback(() => {
    reveal.setValue(0);
    scene.setValue(1);

    const steps = [
      Animated.delay(250),
      Animated.timing(reveal, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
    ];
    if (onFinish) {
      steps.push(
        Animated.delay(900),
        Animated.timing(scene, { toValue: 0, duration: 300, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      );
    }
    Animated.sequence(steps).start(({ finished }) => {
      if (finished) onFinish?.();
    });
  }, [reveal, scene, onFinish]);

  useEffect(() => {
    play();
  }, [play]);

  return (
    <Pressable style={styles.root} onPress={play}>
      <Animated.View style={{ opacity: scene }}>
        <View style={styles.mask}>
          <Wordmark height={WORDMARK_H} />
          {/* The wipe: a white cover that slides right, "writing" the signature */}
          <Animated.View
            style={[
              styles.wipe,
              {
                transform: [
                  {
                    translateX: reveal.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, WORDMARK_W + 8],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mask: {
    width: WORDMARK_W,
    height: WORDMARK_H,
    overflow: 'hidden',
  },
  wipe: {
    position: 'absolute',
    top: -2,
    bottom: -2,
    left: -4,
    width: WORDMARK_W + 8,
    backgroundColor: colors.bg,
  },
});
