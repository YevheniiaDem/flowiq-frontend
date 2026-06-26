"use client";

import { useMemo } from "react";
import { Loader2, TrendingUp } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useContextualHint, usePageActivation, EmptyState, usePendingHelpGuide } from "@/src/features/onboarding";
import { useForecasts } from "../hooks/useForecasts";
import { ForecastSummaryCards } from "./ForecastSummaryCards";
import { RevenueForecastChart } from "./RevenueForecastChart";
import { ExpenseForecastChart } from "./ExpenseForecastChart";
import { ProfitForecastChart } from "./ProfitForecastChart";
import { TaxForecastCard } from "./TaxForecastCard";
import { FopLimitForecastCard } from "./FopLimitForecastCard";
import { ForecastInsights } from "./ForecastInsights";
import { ForecastWarningBanners } from "./ForecastWarningBanners";

export function ForecastsView() {
  const { t, language, currency } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  const { summary, revenue, expenses, profit, taxes, fopLimit, loading, error } =
    useForecasts();

  useContextualHint("forecasts", !loading && !error && !!summary);
  usePendingHelpGuide("forecasts_guide", !loading && !error && !!summary);
  usePageActivation("forecasts", "forecasts");

  const labels = useMemo(
    () => ({
      summary: {
        revenue: t("forecasts.stats.revenue"),
        expenses: t("forecasts.stats.expenses"),
        profit: t("forecasts.stats.profit"),
        tax: t("forecasts.stats.tax"),
        next3Months: t("forecasts.next3Months"),
      },
      charts: {
        revenue: t("forecasts.charts.revenue"),
        expenses: t("forecasts.charts.expenses"),
        profit: t("forecasts.charts.profit"),
        period: t("forecasts.charts.period"),
        actual: t("forecasts.charts.actual"),
        forecast: t("forecasts.charts.forecast"),
      },
      tax: {
        title: t("forecasts.tax.title"),
        currentBurden: t("forecasts.tax.currentBurden"),
        annualForecast: t("forecasts.tax.annualForecast"),
        projected: t("forecasts.tax.projected"),
        projectedTax: t("forecasts.tax.projectedTax"),
        horizonMonths: t("forecasts.tax.horizonMonths"),
      },
      fop: {
        title: t("forecasts.fop.title"),
        currentGroup: t("forecasts.fop.currentGroup"),
        currentUsage: t("forecasts.fop.currentUsage"),
        incomeLimit: t("forecasts.fop.incomeLimit"),
        monthsUntilLimit: t("forecasts.fop.monthsUntilLimit"),
        projectedUsage: t("forecasts.fop.projectedUsage"),
        horizonMonths: t("forecasts.fop.horizonMonths"),
        limitExceeded: t("forecasts.fop.limitExceeded"),
      },
      insights: t("forecasts.insights"),
    }),
    [t]
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !summary || !revenue || !expenses || !profit || !taxes || !fopLimit) {
    return (
      <div data-testid="forecasts-page" className="space-y-4 p-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("forecasts.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("forecasts.subtitle")}</p>
        </div>
        <EmptyState
          testId="forecasts-empty-state"
          icon={TrendingUp}
          title={t("activation.empty.forecasts.title")}
          description={t("activation.empty.forecasts.description")}
          primaryAction={{
            label: t("activation.empty.forecasts.importCta"),
            href: "/imports",
          }}
        />
      </div>
    );
  }

  return (
    <div data-testid="forecasts-page" className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("forecasts.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("forecasts.subtitle")}</p>
      </div>

      <ForecastWarningBanners warnings={summary.warnings} />

      <ForecastSummaryCards
        summary={summary}
        labels={labels.summary}
        currency={currency}
        locale={locale}
        metricTooltips={{
          revenue: t("activation.metrics.expectedRevenue"),
          expenses: t("activation.metrics.expectedExpenses"),
          profit: t("activation.metrics.expectedProfit"),
          tax: t("activation.metrics.expectedTax"),
        }}
      />

      <div data-testid="forecasts-charts" className="grid gap-3 lg:grid-cols-2">
        <RevenueForecastChart
          data={revenue}
          title={labels.charts.revenue}
          period={labels.charts.period}
          actualLabel={labels.charts.actual}
          forecastLabel={labels.charts.forecast}
          language={language}
          currency={currency}
        />
        <ExpenseForecastChart
          data={expenses}
          title={labels.charts.expenses}
          period={labels.charts.period}
          expenseLabel={labels.charts.expenses}
          language={language}
          currency={currency}
        />
      </div>

      <ProfitForecastChart
        data={profit}
        title={labels.charts.profit}
        period={labels.charts.period}
        profitLabel={labels.charts.profit}
        language={language}
        currency={currency}
      />

      <TaxForecastCard
        data={taxes}
        labels={labels.tax}
        currency={currency}
        locale={locale}
      />

      <FopLimitForecastCard
        data={fopLimit}
        labels={labels.fop}
        currency={currency}
        locale={locale}
      />

      <ForecastInsights insights={summary.insights} title={labels.insights} />
    </div>
  );
}
