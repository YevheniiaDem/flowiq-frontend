"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Button } from "@/src/shared/components/ui/button";
import { NotificationCard } from "./NotificationCard";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationStats } from "./NotificationStats";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationFilter } from "../types";
import { groupNotificationsByDate } from "../utils/notification.utils";

export function NotificationCenterView() {
  const { t, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const {
    notifications,
    summary,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications({ filter, size: 50 });

  const filterLabels = useMemo(
    (): Record<NotificationFilter, string> => ({
      all: t("notifications.filters.all"),
      unread: t("notifications.filters.unread"),
      critical: t("notifications.filters.critical"),
      warnings: t("notifications.filters.warnings"),
      success: t("notifications.filters.success"),
      tax: t("notifications.filters.tax"),
      ai: t("notifications.filters.ai"),
      reports: t("notifications.filters.reports"),
      imports: t("notifications.filters.imports"),
    }),
    [t]
  );

  const dateLabels = useMemo(
    () => ({
      today: t("notifications.groups.today"),
      yesterday: t("notifications.groups.yesterday"),
      thisWeek: t("notifications.groups.thisWeek"),
      older: t("notifications.groups.older"),
    }),
    [t]
  );

  const grouped = useMemo(
    () => groupNotificationsByDate(notifications, dateLabels),
    [notifications, dateLabels]
  );

  if (loading && !summary) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 p-4 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      data-testid="notifications-page"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-4 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("notifications.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("notifications.subtitle")}</p>
        </div>
        {summary && summary.unread > 0 && (
          <Button data-testid="notifications-mark-all-read-btn" variant="outline" size="sm" onClick={() => markAllAsRead()}>
            {t("notifications.markAllRead")}
          </Button>
        )}
      </div>

      {summary && (
        <NotificationStats
          summary={summary}
          labels={{
            total: t("notifications.stats.total"),
            unread: t("notifications.stats.unread"),
            critical: t("notifications.stats.critical"),
            thisMonth: t("notifications.stats.thisMonth"),
          }}
        />
      )}

      <NotificationFilters active={filter} onChange={setFilter} labels={filterLabels} />

      <div data-testid="notifications-list" className="space-y-6">
        {grouped.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/50 py-16 text-center">
            <p className="text-sm text-muted-foreground">{t("notifications.empty")}</p>
          </div>
        ) : (
          grouped.map((group) => (
            <section key={group.label}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h2>
              <div className="space-y-2">
                {group.items.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    locale={locale}
                    onMarkRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </motion.div>
  );
}
