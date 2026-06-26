/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/src/test/test-utils";
import { SettingsView } from "./SettingsView";

vi.mock("@/src/features/profile", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/src/features/profile")>();
  return {
    ...actual,
    ProfileSettingsView: () => <div data-testid="profile-settings">Profile</div>,
    SecurityTab: () => <div data-testid="security-tab">Security</div>,
  };
});

vi.mock("@/src/features/notification-preferences", () => ({
  NotificationPreferencesView: () => <div data-testid="notification-prefs">Notifications</div>,
}));

vi.mock("@/src/features/onboarding", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/src/features/onboarding")>();
  return {
    ...actual,
    HelpLearnCenter: () => <div data-testid="help-center">Help</div>,
  };
});

describe("SettingsView", () => {
  it("renders settings page with tabs", () => {
    renderWithProviders(<SettingsView />);

    expect(screen.getByTestId("settings-page")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("shows general preferences by default", () => {
    renderWithProviders(<SettingsView />);
    expect(screen.getByLabelText(/^мова$|^language$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^валюта$|^currency$/i)).toBeInTheDocument();
  });

  it("switches to profile tab", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SettingsView />);

    const profileTab = screen.getByRole("button", { name: /profile|профіль/i });
    await user.click(profileTab);

    expect(screen.getByTestId("profile-settings")).toBeInTheDocument();
  });

  it("switches to notifications tab", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SettingsView />);

    const notifTab = screen.getByRole("button", { name: /notification|сповіщен/i });
    await user.click(notifTab);

    expect(screen.getByTestId("notification-prefs")).toBeInTheDocument();
  });
});
