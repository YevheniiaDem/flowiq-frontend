"use client";

import { motion } from "framer-motion";
import { Card } from "@/src/shared/components/ui/card";
import { FopInsights } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { CHART_COLORS } from "../utils/chart";

interface TaxProfileAnalyticsSectionProps {
  insights: FopInsights;
  labels: {
    title: string;
    incomeLimitProgress: string;
    topExpenseCategories: string;
    taxForecast: string;
    noExpenses: string;
    ofLimit: string;
  };
  currency: AppCurrency;
  locale: string;
}

export function TaxProfileAnalyticsSection({
  insights,
  labels,
  currency,
  locale,
}: TaxProfileAnalyticsSectionProps) {
  const progress = Math.min(insights.incomeLimitProgress, 100);
  const progressColor =
    progress >= 90 ? "bg-red-500" : progress >= 70 ? "bg-amber-500" : "bg-emerald-500";

  const totalExpenses = insights.topExpenseCategories.reduce((sum, c) => sum + c.amount, 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.15 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold tracking-tight">{labels.title}</h2>
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium text-muted-foreground">{labels.incomeLimitProgress}</p>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-semibold">{progress.toFixed(1)}%</span>
              <span className="text-muted-foreground">{labels.ofLimit}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${progressColor}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {formatCurrency(insights.annualIncome, currency, locale)} /{" "}
              {formatCurrency(insights.incomeLimit, currency, locale)}
            </p>
          </div>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium text-muted-foreground">{labels.topExpenseCategories}</p>
          <div className="mt-3 space-y-2">
            {insights.topExpenseCategories.length === 0 ? (
              <p className="text-sm text-muted-foreground">{labels.noExpenses}</p>
            ) : (
              insights.topExpenseCategories.map((cat, index) => {
                const pct = totalExpenses > 0 ? (cat.amount / totalExpenses) * 100 : 0;
                return (
                  <div key={cat.category}>
                    <div className="flex justify-between text-xs">
                      <span>{cat.category}</span>
                      <span className="text-muted-foreground">{pct.toFixed(0)}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: CHART_COLORS[index % CHART_COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium text-muted-foreground">{labels.taxForecast}</p>
          <p className="mt-3 text-2xl font-bold">
            {formatCurrency(insights.taxForecast, currency, locale)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {insights.currentFopGroup} · YTD{" "}
            {formatCurrency(insights.annualIncome, currency, locale)}
          </p>
        </Card>
      </div>
    </motion.section>
  );
}
