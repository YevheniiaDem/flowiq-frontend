import { Card } from "@/src/shared/components/ui/card";
import { MetricTooltip } from "@/src/features/onboarding/components/MetricTooltip";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart3,
} from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
  icon: string;
  metricId?: string;
  metricTooltip?: string;
}

const iconMap = {
  "dollar-sign": DollarSign,
  "trending-down": TrendingDown,
  activity: Activity,
  "bar-chart-3": BarChart3,
  "trending-up": TrendingUp,
};

export function StatCard({
  label,
  value,
  change,
  changeType,
  icon,
  metricId,
  metricTooltip,
}: StatCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] || DollarSign;
  const isPositive = changeType === "positive";

  return (
    <Card className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          {metricId && metricTooltip ? (
            <MetricTooltip metricId={metricId} label={label} tooltip={metricTooltip} />
          ) : (
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
          )}
          <h3 className="mt-1.5 text-xl font-bold">{value}</h3>
          <div
            className={`mt-1 flex items-center gap-1 text-xs ${
              isPositive ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{change}</span>
          </div>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            isPositive ? "bg-emerald-500/10" : "bg-red-500/10"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              isPositive ? "text-emerald-500" : "text-red-500"
            }`}
          />
        </div>
      </div>
    </Card>
  );
}
