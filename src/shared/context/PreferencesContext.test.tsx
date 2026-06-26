/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen, userEvent } from "@/src/test/test-utils";
import { usePreferences } from "./PreferencesContext";

function PreferencesProbe() {
  const { language, currency, t, setLanguage } = usePreferences();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="currency">{currency}</span>
      <span data-testid="translation">{t("nav.dashboard")}</span>
      <button type="button" onClick={() => setLanguage("en")}>
        Switch to EN
      </button>
    </div>
  );
}

describe("PreferencesContext", () => {
  it("provides default language and currency", () => {
    renderWithProviders(<PreferencesProbe />);

    expect(screen.getByTestId("lang")).toHaveTextContent("uk");
    expect(screen.getByTestId("currency")).toHaveTextContent("UAH");
  });

  it("translates keys via t()", () => {
    renderWithProviders(<PreferencesProbe />);
    expect(screen.getByTestId("translation").textContent).toBeTruthy();
  });

  it("updates language preference", async () => {
    const user = userEvent.setup();
    renderWithProviders(<PreferencesProbe />);

    await user.click(screen.getByRole("button", { name: "Switch to EN" }));

    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(localStorage.getItem("flowiq_language")).toBe("en");
  });
});
