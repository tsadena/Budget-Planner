const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function handle(res, msg) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(msg || text || res.status);
  }
  return res.json();
}

export async function fetchIncomes() {
  const res = await fetch(`${API_BASE}/api/incomes`);
  return handle(res, "Incomes fetch failed");
}

export async function postIncome(payload) {
  const res = await fetch(`${API_BASE}/api/incomes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return handle(res, "Failed to add income");
}

export async function updateIncome(id, payload) {
  const res = await fetch(`${API_BASE}/api/incomes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return handle(res, "Failed to update income");
}

export async function deleteIncome(id) {
  const res = await fetch(`${API_BASE}/api/incomes/${id}`, {
    method: "DELETE"
  });
  return handle(res, "Failed to delete income");
}
