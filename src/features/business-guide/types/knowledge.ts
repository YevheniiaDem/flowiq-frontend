export type KnowledgeCategory =
  | "FOP_GROUPS"
  | "TAXES"
  | "ESV"
  | "MILITARY_TAX"
  | "DECLARATIONS"
  | "KVED_DIRECTORY"
  | "ACCOUNTING_BASICS"
  | "BUSINESS_FAQ"
  | "LEGAL_CHANGES";

export type BusinessGuideTab =
  | "overview"
  | "fop-groups"
  | "taxes"
  | "kved"
  | "faq"
  | "knowledge-base"
  | "updates";

export interface KnowledgeArticleSummary {
  id: number;
  slug: string;
  title: string;
  category: KnowledgeCategory;
  summary: string;
  tags: string[];
  publishedAt?: string;
  updatedAt: string;
  readingTimeMinutes: number;
  highlight?: string;
  impact?: string;
}

export interface KnowledgeArticleDetail extends KnowledgeArticleSummary {
  content: string;
  relatedArticles: KnowledgeArticleSummary[];
}

export interface KnowledgeArticlePage {
  content: KnowledgeArticleSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface KnowledgeCategoryInfo {
  id: KnowledgeCategory;
  label: string;
  articleCount: number;
}

export interface KnowledgeSearchResponse {
  query: string;
  primaryArticle?: KnowledgeArticleSummary;
  results: KnowledgeArticleSummary[];
  relatedArticles: KnowledgeArticleSummary[];
  quickSummary?: string;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface KnowledgeDashboardSnapshot {
  popularArticles: KnowledgeArticleSummary[];
  recentlyUpdated: KnowledgeArticleSummary[];
  recommendedForYou: KnowledgeArticleSummary[];
  latestLegalChanges: KnowledgeArticleSummary[];
}
