"use client";

import Link from "next/link";
import { ArrowRight, Bell, Loader2 } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Card } from "@/src/shared/components/ui/card";
import { NotificationCard } from "./NotificationCard";
import { cn } from "@/src/shared/utils/utils";
import { useNotifications } from "../hooks/useNotifications";

interface RecentNotificationsWidgetProps {
  className?: string;
}

export function RecentNotificationsWidget({ className }: RecentNotificationsWidgetProps) {
  const { t, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";
  const { notifications, loading, markAsRead } = useNotifications({ size: 5 });

  const latest = notifications.slice(0, 5);

  return (
    <Card
      className={cn(
        "flex flex-col rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bell className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-sm font-semibold">{t("notifications.recentTitle")}</h2>
        </div>
        <Link
          href="/notifications"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          {t("notifications.viewAll")}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-1 items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : latest.length === 0 ? (
        <p className="flex flex-1 items-center justify-center py-8 text-center text-xs text-muted-foreground">
          {t("notifications.empty")}
        </p>
      ) : (
        <div className="min-h-0 flex-1 space-y-2">
          {latest.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              locale={locale}
              compact
              onMarkRead={markAsRead}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
