/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderWithProviders, screen, userEvent, waitFor } from "@/src/test/test-utils";
import { RegisterForm } from "./RegisterForm";
import { ONBOARDING_STORAGE_KEYS } from "@/src/features/onboarding/types";

const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh, replace: vi.fn(), back: vi.fn() }),
  usePathname: () => "/register",
  useSearchParams: () => new URLSearchParams(),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRefresh.mockClear();
    localStorage.clear();
  });

  it("renders registration form fields", () => {
    renderWithProviders(<RegisterForm />);

    expect(screen.getByLabelText(/повне ім'я|full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/електронна пошта|email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^пароль|^password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /створити обліковий|create account/i })).toBeInTheDocument();
  });

  it("registers successfully and sets pending welcome", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RegisterForm />);

    await user.type(screen.getByLabelText(/повне ім'я|full name/i), "New User");
    await user.type(screen.getByLabelText(/електронна пошта|email/i), "new@test.com");
    await user.type(screen.getByLabelText(/^пароль|^password/i), "SecurePass1!");
    await user.click(screen.getByRole("button", { name: /створити обліковий|create account/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
    expect(localStorage.getItem(ONBOARDING_STORAGE_KEYS.pending)).toBe("true");
  });

  it("shows error when email is already taken", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RegisterForm />);

    await user.type(screen.getByLabelText(/повне ім'я|full name/i), "User");
    await user.type(screen.getByLabelText(/електронна пошта|email/i), "taken@test.com");
    await user.type(screen.getByLabelText(/^пароль|^password/i), "SecurePass1!");
    await user.click(screen.getByRole("button", { name: /створити обліковий|create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/already exists|Email already/i)).toBeInTheDocument();
    });
  });

  it("has link to login page", () => {
    renderWithProviders(<RegisterForm />);
    const loginLink = screen.getByRole("link", { name: /увійти|sign in/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
