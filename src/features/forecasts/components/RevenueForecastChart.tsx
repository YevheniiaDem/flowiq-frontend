"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { convertFromUah } from "@/src/shared/utils/currency";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatAxisValue, formatMonthLabel } from "@/src/features/analytics/utils/chart";
import { ForecastMetric } from "../types";

interface RevenueForecastChartProps {
  data: ForecastMetric;
  title: string;
  period: string;
  actualLabel: string;
  forecastLabel: string;
  language: string;
  currency: string;
}

const ACTUAL_COLOR = "#8b5cf6";
const FORECAST_COLOR = "#a78bfa";

export function RevenueForecastChart({
  data,
  title,
  period,
  actualLabel,
  forecastLabel,
  language,
  currency,
}: RevenueForecastChartProps) {
  const allPoints = [...data.historical, ...data.projected];
  const chartData = allPoints.map((point) => ({
    label: formatMonthLabel(point.month, language),
    actual: point.forecast ? null : convertFromUah(point.amount, currency as "UAH" | "USD" | "EUR"),
    forecast: point.forecast ? convertFromUah(point.amount, currency as "UAH" | "USD" | "EUR") : null,
    isForecast: point.forecast,
  }));

  const bridgeIndex = data.historical.length - 1;
  if (bridgeIndex >= 0 && chartData[bridgeIndex + 1]) {
    chartData[bridgeIndex].forecast = chartData[bridgeIndex].actual;
  }

  const values = chartData.flatMap((d) => [d.actual, d.forecast].filter((v) => v !== null)) as number[];
  const maxAmount = Math.max(...values, 1);

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
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line
              type="monotone"
              dataKey="actual"
              name={actualLabel}
              stroke={ACTUAL_COLOR}
              strokeWidth={2}
              dot={{ r: 3, fill: ACTUAL_COLOR }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name={forecastLabel}
              stroke={FORECAST_COLOR}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: FORECAST_COLOR }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
