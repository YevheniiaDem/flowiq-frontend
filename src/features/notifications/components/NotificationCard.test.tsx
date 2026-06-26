/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/src/test/test-utils";
import { NotificationCard } from "./NotificationCard";
import { Notification } from "../types";

const notification: Notification = {
  id: 1,
  title: "Tax deadline approaching",
  message: "Submit your quarterly report by July 1.",
  severity: "WARNING",
  type: "TAX",
  read: false,
  createdAt: "2026-06-26T10:00:00Z",
  actionUrl: null,
  readAt: null,
  expiresAt: null,
};

describe("NotificationCard", () => {
  it("renders notification content", () => {
    renderWithProviders(
      <NotificationCard notification={notification} locale="en-US" />
    );

    expect(screen.getByText("Tax deadline approaching")).toBeInTheDocument();
    expect(screen.getByText(/Submit your quarterly report/)).toBeInTheDocument();
  });

  it("calls onMarkRead when unread card is clicked", async () => {
    const user = userEvent.setup();
    const onMarkRead = vi.fn();

    renderWithProviders(
      <NotificationCard
        notification={notification}
        locale="en-US"
        onMarkRead={onMarkRead}
      />
    );

    await user.click(screen.getByText("Tax deadline approaching"));
    expect(onMarkRead).toHaveBeenCalledWith(1);
  });

  it("does not call onMarkRead for already read notification", async () => {
    const user = userEvent.setup();
    const onMarkRead = vi.fn();

    renderWithProviders(
      <NotificationCard
        notification={{ ...notification, read: true }}
        locale="en-US"
        onMarkRead={onMarkRead}
      />
    );

    await user.click(screen.getByText("Tax deadline approaching"));
    expect(onMarkRead).not.toHaveBeenCalled();
  });

  it("calls onDelete when delete button clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    renderWithProviders(
      <NotificationCard
        notification={notification}
        locale="en-US"
        onDelete={onDelete}
      />
    );

    const deleteBtn = screen.getByRole("button");
    await user.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
