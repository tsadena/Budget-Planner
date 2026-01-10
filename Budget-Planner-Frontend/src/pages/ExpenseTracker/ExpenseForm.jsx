import { useEffect, useState } from "react";
import CategorySelect from "../../components/CategorySelect";
export default function ExpenseForm({ open, onClose, onSave, initial }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setCategory(initial.category);
      setAmount(initial.amount);
      setDate(initial.date);
    } else {
      setTitle("");
      setCategory("General");
      setAmount("");
      setDate("");
    }
  }, [initial, open]);

  if (!open) return null;

  function submit(e) {
    e.preventDefault();
    if (!title || !amount) return;

    onSave({
      title,
      category,
      amount: Number(amount),
      date: date || new Date().toISOString().slice(0, 10),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <form onSubmit={submit} className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Expense</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <CategorySelect
            type="expense"
            value={category}
            onChange={setCategory}
            className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
