import { describe, expect, it } from "vitest";
import { formatArticleDate, highlightText } from "./highlight.utils";

describe("highlight.utils", () => {
  it("returns original text when query is empty", () => {
    expect(highlightText("FOP Group 3", "")).toBe("FOP Group 3");
    expect(highlightText("FOP Group 3", "   ")).toBe("FOP Group 3");
  });

  it("wraps matching text in mark element", () => {
    const result = highlightText("Single tax for FOP", "FOP");
    expect(result).toContain("<mark");
    expect(result).toContain("FOP</mark>");
  });

  it("escapes regex special characters in query", () => {
    const result = highlightText("Tax rate is 5%", "5%");
    expect(result).toContain("<mark");
  });

  it("formats article date for locale", () => {
    const result = formatArticleDate("2026-06-26", "en-US");
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/June|26/);
  });

  it("returns empty string for missing date", () => {
    expect(formatArticleDate(undefined, "en-US")).toBe("");
  });
});
