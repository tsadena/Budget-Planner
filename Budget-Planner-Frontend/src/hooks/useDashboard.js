import { useEffect, useState, useCallback, useRef } from "react";
import * as svc from "../services/dashboardService";

export default function useDashboard() {
  const mountedRef = useRef(false);

 
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const [monthly, setMonthly] = useState([]);
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [monthlyError, setMonthlyError] = useState(null);

  
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [summaryData, recentData] = await Promise.all([
        svc.fetchSummary(),
        svc.fetchRecent(),
      ]);

      if (!mountedRef.current) return;

      setSummary(summaryData);
      setRecent(recentData);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err?.message || "Failed to load dashboard");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  const loadMonthly = useCallback(async () => {
    setMonthlyLoading(true);
    setMonthlyError(null);

    try {
      const data = await svc.fetchMonthly();
      if (!mountedRef.current) return;
      setMonthly(data);
    } catch (err) {
      if (!mountedRef.current) return;
      setMonthlyError(err?.message || "Failed to load monthly data");
    } finally {
      if (mountedRef.current) setMonthlyLoading(false);
    }
  }, []);

  
  useEffect(() => {
    load();
  }, [load]);

  return {
    
    summary,
    recent,
    loading,
    error,
    refresh: load,

    
    monthly,
    monthlyLoading,
    monthlyError,
    loadMonthly,
  };
}
