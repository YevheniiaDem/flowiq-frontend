/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAuthStorage,
  refreshTokensSingleFlight,
  resetRefreshSingleFlightForTests,
  setAuthTokens,
} from "./tokenRefresh";

describe("tokenRefresh single-flight", () => {
  beforeEach(() => {
    resetRefreshSingleFlightForTests();
    localStorage.clear();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    resetRefreshSingleFlightForTests();
  });

  it("deduplicates concurrent refresh calls", async () => {
    setAuthTokens("old-access", "old-refresh");

    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve(
                new Response(
                  JSON.stringify({ token: "new-access", refreshToken: "new-refresh" }),
                  { status: 200, headers: { "Content-Type": "application/json" } }
                )
              ),
            50
          );
        })
    );

    const [first, second] = await Promise.all([
      refreshTokensSingleFlight(),
      refreshTokensSingleFlight(),
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(first).toEqual({ token: "new-access", refreshToken: "new-refresh" });
    expect(second).toEqual(first);
    expect(localStorage.getItem("token")).toBe("new-access");
    expect(localStorage.getItem("refreshToken")).toBe("new-refresh");
  });

  it("clears storage helper removes auth keys", () => {
    setAuthTokens("access", "refresh");
    localStorage.setItem("user", "{}");

    clearAuthStorage();

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
