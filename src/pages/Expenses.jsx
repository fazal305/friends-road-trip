import { useState } from "react";
import Icon from "../components/common/Icon.jsx";
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import ExpenseCard from "../components/expenses/ExpenseCard.jsx";
import ExpenseForm from "../components/expenses/ExpenseForm.jsx";
import ExpenseSummary from "../components/expenses/ExpenseSummary.jsx";
import SettlementList from "../components/expenses/SettlementList.jsx";
import { useExpenses } from "../hooks/useExpenses.js";
import { useTrip } from "../hooks/useTrip.js";
import { useConfirm } from "../hooks/useConfirm.jsx";
import { useToast } from "../hooks/useToast.jsx";
import "./Expenses.css";

export default function Expenses() {
  const {
    expenses,
    friends,
    friendsById,
    totals,
    paidByFriend,
    settlements,
    addExpense,
    updateExpense,
    removeExpense,
  } = useExpenses();
  const { trip } = useTrip();
  const { requestConfirm, confirmDialog } = useConfirm();
  const { showToast, toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const openAddModal = () => {
    setEditingExpense(null);
    setModalOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, values);
      showToast("Expense updated.");
    } else {
      addExpense(values);
      showToast("Expense added.");
    }
    setModalOpen(false);
  };

  if (friends.length === 0) {
    return (
      <EmptyState
        icon="expenses"
        title="Add friends first"
        description="Expenses are split between travelers — add friends on the Friends page before tracking costs."
      />
    );
  }

  return (
    <div className="expenses-page">
      <ExpenseSummary
        totals={totals}
        paidByFriend={paidByFriend}
        friends={friends}
        currency={trip.currency}
      />

      <section>
        <h2 className="expenses-page__section-title">Settle up</h2>
        <SettlementList settlements={settlements} currency={trip.currency} />
      </section>

      <section>
        <div className="expenses-page__list-header">
          <h2 className="expenses-page__section-title">All expenses</h2>
          <Button variant="primary" onClick={openAddModal}>
            <Icon name="plus" size={16} />
            Add expense
          </Button>
        </div>

        {expenses.length === 0 ? (
          <EmptyState
            icon="expenses"
            title="No expenses yet"
            description="Log your first shared cost to start tracking the budget."
          />
        ) : (
          <ul className="expenses-page__list">
            {expenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                payerName={friendsById[expense.paidBy]?.name ?? "Unknown"}
                currency={trip.currency}
                onEdit={() => openEditModal(expense)}
                onRemove={() =>
                  requestConfirm({
                    title: "Delete this expense?",
                    description: `"${expense.title}" will be removed and balances recalculated.`,
                    confirmLabel: "Delete",
                    onConfirm: () => removeExpense(expense.id),
                  })
                }
              />
            ))}
          </ul>
        )}
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingExpense ? "Edit expense" : "Add expense"}
      >
        <ExpenseForm
          expense={editingExpense}
          friends={friends}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
      {confirmDialog}
      {toast}
    </div>
  );
}
