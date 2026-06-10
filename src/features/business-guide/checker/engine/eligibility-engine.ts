import { AppLanguage } from "@/src/shared/i18n/types";
import { FopGroupSlug } from "../../types";
import { ACTIVITY_PRESETS, ActivityPreset, getActivityLabel, getActivityRisks } from "../data/activity-presets";
import {
  INCOME_LIMITS,
  MAX_EMPLOYEES,
  MIN_ESV_MONTHLY,
  ESV_RATE,
} from "../data/group-limits";
import {
  ActivityPresetId,
  BusinessType,
  CheckerInput,
  CheckerResult,
  EmployeeRange,
  EstimatedTaxBreakdown,
} from "../types";
import { getEngineMessages, getGroupName } from "./i18n-messages";
import { localizeKvedName } from "./kved-localize";

type ScoredGroup = Record<FopGroupSlug, number>;

function getEmployeeBounds(range: EmployeeRange): { min: number; max: number } {
  switch (range) {
    case "none":
      return { min: 0, max: 0 };
    case "1-5":
      return { min: 1, max: 5 };
    case "5-10":
      return { min: 5, max: 10 };
    case "10+":
      return { min: 11, max: Infinity };
  }
}

function resolveActivityProfile(
  activity: string,
  presetId?: ActivityPresetId
): ActivityPreset {
  if (presetId) {
    const preset = ACTIVITY_PRESETS.find((p) => p.id === presetId);
    if (preset) return preset;
  }

  const normalized = activity.toLowerCase();
  const matched = ACTIVITY_PRESETS.find((preset) =>
    preset.keywords.some((kw) => normalized.includes(kw)) ||
    preset.label.toLowerCase().includes(normalized) ||
    normalized.includes(preset.label.toLowerCase())
  );

  return matched ?? ACTIVITY_PRESETS.find((p) => p.id === "freelancing")!;
}

function isGroupDisqualified(
  slug: Exclude<FopGroupSlug, "general">,
  income: number,
  employees: EmployeeRange
): boolean {
  const { max: employeeMax } = getEmployeeBounds(employees);

  if (income > INCOME_LIMITS[slug]) return true;
  if (employeeMax > MAX_EMPLOYEES[slug]) return true;

  return false;
}

function scoreGroups(input: CheckerInput, activity: ActivityPreset): ScoredGroup {
  const scores: ScoredGroup = { "1": 0, "2": 0, "3": 0, general: 0 };
  const { annualIncome: income, employees, businessType } = input;
  const { max: employeeMax } = getEmployeeBounds(employees);

  if (income > INCOME_LIMITS["3"]) {
    scores.general += 60;
  } else if (income > INCOME_LIMITS["2"]) {
    scores["3"] += 45;
    scores.general += 15;
  } else if (income > INCOME_LIMITS["1"]) {
    scores["2"] += 45;
    scores["3"] += 20;
  } else {
    scores["1"] += 40;
    scores["2"] += 30;
  }

  if (employees === "none") {
    scores["1"] += 25;
    scores["2"] += 20;
  } else if (employees === "1-5") {
    scores["2"] += 40;
    scores["3"] += 15;
    scores["1"] -= 100;
  } else if (employees === "5-10") {
    scores["2"] += 35;
    scores["3"] += 25;
    scores["1"] -= 100;
  } else {
    scores["3"] += 45;
    scores.general += 30;
    scores["2"] -= 80;
    scores["1"] -= 100;
  }

  if (businessType === "b2b") {
    scores["3"] += 20;
    scores["2"] += 15;
    scores.general += 10;
  } else if (businessType === "b2c") {
    scores["1"] += 15;
    scores["2"] += 20;
  } else {
    scores["2"] += 25;
    scores["3"] += 15;
  }

  activity.preferredGroups.forEach((group, index) => {
    scores[group] += 20 - index * 5;
  });

  (["1", "2", "3"] as const).forEach((slug) => {
    if (isGroupDisqualified(slug, income, employees)) {
      scores[slug] -= 200;
    }
  });

  if (employeeMax > 10) {
    scores["2"] -= 100;
  }

  const incomeUtilization =
    income / INCOME_LIMITS["2"];
  if (incomeUtilization > 0.85 && income <= INCOME_LIMITS["2"]) {
    scores["3"] += 15;
  }

  return scores;
}

