import { useMemo, useState } from 'react'
import Icon from '../components/common/Icon.jsx'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import FoodCard from '../components/food/FoodCard.jsx'
import { useFood } from '../hooks/useFood.js'
import { useFriends } from '../hooks/useFriends.js'
import { useTrip } from '../hooks/useTrip.js'
import { useConfirm } from '../hooks/useConfirm.jsx'
import { useToast } from '../hooks/useToast.jsx'
import './Food.css'

export default function Food() {
  const { foodOptions, addFoodOption, removeFoodOption, voteFoodOption } = useFood()
  const { friends } = useFriends()
  const { trip } = useTrip()
  const { requestConfirm, confirmDialog } = useConfirm()
  const { showToast, toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', cuisine: '', estimatedCost: '', rating: '' })
  const [error, setError] = useState('')

  const maxVotes = useMemo(() => Math.max(0, ...foodOptions.map((o) => o.votes.length)), [foodOptions])

  const handleAdd = (event) => {
    event.preventDefault()
    if (!form.name.trim()) {
      setError('Give the restaurant a name.')
      return
    }
    addFoodOption({
      name: form.name.trim(),
      location: form.location.trim(),
      cuisine: form.cuisine.trim(),
      estimatedCost: Number(form.estimatedCost) || 0,
      rating: Number(form.rating) || 0,
      notes: '',
      votes: [],
    })
    setForm({ name: '', location: '', cuisine: '', estimatedCost: '', rating: '' })
    setError('')
    setShowForm(false)
    showToast('Restaurant added.')
  }

  return (
    <div className="food-page">
      {friends.length === 0 ? (
        <EmptyState icon="food" title="Add friends first" description="Voting needs travelers — add friends on the Friends page." />
      ) : foodOptions.length === 0 && !showForm ? (
        <EmptyState
          icon="food"
          title="No restaurant options yet"
          description="Add a place for the group to vote on."
          action={<Button variant="secondary" onClick={() => setShowForm(true)}><Icon name="plus" size={16} />Add restaurant</Button>}
        />
      ) : (
        <>
          <ul className="food-page__grid">
            {foodOptions.map((option) => (
              <FoodCard
                key={option.id}
                option={option}
                friends={friends}
                currency={trip.currency}
                isWinner={maxVotes > 0 && option.votes.length === maxVotes}
                onToggleVote={(friendId) => voteFoodOption(option.id, friendId)}
                onRemove={() =>
                  requestConfirm({
                    title: 'Remove this option?',
                    description: `"${option.name}" and its votes will be removed.`,
                    confirmLabel: 'Remove',
                    onConfirm: () => removeFoodOption(option.id),
                  })
                }
              />
            ))}
          </ul>

          {showForm ? (
            <form className="food-page__add-form surface-card" onSubmit={handleAdd}>
              {error && <p className="food-page__error">{error}</p>}
              <input autoFocus placeholder="Restaurant name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <div className="food-page__add-row">
                <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                <input placeholder="Cuisine" value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })} />
              </div>
              <div className="food-page__add-row">
                <input type="number" min="0" placeholder="Estimated cost" value={form.estimatedCost} onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })} />
                <input type="number" min="0" max="5" step="0.1" placeholder="Rating (0-5)" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
              </div>
              <div className="food-page__add-actions">
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Add restaurant</Button>
              </div>
            </form>
          ) : (
            <Button variant="secondary" onClick={() => setShowForm(true)}>
              <Icon name="plus" size={16} />
              Add restaurant
            </Button>
          )}
        </>
      )}
      {confirmDialog}
      {toast}
    </div>
  )
}
