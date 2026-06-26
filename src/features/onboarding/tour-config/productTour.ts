import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { DriveStep, Driver, Popover, PopoverDOM } from "driver.js";
import type { TranslationKey } from "@/src/shared/i18n";
import { waitForElement } from "../services/domUtils";
import { withPopoverPlacement } from "../services/popoverPlacement";
import {
  prepareTourRoute,
  TOUR_ROUTE_TARGETS,
  type TourRouteTarget,
} from "../services/tourNavigation";

type TranslateFn = (key: TranslationKey, params?: Record<string, string | number>) => string;

const TOTAL_STEPS = 6;

function progressText(t: TranslateFn, current: number): string {
  return t("onboarding.tour.progress", { current, total: TOTAL_STEPS });
}

function resolveTourElement(target: TourRouteTarget): Element {
  for (const selector of target.selectors) {
    const element = document.querySelector(selector);
    if (element) return element;
  }
  return document.body;
}

function withTourNavigation(
  router: AppRouterInstance,
  popover: Popover,
  navigation: {
    onEnter?: TourRouteTarget;
    onNext?: TourRouteTarget;
    onPrevious?: TourRouteTarget;
  }
): Popover {
  return {
    ...popover,
    onNextClick: async (_element, _step, { driver }) => {
      if (navigation.onNext) {
        await prepareTourRoute(router, navigation.onNext);
      }
      driver.moveNext();
    },
    onPrevClick: async (_element, _step, { driver }) => {
      if (navigation.onPrevious) {
        await prepareTourRoute(router, navigation.onPrevious);
      }
      driver.movePrevious();
    },
    onPopoverRender: popover.onPopoverRender,
  };
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

  const attachSkipButton = (popover: Popover) =>
    withPopoverPlacement({
      ...popover,
      onPopoverRender: (dom: PopoverDOM, opts: { driver: Driver }) => {
        popover.onPopoverRender?.(dom, opts as Parameters<NonNullable<Popover["onPopoverRender"]>>[1]);

        const driverInstance = opts.driver;

        const existing = dom.footerButtons.querySelector(".flowiq-driver-skip-btn");
        if (!existing) {
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
        }

        dom.footerButtons.querySelector(".driver-popover-next-btn")?.setAttribute("aria-label", t("onboarding.tour.next"));
        dom.footerButtons.querySelector(".driver-popover-prev-btn")?.setAttribute("aria-label", t("onboarding.tour.back"));
        dom.footerButtons.querySelector(".driver-popover-close-btn")?.setAttribute("aria-label", t("onboarding.tour.skip"));
      },
    });

  const {
    dashboard,
    imports: importsTarget,
    aiAccountant,
    forecasts,
    tasks,
  } = TOUR_ROUTE_TARGETS;

  return [
    {
      element: () => resolveTourElement(dashboard),
      onHighlightStarted: async () => {
        await prepareTourRoute(router, dashboard);
      },
      popover: attachSkipButton(
        withTourNavigation(
          router,
          {
            title: t("onboarding.tour.steps.dashboard.title"),
            description: t("onboarding.tour.steps.dashboard.description"),
            side: "bottom",
            align: "start",
            showProgress: true,
            progressText: progressText(t, 1),
            nextBtnText: t("onboarding.tour.next"),
            prevBtnText: t("onboarding.tour.back"),
          },
          { onNext: importsTarget }
        )
      ),
    },
    {
      element: () => resolveTourElement(importsTarget),
      onHighlightStarted: async () => {
        await prepareTourRoute(router, importsTarget);
      },
      popover: attachSkipButton(
        withTourNavigation(
          router,
          {
            title: t("onboarding.tour.steps.imports.title"),
            description: t("onboarding.tour.steps.imports.description"),
            side: "bottom",
            align: "start",
            showProgress: true,
            progressText: progressText(t, 2),
            nextBtnText: t("onboarding.tour.next"),
            prevBtnText: t("onboarding.tour.back"),
          },
          { onPrevious: dashboard, onNext: aiAccountant }
        )
      ),
    },
    {
      element: () => resolveTourElement(aiAccountant),
      onHighlightStarted: async () => {
        await prepareTourRoute(router, aiAccountant);
      },
      popover: attachSkipButton(
        withTourNavigation(
          router,
          {
            title: t("onboarding.tour.steps.aiAccountant.title"),
            description: t("onboarding.tour.steps.aiAccountant.description"),
            side: "bottom",
            align: "center",
            showProgress: true,
            progressText: progressText(t, 3),
            nextBtnText: t("onboarding.tour.next"),
            prevBtnText: t("onboarding.tour.back"),
          },
          { onPrevious: importsTarget, onNext: forecasts }
        )
      ),
    },
    {
      element: () => resolveTourElement(forecasts),
      onHighlightStarted: async () => {
        await prepareTourRoute(router, forecasts);
      },
      popover: attachSkipButton(
        withTourNavigation(
          router,
          {
            title: t("onboarding.tour.steps.forecasts.title"),
            description: t("onboarding.tour.steps.forecasts.description"),
            side: "bottom",
            align: "start",
            showProgress: true,
            progressText: progressText(t, 4),
            nextBtnText: t("onboarding.tour.next"),
            prevBtnText: t("onboarding.tour.back"),
          },
          { onPrevious: aiAccountant, onNext: tasks }
        )
      ),
    },
    {
      element: () => resolveTourElement(tasks),
      onHighlightStarted: async () => {
        await prepareTourRoute(router, tasks);
      },
      popover: attachSkipButton(
        withTourNavigation(
          router,
          {
            title: t("onboarding.tour.steps.tasksNotifications.title"),
            description: t("onboarding.tour.steps.tasksNotifications.description"),
            side: "bottom",
            align: "end",
            showProgress: true,
            progressText: progressText(t, 5),
            nextBtnText: t("onboarding.tour.next"),
            prevBtnText: t("onboarding.tour.back"),
          },
          { onPrevious: forecasts }
        )
      ),
    },
    {
      popover: attachSkipButton(
        withTourNavigation(
          router,
          {
            title: t("onboarding.tour.steps.success.title"),
            description: t("onboarding.tour.steps.success.description"),
            side: "over",
            align: "center",
            showProgress: true,
            progressText: progressText(t, 6),
            showButtons: ["previous", "close"],
            doneBtnText: t("onboarding.tour.steps.success.cta"),
            onPopoverRender: (dom: PopoverDOM, { driver: driverInstance }: { driver: Driver }) => {
              const existingCta = dom.footerButtons.querySelector(".flowiq-driver-cta-btn");
              if (!existingCta) {
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
              }
            },
          },
          { onPrevious: tasks }
        )
      ),
    },
  ];
}

