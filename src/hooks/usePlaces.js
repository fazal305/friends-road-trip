import { useTripContext } from "../contexts/TripContext.jsx";

export function usePlaces() {
  const { state, actions } = useTripContext();

  return {
    places: state.places,
    addPlace: actions.addPlace,
    updatePlace: actions.updatePlace,
    removePlace: actions.removePlace,
    togglePlaceVisited: actions.togglePlaceVisited,
    togglePlaceFavorite: actions.togglePlaceFavorite,
  };
}
