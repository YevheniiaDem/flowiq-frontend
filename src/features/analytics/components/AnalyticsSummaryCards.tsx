"use client";

import { Card } from "@/src/shared/components/ui/card";
import {
  Activity,
  DollarSign,
  Receipt,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { AnalyticsOverview } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";

interface AnalyticsSummaryCardsProps {
  overview: AnalyticsOverview;
  labels: {
    revenue: string;
    expenses: string;
    profit: string;
    taxBurden: string;
  };
  currency: AppCurrency;
  locale: string;
}

const cards = [
  {
    key: "revenue" as const,
    changeKey: "revenueChangePercent" as const,
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    higherIsPositive: true,
  },
  {
    key: "expenses" as const,
    changeKey: "expensesChangePercent" as const,
    icon: TrendingDown,
    color: "text-red-500",
    bg: "bg-red-500/10",
    higherIsPositive: false,
  },
  {
    key: "profit" as const,
    changeKey: "profitChangePercent" as const,
    icon: Activity,
    color: "text-primary",
    bg: "bg-primary/10",
    higherIsPositive: true,
  },
  {
    key: "taxBurden" as const,
    changeKey: "taxBurdenChangePercent" as const,
    icon: Receipt,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    higherIsPositive: false,
  },
];

export function AnalyticsSummaryCards({
  overview,
  labels,
  currency,
  locale,
}: AnalyticsSummaryCardsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, changeKey, icon: Icon, color, bg, higherIsPositive }) => {
        const change = overview[changeKey];
        const isPositive = higherIsPositive ? change >= 0 : change <= 0;

        return (
          <Card
            key={key}
            className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{labels[key]}</p>
                <h3 className="mt-1.5 text-xl font-bold">
                  {formatCurrency(overview[key], currency, locale)}
                </h3>
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1 text-xs",
                    isPositive ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(1)}%
                  </span>
                </div>
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
