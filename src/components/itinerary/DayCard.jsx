import { useState } from 'react'
import Icon from '../common/Icon.jsx'
import Button from '../common/Button.jsx'
import TimelineItem from './TimelineItem.jsx'
import { formatWeekday, formatShortDate } from '../../utils/formatters.js'
import { useItinerary } from '../../hooks/useItinerary.js'
import { useConfirm } from '../../hooks/useConfirm.jsx'
import './DayCard.css'

export default function DayCard({ day, defaultOpen = false }) {
  const { addItineraryStop, updateItineraryStop, removeItineraryStop, moveItineraryStop, removeItineraryDay } = useItinerary()
  const { requestConfirm, confirmDialog } = useConfirm()
  const [open, setOpen] = useState(defaultOpen)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStop, setNewStop] = useState({ time: '', title: '' })
  const [error, setError] = useState('')

  const handleAddStop = (event) => {
    event.preventDefault()
    if (!newStop.title.trim()) {
      setError('Give the stop a title.')
      return
    }
    addItineraryStop(day.id, { time: newStop.time, title: newStop.title.trim(), type: 'note', notes: '' })
    setNewStop({ time: '', title: '' })
    setError('')
    setShowAddForm(false)
  }

  return (
    <div className="day-card surface-card">
      <button type="button" className="day-card__header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <div className="day-card__heading">
          <span className="day-card__day-badge">Day {day.dayNumber}</span>
          <div>
            <h3 className="day-card__title">{day.title}</h3>
            <span className="day-card__date">
              {formatWeekday(day.date)}, {formatShortDate(day.date)} · {day.stops.length} stop{day.stops.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
        <Icon name="chevronDown" size={18} className={`day-card__chevron${open ? ' day-card__chevron--open' : ''}`} />
      </button>

      {open && (
        <div className="day-card__body">
          {day.stops.length > 0 ? (
            <ol className="day-card__timeline">
              {day.stops.map((stop, index) => (
                <TimelineItem
                  key={stop.id}
                  stop={stop}
                  isFirst={index === 0}
                  isLast={index === day.stops.length - 1}
                  onMoveUp={() => moveItineraryStop(day.id, stop.id, 'up')}
                  onMoveDown={() => moveItineraryStop(day.id, stop.id, 'down')}
                  onUpdate={(updates) => updateItineraryStop(day.id, stop.id, updates)}
                  onRemove={() => removeItineraryStop(day.id, stop.id)}
                />
              ))}
            </ol>
          ) : (
            <p className="day-card__empty">No stops yet for this day.</p>
          )}

          {showAddForm ? (
            <form className="day-card__add-form" onSubmit={handleAddStop}>
              {error && <p className="timeline-item__error">{error}</p>}
              <input
                placeholder="Time (e.g. 08:00)"
                value={newStop.time}
                onChange={(e) => setNewStop({ ...newStop, time: e.target.value })}
                className="day-card__add-time"
              />
              <input
                autoFocus
                placeholder="What's happening?"
                value={newStop.title}
                onChange={(e) => setNewStop({ ...newStop, title: e.target.value })}
              />
              <div className="day-card__add-actions">
                <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Add</Button>
              </div>
            </form>
          ) : (
            <div className="day-card__footer-actions">
              <Button variant="secondary" onClick={() => setShowAddForm(true)}>
                <Icon name="plus" size={15} />
                Add stop
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  requestConfirm({
                    title: 'Delete this day?',
                    description: `Day ${day.dayNumber}: ${day.title} and all ${day.stops.length} of its stops will be removed.`,
                    confirmLabel: 'Delete day',
                    onConfirm: () => removeItineraryDay(day.id),
                  })
                }
              >
                <Icon name="trash" size={15} />
                Delete day
              </Button>
            </div>
          )}
        </div>
      )}
      {confirmDialog}
    </div>
  )
}
