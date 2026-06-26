export const ONBOARDING_STORAGE_KEYS = {
  completed: "onboarding_completed",
  skipped: "onboarding_skipped",
  pending: "onboarding_pending",
  tourStep: "onboarding_tour_step",
  hintAiAccountant: "onboarding_hint_ai_accountant",
  hintForecasts: "onboarding_hint_forecasts",
  hintImports: "onboarding_hint_imports",
  hintTasks: "onboarding_hint_tasks",
} as const;

export type ContextualHintId =
  | "ai_accountant"
  | "forecasts"
  | "imports"
  | "tasks";

export type HelpGuideId =
  | "checklist"
  | "import_guide"
  | "transactions_guide"
  | "business_guide"
  | "ai_accountant"
  | "forecasts_guide"
  | "tasks_guide";

export type ProductTourStepId =
  | "dashboard"
  | "imports"
  | "ai_accountant"
  | "forecasts"
  | "tasks_notifications"
  | "success";

export interface OnboardingContextValue {
  isWelcomeOpen: boolean;
  isTourActive: boolean;
  startTour: (options?: { fromSettings?: boolean; resume?: boolean }) => void;
  startHelpGuide: (guideId: HelpGuideId) => void;
  skipOnboarding: () => void;
  dismissWelcome: () => void;
}
