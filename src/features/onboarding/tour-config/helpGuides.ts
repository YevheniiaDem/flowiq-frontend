import type { DriveStep } from "driver.js";
import type { TranslationKey } from "@/src/shared/i18n";
import type { HelpGuideId } from "../types";
import { schedulePopoverPlacement } from "../services/domUtils";

type TranslateFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

export interface HelpGuideStepConfig {
  selectors: string[];
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export interface HelpGuideConfig {
  path: string;
  steps: HelpGuideStepConfig[];
}

export const HELP_GUIDES: Record<HelpGuideId, HelpGuideConfig> = {
  checklist: {
    path: "/",
    steps: [
      {
        selectors: ['[data-testid="activation-checklist"]'],
        titleKey: "onboarding.helpGuides.checklist.step1.title",
        descriptionKey: "onboarding.helpGuides.checklist.step1.description",
        side: "bottom",
      },
      {
        selectors: ['[data-testid="dashboard-stats"]', '[data-testid="dashboard-page"]'],
        titleKey: "onboarding.helpGuides.checklist.step2.title",
        descriptionKey: "onboarding.helpGuides.checklist.step2.description",
        side: "bottom",
      },
    ],
  },
  import_guide: {
    path: "/imports",
    steps: [
      {
        selectors: ['[data-testid="imports-upload-zone"]'],
        titleKey: "onboarding.helpGuides.import.step1.title",
        descriptionKey: "onboarding.helpGuides.import.step1.description",
        side: "bottom",
      },
      {
        selectors: ['[data-testid="imports-browse-btn"]'],
        titleKey: "onboarding.helpGuides.import.step2.title",
        descriptionKey: "onboarding.helpGuides.import.step2.description",
        side: "top",
      },
      {
        selectors: ['[data-testid="imports-history-table"]', '[data-testid="imports-page"]'],
        titleKey: "onboarding.helpGuides.import.step3.title",
        descriptionKey: "onboarding.helpGuides.import.step3.description",
        side: "top",
      },
    ],
  },
  transactions_guide: {
    path: "/transactions",
    steps: [
      {
        selectors: ['[data-testid="transactions-summary"]'],
        titleKey: "onboarding.helpGuides.transactions.step1.title",
        descriptionKey: "onboarding.helpGuides.transactions.step1.description",
        side: "bottom",
        align: "center",
      },
      {
        selectors: ['[data-testid="transactions-filters"]'],
        titleKey: "onboarding.helpGuides.transactions.step2.title",
        descriptionKey: "onboarding.helpGuides.transactions.step2.description",
        side: "bottom",
      },
      {
        selectors: ['[data-testid="transactions-table"]'],
        titleKey: "onboarding.helpGuides.transactions.step3.title",
        descriptionKey: "onboarding.helpGuides.transactions.step3.description",
        side: "top",
        align: "center",
      },
    ],
  },
  business_guide: {
    path: "/business-guide",
    steps: [
      {
        selectors: ['[data-testid="business-guide-search"]'],
        titleKey: "onboarding.helpGuides.business.step1.title",
        descriptionKey: "onboarding.helpGuides.business.step1.description",
        side: "bottom",
      },
      {
        selectors: ['[data-testid="business-guide-profile"]'],
        titleKey: "onboarding.helpGuides.business.step2.title",
        descriptionKey: "onboarding.helpGuides.business.step2.description",
        side: "bottom",
      },
      {
        selectors: ['[data-testid="business-guide-fop-groups"]'],
        titleKey: "onboarding.helpGuides.business.step3.title",
        descriptionKey: "onboarding.helpGuides.business.step3.description",
        side: "top",
      },
      {
        selectors: ['[data-testid="business-guide-eligibility"]'],
        titleKey: "onboarding.helpGuides.business.step4.title",
        descriptionKey: "onboarding.helpGuides.business.step4.description",
        side: "top",
      },
    ],
  },
  ai_accountant: {
    path: "/ai-accountant",
    steps: [
      {
        selectors: ['[data-testid="ai-accountant-health"]'],
        titleKey: "onboarding.helpGuides.ai.step1.title",
        descriptionKey: "onboarding.helpGuides.ai.step1.description",
        side: "bottom",
        align: "center",
      },
      {
        selectors: ['[data-testid="ai-accountant-recommendations"]'],
        titleKey: "onboarding.helpGuides.ai.step2.title",
        descriptionKey: "onboarding.helpGuides.ai.step2.description",
        side: "bottom",
        align: "center",
      },
      {
        selectors: ['[data-testid="ai-accountant-chat"]'],
        titleKey: "onboarding.helpGuides.ai.step3.title",
        descriptionKey: "onboarding.helpGuides.ai.step3.description",
        side: "left",
      },
      {
        selectors: ['[data-testid="ai-accountant-tax-advisor"]'],
        titleKey: "onboarding.helpGuides.ai.step4.title",
        descriptionKey: "onboarding.helpGuides.ai.step4.description",
        side: "left",
      },
    ],
  },
  forecasts_guide: {
    path: "/forecasts",
    steps: [
      {
        selectors: ['[data-testid="forecasts-summary-cards"]'],
        titleKey: "onboarding.helpGuides.forecasts.step1.title",
        descriptionKey: "onboarding.helpGuides.forecasts.step1.description",
        side: "bottom",
        align: "center",
      },
      {
        selectors: ['[data-testid="forecasts-charts"]', '[data-testid="forecasts-page"]'],
        titleKey: "onboarding.helpGuides.forecasts.step2.title",
        descriptionKey: "onboarding.helpGuides.forecasts.step2.description",
        side: "top",
        align: "center",
      },
    ],
  },
  tasks_guide: {
    path: "/tasks",
    steps: [
      {
        selectors: ['[data-testid="tasks-add-btn"]'],
        titleKey: "onboarding.helpGuides.tasks.step1.title",
        descriptionKey: "onboarding.helpGuides.tasks.step1.description",
        side: "bottom",
      },
      {
        selectors: ['[data-testid="tasks-filters"]'],
        titleKey: "onboarding.helpGuides.tasks.step2.title",
        descriptionKey: "onboarding.helpGuides.tasks.step2.description",
        side: "bottom",
      },
      {
        selectors: ['[data-testid="tasks-results"]', '[data-testid="tasks-page"]'],
        titleKey: "onboarding.helpGuides.tasks.step3.title",
        descriptionKey: "onboarding.helpGuides.tasks.step3.description",
        side: "top",
      },
    ],
  },
};

function resolveElement(selectors: string[]): Element {
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) return element;
  }
  return document.body;
}

