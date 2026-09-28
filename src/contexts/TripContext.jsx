import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { tripReducer, ACTIONS } from "./tripReducer.js";
import { initialTripState } from "../data/initialTrip.js";
import { readStorage, writeStorage } from "../utils/storage.js";

const STORAGE_KEY = "tripState";
const TripContext = createContext(null);

function init() {
  return readStorage(STORAGE_KEY, initialTripState);
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, undefined, init);

  useEffect(() => {
    writeStorage(STORAGE_KEY, state);
  }, [state]);

  const actions = useMemo(
    () => ({
      updateTrip: (payload) => dispatch({ type: ACTIONS.TRIP_UPDATE, payload }),
      updateVehicle: (payload) =>
        dispatch({ type: ACTIONS.VEHICLE_UPDATE, payload }),

      addFriend: (payload) => dispatch({ type: ACTIONS.FRIEND_ADD, payload }),
      updateFriend: (id, updates) =>
        dispatch({ type: ACTIONS.FRIEND_UPDATE, payload: { id, updates } }),
      removeFriend: (id) =>
        dispatch({ type: ACTIONS.FRIEND_REMOVE, payload: { id } }),
      confirmRsvp: (id) =>
        dispatch({ type: ACTIONS.FRIEND_RSVP_CONFIRM, payload: { id } }),

      addRouteStop: (payload) =>
        dispatch({ type: ACTIONS.ROUTE_STOP_ADD, payload }),
      updateRouteStop: (id, updates) =>
        dispatch({ type: ACTIONS.ROUTE_STOP_UPDATE, payload: { id, updates } }),
      removeRouteStop: (id) =>
        dispatch({ type: ACTIONS.ROUTE_STOP_REMOVE, payload: { id } }),
      moveRouteStop: (id, direction) =>
        dispatch({ type: ACTIONS.ROUTE_STOP_MOVE, payload: { id, direction } }),

      addItineraryDay: (payload) =>
        dispatch({ type: ACTIONS.ITINERARY_DAY_ADD, payload }),
      updateItineraryDay: (id, updates) =>
        dispatch({
          type: ACTIONS.ITINERARY_DAY_UPDATE,
          payload: { id, updates },
        }),
      removeItineraryDay: (id) =>
        dispatch({ type: ACTIONS.ITINERARY_DAY_REMOVE, payload: { id } }),
      addItineraryStop: (dayId, stop) =>
        dispatch({
          type: ACTIONS.ITINERARY_STOP_ADD,
          payload: { dayId, stop },
        }),
      updateItineraryStop: (dayId, stopId, updates) =>
        dispatch({
          type: ACTIONS.ITINERARY_STOP_UPDATE,
          payload: { dayId, stopId, updates },
        }),
      removeItineraryStop: (dayId, stopId) =>
        dispatch({
          type: ACTIONS.ITINERARY_STOP_REMOVE,
          payload: { dayId, stopId },
        }),
      moveItineraryStop: (dayId, stopId, direction) =>
        dispatch({
          type: ACTIONS.ITINERARY_STOP_MOVE,
          payload: { dayId, stopId, direction },
        }),

      addExpense: (payload) => dispatch({ type: ACTIONS.EXPENSE_ADD, payload }),
      updateExpense: (id, updates) =>
        dispatch({ type: ACTIONS.EXPENSE_UPDATE, payload: { id, updates } }),
      removeExpense: (id) =>
        dispatch({ type: ACTIONS.EXPENSE_REMOVE, payload: { id } }),

      addPackingItem: (payload) =>
        dispatch({ type: ACTIONS.PACKING_ADD, payload }),
      togglePackingItem: (id) =>
        dispatch({ type: ACTIONS.PACKING_TOGGLE, payload: { id } }),
      removePackingItem: (id) =>
        dispatch({ type: ACTIONS.PACKING_REMOVE, payload: { id } }),
      assignPackingItem: (id, friendId) =>
        dispatch({ type: ACTIONS.PACKING_ASSIGN, payload: { id, friendId } }),

      addPlace: (payload) => dispatch({ type: ACTIONS.PLACE_ADD, payload }),
      updatePlace: (id, updates) =>
        dispatch({ type: ACTIONS.PLACE_UPDATE, payload: { id, updates } }),
      removePlace: (id) =>
        dispatch({ type: ACTIONS.PLACE_REMOVE, payload: { id } }),
      togglePlaceVisited: (id) =>
        dispatch({ type: ACTIONS.PLACE_TOGGLE_VISITED, payload: { id } }),
      togglePlaceFavorite: (id) =>
        dispatch({ type: ACTIONS.PLACE_TOGGLE_FAVORITE, payload: { id } }),

      addFoodOption: (payload) => dispatch({ type: ACTIONS.FOOD_ADD, payload }),
      updateFoodOption: (id, updates) =>
        dispatch({ type: ACTIONS.FOOD_UPDATE, payload: { id, updates } }),
      removeFoodOption: (id) =>
        dispatch({ type: ACTIONS.FOOD_REMOVE, payload: { id } }),
      voteFoodOption: (id, friendId) =>
        dispatch({ type: ACTIONS.FOOD_VOTE, payload: { id, friendId } }),

      addPoll: (payload) => dispatch({ type: ACTIONS.POLL_ADD, payload }),
      votePoll: (pollId, optionId, friendId) =>
        dispatch({
          type: ACTIONS.POLL_VOTE,
          payload: { pollId, optionId, friendId },
        }),
      closePoll: (id) =>
        dispatch({ type: ACTIONS.POLL_CLOSE, payload: { id } }),
      removePoll: (id) =>
        dispatch({ type: ACTIONS.POLL_REMOVE, payload: { id } }),

      addNote: (payload) => dispatch({ type: ACTIONS.NOTE_ADD, payload }),
      removeNote: (id) =>
        dispatch({ type: ACTIONS.NOTE_REMOVE, payload: { id } }),

      resetTrip: () =>
        dispatch({ type: ACTIONS.RESET_TRIP, payload: initialTripState }),
    }),
    [],
  );

  const value = useMemo(() => ({ state, dispatch, actions }), [state, actions]);

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTripContext() {
  const ctx = useContext(TripContext);
  if (!ctx)
    throw new Error("useTripContext must be used within a TripProvider");
  return ctx;
}
