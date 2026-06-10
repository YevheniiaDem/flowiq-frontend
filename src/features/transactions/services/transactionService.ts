import { apiClient } from "@/src/services/api";
import {
  CreateTransactionRequest,
  Transaction,
  TransactionFilter,
  TransactionPage,
  TransactionSummary,
  UpdateTransactionRequest,
} from "../types";

function mapTransaction(raw: Transaction): Transaction {
  return {
    ...raw,
    amount: Number(raw.amount) || 0,
  };
}

function mapSummary(raw: TransactionSummary): TransactionSummary {
  return {
    totalRevenue: Number(raw.totalRevenue) || 0,
    totalExpenses: Number(raw.totalExpenses) || 0,
    netProfit: Number(raw.netProfit) || 0,
    transactionCount: Number(raw.transactionCount) || 0,
  };
}

export const transactionService = {
  async getTransactions(filter: TransactionFilter = {}): Promise<TransactionPage> {
    const response = await apiClient.get<TransactionPage>("/transactions", {
      params: {
        search: filter.search || undefined,
        page: filter.page ?? 0,
        size: filter.size ?? 10,
        sort: filter.sort || undefined,
        type: filter.type || undefined,
        dateFrom: filter.dateFrom || undefined,
        dateTo: filter.dateTo || undefined,
      },
    });

    return {
      ...response.data,
      content: response.data.content.map(mapTransaction),
    };
  },

  async getTransaction(id: number): Promise<Transaction> {
    const response = await apiClient.get<Transaction>(`/transactions/${id}`);
    return mapTransaction(response.data);
  },

  async createTransaction(data: CreateTransactionRequest): Promise<Transaction> {
    const response = await apiClient.post<Transaction>("/transactions", data);
    return mapTransaction(response.data);
  },

  async updateTransaction(id: number, data: UpdateTransactionRequest): Promise<Transaction> {
    const response = await apiClient.put<Transaction>(`/transactions/${id}`, data);
    return mapTransaction(response.data);
  },

  async deleteTransaction(id: number): Promise<void> {
    await apiClient.delete(`/transactions/${id}`);
  },

  async getSummary(
    dateFrom?: string,
    dateTo?: string,
    type?: TransactionFilter["type"]
  ): Promise<TransactionSummary> {
    const response = await apiClient.get<TransactionSummary>("/transactions/summary", {
      params: {
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        type: type || undefined,
      },
    });
    return mapSummary(response.data);
  },
};
