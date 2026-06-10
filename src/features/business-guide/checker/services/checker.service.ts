import { AppLanguage } from "@/src/shared/i18n/types";
import { getEngineMessages } from "../engine/i18n-messages";
import { evaluateEligibility } from "../engine/eligibility-engine";
import { CheckerInput, CheckerResult } from "../types";

const ANALYSIS_DURATION_MS = 2000;

export const checkerService = {
  async analyze(input: CheckerInput, language: AppLanguage): Promise<CheckerResult> {
    // const response = await apiClient.post('/business-guide/checker/analyze', input);
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, ANALYSIS_DURATION_MS));
    return evaluateEligibility(input, language);
  },

  buildShareUrl(input: CheckerInput, baseUrl?: string): string {
    const origin =
      baseUrl ?? (typeof window !== "undefined" ? window.location.origin : "");
    const params = new URLSearchParams({
      activity: input.activity,
      income: String(input.annualIncome),
      employees: input.employees,
      businessType: input.businessType,
      ...(input.activityPresetId ? { preset: input.activityPresetId } : {}),
    });
    return `${origin}/business-guide?checker=${encodeURIComponent(params.toString())}`;
  },

  buildSummaryText(
    input: CheckerInput,
    result: CheckerResult,
    language: AppLanguage
  ): string {
    const labels = getEngineMessages(language).exportLabels;
    const locale = language === "uk" ? "uk-UA" : "en-US";
    return [
      getEngineMessages(language).exportTitle,
      "",
      `${labels.activity}: ${input.activity}`,
      `${labels.income}: ₴${input.annualIncome.toLocaleString(locale)}`,
      `${labels.employees}: ${input.employees}`,
      `${labels.businessType}: ${input.businessType.toUpperCase()}`,
      "",
      `${labels.recommended}: ${result.recommendedGroupName}`,
      `${labels.confidence}: ${result.confidenceScore}%`,
      "",
      `${labels.why}:`,
      ...result.reasons.map((r) => `• ${r}`),
      "",
      `${labels.aiInsight}: ${result.aiExplanation}`,
      "",
      `${labels.taxes}: ₴${Math.round(result.estimatedTaxes.total).toLocaleString(locale)} (${result.estimatedTaxes.effectiveRate})`,
      "",
      `${labels.growth}: ${result.growthRecommendation}`,
    ].join("\n");
  },

  parseShareParams(search: string): Partial<CheckerInput> | null {
    try {
      const params = new URLSearchParams(search);
      const income = Number(params.get("income"));
      if (!params.get("activity") || Number.isNaN(income)) return null;

      return {
        activity: params.get("activity") ?? "",
        annualIncome: income,
        employees: (params.get("employees") as CheckerInput["employees"]) ?? "none",
        businessType: (params.get("businessType") as CheckerInput["businessType"]) ?? "both",
        activityPresetId: (params.get("preset") as CheckerInput["activityPresetId"]) || undefined,
      };
    } catch {
      return null;
    }
  },
};

export const CHECKER_ANALYSIS_DURATION_MS = ANALYSIS_DURATION_MS;
