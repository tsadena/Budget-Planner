import React from "react";
import { formatCurrency } from "../utils/format";

export default function SummaryCards({ totalIncome = 0, totalExpenses = 0, totalBalance = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-xl shadow flex flex-col">
        <div className="text-sm text-gray-500">Total Balance</div>
        <div className="text-2xl font-bold mt-2">{formatCurrency(totalBalance)}</div>
      </div>

      <div className="p-4 bg-white rounded-xl shadow flex flex-col">
        <div className="text-sm text-gray-500">Total Income</div>
        <div className="text-2xl font-bold mt-2 text-green-600">{formatCurrency(totalIncome)}</div>
      </div>

      <div className="p-4 bg-white rounded-xl shadow flex flex-col">
        <div className="text-sm text-gray-500">Total Expenses</div>
        <div className="text-2xl font-bold mt-2 text-red-600">{formatCurrency(totalExpenses)}</div>
      </div>
    </div>
  );
}
