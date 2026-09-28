import { useTripContext } from "../contexts/TripContext.jsx";

export function usePacking() {
  const { state, actions } = useTripContext();

  return {
    packingItems: state.packingItems,
    addPackingItem: actions.addPackingItem,
    togglePackingItem: actions.togglePackingItem,
    removePackingItem: actions.removePackingItem,
    assignPackingItem: actions.assignPackingItem,
  };
}
