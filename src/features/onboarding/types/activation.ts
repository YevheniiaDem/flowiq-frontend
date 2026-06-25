export type ChecklistItemId =
  | "product_tour"
  | "first_import"
  | "review_transactions"
  | "ai_accountant"
  | "forecasts"
  | "first_task";

export type CelebrationId =
  | "first_import"
  | "checklist_complete"
  | "tour_complete";

export type MetricTooltipId =
  | "revenue"
  | "expenses"
  | "profit"
  | "cashFlow"
  | "taxBurden"
  | "expectedRevenue"
  | "expectedExpenses"
  | "expectedProfit"
  | "expectedTax"
  | "successRate"
  | "importedTransactions";

export interface ChecklistItemConfig {
  id: ChecklistItemId;
  titleKey: string;
  descriptionKey: string;
  href: string;
  ctaKey: string;
}

export interface CelebrationConfig {
  id: CelebrationId;
  titleKey: string;
  descriptionKey: string;
  primaryCtaKey: string;
  primaryHref: string;
  secondaryCtaKey?: string;
}

export interface WhatsNewRelease {
  version: string;
  date: string;
  titleKey: string;
  features: { titleKey: string; descriptionKey: string }[];
}

export interface DemoWorkspaceContextValue {
  isDemoMode: boolean;
  enableDemo: () => void;
  disableDemo: () => void;
}

export interface ActivationContextValue extends DemoWorkspaceContextValue {
  celebrate: (id: CelebrationId) => void;
  markChecklistItem: (id: ChecklistItemId) => void;
  refreshChecklist: () => void;
  checklistProgress: { completed: number; total: number };
  checklistState: {
    completed: Record<ChecklistItemId, boolean>;
    isComplete: boolean;
  };
}
