import React from "react";
import useDashboard from "../../hooks/useDashboard";
import SummaryCards from "../../components/SummaryCards";
import RecentTransactions from "../../components/RecentTransactions";

export default function DashboardPage() {
  const { summary, recent, loading, error, refresh } = useDashboard();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div>
          <button onClick={refresh} className="px-3 py-1 border rounded">Refresh</button>
        </div>
      </div>

      {error && <div className="text-red-600">Error: {error}</div>}

      <SummaryCards
        totalBalance={summary?.totalBalance ?? 0}
        totalIncome={summary?.totalIncome ?? 0}
        totalExpenses={summary?.totalExpenses ?? 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <RecentTransactions transactions={recent} loading={loading} />
        </div>

        <div>
          {/* Placeholder for charts (donut, bar) — build later */}
          <div className="p-4 bg-white rounded-xl shadow">
            <div className="text-lg font-semibold mb-4">Financial Overview (charts)</div>
            <div className="text-sm text-gray-400">Charts will be added here (Recharts).</div>
          </div>
        </div>
      </div>
    </div>
  );
}
