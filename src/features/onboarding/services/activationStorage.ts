import type { ChecklistItemId, CelebrationId } from "../types/activation";

const KEYS = {
  checklistDismissed: "onboarding_checklist_dismissed",
  checklistPrefix: "onboarding_checklist_",
  firstImportCelebrated: "onboarding_first_import_celebrated",
  demoWorkspace: "onboarding_demo_workspace",
  whatsNewVersion: "onboarding_whats_new_version",
  celebrationPrefix: "onboarding_celebration_",
  visitedPrefix: "onboarding_visited_",
} as const;

function readFlag(key: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(key) === "true";
}

function writeFlag(key: string, value: boolean): void {
  if (typeof window === "undefined") return;
  if (value) localStorage.setItem(key, "true");
  else localStorage.removeItem(key);
}

export const activationStorage = {
  isChecklistDismissed: () => readFlag(KEYS.checklistDismissed),
  dismissChecklist: () => writeFlag(KEYS.checklistDismissed, true),
  showChecklist: () => writeFlag(KEYS.checklistDismissed, false),

  isChecklistItemDone: (id: ChecklistItemId) =>
    readFlag(`${KEYS.checklistPrefix}${id}`),

  markChecklistItemDone: (id: ChecklistItemId) =>
    writeFlag(`${KEYS.checklistPrefix}${id}`, true),

  isFirstImportCelebrated: () => readFlag(KEYS.firstImportCelebrated),
  markFirstImportCelebrated: () => writeFlag(KEYS.firstImportCelebrated, true),

  isDemoWorkspace: () => readFlag(KEYS.demoWorkspace),
  setDemoWorkspace: (enabled: boolean) => writeFlag(KEYS.demoWorkspace, enabled),

  getWhatsNewVersion: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(KEYS.whatsNewVersion);
  },

  setWhatsNewVersion: (version: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEYS.whatsNewVersion, version);
  },

  isCelebrationShown: (id: CelebrationId) =>
    readFlag(`${KEYS.celebrationPrefix}${id}`),

  markCelebrationShown: (id: CelebrationId) =>
    writeFlag(`${KEYS.celebrationPrefix}${id}`, true),

  markPageVisited: (page: string) =>
    writeFlag(`${KEYS.visitedPrefix}${page}`, true),

  isPageVisited: (page: string) =>
    readFlag(`${KEYS.visitedPrefix}${page}`),
};
