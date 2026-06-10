// Common types for Flowiq application

// Dashboard types
export interface StatCard {
  labelKey: string;
  amount: number;
  change: string;
  changeType: "positive" | "negative";
  icon: string;
}

export interface BusinessHealthScore {
  score: number;
  maxScore: number;
  status: "excellent" | "good" | "fair" | "poor";
}

export type TaxStatus = "healthy" | "attention" | "critical";

export interface TaxProfile {
  currentGroup: string;
  taxSystem: string;
  mainKved: string;
  mainKvedName: string;
  incomeLimitUsage: number;
  nextTaxPaymentDays: number;
  nextTaxPaymentLabel: string;
  taxStatus: TaxStatus;
  aiInsight: string;
}

// Revenue types
export interface RevenueDataPoint {
  date: string;
  amount: number;
  category: string;
}

export interface RevenueBySource {
  source: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  growth: number;
}

// Expense types
export interface ExpenseDataPoint {
  date: string;
  amount: number;
  category: string;
  description: string;
}

export interface ExpenseByCategory {
  category: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
  subcategories?: { name: string; amount: number }[];
}

export interface MonthlyExpense {
  month: string;
  expense: number;
  change: number;
}

// Insights types
export interface AIInsight {
  id: string;
  type: "warning" | "success" | "info" | "critical";
  category: "revenue" | "expenses" | "cash-flow" | "customers" | "operations";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  timestamp: string;
  icon?: string;
  metrics?: {
    label: string;
    value: string | number;
    change?: string;
  }[];
  recommendations?: string[];
  actionable: boolean;
}

// Forecast types
export interface ForecastDataPoint {
  date: string;
  value: number;
  confidence: "high" | "medium" | "low";
  lower: number;
  upper: number;
}

export interface MonthlyForecast {
  month: string;
  predicted: number;
  lower: number;
  upper: number;
  confidence: number;
}

// Integration types
export interface Integration {
  id: string;
  name: string;
  description: string;
  status: "available" | "coming" | "connected";
  icon?: string;
  logo?: string;
  logoClassName?: string;
}

// Report types
export interface Report {
  title: string;
  date: string;
  type: string;
}

// User types
export interface User {
  name: string;
  email: string;
  avatar?: string;
}
