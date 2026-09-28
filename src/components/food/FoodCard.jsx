import Icon from "../common/Icon.jsx";
import FriendAvatar from "../friends/FriendAvatar.jsx";
import { formatCurrency } from "../../utils/formatters.js";
import "./FoodCard.css";

export default function FoodCard({
  option,
  friends,
  currency,
  isWinner,
  onToggleVote,
  onRemove,
}) {
  return (
    <li
      className={`food-card surface-card${isWinner ? " food-card--winner" : ""}`}
    >
      <div className="food-card__header">
        <div>
          <h3 className="food-card__name">
            {option.name}
            {isWinner && (
              <span className="food-card__winner-badge">Leading</span>
            )}
          </h3>
          {option.location && (
            <span className="food-card__location">{option.location}</span>
          )}
        </div>
        <button
          type="button"
          className="food-card__remove"
          onClick={onRemove}
          aria-label={`Remove ${option.name}`}
        >
          <Icon name="trash" size={14} />
        </button>
      </div>

      <div className="food-card__meta">
        {option.cuisine && <span>{option.cuisine}</span>}
        {option.estimatedCost > 0 && (
          <span>{formatCurrency(option.estimatedCost, currency)}</span>
        )}
        {option.rating > 0 && (
          <span className="food-card__rating">
            <Icon name="star" size={12} />
            {option.rating}
          </span>
        )}
      </div>

      {option.notes && <p className="food-card__notes">{option.notes}</p>}

      <div className="food-card__votes">
        <span className="food-card__vote-count">
          {option.votes.length} vote{option.votes.length === 1 ? "" : "s"}
        </span>
        <div className="food-card__voters">
          {friends.map((friend) => {
            const voted = option.votes.includes(friend.id);
            return (
              <button
                key={friend.id}
                type="button"
                className={`food-card__voter${voted ? " food-card__voter--active" : ""}`}
                onClick={() => onToggleVote(friend.id)}
                aria-pressed={voted}
                title={`${voted ? "Remove" : "Add"} ${friend.name}'s vote`}
              >
                <FriendAvatar
                  name={friend.name}
                  color={friend.avatarColor}
                  size={28}
                />
              </button>
            );
          })}
        </div>
      </div>
    </li>
  );
}
