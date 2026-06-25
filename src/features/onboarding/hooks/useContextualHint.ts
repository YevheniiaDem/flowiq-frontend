"use client";

import { useEffect, useRef } from "react";
import type { Driver } from "driver.js";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { createFlowiqDriver } from "../services/createDriver";
import { waitForElement } from "../services/domUtils";
import { onboardingStorage } from "../services/onboardingStorage";
import {
  buildContextualHintStep,
  getContextualHintConfig,
} from "../tour-config/contextualHints";
import type { ContextualHintId } from "../types";
import { useOnboardingOptional } from "./useOnboardingContext";

export function useContextualHint(hintId: ContextualHintId, enabled = true): void {
  const { t } = usePreferences();
  const onboarding = useOnboardingOptional();
  const driverRef = useRef<Driver | null>(null);
  const shownRef = useRef(false);

  const isBlocked =
    onboarding?.isTourActive ||
    onboarding?.isWelcomeOpen ||
    onboardingStorage.isHintShown(hintId);

  useEffect(() => {
    if (!enabled || isBlocked || shownRef.current) return;

    const config = getContextualHintConfig(hintId);
    if (!config) return;

    let cancelled = false;

    const showHint = async () => {
      await waitForElement(config.element);
      if (cancelled || shownRef.current || onboardingStorage.isHintShown(hintId)) return;
      if (onboarding?.isTourActive || onboarding?.isWelcomeOpen) return;

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

    const timeoutId = window.setTimeout(showHint, 600);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      driverRef.current?.destroy();
      driverRef.current = null;
    };
  }, [enabled, hintId, isBlocked, onboarding?.isTourActive, onboarding?.isWelcomeOpen, t]);
}
