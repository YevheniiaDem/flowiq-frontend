/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "@/src/test/test-utils";
import { ForecastSummaryCards } from "./ForecastSummaryCards";
import { mockForecastSummary } from "@/src/test/mocks/handlers";

describe("ForecastSummaryCards", () => {
  const labels = {
    revenue: "Expected revenue",
    expenses: "Expected expenses",
    profit: "Expected profit",
    tax: "Expected tax",
    next3Months: "Next 3 months",
  };

  it("renders forecast summary cards", () => {
    renderWithProviders(
      <ForecastSummaryCards
        summary={mockForecastSummary}
        labels={labels}
        currency="UAH"
        locale="uk-UA"
      />
    );

    expect(screen.getByText("Expected revenue")).toBeInTheDocument();
    expect(screen.getByText("Expected expenses")).toBeInTheDocument();
    expect(screen.getByText("Expected profit")).toBeInTheDocument();
    expect(screen.getByText("Expected tax")).toBeInTheDocument();
  });

  it("shows trend percentages", () => {
    renderWithProviders(
      <ForecastSummaryCards
        summary={mockForecastSummary}
        labels={labels}
        currency="UAH"
        locale="uk-UA"
      />
    );

    expect(screen.getByText(/5\.2/)).toBeInTheDocument();
  });
});
