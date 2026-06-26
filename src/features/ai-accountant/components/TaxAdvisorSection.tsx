"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  Calendar,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { TaxAdvisor } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";

interface TaxAdvisorSectionProps {
  tax: TaxAdvisor;
  labels: {
    title: string;
    currentGroup: string;
    incomeLimitUsage: string;
    incomeLimit: string;
    estimatedTaxes: string;
    daysUntilDeadline: string;
    forecastTax: string;
    limitWarning: string;
  };
  currency: AppCurrency;
  locale: string;
}

function usageStyles(percent: number) {
  if (percent >= 90) {
    return {
      text: "text-red-500",
      bar: "bg-red-500",
      badge: "bg-red-500/10 text-red-600 dark:text-red-400",
    };
  }
  if (percent >= 70) {
    return {
      text: "text-amber-500",
      bar: "bg-amber-500",
      badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    };
  }
  return {
    text: "text-emerald-500",
    bar: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  };
}

export function TaxAdvisorSection({ tax, labels, currency, locale }: TaxAdvisorSectionProps) {
  const usage = tax.incomeLimitUsagePercent;
  const styles = usageStyles(usage);

  const metrics = [
    {
      icon: Receipt,
      label: labels.estimatedTaxes,
      value: formatCurrency(tax.estimatedTaxes, currency, locale),
    },
    {
      icon: TrendingUp,
      label: labels.forecastTax,
      value: formatCurrency(tax.forecastTaxAmount, currency, locale),
    },
    {
      icon: Calendar,
      label: labels.daysUntilDeadline,
      value: String(tax.daysUntilTaxDeadline),
      hint: tax.nextTaxPaymentLabel,
      highlight: tax.daysUntilTaxDeadline <= 14,
    },
  ];

  return (
    <motion.section
      data-testid="ai-accountant-tax-advisor"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.12 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="border-b border-border/50 px-4 py-3">
          <h2 className="text-sm font-semibold tracking-tight">{labels.title}</h2>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">{labels.currentGroup}</p>
                <p className="text-sm font-semibold">{tax.currentFopGroup}</p>
              </div>
            </div>
            <Badge variant="secondary" className={cn("shrink-0 text-[10px]", styles.badge)}>
              {usage.toFixed(1)}%
            </Badge>
          </div>

          <div className="rounded-lg border border-border/40 bg-muted/30 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground">{labels.incomeLimitUsage}</p>
              <p className={cn("text-xs font-bold tabular-nums", styles.text)}>
                {usage.toFixed(1)}%
              </p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-all duration-500", styles.bar)}
                style={{ width: `${Math.min(usage, 100)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
              <span className="truncate tabular-nums">
                {formatCurrency(tax.annualIncome, currency, locale)}
              </span>
              <span className="shrink-0 text-muted-foreground/70">/</span>
              <span className="truncate text-right tabular-nums">
                {formatCurrency(tax.incomeLimit, currency, locale)}
              </span>
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground">{labels.incomeLimit}</p>
          </div>

          {usage >= 90 && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
              <p className="text-xs text-red-600 dark:text-red-400">{labels.limitWarning}</p>
            </div>
          )}

          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map(({ icon: Icon, label, value, hint, highlight }) => (
              <div
                key={label}
                className={cn(
                  "rounded-lg border border-border/40 p-3 transition-colors",
                  highlight
                    ? "border-amber-500/30 bg-amber-500/5"
                    : "bg-card/60"
                )}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                      highlight ? "bg-amber-500/10" : "bg-primary/10"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-3.5 w-3.5",
                        highlight ? "text-amber-500" : "text-primary"
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] leading-tight text-muted-foreground">{label}</p>
                    <p className="mt-0.5 text-sm font-bold tabular-nums">{value}</p>
                    {hint && (
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{hint}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
