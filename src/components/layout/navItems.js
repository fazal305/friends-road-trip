/** Single source of truth for primary navigation — Sidebar, MobileNav, and the mobile drawer all read from this. */
export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/itinerary', label: 'Itinerary', icon: 'itinerary' },
  { to: '/route', label: 'Route', icon: 'route' },
  { to: '/friends', label: 'Friends', icon: 'friends' },
  { to: '/expenses', label: 'Expenses', icon: 'expenses' },
  { to: '/packing', label: 'Packing', icon: 'packing' },
  { to: '/places', label: 'Places', icon: 'places' },
  { to: '/food', label: 'Food', icon: 'food' },
  { to: '/polls', label: 'Polls', icon: 'polls' },
  { to: '/notes', label: 'Notes', icon: 'notes' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

/** The subset shown in the mobile bottom bar — everything else lives in the drawer ("More"). */
export const MOBILE_PRIMARY_NAV = ['/', '/itinerary', '/route', '/expenses']
