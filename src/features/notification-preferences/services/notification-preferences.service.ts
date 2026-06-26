import { apiClient } from "@/src/services/api";
import { AxiosError } from "axios";
import type {
  NotificationPreferencesResponse,
  UpdateNotificationPreferencesPayload,
} from "../types";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export const notificationPreferencesService = {
  async getPreferences(): Promise<NotificationPreferencesResponse> {
    const response = await apiClient.get<NotificationPreferencesResponse>(
      "/settings/notifications"
    );
    return response.data;
  },

  async updatePreferences(
    payload: UpdateNotificationPreferencesPayload
  ): Promise<NotificationPreferencesResponse> {
    try {
      const response = await apiClient.put<NotificationPreferencesResponse>(
        "/settings/notifications",
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to save notification preferences"));
    }
  },

  async resetToDefaults(): Promise<NotificationPreferencesResponse> {
    try {
      const response = await apiClient.post<NotificationPreferencesResponse>(
        "/settings/notifications/reset"
      );
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to reset notification preferences"));
    }
  },
};
