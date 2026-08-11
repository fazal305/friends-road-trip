import { uid } from '../data/initialTrip.js'

export const ACTIONS = {
  TRIP_UPDATE: 'TRIP_UPDATE',
  VEHICLE_UPDATE: 'VEHICLE_UPDATE',

  FRIEND_ADD: 'FRIEND_ADD',
  FRIEND_UPDATE: 'FRIEND_UPDATE',
  FRIEND_REMOVE: 'FRIEND_REMOVE',
  FRIEND_RSVP_CONFIRM: 'FRIEND_RSVP_CONFIRM',

  ROUTE_STOP_ADD: 'ROUTE_STOP_ADD',
  ROUTE_STOP_UPDATE: 'ROUTE_STOP_UPDATE',
  ROUTE_STOP_REMOVE: 'ROUTE_STOP_REMOVE',
  ROUTE_STOP_MOVE: 'ROUTE_STOP_MOVE',

  ITINERARY_DAY_ADD: 'ITINERARY_DAY_ADD',
  ITINERARY_DAY_UPDATE: 'ITINERARY_DAY_UPDATE',
  ITINERARY_DAY_REMOVE: 'ITINERARY_DAY_REMOVE',
  ITINERARY_STOP_ADD: 'ITINERARY_STOP_ADD',
  ITINERARY_STOP_UPDATE: 'ITINERARY_STOP_UPDATE',
  ITINERARY_STOP_REMOVE: 'ITINERARY_STOP_REMOVE',
  ITINERARY_STOP_MOVE: 'ITINERARY_STOP_MOVE',

  EXPENSE_ADD: 'EXPENSE_ADD',
  EXPENSE_UPDATE: 'EXPENSE_UPDATE',
  EXPENSE_REMOVE: 'EXPENSE_REMOVE',

  PACKING_ADD: 'PACKING_ADD',
  PACKING_TOGGLE: 'PACKING_TOGGLE',
  PACKING_REMOVE: 'PACKING_REMOVE',
  PACKING_ASSIGN: 'PACKING_ASSIGN',

  PLACE_ADD: 'PLACE_ADD',
  PLACE_UPDATE: 'PLACE_UPDATE',
  PLACE_REMOVE: 'PLACE_REMOVE',
  PLACE_TOGGLE_VISITED: 'PLACE_TOGGLE_VISITED',
  PLACE_TOGGLE_FAVORITE: 'PLACE_TOGGLE_FAVORITE',

  FOOD_ADD: 'FOOD_ADD',
  FOOD_UPDATE: 'FOOD_UPDATE',
  FOOD_REMOVE: 'FOOD_REMOVE',
  FOOD_VOTE: 'FOOD_VOTE',

  POLL_ADD: 'POLL_ADD',
  POLL_VOTE: 'POLL_VOTE',
  POLL_CLOSE: 'POLL_CLOSE',
  POLL_REMOVE: 'POLL_REMOVE',

  NOTE_ADD: 'NOTE_ADD',
  NOTE_REMOVE: 'NOTE_REMOVE',

  RESET_TRIP: 'RESET_TRIP',
}

const moveInArray = (array, index, direction) => {
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= array.length) return array
  const next = [...array]
  ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
  return next
}

const toggleVoteInPlace = (votes, friendId) =>
  votes.includes(friendId) ? votes.filter((id) => id !== friendId) : [...votes, friendId]

