"use client";

import { useState, useMemo } from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { DropdownSelect } from "@/src/shared/components/ui/dropdown-select";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { HelpLearnCenter } from "@/src/features/onboarding";
import {
  ProfileSettingsView,
  SecurityTab,
  SettingsTabs,
  SuccessToast,
  type SettingsTab,
} from "@/src/features/profile";
import { NotificationPreferencesView } from "@/src/features/notification-preferences";
import { AppCurrency, AppLanguage, AppTheme } from "@/src/shared/i18n";
import { cn } from "@/src/shared/utils/utils";

export function SettingsView() {
  const { t, language, currency, theme, setLanguage, setCurrency, setTheme } =
    usePreferences();
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [saved, setSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const markSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLanguageChange = (value: AppLanguage) => {
    setLanguage(value);
    markSaved();
  };

  const handleCurrencyChange = (value: AppCurrency) => {
    setCurrency(value);
    markSaved();
  };

  const handleThemeChange = (value: AppTheme) => {
    if (value === theme) return;
    setTheme(value, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    markSaved();
  };

  const languageOptions = useMemo(
    () => [
      { value: "uk", label: t("settings.languages.uk") },
      { value: "en", label: t("settings.languages.en") },
    ],
    [t]
  );

  const currencyOptions = useMemo(
    () => [
      { value: "UAH", label: t("settings.currencies.UAH") },
      { value: "USD", label: t("settings.currencies.USD") },
      { value: "EUR", label: t("settings.currencies.EUR") },
    ],
    [t]
  );

  return (
    <div data-testid="settings-page" className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("settings.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("settings.subtitle")}</p>
        </div>
        {saved && (
          <span className="text-xs font-medium text-emerald-500">{t("settings.saved")}</span>
        )}
      </div>

      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "general" && (
        <>
          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{t("settings.regional")}</h3>
                <p className="text-xs text-muted-foreground">{t("settings.regionalHint")}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="language" className="text-xs font-medium text-muted-foreground">
                  {t("settings.language")}
                </label>
                <DropdownSelect
                  id="language"
                  value={language}
                  options={languageOptions}
                  onChange={(value) => handleLanguageChange(value as AppLanguage)}
                  aria-label={t("settings.language")}
                />
                <p className="text-[10px] text-muted-foreground">{t("settings.languageHint")}</p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="currency" className="text-xs font-medium text-muted-foreground">
                  {t("settings.currency")}
                </label>
                <DropdownSelect
                  id="currency"
                  value={currency}
                  options={currencyOptions}
                  onChange={(value) => handleCurrencyChange(value as AppCurrency)}
                  aria-label={t("settings.currency")}
                />
                <p className="text-[10px] text-muted-foreground">{t("settings.currencyHint")}</p>
              </div>
            </div>
          </Card>

          <HelpLearnCenter />
        </>
      )}

      {activeTab === "profile" && <ProfileSettingsView />}

      {activeTab === "security" && (
        <SecurityTab
          onSuccess={(message) => {
            setToastMessage(message);
          }}
        />
      )}

      {activeTab === "notifications" && <NotificationPreferencesView />}

      {activeTab === "appearance" && (
        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div>
              <h3 className="text-sm font-semibold">{t("settings.appearance")}</h3>
              <p className="text-xs text-muted-foreground">{t("settings.appearanceHint")}</p>
            </div>
          </div>

          <p className="mb-2 text-xs font-medium text-muted-foreground">{t("settings.theme")}</p>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { value: "dark" as const, label: t("settings.themeDark"), icon: Moon },
                { value: "light" as const, label: t("settings.themeLight"), icon: Sun },
              ] as const
            ).map(({ value, label, icon: Icon }) => {
              const isActive = theme === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleThemeChange(value)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "border-primary/50 bg-primary/10 text-primary shadow-sm"
                      : "border-border/50 bg-background/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </Card>
      )}

      <SuccessToast
        message={toastMessage ?? ""}
        open={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
