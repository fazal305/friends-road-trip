import { useTripContext } from "../contexts/TripContext.jsx";

export function useNotes() {
  const { state, actions } = useTripContext();

  return {
    notes: state.notes,
    addNote: actions.addNote,
    removeNote: actions.removeNote,
  };
}
