"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
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
import { formatAxisValue, formatMonthLabel } from "@/src/features/analytics/utils/chart";
import { ForecastMetric } from "../types";

interface ExpenseForecastChartProps {
  data: ForecastMetric;
  title: string;
  period: string;
  expenseLabel: string;
  language: string;
  currency: string;
}

const ACTUAL_COLOR = "#f59e0b";

export function ExpenseForecastChart({
  data,
  title,
  period,
  expenseLabel,
  language,
  currency,
}: ExpenseForecastChartProps) {
  const allPoints = [...data.historical, ...data.projected];
  const chartData = allPoints.map((point) => ({
    label: formatMonthLabel(point.month, language),
    amount: convertFromUah(point.amount, currency as "UAH" | "USD" | "EUR"),
    isForecast: point.forecast,
  }));

  const maxAmount = Math.max(...chartData.map((d) => d.amount), 1);

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {data.trendPercent !== 0 && (
            <p className="text-xs text-muted-foreground">
              {data.trendPercent >= 0 ? "+" : ""}
              {data.trendPercent.toFixed(1)}% trend
            </p>
          )}
        </div>
        <Badge className="rounded-md bg-muted text-xs">{period}</Badge>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="expenseActualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ACTUAL_COLOR} stopOpacity={0.4} />
                <stop offset="95%" stopColor={ACTUAL_COLOR} stopOpacity={0.05} />
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
              tickFormatter={(value) => formatAxisValue(Number(value))}
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
                expenseLabel,
              ]}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke={ACTUAL_COLOR}
              fill="url(#expenseActualGradient)"
              strokeWidth={2}
              dot={{ r: 2, fill: ACTUAL_COLOR }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
