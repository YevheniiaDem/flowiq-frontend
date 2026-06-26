/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "@/src/test/test-utils";
import { AnalyticsSummaryCards } from "./AnalyticsSummaryCards";
import { mockAnalyticsOverview } from "@/src/test/mocks/handlers";

describe("AnalyticsSummaryCards", () => {
  const labels = {
    revenue: "Revenue",
    expenses: "Expenses",
    profit: "Profit",
    taxBurden: "Tax burden",
  };

  it("renders all summary metrics", () => {
    renderWithProviders(
      <AnalyticsSummaryCards
        overview={mockAnalyticsOverview}
        labels={labels}
        currency="UAH"
        locale="uk-UA"
      />
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Profit")).toBeInTheDocument();
    expect(screen.getByText("Tax burden")).toBeInTheDocument();
  });

  it("displays formatted currency values", () => {
    renderWithProviders(
      <AnalyticsSummaryCards
        overview={mockAnalyticsOverview}
        labels={labels}
        currency="UAH"
        locale="uk-UA"
      />
    );

    expect(screen.getAllByText(/₴/).length).toBeGreaterThan(0);
  });

  it("shows change percentages", () => {
    renderWithProviders(
      <AnalyticsSummaryCards
        overview={mockAnalyticsOverview}
        labels={labels}
        currency="UAH"
        locale="uk-UA"
      />
    );

    expect(screen.getByText(/5\.2/)).toBeInTheDocument();
  });
});
