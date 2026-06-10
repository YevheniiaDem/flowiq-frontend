export type RecommendationType = "CRITICAL" | "WARNING" | "OPPORTUNITY" | "SUCCESS";

export interface AIAccountantHealth {
  score: number;
  status: string;
  summary: string;
  highlights: string[];
}

export interface AIRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
}

export interface TaxAdvisor {
  currentFopGroup: string;
  fopGroupNumber: number;
  incomeLimitUsagePercent: number;
  estimatedTaxes: number;
  daysUntilTaxDeadline: number;
  nextTaxPaymentLabel: string;
  forecastTaxAmount: number;
  annualIncome: number;
  incomeLimit: number;
}

export interface ForecastHorizon {
  months: number;
  revenueForecast: number;
  expenseForecast: number;
  profitForecast: number;
  cashFlowForecast: number;
}

export interface Forecasts {
  horizons: ForecastHorizon[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
