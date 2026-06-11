"use client";

import Link from "next/link";
import { ArrowRight, Receipt, TrendingUp, Wallet } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { formatCurrency } from "@/src/shared/utils/currency";
import { cn } from "@/src/shared/utils/utils";
import { ForecastSnapshot } from "@/src/features/forecasts/types";

interface ForecastSnapshotWidgetProps {
  snapshot: ForecastSnapshot;
}

export function ForecastSnapshotWidget({ snapshot }: ForecastSnapshotWidgetProps) {
  const { t, language, currency } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  const items = [
    {
      key: "revenue",
      icon: Wallet,
      label: t("dashboard.forecastSnapshot.expectedRevenue"),
      value: snapshot.expectedRevenue,
      trend: snapshot.revenueTrendPercent,
    },
    {
      key: "profit",
      icon: TrendingUp,
      label: t("dashboard.forecastSnapshot.expectedProfit"),
      value: snapshot.expectedProfit,
      trend: null,
    },
    {
      key: "tax",
      icon: Receipt,
      label: t("dashboard.forecastSnapshot.taxForecast"),
      value: snapshot.taxForecast,
      trend: null,
    },
  ];

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{t("dashboard.forecastSnapshot.title")}</h3>
          <p className="text-xs text-muted-foreground">
            {t("dashboard.forecastSnapshot.subtitle", {
              months: String(snapshot.forecastMonths),
            })}
          </p>
        </div>
        <Link
          href="/forecasts"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          {t("dashboard.forecastSnapshot.viewAll")}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {items.map(({ key, icon: Icon, label, value, trend }) => (
          <div
            key={key}
            className="rounded-lg border border-border/30 bg-background/30 p-3"
          >
            <div className="mb-2 flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className="text-base font-bold">
              {formatCurrency(value, currency, locale)}
            </p>
            {trend !== null && (
              <Badge
                className={cn(
                  "mt-1 rounded-md text-[10px]",
                  trend >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                )}
              >
                {trend >= 0 ? "+" : ""}
                {trend.toFixed(1)}%
              </Badge>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
