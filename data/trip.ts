// Shared prototype data for the Peru trip — avatars + image helper used
// across the Inspiration / Plan / Itinerary tabs.

// Editorial, refined portraits (curated for a high-fashion feel — Condé Nast /
// Vogue register, not smiley stock). Swap for licensed art when final.
const face = (id: string) => `https://images.unsplash.com/photo-${id}?w=160&h=160&fit=crop&crop=faces`;

export const AVATARS = {
  maya: face('1531123897727-8f129e1688ce'), // friend · foodie
  james: face('1506794778202-cad84cf45f1d'), // friend · the Andes
  you: face('1524504388940-b1c1722653e1'), // Elena, the primary user
  tomo: face('1519085360753-af0119f7cbe7'), // curator you follow
  // Travel companions on the demo Peru trip (a girls' trip)
  priya: face('1488426862026-3ee34a7d66df'),
  jules: face('1534528741775-53994a69daeb'),
  nadia: face('1544005313-94ddf0286df2'),
};

export const img = (id: string) =>
  `https://images.unsplash.com/${id}?fm=jpg&q=75&w=900&auto=format&fit=crop`;

// Curated, verified travel imagery — warm, human, editorial (replaces the
// earlier muted architecture set). Swap any hero for a hand-picked local asset
// the way central_sample_image.png was, when final art is ready.
export const PHOTO = {
  peruAndes: 'photo-1526392060635-9d6019884377', // misty Andes ridgeline
  amalfi: 'photo-1533105079780-92b9be482077', // white town over blue sea
  kyoto: 'photo-1524413840807-0c3cb6fa808d', // cherry blossoms
  mexico: 'photo-1518638150340-f706e86654de', // pyramid, deep blue sky
  lisbon: 'photo-1519677100203-a0e668c92439', // terracotta rooftops
  tropics: 'photo-1519046904884-53103b34b206', // palm against blue
  coastAerial: 'photo-1505228395891-9a51e7e86bf6', // turquoise aerial coast
  safari: 'photo-1547471080-7cc2caa01a7e', // acacia at golden hour
  beachSunset: 'photo-1507525428034-b723cf961d3e', // calm sea at dusk
  dining: 'photo-1414235077428-338989a2e8c0', // warm restaurant table
  table: 'photo-1466978913421-dad2ebd01d17', // overhead spread + hands
  market: 'photo-1519996529931-28324d5a630e', // colorful fruit
  restaurant: 'photo-1517248135467-4c7edcad34c4', // moody dining room
  hotel: 'photo-1618773928121-c32242e63f39', // warm room, fireplace
  suite: 'photo-1590490360182-c33d57733427', // elegant room, lamplight
  villa: 'photo-1566073771259-6a8506099945', // resort villa + pool
  flatlay: 'photo-1504609773096-104ff2c73ba4', // travel flat-lay
} as const;

export const photo = (key: keyof typeof PHOTO) => img(PHOTO[key]);
