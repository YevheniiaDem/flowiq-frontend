/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useReports } from "./useReports";

describe("useReports", () => {
  it("loads reports list and stats", async () => {
    const { result } = renderHook(() => useReports());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.reports).toHaveLength(1);
    expect(result.current.stats?.total).toBe(5);
  });
});
