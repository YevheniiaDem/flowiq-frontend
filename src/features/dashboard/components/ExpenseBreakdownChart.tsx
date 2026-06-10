"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
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

export interface CategoryAmount {
  category: string;
  amount: number;
}

interface ExpenseBreakdownChartProps {
  data: CategoryAmount[];
  period: string;
}

const BAR_COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ec4899"];

const CATEGORY_LABELS_UK: Record<string, string> = {
  Salaries: "Зарплати",
  Marketing: "Маркетинг",
  Infrastructure: "Інфраструктура",
  Operations: "Операції",
  Other: "Інше",
};

export function ExpenseBreakdownChart({ data, period }: ExpenseBreakdownChartProps) {
  const { t, language, currency } = usePreferences();

  const chartData = data.map((point, index) => {
    const label = language === "uk"
      ? (CATEGORY_LABELS_UK[point.category] ?? point.category)
      : point.category;

    return {
      category: label,
      amount: convertFromUah(Number(point.amount) || 0, currency),
      fill: BAR_COLORS[index % BAR_COLORS.length],
    };
  });

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{t("dashboard.expenseBreakdown")}</h3>
        <Badge className="rounded-md bg-muted text-xs">{period}</Badge>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.35} horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fontSize: 10, fill: "#cbd5e1" }}
              axisLine={false}
              tickLine={false}
              width={language === "uk" ? 88 : 72}
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
                t("dashboard.stats.expenses"),
              ]}
            />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
