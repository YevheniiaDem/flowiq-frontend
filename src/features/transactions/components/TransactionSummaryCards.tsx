"use client";

import { Card } from "@/src/shared/components/ui/card";
import { DollarSign, TrendingDown, Activity, Hash } from "lucide-react";
import { TransactionSummary } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";

interface TransactionSummaryCardsProps {
  summary: TransactionSummary;
  labels: {
    totalRevenue: string;
    totalExpenses: string;
    netProfit: string;
    transactionCount: string;
  };
  currency: AppCurrency;
  locale: string;
}

const cards = [
  { key: "totalRevenue" as const, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "totalExpenses" as const, icon: TrendingDown, color: "text-red-500", bg: "bg-red-500/10" },
  { key: "netProfit" as const, icon: Activity, color: "text-primary", bg: "bg-primary/10" },
  { key: "transactionCount" as const, icon: Hash, color: "text-accent", bg: "bg-accent/10" },
];

export function TransactionSummaryCards({
  summary,
  labels,
  currency,
  locale,
}: TransactionSummaryCardsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, icon: Icon, color, bg }) => {
        const value =
          key === "transactionCount"
            ? summary.transactionCount
            : formatCurrency(summary[key], currency, locale);

        return (
          <Card
            key={key}
            className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{labels[key]}</p>
                <h3 className="mt-1.5 text-xl font-bold">{value}</h3>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
