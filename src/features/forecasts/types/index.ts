export interface ForecastDataPoint {
  month: string;
  amount: number;
  forecast: boolean;
}

export interface ForecastHorizon {
  months: number;
  total: number;
  changePercent: number | null;
}

export interface ForecastMetric {
  historical: ForecastDataPoint[];
  projected: ForecastDataPoint[];
  trendPercent: number;
  horizons: ForecastHorizon[];
}

export type ForecastSeverity = "INFO" | "WARNING" | "CRITICAL";

export interface ForecastInsight {
  id: string;
  message: string;
  severity: ForecastSeverity;
  category: string;
}

export interface ForecastWarning {
  type: string;
  title: string;
  message: string;
  severity: ForecastSeverity;
}

export interface TaxForecastCard {
  months: number;
  label: string;
  projectedTax: number;
  changePercent: number;
}

export interface TaxForecast {
  currentTaxBurden: number;
  annualTaxForecast: number;
  trendPercent: number;
  fopGroup: number;
  horizons: ForecastHorizon[];
  cards: TaxForecastCard[];
}

export interface FopLimitHorizon {
  months: number;
  projectedAnnualIncome: number;
  projectedUsagePercent: number;
  limitExceeded: boolean;
}

export interface FopLimitForecast {
  fopGroup: number;
  fopGroupLabel: string;
  incomeLimit: number;
  currentAnnualIncome: number;
  currentUsagePercent: number;
  monthsUntilLimitExceeded: number;
  horizons: FopLimitHorizon[];
}

export interface ForecastSummary {
  expectedRevenue: number;
  expectedExpenses: number;
  expectedProfit: number;
  expectedTax: number;
  revenueTrendPercent: number;
  expenseTrendPercent: number;
  profitTrendPercent: number;
  fopLimitUsagePercent: number;
  monthsUntilFopLimit: number;
  revenueHorizons: ForecastHorizon[];
  profitHorizons: ForecastHorizon[];
  insights: ForecastInsight[];
  warnings: ForecastWarning[];
}

export interface ForecastSnapshot {
  expectedRevenue: number;
  expectedProfit: number;
  taxForecast: number;
  revenueTrendPercent: number;
  forecastMonths: number;
}
