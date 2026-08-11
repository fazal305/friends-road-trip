import { useTripContext } from '../contexts/TripContext.jsx'

export function useItinerary() {
  const { state, actions } = useTripContext()

  return {
    itinerary: state.itinerary,
    addItineraryDay: actions.addItineraryDay,
    updateItineraryDay: actions.updateItineraryDay,
    removeItineraryDay: actions.removeItineraryDay,
    addItineraryStop: actions.addItineraryStop,
    updateItineraryStop: actions.updateItineraryStop,
    removeItineraryStop: actions.removeItineraryStop,
    moveItineraryStop: actions.moveItineraryStop,
  }
}
