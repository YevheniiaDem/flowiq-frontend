"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Driver } from "driver.js";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { createFlowiqDriver } from "../services/createDriver";
import { waitForElement } from "../services/domUtils";
import { helpGuideStorage } from "../services/helpGuideStorage";
import { trackEvent } from "../services/productAnalytics";
import { isTourActiveSync } from "../services/tourState";
import { buildHelpGuideSteps, HELP_GUIDES } from "../tour-config/helpGuides";
import type { HelpGuideId } from "../types";
import { useOnboardingOptional } from "./useOnboardingContext";

const HELP_GUIDE_READY_EVENT = "flowiq:help-guide-ready";

export function dispatchHelpGuideReady(guideId: HelpGuideId): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(HELP_GUIDE_READY_EVENT, { detail: guideId }));
}

export function usePendingHelpGuide(guideId: HelpGuideId, enabled = true): void {
  const { t } = usePreferences();
  const onboarding = useOnboardingOptional();
  const driverRef = useRef<Driver | null>(null);
  const runningRef = useRef(false);

  const runGuide = useCallback(async () => {
    if (runningRef.current) return;
    if (!helpGuideStorage.consumePending(guideId)) return;
    if (isTourActiveSync() || onboarding?.isTourActive || onboarding?.isWelcomeOpen) {
      helpGuideStorage.setPending(guideId);
      return;
    }

    const guide = HELP_GUIDES[guideId];
    const firstStep = guide.steps[0];
    if (!firstStep) return;

    await waitForElement(firstStep.selectors, { timeoutMs: 15_000 });

    if (isTourActiveSync() || onboarding?.isTourActive || onboarding?.isWelcomeOpen) {
      helpGuideStorage.setPending(guideId);
      return;
    }

    runningRef.current = true;
    trackEvent("onboarding_help_guide_started", { guide: guideId });

    const driverInstance = createFlowiqDriver({
      steps: buildHelpGuideSteps(guideId, t),
      showProgress: true,
      smoothScroll: true,
      popoverOffset: 14,
      onDestroyed: () => {
        driverRef.current = null;
        runningRef.current = false;
        trackEvent("onboarding_help_guide_completed", { guide: guideId });
      },
    });

    driverRef.current = driverInstance;
    driverInstance.drive();
  }, [guideId, onboarding?.isTourActive, onboarding?.isWelcomeOpen, t]);

  useEffect(() => {
    if (!enabled) return;

    const onReady = (event: Event) => {
      const detail = (event as CustomEvent<HelpGuideId>).detail;
      if (detail === guideId) {
        void runGuide();
      }
    };

    window.addEventListener(HELP_GUIDE_READY_EVENT, onReady);

    if (helpGuideStorage.peekPending() === guideId) {
      const timeoutId = window.setTimeout(() => {
        void runGuide();
      }, 700);

      return () => {
        window.removeEventListener(HELP_GUIDE_READY_EVENT, onReady);
        window.clearTimeout(timeoutId);
        driverRef.current?.destroy();
        driverRef.current = null;
        runningRef.current = false;
      };
    }

    return () => {
      window.removeEventListener(HELP_GUIDE_READY_EVENT, onReady);
      driverRef.current?.destroy();
      driverRef.current = null;
      runningRef.current = false;
    };
  }, [enabled, guideId, runGuide]);
}
