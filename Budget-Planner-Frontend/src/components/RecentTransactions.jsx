import React from "react";
import TransactionItem from "./TransactionItem";

export default function RecentTransactions({ transactions = [], loading = false }) {
  if (loading) {
    return <div className="p-4">Loading recent transactions...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div className="p-4 text-gray-500">No recent transactions.</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
      </div>

      {transactions.map(tx => (
        <TransactionItem key={`${tx.type}-${tx.date}-${tx.amount}`} tx={tx} />
      ))}
    </div>
  );
}
