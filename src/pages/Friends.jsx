import { useState } from "react";
import Icon from "../components/common/Icon.jsx";
import Button from "../components/common/Button.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import FriendCard from "../components/friends/FriendCard.jsx";
import { useFriends } from "../hooks/useFriends.js";
import { useConfirm } from "../hooks/useConfirm.jsx";
import { useToast } from "../hooks/useToast.jsx";
import { FRIEND_ROLES } from "../data/initialTrip.js";
import "./Friends.css";

const AVATAR_COLORS = [
  "#ff6b35",
  "#60a5fa",
  "#4ade80",
  "#ffb84d",
  "#f87171",
  "#2dd4bf",
  "#a78bfa",
];

export default function Friends() {
  const { friends, addFriend, updateFriend, removeFriend, confirmRsvp } =
    useFriends();
  const { requestConfirm, confirmDialog } = useConfirm();
  const { showToast, toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Passenger", phone: "" });
  const [error, setError] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Give your friend a name.");
      return;
    }
    addFriend({
      name: form.name.trim(),
      role: form.role,
      phone: form.phone.trim(),
      avatarColor: AVATAR_COLORS[friends.length % AVATAR_COLORS.length],
      rsvp: "pending",
    });
    setForm({ name: "", role: "Passenger", phone: "" });
    setError("");
    setShowForm(false);
    showToast("Friend added.");
  };

  return (
    <div className="friends-page">
      {friends.length === 0 ? (
        <EmptyState
          icon="friends"
          title="No one added yet"
          description="Add the first friend joining this trip."
        />
      ) : (
        <ul className="friends-page__grid">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onUpdate={(updates) => updateFriend(friend.id, updates)}
              onRemove={() =>
                requestConfirm({
                  title: "Remove friend?",
                  description: `${friend.name} will be removed from the trip and any expense splits.`,
                  confirmLabel: "Remove",
                  onConfirm: () => removeFriend(friend.id),
                })
              }
              onConfirmRsvp={() => confirmRsvp(friend.id)}
            />
          ))}
        </ul>
      )}

      {showForm ? (
        <form
          className="friends-page__add-form surface-card"
          onSubmit={handleAdd}
        >
          {error && <p className="friend-card__error">{error}</p>}
          <div className="friends-page__add-row">
            <input
              autoFocus
              placeholder="Friend name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
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
          </div>
          <input
            placeholder="Contact (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <div className="friends-page__add-actions">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add friend
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" onClick={() => setShowForm(true)}>
          <Icon name="plus" size={16} />
          Add friend
        </Button>
      )}
      {confirmDialog}
      {toast}
    </div>
  );
}
