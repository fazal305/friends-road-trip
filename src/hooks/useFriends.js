import { useMemo } from 'react'
import { useTripContext } from '../contexts/TripContext.jsx'

export function useFriends() {
  const { state, actions } = useTripContext()

  const friendsById = useMemo(() => {
    const map = {}
    state.friends.forEach((f) => { map[f.id] = f })
    return map
  }, [state.friends])

  return {
    friends: state.friends,
    friendsById,
    addFriend: actions.addFriend,
    updateFriend: actions.updateFriend,
    removeFriend: actions.removeFriend,
    confirmRsvp: actions.confirmRsvp,
  }
}
