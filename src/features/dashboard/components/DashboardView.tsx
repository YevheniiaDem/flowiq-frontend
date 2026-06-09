"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { StatCard } from "./StatCard";
import { AISummaryCard } from "./AISummaryCard";
import { BusinessHealthCard } from "./BusinessHealthCard";
import { AIInsightCard } from "./AIInsightCard";
import { RevenueTrendChart } from "./RevenueTrendChart";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { dashboardService } from "@/src/services";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { TranslationKey } from "@/src/shared/i18n";
import { AIInsight, BusinessHealthScore, StatCard as StatCardType } from "@/src/shared/types";
import { formatCurrency } from "@/src/shared/utils/currency";

const STAT_LABEL_KEYS: Record<string, TranslationKey> = {
  revenue: "dashboard.stats.revenue",
  expenses: "dashboard.stats.expenses",
  profit: "dashboard.stats.profit",
  cashFlow: "dashboard.stats.cashFlow",
};

export function DashboardView() {
  const { t, language, currency } = usePreferences();
  const [stats, setStats] = useState<StatCardType[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [health, setHealth] = useState<BusinessHealthScore | null>(null);
  const [summary, setSummary] = useState<{ text: string; badge: string } | null>(null);
  const [revenueTrend, setRevenueTrend] = useState<{ month: string; amount: number }[]>([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState<{ category: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        statsData,
        insightsData,
        healthData,
        summaryData,
        revenueData,
        expenseData,
      ] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getInsights(),
        dashboardService.getBusinessHealth(),
        dashboardService.getAISummary(),
        dashboardService.getRevenueTrend(),
        dashboardService.getExpenseBreakdown(),
      ]);
      setStats(statsData);
      setInsights(insightsData);
      setHealth(healthData);
      setSummary(summaryData);
      setRevenueTrend(revenueData);
      setExpenseBreakdown(expenseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("dashboard.loadError"));
    } finally {
      setLoading(false);
    }
  }, [t, language, currency]);

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

  if (error || !health || !summary) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 p-4 text-center">
        <p className="text-sm text-destructive">{error || t("dashboard.loadError")}</p>
        <p className="text-xs text-muted-foreground">{t("dashboard.backendHint")}</p>
      </div>
    );
  }

  const locale = language === "uk" ? "uk-UA" : "en-US";

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={t(STAT_LABEL_KEYS[stat.labelKey] ?? "dashboard.stats.revenue")}
            value={formatCurrency(stat.amount, currency, locale)}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AISummaryCard text={summary.text} badge={summary.badge} />
        </div>
        <BusinessHealthCard health={health} />
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
    </div>
  );
}
