"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/badge";
import { Card } from "@/src/shared/components/ui/card";
import { Transaction, TransactionSortField } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";

interface TransactionsTableProps {
  transactions: Transaction[];
  sortField: TransactionSortField | null;
  sortDirection: "asc" | "desc";
  onSort: (field: TransactionSortField) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  labels: Record<string, string>;
  currency: AppCurrency;
  locale: string;
}

interface SortableHeaderProps {
  field: TransactionSortField;
  label: string;
  sortField: TransactionSortField | null;
  sortDirection: "asc" | "desc";
  onSort: (field: TransactionSortField) => void;
  align?: "left" | "right";
}

function SortableHeader({
  field,
  label,
  sortField,
  sortDirection,
  onSort,
  align = "left",
}: SortableHeaderProps) {
  const isActive = sortField === field;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex w-full items-center gap-1 font-medium hover:text-primary",
        align === "right" ? "justify-end" : "justify-start"
      )}
      onClick={() => onSort(field)}
    >
      <span>{label}</span>
      {isActive ? (
        sortDirection === "asc" ? (
          <ArrowUp className="h-3.5 w-3.5 shrink-0 text-primary" />
        ) : (
          <ArrowDown className="h-3.5 w-3.5 shrink-0 text-primary" />
        )
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}

export function TransactionsTable({
  transactions,
  sortField,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
  labels,
  currency,
  locale,
}: TransactionsTableProps) {
  return (
    <Card className="overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm">
          <colgroup>
            <col className="w-[7.5rem]" />
            <col className="w-[6.5rem]" />
            <col className="w-[8.5rem]" />
            <col />
            <col className="w-[8.5rem]" />
            <col className="w-[5.5rem]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-4 py-3 text-left">
                <SortableHeader
                  field="transactionDate"
                  label={labels.date}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={onSort}
                />
              </th>
              <th className="px-4 py-3 text-left font-medium">{labels.type}</th>
              <th className="px-4 py-3 text-left font-medium">{labels.category}</th>
              <th className="px-4 py-3 text-left font-medium">{labels.description}</th>
              <th className="px-4 py-3 text-right">
                <SortableHeader
                  field="amount"
                  label={labels.amount}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={onSort}
                  align="right"
                />
              </th>
              <th className="px-4 py-3 text-right font-medium">{labels.actions}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  {labels.empty}
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-border/30 transition-colors hover:bg-muted/20"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(transaction.transactionDate).toLocaleDateString(locale)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        transaction.type === "INCOME"
                          ? "border-emerald-500/30 text-emerald-500"
                          : "border-red-500/30 text-red-500"
                      }
                    >
                      {transaction.type === "INCOME" ? labels.income : labels.expense}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="truncate">{transaction.category}</span>
                      {transaction.autoCategorized && (
                        <Badge
                          variant="secondary"
                          className="w-fit gap-1 bg-primary/10 text-[10px] text-primary"
                        >
                          <Sparkles className="h-3 w-3" />
                          {labels.autoCategorized}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="truncate px-4 py-3 text-muted-foreground">
                    {transaction.description || "—"}
                  </td>
                  <td
                    className={cn(
                      "whitespace-nowrap px-4 py-3 text-right font-medium",
                      transaction.type === "INCOME" ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}
                    {formatCurrency(transaction.amount, currency, locale)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => onEdit(transaction)}
                        aria-label={labels.edit}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => onDelete(transaction)}
                        aria-label={labels.delete}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
