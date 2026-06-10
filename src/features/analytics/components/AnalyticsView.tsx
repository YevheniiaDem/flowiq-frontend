"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useAnalytics } from "../hooks/useAnalytics";
import { AnalyticsSummaryCards } from "./AnalyticsSummaryCards";
import { AnalyticsRevenueTrendChart } from "./AnalyticsRevenueTrendChart";
import { AnalyticsExpensePieChart } from "./AnalyticsExpensePieChart";
import { AnalyticsProfitTrendChart } from "./AnalyticsProfitTrendChart";
import { AnalyticsIncomeVsExpensesChart } from "./AnalyticsIncomeVsExpensesChart";
import { FopInsightsSection } from "./FopInsightsSection";
import { TaxProfileAnalyticsSection } from "./TaxProfileAnalyticsSection";

export function AnalyticsView() {
  const { t, language, currency } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  const {
    overview,
    revenueTrend,
    expenseBreakdown,
    profitTrend,
    incomeVsExpenses,
    fopInsights,
    loading,
    error,
  } = useAnalytics();

  const period = t("analytics.last12Months");

  const labels = useMemo(
    () => ({
      summary: {
        revenue: t("analytics.stats.revenue"),
        expenses: t("analytics.stats.expenses"),
        profit: t("analytics.stats.profit"),
        taxBurden: t("analytics.stats.taxBurden"),
      },
      charts: {
        revenueTrend: t("analytics.charts.revenueTrend"),
        expenseBreakdown: t("analytics.charts.expenseBreakdown"),
        profitTrend: t("analytics.charts.profitTrend"),
        incomeVsExpenses: t("analytics.charts.incomeVsExpenses"),
        revenue: t("analytics.charts.revenue"),
        expenses: t("analytics.charts.expenses"),
        profit: t("analytics.charts.profit"),
      },
      fop: {
        title: t("analytics.fop.title"),
        currentGroup: t("analytics.fop.currentGroup"),
        incomeLimitUsage: t("analytics.fop.incomeLimitUsage"),
        estimatedTaxLoad: t("analytics.fop.estimatedTaxLoad"),
        daysUntilNextTaxPayment: t("analytics.fop.daysUntilNextTaxPayment"),
      },
      taxProfile: {
        title: t("analytics.taxProfile.title"),
        incomeLimitProgress: t("analytics.taxProfile.incomeLimitProgress"),
        topExpenseCategories: t("analytics.taxProfile.topExpenseCategories"),
        taxForecast: t("analytics.taxProfile.taxForecast"),
        noExpenses: t("analytics.taxProfile.noExpenses"),
        ofLimit: t("analytics.taxProfile.ofLimit"),
      },
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

  if (error || !overview || !fopInsights) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 p-4 text-center">
        <p className="text-sm text-destructive">{error || t("analytics.loadError")}</p>
        <p className="text-xs text-muted-foreground">{t("dashboard.backendHint")}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-6 p-4"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("analytics.title")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("analytics.subtitle")} · {t("analytics.ytd")}
        </p>
      </div>

      <AnalyticsSummaryCards
        overview={overview}
        labels={labels.summary}
        currency={currency}
        locale={locale}
      />

      <div className="grid gap-3 lg:grid-cols-2">
        <AnalyticsRevenueTrendChart
          data={revenueTrend}
          title={labels.charts.revenueTrend}
          period={period}
          revenueLabel={labels.charts.revenue}
          language={language}
          currency={currency}
        />
        <AnalyticsExpensePieChart
          data={expenseBreakdown}
          title={labels.charts.expenseBreakdown}
          period={period}
          expensesLabel={labels.charts.expenses}
          language={language}
          currency={currency}
          locale={locale}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <AnalyticsProfitTrendChart
          data={profitTrend}
          title={labels.charts.profitTrend}
          period={period}
          profitLabel={labels.charts.profit}
          language={language}
          currency={currency}
        />
        <AnalyticsIncomeVsExpensesChart
          data={incomeVsExpenses}
          title={labels.charts.incomeVsExpenses}
          period={period}
          incomeLabel={labels.charts.revenue}
          expensesLabel={labels.charts.expenses}
          language={language}
          currency={currency}
        />
      </div>

      <FopInsightsSection
        insights={fopInsights}
        labels={labels.fop}
        currency={currency}
        locale={locale}
      />

      <TaxProfileAnalyticsSection
        insights={fopInsights}
        labels={labels.taxProfile}
        currency={currency}
        locale={locale}
      />
    </motion.div>
  );
}
