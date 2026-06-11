import { apiClient } from "./api";
import { StatCard, AIInsight, BusinessHealthScore } from "@/src/shared/types";

export const dashboardService = {
  async getStats(): Promise<StatCard[]> {
    const response = await apiClient.get<StatCard[]>("/dashboard/stats");
    return response.data;
  },

  async getInsights(): Promise<AIInsight[]> {
    const response = await apiClient.get<AIInsight[]>("/dashboard/insights");
    return response.data;
  },

  async getBusinessHealth(): Promise<BusinessHealthScore> {
    const response = await apiClient.get<BusinessHealthScore>("/dashboard/health");
    return response.data;
  },

  async getAISummary(): Promise<{ text: string; badge: string }> {
    const response = await apiClient.get<{ text: string; badge: string }>("/dashboard/summary");
    return response.data;
  },

  async getRevenueTrend(): Promise<{ month: string; amount: number }[]> {
    const response = await apiClient.get<{ month: string; amount: number | string }[]>(
      "/dashboard/charts/revenue-trend"
    );
    return response.data.map((item) => ({
      month: item.month,
      amount: Number(item.amount) || 0,
    }));
  },

  async getExpenseBreakdown(): Promise<{ category: string; amount: number }[]> {
    const response = await apiClient.get<{ category: string; amount: number | string }[]>(
      "/dashboard/charts/expense-breakdown"
    );
    return response.data.map((item) => ({
      category: item.category,
      amount: Number(item.amount) || 0,
    }));
  },

  async getForecastSnapshot(): Promise<{
    expectedRevenue: number;
    expectedProfit: number;
    taxForecast: number;
    revenueTrendPercent: number;
    forecastMonths: number;
  }> {
    const response = await apiClient.get("/dashboard/forecast-snapshot");
    const data = response.data;
    return {
      expectedRevenue: Number(data.expectedRevenue) || 0,
      expectedProfit: Number(data.expectedProfit) || 0,
      taxForecast: Number(data.taxForecast) || 0,
      revenueTrendPercent: data.revenueTrendPercent,
      forecastMonths: data.forecastMonths,
    };
  },
};
