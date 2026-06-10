import { apiClient } from "@/src/services/api";
import {
  Notification,
  NotificationFilter,
  NotificationPage,
  NotificationSummary,
} from "../types";

function buildFilterParams(filter: NotificationFilter): Record<string, string | boolean> {
  switch (filter) {
    case "unread":
      return { unreadOnly: true };
    case "critical":
      return { severity: "CRITICAL" };
    case "warnings":
      return { severity: "WARNING" };
    case "success":
      return { severity: "SUCCESS" };
    case "tax":
      return { type: "TAX" };
    case "ai":
      return { type: "AI_INSIGHT" };
    case "reports":
      return { type: "REPORT" };
    case "imports":
      return { type: "SYSTEM" };
    default:
      return {};
  }
}

export const notificationService = {
  async getNotifications(params: {
    page?: number;
    size?: number;
    filter?: NotificationFilter;
  }): Promise<NotificationPage> {
    const filterParams = buildFilterParams(params.filter ?? "all");
    const response = await apiClient.get<NotificationPage>("/notifications", {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 20,
        ...filterParams,
      },
    });
    return response.data;
  },

  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<{ count: number }>("/notifications/unread-count");
    return response.data.count;
  },

  async getSummary(): Promise<NotificationSummary> {
    const response = await apiClient.get<NotificationSummary>("/notifications/summary");
    return response.data;
  },

  async markAsRead(id: number): Promise<Notification> {
    const response = await apiClient.put<Notification>(`/notifications/${id}/read`, {});
    return response.data;
  },

  async markAllAsRead(): Promise<number> {
    const response = await apiClient.put<{ updated: number }>("/notifications/read-all", {});
    return response.data.updated;
  },

  async deleteNotification(id: number): Promise<void> {
    await apiClient.delete(`/notifications/${id}`);
  },
};
