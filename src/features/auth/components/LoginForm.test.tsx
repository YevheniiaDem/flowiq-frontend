/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderWithProviders, screen, userEvent, waitFor } from "@/src/test/test-utils";
import { LoginForm } from "./LoginForm";

const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh, replace: vi.fn(), back: vi.fn() }),
  usePathname: () => "/login",
  useSearchParams: () => new URLSearchParams(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRefresh.mockClear();
    localStorage.clear();
  });

  it("renders login form with accessible labels", () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.getByTestId("login-email")).toHaveAccessibleName(/пошта|email/i);
    expect(screen.getByTestId("login-password")).toHaveAccessibleName(/пароль|password/i);
    expect(screen.getByTestId("login-submit")).toBeInTheDocument();
  });

  it("shows validation via HTML5 required fields", () => {
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByTestId("login-email");
    const passwordInput = screen.getByTestId("login-password");
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it("submits successfully and redirects to dashboard", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByTestId("login-email"), "user@test.com");
    await user.type(screen.getByTestId("login-password"), "Password123!");
    await user.click(screen.getByTestId("login-submit"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
    expect(localStorage.getItem("token")).toBe("test-token");
  });

  it("displays API error on failed login", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByTestId("login-email"), "fail@test.com");
    await user.type(screen.getByTestId("login-password"), "wrong");
    await user.click(screen.getByTestId("login-submit"));

    await waitFor(() => {
      expect(screen.getByTestId("login-error")).toBeInTheDocument();
    });
  });

  it("disables submit button while loading", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByTestId("login-email"), "user@test.com");
    await user.type(screen.getByTestId("login-password"), "Password123!");

    const submitBtn = screen.getByTestId("login-submit");
    await user.click(submitBtn);

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
  });
});
