import { useState } from "react";
import Icon from "../common/Icon.jsx";
import Button from "../common/Button.jsx";
import { STOP_TYPE_META } from "../../utils/stopTypeMeta.js";
import { STOP_TYPES } from "../../data/initialTrip.js";
import "./TimelineItem.css";

function toFormState(stop) {
  return {
    time: stop.time ?? "",
    title: stop.title ?? "",
    type: stop.type ?? "note",
    notes: stop.notes ?? "",
  };
}

export default function TimelineItem({
  stop,
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

  const meta = STOP_TYPE_META[stop.type] ?? STOP_TYPE_META.note;

  const startEdit = () => {
    setForm(toFormState(stop));
    setError("");
    setEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Give this stop a title.");
      return;
    }
    onUpdate(form);
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="timeline-item timeline-item--editing">
        <form className="timeline-item__form" onSubmit={handleSave}>
          {error && <p className="timeline-item__error">{error}</p>}
          <div className="timeline-item__field-row">
            <label className="timeline-item__field">
              <span>Time</span>
              <input
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="08:00"
              />
            </label>
            <label className="timeline-item__field">
              <span>Type</span>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                {STOP_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {STOP_TYPE_META[type].label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="timeline-item__field">
            <span>Title</span>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <label className="timeline-item__field">
            <span>Notes</span>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>
          <div className="timeline-item__form-actions">
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
      </li>
    );
  }

  return (
    <li className="timeline-item">
      <div className="timeline-item__time-col">
        <span className="timeline-item__time">{stop.time || "—"}</span>
        <span
          className={`timeline-item__dot${isLast ? " timeline-item__dot--last" : ""}`}
          aria-hidden="true"
        />
      </div>

      <div className="timeline-item__body">
        <div className="timeline-item__icon">
          <Icon name={meta.icon} size={16} />
        </div>
        <div className="timeline-item__content">
          <span className="timeline-item__title">{stop.title}</span>
          {stop.notes && <p className="timeline-item__notes">{stop.notes}</p>}
        </div>
        <div className="timeline-item__actions">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label="Move stop earlier"
          >
            <Icon name="arrowUp" size={14} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            aria-label="Move stop later"
          >
            <Icon name="arrowDown" size={14} />
          </button>
          <button type="button" onClick={startEdit} aria-label="Edit stop">
            <Icon name="edit" size={14} />
          </button>
          <button
            type="button"
            className="timeline-item__danger"
            onClick={onRemove}
            aria-label="Delete stop"
          >
            <Icon name="trash" size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}
