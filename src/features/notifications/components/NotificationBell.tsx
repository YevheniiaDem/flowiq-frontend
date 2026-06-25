"use client";

import { useRouter } from "next/navigation";
import { Bell, CheckCheck, ExternalLink } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import { NotificationCard } from "./NotificationCard";
import { useNotifications, useUnreadCount } from "../hooks/useNotifications";
import { formatBadgeCount } from "../utils/notification.utils";

export function NotificationBell() {
  const router = useRouter();
  const { t, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";
  const { count, refresh } = useUnreadCount();
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications({
    size: 5,
  });

  const latest = notifications.slice(0, 5);

  return (
    <DropdownMenu onOpenChange={(open) => open && refresh()}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="top-nav-notifications"
          className="relative h-8 w-8 rounded-lg hover:bg-accent/50"
          aria-label={t("notifications.title")}
        >
          <Bell className="h-4 w-4" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[9px]"
            >
              {formatBadgeCount(count)}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-xl p-0">
        <div className="flex items-center justify-between border-b border-border/50 px-3 py-2.5">
          <p className="text-sm font-semibold">{t("notifications.title")}</p>
          {count > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-[11px]"
              onClick={() => markAllAsRead()}
            >
              <CheckCheck className="h-3 w-3" />
              {t("notifications.markAllRead")}
            </Button>
          )}
        </div>

        <div className="max-h-80 space-y-2 overflow-y-auto p-2">
          {loading ? (
            <p className="py-6 text-center text-xs text-muted-foreground">{t("common.loading")}</p>
          ) : latest.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">{t("notifications.empty")}</p>
          ) : (
            latest.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                locale={locale}
                compact
                onMarkRead={markAsRead}
              />
            ))
          )}
        </div>

        <div className="border-t border-border/50 p-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-full gap-1.5 text-xs"
            onClick={() => router.push("/notifications")}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("notifications.openCenter")}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
