/**
 * Future AI analysis contracts for Transactions Center.
 * These types define the shape of insights that an AI provider can return
 * without coupling the UI to a specific LLM implementation.
 */
export type TransactionInsightType =
  | "expense-analysis"
  | "profit-analysis"
  | "tax-recommendation"
  | "forecast";

export interface TransactionInsightRequest {
  dateFrom?: string;
  dateTo?: string;
  insightTypes?: TransactionInsightType[];
}

export interface TransactionInsight {
  id: string;
  type: TransactionInsightType;
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
}
