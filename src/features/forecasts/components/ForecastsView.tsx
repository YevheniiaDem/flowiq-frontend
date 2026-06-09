"use client";

import { Card } from "@/src/shared/components/ui/card";
import { TrendingUp, Calendar, Target } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

export function ForecastsView() {
  const { t } = usePreferences();

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("forecasts.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("forecasts.subtitle")}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{t("forecasts.revenueForecast")}</h3>
              <p className="text-xs text-muted-foreground">{t("forecasts.next3Months")}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{t("forecasts.cashFlow")}</h3>
              <p className="text-xs text-muted-foreground">{t("forecasts.upcomingPeriods")}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Target className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{t("forecasts.growthTargets")}</h3>
              <p className="text-xs text-muted-foreground">{t("forecasts.quarterlyGoals")}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <h3 className="mb-2 text-sm font-semibold">{t("forecasts.aiPredictions")}</h3>
        <p className="text-xs text-muted-foreground">{t("forecasts.aiPredictionsHint")}</p>
      </Card>
    </div>
  );
}
