import { useState } from "react";
import useIncome from "../../hooks/useIncome";
import IncomeList from "./IncomeList";
import IncomeForm from "./IncomeForm";
import { formatCurrency } from "../../utils/format";

export default function IncomeTracker() {
  const { incomes, addIncome, updateIncome, deleteIncome, getTotal } = useIncome();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  function handleAddClick() {
    setEditItem(null);
    setShowForm(true);
  }

  function handleSave(payload) {
    if (editItem) {
      updateIncome(editItem.id, payload);
    } else {
      addIncome(payload);
    }
  }

  function handleEdit(item) {
    setEditItem(item);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (!confirm("Delete this income?")) return;
    deleteIncome(id);
  }

  return (
    <div className="p-6 bg-white dark:bg-white-800 rounded-2xl shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Income Tracker</h2>
        <div className="text-sm text-gray-500">Total Income</div>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold">{formatCurrency(getTotal())}</div>
      </div>

      <div className="mb-6">
        <IncomeList incomes={incomes} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <div>
        <button onClick={handleAddClick} className="w-full py-3 rounded-full bg-black text-white">+ Add Income</button>
      </div>

      <IncomeForm open={showForm} onClose={() => setShowForm(false)} onSave={handleSave} initial={editItem} />
    </div>
  );
}
