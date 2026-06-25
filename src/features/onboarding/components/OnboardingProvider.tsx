"use client";

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Driver } from "driver.js";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { createFlowiqDriver } from "../services/createDriver";
import { activationStorage } from "../services/activationStorage";
import { onboardingStorage } from "../services/onboardingStorage";
import { trackEvent } from "../services/productAnalytics";
import { buildProductTourSteps } from "../tour-config/productTour";
import { OnboardingContext } from "../hooks/useOnboardingContext";
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
    setIsTourActive(false);
  }, []);

  const handleTourSkip = useCallback(() => {
    onboardingStorage.setSkipped();
    trackEvent("onboarding_tour_skipped");
    destroyTour();
  }, [destroyTour]);

  const handleTourComplete = useCallback(() => {
    onboardingStorage.setCompleted();
    onboardingStorage.markAllHintsShown();
    activationStorage.markChecklistItemDone("product_tour");
    trackEvent("onboarding_tour_completed");
    window.dispatchEvent(new CustomEvent("flowiq:tour-completed"));
    destroyTour();
  }, [destroyTour]);

  const startTour = useCallback(
    (options?: { fromSettings?: boolean }) => {
      setIsWelcomeOpen(false);
      onboardingStorage.clearPendingWelcome();
      destroyTour();

      const fromSettings = options?.fromSettings ?? false;

      const driverInstance = createFlowiqDriver({
        steps: buildProductTourSteps(router, t, {
          onSkip: handleTourSkip,
          onComplete: handleTourComplete,
          onImportCta: () => router.push("/imports"),
          fromSettings,
        }),
        onDestroyed: () => {
          driverRef.current = null;
          setIsTourActive(false);
        },
        onCloseClick: () => {
          if (!fromSettings) {
            handleTourSkip();
          } else {
            destroyTour();
          }
        },
      });

      driverRef.current = driverInstance;
      setIsTourActive(true);
      trackEvent("onboarding_tour_started", { fromSettings });
      driverInstance.drive();
    },
    [destroyTour, handleTourComplete, handleTourSkip, router, t]
  );

  const skipOnboarding = useCallback(() => {
    onboardingStorage.setSkipped();
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
      skipOnboarding,
      dismissWelcome,
    }),
    [dismissWelcome, isTourActive, isWelcomeOpen, skipOnboarding, startTour]
  );

  useEffect(() => {
    return () => destroyTour();
  }, [destroyTour]);

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
      <WelcomeModal
        open={isWelcomeOpen}
        onStartTour={() => {
          trackEvent("onboarding_welcome_start_tour");
          startTour();
        }}
        onSkip={skipOnboarding}
      />
    </OnboardingContext.Provider>
  );
}
