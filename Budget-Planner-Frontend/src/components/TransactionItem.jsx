import React from "react";
import { formatCurrency } from "../utils/format";

export default function TransactionItem({ tx }) {
  const isIncome = tx.type === "income";
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${isIncome ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {isIncome ? "+" : "-"}
        </div>
        <div>
          <div className="font-medium">{tx.title || (tx.source ?? "Unknown")}</div>
          <div className="text-sm text-gray-400">{new Date(tx.date).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="text-right">
        <div className={`font-medium ${isIncome ? "text-green-600" : "text-red-600"}`}>
          {isIncome ? formatCurrency(tx.amount) : formatCurrency(tx.amount)}
        </div>
      </div>
    </div>
  );
}
