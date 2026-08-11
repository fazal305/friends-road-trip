import { useState } from 'react'
import Icon from '../components/common/Icon.jsx'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import DayCard from '../components/itinerary/DayCard.jsx'
import { useItinerary } from '../hooks/useItinerary.js'
import './Itinerary.css'

export default function Itinerary() {
  const { itinerary, addItineraryDay } = useItinerary()
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    if (!title.trim()) {
      setError('Give the day a title, e.g. "Naran → Hunza".')
      return
    }
    addItineraryDay({ dayNumber: itinerary.length + 1, date, title: title.trim(), notes: '' })
    setTitle('')
    setDate('')
    setError('')
    setShowForm(false)
  }

  return (
    <div className="itinerary-page">
      {itinerary.length === 0 ? (
        <EmptyState icon="itinerary" title="No days planned yet" description="Add your first day to start building the itinerary." />
      ) : (
        <div className="itinerary-page__list">
          {itinerary.map((day, index) => (
            <DayCard key={day.id} day={day} defaultOpen={index === 0} />
          ))}
        </div>
      )}

      {showForm ? (
        <form className="itinerary-page__add-form surface-card" onSubmit={handleAdd}>
          {error && <p className="timeline-item__error">{error}</p>}
          <div className="itinerary-page__add-row">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input
              autoFocus
              placeholder="Day title, e.g. Naran → Hunza"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="itinerary-page__add-actions">
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add day</Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" onClick={() => setShowForm(true)}>
          <Icon name="plus" size={16} />
          Add day
        </Button>
      )}
    </div>
  )
}
