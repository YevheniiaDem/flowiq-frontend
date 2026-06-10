export type TransactionType = "INCOME" | "EXPENSE";

export type TransactionFilterPreset =
  | "all"
  | "income"
  | "expense"
  | "currentMonth"
  | "currentQuarter"
  | "currentYear"
  | "custom";

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string | null;
  transactionDate: string;
  autoCategorized?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTransactionRequest {
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  transactionDate: string;
}

export interface UpdateTransactionRequest extends CreateTransactionRequest {}

export interface TransactionFilter {
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  type?: TransactionType;
  dateFrom?: string;
  dateTo?: string;
  preset?: TransactionFilterPreset;
}

export interface TransactionSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  transactionCount: number;
}

export interface TransactionPage {
  content: Transaction[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type TransactionSortField = "transactionDate" | "amount";

export interface TransactionFormValues {
  type: TransactionType;
  amount: string;
  category: string;
  description: string;
  transactionDate: string;
}