/** Prepare the route for a saved tour step before resuming. */
export async function prepareTourStepRoute(
  router: AppRouterInstance,
  stepIndex: number
): Promise<void> {
  const routes = [
    TOUR_ROUTE_TARGETS.dashboard,
    TOUR_ROUTE_TARGETS.imports,
    TOUR_ROUTE_TARGETS.aiAccountant,
    TOUR_ROUTE_TARGETS.forecasts,
    TOUR_ROUTE_TARGETS.tasks,
    null,
  ] as const;

  const target = routes[stepIndex];
  if (target) {
    await prepareTourRoute(router, target);
  }
}

export async function waitForTourReady(stepIndex: number): Promise<boolean> {
  const selectors = [
    TOUR_ROUTE_TARGETS.dashboard.selectors,
    TOUR_ROUTE_TARGETS.imports.selectors,
    TOUR_ROUTE_TARGETS.aiAccountant.selectors,
    TOUR_ROUTE_TARGETS.forecasts.selectors,
    TOUR_ROUTE_TARGETS.tasks.selectors,
    [],
  ];

  const targetSelectors = selectors[stepIndex];
  if (!targetSelectors?.length) return true;

  const element = await waitForElement(targetSelectors, { timeoutMs: 20_000 });
  return Boolean(element);
}
