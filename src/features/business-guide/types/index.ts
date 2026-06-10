export type BusinessHealthStatus = "excellent" | "good" | "fair" | "poor" | "warning";

export type RecommendationSeverity = "info" | "warning" | "critical";

export type FopGroupSlug = "1" | "2" | "3" | "general";

export interface BusinessProfile {
  currentGroup: string;
  taxSystem: string;
  mainKved: string;
  mainKvedName: string;
  status: string;
  businessHealth: BusinessHealthStatus;
  businessHealthScore: number;
  annualIncome: number;
  incomeLimit: number;
  registeredAt: string;
}

export interface FopGroupSummary {
  id: string;
  slug: FopGroupSlug;
  name: string;
  shortDescription: string;
  incomeLimit: string;
  employees: string;
  taxType: string;
}

export interface GroupTaxItem {
  name: string;
  rate: string;
  description: string;
  paymentDeadline: string;
}

export interface IncomeLimitDetail {
  annual: string;
  monthly: string;
  currency: string;
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FopGroupDetail extends FopGroupSummary {
  overview: string;
  taxes: GroupTaxItem[];
  incomeLimits: IncomeLimitDetail;
  employeesInfo: string;
  allowedActivities: string[];
  popularKveds: { code: string; name: string }[];
  advantages: string[];
  risks: string[];
  faq: FaqItem[];
}

export interface TaxType {
  id: string;
  name: string;
  description: string;
  paymentDeadlines: string[];
  formula: string;
  recommendations: string[];
}

export interface Kved {
  code: string;
  name: string;
  category: string;
  description?: string;
}

export interface SmartRecommendation {
  id: string;
  title: string;
  message: string;
  severity: RecommendationSeverity;
  actionLabel?: string;
  actionHref?: string;
}

export interface BusinessGuideSearchResult {
  type: "group" | "tax" | "kved" | "faq";
  id: string;
  title: string;
  subtitle: string;
  href?: string;
}
