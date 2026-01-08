import { useCategoryContext } from "../context/CategoryContext";

export default function CategorySelect({ type, value, onChange }) {
  const { categories } = useCategoryContext();

  const filtered = categories.filter(
    c => c.type === type || c.type === "both"
  );

  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    >
      <option value="">Select Category</option>
      {filtered.map(c => (
        <option key={c.id} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
