import { apiClient } from "@/src/services/api";
import {
  ForecastMetric,
  ForecastSummary,
  FopLimitForecast,
  TaxForecast,
} from "../types";

function toNumber(value: number | string | null | undefined): number {
  return Number(value) || 0;
}

function mapMetric(data: {
  historical: { month: string; amount: number | string; forecast: boolean }[];
  projected: { month: string; amount: number | string; forecast: boolean }[];
  trendPercent: number;
  horizons: { months: number; total: number | string; changePercent: number | null }[];
}): ForecastMetric {
  return {
    historical: data.historical.map((p) => ({
      month: p.month,
      amount: toNumber(p.amount),
      forecast: p.forecast,
    })),
    projected: data.projected.map((p) => ({
      month: p.month,
      amount: toNumber(p.amount),
      forecast: p.forecast,
    })),
    trendPercent: data.trendPercent,
    horizons: data.horizons.map((h) => ({
      months: h.months,
      total: toNumber(h.total),
      changePercent: h.changePercent,
    })),
  };
}

export const forecastService = {
  async getRevenueForecast(): Promise<ForecastMetric> {
    const response = await apiClient.get("/forecasts/revenue");
    return mapMetric(response.data);
  },

  async getExpenseForecast(): Promise<ForecastMetric> {
    const response = await apiClient.get("/forecasts/expenses");
    return mapMetric(response.data);
  },

  async getProfitForecast(): Promise<ForecastMetric> {
    const response = await apiClient.get("/forecasts/profit");
    return mapMetric(response.data);
  },

  async getTaxForecast(): Promise<TaxForecast> {
    const response = await apiClient.get("/forecasts/taxes");
    const data = response.data;
    return {
      currentTaxBurden: toNumber(data.currentTaxBurden),
      annualTaxForecast: toNumber(data.annualTaxForecast),
      trendPercent: data.trendPercent,
      fopGroup: data.fopGroup,
      horizons: data.horizons.map((h: { months: number; total: number | string; changePercent: number | null }) => ({
        months: h.months,
        total: toNumber(h.total),
        changePercent: h.changePercent,
      })),
      cards: data.cards.map((c: { months: number; label: string; projectedTax: number | string; changePercent: number }) => ({
        months: c.months,
        label: c.label,
        projectedTax: toNumber(c.projectedTax),
        changePercent: c.changePercent,
      })),
    };
  },

  async getFopLimitForecast(): Promise<FopLimitForecast> {
    const response = await apiClient.get("/forecasts/fop-limit");
    const data = response.data;
    return {
      fopGroup: data.fopGroup,
      fopGroupLabel: data.fopGroupLabel,
      incomeLimit: toNumber(data.incomeLimit),
      currentAnnualIncome: toNumber(data.currentAnnualIncome),
      currentUsagePercent: data.currentUsagePercent,
      monthsUntilLimitExceeded: data.monthsUntilLimitExceeded,
      horizons: data.horizons.map((h: {
        months: number;
        projectedAnnualIncome: number | string;
        projectedUsagePercent: number;
        limitExceeded: boolean;
      }) => ({
        months: h.months,
        projectedAnnualIncome: toNumber(h.projectedAnnualIncome),
        projectedUsagePercent: h.projectedUsagePercent,
        limitExceeded: h.limitExceeded,
      })),
    };
  },

  async getSummary(): Promise<ForecastSummary> {
    const response = await apiClient.get("/forecasts/summary");
    const data = response.data;
    return {
      expectedRevenue: toNumber(data.expectedRevenue),
      expectedExpenses: toNumber(data.expectedExpenses),
      expectedProfit: toNumber(data.expectedProfit),
      expectedTax: toNumber(data.expectedTax),
      revenueTrendPercent: data.revenueTrendPercent,
      expenseTrendPercent: data.expenseTrendPercent,
      profitTrendPercent: data.profitTrendPercent,
      fopLimitUsagePercent: data.fopLimitUsagePercent,
      monthsUntilFopLimit: data.monthsUntilFopLimit,
      revenueHorizons: data.revenueHorizons.map((h: { months: number; total: number | string; changePercent: number | null }) => ({
        months: h.months,
        total: toNumber(h.total),
        changePercent: h.changePercent,
      })),
      profitHorizons: data.profitHorizons.map((h: { months: number; total: number | string; changePercent: number | null }) => ({
        months: h.months,
        total: toNumber(h.total),
        changePercent: h.changePercent,
      })),
      insights: data.insights,
      warnings: data.warnings,
    };
  },
};
