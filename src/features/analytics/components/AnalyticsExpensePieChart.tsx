"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { convertFromUah, formatCurrency } from "@/src/shared/utils/currency";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryAmount } from "../types";
import { CHART_COLORS } from "../utils/chart";
import { AppCurrency } from "@/src/shared/i18n/types";

interface AnalyticsExpensePieChartProps {
  data: CategoryAmount[];
  title: string;
  period: string;
  expensesLabel: string;
  language: string;
  currency: AppCurrency;
  locale: string;
}

const CATEGORY_LABELS_UK: Record<string, string> = {
  Marketing: "Маркетинг",
  Salary: "Зарплата",
  Infrastructure: "Інфраструктура",
  Equipment: "Обладнання",
  Office: "Офіс",
  Taxes: "Податки",
  Software: "ПЗ",
  Other: "Інше",
};

export function AnalyticsExpensePieChart({
  data,
  title,
  period,
  expensesLabel,
  language,
  currency,
  locale,
}: AnalyticsExpensePieChartProps) {
  const chartData = data.map((point, index) => {
    const label =
      language === "uk"
        ? (CATEGORY_LABELS_UK[point.category] ?? point.category)
        : point.category;
    return {
      name: label,
      value: convertFromUah(point.amount, currency),
      fill: CHART_COLORS[index % CHART_COLORS.length],
    };
  });

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Badge className="rounded-md bg-muted text-xs">{period}</Badge>
      </div>
      <div className="h-56">
        {chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            —
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#f1f5f9",
                }}
                formatter={(value, name) => [
                  formatCurrency(Number(value ?? 0), currency, locale),
                  name ?? expensesLabel,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      {chartData.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full" style={{ background: item.fill }} />
              {item.name}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
