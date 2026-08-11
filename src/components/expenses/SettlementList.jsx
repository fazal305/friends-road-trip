import Icon from '../common/Icon.jsx'
import { formatCurrency } from '../../utils/formatters.js'
import './SettlementList.css'

export default function SettlementList({ settlements, currency }) {
  if (settlements.length === 0) {
    return (
      <div className="settlement-list settlement-list--empty">
        <Icon name="check" size={18} />
        Everyone is settled up — no payments owed.
      </div>
    )
  }

  return (
    <ul className="settlement-list">
      {settlements.map((s) => (
        <li key={`${s.from}-${s.to}`} className="settlement-list__item">
          <span className="settlement-list__names">
            <strong>{s.fromName}</strong> owes <strong>{s.toName}</strong>
          </span>
          <span className="settlement-list__amount">{formatCurrency(s.amount, currency)}</span>
        </li>
      ))}
    </ul>
  )
}
