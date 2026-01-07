import IncomeItem from "./IncomeItem";

export default function IncomeList({ incomes, onEdit, onDelete }) {
  if (!incomes || incomes.length === 0) {
    return <div className="text-gray-500 p-4">No income records yet.</div>;
  }

  return (
    <div className="space-y-3">
      {incomes.map(item => (
        <IncomeItem key={item.id} income={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
