"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { activationStorage } from "../services/activationStorage";
import { onboardingStorage } from "../services/onboardingStorage";
import { trackEvent } from "../services/productAnalytics";
import { CHECKLIST_ITEMS } from "../config/checklistItems";
import { APP_RELEASE_VERSION, getLatestRelease } from "../config/whatsNew";
import { ActivationContext } from "../hooks/useActivationContext";
import { CelebrationModal, CelebrationPayload } from "./CelebrationModal";
import { WhatsNewModal } from "./WhatsNewModal";
import type { CelebrationId, ChecklistItemId } from "../types/activation";
import "../styles/celebration.css";

interface ChecklistState {
  completed: Record<ChecklistItemId, boolean>;
  isComplete: boolean;
}

function buildChecklistState(): ChecklistState {
  const completed = Object.fromEntries(
    CHECKLIST_ITEMS.map((item) => [
      item.id,
      activationStorage.isChecklistItemDone(item.id),
    ])
  ) as Record<ChecklistItemId, boolean>;

  if (onboardingStorage.isCompleted()) {
    completed.product_tour = true;
  }

  const isComplete = CHECKLIST_ITEMS.every((item) => completed[item.id]);
  return { completed, isComplete };
}

const CELEBRATION_COPY: Record<
  CelebrationId,
  {
    titleKey: string;
    descriptionKey: string;
    primaryCtaKey: string;
    primaryHref: string;
    secondaryCtaKey?: string;
  }
> = {
  first_import: {
    titleKey: "activation.celebrations.firstImport.title",
    descriptionKey: "activation.celebrations.firstImport.description",
    primaryCtaKey: "activation.celebrations.firstImport.cta",
    primaryHref: "/transactions",
    secondaryCtaKey: "activation.celebrations.firstImport.secondary",
  },
  checklist_complete: {
    titleKey: "activation.celebrations.checklistComplete.title",
    descriptionKey: "activation.celebrations.checklistComplete.description",
    primaryCtaKey: "activation.celebrations.checklistComplete.cta",
    primaryHref: "/analytics",
  },
  tour_complete: {
    titleKey: "activation.celebrations.tourComplete.title",
    descriptionKey: "activation.celebrations.tourComplete.description",
    primaryCtaKey: "activation.celebrations.tourComplete.cta",
    primaryHref: "/imports",
  },
};

interface ActivationProviderProps {
  children: ReactNode;
}

export function ActivationProvider({ children }: ActivationProviderProps) {
  const router = useRouter();
  const { t } = usePreferences();
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [checklistState, setChecklistState] = useState<ChecklistState>({
    completed: {} as Record<ChecklistItemId, boolean>,
    isComplete: false,
  });
  const [celebration, setCelebration] = useState<CelebrationPayload | null>(null);
  const [whatsNewRelease, setWhatsNewRelease] = useState(
    () => getLatestRelease() ?? null
  );
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  const refreshChecklist = useCallback(() => {
    setChecklistState(buildChecklistState());
  }, []);

  useEffect(() => {
    setIsDemoMode(activationStorage.isDemoWorkspace());
    refreshChecklist();
  }, [refreshChecklist]);

  useEffect(() => {
    const latest = getLatestRelease();
    if (!latest) return;
    const seen = activationStorage.getWhatsNewVersion();
    if (seen !== latest.version) {
      const timer = window.setTimeout(() => {
        setShowWhatsNew(true);
        trackEvent("onboarding_whats_new_shown", { version: latest.version });
      }, 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const celebrate = useCallback(
    (id: CelebrationId) => {
      if (activationStorage.isCelebrationShown(id)) return;

      const copy = CELEBRATION_COPY[id];
      activationStorage.markCelebrationShown(id);
      trackEvent("onboarding_celebration_shown", { celebration: id });

      setCelebration({
        id,
        title: t(copy.titleKey as never),
        description: t(copy.descriptionKey as never),
        primaryCta: t(copy.primaryCtaKey as never),
        onPrimary: () => {
          setCelebration(null);
          router.push(copy.primaryHref);
        },
        secondaryCta: copy.secondaryCtaKey
          ? t(copy.secondaryCtaKey as never)
          : undefined,
        onSecondary: copy.secondaryCtaKey
          ? () => {
              setCelebration(null);
              router.push("/");
            }
          : undefined,
      });
    },
    [router, t]
  );

  useEffect(() => {
    const onTourComplete = () => {
      refreshChecklist();
      if (!activationStorage.isCelebrationShown("tour_complete")) {
        celebrate("tour_complete");
      }
    };
    window.addEventListener("flowiq:tour-completed", onTourComplete);
    return () => window.removeEventListener("flowiq:tour-completed", onTourComplete);
  }, [celebrate, refreshChecklist]);

  const markChecklistItem = useCallback(
    (id: ChecklistItemId) => {
      if (activationStorage.isChecklistItemDone(id)) return;
      activationStorage.markChecklistItemDone(id);
      trackEvent("onboarding_checklist_item_completed", { item: id });
      refreshChecklist();

      const next = buildChecklistState();
      if (next.isComplete && !activationStorage.isCelebrationShown("checklist_complete")) {
        trackEvent("onboarding_checklist_completed");
        celebrate("checklist_complete");
      }
    },
    [celebrate, refreshChecklist]
  );

  const enableDemo = useCallback(() => {
    activationStorage.setDemoWorkspace(true);
    setIsDemoMode(true);
    trackEvent("onboarding_demo_workspace_enabled");
    router.push("/");
  }, [router]);

  const disableDemo = useCallback(() => {
    activationStorage.setDemoWorkspace(false);
    setIsDemoMode(false);
    trackEvent("onboarding_demo_workspace_disabled");
    router.refresh();
  }, [router]);

  const dismissWhatsNew = useCallback(() => {
    const latest = getLatestRelease();
    if (latest) {
      activationStorage.setWhatsNewVersion(latest.version);
      trackEvent("onboarding_whats_new_dismissed", { version: latest.version });
    }
    setShowWhatsNew(false);
  }, []);

  const checklistProgress = useMemo(() => {
    const completed = CHECKLIST_ITEMS.filter(
      (item) => checklistState.completed[item.id]
    ).length;
    return { completed, total: CHECKLIST_ITEMS.length };
  }, [checklistState]);

  const contextValue = useMemo(
    () => ({
      isDemoMode,
      enableDemo,
      disableDemo,
      celebrate,
      markChecklistItem,
      refreshChecklist,
      checklistProgress,
      checklistState,
    }),
    [
      celebrate,
      checklistProgress,
      checklistState,
      disableDemo,
      enableDemo,
      isDemoMode,
      markChecklistItem,
      refreshChecklist,
    ]
  );

  return (
    <ActivationContext.Provider value={contextValue}>
      {children}
      <CelebrationModal celebration={celebration} onClose={() => setCelebration(null)} />
      {showWhatsNew && whatsNewRelease && (
        <WhatsNewModal
          release={whatsNewRelease}
          labels={{
            title: t("activation.whatsNew.label"),
            gotIt: t("activation.whatsNew.gotIt"),
            featurePrefix: "",
          }}
          translate={(key) => t(key as never)}
          onDismiss={dismissWhatsNew}
        />
      )}
    </ActivationContext.Provider>
  );
}

export { APP_RELEASE_VERSION };
