"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, Percent, Receipt } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { FopInsights } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";

interface FopInsightsSectionProps {
  insights: FopInsights;
  labels: {
    title: string;
    currentGroup: string;
    incomeLimitUsage: string;
    estimatedTaxLoad: string;
    daysUntilNextTaxPayment: string;
  };
  currency: AppCurrency;
  locale: string;
}

export function FopInsightsSection({
  insights,
  labels,
  currency,
  locale,
}: FopInsightsSectionProps) {
  const usage = insights.incomeLimitUsagePercent;
  const usageColor =
    usage >= 90 ? "text-red-500" : usage >= 70 ? "text-amber-500" : "text-emerald-500";

  const items = [
    {
      key: "group",
      icon: Building2,
      label: labels.currentGroup,
      value: insights.currentFopGroup,
    },
    {
      key: "usage",
      icon: Percent,
      label: labels.incomeLimitUsage,
      value: `${usage.toFixed(1)}%`,
      valueClass: usageColor,
    },
    {
      key: "tax",
      icon: Receipt,
      label: labels.estimatedTaxLoad,
      value: formatCurrency(insights.estimatedTaxLoad, currency, locale),
    },
    {
      key: "days",
      icon: Calendar,
      label: labels.daysUntilNextTaxPayment,
      value: `${insights.daysUntilNextTaxPayment}`,
      hint: insights.nextTaxPaymentLabel,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold tracking-tight">{labels.title}</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ key, icon: Icon, label, value, valueClass, hint }) => (
          <Card
            key={key}
            className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={cn("mt-0.5 text-lg font-bold", valueClass)}>{value}</p>
                {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
