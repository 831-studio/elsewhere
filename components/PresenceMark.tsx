// PresenceMark — the agent's single point of presence, everywhere it appears.
//
// One small accent-blue dot expresses agent state:
//   idle      — still
//   listening — soft breathing (slow scale pulse)
//   working   — the dot flattens and stretches into a moving hairline
//   speaking  — gentle vertical amplitude
// Appears wherever the agent is present, always the same mark. Keep it small
// and peripheral — never an orb takeover.

import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { colors } from '../theme';

export type PresenceState = 'idle' | 'listening' | 'working' | 'speaking';

const CYCLE_MS: Record<Exclude<PresenceState, 'idle'>, number> = {
  listening: 900,
  working: 550,
  speaking: 360,
};

export default function PresenceMark({
  state = 'idle',
  size = 10,
  color = colors.accent,
}: {
  state?: PresenceState;
  size?: number;
  color?: string;
}) {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    t.stopAnimation();
    t.setValue(0);
    if (state === 'idle') return;

    const dur = CYCLE_MS[state];
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(t, { toValue: 1, duration: dur, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(t, { toValue: 0, duration: dur, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [state, t]);

  const between = (a: number, b: number) => t.interpolate({ inputRange: [0, 1], outputRange: [a, b] });

  const transform =
    state === 'listening'
      ? [{ scale: between(1, 1.22) }]
      : state === 'working'
        ? [{ scaleX: between(1, 2.9) }, { scaleY: between(1, 0.45) }]
        : state === 'speaking'
          ? [{ scaleY: between(1, 1.65) }]
          : [];

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: state === 'working' ? between(1, 0.8) : 1,
        transform,
      }}
    />
  );
}
