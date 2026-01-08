import { useState } from "react";

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function addExpense(payload) {
    setExpenses(prev => [
      { id: generateId(), ...payload },
      ...prev,
    ]);
  }

  function updateExpense(id, payload) {
    setExpenses(prev =>
      prev.map(e => (e.id === id ? { ...e, ...payload } : e))
    );
  }

  function deleteExpense(id) {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }

  function getTotal() {
    return expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  }

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotal,
  };
}
