import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  formatBadgeCount,
  formatNotificationTime,
  groupNotificationsByDate,
} from "./notification.utils";

describe("notification.utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-26T14:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const labels = {
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This week",
    older: "Older",
  };

  it("groups notifications by date buckets", () => {
    const notifications = [
      { id: 1, createdAt: "2026-06-26T10:00:00" },
      { id: 2, createdAt: "2026-06-25T10:00:00" },
      { id: 3, createdAt: "2026-06-20T10:00:00" },
      { id: 4, createdAt: "2026-06-01T10:00:00" },
    ];

    const groups = groupNotificationsByDate(notifications, labels);

    expect(groups).toHaveLength(4);
    expect(groups[0].label).toBe("Today");
    expect(groups[0].items).toHaveLength(1);
    expect(groups[1].label).toBe("Yesterday");
    expect(groups[3].label).toBe("Older");
  });

  it("omits empty date groups", () => {
    const groups = groupNotificationsByDate(
      [{ id: 1, createdAt: "2026-06-26T08:00:00" }],
      labels
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe("Today");
  });

  it("formats notification time for locale", () => {
    const result = formatNotificationTime("2026-06-26T10:30:00", "en-US");
    expect(result).toMatch(/26/);
    expect(result).toMatch(/10/);
  });

  it("caps badge count at 99+", () => {
    expect(formatBadgeCount(5)).toBe("5");
    expect(formatBadgeCount(100)).toBe("99+");
    expect(formatBadgeCount(999)).toBe("99+");
  });
});
