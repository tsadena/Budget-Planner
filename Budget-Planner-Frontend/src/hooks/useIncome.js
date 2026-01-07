import { useState, useEffect } from "react";

const STORAGE_KEY = "bulga_incomes_v1";

export default function useIncome() {
  const [incomes, setIncomes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incomes));
    } catch {}
  }, [incomes]);

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function addIncome(payload) {
    const record = { id: generateId(), ...payload };
    setIncomes(prev => [record, ...prev]);
    return record;
  }

  function updateIncome(id, payload) {
    setIncomes(prev => prev.map(i => (i.id === id ? { ...i, ...payload } : i)));
  }

  function deleteIncome(id) {
    setIncomes(prev => prev.filter(i => i.id !== id));
  }

  function getTotal() {
    return incomes.reduce((s, i) => s + Number(i.amount || 0), 0);
  }

  return { incomes, addIncome, updateIncome, deleteIncome, getTotal };
}
