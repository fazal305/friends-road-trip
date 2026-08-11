import { useState } from 'react'
import Icon from '../components/common/Icon.jsx'
import Button from '../components/common/Button.jsx'
import Modal from '../components/common/Modal.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import PlaceCard from '../components/places/PlaceCard.jsx'
import PlaceForm from '../components/places/PlaceForm.jsx'
import { usePlaces } from '../hooks/usePlaces.js'
import { useTrip } from '../hooks/useTrip.js'
import { useConfirm } from '../hooks/useConfirm.jsx'
import './Places.css'

export default function Places() {
  const { places, addPlace, updatePlace, removePlace, togglePlaceVisited, togglePlaceFavorite } = usePlaces()
  const { trip } = useTrip()
  const { requestConfirm, confirmDialog } = useConfirm()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPlace, setEditingPlace] = useState(null)

  const openAdd = () => { setEditingPlace(null); setModalOpen(true) }
  const openEdit = (place) => { setEditingPlace(place); setModalOpen(true) }

  const handleSubmit = (values) => {
    if (editingPlace) updatePlace(editingPlace.id, values)
    else addPlace(values)
    setModalOpen(false)
  }

  return (
    <div className="places-page">
      <div className="places-page__header">
        <p className="places-page__count">{places.length} place{places.length === 1 ? '' : 's'} on the wishlist</p>
        <Button variant="primary" onClick={openAdd}>
          <Icon name="plus" size={16} />
          Add place
        </Button>
      </div>

      {places.length === 0 ? (
        <EmptyState icon="places" title="No places yet" description="Add somewhere the group wants to visit." />
      ) : (
        <ul className="places-page__grid">
          {places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              currency={trip.currency}
              onToggleVisited={() => togglePlaceVisited(place.id)}
              onToggleFavorite={() => togglePlaceFavorite(place.id)}
              onEdit={() => openEdit(place)}
              onRemove={() =>
                requestConfirm({
                  title: 'Remove this place?',
                  description: `"${place.name}" will be removed from the wishlist.`,
                  confirmLabel: 'Remove',
                  onConfirm: () => removePlace(place.id),
                })
              }
            />
          ))}
        </ul>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingPlace ? 'Edit place' : 'Add place'}>
        <PlaceForm place={editingPlace} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
      </Modal>
      {confirmDialog}
    </div>
  )
}