function pickWinner(scores: ScoredGroup): FopGroupSlug {
  const entries = Object.entries(scores) as [FopGroupSlug, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function computeConfidence(
  scores: ScoredGroup,
  winner: FopGroupSlug
): number {
  const values = Object.values(scores);
  const max = Math.max(...values);
  const second = values.sort((a, b) => b - a)[1] ?? 0;
  const gap = max - second;
  const base = 72 + Math.min(gap * 2, 18);
  const winnerScore = scores[winner];

  if (winnerScore < 0) return 65;
  return Math.min(Math.round(base + winnerScore / 20), 97);
}

function formatIncome(amount: number, language: AppLanguage): string {
  const locale = language === "uk" ? "uk-UA" : "en-US";
  return `₴${amount.toLocaleString(locale)}`;
}

function estimateTaxes(
  group: FopGroupSlug,
  income: number,
  businessType: BusinessType,
  language: AppLanguage
): EstimatedTaxBreakdown {
  const msg = getEngineMessages(language);
  const esv = Math.max(MIN_ESV_MONTHLY * 12, income * ESV_RATE * 0.1);

  if (group === "general") {
    const profitEstimate = income * 0.35;
    const incomeTax = profitEstimate * 0.18;
    const militaryTax = profitEstimate * 0.05;
    const vat = income * 0.2 * 0.15;
    const total = incomeTax + militaryTax + esv + vat;
    return {
      unifiedTax: incomeTax,
      esv,
      militaryTax,
      vat,
      total,
      effectiveRate: `${((total / income) * 100).toFixed(1)}%`,
      note: msg.taxNotes.general,
    };
  }

  if (group === "1") {
    const rate = 0.02;
    const unifiedTax = income * rate;
    const total = unifiedTax + esv;
    return {
      unifiedTax,
      esv,
      militaryTax: 0,
      vat: 0,
      total,
      effectiveRate: `${((total / income) * 100).toFixed(1)}%`,
      note: msg.taxNotes.group1,
    };
  }

  if (group === "2") {
    const rate = businessType === "b2b" ? 0.05 : 0.03;
    const unifiedTax = income * rate;
    const total = unifiedTax + esv;
    return {
      unifiedTax,
      esv,
      militaryTax: 0,
      vat: 0,
      total,
      effectiveRate: `${((total / income) * 100).toFixed(1)}%`,
      note: businessType === "b2b" ? msg.taxNotes.group2b2b : msg.taxNotes.group2b2c,
    };
  }

  const unifiedTax = income * 0.05;
  const vat = income * 0.2 * 0.12;
  const total = unifiedTax + esv + vat;
  return {
    unifiedTax,
    esv,
    militaryTax: 0,
    vat,
    total,
    effectiveRate: `${((total / income) * 100).toFixed(1)}%`,
    note: msg.taxNotes.group3,
  };
}

function buildReasons(
  input: CheckerInput,
  group: FopGroupSlug,
  activity: ActivityPreset,
  language: AppLanguage
): string[] {
  const msg = getEngineMessages(language);
  const reasons: string[] = [];
  const { annualIncome, employees, businessType } = input;
  const limit = group !== "general" ? INCOME_LIMITS[group] : null;
  const groupName = getGroupName(language, group);

  if (limit) {
    const utilization = Math.round((annualIncome / limit) * 100);
    reasons.push(
      msg.incomeWithinLimit(formatIncome(annualIncome, language), utilization, groupName)
    );
  } else {
    reasons.push(msg.incomeExceedsLimits(groupName));
  }

  if (employees === "none") {
    reasons.push(msg.noEmployees);
  } else if (employees === "10+") {
    reasons.push(msg.hiringExceedsG2);
  } else {
    reasons.push(msg.teamFits(employees.replace("-", "–"), groupName));
  }

  if (businessType === "b2b") {
    reasons.push(msg.b2bBenefit);
  } else if (businessType === "b2c") {
    reasons.push(msg.b2cBenefit);
  }

  if (activity.preferredGroups.includes(group as "1" | "2" | "3")) {
    reasons.push(msg.activityFits(getActivityLabel(activity, language)));
  }

  return reasons.slice(0, 4);
}

function buildAiExplanation(
  input: CheckerInput,
  group: FopGroupSlug,
  activity: ActivityPreset,
  reasons: string[],
  language: AppLanguage
): string {
  const msg = getEngineMessages(language);
  const groupName = getGroupName(language, group);
  const employeeText = msg.employeeTexts[input.employees];
  const businessText = msg.businessTexts[input.businessType];

  return msg.aiExplanation(
    groupName,
    formatIncome(input.annualIncome, language),
    getActivityLabel(activity, language).toLowerCase(),
    employeeText,
    businessText,
    reasons[0] ?? ""
  );
}

function buildRisks(
  input: CheckerInput,
  group: FopGroupSlug,
  activity: ActivityPreset,
  language: AppLanguage
): string[] {
  const msg = getEngineMessages(language);
  const risks: string[] = [...getActivityRisks(activity, language)];
  const { annualIncome, employees } = input;

  if (group !== "general") {
    const limit = INCOME_LIMITS[group];
    const utilization = annualIncome / limit;
    if (utilization > 0.8) {
      risks.push(
        msg.risks.incomeHigh(Math.round(utilization * 100), getGroupName(language, group))
      );
    }
  }

  if (employees !== "none" && group === "1") {
    risks.push(msg.risks.g1employees);
  }

  if (input.businessType === "b2b" && group === "2" && input.annualIncome > 3_000_000) {
    risks.push(msg.risks.b2bLarge);
  }

  if (group === "3") {
    risks.push(msg.risks.g3vat);
  }

  if (group === "general") {
    risks.push(msg.risks.generalAccounting);
  }

  return [...new Set(risks)].slice(0, 4);
}

function buildGrowthRecommendation(
  input: CheckerInput,
  group: FopGroupSlug,
  language: AppLanguage
): string {
  const msg = getEngineMessages(language);
  const { annualIncome, employees } = input;

  if (group === "1" && annualIncome > 1_200_000) return msg.growth.g1;
  if (group === "2") {
    if (annualIncome > 4_500_000) return msg.growth.g2income;
    if (employees === "5-10") return msg.growth.g2employees;
    return msg.growth.g2default;
  }
  if (group === "3" && annualIncome > 6_500_000) return msg.growth.g3;
  if (group === "general") return msg.growth.general;
  return msg.growth.default;
}

function buildEmployeesCompatibility(
  group: FopGroupSlug,
  employees: EmployeeRange,
  language: AppLanguage
): { compatible: boolean; message: string } {
  const msg = getEngineMessages(language);
  const { max } = getEmployeeBounds(employees);

  if (group === "general" || group === "3") {
    return {
      compatible: true,
      message: group === "3" ? msg.employeesCompat.g3 : msg.employeesCompat.general,
    };
  }

  if (group === "1") {
    return {
      compatible: employees === "none",
      message: employees === "none" ? msg.employeesCompat.g1yes : msg.employeesCompat.g1no,
    };
  }

  const compatible = max <= MAX_EMPLOYEES["2"];
  return {
    compatible,
    message: compatible ? msg.employeesCompat.g2yes(max) : msg.employeesCompat.g2no,
  };
}

function findAlternative(
  scores: ScoredGroup,
  winner: FopGroupSlug,
  language: AppLanguage
): CheckerResult["alternativeGroup"] | undefined {
  const msg = getEngineMessages(language);
  const entries = (Object.entries(scores) as [FopGroupSlug, number][])
    .filter(([slug]) => slug !== winner)
    .sort((a, b) => b[1] - a[1]);

  const [slug, score] = entries[0] ?? [];
  if (!slug || score < 20) return undefined;

  return {
    slug,
    name: getGroupName(language, slug),
    reason: msg.alternative(Math.round(score)),
  };
}

export function evaluateEligibility(
  input: CheckerInput,
  language: AppLanguage = "uk"
): CheckerResult {
  const activity = resolveActivityProfile(input.activity, input.activityPresetId);
  const scores = scoreGroups(input, activity);
  const recommendedGroup = pickWinner(scores);
  const confidenceScore = computeConfidence(scores, recommendedGroup);
  const reasons = buildReasons(input, recommendedGroup, activity, language);

  return {
    recommendedGroup,
    recommendedGroupName: getGroupName(language, recommendedGroup),
    confidenceScore,
    reasons,
    aiExplanation: buildAiExplanation(input, recommendedGroup, activity, reasons, language),
    estimatedTaxes: estimateTaxes(
      recommendedGroup,
      input.annualIncome,
      input.businessType,
      language
    ),
    employeesCompatibility: buildEmployeesCompatibility(
      recommendedGroup,
      input.employees,
      language
    ),
    suggestedKveds: activity.suggestedKveds.map((kved) => ({
      code: kved.code,
      name: localizeKvedName(kved.code, kved.name, language),
    })),
    risksAndWarnings: buildRisks(input, recommendedGroup, activity, language),
    growthRecommendation: buildGrowthRecommendation(input, recommendedGroup, language),
    alternativeGroup: findAlternative(scores, recommendedGroup, language),
  };
}
