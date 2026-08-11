/**
 * Derives the trip's live status from today's date vs. trip dates, unless
 * the trip has been manually marked active (via the Dashboard "Start Trip"
 * action) or completed — those manual states always win.
 */
export function deriveTripStatus(trip) {
  if (trip.status === 'completed') return 'completed'

  const today = new Date()
  const start = new Date(trip.startDate)
  const end = new Date(trip.endDate)

  if (!Number.isNaN(end.getTime()) && today > end) return 'completed'
  if (trip.status === 'active') return 'active'
  if (!Number.isNaN(start.getTime()) && today >= start) return 'active'
  return 'upcoming'
}
