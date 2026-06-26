/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useForecasts } from "./useForecasts";
import { server } from "@/src/test/mocks/server";
import { forecastsErrorHandler } from "@/src/test/mocks/handlers";

describe("useForecasts", () => {
  it("loads forecast summary on mount", async () => {
    const { result } = renderHook(() => useForecasts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.summary?.expectedRevenue).toBe(200000);
  });

  it("handles API errors", async () => {
    server.use(forecastsErrorHandler);

    const { result } = renderHook(() => useForecasts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
  });
});
