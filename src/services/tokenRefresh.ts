const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export function setAuthTokens(token: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
}

export function clearAuthStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

async function performTokenRefresh(): Promise<RefreshTokenResponse> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Refresh failed");
  }

  const data = (await response.json()) as RefreshTokenResponse;
  setAuthTokens(data.token, data.refreshToken);
  return data;
}

export function refreshTokensSingleFlight(): Promise<RefreshTokenResponse> {
  if (!refreshPromise) {
    refreshPromise = performTokenRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export function resetRefreshSingleFlightForTests(): void {
  refreshPromise = null;
}
