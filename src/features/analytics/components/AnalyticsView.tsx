"use client";

import { Card } from "@/src/shared/components/ui/card";
import { LineChart, BarChart3, PieChart } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

export function AnalyticsView() {
  const { t } = usePreferences();

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("analytics.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("analytics.subtitle")}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <LineChart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{t("analytics.revenueTrends")}</h3>
              <p className="text-xs text-muted-foreground">{t("analytics.comingSoon")}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <BarChart3 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{t("analytics.expenseAnalysis")}</h3>
              <p className="text-xs text-muted-foreground">{t("analytics.comingSoon")}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <PieChart className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{t("analytics.profitDistribution")}</h3>
              <p className="text-xs text-muted-foreground">{t("analytics.comingSoon")}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <h3 className="mb-3 text-sm font-semibold">{t("analytics.revenueByMonth")}</h3>
          <div className="flex h-64 items-center justify-center text-xs text-muted-foreground">
            {t("analytics.chartPlaceholder")}
          </div>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <h3 className="mb-3 text-sm font-semibold">{t("analytics.expenseCategories")}</h3>
          <div className="flex h-64 items-center justify-center text-xs text-muted-foreground">
            {t("analytics.chartPlaceholder")}
          </div>
        </Card>
      </div>
    </div>
  );
}
