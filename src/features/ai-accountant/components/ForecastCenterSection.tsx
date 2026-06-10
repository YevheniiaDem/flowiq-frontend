"use client";

import { motion } from "framer-motion";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Forecasts } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";

interface ForecastCenterSectionProps {
  forecasts: Forecasts;
  labels: {
    title: string;
    months: string;
    revenue: string;
    expenses: string;
    profit: string;
    cashFlow: string;
  };
  currency: AppCurrency;
  locale: string;
}

export function ForecastCenterSection({
  forecasts,
  labels,
  currency,
  locale,
}: ForecastCenterSectionProps) {
  const rows = [
    { key: "revenue" as const, label: labels.revenue, field: "revenueForecast" as const },
    { key: "expenses" as const, label: labels.expenses, field: "expenseForecast" as const },
    { key: "profit" as const, label: labels.profit, field: "profitForecast" as const },
    { key: "cashFlow" as const, label: labels.cashFlow, field: "cashFlowForecast" as const },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.15 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold tracking-tight">{labels.title}</h2>
      <div className="grid gap-3 lg:grid-cols-3">
        {forecasts.horizons.map((horizon) => (
          <Card
            key={horizon.months}
            className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <Badge className="rounded-md bg-primary/10 text-primary">
                {horizon.months} {labels.months}
              </Badge>
            </div>
            <div className="space-y-3">
              {rows.map(({ key, label, field }) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold">
                    {formatCurrency(horizon[field], currency, locale)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
