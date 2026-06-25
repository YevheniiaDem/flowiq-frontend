export { OnboardingProvider } from "./components/OnboardingProvider";
export { ActivationProvider, APP_RELEASE_VERSION } from "./components/ActivationProvider";
export { WelcomeModal } from "./components/WelcomeModal";
export { EmptyState } from "./components/EmptyState";
export { ActivationChecklist } from "./components/ActivationChecklist";
export { HelpLearnCenter } from "./components/HelpLearnCenter";
export { DemoWorkspaceBanner } from "./components/DemoWorkspaceBanner";
export { MetricTooltip } from "./components/MetricTooltip";
export { CelebrationModal } from "./components/CelebrationModal";
export { FirstImportSuccessModal } from "./components/FirstImportSuccessModal";
export { WhatsNewModal } from "./components/WhatsNewModal";

export { useOnboarding, useOnboardingOptional } from "./hooks/useOnboardingContext";
export { useActivation, useActivationOptional, useDemoWorkspace } from "./hooks/useActivationContext";
export { useContextualHint } from "./hooks/useContextualHint";
export { usePageActivation } from "./hooks/usePageActivation";
export { useFirstImportSuccess } from "./hooks/useFirstImportSuccess";

export { onboardingStorage } from "./services/onboardingStorage";
export { activationStorage } from "./services/activationStorage";
export { trackEvent, getAnalyticsQueue, clearAnalyticsQueue } from "./services/productAnalytics";
export { getDemoDashboardData } from "./services/demoWorkspaceData";

export { CHECKLIST_ITEMS } from "./config/checklistItems";
export { WHATS_NEW_RELEASES, getLatestRelease } from "./config/whatsNew";

export type { ContextualHintId, OnboardingContextValue } from "./types";
export type {
  ChecklistItemId,
  CelebrationId,
  MetricTooltipId,
  ActivationContextValue,
  WhatsNewRelease,
} from "./types/activation";
export type { OnboardingAnalyticsEvent, AnalyticsEventPayload } from "./services/productAnalytics";
