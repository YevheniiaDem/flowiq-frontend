"use client";

import { useEffect, useRef } from "react";
import type { Driver } from "driver.js";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { createFlowiqDriver } from "../services/createDriver";
import { waitForElement } from "../services/domUtils";
import { onboardingStorage } from "../services/onboardingStorage";
import { helpGuideStorage } from "../services/helpGuideStorage";
import { isTourActiveSync } from "../services/tourState";
import {
  buildContextualHintStep,
  getContextualHintConfig,
} from "../tour-config/contextualHints";
import type { ContextualHintId, HelpGuideId } from "../types";
import { useOnboardingOptional } from "./useOnboardingContext";

const HINT_GUIDE_MAP: Partial<Record<ContextualHintId, HelpGuideId>> = {
  imports: "import_guide",
  ai_accountant: "ai_accountant",
  forecasts: "forecasts_guide",
  tasks: "tasks_guide",
};

export function useContextualHint(hintId: ContextualHintId, enabled = true): void {
  const { t } = usePreferences();
  const onboarding = useOnboardingOptional();
  const driverRef = useRef<Driver | null>(null);
  const shownRef = useRef(false);

  const isBlocked =
    isTourActiveSync() ||
    onboarding?.isTourActive ||
    onboarding?.isWelcomeOpen ||
    onboardingStorage.isHintShown(hintId) ||
    (HINT_GUIDE_MAP[hintId] != null &&
      helpGuideStorage.isPending(HINT_GUIDE_MAP[hintId]!));

  useEffect(() => {
    if (!enabled || isBlocked || shownRef.current) return;

    const config = getContextualHintConfig(hintId);
    if (!config) return;

    let cancelled = false;

    const showHint = async () => {
      if (
        cancelled ||
        shownRef.current ||
        isTourActiveSync() ||
        onboarding?.isTourActive ||
        onboarding?.isWelcomeOpen
      ) {
        return;
      }

      await waitForElement(config.element, { timeoutMs: 10_000 });
      if (
        cancelled ||
        shownRef.current ||
        onboardingStorage.isHintShown(hintId) ||
        isTourActiveSync() ||
        onboarding?.isTourActive ||
        onboarding?.isWelcomeOpen
      ) {
        return;
      }

      shownRef.current = true;
      onboardingStorage.markHintShown(hintId);

      const driverInstance = createFlowiqDriver({
        steps: [buildContextualHintStep(config, t)],
        onDestroyed: () => {
          driverRef.current = null;
        },
      });

      driverRef.current = driverInstance;
      driverInstance.drive();
    };

    const timeoutId = window.setTimeout(() => {
      void showHint();
    }, 600);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      driverRef.current?.destroy();
      driverRef.current = null;
    };
  }, [enabled, hintId, isBlocked, onboarding?.isTourActive, onboarding?.isWelcomeOpen, t]);
}
