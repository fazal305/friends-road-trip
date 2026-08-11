import { useTripContext } from '../contexts/TripContext.jsx'

export function usePolls() {
  const { state, actions } = useTripContext()

  return {
    polls: state.polls,
    addPoll: actions.addPoll,
    votePoll: actions.votePoll,
    closePoll: actions.closePoll,
    removePoll: actions.removePoll,
  }
}
