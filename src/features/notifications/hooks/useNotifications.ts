"use client";

import { useCallback, useEffect, useState } from "react";
import { notificationService } from "../services/notification.service";
import {
  Notification,
  NotificationFilter,
  NotificationSummary,
} from "../types";

export function useNotifications(options?: { filter?: NotificationFilter; size?: number }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [summary, setSummary] = useState<NotificationSummary | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const filter = options?.filter ?? "all";
  const size = options?.size ?? 20;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pageData, summaryData, count] = await Promise.all([
        notificationService.getNotifications({ page, size, filter }),
        notificationService.getSummary(),
        notificationService.getUnreadCount(),
      ]);
      setNotifications(pageData.content);
      setTotalPages(pageData.totalPages);
      setSummary(summaryData);
      setUnreadCount(count);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [page, size, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const markAsRead = async (id: number) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    if (summary) {
      setSummary({ ...summary, unread: Math.max(0, summary.unread - 1) });
    }
  };

  const markAllAsRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    if (summary) {
      setSummary({ ...summary, unread: 0 });
    }
  };

  const deleteNotification = async (id: number) => {
    const target = notifications.find((n) => n.id === id);
    await notificationService.deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (target && !target.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
    await load();
  };

  return {
    notifications,
    summary,
    unreadCount,
    loading,
    error,
    page,
    totalPages,
    setPage,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    reload: load,
  };
}

export function useUnreadCount(pollIntervalMs = 60000) {
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const value = await notificationService.getUnreadCount();
      setCount(value);
    } catch {
      // silent fail for badge
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, pollIntervalMs);
    return () => clearInterval(interval);
  }, [refresh, pollIntervalMs]);

  return { count, refresh };
}
