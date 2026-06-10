import { NotificationSeverity } from "../types";

export const SEVERITY_STYLES: Record<
  NotificationSeverity,
  { border: string; bg: string; text: string; dot: string }
> = {
  INFO: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    dot: "bg-blue-500",
  },
  SUCCESS: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    dot: "bg-emerald-500",
  },
  WARNING: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    dot: "bg-amber-500",
  },
  CRITICAL: {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-500",
    dot: "bg-red-500",
  },
};

export function groupNotificationsByDate<T extends { id: number; createdAt: string }>(
  notifications: T[],
  labels: { today: string; yesterday: string; thisWeek: string; older: string }
): { label: string; items: T[] }[] {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const groups: Record<string, T[]> = {
    [labels.today]: [],
    [labels.yesterday]: [],
    [labels.thisWeek]: [],
    [labels.older]: [],
  };

  for (const item of notifications) {
    const date = new Date(item.createdAt);
    if (date >= startOfToday) {
      groups[labels.today].push(item);
    } else if (date >= startOfYesterday) {
      groups[labels.yesterday].push(item);
    } else if (date >= startOfWeek) {
      groups[labels.thisWeek].push(item);
    } else {
      groups[labels.older].push(item);
    }
  }

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([label, items]) => ({ label, items }));
}

export function formatNotificationTime(value: string, locale: string): string {
  return new Date(value).toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatBadgeCount(count: number): string {
  if (count > 99) return "99+";
  return String(count);
}
