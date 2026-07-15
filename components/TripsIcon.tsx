// TripsIcon — a minimal suitcase, drawn in the same 1.6px-stroke language as
// HomeIcon. Fills when active (iOS convention), like the house.

import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme';

export default function TripsIcon({
  size = 20,
  color = colors.ink,
  filled = false,
}: {
  size?: number;
  color?: string;
  filled?: boolean;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Handle */}
      <Path
        d="M9.5 8 V6.4 A1.6 1.6 0 0 1 11.1 4.8 H12.9 A1.6 1.6 0 0 1 14.5 6.4 V8"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Body */}
      <Path
        d="M6.5 8 H17.5 A2 2 0 0 1 19.5 10 V17.5 A2 2 0 0 1 17.5 19.5 H6.5 A2 2 0 0 1 4.5 17.5 V10 A2 2 0 0 1 6.5 8 Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}
