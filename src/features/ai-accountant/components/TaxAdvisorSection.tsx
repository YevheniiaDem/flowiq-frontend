"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, Percent, Receipt, TrendingUp } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { TaxAdvisor } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";

interface TaxAdvisorSectionProps {
  tax: TaxAdvisor;
  labels: Record<string, string>;
  currency: AppCurrency;
  locale: string;
}

export function TaxAdvisorSection({ tax, labels, currency, locale }: TaxAdvisorSectionProps) {
  const usage = tax.incomeLimitUsagePercent;
  const usageColor =
    usage >= 90 ? "text-red-500" : usage >= 70 ? "text-amber-500" : "text-emerald-500";

  const items = [
    { icon: Building2, label: labels.currentGroup, value: tax.currentFopGroup },
    {
      icon: Percent,
      label: labels.incomeLimitUsage,
      value: `${usage.toFixed(1)}%`,
      valueClass: usageColor,
    },
    {
      icon: Receipt,
      label: labels.estimatedTaxes,
      value: formatCurrency(tax.estimatedTaxes, currency, locale),
    },
    {
      icon: Calendar,
      label: labels.daysUntilDeadline,
      value: `${tax.daysUntilTaxDeadline}`,
      hint: tax.nextTaxPaymentLabel,
    },
    {
      icon: TrendingUp,
      label: labels.forecastTax,
      value: formatCurrency(tax.forecastTaxAmount, currency, locale),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.12 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold tracking-tight">{labels.title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(({ icon: Icon, label, value, valueClass, hint }) => (
          <Card
            key={label}
            className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={cn("mt-0.5 text-sm font-bold", valueClass)}>{value}</p>
                {hint && <p className="mt-0.5 text-[10px] text-muted-foreground">{hint}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
