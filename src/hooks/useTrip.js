import { useMemo } from "react";
import { useTripContext } from "../contexts/TripContext.jsx";

/** Trip-level info plus a few cross-cutting derived stats used across pages. */
export function useTrip() {
  const { state, actions } = useTripContext();

  const stats = useMemo(() => {
    const friendCount = state.friends.length;
    const confirmedCount = state.friends.filter(
      (f) => f.rsvp === "confirmed",
    ).length;
    const dayCount = state.itinerary.length;
    return { friendCount, confirmedCount, dayCount };
  }, [state.friends, state.itinerary]);

  return {
    trip: state.trip,
    vehicle: state.vehicle,
    stats,
    updateTrip: actions.updateTrip,
    updateVehicle: actions.updateVehicle,
    resetTrip: actions.resetTrip,
  };
}
