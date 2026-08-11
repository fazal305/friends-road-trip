/**
 * Pure calculation helpers for expenses and fuel. Kept dependency-free and
 * side-effect-free so they're easy to reason about and reuse from any hook.
 */

/** Per-expense share for a given participant, respecting split type. */
export function expenseShareFor(expense, friendId) {
  if (!expense.participants.includes(friendId)) return 0
  if (expense.splitType === 'custom') {
    return Number(expense.customSplits?.[friendId]) || 0
  }
  const count = expense.participants.length || 1
  return expense.amount / count
}

export function calculateExpenseTotals(expenses, friendCount) {
  const total = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
  const perPerson = friendCount > 0 ? total / friendCount : 0
  return { total, perPerson }
}

/** Total paid by each friend, across all expenses. */
export function calculatePaidByFriend(expenses, friends) {
  const map = {}
  friends.forEach((f) => { map[f.id] = 0 })
  expenses.forEach((e) => {
    if (map[e.paidBy] === undefined) map[e.paidBy] = 0
    map[e.paidBy] += Number(e.amount) || 0
  })
  return map
}

/** Net balance per friend: positive = owed money by the group, negative = owes the group. */
export function calculateBalances(expenses, friends) {
  const balances = {}
  friends.forEach((f) => { balances[f.id] = 0 })

  expenses.forEach((expense) => {
    if (balances[expense.paidBy] === undefined) balances[expense.paidBy] = 0
    balances[expense.paidBy] += Number(expense.amount) || 0

    expense.participants.forEach((friendId) => {
      if (balances[friendId] === undefined) balances[friendId] = 0
      balances[friendId] -= expenseShareFor(expense, friendId)
    })
  })

  return balances
}

/**
 * Greedy debt simplification: matches the largest debtor against the
 * largest creditor repeatedly until all balances are settled.
 */
export function calculateSettlements(balances, friendsById) {
  const epsilon = 0.5 // ignore rounding dust below half a currency unit
  const creditors = []
  const debtors = []

  Object.entries(balances).forEach(([friendId, amount]) => {
    if (amount > epsilon) creditors.push({ friendId, amount })
    else if (amount < -epsilon) debtors.push({ friendId, amount: -amount })
  })

  creditors.sort((a, b) => b.amount - a.amount)
  debtors.sort((a, b) => b.amount - a.amount)

  const settlements = []
  let ci = 0
  let di = 0

  while (ci < creditors.length && di < debtors.length) {
    const creditor = creditors[ci]
    const debtor = debtors[di]
    const amount = Math.min(creditor.amount, debtor.amount)

    if (amount > epsilon) {
      settlements.push({
        from: debtor.friendId,
        fromName: friendsById[debtor.friendId]?.name ?? 'Unknown',
        to: creditor.friendId,
        toName: friendsById[creditor.friendId]?.name ?? 'Unknown',
        amount: Math.round(amount),
      })
    }

    creditor.amount -= amount
    debtor.amount -= amount

    if (creditor.amount <= epsilon) ci += 1
    if (debtor.amount <= epsilon) di += 1
  }

  return settlements
}

/** Fuel required and its cost for a given distance/efficiency/price. */
export function estimateFuel(distanceKm, efficiencyKmPerLiter, pricePerLiter) {
  const distance = Number(distanceKm) || 0
  const efficiency = Number(efficiencyKmPerLiter) || 0
  const price = Number(pricePerLiter) || 0

  if (efficiency <= 0) return { liters: 0, cost: 0 }

  const liters = distance / efficiency
  const cost = liters * price
  return { liters, cost }
}
