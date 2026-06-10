export interface AnalyticsOverview {
  revenue: number;
  expenses: number;
  profit: number;
  taxBurden: number;
  revenueChangePercent: number;
  expensesChangePercent: number;
  profitChangePercent: number;
  taxBurdenChangePercent: number;
}

export interface MonthlyAmount {
  month: string;
  amount: number;
}

export interface CategoryAmount {
  category: string;
  amount: number;
}

export interface MonthlyComparison {
  month: string;
  revenue: number;
  expenses: number;
}

export interface FopInsights {
  currentFopGroup: string;
  fopGroupNumber: number;
  annualIncome: number;
  incomeLimit: number;
  incomeLimitUsagePercent: number;
  incomeLimitProgress: number;
  estimatedTaxLoad: number;
  daysUntilNextTaxPayment: number;
  nextTaxPaymentLabel: string;
  topExpenseCategories: CategoryAmount[];
  taxForecast: number;
}
