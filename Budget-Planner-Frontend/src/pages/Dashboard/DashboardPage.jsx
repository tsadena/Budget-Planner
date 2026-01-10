import React from "react";
import useDashboard from "../../hooks/useDashboard";
import SummaryCards from "../../components/SummaryCards";
import RecentTransactions from "../../components/RecentTransactions";
import DonutChart from "../../components/charts/DonutChart";
import MonthlyBarChart from "../../components/charts/MonthlyBarChart";
import IncomeTracker from "../IncomeTracker/IncomeTracker";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import GoalTracking from "../PremiumFeatures/GoalTracking";

export default function DashboardPage() {
  const { summary, recent, loading, error, refresh } = useDashboard();

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  if (!summary) {
    return <div className="p-6 text-gray-500">No dashboard data available.</div>;
  }

  return (
    
    <div className="space-y-8 p-6 w-full max-w-[1920px] mx-auto">
      
   
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div>
          <button 
            onClick={refresh} 
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="text-red-600 p-3 bg-red-50 rounded border border-red-100">Error: {error}</div>}

      
      <section className="w-full">
        <SummaryCards
          totalBalance={summary?.totalBalance ?? 0}
          totalIncome={summary?.totalIncome ?? 0}
          totalExpenses={summary?.totalExpenses ?? 0}
        />
      </section>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="w-full">
          <RecentTransactions transactions={recent} loading={loading} />
        </div>

        <div className="w-full">
          <section className="card bg-white p-4 rounded shadow h-full">
            <h3 className="font-medium text-lg mb-4">Financial Overview</h3>
            <div className="flex justify-center" style={{ height: 300 , minWidth: 0}}>
                <DonutChart
                totalIncome={summary?.totalIncome ?? 0}
                totalExpenses={summary?.totalExpenses ?? 0}
                />
            </div>
          </section>
        </div>
      </div>

      
      <section className="w-full bg-white rounded shadow p-4">
         <h3 className="font-medium text-lg mb-4">Monthly Analytics</h3>
         <MonthlyBarChart />
      </section>

      
      <section id="income-section" className="w-full">
        <IncomeTracker />
      </section>

      
      <section id="expense-section" className="w-full">
        <ExpenseTracker />
      </section>

      
      <section id="goals-section" className="w-full">
        <GoalTracking />
      </section>

    </div>
  );
}