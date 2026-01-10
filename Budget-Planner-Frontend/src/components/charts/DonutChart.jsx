import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1CBABD", "#ef4444"]; // income, expense

export default function DonutChart({ totalIncome, totalExpenses }) {
  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ];

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `$${value}`} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center text */}
      <div
        style={{
          position: "relative",
          top: "-185px",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p style={{ fontSize: 12, color: "#6b7280" }}>Total Balance</p>
        <h2 style={{ margin: 0 }}>${totalBalance}</h2>
      </div>
    </div>
  );
}
