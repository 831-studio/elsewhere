// Travel Passport — the standing preference profile that powers the concierge's
// personalization. Durable preferences only — how you fly, where you stay,
// dietary, and the loyalty + cards the concierge can put to work.
//
// Hierarchy (Marriott-style): the section header sits ABOVE its group, distinct
// in weight and size, so it never blends with the row labels below. `variant`
// toggles the group container between an elevated card and a flat list.

import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import FloatingNav from '../components/FloatingNav';
import { AVATARS } from '../data/trip';
import { colors, fonts, radius } from '../theme';

type Variant = 'cards' | 'flat';

const FLIGHTS = [
  { label: 'Seat', value: 'Window' },
  { label: 'Cabin', value: 'Business on long-haul' },
  { label: 'Lounges', value: 'Priority Pass · Amex Centurion' },
];
const HOTELS = [
  { label: 'Room', value: 'King · high floor · quiet side' },
  { label: 'Style', value: 'Boutique & design-led' },
];
const FAVORITE_STAYS = ['Le Sirenuse', 'Aman', 'Soho House', 'Hôtel Costes'];
const DIETARY = ['Pescatarian', 'No shellfish'];
const LOYALTY = [
  { name: 'LATAM Pass', tier: 'Gold', num: '•• 3391' },
  { name: 'Marriott Bonvoy', tier: 'Titanium', num: '•• 7742' },
  { name: 'Amex Membership Rewards', tier: '', num: '•• 2210' },
];
const CARDS = [
  { name: 'Amex Platinum', num: '•• 1004' },
  { name: 'Chase Sapphire Reserve', num: '•• 7789' },
];

function Section({
  title, action, variant, children,
}: { title: string; action?: string; variant: Variant; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action ? <Pressable hitSlop={8}><Text style={styles.sectionAction}>{action}</Text></Pressable> : null}
      </View>
      <View style={variant === 'cards' ? styles.card : styles.flat}>{children}</View>
    </View>
  );
}

// Marriott-style row: small gray label ABOVE, the value in ink below — the
// value is the content, so it gets the weight.
function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <View style={styles.chips}>
      {items.map((t) => <View key={t} style={styles.chip}><Text style={styles.chipText}>{t}</Text></View>)}
    </View>
  );
}

export default function TravelPassport({ onHome, variant = 'cards' }: { onHome?: () => void; variant?: Variant }) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Identity */}
        <View style={styles.identity}>
          <Image source={{ uri: AVATARS.you }} style={styles.avatar} contentFit="cover" />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Elena Marchetti</Text>
            <Text style={styles.metaLine}>Member since 2019</Text>
          </View>
        </View>

        {/* Tabs — Preferences (here) · Connections */}
        <View style={styles.tabs}>
          <View>
            <Text style={styles.tabTextActive}>Preferences</Text>
            <View style={styles.tabUnderline} />
          </View>
          <View>
            <Text style={styles.tabText}>Connections</Text>
          </View>
        </View>

        <Section title="Flights" action="Edit" variant={variant}>
          {FLIGHTS.map((r, i) => <Row key={r.label} label={r.label} value={r.value} last={i === FLIGHTS.length - 1} />)}
        </Section>

        <Section title="Hotels" action="Edit" variant={variant}>
          {HOTELS.map((r) => <Row key={r.label} label={r.label} value={r.value} />)}
          <Text style={styles.subLabel}>Favorites</Text>
          <Chips items={FAVORITE_STAYS} />
        </Section>

        <Section title="Dietary" action="Edit" variant={variant}>
          {/* Chips-only card — balanced padding so the pills sit centered */}
          <View style={{ marginTop: 10 }}><Chips items={DIETARY} /></View>
        </Section>

        <Section title="Loyalty & points" action="Add" variant={variant}>
          {LOYALTY.map((l, i) => (
            <View key={l.name} style={[styles.rowSplit, i === LOYALTY.length - 1 && styles.rowLast]}>
              <View style={styles.loyaltyLeft}>
                <Text style={styles.itemName}>{l.name}</Text>
                {l.tier ? <Text style={styles.tier}>{l.tier}</Text> : null}
              </View>
              <Text style={styles.rowNum}>{l.num}</Text>
            </View>
          ))}
        </Section>

        <Section title="Cards" action="Add" variant={variant}>
          {CARDS.map((c, i) => (
            <View key={c.name} style={[styles.rowSplit, i === CARDS.length - 1 && styles.rowLast]}>
              <Text style={styles.itemName}>{c.name}</Text>
              <Text style={styles.rowNum}>{c.num}</Text>
            </View>
          ))}
        </Section>
      </ScrollView>

      <FloatingNav active="profile" onHome={onHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 150 },

  // Identity
  identity: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 22 },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.hairline },
  name: { fontFamily: fonts.medium, fontSize: 16, letterSpacing: -0.2, color: colors.ink },
  metaLine: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.inkMuted, marginTop: 3 },

  // Section (header ABOVE the group)
  section: { marginTop: 26 },
  sectionHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.regular, fontSize: 14, letterSpacing: -0.1, color: colors.ink },
  sectionAction: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted },

  // Group containers
  card: {
    backgroundColor: colors.bg,
    borderRadius: radius.square,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 14,
    shadowColor: 'rgba(17, 17, 17, 0.07)',
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  flat: {},

  subLabel: { fontFamily: fonts.medium, fontSize: 12, color: colors.inkMuted, marginTop: 14, marginBottom: 10 },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    height: 32,
    paddingHorizontal: 13,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.ink },

  // Stacked label-over-value (Marriott "Your Level / Platinum Elite")
  row: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.inkMuted },
  rowValue: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink, marginTop: 3 },

  // Side-by-side rows for name + number (loyalty, cards)
  rowSplit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  itemName: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  rowNum: { fontFamily: fonts.regular, fontSize: 13, color: colors.inkMuted, fontVariant: ['tabular-nums'] },
  loyaltyLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tier: {
    fontFamily: fonts.medium,
    fontSize: 10.5,
    color: colors.inkMuted,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  // Tabs — active underlined in ink (Marriott's Current/Past pattern)
  tabs: { flexDirection: 'row', gap: 22, marginBottom: 2 },
  tabText: { fontFamily: fonts.regular, fontSize: 14, color: colors.inkMuted },
  tabTextActive: { fontFamily: fonts.medium, fontSize: 14, color: colors.ink },
  tabUnderline: { height: 2, backgroundColor: colors.ink, borderRadius: 1, marginTop: 6 },
});
