"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { convertFromUah } from "@/src/shared/utils/currency";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatAxisValue, formatMonthLabel } from "@/src/features/analytics/utils/chart";
import { ForecastMetric } from "../types";

interface ProfitForecastChartProps {
  data: ForecastMetric;
  title: string;
  period: string;
  profitLabel: string;
  language: string;
  currency: string;
}

const ACTUAL_COLOR = "#10b981";
const FORECAST_COLOR = "#34d399";
const NEGATIVE_COLOR = "#ef4444";

export function ProfitForecastChart({
  data,
  title,
  period,
  profitLabel,
  language,
  currency,
}: ProfitForecastChartProps) {
  const allPoints = [...data.historical, ...data.projected];
  const chartData = allPoints.map((point) => ({
    label: formatMonthLabel(point.month, language),
    amount: convertFromUah(point.amount, currency as "UAH" | "USD" | "EUR"),
    isForecast: point.forecast,
  }));

  const amounts = chartData.map((d) => d.amount);
  const minAmount = Math.min(...amounts, 0);
  const maxAmount = Math.max(...amounts, 1);

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
              domain={[Math.floor(minAmount * 1.1), Math.ceil(maxAmount * 1.1)]}
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
                profitLabel,
              ]}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.amount < 0
                      ? NEGATIVE_COLOR
                      : entry.isForecast
                      ? FORECAST_COLOR
                      : ACTUAL_COLOR
                  }
                  opacity={entry.isForecast ? 0.7 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
