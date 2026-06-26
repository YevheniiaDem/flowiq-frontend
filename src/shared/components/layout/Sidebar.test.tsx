/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "@/src/test/test-utils";
import { Sidebar } from "./Sidebar";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Sidebar", () => {
  it("renders sidebar with navigation links", () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-analytics")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-forecasts")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-ai-accountant")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-reports")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-notifications")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-settings")).toBeInTheDocument();
  });

  it("marks active route with accent styling", () => {
    renderWithProviders(<Sidebar />);

    const dashboardLink = screen.getByTestId("nav-link-dashboard");
    expect(dashboardLink.className).toMatch(/sidebar-accent/);
  });

  it("navigation links have correct href attributes", () => {
    renderWithProviders(<Sidebar />);

    expect(screen.getByTestId("nav-link-analytics")).toHaveAttribute("href", "/analytics");
    expect(screen.getByTestId("nav-link-forecasts")).toHaveAttribute("href", "/forecasts");
    expect(screen.getByTestId("nav-link-business-guide")).toHaveAttribute("href", "/business-guide");
  });

  it("supports keyboard navigation between links", () => {
    renderWithProviders(<Sidebar />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).not.toHaveAttribute("tabindex", "-1");
    });
  });
});
