"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { transactionService } from "../services/transactionService";
import {
  Transaction,
  TransactionFilter,
  TransactionFilterPreset,
  TransactionFormValues,
  TransactionSortField,
  TransactionSummary,
  TransactionType,
} from "../types";

function getDateRangeForPreset(preset: TransactionFilterPreset): {
  dateFrom?: string;
  dateTo?: string;
  type?: TransactionType;
} {
  const today = new Date();
  const format = (date: Date) => date.toISOString().slice(0, 10);

  switch (preset) {
    case "income":
      return { type: "INCOME" };
    case "expense":
      return { type: "EXPENSE" };
    case "currentMonth": {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { dateFrom: format(start), dateTo: format(end) };
    }
    case "currentQuarter": {
      const quarter = Math.floor(today.getMonth() / 3);
      const start = new Date(today.getFullYear(), quarter * 3, 1);
      const end = new Date(today.getFullYear(), quarter * 3 + 3, 0);
      return { dateFrom: format(start), dateTo: format(end) };
    }
    case "currentYear": {
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear(), 11, 31);
      return { dateFrom: format(start), dateTo: format(end) };
    }
    case "all":
    case "custom":
    default:
      return {};
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [preset, setPreset] = useState<TransactionFilterPreset>("all");
  const [customDateFrom, setCustomDateFrom] = useState("");
  const [customDateTo, setCustomDateTo] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [sortField, setSortField] = useState<TransactionSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const activeFilter = useMemo<TransactionFilter>(() => {
    const presetRange = getDateRangeForPreset(preset);
    const dateFrom = preset === "custom" ? customDateFrom || undefined : presetRange.dateFrom;
    const dateTo = preset === "custom" ? customDateTo || undefined : presetRange.dateTo;

    return {
      search: search.trim() || undefined,
      page,
      size,
      sort: sortField ? `${sortField},${sortDirection}` : undefined,
      type: presetRange.type,
      dateFrom,
      dateTo,
      preset,
    };
  }, [customDateFrom, customDateTo, page, preset, search, size, sortDirection, sortField]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pageData, summaryData] = await Promise.all([
        transactionService.getTransactions(activeFilter),
        transactionService.getSummary(
          activeFilter.dateFrom,
          activeFilter.dateTo,
          activeFilter.type
        ),
      ]);
      setTransactions(pageData.content);
      setTotalPages(pageData.totalPages);
      setTotalElements(pageData.totalElements);
      setSummary(summaryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSort = (field: TransactionSortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortDirection("asc");
    } else {
      setSortField(null);
    }
    setPage(0);
  };

  const createTransaction = async (values: TransactionFormValues) => {
    await transactionService.createTransaction({
      type: values.type,
      amount: Number(values.amount),
      category: values.category,
      description: values.description || undefined,
      transactionDate: values.transactionDate,
    });
    await loadData();
  };

  const updateTransaction = async (id: number, values: TransactionFormValues) => {
    await transactionService.updateTransaction(id, {
      type: values.type,
      amount: Number(values.amount),
      category: values.category,
      description: values.description || undefined,
      transactionDate: values.transactionDate,
    });
    await loadData();
  };

  const deleteTransaction = async (id: number) => {
    await transactionService.deleteTransaction(id);
    await loadData();
  };

  const exportCsv = async () => {
    const allData = await transactionService.getTransactions({
      ...activeFilter,
      page: 0,
      size: 1000,
    });

    const header = ["Date", "Type", "Category", "Description", "Amount"];
    const rows = allData.content.map((item) => [
      item.transactionDate,
      item.type,
      item.category,
      item.description ?? "",
      String(item.amount),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importCsv = async (file: File) => {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length <= 1) {
      return;
    }

    for (const line of lines.slice(1)) {
      const cells = line
        .split(",")
        .map((cell) => cell.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));

      if (cells.length < 5) {
        continue;
      }

      const [transactionDate, type, category, description, amount] = cells;
      if (!transactionDate || !type || !category || !amount) {
        continue;
      }

      await transactionService.createTransaction({
        type: type.toUpperCase() === "EXPENSE" ? "EXPENSE" : "INCOME",
        amount: Number(amount),
        category,
        description: description || undefined,
        transactionDate,
      });
    }

    await loadData();
  };

  return {
    transactions,
    summary,
    loading,
    error,
    search,
    setSearch,
    preset,
    setPreset,
    customDateFrom,
    setCustomDateFrom,
    customDateTo,
    setCustomDateTo,
    page,
    setPage,
    totalPages,
    totalElements,
    sortField,
    sortDirection,
    handleSort,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    exportCsv,
    importCsv,
    refresh: loadData,
  };
}
