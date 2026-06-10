import { apiClient } from "@/src/services/api";
import {
  AIAccountantHealth,
  AIRecommendation,
  Forecasts,
  TaxAdvisor,
} from "../types";

function toNumber(value: number | string | undefined): number {
  return Number(value) || 0;
}

export const aiAccountantService = {
  async getHealth(): Promise<AIAccountantHealth> {
    const response = await apiClient.get<AIAccountantHealth>("/ai-accountant/health");
    return { ...response.data, score: toNumber(response.data.score) };
  },

  async getRecommendations(): Promise<AIRecommendation[]> {
    const response = await apiClient.get<AIRecommendation[]>("/ai-accountant/recommendations");
    return response.data;
  },

  async getTaxAdvisor(): Promise<TaxAdvisor> {
    const response = await apiClient.get<TaxAdvisor>("/ai-accountant/tax-advisor");
    const data = response.data;
    return {
      ...data,
      incomeLimitUsagePercent: toNumber(data.incomeLimitUsagePercent),
      estimatedTaxes: toNumber(data.estimatedTaxes),
      forecastTaxAmount: toNumber(data.forecastTaxAmount),
      annualIncome: toNumber(data.annualIncome),
      incomeLimit: toNumber(data.incomeLimit),
    };
  },

  async getForecasts(): Promise<Forecasts> {
    const response = await apiClient.get<Forecasts>("/ai-accountant/forecasts");
    return {
      horizons: response.data.horizons.map((h) => ({
        ...h,
        revenueForecast: toNumber(h.revenueForecast),
        expenseForecast: toNumber(h.expenseForecast),
        profitForecast: toNumber(h.profitForecast),
        cashFlowForecast: toNumber(h.cashFlowForecast),
      })),
    };
  },

  async sendChat(message: string): Promise<string> {
    const response = await apiClient.post<{ reply: string }>("/ai-accountant/chat", { message });
    return response.data.reply;
  },
};
