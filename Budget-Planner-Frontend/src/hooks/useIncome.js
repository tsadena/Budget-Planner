
import { useEffect, useState } from "react";
import * as incomeSvc from "../services/incomeService";

export default function useIncome() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const data = await incomeSvc.fetchIncomes();
      setIncomes(data.map(i => ({ ...i, id: i._id || i.id })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addIncome(payload) {
    const created = await incomeSvc.postIncome(payload);
    setIncomes(prev => [{ ...created, id: created._id || created.id }, ...prev]);
    return created;
  }

  useEffect(() => {
    load();
  }, []);

  function getTotal() {
    return incomes.reduce((s, i) => s + Number(i.amount || 0), 0);
  }

  return { incomes, loading, error, load, addIncome, getTotal };
}
