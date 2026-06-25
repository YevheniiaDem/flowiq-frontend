import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { DriveStep, Driver, PopoverDOM } from "driver.js";
import type { TranslationKey } from "@/src/shared/i18n";
import { waitForElement } from "../services/domUtils";

type TranslateFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

const TOTAL_STEPS = 6;

function progressText(t: TranslateFn, current: number): string {
  return t("onboarding.tour.progress", { current, total: TOTAL_STEPS });
}

async function navigateAndWait(
  router: AppRouterInstance,
  path: string,
  selector: string
): Promise<void> {
  if (window.location.pathname !== path) {
    router.push(path);
  }
  await waitForElement(selector);
}

export function buildProductTourSteps(
  router: AppRouterInstance,
  t: TranslateFn,
  options: {
    onSkip: () => void;
    onComplete: () => void;
    onImportCta: () => void;
    fromSettings?: boolean;
  }
): DriveStep[] {
  const handleSkip = () => {
    if (!options.fromSettings) {
      options.onSkip();
    }
  };

  const attachSkipButton = (popover: NonNullable<DriveStep["popover"]>) => ({
    ...popover,
    onPopoverRender: (dom: PopoverDOM, { driver: driverInstance }: { driver: Driver }) => {
      const existing = dom.footerButtons.querySelector(".flowiq-driver-skip-btn");
      if (existing) return;

      const skipBtn = document.createElement("button");
      skipBtn.type = "button";
      skipBtn.className = "flowiq-driver-skip-btn";
      skipBtn.textContent = t("onboarding.tour.skip");
      skipBtn.setAttribute("aria-label", t("onboarding.tour.skip"));
      skipBtn.addEventListener("click", () => {
        handleSkip();
        driverInstance.destroy();
      });
      dom.footerButtons.prepend(skipBtn);

      const nextBtn = dom.footerButtons.querySelector(".driver-popover-next-btn");
      nextBtn?.setAttribute("aria-label", t("onboarding.tour.next"));
      const prevBtn = dom.footerButtons.querySelector(".driver-popover-prev-btn");
      prevBtn?.setAttribute("aria-label", t("onboarding.tour.back"));
      const closeBtn = dom.footerButtons.querySelector(".driver-popover-close-btn");
      closeBtn?.setAttribute("aria-label", t("onboarding.tour.skip"));
    },
  });

  return [
    {
      element: '[data-testid="dashboard-stats"]',
      onHighlightStarted: async () => {
        await navigateAndWait(router, "/", '[data-testid="dashboard-stats"]');
      },
      popover: attachSkipButton({
        title: t("onboarding.tour.steps.dashboard.title"),
        description: t("onboarding.tour.steps.dashboard.description"),
        side: "bottom",
        align: "start",
        showProgress: true,
        progressText: progressText(t, 1),
        nextBtnText: t("onboarding.tour.next"),
        prevBtnText: t("onboarding.tour.back"),
      }),
    },
    {
      element: '[data-testid="imports-upload-zone"]',
      onHighlightStarted: async () => {
        await navigateAndWait(router, "/imports", '[data-testid="imports-upload-zone"]');
      },
      popover: attachSkipButton({
        title: t("onboarding.tour.steps.imports.title"),
        description: t("onboarding.tour.steps.imports.description"),
        side: "bottom",
        align: "start",
        showProgress: true,
        progressText: progressText(t, 2),
        nextBtnText: t("onboarding.tour.next"),
        prevBtnText: t("onboarding.tour.back"),
      }),
    },
    {
      element: '[data-testid="ai-accountant-chat"]',
      onHighlightStarted: async () => {
        await navigateAndWait(router, "/ai-accountant", '[data-testid="ai-accountant-chat"]');
      },
      popover: attachSkipButton({
        title: t("onboarding.tour.steps.aiAccountant.title"),
        description: t("onboarding.tour.steps.aiAccountant.description"),
        side: "left",
        align: "start",
        showProgress: true,
        progressText: progressText(t, 3),
        nextBtnText: t("onboarding.tour.next"),
        prevBtnText: t("onboarding.tour.back"),
      }),
    },
    {
      element: '[data-testid="forecasts-summary-cards"]',
      onHighlightStarted: async () => {
        await navigateAndWait(router, "/forecasts", '[data-testid="forecasts-summary-cards"]');
      },
      popover: attachSkipButton({
        title: t("onboarding.tour.steps.forecasts.title"),
        description: t("onboarding.tour.steps.forecasts.description"),
        side: "bottom",
        align: "start",
        showProgress: true,
        progressText: progressText(t, 4),
        nextBtnText: t("onboarding.tour.next"),
        prevBtnText: t("onboarding.tour.back"),
      }),
    },
    {
      element: '[data-testid="tasks-add-btn"]',
      onHighlightStarted: async () => {
        await navigateAndWait(router, "/tasks", '[data-testid="tasks-add-btn"]');
      },
      popover: attachSkipButton({
        title: t("onboarding.tour.steps.tasksNotifications.title"),
        description: t("onboarding.tour.steps.tasksNotifications.description"),
        side: "bottom",
        align: "end",
        showProgress: true,
        progressText: progressText(t, 5),
        nextBtnText: t("onboarding.tour.next"),
        prevBtnText: t("onboarding.tour.back"),
      }),
    },
    {
      popover: {
        title: t("onboarding.tour.steps.success.title"),
        description: t("onboarding.tour.steps.success.description"),
        side: "over",
        align: "center",
        showProgress: true,
        progressText: progressText(t, 6),
        showButtons: ["previous", "close"],
        doneBtnText: t("onboarding.tour.steps.success.cta"),
        onPopoverRender: (dom: PopoverDOM, { driver: driverInstance }: { driver: Driver }) => {
          const existing = dom.footerButtons.querySelector(".flowiq-driver-cta-btn");
          if (existing) return;

          const ctaBtn = document.createElement("button");
          ctaBtn.type = "button";
          ctaBtn.className = "flowiq-driver-cta-btn";
          ctaBtn.textContent = t("onboarding.tour.steps.success.cta");
          ctaBtn.setAttribute("aria-label", t("onboarding.tour.steps.success.cta"));
          ctaBtn.addEventListener("click", () => {
            options.onComplete();
            options.onImportCta();
            driverInstance.destroy();
          });
          dom.description.after(ctaBtn);

          const skipBtn = document.createElement("button");
          skipBtn.type = "button";
          skipBtn.className = "flowiq-driver-skip-btn";
          skipBtn.textContent = t("onboarding.tour.skip");
          skipBtn.addEventListener("click", () => {
            options.onComplete();
            driverInstance.destroy();
          });
          dom.footerButtons.prepend(skipBtn);
        },
      },
    },
  ];
}
