import type { HelpGuideId } from "../types";

const PENDING_KEY = "onboarding_pending_help_guide";

export const helpGuideStorage = {
  setPending(guideId: HelpGuideId): void {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(PENDING_KEY, guideId);
  },

  peekPending(): HelpGuideId | null {
    if (typeof window === "undefined") return null;
    const value = sessionStorage.getItem(PENDING_KEY);
    return value as HelpGuideId | null;
  },

  consumePending(expected: HelpGuideId): boolean {
    if (typeof window === "undefined") return false;
    const current = sessionStorage.getItem(PENDING_KEY);
    if (current !== expected) return false;
    sessionStorage.removeItem(PENDING_KEY);
    return true;
  },

  clearPending(): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(PENDING_KEY);
  },

  isPending(guideId: HelpGuideId): boolean {
    return helpGuideStorage.peekPending() === guideId;
  },
};
