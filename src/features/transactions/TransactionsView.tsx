"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { usePageActivation, usePendingHelpGuide } from "@/src/features/onboarding";
import { TransactionSummaryCards } from "./components/TransactionSummaryCards";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionsToolbar } from "./components/TransactionsToolbar";
import { TransactionFormModal } from "./components/TransactionFormModal";
import { DeleteTransactionDialog } from "./components/DeleteTransactionDialog";
import { useTransactions } from "./hooks/useTransactions";
import { Transaction, TransactionType } from "./types";

export function TransactionsView() {
  const { t, language, currency } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  const {
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
  } = useTransactions();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [initialType, setInitialType] = useState<TransactionType>("INCOME");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);

  usePageActivation("transactions", "review_transactions");
  usePendingHelpGuide("transactions_guide", !loading && !!summary);

  const labels = useMemo(
    () => ({
      addTransaction: t("transactions.addTransaction"),
      importCsv: t("transactions.importCsv"),
      exportCsv: t("transactions.exportCsv"),
      searchPlaceholder: t("transactions.searchPlaceholder"),
      clearSearch: t("transactions.clearSearch"),
      from: t("transactions.from"),
      to: t("transactions.to"),
      openCalendar: t("transactions.openCalendar"),
      closeCalendar: t("transactions.closeCalendar"),
      filter_all: t("transactions.filters.all"),
      filter_income: t("transactions.filters.income"),
      filter_expense: t("transactions.filters.expense"),
      filter_currentMonth: t("transactions.filters.currentMonth"),
      filter_currentQuarter: t("transactions.filters.currentQuarter"),
      filter_currentYear: t("transactions.filters.currentYear"),
      filter_custom: t("transactions.filters.custom"),
      date: t("transactions.table.date"),
      type: t("transactions.table.type"),
      category: t("transactions.table.category"),
      autoCategorized: t("transactions.autoCategorized"),
      description: t("transactions.table.description"),
      amount: t("transactions.table.amount"),
      actions: t("transactions.table.actions"),
      income: t("transactions.income"),
      expense: t("transactions.expense"),
      empty: t("transactions.empty"),
      edit: t("transactions.edit"),
      delete: t("transactions.delete"),
      addTitle: t("transactions.form.addTitle"),
      editTitle: t("transactions.form.editTitle"),
      amountLabel: t("transactions.form.amount"),
      categoryLabel: t("transactions.form.category"),
      descriptionLabel: t("transactions.form.description"),
      descriptionPlaceholder: t("transactions.form.descriptionPlaceholder"),
      dateLabel: t("transactions.form.date"),
      typeLabel: t("transactions.form.type"),
      save: t("transactions.form.save"),
      cancel: t("transactions.form.cancel"),
      validationAmount: t("transactions.form.validationAmount"),
      validationCategory: t("transactions.form.validationCategory"),
      validationDate: t("transactions.form.validationDate"),
      validationDateRange: t("transactions.form.validationDateRange"),
      clearField: t("common.clearField"),
      deleteTitle: t("transactions.deleteTitle"),
      deleteDescription: t("transactions.deleteDescription"),
      previous: t("transactions.pagination.previous"),
      next: t("transactions.pagination.next"),
      pageInfo: t("transactions.pagination.pageInfo"),
    }),
    [t]
  );

  const openCreate = () => {
    setFormMode("create");
    setInitialType("INCOME");
    setEditingTransaction(null);
    setFormOpen(true);
  };

  if (loading && !summary) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 p-4 text-center">
        <p className="text-sm text-destructive">{error || t("transactions.loadError")}</p>
        <p className="text-xs text-muted-foreground">{t("dashboard.backendHint")}</p>
      </div>
    );
  }

  return (
    <motion.div
      data-testid="transactions-page"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-4 p-4"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("transactions.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("transactions.subtitle")}</p>
        </div>
        <TransactionsToolbar
          onAddTransaction={openCreate}
          onImport={importCsv}
          onExport={exportCsv}
          labels={labels}
        />
      </div>

      <TransactionSummaryCards
        summary={summary}
        currency={currency}
        locale={locale}
        labels={{
          totalRevenue: t("transactions.summary.totalRevenue"),
          totalExpenses: t("transactions.summary.totalExpenses"),
          netProfit: t("transactions.summary.netProfit"),
          transactionCount: t("transactions.summary.transactionCount"),
        }}
      />

      <TransactionFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(0);
        }}
        preset={preset}
        onPresetChange={(value) => {
          setPreset(value);
          setPage(0);
        }}
        customDateFrom={customDateFrom}
        customDateTo={customDateTo}
        onCustomDateFromChange={(value) => {
          setCustomDateFrom(value);
          setPage(0);
        }}
        onCustomDateToChange={(value) => {
          setCustomDateTo(value);
          setPage(0);
        }}
        labels={labels}
      />

      <TransactionsTable
        transactions={transactions}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={(transaction) => {
          setFormMode("edit");
          setEditingTransaction(transaction);
          setFormOpen(true);
        }}
        onDelete={(transaction) => {
          setDeletingTransaction(transaction);
          setDeleteOpen(true);
        }}
        labels={labels}
        currency={currency}
        locale={locale}
      />

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {labels.pageInfo
            .replace("{page}", String(page + 1))
            .replace("{totalPages}", String(Math.max(totalPages, 1)))
            .replace("{total}", String(totalElements))}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 0 || loading}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          >
            {labels.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1 || loading}
            onClick={() => setPage((prev) => prev + 1)}
          >
            {labels.next}
          </Button>
        </div>
      </div>

      <TransactionFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        mode={formMode}
        initialType={initialType}
        transaction={editingTransaction}
        onSubmit={async (values) => {
          if (formMode === "edit" && editingTransaction) {
            await updateTransaction(editingTransaction.id, values);
          } else {
            await createTransaction(values);
          }
        }}
        labels={{
          addTitle: labels.addTitle,
          editTitle: labels.editTitle,
          type: labels.typeLabel,
          income: labels.income,
          expense: labels.expense,
          amount: labels.amountLabel,
          category: labels.categoryLabel,
          description: labels.descriptionLabel,
          descriptionPlaceholder: labels.descriptionPlaceholder,
          date: labels.dateLabel,
          openCalendar: labels.openCalendar,
          closeCalendar: labels.closeCalendar,
          save: labels.save,
          cancel: labels.cancel,
          validationAmount: labels.validationAmount,
          validationCategory: labels.validationCategory,
          validationDate: labels.validationDate,
          validationDateRange: labels.validationDateRange,
          clearField: labels.clearField,
        }}
      />

      <DeleteTransactionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        transaction={deletingTransaction}
        onConfirm={async () => {
          if (deletingTransaction) {
            await deleteTransaction(deletingTransaction.id);
          }
        }}
        labels={{
          deleteTitle: labels.deleteTitle,
          deleteDescription: labels.deleteDescription,
          cancel: labels.cancel,
          delete: labels.delete,
        }}
      />
    </motion.div>
  );
}
