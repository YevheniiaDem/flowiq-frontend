import { describe, expect, it } from "vitest";
import { convertFromUah, formatCurrency } from "./currency";

describe("currency utils", () => {
  it("returns UAH amount unchanged", () => {
    expect(convertFromUah(41000, "UAH")).toBe(41000);
  });

  it("converts UAH to USD", () => {
    expect(convertFromUah(41000, "USD")).toBeCloseTo(1000, 0);
  });

  it("converts UAH to EUR", () => {
    expect(convertFromUah(44000, "EUR")).toBeCloseTo(1000, 0);
  });

  it("formats UAH with hryvnia symbol", () => {
    const result = formatCurrency(150000, "UAH");
    expect(result).toContain("₴");
    expect(result).toMatch(/150/);
  });

  it("formats USD with currency style", () => {
    const result = formatCurrency(41000, "USD", "en-US");
    expect(result).toMatch(/\$|USD/);
  });

  it("rounds fractional amounts", () => {
    const result = formatCurrency(1234.7, "UAH");
    expect(result).not.toContain(".");
  });
});
