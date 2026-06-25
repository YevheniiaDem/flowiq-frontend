export type OnboardingAnalyticsEvent =
  | "onboarding_welcome_shown"
  | "onboarding_welcome_start_tour"
  | "onboarding_welcome_skipped"
  | "onboarding_tour_started"
  | "onboarding_tour_step_viewed"
  | "onboarding_tour_completed"
  | "onboarding_tour_skipped"
  | "onboarding_hint_shown"
  | "onboarding_hint_dismissed"
  | "onboarding_checklist_item_completed"
  | "onboarding_checklist_completed"
  | "onboarding_first_import_success"
  | "onboarding_demo_workspace_enabled"
  | "onboarding_demo_workspace_disabled"
  | "onboarding_empty_state_cta_clicked"
  | "onboarding_celebration_shown"
  | "onboarding_whats_new_shown"
  | "onboarding_whats_new_dismissed"
  | "onboarding_help_article_opened"
  | "import_upload_started"
  | "import_upload_succeeded"
  | "import_upload_failed";

export interface AnalyticsEventPayload {
  event: OnboardingAnalyticsEvent;
  timestamp: string;
  properties?: Record<string, string | number | boolean>;
}

const ANALYTICS_QUEUE_KEY = "flowiq_analytics_queue";
const MAX_QUEUE_SIZE = 100;

function readQueue(): AnalyticsEventPayload[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ANALYTICS_QUEUE_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsEventPayload[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(events: AnalyticsEventPayload[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    ANALYTICS_QUEUE_KEY,
    JSON.stringify(events.slice(-MAX_QUEUE_SIZE))
  );
}

export function trackEvent(
  event: OnboardingAnalyticsEvent,
  properties?: Record<string, string | number | boolean>
): void {
  const payload: AnalyticsEventPayload = {
    event,
    timestamp: new Date().toISOString(),
    properties,
  };

  const queue = readQueue();
  queue.push(payload);
  writeQueue(queue);

  if (process.env.NODE_ENV === "development") {
    console.info("[FlowIQ Analytics]", event, properties ?? {});
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("flowiq:analytics", { detail: payload })
    );
  }
}

export function getAnalyticsQueue(): AnalyticsEventPayload[] {
  return readQueue();
}

export function clearAnalyticsQueue(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ANALYTICS_QUEUE_KEY);
}
