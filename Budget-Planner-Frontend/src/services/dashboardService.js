const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchSummary() {
  const res = await fetch(`${API_BASE}/api/dashboard/summary`);
  if (!res.ok) throw new Error(`Summary fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchRecent() {
  const res = await fetch(`${API_BASE}/api/dashboard/recent`);
  if (!res.ok) throw new Error(`Recent fetch failed: ${res.status}`);
  return res.json();
}
