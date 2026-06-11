"use client";

import { useCallback, useEffect, useState } from "react";
import { forecastService } from "../services/forecast.service";
import {
  ForecastMetric,
  ForecastSummary,
  FopLimitForecast,
  TaxForecast,
} from "../types";

export function useForecasts() {
  const [summary, setSummary] = useState<ForecastSummary | null>(null);
  const [revenue, setRevenue] = useState<ForecastMetric | null>(null);
  const [expenses, setExpenses] = useState<ForecastMetric | null>(null);
  const [profit, setProfit] = useState<ForecastMetric | null>(null);
  const [taxes, setTaxes] = useState<TaxForecast | null>(null);
  const [fopLimit, setFopLimit] = useState<FopLimitForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryData, revenueData, expenseData, profitData, taxData, fopData] =
        await Promise.all([
          forecastService.getSummary(),
          forecastService.getRevenueForecast(),
          forecastService.getExpenseForecast(),
          forecastService.getProfitForecast(),
          forecastService.getTaxForecast(),
          forecastService.getFopLimitForecast(),
        ]);
      setSummary(summaryData);
      setRevenue(revenueData);
      setExpenses(expenseData);
      setProfit(profitData);
      setTaxes(taxData);
      setFopLimit(fopData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load forecasts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    summary,
    revenue,
    expenses,
    profit,
    taxes,
    fopLimit,
    loading,
    error,
    reload: load,
  };
}
