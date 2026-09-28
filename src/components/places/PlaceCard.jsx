import Icon from "../common/Icon.jsx";
import { formatCurrency } from "../../utils/formatters.js";
import "./PlaceCard.css";

const PRIORITY_LABEL = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
};

export default function PlaceCard({
  place,
  currency,
  onToggleVisited,
  onToggleFavorite,
  onEdit,
  onRemove,
}) {
  return (
    <li
      className={`place-card surface-card${place.visited ? " place-card--visited" : ""}`}
    >
      <div className="place-card__header">
        <span
          className={`place-card__priority place-card__priority--${place.priority}`}
        >
          {PRIORITY_LABEL[place.priority]}
        </span>
        <button
          type="button"
          className={`place-card__favorite${place.favorite ? " place-card__favorite--active" : ""}`}
          onClick={onToggleFavorite}
          aria-pressed={place.favorite}
          aria-label={place.favorite ? "Unfavorite" : "Favorite"}
        >
          <Icon name="star" size={16} />
        </button>
      </div>

      <h3 className="place-card__name">{place.name}</h3>
      {place.location && (
        <span className="place-card__location">
          <Icon name="places" size={13} />
          {place.location}
        </span>
      )}

      <div className="place-card__meta">
        <span className="place-card__category">{place.category}</span>
        {place.estimatedCost > 0 && (
          <span>{formatCurrency(place.estimatedCost, currency)}</span>
        )}
      </div>

      {place.notes && <p className="place-card__notes">{place.notes}</p>}

      <div className="place-card__footer">
        <button
          type="button"
          className="place-card__visited"
          onClick={onToggleVisited}
        >
          <Icon name={place.visited ? "check" : "route"} size={14} />
          {place.visited ? "Visited" : "Mark visited"}
        </button>
        <div className="place-card__actions">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${place.name}`}
          >
            <Icon name="edit" size={14} />
          </button>
          <button
            type="button"
            className="place-card__danger"
            onClick={onRemove}
            aria-label={`Delete ${place.name}`}
          >
            <Icon name="trash" size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}
