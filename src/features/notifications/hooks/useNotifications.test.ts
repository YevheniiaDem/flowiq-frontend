/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useNotifications } from "./useNotifications";

describe("useNotifications", () => {
  it("loads notifications with unread count", async () => {
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.unreadCount).toBe(1);
  });

  it("marks notification as read after API call", async () => {
    const { result } = renderHook(() => useNotifications());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await result.current.markAsRead(1);

    await waitFor(() => {
      const notification = result.current.notifications.find((n) => n.id === 1);
      expect(notification?.read).toBe(true);
    });
  });
});
