import { useState } from "react";
import Icon from "../common/Icon.jsx";
import Button from "../common/Button.jsx";
import FriendAvatar from "./FriendAvatar.jsx";
import { FRIEND_ROLES } from "../../data/initialTrip.js";
import "./FriendCard.css";

export default function FriendCard({
  friend,
  onUpdate,
  onRemove,
  onConfirmRsvp,
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: friend.name,
    role: friend.role,
    phone: friend.phone ?? "",
  });
  const [error, setError] = useState("");

  const startEdit = () => {
    setForm({
      name: friend.name,
      role: friend.role,
      phone: friend.phone ?? "",
    });
    setError("");
    setEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    onUpdate({
      name: form.name.trim(),
      role: form.role,
      phone: form.phone.trim(),
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="friend-card friend-card--editing surface-card">
        <form className="friend-card__form" onSubmit={handleSave}>
          {error && <p className="friend-card__error">{error}</p>}
          <label className="friend-card__field">
            <span>Name</span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="friend-card__field">
            <span>Role</span>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              {FRIEND_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <label className="friend-card__field">
            <span>Contact (optional)</span>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone or email"
            />
          </label>
          <div className="friend-card__form-actions">
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
    <li className="friend-card surface-card">
      <div className="friend-card__top">
        <FriendAvatar name={friend.name} color={friend.avatarColor} />
        <div className="friend-card__identity">
          <span className="friend-card__name">{friend.name}</span>
          <span className="friend-card__role">{friend.role}</span>
        </div>
        <div className="friend-card__actions">
          <button
            type="button"
            onClick={startEdit}
            aria-label={`Edit ${friend.name}`}
          >
            <Icon name="edit" size={15} />
          </button>
          <button
            type="button"
            className="friend-card__danger"
            onClick={onRemove}
            aria-label={`Remove ${friend.name}`}
          >
            <Icon name="trash" size={15} />
          </button>
        </div>
      </div>

      {friend.phone && <p className="friend-card__contact">{friend.phone}</p>}

      {friend.rsvp === "confirmed" ? (
        <span className="friend-card__rsvp friend-card__rsvp--confirmed">
          <Icon name="check" size={13} />
          Confirmed
        </span>
      ) : (
        <button
          type="button"
          className="friend-card__rsvp friend-card__rsvp--pending"
          onClick={onConfirmRsvp}
        >
          I'm in for the trip!
        </button>
      )}
    </li>
  );
}
