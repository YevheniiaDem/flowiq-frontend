"use client";

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Driver } from "driver.js";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { createFlowiqDriver } from "../services/createDriver";
import { activationStorage } from "../services/activationStorage";
import { onboardingStorage } from "../services/onboardingStorage";
import { trackEvent } from "../services/productAnalytics";
import { setTourActiveSync } from "../services/tourState";
import {
  buildProductTourSteps,
  prepareTourStepRoute,
} from "../tour-config/productTour";
import { HELP_GUIDES } from "../tour-config/helpGuides";
import { dispatchHelpGuideReady } from "../hooks/usePendingHelpGuide";
import { helpGuideStorage } from "../services/helpGuideStorage";
import { OnboardingContext } from "../hooks/useOnboardingContext";
import type { HelpGuideId } from "../types";
import { WelcomeModal } from "./WelcomeModal";
import "../styles/onboarding.css";

interface OnboardingProviderProps {
  children: ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const router = useRouter();
  const { t } = usePreferences();
  const driverRef = useRef<Driver | null>(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  useEffect(() => {
    if (onboardingStorage.shouldShowWelcome()) {
      setIsWelcomeOpen(true);
      trackEvent("onboarding_welcome_shown");
    }
  }, []);

  const destroyTour = useCallback(() => {
    driverRef.current?.destroy();
    driverRef.current = null;
    setTourActiveSync(false);
    setIsTourActive(false);
  }, []);

  const handleTourSkip = useCallback(() => {
    onboardingStorage.setSkipped();
    onboardingStorage.clearTourProgress();
    trackEvent("onboarding_tour_skipped");
    destroyTour();
  }, [destroyTour]);

  const handleTourComplete = useCallback(() => {
    onboardingStorage.setCompleted();
    onboardingStorage.clearTourProgress();
    onboardingStorage.markAllHintsShown();
    activationStorage.markChecklistItemDone("product_tour");
    trackEvent("onboarding_tour_completed");
    window.dispatchEvent(new CustomEvent("flowiq:tour-completed"));
    destroyTour();
  }, [destroyTour]);

  const startTour = useCallback(
    async (options?: { fromSettings?: boolean; resume?: boolean }) => {
      setIsWelcomeOpen(false);
      onboardingStorage.clearPendingWelcome();
      destroyTour();

      const fromSettings = options?.fromSettings ?? false;
      const resume = options?.resume ?? !fromSettings;
      const startStep = resume ? onboardingStorage.getTourProgress() : 0;

      if (fromSettings) {
        onboardingStorage.clearTourProgress();
      }

      setTourActiveSync(true);
      setIsTourActive(true);

      const driverInstance = createFlowiqDriver({
        steps: buildProductTourSteps(router, t, {
          onSkip: handleTourSkip,
          onComplete: handleTourComplete,
          onImportCta: () => router.push("/imports"),
          fromSettings,
        }),
        onDestroyed: () => {
          driverRef.current = null;
          setTourActiveSync(false);
          setIsTourActive(false);
        },
        onCloseClick: () => {
          if (!fromSettings) {
            handleTourSkip();
          } else {
            onboardingStorage.clearTourProgress();
            destroyTour();
          }
        },
        onHighlighted: (_element, _step, { state }) => {
          onboardingStorage.setTourProgress(state.activeIndex ?? 0);
        },
      });

      driverRef.current = driverInstance;
      trackEvent("onboarding_tour_started", { fromSettings, startStep });

      const effectiveStep = fromSettings ? 0 : Math.min(startStep, 5);
      if (effectiveStep > 0) {
        await prepareTourStepRoute(router, effectiveStep);
      }

      driverInstance.drive(effectiveStep);
    },
    [destroyTour, handleTourComplete, handleTourSkip, router, t]
  );

  const startHelpGuide = useCallback(
    (guideId: HelpGuideId) => {
      if (isTourActive) return;

      destroyTour();
      helpGuideStorage.setPending(guideId);
      trackEvent("onboarding_help_guide_requested", { guide: guideId, source: "settings" });

      if (guideId === "checklist") {
        activationStorage.showChecklist();
        window.dispatchEvent(new CustomEvent("flowiq:checklist-focus"));
      }

      const targetPath = HELP_GUIDES[guideId].path;
      const navigatePath =
        guideId === "business_guide" ? "/business-guide?tab=overview" : targetPath;
      const isOnTarget =
        typeof window !== "undefined" &&
        (window.location.pathname === targetPath ||
          (guideId === "business_guide" && window.location.pathname === "/business-guide"));

      if (isOnTarget) {
        if (guideId === "business_guide" && !window.location.search.includes("tab=overview")) {
          router.replace("/business-guide?tab=overview");
        }
        dispatchHelpGuideReady(guideId);
      } else {
        router.push(navigatePath);
      }
    },
    [destroyTour, isTourActive, router]
  );

  const skipOnboarding = useCallback(() => {
    onboardingStorage.setSkipped();
    onboardingStorage.clearTourProgress();
    trackEvent("onboarding_welcome_skipped");
    setIsWelcomeOpen(false);
    destroyTour();
  }, [destroyTour]);

  const dismissWelcome = useCallback(() => {
    setIsWelcomeOpen(false);
    onboardingStorage.clearPendingWelcome();
  }, []);

  const contextValue = useMemo(
    () => ({
      isWelcomeOpen,
      isTourActive,
      startTour,
      startHelpGuide,
      skipOnboarding,
      dismissWelcome,
    }),
    [dismissWelcome, isTourActive, isWelcomeOpen, skipOnboarding, startHelpGuide, startTour]
  );

  useEffect(() => {
    return () => {
      destroyTour();
    };
  }, [destroyTour]);

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
      <WelcomeModal
        open={isWelcomeOpen}
        onStartTour={() => {
          trackEvent("onboarding_welcome_start_tour");
          void startTour({ resume: false });
        }}
        onSkip={skipOnboarding}
      />
    </OnboardingContext.Provider>
  );
}
