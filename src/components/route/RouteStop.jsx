import { useState } from "react";
import Icon from "../common/Icon.jsx";
import Button from "../common/Button.jsx";
import { formatShortDate, formatDistance } from "../../utils/formatters.js";
import "./RouteStop.css";

function toFormState(stop) {
  return {
    name: stop.name,
    date: stop.date ?? "",
    arrivalTime: stop.arrivalTime ?? "",
    departureTime: stop.departureTime ?? "",
    distanceFromPrevKm: stop.distanceFromPrevKm ?? 0,
    notes: stop.notes ?? "",
    placesToVisit: (stop.placesToVisit ?? []).join(", "),
  };
}

export default function RouteStop({
  stop,
  position,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onUpdate,
  onRemove,
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => toFormState(stop));
  const [error, setError] = useState("");

  const startEdit = () => {
    setForm(toFormState(stop));
    setError("");
    setEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Stop name is required.");
      return;
    }
    onUpdate({
      name: form.name.trim(),
      date: form.date,
      arrivalTime: form.arrivalTime || null,
      departureTime: form.departureTime || null,
      distanceFromPrevKm: Number(form.distanceFromPrevKm) || 0,
      notes: form.notes,
      placesToVisit: form.placesToVisit
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    });
    setEditing(false);
  };

  const roleLabel = isFirst
    ? "Start"
    : isLast
      ? "Destination"
      : `Stop ${position}`;

  return (
    <li className="route-stop">
      <div className="route-stop__rail" aria-hidden="true">
        <span
          className={`route-stop__marker${isFirst || isLast ? " route-stop__marker--endpoint" : ""}`}
        >
          {position}
        </span>
        {!isLast && <span className="route-stop__line" />}
      </div>

      <div className="route-stop__card surface-card">
        <div className="route-stop__header">
          <span className="route-stop__role">{roleLabel}</span>
          <div className="route-stop__actions">
            <button
              type="button"
              className="route-stop__icon-btn"
              onClick={onMoveUp}
              disabled={isFirst}
              aria-label="Move stop earlier"
            >
              <Icon name="arrowUp" size={15} />
            </button>
            <button
              type="button"
              className="route-stop__icon-btn"
              onClick={onMoveDown}
              disabled={isLast}
              aria-label="Move stop later"
            >
              <Icon name="arrowDown" size={15} />
            </button>
            <button
              type="button"
              className="route-stop__icon-btn"
              onClick={startEdit}
              aria-label="Edit stop"
            >
              <Icon name="edit" size={15} />
            </button>
            <button
              type="button"
              className="route-stop__icon-btn route-stop__icon-btn--danger"
              onClick={onRemove}
              aria-label="Remove stop"
            >
              <Icon name="trash" size={15} />
            </button>
          </div>
        </div>

        {editing ? (
          <form className="route-stop__form" onSubmit={handleSave}>
            {error && <p className="route-stop__error">{error}</p>}
            <label className="route-stop__field">
              <span>Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <div className="route-stop__field-row">
              <label className="route-stop__field">
                <span>Date</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>
              <label className="route-stop__field">
                <span>Distance from previous (km)</span>
                <input
                  type="number"
                  min="0"
                  value={form.distanceFromPrevKm}
                  onChange={(e) =>
                    setForm({ ...form, distanceFromPrevKm: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="route-stop__field-row">
              <label className="route-stop__field">
                <span>Arrival time</span>
                <input
                  value={form.arrivalTime}
                  onChange={(e) =>
                    setForm({ ...form, arrivalTime: e.target.value })
                  }
                  placeholder="e.g. 15:00"
                />
              </label>
              <label className="route-stop__field">
                <span>Departure time</span>
                <input
                  value={form.departureTime}
                  onChange={(e) =>
                    setForm({ ...form, departureTime: e.target.value })
                  }
                  placeholder="e.g. 08:00"
                />
              </label>
            </div>
            <label className="route-stop__field">
              <span>Places to visit (comma separated)</span>
              <input
                value={form.placesToVisit}
                onChange={(e) =>
                  setForm({ ...form, placesToVisit: e.target.value })
                }
              />
            </label>
            <label className="route-stop__field">
              <span>Notes</span>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>
            <div className="route-stop__form-actions">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="route-stop__name">{stop.name}</h3>
            <div className="route-stop__meta">
              {stop.date && (
                <span>
                  <Icon name="calendar" size={14} />
                  {formatShortDate(stop.date)}
                </span>
              )}
              {stop.arrivalTime && <span>Arrive {stop.arrivalTime}</span>}
              {stop.departureTime && <span>Depart {stop.departureTime}</span>}
              {stop.distanceFromPrevKm > 0 && (
                <span>
                  <Icon name="route" size={14} />
                  {formatDistance(stop.distanceFromPrevKm)}
                </span>
              )}
            </div>
            {stop.notes && <p className="route-stop__notes">{stop.notes}</p>}
            {stop.placesToVisit?.length > 0 && (
              <ul className="route-stop__places">
                {stop.placesToVisit.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </li>
  );
}
