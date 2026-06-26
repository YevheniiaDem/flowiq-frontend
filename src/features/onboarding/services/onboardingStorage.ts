import {
  ContextualHintId,
  ONBOARDING_STORAGE_KEYS,
} from "../types";

function readFlag(key: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(key) === "true";
}

function writeFlag(key: string, value: boolean): void {
  if (typeof window === "undefined") return;
  if (value) {
    localStorage.setItem(key, "true");
  } else {
    localStorage.removeItem(key);
  }
}

const HINT_KEY_MAP: Record<ContextualHintId, string> = {
  ai_accountant: ONBOARDING_STORAGE_KEYS.hintAiAccountant,
  forecasts: ONBOARDING_STORAGE_KEYS.hintForecasts,
  imports: ONBOARDING_STORAGE_KEYS.hintImports,
  tasks: ONBOARDING_STORAGE_KEYS.hintTasks,
};

export const onboardingStorage = {
  isCompleted: () => readFlag(ONBOARDING_STORAGE_KEYS.completed),
  isSkipped: () => readFlag(ONBOARDING_STORAGE_KEYS.skipped),
  isPendingWelcome: () => readFlag(ONBOARDING_STORAGE_KEYS.pending),

  setCompleted: () => {
    writeFlag(ONBOARDING_STORAGE_KEYS.completed, true);
    writeFlag(ONBOARDING_STORAGE_KEYS.pending, false);
    onboardingStorage.clearTourProgress();
  },

  setSkipped: () => {
    writeFlag(ONBOARDING_STORAGE_KEYS.skipped, true);
    writeFlag(ONBOARDING_STORAGE_KEYS.pending, false);
    onboardingStorage.clearTourProgress();
  },

  setPendingWelcome: () => writeFlag(ONBOARDING_STORAGE_KEYS.pending, true),

  clearPendingWelcome: () => writeFlag(ONBOARDING_STORAGE_KEYS.pending, false),

  shouldShowWelcome: () =>
    onboardingStorage.isPendingWelcome() &&
    !onboardingStorage.isCompleted() &&
    !onboardingStorage.isSkipped(),

  isHintShown: (hintId: ContextualHintId) => readFlag(HINT_KEY_MAP[hintId]),

  markHintShown: (hintId: ContextualHintId) => writeFlag(HINT_KEY_MAP[hintId], true),

  markAllHintsShown: () => {
    (Object.keys(HINT_KEY_MAP) as ContextualHintId[]).forEach((id) => {
      writeFlag(HINT_KEY_MAP[id], true);
    });
  },

  resetForReplay: () => {
    writeFlag(ONBOARDING_STORAGE_KEYS.completed, false);
    writeFlag(ONBOARDING_STORAGE_KEYS.skipped, false);
    onboardingStorage.clearTourProgress();
  },

  getTourProgress: (): number => {
    if (typeof window === "undefined") return 0;
    const raw = sessionStorage.getItem(ONBOARDING_STORAGE_KEYS.tourStep);
    const step = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(step) && step >= 0 ? step : 0;
  },

  setTourProgress: (step: number) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(ONBOARDING_STORAGE_KEYS.tourStep, String(step));
  },

  clearTourProgress: () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(ONBOARDING_STORAGE_KEYS.tourStep);
  },
};
