// PhoneFrame — device mockup shell for presenting screens in the portfolio.
//
// Renders a to-scale iPhone (15/16 Pro proportions) centered on a canvas, with
// a clean sealed top (no camera cutout), status bar (9:41 · signal/wifi/
// battery), and home indicator. Screens render as children inside the "screen"
// area. All chrome scales with the rendered phone width so proportions hold at
// any size.
//
// The top is deliberately closed — a plain rounded-rect silhouette, no notch —
// so the frame reads as a distraction-free card in portfolio stills. The drop
// shadow lives on a hidden sibling "caster" inset below the top, so no shadow
// or edge line ever crosses the top edge of the frame.

import type { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors, fonts } from '../theme';

// Reference iPhone 15/16 Pro logical points — everything below is expressed
// against this width, then scaled by (rendered width / REF_W).
const REF_W = 393;
const REF_H = 852;
const RATIO = REF_W / REF_H;
const BACKDROP = '#1A1A1A'; // charcoal working canvas

// Chrome dimensions at REF_W, from real device proportions.
const CHROME = {
  cornerRadius: 53,
  statusBarH: 54,
  statusPad: 30, // side inset for time / glyph cluster on a notchless bar
  timeSize: 15,
  iconGap: 7, // Apple spaces the status glyphs ~7pt apart
  homeW: 139,
  homeH: 5,
  homeBottom: 9,
};

// ── iOS status glyphs, drawn to Apple's specs ────────────────────────────────
// Four ascending rounded signal bars · three-arc Wi-Fi · battery pill (35%
// outline, solid fill, terminal nub). Vector, so they stay crisp in stills.

function SignalGlyph({ h, color }: { h: number; color: string }) {
  return (
    <Svg width={(h * 17) / 12} height={h} viewBox="0 0 17 12">
      <Rect x="0" y="8" width="3" height="4" rx="1" fill={color} />
      <Rect x="4.66" y="5.5" width="3" height="6.5" rx="1" fill={color} />
      <Rect x="9.33" y="3" width="3" height="9" rx="1" fill={color} />
      <Rect x="14" y="0.5" width="3" height="11.5" rx="1" fill={color} />
    </Svg>
  );
}

function WifiGlyph({ h, color }: { h: number; color: string }) {
  return (
    <Svg width={(h * 17) / 12} height={h} viewBox="0 0 17 12">
      <Path
        d="M1.4 4.6 A 10.2 10.2 0 0 1 15.6 4.6"
        stroke={color}
        strokeWidth={2.1}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M4.2 7.5 A 6.3 6.3 0 0 1 12.8 7.5"
        stroke={color}
        strokeWidth={2.1}
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx="8.5" cy="10.4" r="1.6" fill={color} />
    </Svg>
  );
}

function BatteryGlyph({ h, color }: { h: number; color: string }) {
  return (
    <Svg width={(h * 28) / 13} height={h} viewBox="0 0 28 13">
      <Rect x="0.5" y="0.5" width="24" height="12" rx="4" stroke={color} strokeOpacity={0.35} fill="none" />
      <Path d="M26 4.2 C27.2 4.6 27.7 5.4 27.7 6.5 C27.7 7.6 27.2 8.4 26 8.8 Z" fill={color} fillOpacity={0.4} />
      <Rect x="2.5" y="2.5" width="13" height="8" rx="2.2" fill={color} />
    </Svg>
  );
}

export default function PhoneFrame({
  children,
  transparent = false,
  nativeID,
}: {
  children: ReactNode;
  /** Export mode — transparent backdrop so the device can be captured floating. */
  transparent?: boolean;
  /** DOM id placed on the device box, so a capture tool can screenshot just the phone. */
  nativeID?: string;
}) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const padH = 20;
  const padTop = Math.max(insets.top, 20);
  const padBottom = Math.max(insets.bottom, 20);
  const availW = width - padH * 2;
  const availH = height - padTop - padBottom;

  // Largest phone that fits, keeping the aspect ratio.
  let w = availH * RATIO;
  let h = availH;
  if (w > availW) {
    w = availW;
    h = w / RATIO;
  }

  const s = w / REF_W;
  const px = (n: number) => n * s;

  // One silhouette: a plain rounded rect with a closed top — no notch.
  const R = px(CHROME.cornerRadius);
  const body =
    `M ${R} 0 H ${w - R} A ${R} ${R} 0 0 1 ${w} ${R} V ${h - R} ` +
    `A ${R} ${R} 0 0 1 ${w - R} ${h} H ${R} A ${R} ${R} 0 0 1 0 ${h - R} ` +
    `V ${R} A ${R} ${R} 0 0 1 ${R} 0 Z`;

  const sb = px(CHROME.statusBarH);

  return (
    <View
      style={[
        styles.backdrop,
        { paddingTop: padTop, paddingBottom: padBottom },
        transparent && { backgroundColor: 'transparent' },
      ]}
    >
      <View style={{ width: w, height: h }} nativeID={nativeID} collapsable={false}>
        {/* Phone */}
        <View style={[styles.phone, { borderRadius: R }]}>
          <Svg width={w} height={h} style={StyleSheet.absoluteFill} pointerEvents="none">
            <Path d={body} fill={colors.bg} />
          </Svg>

          {/* Status bar — notchless layout: time at the left inset, glyph
              cluster at the right inset. */}
          <View style={[styles.statusBar, { height: sb, paddingHorizontal: px(CHROME.statusPad) }]}>
            <Text style={[styles.time, { fontSize: px(CHROME.timeSize) }]}>9:41</Text>
            <View style={[styles.statusIcons, { gap: px(CHROME.iconGap) }]}>
              <SignalGlyph h={px(12)} color={colors.ink} />
              <WifiGlyph h={px(12)} color={colors.ink} />
              <BatteryGlyph h={px(13)} color={colors.ink} />
            </View>
          </View>

          {/* Screen content */}
          <View style={styles.screen}>{children}</View>

          {/* Home indicator */}
          <View
            style={[
              styles.homeIndicator,
              {
                width: px(CHROME.homeW),
                height: px(CHROME.homeH),
                borderRadius: px(CHROME.homeH) / 2,
                bottom: px(CHROME.homeBottom),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: BACKDROP,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontFamily: fonts.semibold,
    color: colors.ink,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screen: { flex: 1 },
  homeIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.ink,
  },
});
