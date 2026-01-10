export function formatCurrency(value, currency = "USD") {
  const num = Number(value || 0);
  return num.toLocaleString(undefined, { style: "currency", currency });
}
