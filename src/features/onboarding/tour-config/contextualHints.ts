import type { DriveStep, PopoverDOM } from "driver.js";
import type { TranslationKey } from "@/src/shared/i18n";
import type { ContextualHintId } from "../types";

type TranslateFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

export interface ContextualHintConfig {
  id: ContextualHintId;
  element: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  side?: "top" | "right" | "bottom" | "left";
}

export const CONTEXTUAL_HINTS: ContextualHintConfig[] = [
  {
    id: "ai_accountant",
    element: '[data-testid="ai-accountant-chat"]',
    titleKey: "onboarding.hints.aiAccountant.title",
    descriptionKey: "onboarding.hints.aiAccountant.description",
    side: "left",
  },
  {
    id: "forecasts",
    element: '[data-testid="forecasts-summary-cards"]',
    titleKey: "onboarding.hints.forecasts.title",
    descriptionKey: "onboarding.hints.forecasts.description",
    side: "bottom",
  },
  {
    id: "imports",
    element: '[data-testid="imports-upload-zone"]',
    titleKey: "onboarding.hints.imports.title",
    descriptionKey: "onboarding.hints.imports.description",
    side: "bottom",
  },
  {
    id: "tasks",
    element: '[data-testid="tasks-add-btn"]',
    titleKey: "onboarding.hints.tasks.title",
    descriptionKey: "onboarding.hints.tasks.description",
    side: "bottom",
  },
];

export function buildContextualHintStep(
  config: ContextualHintConfig,
  t: TranslateFn
): DriveStep {
  return {
    element: config.element,
    popover: {
      title: t(config.titleKey),
      description: t(config.descriptionKey),
      side: config.side ?? "bottom",
      align: "start",
      showButtons: ["close"],
      nextBtnText: t("onboarding.hints.gotIt"),
      onPopoverRender: (dom: PopoverDOM) => {
        const closeBtn = dom.footerButtons.querySelector(".driver-popover-close-btn");
        closeBtn?.setAttribute("aria-label", t("onboarding.hints.gotIt"));
      },
    },
  };
}

export function getContextualHintConfig(id: ContextualHintId): ContextualHintConfig | undefined {
  return CONTEXTUAL_HINTS.find((hint) => hint.id === id);
}
