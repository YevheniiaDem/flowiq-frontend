"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { cn } from "@/src/shared/utils/utils";
import { Button } from "@/src/shared/components/ui/button";
import { Notification } from "../types";
import { SEVERITY_STYLES, formatNotificationTime } from "../utils/notification.utils";

interface NotificationCardProps {
  notification: Notification;
  locale: string;
  compact?: boolean;
  onMarkRead?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function NotificationCard({
  notification,
  locale,
  compact = false,
  onMarkRead,
  onDelete,
}: NotificationCardProps) {
  const styles = SEVERITY_STYLES[notification.severity];

  const handleClick = () => {
    if (!notification.read && onMarkRead) {
      onMarkRead(notification.id);
    }
  };

  const content = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative rounded-xl border p-3 transition-all",
        styles.border,
        notification.read ? "bg-card/30 opacity-75" : "bg-card/60",
        !notification.read && "shadow-sm",
        compact ? "p-2.5" : "p-4"
      )}
    >
      <div className="flex gap-3">
        <div className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", styles.dot)} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className={cn("font-medium", compact ? "text-xs" : "text-sm")}>
              {notification.title}
            </p>
            {!notification.read && (
              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", styles.dot)} />
            )}
          </div>
          <p className={cn("mt-0.5 text-muted-foreground", compact ? "text-[11px]" : "text-xs")}>
            {notification.message}
          </p>
          <p className="mt-1.5 text-[10px] text-muted-foreground/70">
            {formatNotificationTime(notification.createdAt, locale)}
          </p>
        </div>
        {onDelete && !compact && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(notification.id);
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </motion.div>
  );

  if (notification.actionUrl) {
    return (
      <Link href={notification.actionUrl} onClick={handleClick} className="block">
        {content}
      </Link>
    );
  }

  return <div onClick={handleClick}>{content}</div>;
}
