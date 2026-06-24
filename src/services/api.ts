import axios, { type InternalAxiosRequestConfig } from "axios";
import { clearAuthStorage, refreshTokensSingleFlight } from "./tokenRefresh";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_FLOW_PATHS = ["/auth/login", "/auth/register", "/auth/refresh"];

function isAuthFlowRequest(url: string | undefined): boolean {
  if (!url) return false;
  return AUTH_FLOW_PATHS.some((path) => url.includes(path));
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      if (!config.skipAuthRefresh && !isAuthFlowRequest(config.url)) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      const language = localStorage.getItem("flowiq_language") || "uk";
      const currency = localStorage.getItem("flowiq_currency") || "UAH";
      config.headers["X-App-Language"] = language;
      config.headers["X-App-Currency"] = currency;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (status !== 401 || typeof window === "undefined") {
      return Promise.reject(error);
    }

    if (
      originalRequest?.skipAuthRefresh
      || originalRequest?._retry
      || isAuthFlowRequest(originalRequest?.url)
    ) {
      clearAuthStorage();
      return Promise.reject(error);
    }

    if (!localStorage.getItem("refreshToken")) {
      clearAuthStorage();
      return Promise.reject(error);
    }

    try {
      await refreshTokensSingleFlight();

      originalRequest._retry = true;
      const newToken = localStorage.getItem("token");
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAuthStorage();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  }
);

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
    _retry?: boolean;
  }
}
