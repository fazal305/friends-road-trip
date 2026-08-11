import Icon from '../common/Icon.jsx'
import Button from '../common/Button.jsx'
import Countdown from './Countdown.jsx'
import { useTrip } from '../../hooks/useTrip.js'
import { deriveTripStatus } from '../../utils/tripStatus.js'
import { formatShortDate } from '../../utils/formatters.js'
import './TripHero.css'

const STATUS_COPY = {
  upcoming: { label: 'Upcoming', tone: 'upcoming' },
  active: { label: 'On the road', tone: 'active' },
  completed: { label: 'Completed', tone: 'completed' },
}

export default function TripHero() {
  const { trip, updateTrip } = useTrip()
  const status = deriveTripStatus(trip)
  const statusInfo = STATUS_COPY[status]

  return (
    <section className="trip-hero">
      <div className="trip-hero__backdrop" aria-hidden="true" />

      <div className="trip-hero__content">
        <span className={`trip-hero__status trip-hero__status--${statusInfo.tone}`}>
          <span className="trip-hero__status-dot" />
          {statusInfo.label}
        </span>

        <h2 className="trip-hero__name">{trip.name}</h2>

        <div className="trip-hero__route">
          <span>{trip.startLocation}</span>
          <Icon name="route" size={18} />
          <span>{trip.destination}</span>
        </div>

        <p className="trip-hero__dates">
          {formatShortDate(trip.startDate)} — {formatShortDate(trip.endDate)}
        </p>

        {status === 'upcoming' && (
          <div className="trip-hero__countdown">
            <Countdown targetDate={trip.startDate} />
          </div>
        )}

        {status === 'upcoming' && (
          <Button variant="primary" onClick={() => updateTrip({ status: 'active' })}>
            <Icon name="car" size={16} />
            Start Trip
          </Button>
        )}

        {status === 'active' && (
          <p className="trip-hero__live-note">The convoy is on the road — have a great trip!</p>
        )}

        {status === 'completed' && (
          <p className="trip-hero__live-note">This trip has wrapped up. Check the summary anytime.</p>
        )}
      </div>
    </section>
  )
}
