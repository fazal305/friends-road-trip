# Convoy — Friends Road Trip Planner

**Live demo:** https://fazal305.github.io/friends-road-trip/

Your group's shared road-trip command center — plan the route, split expenses, vote on food and activities, and pack together, all from one place.

![Status](https://img.shields.io/badge/status-active-brightgreen) ![React](https://img.shields.io/badge/React-19-61dafb) ![Vite](https://img.shields.io/badge/Vite-8-646cff)

---

## Why I built this

Planning a road trip with a group of friends usually turns into five different WhatsApp threads, a shared Google Sheet nobody updates, and someone mentally tracking who owes who money. Convoy was built as a single-page home for all of that — the itinerary, the route, who's coming, what things cost, what to pack, and where to eat — with everything calculated live instead of manually re-typed into a spreadsheet.

It's also a demonstration project: a complete, production-quality React application built from scratch to showcase component architecture, state management patterns (Context + `useReducer`), custom hooks, and a centralized design system — without hiding behind a UI framework or a backend.

## Features

- **Trip Dashboard** — hero section with live countdown, trip stats, and the next upcoming stop, all derived from real data
- **Route** — a stylized (not a live map) start → stop → destination visualization with editable stops, distances, and places to visit
- **Day-by-day Itinerary** — expandable day cards with a timeline of stops; add, edit, reorder, and delete
- **Friends** — roles (Organizer / Driver / Passenger), contact info, and an RSVP flow that only offers confirming attendance
- **Expenses** — shared cost tracking with category breakdowns, equal or custom splits, and a debt-simplification algorithm that tells you exactly who owes whom
- **Packing List** — categorized, assignable, persisted checklist
- **Places to Visit** — a prioritized wishlist with cost estimates, favorites, and visited tracking
- **Food & Voting** — restaurant options with per-friend voting and a dynamically-highlighted leading choice
- **Polls** — lightweight group decision-making with live animated results
- **Notes** — a shared scratchpad for trip reminders
- **Settings** — theme (dark/light), full trip/vehicle configuration, a live fuel cost estimator, and a one-click reset to sample data
- **Keyboard shortcuts** — navigate the whole app without a mouse (press `?` in the app to see them)

## What this is *not*

In the interest of honesty over feature-padding: there is no real map (no Maps API key was available, so the route is a deliberately-labeled stylized visualization), no live weather, no real-time multi-device sync, and no authentication. Everything lives in **one browser's local storage**. See [Future Roadmap](#future-roadmap) for what a v2 with a backend could add.

## Architecture

```
src/
  components/       # organized by feature (dashboard, route, itinerary, friends,
                     # expenses, packing, places, food, polls, notes, layout, common)
  contexts/          # TripContext (useReducer + localStorage), ThemeContext
  hooks/             # useTrip, useFriends, useExpenses, useItinerary, useRoute,
                     # usePacking, usePlaces, useFood, usePolls, useNotes,
                     # useCountdown, useLocalStorage, useConfirm, useKeyboardShortcuts
  pages/             # one component per route
  data/              # initialTrip.js — the sample dataset & shape every feature reads
  utils/             # calculations.js, formatters.js, storage.js, tripStatus.js, ...
  styles/            # variables.css (design tokens), globals.css (reset + base)
```

Every page is data-driven: components read from `TripContext` rather than containing hardcoded content. Renaming the trip, adding a friend, or changing the destination updates the dashboard, route, itinerary, and summary simultaneously because they all read from the same source of truth.

### React concepts demonstrated

| Concept | Where |
|---|---|
| `useReducer` for complex state | `contexts/tripReducer.js` — one reducer, namespaced actions, covers every feature area |
| `useContext` | `TripContext`, `ThemeContext` |
| `useState` | Local form state throughout (inline edit forms, modals) |
| `useEffect` | Persisting to `localStorage` on state change, theme `data-theme` sync, countdown ticking |
| `useMemo` | Derived values — expense totals, balances, settlements, poll percentages |
| `useCallback` | Stable handlers in `useLocalStorage` |
| `useRef` | Modal focus management |
| Custom hooks | `useCountdown`, `useLocalStorage`, `useConfirm`, `useKeyboardShortcuts`, and one thin hook per feature domain |
| Error boundaries | `ErrorBoundary` wraps routed content so one broken page doesn't crash the app |
| Portals | `Modal` renders via `createPortal` |
| Code-driven design system | Every color/spacing/radius/motion value is a CSS custom property in `styles/variables.css` — no hardcoded colors in components |

### State management

- **`TripContext`** owns the entire trip dataset (trip info, vehicle, friends, route, itinerary, expenses, packing, places, food, polls, notes) via a single `useReducer`. Actions are namespaced by feature (`FRIEND_ADD`, `EXPENSE_UPDATE`, `POLL_VOTE`, ...) and the whole state blob persists to `localStorage` automatically on every change.
- **`ThemeContext`** is separate and lightweight — just the dark/light preference, persisted independently.
- Each feature area gets a thin custom hook (`useFriends`, `useExpenses`, etc.) that exposes only the slice of state and actions that feature needs, keeping components decoupled from the shape of the global reducer.

### Data model

The full sample dataset lives in [`src/data/initialTrip.js`](src/data/initialTrip.js) — trip, vehicle, friends, routeStops, itinerary (days → stops), expenses, packingItems, places, foodOptions, polls, and notes. It's clearly-labeled sample data ("Friend 01" style placeholders where no real info was provided) meant to be edited in-app or replaced in that file.

### Calculations

All numbers are computed, never hardcoded:

- **Expense splitting** — equal or custom amounts per participant (`utils/calculations.js`)
- **Settlement algorithm** — a greedy debt-simplification pass that turns N-way expense sharing into the minimum number of "X owes Y" transactions
- **Fuel estimator** — `distance ÷ efficiency × price` computed live as you type in Settings
- **Live countdown** — recalculated every second from the trip's start date

### Local persistence

Everything is stored in `localStorage` under a `convoy:` namespace via a safe wrapper (`utils/storage.js`) that never throws — a private-browsing or quota failure degrades gracefully instead of crashing the app. Refreshing the browser does not lose your trip.

## Installation

```bash
git clone https://github.com/fazal305/friends-road-trip.git
cd friends-road-trip
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Usage

1. On first load you'll see a sample trip ("Mountain Escape") — explore the Dashboard, Itinerary, and other sections to see it populated.
2. Go to **Settings** to rename the trip, set your real dates/route, and configure your vehicle.
3. Add your friends on the **Friends** page, then use **Expenses**, **Packing**, **Places**, **Food**, and **Polls** as you plan.
4. Press `?` anywhere in the app to see keyboard shortcuts.
5. Everything saves automatically — no save button, no account needed.

## Future roadmap

- Real map integration (Mapbox/Leaflet) behind an API key, replacing the stylized route view
- A lightweight backend for real multi-device sync (currently intentionally single-device/local-only)
- Live weather via a weather API for upcoming destinations
- True drag-and-drop reordering (currently up/down buttons, chosen deliberately for simplicity and full keyboard accessibility)
- Export itinerary/expenses to PDF or a shareable link

## Lessons learned

- A single `useReducer` with namespaced actions scales better than scattering `useState` across features once expense splitting, settlements, and polls all need to read/write the same trip.
- Deriving state (like trip status from dates, or fuel cost from three inputs) instead of storing it redundantly eliminated a whole class of "forgot to update this too" bugs.
- CSS Grid's `1fr` tracks don't shrink below their content's intrinsic width by default — a real bug hit during the responsive pass, fixed with a global `min-width: 0` rule on form fields rather than patching it per-component.

## Tech stack

React 19 · React Router 7 · Vite · plain CSS with a token-based design system — no UI framework, no unnecessary dependencies.

---

Built as a demonstration project. Not affiliated with any real travel service.
