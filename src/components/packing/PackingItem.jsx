import Icon from '../common/Icon.jsx'
import './PackingItem.css'

export default function PackingItem({ item, friends, onToggle, onAssign, onRemove }) {
  return (
    <li className={`packing-item${item.checked ? ' packing-item--checked' : ''}`}>
      <button
        type="button"
        className="packing-item__checkbox"
        role="checkbox"
        aria-checked={item.checked}
        aria-label={`Mark ${item.name} as ${item.checked ? 'not packed' : 'packed'}`}
        onClick={onToggle}
      >
        {item.checked && <Icon name="check" size={13} />}
      </button>

      <span className="packing-item__name">{item.name}</span>

      <select
        className="packing-item__assign"
        value={item.assignedTo ?? ''}
        onChange={(e) => onAssign(e.target.value || null)}
        aria-label={`Assign ${item.name}`}
      >
        <option value="">Unassigned</option>
        {friends.map((f) => (
          <option key={f.id} value={f.id}>{f.name}</option>
        ))}
      </select>

      <button type="button" className="packing-item__remove" onClick={onRemove} aria-label={`Delete ${item.name}`}>
        <Icon name="trash" size={14} />
      </button>
    </li>
  )
}
