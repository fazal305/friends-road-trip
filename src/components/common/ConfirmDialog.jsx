import Modal from './Modal.jsx'
import Button from './Button.jsx'
import './ConfirmDialog.css'

export default function ConfirmDialog({ open, title, description, confirmLabel = 'Delete', onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      {description && <p className="confirm-dialog__description">{description}</p>}
      <div className="confirm-dialog__actions">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  )
}
