import { apiClient } from "@/src/services/api";
import { AxiosError } from "axios";
import type {
  ChangePasswordPayload,
  FopProfile,
  Profile,
  UpdateFopProfilePayload,
  UpdateProfilePayload,
  UserSession,
} from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export function resolveAvatarUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  const origin = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${origin}${path}`;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string; errors?: Record<string, string> } | undefined;
    if (data?.errors && Object.keys(data.errors).length > 0) {
      return Object.values(data.errors).join(". ");
    }
    if (data?.message) return data.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export const profileService = {
  async getProfile(): Promise<Profile> {
    const response = await apiClient.get<Profile>("/profile");
    return response.data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<Profile> {
    try {
      const response = await apiClient.put<Profile>("/profile", payload);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to update profile"));
    }
  },

  async uploadAvatar(file: File): Promise<Profile> {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await apiClient.post<Profile>("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to upload avatar"));
    }
  },

  async getFopProfile(): Promise<FopProfile> {
    const response = await apiClient.get<FopProfile>("/profile/fop");
    return response.data;
  },

  async updateFopProfile(payload: UpdateFopProfilePayload): Promise<FopProfile> {
    try {
      const response = await apiClient.put<FopProfile>("/profile/fop", payload);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to update FOP profile"));
    }
  },

  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    try {
      await apiClient.post("/profile/change-password", payload);
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to change password"));
    }
  },

  async listSessions(): Promise<UserSession[]> {
    const response = await apiClient.get<UserSession[]>("/profile/sessions");
    return response.data;
  },

  async logoutCurrentSession(): Promise<void> {
    await apiClient.post("/profile/sessions/logout-current");
  },

  async logoutAllSessions(): Promise<void> {
    await apiClient.post("/profile/sessions/logout-all");
  },
};

export function dispatchProfileUpdated(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("flowiq:profile-updated"));
  }
}
