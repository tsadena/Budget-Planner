const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchIncomes() {
  const res = await fetch(`${API_BASE}/api/incomes`);
  if (!res.ok) throw new Error(`Incomes fetch failed: ${res.status}`);
  return res.json();
}

export async function postIncome(payload) {
  const res = await fetch(`${API_BASE}/api/incomes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to add income");
  return res.json();
}

export async function updateIncome(id, payload) {
  const res = await fetch(`${API_BASE}/api/incomes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update income");
  return res.json();
}

export async function deleteIncome(id) {
  const res = await fetch(`${API_BASE}/api/incomes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete income");
  return res.json();
}
