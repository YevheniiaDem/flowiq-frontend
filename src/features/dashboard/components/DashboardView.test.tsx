/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "@/src/test/test-utils";
import { DashboardView } from "./DashboardView";

vi.mock("@/src/features/onboarding", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/src/features/onboarding")>();
  return {
    ...actual,
    useDemoWorkspace: () => ({ isDemoMode: false, enableDemo: vi.fn() }),
    usePendingHelpGuide: vi.fn(),
    ActivationChecklist: () => null,
    EmptyState: ({ title, testId }: { title: string; testId?: string }) => (
      <div data-testid={testId}>{title}</div>
    ),
  };
});

describe("DashboardView", () => {
  it("renders dashboard page after data loads", async () => {
    renderWithProviders(<DashboardView />);

    expect(await screen.findByTestId("dashboard-page")).toBeInTheDocument();
  });

  it("renders stat cards from API", async () => {
    renderWithProviders(<DashboardView />);

    expect(await screen.findByTestId("dashboard-stats")).toBeInTheDocument();
  });
});
