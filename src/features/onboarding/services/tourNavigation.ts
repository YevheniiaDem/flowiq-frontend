import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { waitForElement } from "./domUtils";

export interface TourRouteTarget {
  path: string;
  selectors: string[];
}

export const TOUR_ROUTE_TARGETS = {
  dashboard: {
    path: "/",
    selectors: ['[data-testid="dashboard-stats"]', '[data-testid="dashboard-page"]'],
  },
  imports: {
    path: "/imports",
    selectors: ['[data-testid="imports-upload-zone"]', '[data-testid="imports-page"]'],
  },
  aiAccountant: {
    path: "/ai-accountant",
    selectors: ['[data-testid="ai-accountant-chat"]', '[data-testid="ai-accountant-page"]'],
  },
  forecasts: {
    path: "/forecasts",
    selectors: ['[data-testid="forecasts-summary-cards"]', '[data-testid="forecasts-page"]'],
  },
  tasks: {
    path: "/tasks",
    selectors: ['[data-testid="tasks-add-btn"]', '[data-testid="tasks-page"]'],
  },
} as const satisfies Record<string, TourRouteTarget>;

export async function prepareTourRoute(
  router: AppRouterInstance,
  target: TourRouteTarget
): Promise<Element | null> {
  if (typeof window !== "undefined" && window.location.pathname !== target.path) {
    router.push(target.path);
  }

  const element = await waitForElement(target.selectors, {
    timeoutMs: 20_000,
    intervalMs: 100,
  });

  if (element) {
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
  }

  return element;
}
