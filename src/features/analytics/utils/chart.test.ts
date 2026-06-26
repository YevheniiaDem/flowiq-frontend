import { describe, expect, it } from "vitest";
import { formatAxisValue, formatMonthLabel } from "./chart";

describe("chart utils", () => {
  it("formats month label in Ukrainian", () => {
    expect(formatMonthLabel("2026-03", "uk")).toMatch(/бер|Mar/i);
  });

  it("formats month label in English", () => {
    expect(formatMonthLabel("2026-03", "en")).toMatch(/Mar/);
  });

  it("formats millions on axis", () => {
    expect(formatAxisValue(2_500_000)).toBe("2.5M");
  });

  it("formats thousands on axis", () => {
    expect(formatAxisValue(4500)).toBe("5k");
  });

  it("formats small values as string", () => {
    expect(formatAxisValue(42)).toBe("42");
  });
});
