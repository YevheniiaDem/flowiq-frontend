import {
  aiInsights,
  aiSummary,
  businessHealth,
  dashboardStats,
} from "@/src/mock-data/dashboard";
import { expensesByCategory } from "@/src/mock-data/expenses";
import { monthlyRevenue } from "@/src/mock-data/revenue";
import { getTaxProfile } from "@/src/mock-data/tax-profile.localized";
import type { ForecastSnapshot } from "@/src/features/forecasts/types";
import type { AppLanguage } from "@/src/shared/i18n/types";
import type { AIInsight, StatCard, TaxProfile } from "@/src/shared/types";

export interface DemoDashboardData {
  stats: StatCard[];
  insights: AIInsight[];
  taxProfile: TaxProfile;
  summary: { text: string; badge: string };
  revenueTrend: { month: string; amount: number }[];
  expenseBreakdown: { category: string; amount: number }[];
  forecastSnapshot: ForecastSnapshot;
  healthScore: number;
}

export function getDemoDashboardData(language: AppLanguage = "uk"): DemoDashboardData {
  return {
    stats: dashboardStats,
    insights: aiInsights,
    taxProfile: getTaxProfile(language),
    summary: aiSummary,
    revenueTrend: monthlyRevenue.slice(-6).map((item) => ({
      month: item.month,
      amount: item.revenue,
    })),
    expenseBreakdown: expensesByCategory.slice(0, 5).map((cat) => ({
      category: cat.category,
      amount: cat.amount,
    })),
    forecastSnapshot: {
      expectedRevenue: 285_000,
      expectedProfit: 98_500,
      taxForecast: 14_250,
      revenueTrendPercent: 8.3,
      forecastMonths: 3,
    },
    healthScore: businessHealth.score,
  };
}
