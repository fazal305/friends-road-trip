import Icon from '../common/Icon.jsx'
import { EXPENSE_CATEGORY_ICON } from '../../utils/expenseCategoryMeta.js'
import { formatCurrency, formatShortDate } from '../../utils/formatters.js'
import './ExpenseCard.css'

export default function ExpenseCard({ expense, payerName, currency, onEdit, onRemove }) {
  return (
    <li className="expense-card surface-card">
      <div className="expense-card__icon">
        <Icon name={EXPENSE_CATEGORY_ICON[expense.category] ?? 'notes'} size={18} />
      </div>

      <div className="expense-card__content">
        <div className="expense-card__top">
          <span className="expense-card__title">{expense.title}</span>
          <span className="expense-card__amount">{formatCurrency(expense.amount, currency)}</span>
        </div>
        <div className="expense-card__meta">
          <span>{expense.category}</span>
          <span>·</span>
          <span>Paid by {payerName}</span>
          {expense.date && (
            <>
              <span>·</span>
              <span>{formatShortDate(expense.date)}</span>
            </>
          )}
          <span>·</span>
          <span>{expense.participants.length} people</span>
        </div>
        {expense.notes && <p className="expense-card__notes">{expense.notes}</p>}
      </div>

      <div className="expense-card__actions">
        <button type="button" onClick={onEdit} aria-label={`Edit ${expense.title}`}>
          <Icon name="edit" size={15} />
        </button>
        <button type="button" className="expense-card__danger" onClick={onRemove} aria-label={`Delete ${expense.title}`}>
          <Icon name="trash" size={15} />
        </button>
      </div>
    </li>
  )
}
