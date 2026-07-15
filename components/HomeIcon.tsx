// HomeIcon — a minimal house silhouette (simple pentagon, no door or chimney).
// Stroked to match the weight of the Ionicons outline set used in the nav.

import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme';

export default function HomeIcon({
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
      <Path
        d="M12 3.5 20.5 10.5 20.5 20 3.5 20 3.5 10.5 Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}
