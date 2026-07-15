// Screen registry — the phase-1 deck. Exactly the seven screens we're shipping:
// Home, Concierge conversation, Collection detail, Reservation card, Group trip
// canvas, Travel Passport, Inspiration Feed. The dev switcher (‹ ›) flips
// between them; each renders inside the PhoneFrame unless marked frameless.

import type { ReactElement } from 'react';

import Home from './Home';
import Concierge from './Concierge';
import CollectionDetail from './CollectionDetail';
import GroupCanvas from './GroupCanvas';
import TravelPassport from './TravelPassport';
import InspirationFeed from './InspirationFeed';
import ApprovalCard from './slides/ApprovalCard';

export type ScreenContext = {
  goTo: (key: string) => void;
  /** False only on first launch — reserved for an intro; unused now. */
  booted: boolean;
};

export type ScreenEntry = {
  key: string;
  title: string;
  render: (ctx: ScreenContext) => ReactElement;
  /** Slide artifacts render without the PhoneFrame — just the artifact on a canvas. */
  frameless?: boolean;
};

export const SCREENS: ScreenEntry[] = [
  {
    key: 'home',
    title: 'Home',
    render: ({ goTo }) => (
      <Home onOpenTrip={() => goTo('group')} onExplore={() => goTo('feed')} onConcierge={() => goTo('concierge')} />
    ),
  },
  {
    key: 'concierge',
    title: 'Concierge',
    render: ({ goTo }) => (
      <Concierge onBack={() => goTo('home')} onOpenCollection={() => goTo('collection')} />
    ),
  },
  {
    key: 'collection',
    title: 'Collection',
    render: ({ goTo }) => <CollectionDetail onBack={() => goTo('concierge')} />,
  },
  {
    key: 'reservation',
    title: 'Reservation card',
    frameless: true,
    render: () => <ApprovalCard />,
  },
  {
    key: 'group',
    title: 'Group',
    render: ({ goTo }) => <GroupCanvas onBack={() => goTo('home')} />,
  },
  {
    key: 'passport',
    title: 'Passport',
    render: ({ goTo }) => <TravelPassport onHome={() => goTo('home')} />,
  },
  {
    key: 'feed',
    title: 'Feed',
    render: ({ goTo }) => <InspirationFeed onHome={() => goTo('home')} />,
  },
];
