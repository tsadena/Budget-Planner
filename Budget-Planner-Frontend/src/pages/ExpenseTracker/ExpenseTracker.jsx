import { useState } from "react";
import useExpenses from "../../hooks/useExpense";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import { formatCurrency } from "../../utils/format";

export default function ExpenseTracker() {
  const { expenses, addExpense, updateExpense, deleteExpense, getTotal } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  function saveExpense(data) {
    editing ? updateExpense(editing.id, data) : addExpense(data);
  }

  return (
    <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 h-fit">
      <h2 className="text-xl font-semibold mb-2">Expense Tracker</h2>
      <div className="text-2xl font-bold mb-6 text-black-600">
        {formatCurrency(getTotal())}
      </div>

      <ExpenseList
        expenses={expenses}
        onEdit={e => { setEditing(e); setShowForm(true); }}
        onDelete={deleteExpense}
      />

      <button
        onClick={() => { setEditing(null); setShowForm(true); }}
        className="mt-6 w-full py-3 bg-black text-white rounded-full"
      >
        + Add Expense
      </button>

      <ExpenseForm
        open={showForm}
        initial={editing}
        onClose={() => setShowForm(false)}
        onSave={saveExpense}
      />
    </div>
  );
}
