import { useTripContext } from '../contexts/TripContext.jsx'

export function useRoute() {
  const { state, actions } = useTripContext()

  return {
    routeStops: state.routeStops,
    addRouteStop: actions.addRouteStop,
    updateRouteStop: actions.updateRouteStop,
    removeRouteStop: actions.removeRouteStop,
    moveRouteStop: actions.moveRouteStop,
  }
}
