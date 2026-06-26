"use client";

import { motion } from "framer-motion";
import { Receipt, TrendingUp } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";
import { TaxForecast } from "../types";

interface TaxForecastCardProps {
  data: TaxForecast;
  labels: {
    title: string;
    currentBurden: string;
    annualForecast: string;
    projected: string;
    projectedTax: string;
    horizonMonths: string;
  };
  currency: AppCurrency;
  locale: string;
}

export function TaxForecastCard({ data, labels, currency, locale }: TaxForecastCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold tracking-tight">{labels.title}</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{labels.currentBurden}</p>
              <p className="text-lg font-bold tabular-nums">
                {formatCurrency(data.currentTaxBurden, currency, locale)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{labels.annualForecast}</p>
              <p className="text-lg font-bold tabular-nums">
                {formatCurrency(data.annualTaxForecast, currency, locale)}
              </p>
              {data.trendPercent !== 0 && (
                <p
                  className={cn(
                    "text-xs font-semibold",
                    data.trendPercent > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {data.trendPercent >= 0 ? "+" : ""}
                  {data.trendPercent.toFixed(1)}%
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.cards.map((card) => {
          const horizonLabel = labels.horizonMonths.replace("{count}", String(card.months));
          const risingTax = card.changePercent > 15;

          const horizonBadgeClass = risingTax
            ? "border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-400"
            : "border-primary/25 bg-primary/10 text-primary";

          return (
            <Card
              key={card.months}
              className={cn(
                "rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm",
                risingTax && "border-amber-500/20 bg-amber-500/[0.03]"
              )}
            >
              <Badge
                className={cn(
                  "mb-3 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide",
                  horizonBadgeClass
                )}
              >
                {horizonLabel}
              </Badge>
              <p className="text-xs font-medium text-muted-foreground">{labels.projectedTax}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {formatCurrency(card.projectedTax, currency, locale)}
              </p>
              {card.changePercent !== 0 && (
                <p
                  className={cn(
                    "mt-2 text-xs font-semibold",
                    card.changePercent > 0
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {card.changePercent >= 0 ? "+" : ""}
                  {card.changePercent.toFixed(1)}%
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}
