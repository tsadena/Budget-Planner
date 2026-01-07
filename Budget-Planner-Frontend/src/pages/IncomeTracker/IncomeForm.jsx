import { useState, useEffect } from "react";

export default function IncomeForm({ open, onClose, onSave, initial }) {
  const [source, setSource] = useState(initial?.source || "");
  const [amount, setAmount] = useState(initial?.amount ?? "");
  const [date, setDate] = useState(initial?.date || "");

  useEffect(() => {
    if (initial) {
      setSource(initial.source || "");
      setAmount(initial.amount ?? "");
      setDate(initial.date || "");
    } else {
      setSource("");
      setAmount("");
      setDate("");
    }
  }, [initial, open]);

  if (!open) return null;

  function submit(e) {
    e.preventDefault();
    const amt = Number(amount);
    if (!source || !amt || amt <= 0) return;
    onSave({ source: source.trim(), amount: amt, date: date || new Date().toISOString().slice(0,10) });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <form onSubmit={submit} className="w-full max-w-md bg-white dark:bg-white-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Add / Edit Income</h3>

        <label className="block text-sm text-black-600 dark:text-black-300">Source</label>
        <input value={source} onChange={e => setSource(e.target.value)} className="w-full px-3 py-2 rounded-md border mt-1 mb-3" />

        <label className="block text-sm text-black-600 dark:text-black-300">Amount</label>
        <input value={amount} onChange={e => setAmount(e.target.value)} type="number" step="0.01" className="w-full px-3 py-2 rounded-md border mt-1 mb-3" />

        <label className="block text-sm text-black-600 dark:text-black-300">Date</label>
        <input value={date} onChange={e => setDate(e.target.value)} type="date" className="w-full px-3 py-2 rounded-md border mt-1 mb-4" />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-md bg-sky-600 text-white">Save</button>
        </div>
      </form>
    </div>
  );
}
