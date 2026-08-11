import { useTripContext } from '../contexts/TripContext.jsx'

export function useFood() {
  const { state, actions } = useTripContext()

  return {
    foodOptions: state.foodOptions,
    addFoodOption: actions.addFoodOption,
    updateFoodOption: actions.updateFoodOption,
    removeFoodOption: actions.removeFoodOption,
    voteFoodOption: actions.voteFoodOption,
  }
}
