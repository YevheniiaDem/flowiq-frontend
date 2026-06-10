"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { convertFromUah } from "@/src/shared/utils/currency";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MonthlyComparison } from "../types";
import { formatAxisValue, formatMonthLabel } from "../utils/chart";

interface AnalyticsIncomeVsExpensesChartProps {
  data: MonthlyComparison[];
  title: string;
  period: string;
  incomeLabel: string;
  expensesLabel: string;
  language: string;
  currency: string;
}

export function AnalyticsIncomeVsExpensesChart({
  data,
  title,
  period,
  incomeLabel,
  expensesLabel,
  language,
  currency,
}: AnalyticsIncomeVsExpensesChartProps) {
  const chartData = data.map((point) => ({
    label: formatMonthLabel(point.month, language),
    revenue: convertFromUah(point.revenue, currency as "UAH" | "USD" | "EUR"),
    expenses: convertFromUah(point.expenses, currency as "UAH" | "USD" | "EUR"),
  }));

  const maxValue = Math.max(
    ...chartData.flatMap((d) => [d.revenue, d.expenses]),
    1
  );

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
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
              domain={[0, Math.ceil(maxValue * 1.1)]}
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
              formatter={(value, name) => [
                new Intl.NumberFormat(language === "uk" ? "uk-UA" : "en-US", {
                  maximumFractionDigits: 0,
                }).format(Number(value ?? 0)),
                name === "revenue" ? incomeLabel : expensesLabel,
              ]}
            />
            <Legend
              formatter={(value) => (value === "revenue" ? incomeLabel : expensesLabel)}
              wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
            />
            <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
