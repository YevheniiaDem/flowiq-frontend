import { apiClient } from "./api";
import { AxiosError } from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "viewer";
  avatar?: string;
  company?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  company?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

function persistAuth(authResponse: AuthResponse): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", authResponse.token);
  localStorage.setItem("refreshToken", authResponse.refreshToken);
  localStorage.setItem("user", JSON.stringify(authResponse.user));
}

function clearAuth(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string>;
}

function getNetworkErrorMessage(): string {
  if (typeof window === "undefined") {
    return "Cannot connect to server";
  }
  const lang = localStorage.getItem("flowiq_language") || "uk";
  return lang === "en"
    ? "Cannot connect to server. Make sure the backend is running on port 8080."
    : "Не вдалося підключитися до сервера. Переконайтеся, що backend працює на порту 8080.";
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return getNetworkErrorMessage();
    }
    const data = error.response.data as ApiErrorBody | string | undefined;
    if (data && typeof data === "object") {
      if (data.errors && Object.keys(data.errors).length > 0) {
        return Object.values(data.errors).join(". ");
      }
      if (data.message) {
        return data.message;
      }
    }
    return fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
      persistAuth(response.data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Invalid email or password"));
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/register", data);
      persistAuth(response.data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Registration failed"));
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Logout should always clear local session even if backend fails
    } finally {
      clearAuth();
    }
  },

  async getCurrentUser(): Promise<User | null> {
    if (!this.isAuthenticated()) {
      return null;
    }

    try {
      const response = await apiClient.get<User>("/auth/me");
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch {
      clearAuth();
      return null;
    }
  },

  async refreshToken(): Promise<{ token: string; refreshToken: string }> {
    // Backend refresh endpoint not implemented yet
    throw new Error("Refresh token endpoint is not available yet");
  },

  async verifyEmail(_token: string): Promise<{ success: boolean }> {
    throw new Error("Email verification is not available yet");
  },

  async requestPasswordReset(_email: string): Promise<{ success: boolean }> {
    throw new Error("Password reset is not available yet");
  },

  async resetPassword(_token: string, _newPassword: string): Promise<{ success: boolean }> {
    throw new Error("Password reset is not available yet");
  },

  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  },

  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },
};
