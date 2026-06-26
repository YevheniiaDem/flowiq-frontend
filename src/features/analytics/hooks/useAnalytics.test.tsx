/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { PreferencesProvider } from "@/src/shared/context/PreferencesContext";
import { useAnalytics } from "./useAnalytics";
import { server } from "@/src/test/mocks/server";
import { analyticsErrorHandler } from "@/src/test/mocks/handlers";

function wrapper({ children }: { children: ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}

describe("useAnalytics", () => {
  it("loads analytics data successfully", async () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.overview).not.toBeNull();
    expect(result.current.overview?.revenue).toBe(150000);
  });

  it("sets error on API failure", async () => {
    server.use(analyticsErrorHandler);

    const { result } = renderHook(() => useAnalytics(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.overview).toBeNull();
  });

  it("reload refetches data", async () => {
    const { result } = renderHook(() => useAnalytics(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await result.current.reload();

    await waitFor(() => {
      expect(result.current.overview?.revenue).toBe(150000);
    });
  });
});
