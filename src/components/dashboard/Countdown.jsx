import { useCountdown } from '../../hooks/useCountdown.js'
import './Countdown.css'

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

export default function Countdown({ targetDate }) {
  const countdown = useCountdown(targetDate)

  return (
    <div className="countdown" role="timer" aria-label="Time until trip starts">
      {UNITS.map((unit) => (
        <div className="countdown__tile" key={unit.key}>
          <span className="countdown__value" key={`${unit.key}-${countdown[unit.key]}`}>
            {String(countdown[unit.key]).padStart(2, '0')}
          </span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}
