import { FopGroupSlug } from "../../types";

export type EmployeeRange = "none" | "1-5" | "5-10" | "10+";

export type BusinessType = "b2b" | "b2c" | "both";

export type ActivityPresetId =
  | "it-services"
  | "online-store"
  | "consulting"
  | "marketing"
  | "education"
  | "beauty-salon"
  | "freelancing";

export interface CheckerInput {
  activity: string;
  activityPresetId?: ActivityPresetId;
  annualIncome: number;
  employees: EmployeeRange;
  businessType: BusinessType;
}

export interface EstimatedTaxBreakdown {
  unifiedTax: number;
  esv: number;
  militaryTax: number;
  vat: number;
  total: number;
  effectiveRate: string;
  note: string;
}

export interface CheckerResult {
  recommendedGroup: FopGroupSlug;
  recommendedGroupName: string;
  confidenceScore: number;
  reasons: string[];
  aiExplanation: string;
  estimatedTaxes: EstimatedTaxBreakdown;
  employeesCompatibility: {
    compatible: boolean;
    message: string;
  };
  suggestedKveds: { code: string; name: string }[];
  risksAndWarnings: string[];
  growthRecommendation: string;
  alternativeGroup?: {
    slug: FopGroupSlug;
    name: string;
    reason: string;
  };
}

export type CheckerPhase = "form" | "analyzing" | "result";
