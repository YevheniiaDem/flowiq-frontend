"use client";

import { motion } from "framer-motion";
import { DollarSign, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";
import { ForecastSummary } from "../types";

interface ForecastSummaryCardsProps {
  summary: ForecastSummary;
  labels: {
    revenue: string;
    expenses: string;
    profit: string;
    tax: string;
    next3Months: string;
  };
  currency: AppCurrency;
  locale: string;
}

export function ForecastSummaryCards({
  summary,
  labels,
  currency,
  locale,
}: ForecastSummaryCardsProps) {
  const cards = [
    {
      key: "revenue",
      label: labels.revenue,
      value: summary.expectedRevenue,
      trend: summary.revenueTrendPercent,
      icon: DollarSign,
      positive: summary.revenueTrendPercent >= 0,
    },
    {
      key: "expenses",
      label: labels.expenses,
      value: summary.expectedExpenses,
      trend: summary.expenseTrendPercent,
      icon: TrendingDown,
      positive: summary.expenseTrendPercent <= 0,
    },
    {
      key: "profit",
      label: labels.profit,
      value: summary.expectedProfit,
      trend: summary.profitTrendPercent,
      icon: TrendingUp,
      positive: summary.profitTrendPercent >= 0,
    },
    {
      key: "tax",
      label: labels.tax,
      value: summary.expectedTax,
      trend: null,
      icon: Receipt,
      positive: true,
    },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, value, trend, icon: Icon, positive }, index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-lg font-bold">
                  {formatCurrency(value, currency, locale)}
                </p>
                <p className="text-[10px] text-muted-foreground">{labels.next3Months}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            {trend !== null && (
              <p
                className={cn(
                  "mt-2 text-xs font-medium",
                  positive ? "text-emerald-500" : "text-red-500"
                )}
              >
                {trend >= 0 ? "+" : ""}
                {trend.toFixed(1)}%
              </p>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
