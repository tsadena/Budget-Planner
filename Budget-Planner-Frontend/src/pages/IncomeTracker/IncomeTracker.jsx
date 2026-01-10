import { useState } from "react";
import useIncome from "../../hooks/useIncome";
import IncomeList from "./IncomeList";
import IncomeForm from "./IncomeForm";
import { formatCurrency } from "../../utils/format";
import { useEffect } from "react";
import useDashboard from "../../hooks/useDashboard";
import IncomeMonthlyChart from "../../components/charts/IncomeMonthlyChart";

export default function IncomeTracker() {
  const { incomes, addIncome, updateIncome, removeIncome, getTotal } = useIncome();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { monthly } = useDashboard();
  useEffect(()=>{
    fetch("/api/incomes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    source: "Salary",
    amount: 5000,
    date: "2026-01-01"
  })
});
  },[])
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
      removeIncome(id);

  }

  return (
    <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 h-fit">
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
        <div>

      <IncomeMonthlyChart data={monthly} />
    </div>
    </div>
    
  );
}
