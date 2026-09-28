import { useMemo, useState } from "react";
import Icon from "../common/Icon.jsx";
import Button from "../common/Button.jsx";
import EmptyState from "../common/EmptyState.jsx";
import PackingItem from "./PackingItem.jsx";
import { usePacking } from "../../hooks/usePacking.js";
import { useFriends } from "../../hooks/useFriends.js";
import { PACKING_CATEGORIES } from "../../data/initialTrip.js";
import "./PackingList.css";

export default function PackingList() {
  const {
    packingItems,
    addPackingItem,
    togglePackingItem,
    removePackingItem,
    assignPackingItem,
  } = usePacking();
  const { friends } = useFriends();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: PACKING_CATEGORIES[0],
    assignedTo: "",
  });
  const [error, setError] = useState("");

  const grouped = useMemo(() => {
    const map = {};
    PACKING_CATEGORIES.forEach((cat) => {
      map[cat] = [];
    });
    packingItems.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [packingItems]);

  const packedCount = packingItems.filter((i) => i.checked).length;

  const handleAdd = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Give the item a name.");
      return;
    }
    addPackingItem({
      name: form.name.trim(),
      category: form.category,
      assignedTo: form.assignedTo || null,
    });
    setForm({ name: "", category: form.category, assignedTo: "" });
    setError("");
    setShowForm(false);
  };

  if (packingItems.length === 0 && !showForm) {
    return (
      <EmptyState
        icon="packing"
        title="Nothing on the list yet"
        description="Add the first thing the group needs to pack."
        action={
          <Button variant="secondary" onClick={() => setShowForm(true)}>
            <Icon name="plus" size={16} />
            Add item
          </Button>
        }
      />
    );
  }

  return (
    <div className="packing-list">
      <p className="packing-list__progress">
        {packedCount} of {packingItems.length} packed
      </p>

      {PACKING_CATEGORIES.filter((cat) => grouped[cat]?.length > 0).map(
        (category) => (
          <div className="packing-list__group surface-card" key={category}>
            <h3 className="packing-list__group-title">{category}</h3>
            <ul>
              {grouped[category].map((item) => (
                <PackingItem
                  key={item.id}
                  item={item}
                  friends={friends}
                  onToggle={() => togglePackingItem(item.id)}
                  onAssign={(friendId) => assignPackingItem(item.id, friendId)}
                  onRemove={() => removePackingItem(item.id)}
                />
              ))}
            </ul>
          </div>
        ),
      )}

      {showForm ? (
        <form
          className="packing-list__add-form surface-card"
          onSubmit={handleAdd}
        >
          {error && <p className="packing-list__error">{error}</p>}
          <input
            autoFocus
            placeholder="Item name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <div className="packing-list__add-row">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {PACKING_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            >
              <option value="">Unassigned</option>
              {friends.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <div className="packing-list__add-actions">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add item
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="secondary" onClick={() => setShowForm(true)}>
          <Icon name="plus" size={16} />
          Add item
        </Button>
      )}
    </div>
  );
}
