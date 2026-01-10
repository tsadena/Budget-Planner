import { useEffect, useState, useCallback } from "react";
import * as svc from "../services/dashboardService";

export default function useDashboard() {
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, r] = await Promise.all([svc.fetchSummary(), svc.fetchRecent()]);
      setSummary(s);
      setRecent(r);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return {
    summary,
    recent,
    loading,
    error,
    refresh: load
  };
}
