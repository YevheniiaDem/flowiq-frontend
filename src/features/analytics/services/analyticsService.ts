import { apiClient } from "@/src/services/api";
import {
  AnalyticsOverview,
  CategoryAmount,
  FopInsights,
  MonthlyAmount,
  MonthlyComparison,
} from "../types";

function toNumber(value: number | string | undefined): number {
  return Number(value) || 0;
}

function mapMonthly(data: { month: string; amount: number | string }[]): MonthlyAmount[] {
  return data.map((item) => ({
    month: item.month,
    amount: toNumber(item.amount),
  }));
}

function mapCategories(data: { category: string; amount: number | string }[]): CategoryAmount[] {
  return data.map((item) => ({
    category: item.category,
    amount: toNumber(item.amount),
  }));
}

export const analyticsService = {
  async getOverview(): Promise<AnalyticsOverview> {
    const response = await apiClient.get<AnalyticsOverview>("/analytics/overview");
    const data = response.data;
    return {
      revenue: toNumber(data.revenue),
      expenses: toNumber(data.expenses),
      profit: toNumber(data.profit),
      taxBurden: toNumber(data.taxBurden),
      revenueChangePercent: toNumber(data.revenueChangePercent),
      expensesChangePercent: toNumber(data.expensesChangePercent),
      profitChangePercent: toNumber(data.profitChangePercent),
      taxBurdenChangePercent: toNumber(data.taxBurdenChangePercent),
    };
  },

  async getRevenueTrend(): Promise<MonthlyAmount[]> {
    const response = await apiClient.get<{ month: string; amount: number | string }[]>(
      "/analytics/revenue-trend"
    );
    return mapMonthly(response.data);
  },

  async getExpenseBreakdown(): Promise<CategoryAmount[]> {
    const response = await apiClient.get<{ category: string; amount: number | string }[]>(
      "/analytics/expense-breakdown"
    );
    return mapCategories(response.data);
  },

  async getProfitTrend(): Promise<MonthlyAmount[]> {
    const response = await apiClient.get<{ month: string; amount: number | string }[]>(
      "/analytics/profit-trend"
    );
    return mapMonthly(response.data);
  },

  async getIncomeVsExpenses(): Promise<MonthlyComparison[]> {
    const response = await apiClient.get<
      { month: string; revenue: number | string; expenses: number | string }[]
    >("/analytics/income-vs-expenses");
    return response.data.map((item) => ({
      month: item.month,
      revenue: toNumber(item.revenue),
      expenses: toNumber(item.expenses),
    }));
  },

  async getFopInsights(): Promise<FopInsights> {
    const response = await apiClient.get<FopInsights>("/analytics/fop-insights");
    const data = response.data;
    return {
      currentFopGroup: data.currentFopGroup,
      fopGroupNumber: data.fopGroupNumber,
      annualIncome: toNumber(data.annualIncome),
      incomeLimit: toNumber(data.incomeLimit),
      incomeLimitUsagePercent: toNumber(data.incomeLimitUsagePercent),
      incomeLimitProgress: toNumber(data.incomeLimitProgress),
      estimatedTaxLoad: toNumber(data.estimatedTaxLoad),
      daysUntilNextTaxPayment: data.daysUntilNextTaxPayment,
      nextTaxPaymentLabel: data.nextTaxPaymentLabel,
      topExpenseCategories: mapCategories(data.topExpenseCategories ?? []),
      taxForecast: toNumber(data.taxForecast),
    };
  },
};
