import { useMemo } from "react";
import { useTripContext } from "../contexts/TripContext.jsx";
import {
  calculateBalances,
  calculateExpenseTotals,
  calculatePaidByFriend,
  calculateSettlements,
} from "../utils/calculations.js";

export function useExpenses() {
  const { state, actions } = useTripContext();
  const { expenses, friends } = state;

  const friendsById = useMemo(() => {
    const map = {};
    friends.forEach((f) => {
      map[f.id] = f;
    });
    return map;
  }, [friends]);

  const totals = useMemo(
    () => calculateExpenseTotals(expenses, friends.length),
    [expenses, friends.length],
  );
  const paidByFriend = useMemo(
    () => calculatePaidByFriend(expenses, friends),
    [expenses, friends],
  );
  const balances = useMemo(
    () => calculateBalances(expenses, friends),
    [expenses, friends],
  );
  const settlements = useMemo(
    () => calculateSettlements(balances, friendsById),
    [balances, friendsById],
  );

  return {
    expenses,
    friends,
    friendsById,
    totals,
    paidByFriend,
    balances,
    settlements,
    addExpense: actions.addExpense,
    updateExpense: actions.updateExpense,
    removeExpense: actions.removeExpense,
  };
}
