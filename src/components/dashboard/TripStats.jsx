import Icon from '../common/Icon.jsx'
import { useTrip } from '../../hooks/useTrip.js'
import { formatDistance, formatDuration } from '../../utils/formatters.js'
import './TripStats.css'

export default function TripStats() {
  const { trip, stats } = useTrip()

  const cards = [
    {
      icon: 'friends',
      label: 'Travelers',
      value: stats.friendCount,
      sub: `${stats.confirmedCount} confirmed`,
    },
    {
      icon: 'itinerary',
      label: 'Days',
      value: stats.dayCount,
      sub: `${trip.startDate} → ${trip.endDate}`,
    },
    {
      icon: 'route',
      label: 'Distance',
      value: formatDistance(trip.distanceKm),
      sub: 'total route',
    },
    {
      icon: 'car',
      label: 'Travel time',
      value: formatDuration(trip.estimatedTravelHours),
      sub: 'estimated driving',
    },
  ]

  return (
    <div className="trip-stats">
      {cards.map((card) => (
        <div className="trip-stats__card surface-card" key={card.label}>
          <div className="trip-stats__icon">
            <Icon name={card.icon} size={18} />
          </div>
          <div>
            <span className="trip-stats__value">{card.value}</span>
            <span className="trip-stats__label">{card.label}</span>
            <span className="trip-stats__sub">{card.sub}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
