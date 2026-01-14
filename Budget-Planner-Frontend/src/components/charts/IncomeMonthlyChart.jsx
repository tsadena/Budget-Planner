import { useEffect } from "react";
import useDashboard from "../../hooks/useDashboard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function IncomeMonthlyChart() {
  const { monthly, loadMonthly, monthlyLoading, monthlyError } = useDashboard();

  useEffect(() => {
    loadMonthly();
  }, [loadMonthly]);

  if (monthlyLoading) return <p>Loading income chart...</p>;
  if (monthlyError) return <p>{monthlyError}</p>;
  if (!monthly || monthly.length === 0) return <p>No income data</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Monthly Income</h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="income"
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
