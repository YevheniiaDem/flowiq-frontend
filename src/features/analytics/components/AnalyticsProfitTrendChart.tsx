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
import { MonthlyAmount } from "../types";
import { formatAxisValue, formatMonthLabel } from "../utils/chart";

interface AnalyticsProfitTrendChartProps {
  data: MonthlyAmount[];
  title: string;
  period: string;
  profitLabel: string;
  language: string;
  currency: string;
}

const CHART_COLOR = "#10b981";

export function AnalyticsProfitTrendChart({
  data,
  title,
  period,
  profitLabel,
  language,
  currency,
}: AnalyticsProfitTrendChartProps) {
  const chartData = data.map((point) => ({
    label: formatMonthLabel(point.month, language),
    amount: convertFromUah(point.amount, currency as "UAH" | "USD" | "EUR"),
  }));

  const amounts = chartData.map((d) => d.amount);
  const minAmount = Math.min(...amounts, 0);
  const maxAmount = Math.max(...amounts, 1);

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Badge className="rounded-md bg-muted text-xs">{period}</Badge>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
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
              domain={[Math.floor(minAmount * 1.1), Math.ceil(maxAmount * 1.1)]}
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
                new Intl.NumberFormat(language === "uk" ? "uk-UA" : "en-US", {
                  maximumFractionDigits: 0,
                }).format(Number(value ?? 0)),
                profitLabel,
              ]}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke={CHART_COLOR}
              fill="url(#profitGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
