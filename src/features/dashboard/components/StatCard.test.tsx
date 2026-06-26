/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "@/src/test/test-utils";
import { StatCard } from "./StatCard";

describe("StatCard", () => {
  it("renders label, value and positive change", () => {
    renderWithProviders(
      <StatCard
        label="Revenue"
        value="150 000 ₴"
        change="+5.2%"
        changeType="positive"
        icon="dollar-sign"
      />
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("150 000 ₴")).toBeInTheDocument();
    expect(screen.getByText("+5.2%")).toBeInTheDocument();
  });

  it("renders negative change indicator", () => {
    renderWithProviders(
      <StatCard
        label="Expenses"
        value="80 000 ₴"
        change="-2.1%"
        changeType="negative"
        icon="trending-down"
      />
    );

    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("-2.1%")).toBeInTheDocument();
  });
});
