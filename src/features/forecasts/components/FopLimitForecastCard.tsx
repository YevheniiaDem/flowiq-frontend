"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Building2 } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";
import { FopLimitForecast } from "../types";

interface FopLimitForecastCardProps {
  data: FopLimitForecast;
  labels: {
    title: string;
    currentGroup: string;
    currentUsage: string;
    incomeLimit: string;
    monthsUntilLimit: string;
    projectedUsage: string;
    limitExceeded: string;
  };
  currency: AppCurrency;
  locale: string;
}

export function FopLimitForecastCard({
  data,
  labels,
  currency,
  locale,
}: FopLimitForecastCardProps) {
  const usageColor =
    data.currentUsagePercent >= 90
      ? "bg-red-500"
      : data.currentUsagePercent >= 70
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold tracking-tight">{labels.title}</h2>

      <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{labels.currentGroup}</span>
          </div>
          <Badge className="rounded-md bg-primary/10 text-primary">
            {data.fopGroupLabel}
          </Badge>
        </div>

        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{labels.currentUsage}</span>
          <span className="font-semibold">{data.currentUsagePercent.toFixed(1)}%</span>
        </div>

        <div className="mb-4 h-3 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", usageColor)}
            style={{ width: `${Math.min(data.currentUsagePercent, 100)}%` }}
          />
        </div>

        <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
          <span>
            {formatCurrency(data.currentAnnualIncome, currency, locale)} /{" "}
            {formatCurrency(data.incomeLimit, currency, locale)}
          </span>
          {data.monthsUntilLimitExceeded > 0 && (
            <span className="flex items-center gap-1 text-amber-500">
              <AlertTriangle className="h-3 w-3" />
              {labels.monthsUntilLimit}: {data.monthsUntilLimitExceeded}
            </span>
          )}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.horizons.map((horizon) => {
          const horizonColor =
            horizon.projectedUsagePercent >= 100
              ? "text-red-500"
              : horizon.projectedUsagePercent >= 85
              ? "text-amber-500"
              : "text-emerald-500";

          return (
            <Card
              key={horizon.months}
              className={cn(
                "rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm",
                horizon.limitExceeded && "border-red-500/30"
              )}
            >
              <Badge className="mb-2 rounded-md bg-muted text-xs">
                {horizon.months} {labels.projectedUsage.split(" ")[0] || "mo"}
              </Badge>
              <p className="text-xs text-muted-foreground">{labels.projectedUsage}</p>
              <p className={cn("text-lg font-bold", horizonColor)}>
                {horizon.projectedUsagePercent.toFixed(1)}%
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {formatCurrency(horizon.projectedAnnualIncome, currency, locale)}
              </p>
              {horizon.limitExceeded && (
                <p className="mt-1 text-[10px] font-medium text-red-500">
                  {labels.limitExceeded}
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
}
