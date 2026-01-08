import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p className="text-gray-400">No expenses yet</p>;
  }

  return (
    <div className="space-y-3">
      {expenses.map(e => (
        <ExpenseItem
          key={e.id}
          expense={e}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
