import { useState } from 'react'
import Icon from '../common/Icon.jsx'
import Button from '../common/Button.jsx'
import EmptyState from '../common/EmptyState.jsx'
import RouteStop from './RouteStop.jsx'
import { useRoute } from '../../hooks/useRoute.js'
import './RouteMap.css'

export default function RouteMap() {
  const { routeStops, addRouteStop, updateRouteStop, removeRouteStop, moveRouteStop } = useRoute()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    if (!name.trim()) {
      setError('Give the stop a name.')
      return
    }
    addRouteStop({
      name: name.trim(),
      date: '',
      arrivalTime: null,
      departureTime: null,
      distanceFromPrevKm: 0,
      notes: '',
      placesToVisit: [],
    })
    setName('')
    setError('')
    setShowForm(false)
  }

  return (
    <div className="route-map">
      <p className="route-map__disclaimer">
        <Icon name="route" size={14} />
        Stylized route overview — not a live map.
      </p>

      {routeStops.length === 0 ? (
        <EmptyState icon="route" title="No stops yet" description="Add your starting point to begin building the route." />
      ) : (
        <ol className="route-map__list">
          {routeStops.map((stop, index) => (
            <RouteStop
              key={stop.id}
              stop={stop}
              position={index + 1}
              isFirst={index === 0}
              isLast={index === routeStops.length - 1}
              onMoveUp={() => moveRouteStop(stop.id, 'up')}
              onMoveDown={() => moveRouteStop(stop.id, 'down')}
              onUpdate={(updates) => updateRouteStop(stop.id, updates)}
              onRemove={() => removeRouteStop(stop.id)}
            />
          ))}
        </ol>
      )}

      {showForm ? (
        <form className="route-map__add-form surface-card" onSubmit={handleAdd}>
          {error && <p className="route-stop__error">{error}</p>}
          <input
            autoFocus
            placeholder="Stop name, e.g. Chilas"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="route-map__add-actions">
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add stop</Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" onClick={() => setShowForm(true)}>
          <Icon name="plus" size={16} />
          Add stop
        </Button>
      )}
    </div>
  )
}
