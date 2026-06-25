"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Loader2, LayoutDashboard } from "lucide-react";
import { StatCard } from "./StatCard";
import { AISummaryCard } from "./AISummaryCard";
import { TaxProfileCard } from "./TaxProfileCard";
import { AIInsightCard } from "./AIInsightCard";
import { RevenueTrendChart } from "./RevenueTrendChart";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { RecentNotificationsWidget } from "@/src/features/notifications";
import { ForecastSnapshotWidget } from "./ForecastSnapshotWidget";
import { TasksDashboardWidget } from "@/src/features/tasks";
import { BusinessGuideDashboardWidget } from "@/src/features/business-guide";
import { ImportDashboardWidget } from "@/src/features/imports";
import { ForecastSnapshot } from "@/src/features/forecasts/types";
import { dashboardService, taxProfileService } from "@/src/services";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { TranslationKey } from "@/src/shared/i18n";
import {
  ActivationChecklist,
  EmptyState,
  getDemoDashboardData,
  useDemoWorkspace,
} from "@/src/features/onboarding";
import {
  AIInsight,
  StatCard as StatCardType,
  TaxProfile,
} from "@/src/shared/types";
import { formatCurrency } from "@/src/shared/utils/currency";
import { trackEvent } from "@/src/features/onboarding/services/productAnalytics";

const STAT_LABEL_KEYS: Record<string, TranslationKey> = {
  revenue: "dashboard.stats.revenue",
  expenses: "dashboard.stats.expenses",
  profit: "dashboard.stats.profit",
  cashFlow: "dashboard.stats.cashFlow",
};

const STAT_TOOLTIP_KEYS: Record<string, TranslationKey> = {
  revenue: "activation.metrics.revenue",
  expenses: "activation.metrics.expenses",
  profit: "activation.metrics.profit",
  cashFlow: "activation.metrics.cashFlow",
};

export function DashboardView() {
  const { t, language, currency } = usePreferences();
  const { isDemoMode, enableDemo } = useDemoWorkspace();
  const [stats, setStats] = useState<StatCardType[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [taxProfile, setTaxProfile] = useState<TaxProfile | null>(null);
  const [summary, setSummary] = useState<{ text: string; badge: string } | null>(null);
  const [revenueTrend, setRevenueTrend] = useState<{ month: string; amount: number }[]>([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState<{ category: string; amount: number }[]>([]);
  const [forecastSnapshot, setForecastSnapshot] = useState<ForecastSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDemoData = useCallback(() => {
    const demo = getDemoDashboardData(language);
    setStats(demo.stats);
    setInsights(demo.insights);
    setTaxProfile(demo.taxProfile);
    setSummary(demo.summary);
    setRevenueTrend(demo.revenueTrend);
    setExpenseBreakdown(demo.expenseBreakdown);
    setForecastSnapshot(demo.forecastSnapshot);
    setError(null);
    setLoading(false);
  }, [language]);

  const loadDashboard = useCallback(async () => {
    if (isDemoMode) {
      loadDemoData();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [
        statsData,
        insightsData,
        taxProfileData,
        summaryData,
        revenueData,
        expenseData,
        forecastData,
      ] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getInsights(),
        taxProfileService.getTaxProfile(language),
        dashboardService.getAISummary(),
        dashboardService.getRevenueTrend(),
        dashboardService.getExpenseBreakdown(),
        dashboardService.getForecastSnapshot(),
      ]);
      setStats(statsData);
      setInsights(insightsData);
      setTaxProfile(taxProfileData);
      setSummary(summaryData);
      setRevenueTrend(revenueData);
      setExpenseBreakdown(expenseData);
      setForecastSnapshot(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("dashboard.loadError"));
    } finally {
      setLoading(false);
    }
  }, [isDemoMode, language, loadDemoData, t, currency]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !isDemoMode) {
    return (
      <div data-testid="dashboard-page" className="space-y-4 p-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>
        <ActivationChecklist />
        <EmptyState
          testId="dashboard-empty-state"
          icon={LayoutDashboard}
          title={t("activation.empty.dashboard.title")}
          description={t("activation.empty.dashboard.description")}
          primaryAction={{
            label: t("activation.empty.dashboard.importCta"),
            href: "/imports",
            testId: "dashboard-empty-import-btn",
          }}
          secondaryAction={{
            label: t("activation.empty.dashboard.demoCta"),
            onClick: () => {
              trackEvent("onboarding_demo_workspace_enabled", { source: "dashboard_empty" });
              enableDemo();
            },
            testId: "dashboard-empty-demo-btn",
          }}
        />
      </div>
    );
  }

  if (!taxProfile || !summary) {
    return null;
  }

  const locale = language === "uk" ? "uk-UA" : "en-US";

  return (
    <div data-testid="dashboard-page" className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      <ActivationChecklist />

      <div data-testid="dashboard-stats" className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={t(STAT_LABEL_KEYS[stat.labelKey] ?? "dashboard.stats.revenue")}
            value={formatCurrency(stat.amount, currency, locale)}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            metricId={stat.labelKey}
            metricTooltip={t(STAT_TOOLTIP_KEYS[stat.labelKey] ?? "activation.metrics.revenue")}
          />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <AISummaryCard text={summary.text} badge={summary.badge} />
        </div>
        <RecentNotificationsWidget className="h-full" />
        <TaxProfileCard profile={taxProfile} />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("dashboard.aiInsights")}</h2>
          <button className="flex items-center gap-1 text-xs text-primary hover:underline">
            {t("dashboard.viewAll")}
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <RevenueTrendChart data={revenueTrend} period={t("dashboard.last6Months")} />
        <ExpenseBreakdownChart data={expenseBreakdown} period={t("dashboard.thisMonth")} />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {forecastSnapshot && <ForecastSnapshotWidget snapshot={forecastSnapshot} />}
        <TasksDashboardWidget />
      </div>

      <ImportDashboardWidget />

      <BusinessGuideDashboardWidget />
    </div>
  );
}
