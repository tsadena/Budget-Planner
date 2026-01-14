import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import * as svc from "../../services/dashboardService";

export default function MonthlyBarChart({ autoLoad = true }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!autoLoad) return;
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const d = await svc.fetchMonthly();
      setData(d);
    } catch (err) {
      setError(err.message || "Failed to load monthly data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div className="text-red-600">Chart error: {error}</div>;
  if (!data || data.length === 0) return <div>No monthly data yet.</div>;

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#1CBABD" />
          <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
