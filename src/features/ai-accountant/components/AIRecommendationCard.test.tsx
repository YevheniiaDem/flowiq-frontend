/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "@/src/test/test-utils";
import { AIRecommendationCard } from "./AIRecommendationCard";
import { AIRecommendation } from "../types";

const recommendation: AIRecommendation = {
  id: "1",
  type: "WARNING",
  title: "Review operating expenses",
  description: "Costs increased 12% compared to last quarter.",
  priority: 1,
};

const typeLabels = {
  CRITICAL: "Critical",
  WARNING: "Warning",
  OPPORTUNITY: "Opportunity",
  SUCCESS: "Success",
};

describe("AIRecommendationCard", () => {
  it("renders recommendation title and description", () => {
    renderWithProviders(
      <AIRecommendationCard recommendation={recommendation} typeLabels={typeLabels} />
    );

    expect(screen.getByText("Review operating expenses")).toBeInTheDocument();
    expect(screen.getByText(/Costs increased 12%/)).toBeInTheDocument();
  });

  it("displays type badge", () => {
    renderWithProviders(
      <AIRecommendationCard recommendation={recommendation} typeLabels={typeLabels} />
    );

    expect(screen.getByText("Warning")).toBeInTheDocument();
  });
});
