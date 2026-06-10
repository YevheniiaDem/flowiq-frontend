"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { convertFromUah } from "@/src/shared/utils/currency";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface MonthlyAmount {
  month: string;
  amount: number;
}

interface RevenueTrendChartProps {
  data: MonthlyAmount[];
  period: string;
}

const CHART_COLOR = "#8b5cf6";

function formatMonthLabel(month: string, language: string): string {
  const [year, monthNum] = month.split("-").map(Number);
  const date = new Date(year, monthNum - 1, 1);
  return date.toLocaleDateString(language === "uk" ? "uk-UA" : "en-US", {
    month: "short",
  });
}

function formatAxisValue(value: number, language: string): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}k`;
  }
  return String(value);
}

export function RevenueTrendChart({ data, period }: RevenueTrendChartProps) {
  const { t, language, currency } = usePreferences();

  const chartData = data.map((point) => ({
    label: formatMonthLabel(point.month, language),
    amount: convertFromUah(Number(point.amount) || 0, currency),
  }));

  const maxAmount = Math.max(...chartData.map((d) => d.amount), 1);

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{t("dashboard.revenueTrend")}</h3>
        <Badge className="rounded-md bg-muted text-xs">{period}</Badge>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLOR} stopOpacity={0.4} />
                <stop offset="95%" stopColor={CHART_COLOR} stopOpacity={0.05} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => formatAxisValue(Number(value), language)}
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
                new Intl.NumberFormat(language === "uk" ? "uk-UA" : "en-US", {
                  maximumFractionDigits: 0,
                }).format(Number(value ?? 0)),
                t("dashboard.stats.revenue"),
              ]}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke={CHART_COLOR}
              fill="url(#revenueGradient)"
              strokeWidth={2}
              dot={{ r: 3, fill: CHART_COLOR, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: CHART_COLOR }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
