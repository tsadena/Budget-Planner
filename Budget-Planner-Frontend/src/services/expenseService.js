
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchExpenses() {
  const res = await fetch(`${API_BASE}/api/expenses`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Expenses fetch failed: ${res.status}`);
  return res.json();
}

export async function postExpense(payload) {
  const res = await fetch(`${API_BASE}/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to add expense (${res.status}) ${text}`);
  }
  return res.json();
}

export async function updateExpense(id, payload) {
  const res = await fetch(`${API_BASE}/api/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update expense");
  return res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE}/api/expenses/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to delete expense (${res.status}) ${text}`);
  }
  return res.json();
}
