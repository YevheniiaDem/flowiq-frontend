"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Activity, DollarSign, Loader2, Receipt, TrendingDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ReportPreview } from "../types";
import { AppCurrency } from "@/src/shared/i18n/types";
import { convertFromUah, formatCurrency } from "@/src/shared/utils/currency";
import { formatAxisValue, formatMonthLabel } from "@/src/features/analytics/utils/chart";
import { cn } from "@/src/shared/utils/utils";

interface ReportPreviewChartProps {
  preview: ReportPreview | null;
  loading: boolean;
  periodLabel: string;
  labels: {
    title: string;
    revenue: string;
    expenses: string;
    profit: string;
    taxBurden: string;
    chartRevenue: string;
    loading: string;
    empty: string;
  };
  currency: AppCurrency;
  language: string;
  locale: string;
}

const summaryCards = [
  { key: "revenue" as const, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "expenses" as const, icon: TrendingDown, color: "text-red-500", bg: "bg-red-500/10" },
  { key: "profit" as const, icon: Activity, color: "text-primary", bg: "bg-primary/10" },
  { key: "taxBurden" as const, icon: Receipt, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export function ReportPreviewChart({
  preview,
  loading,
  periodLabel,
  labels,
  currency,
  language,
  locale,
}: ReportPreviewChartProps) {
  const chartData =
    preview?.chartData.map((point) => ({
      label: formatMonthLabel(point.month, language),
      revenue: convertFromUah(point.amount, currency),
      expenses: 0,
    })) ?? [];

  const maxAmount = Math.max(...chartData.map((d) => d.revenue), 1);

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{labels.title}</h3>
        <Badge className="rounded-md bg-muted text-xs">{periodLabel}</Badge>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">{labels.loading}</span>
        </div>
      ) : !preview ? (
        <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
          {labels.empty}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map(({ key, icon: Icon, color, bg }) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-lg border border-border/40 bg-background/40 p-3"
              >
                <div>
                  <p className="text-xs text-muted-foreground">{labels[key]}</p>
                  <p className="mt-1 text-base font-bold">
                    {formatCurrency(preview[key], currency, locale)}
                  </p>
                </div>
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", bg)}>
                  <Icon className={cn("h-4 w-4", color)} />
                </div>
              </div>
            ))}
          </div>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.35} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                  domain={[0, Math.ceil(maxAmount * 1.1)]}
                  tickFormatter={formatAxisValue}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#f1f5f9",
                  }}
                  formatter={(value) => [
                    formatCurrency(Number(value ?? 0), currency, locale),
                    labels.chartRevenue,
                  ]}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </Card>
  );
}
