"use client";

import { useState } from "react";
import { Moon, Sun, User, Bell, Shield, Palette, Globe } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { AppCurrency, AppLanguage, AppTheme } from "@/src/shared/i18n";
import { cn } from "@/src/shared/utils/utils";

export function SettingsView() {
  const { t, language, currency, theme, setLanguage, setCurrency, setTheme } =
    usePreferences();
  const [saved, setSaved] = useState(false);

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

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("settings.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("settings.subtitle")}</p>
        </div>
        {saved && (
          <span className="text-xs font-medium text-emerald-500">{t("settings.saved")}</span>
        )}
      </div>

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
            <select
              id="language"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as AppLanguage)}
              className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-primary/50"
            >
              <option value="uk">{t("settings.languages.uk")}</option>
              <option value="en">{t("settings.languages.en")}</option>
            </select>
            <p className="text-[10px] text-muted-foreground">{t("settings.languageHint")}</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currency" className="text-xs font-medium text-muted-foreground">
              {t("settings.currency")}
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value as AppCurrency)}
              className="h-9 w-full rounded-lg border border-border/50 bg-background/50 px-3 text-sm outline-none focus:border-primary/50"
            >
              <option value="UAH">{t("settings.currencies.UAH")}</option>
              <option value="USD">{t("settings.currencies.USD")}</option>
              <option value="EUR">{t("settings.currencies.EUR")}</option>
            </select>
            <p className="text-[10px] text-muted-foreground">{t("settings.currencyHint")}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mb-1 text-sm font-semibold">{t("settings.profile")}</h3>
          <p className="text-xs text-muted-foreground">{t("settings.profileHint")}</p>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Bell className="h-5 w-5 text-accent" />
          </div>
          <h3 className="mb-1 text-sm font-semibold">{t("settings.notifications")}</h3>
          <p className="text-xs text-muted-foreground">{t("settings.notificationsHint")}</p>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Shield className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="mb-1 text-sm font-semibold">{t("settings.security")}</h3>
          <p className="text-xs text-muted-foreground">{t("settings.securityHint")}</p>
        </Card>

        <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10">
              <Palette className="h-5 w-5 text-pink-500" />
            </div>
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
      </div>
    </div>
  );
}
