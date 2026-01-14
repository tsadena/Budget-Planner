import { useEffect, useState } from "react";
import * as expenseSvc from "../services/expenseService";

function formatDateISO(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(); 
}

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseSvc.fetchExpenses();

      const normalized = data
        .map(e => {
          const rawDate = e.date || e.createdAt || e.created_at || null;
          const title =
            e.title ||
            e.name ||
            e.category ||
            e.description ||
            "Expense";

          return {
            ...e,
            id: e._id || e.id,
            title,
            category: e.category || e.category === "" ? e.category : (e.category || e.description || "Misc"),
            
            _rawDate: rawDate,
            
            date: formatDateISO(rawDate),
          };
        })
        
        .sort((a, b) => {
          const ta = new Date(a._rawDate || a.createdAt || 0).getTime();
          const tb = new Date(b._rawDate || b.createdAt || 0).getTime();
          return tb - ta;
        });

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

      const rawDate = created.date || created.createdAt || created.created_at || null;
      const title =
        created.title ||
        created.name ||
        created.category ||
        created.description ||
        "Expense";

      const normalized = {
        ...created,
        id: created._id || created.id,
        title,
        category: created.category || created.category === "" ? created.category : (created.category || created.description || "Misc"),
        _rawDate: rawDate,
        date: formatDateISO(rawDate),
      };

      setExpenses(prev => [normalized, ...prev]);
      return created;
    } catch (err) {
      throw err;
    }
  }

  async function updateExpense(id, payload) {
    const updated = await expenseSvc.updateExpense(id, payload);

    const rawDate = updated.date || updated.createdAt || updated.created_at || null;
    const title =
      updated.title ||
      updated.name ||
      updated.category ||
      updated.description ||
      "Expense";

    const normalized = {
      ...updated,
      id: updated._id || updated.id,
      title,
      category: updated.category || updated.description || "Misc",
      _rawDate: rawDate,
      date: formatDateISO(rawDate),
    };

    setExpenses(prev => prev.map(e => (e.id === id ? normalized : e)));
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
