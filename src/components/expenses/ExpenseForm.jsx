import { useState } from "react";
import Button from "../common/Button.jsx";
import { EXPENSE_CATEGORIES } from "../../data/initialTrip.js";
import "./ExpenseForm.css";

function toFormState(expense, friends) {
  if (expense) {
    return {
      title: expense.title,
      category: expense.category,
      amount: String(expense.amount),
      paidBy: expense.paidBy,
      participants: expense.participants,
      splitType: expense.splitType,
      customSplits: Object.fromEntries(
        Object.entries(expense.customSplits ?? {}).map(([k, v]) => [
          k,
          String(v),
        ]),
      ),
      date: expense.date ?? "",
      notes: expense.notes ?? "",
    };
  }
  return {
    title: "",
    category: EXPENSE_CATEGORIES[0],
    amount: "",
    paidBy: friends[0]?.id ?? "",
    participants: friends.map((f) => f.id),
    splitType: "equal",
    customSplits: {},
    date: "",
    notes: "",
  };
}

export default function ExpenseForm({ expense, friends, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => toFormState(expense, friends));
  const [error, setError] = useState("");

  const toggleParticipant = (friendId) => {
    setForm((prev) => ({
      ...prev,
      participants: prev.participants.includes(friendId)
        ? prev.participants.filter((id) => id !== friendId)
        : [...prev.participants, friendId],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(form.amount);

    if (!form.title.trim()) return setError("Give the expense a title.");
    if (!Number.isFinite(amount) || amount <= 0)
      return setError("Amount must be a positive number.");
    if (!form.paidBy) return setError("Choose who paid.");
    if (form.participants.length === 0)
      return setError("Select at least one participant to split with.");

    let customSplits = {};
    if (form.splitType === "custom") {
      customSplits = Object.fromEntries(
        form.participants.map((id) => [id, Number(form.customSplits[id]) || 0]),
      );
      const total = Object.values(customSplits).reduce((sum, v) => sum + v, 0);
      if (Math.round(total) !== Math.round(amount)) {
        return setError(
          `Custom split totals ${total.toLocaleString()}, but the amount is ${amount.toLocaleString()}.`,
        );
      }
    }

    onSubmit({
      title: form.title.trim(),
      category: form.category,
      amount,
      paidBy: form.paidBy,
      participants: form.participants,
      splitType: form.splitType,
      customSplits,
      date: form.date,
      notes: form.notes.trim(),
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      {error && <p className="expense-form__error">{error}</p>}

      <label className="expense-form__field">
        <span>Title</span>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Fuel to Naran"
        />
      </label>

      <div className="expense-form__row">
        <label className="expense-form__field">
          <span>Category</span>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label className="expense-form__field">
          <span>Amount</span>
          <input
            type="number"
            min="0"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </label>
      </div>

      <div className="expense-form__row">
        <label className="expense-form__field">
          <span>Paid by</span>
          <select
            value={form.paidBy}
            onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
          >
            {friends.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
        <label className="expense-form__field">
          <span>Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </label>
      </div>

      <fieldset className="expense-form__field">
        <legend>Split between</legend>
        <div className="expense-form__participants">
          {friends.map((f) => (
            <label key={f.id} className="expense-form__checkbox">
              <input
                type="checkbox"
                checked={form.participants.includes(f.id)}
                onChange={() => toggleParticipant(f.id)}
              />
              {f.name}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="expense-form__field">
        <span>Split type</span>
        <select
          value={form.splitType}
          onChange={(e) => setForm({ ...form, splitType: e.target.value })}
        >
          <option value="equal">Split equally</option>
          <option value="custom">Custom amounts</option>
        </select>
      </label>

      {form.splitType === "custom" && (
        <div className="expense-form__custom-splits">
          {form.participants.map((friendId) => {
            const friend = friends.find((f) => f.id === friendId);
            return (
              <label
                key={friendId}
                className="expense-form__field expense-form__field--inline"
              >
                <span>{friend?.name}</span>
                <input
                  type="number"
                  min="0"
                  value={form.customSplits[friendId] ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      customSplits: {
                        ...form.customSplits,
                        [friendId]: e.target.value,
                      },
                    })
                  }
                />
              </label>
            );
          })}
        </div>
      )}

      <label className="expense-form__field">
        <span>Notes (optional)</span>
        <textarea
          rows={2}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </label>

      <div className="expense-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {expense ? "Save changes" : "Add expense"}
        </Button>
      </div>
    </form>
  );
}
