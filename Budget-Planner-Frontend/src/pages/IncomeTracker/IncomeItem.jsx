import { formatCurrency } from "../../utils/format";

export default function IncomeItem({ income, onEdit, onDelete }) {
  const id = income.id || income._id; 

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-50 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-700">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L12 22"
              stroke="#16a34a"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-800">
            {income.source}
          </div>
          <div className="text-xs text-gray-400">
            {income.date ? new Date(income.date).toLocaleDateString() : ""}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm font-medium text-gray-800">
          {formatCurrency(income.amount)}
        </div>

        <button
          type="button"               // ✅ prevents form submit
          onClick={() => onEdit(income)}
          className="px-3 py-1 rounded-md border text-sm"
        >
          Edit
        </button>

        <button
          type="button"              
          onClick={() => onDelete(id)}
          className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
