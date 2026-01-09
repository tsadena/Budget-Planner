
import { useEffect, useState } from "react";
import * as expenseSvc from "../services/expenseService";

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseSvc.fetchExpenses();
      // normalize id to `id` for UI
      const normalized = data.map(e => ({ ...e, id: e._id || e.id }));
      setExpenses(normalized);
    } catch (err) {
      setError(err.message || "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  async function addExpense(payload) {
    try {
      const created = await expenseSvc.postExpense(payload);
      setExpenses(prev => [{ ...created, id: created._id || created.id }, ...prev]);
      return created;
    } catch (err) {
      throw err;
    }
  }

  async function updateExpense(id, payload) {
    const updated = await expenseSvc.updateExpense(id, payload);
    setExpenses(prev => prev.map(e => (e.id === id ? { ...updated, id: updated._id || updated.id } : e)));
    return updated;
  }

  async function deleteExpense(id) {
    await expenseSvc.deleteExpense(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  useEffect(() => {
    load();
  }, []);

  function getTotal() {
    return expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  }

  return {
    expenses,
    loading,
    error,
    load,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
  };
}
