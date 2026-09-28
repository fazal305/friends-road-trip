import FriendAvatar from "../friends/FriendAvatar.jsx";
import { formatCurrency } from "../../utils/formatters.js";
import "./ExpenseSummary.css";

export default function ExpenseSummary({
  totals,
  paidByFriend,
  friends,
  currency,
}) {
  return (
    <div className="expense-summary">
      <div className="expense-summary__totals">
        <div className="expense-summary__total-card">
          <span className="expense-summary__label">Total trip cost</span>
          <span className="expense-summary__value">
            {formatCurrency(totals.total, currency)}
          </span>
        </div>
        <div className="expense-summary__total-card">
          <span className="expense-summary__label">Per person</span>
          <span className="expense-summary__value">
            {formatCurrency(totals.perPerson, currency)}
          </span>
        </div>
      </div>

      <div className="expense-summary__paid">
        <span className="expense-summary__paid-title">Who paid what</span>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <FriendAvatar
                name={friend.name}
                color={friend.avatarColor}
                size={32}
              />
              <span className="expense-summary__paid-name">{friend.name}</span>
              <span className="expense-summary__paid-amount">
                {formatCurrency(paidByFriend[friend.id] ?? 0, currency)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