export function tripReducer(state, action) {
  switch (action.type) {
    case ACTIONS.TRIP_UPDATE:
      return { ...state, trip: { ...state.trip, ...action.payload } }

    case ACTIONS.VEHICLE_UPDATE:
      return { ...state, vehicle: { ...state.vehicle, ...action.payload } }

    // ---- Friends ----
    case ACTIONS.FRIEND_ADD:
      return { ...state, friends: [...state.friends, { id: uid('friend'), rsvp: 'pending', ...action.payload }] }
    case ACTIONS.FRIEND_UPDATE:
      return {
        ...state,
        friends: state.friends.map((f) => (f.id === action.payload.id ? { ...f, ...action.payload.updates } : f)),
      }
    case ACTIONS.FRIEND_REMOVE:
      return { ...state, friends: state.friends.filter((f) => f.id !== action.payload.id) }
    case ACTIONS.FRIEND_RSVP_CONFIRM:
      return {
        ...state,
        friends: state.friends.map((f) => (f.id === action.payload.id ? { ...f, rsvp: 'confirmed' } : f)),
      }

    // ---- Route stops ----
    case ACTIONS.ROUTE_STOP_ADD:
      return { ...state, routeStops: [...state.routeStops, { id: uid('stop'), ...action.payload }] }
    case ACTIONS.ROUTE_STOP_UPDATE:
      return {
        ...state,
        routeStops: state.routeStops.map((s) => (s.id === action.payload.id ? { ...s, ...action.payload.updates } : s)),
      }
    case ACTIONS.ROUTE_STOP_REMOVE:
      return { ...state, routeStops: state.routeStops.filter((s) => s.id !== action.payload.id) }
    case ACTIONS.ROUTE_STOP_MOVE: {
      const index = state.routeStops.findIndex((s) => s.id === action.payload.id)
      if (index === -1) return state
      return { ...state, routeStops: moveInArray(state.routeStops, index, action.payload.direction) }
    }

    // ---- Itinerary days ----
    case ACTIONS.ITINERARY_DAY_ADD:
      return { ...state, itinerary: [...state.itinerary, { id: uid('day'), stops: [], ...action.payload }] }
    case ACTIONS.ITINERARY_DAY_UPDATE:
      return {
        ...state,
        itinerary: state.itinerary.map((d) => (d.id === action.payload.id ? { ...d, ...action.payload.updates } : d)),
      }
    case ACTIONS.ITINERARY_DAY_REMOVE:
      return { ...state, itinerary: state.itinerary.filter((d) => d.id !== action.payload.id) }

    // ---- Itinerary stops (nested in a day) ----
    case ACTIONS.ITINERARY_STOP_ADD:
      return {
        ...state,
        itinerary: state.itinerary.map((d) =>
          d.id === action.payload.dayId
            ? { ...d, stops: [...d.stops, { id: uid('istop'), ...action.payload.stop }] }
            : d,
        ),
      }
    case ACTIONS.ITINERARY_STOP_UPDATE:
      return {
        ...state,
        itinerary: state.itinerary.map((d) =>
          d.id === action.payload.dayId
            ? {
                ...d,
                stops: d.stops.map((s) => (s.id === action.payload.stopId ? { ...s, ...action.payload.updates } : s)),
              }
            : d,
        ),
      }
    case ACTIONS.ITINERARY_STOP_REMOVE:
      return {
        ...state,
        itinerary: state.itinerary.map((d) =>
          d.id === action.payload.dayId ? { ...d, stops: d.stops.filter((s) => s.id !== action.payload.stopId) } : d,
        ),
      }
    case ACTIONS.ITINERARY_STOP_MOVE:
      return {
        ...state,
        itinerary: state.itinerary.map((d) => {
          if (d.id !== action.payload.dayId) return d
          const index = d.stops.findIndex((s) => s.id === action.payload.stopId)
          if (index === -1) return d
          return { ...d, stops: moveInArray(d.stops, index, action.payload.direction) }
        }),
      }

    // ---- Expenses ----
    case ACTIONS.EXPENSE_ADD:
      return { ...state, expenses: [...state.expenses, { id: uid('exp'), customSplits: {}, ...action.payload }] }
    case ACTIONS.EXPENSE_UPDATE:
      return {
        ...state,
        expenses: state.expenses.map((e) => (e.id === action.payload.id ? { ...e, ...action.payload.updates } : e)),
      }
    case ACTIONS.EXPENSE_REMOVE:
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload.id) }

    // ---- Packing ----
    case ACTIONS.PACKING_ADD:
      return { ...state, packingItems: [...state.packingItems, { id: uid('pack'), checked: false, assignedTo: null, ...action.payload }] }
    case ACTIONS.PACKING_TOGGLE:
      return {
        ...state,
        packingItems: state.packingItems.map((p) => (p.id === action.payload.id ? { ...p, checked: !p.checked } : p)),
      }
    case ACTIONS.PACKING_REMOVE:
      return { ...state, packingItems: state.packingItems.filter((p) => p.id !== action.payload.id) }
    case ACTIONS.PACKING_ASSIGN:
      return {
        ...state,
        packingItems: state.packingItems.map((p) =>
          p.id === action.payload.id ? { ...p, assignedTo: action.payload.friendId } : p,
        ),
      }

    // ---- Places ----
    case ACTIONS.PLACE_ADD:
      return { ...state, places: [...state.places, { id: uid('place'), visited: false, favorite: false, ...action.payload }] }
    case ACTIONS.PLACE_UPDATE:
      return {
        ...state,
        places: state.places.map((p) => (p.id === action.payload.id ? { ...p, ...action.payload.updates } : p)),
      }
    case ACTIONS.PLACE_REMOVE:
      return { ...state, places: state.places.filter((p) => p.id !== action.payload.id) }
    case ACTIONS.PLACE_TOGGLE_VISITED:
      return {
        ...state,
        places: state.places.map((p) => (p.id === action.payload.id ? { ...p, visited: !p.visited } : p)),
      }
    case ACTIONS.PLACE_TOGGLE_FAVORITE:
      return {
        ...state,
        places: state.places.map((p) => (p.id === action.payload.id ? { ...p, favorite: !p.favorite } : p)),
      }

    // ---- Food ----
    case ACTIONS.FOOD_ADD:
      return { ...state, foodOptions: [...state.foodOptions, { id: uid('food'), votes: [], ...action.payload }] }
    case ACTIONS.FOOD_UPDATE:
      return {
        ...state,
        foodOptions: state.foodOptions.map((f) => (f.id === action.payload.id ? { ...f, ...action.payload.updates } : f)),
      }
    case ACTIONS.FOOD_REMOVE:
      return { ...state, foodOptions: state.foodOptions.filter((f) => f.id !== action.payload.id) }
    case ACTIONS.FOOD_VOTE:
      return {
        ...state,
        foodOptions: state.foodOptions.map((f) =>
          f.id === action.payload.id ? { ...f, votes: toggleVoteInPlace(f.votes, action.payload.friendId) } : f,
        ),
      }

    // ---- Polls ----
    case ACTIONS.POLL_ADD:
      return { ...state, polls: [...state.polls, { id: uid('poll'), closed: false, ...action.payload }] }
    case ACTIONS.POLL_VOTE:
      return {
        ...state,
        polls: state.polls.map((poll) =>
          poll.id === action.payload.pollId
            ? {
                ...poll,
                options: poll.options.map((opt) => ({
                  ...opt,
                  // one vote per friend per poll: remove them from every other option first
                  votes:
                    opt.id === action.payload.optionId
                      ? toggleVoteInPlace(opt.votes, action.payload.friendId)
                      : opt.votes.filter((id) => id !== action.payload.friendId),
                })),
              }
            : poll,
        ),
      }
    case ACTIONS.POLL_CLOSE:
      return {
        ...state,
        polls: state.polls.map((poll) => (poll.id === action.payload.id ? { ...poll, closed: true } : poll)),
      }
    case ACTIONS.POLL_REMOVE:
      return { ...state, polls: state.polls.filter((poll) => poll.id !== action.payload.id) }

    // ---- Notes ----
    case ACTIONS.NOTE_ADD:
      return { ...state, notes: [{ id: uid('note'), createdAt: new Date().toISOString(), ...action.payload }, ...state.notes] }
    case ACTIONS.NOTE_REMOVE:
      return { ...state, notes: state.notes.filter((n) => n.id !== action.payload.id) }

    case ACTIONS.RESET_TRIP:
      return action.payload

    default:
      return state
  }
}
