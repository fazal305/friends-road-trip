import { useState } from 'react'
import Button from '../common/Button.jsx'
import { PLACE_CATEGORIES, PLACE_PRIORITIES } from '../../data/initialTrip.js'
import './PlaceForm.css'

function toFormState(place) {
  return {
    name: place?.name ?? '',
    location: place?.location ?? '',
    category: place?.category ?? PLACE_CATEGORIES[0],
    priority: place?.priority ?? 'medium',
    estimatedCost: place ? String(place.estimatedCost) : '',
    notes: place?.notes ?? '',
  }
}

export default function PlaceForm({ place, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => toFormState(place))
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return setError('Give the place a name.')
    const cost = Number(form.estimatedCost) || 0
    if (cost < 0) return setError('Estimated cost cannot be negative.')

    onSubmit({
      name: form.name.trim(),
      location: form.location.trim(),
      category: form.category,
      priority: form.priority,
      estimatedCost: cost,
      notes: form.notes.trim(),
    })
  }

  return (
    <form className="place-form" onSubmit={handleSubmit}>
      {error && <p className="place-form__error">{error}</p>}

      <label className="place-form__field">
        <span>Name</span>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Attabad Lake" />
      </label>

      <label className="place-form__field">
        <span>Location</span>
        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Hunza" />
      </label>

      <div className="place-form__row">
        <label className="place-form__field">
          <span>Category</span>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {PLACE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label className="place-form__field">
          <span>Priority</span>
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            {PLACE_PRIORITIES.map((p) => (
              <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="place-form__field">
        <span>Estimated cost</span>
        <input type="number" min="0" value={form.estimatedCost} onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })} />
      </label>

      <label className="place-form__field">
        <span>Notes (optional)</span>
        <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </label>

      <div className="place-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">{place ? 'Save changes' : 'Add place'}</Button>
      </div>
    </form>
  )
}
