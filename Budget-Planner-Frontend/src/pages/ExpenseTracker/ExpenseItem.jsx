import { formatCurrency } from "../../utils/format";

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
      <div>
        <div className="font-medium">{expense.title}</div>
        <div className="text-sm text-gray-400">
          {expense.category} • {expense.date}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="font-medium text-black-600">
          {formatCurrency(expense.amount)}
        </div>
        <button className="px-3 py-1 rounded-md border text-sm" onClick={() => onEdit(expense)}>Edit</button>
        <button onClick={() => onDelete(expense.id)} className="px-3 py-1 rounded-md bg-red-600 text-white text-sm">
          Delete
        </button>
      </div>
    </div>
  );
}