export function buildHelpGuideSteps(guideId: HelpGuideId, t: TranslateFn): DriveStep[] {
  const guide = HELP_GUIDES[guideId];
  const total = guide.steps.length;

  return guide.steps.map((step, index) => ({
    element: () => resolveElement(step.selectors),
    onHighlighted: (element) => {
      element?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    popover: {
      title: t(step.titleKey),
      description: t(step.descriptionKey),
      side: step.side ?? "bottom",
      align: step.align ?? "start",
      showButtons: index === total - 1 ? ["close"] : ["next", "close"],
      nextBtnText: t("onboarding.tour.next"),
      onPopoverRender: (dom, { driver }) => {
        const progress = dom.wrapper.querySelector(".driver-popover-progress-text");
        if (progress) {
          progress.textContent = t("onboarding.helpGuides.progress", {
            current: index + 1,
            total,
          });
        }
        const closeBtn = dom.footerButtons.querySelector(".driver-popover-close-btn");
        closeBtn?.setAttribute(
          "aria-label",
          index === total - 1 ? t("onboarding.hints.gotIt") : t("onboarding.tour.skip")
        );

        const activeElement = driver.getActiveElement();
        const side = step.side ?? "bottom";
        const align = step.align ?? "start";
        if (activeElement) {
          schedulePopoverPlacement(dom, activeElement, side, align);
        }
      },
    },
  }));
}
