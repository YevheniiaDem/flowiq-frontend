"use client";

import { useCallback, useEffect, useState } from "react";
import { analyticsService } from "../services/analyticsService";
import {
  AnalyticsOverview,
  CategoryAmount,
  FopInsights,
  MonthlyAmount,
  MonthlyComparison,
} from "../types";

export function useAnalytics() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [revenueTrend, setRevenueTrend] = useState<MonthlyAmount[]>([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState<CategoryAmount[]>([]);
  const [profitTrend, setProfitTrend] = useState<MonthlyAmount[]>([]);
  const [incomeVsExpenses, setIncomeVsExpenses] = useState<MonthlyComparison[]>([]);
  const [fopInsights, setFopInsights] = useState<FopInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewData, revenueData, expenseData, profitData, comparisonData, fopData] =
        await Promise.all([
          analyticsService.getOverview(),
          analyticsService.getRevenueTrend(),
          analyticsService.getExpenseBreakdown(),
          analyticsService.getProfitTrend(),
          analyticsService.getIncomeVsExpenses(),
          analyticsService.getFopInsights(),
        ]);
      setOverview(overviewData);
      setRevenueTrend(revenueData);
      setExpenseBreakdown(expenseData);
      setProfitTrend(profitData);
      setIncomeVsExpenses(comparisonData);
      setFopInsights(fopData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    overview,
    revenueTrend,
    expenseBreakdown,
    profitTrend,
    incomeVsExpenses,
    fopInsights,
    loading,
    error,
    reload: load,
  };
}
