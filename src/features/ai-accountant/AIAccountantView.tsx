"use client";

import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useAIAccountant } from "./hooks/useAIAccountant";
import { AIHealthSummaryCard } from "./components/AIHealthSummaryCard";
import { AIRecommendationsSection } from "./components/AIRecommendationsSection";
import { AIAccountantChat } from "./components/AIAccountantChat";
import { TaxAdvisorSection } from "./components/TaxAdvisorSection";
import { ForecastCenterSection } from "./components/ForecastCenterSection";
import { RecommendationType } from "./types";

export function AIAccountantView() {
  const { t, language, currency } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  const {
    health,
    recommendations,
    taxAdvisor,
    forecasts,
    loading,
    error,
    chatMessages,
    chatSending,
    sendMessage,
  } = useAIAccountant();

  const typeLabels = useMemo(
    (): Record<RecommendationType, string> => ({
      CRITICAL: t("aiAccountant.recommendations.critical"),
      WARNING: t("aiAccountant.recommendations.warning"),
      OPPORTUNITY: t("aiAccountant.recommendations.opportunity"),
      SUCCESS: t("aiAccountant.recommendations.success"),
    }),
    [t]
  );

  const chatSuggestions = useMemo(
    () => [
      t("aiAccountant.chat.suggestions.earnings"),
      t("aiAccountant.chat.suggestions.expenses"),
      t("aiAccountant.chat.suggestions.fopLimit"),
      t("aiAccountant.chat.suggestions.taxes"),
      t("aiAccountant.chat.suggestions.categories"),
    ],
    [t]
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !health || !taxAdvisor || !forecasts) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 p-4 text-center">
        <p className="text-sm text-destructive">{error || t("aiAccountant.loadError")}</p>
        <p className="text-xs text-muted-foreground">{t("dashboard.backendHint")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("aiAccountant.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("aiAccountant.subtitle")}</p>
      </div>

      <AIHealthSummaryCard
        health={health}
        labels={{
          title: t("aiAccountant.health.title"),
          score: t("aiAccountant.health.score"),
          excellent: t("aiAccountant.health.excellent"),
          good: t("aiAccountant.health.good"),
          fair: t("aiAccountant.health.fair"),
          poor: t("aiAccountant.health.poor"),
        }}
      />

      <AIRecommendationsSection
        recommendations={recommendations}
        title={t("aiAccountant.recommendations.title")}
        typeLabels={typeLabels}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AIAccountantChat
          messages={chatMessages}
          sending={chatSending}
          onSend={sendMessage}
          labels={{
            title: t("aiAccountant.chat.title"),
            subtitle: t("aiAccountant.chat.subtitle"),
            placeholder: t("aiAccountant.chat.placeholder"),
            you: t("aiAccountant.chat.you"),
            assistant: t("aiAccountant.chat.assistant"),
            thinking: t("aiAccountant.chat.thinking"),
            suggestions: chatSuggestions,
          }}
        />

        <div className="space-y-6">
          <TaxAdvisorSection
            tax={taxAdvisor}
            labels={{
              title: t("aiAccountant.tax.title"),
              currentGroup: t("aiAccountant.tax.currentGroup"),
              incomeLimitUsage: t("aiAccountant.tax.incomeLimitUsage"),
              estimatedTaxes: t("aiAccountant.tax.estimatedTaxes"),
              daysUntilDeadline: t("aiAccountant.tax.daysUntilDeadline"),
              forecastTax: t("aiAccountant.tax.forecastTax"),
            }}
            currency={currency}
            locale={locale}
          />
        </div>
      </div>

      <ForecastCenterSection
        forecasts={forecasts}
        labels={{
          title: t("aiAccountant.forecast.title"),
          months: t("aiAccountant.forecast.months"),
          revenue: t("aiAccountant.forecast.revenue"),
          expenses: t("aiAccountant.forecast.expenses"),
          profit: t("aiAccountant.forecast.profit"),
          cashFlow: t("aiAccountant.forecast.cashFlow"),
        }}
        currency={currency}
        locale={locale}
      />
    </div>
  );
}
