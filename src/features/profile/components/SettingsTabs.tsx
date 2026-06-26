"use client";

import { usePreferences } from "@/src/shared/context/PreferencesContext";
import type { SettingsTab } from "../types";

const TABS: SettingsTab[] = ["general", "profile", "security", "notifications", "appearance"];

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const { t } = usePreferences();

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-1 rounded-xl border border-border/50 bg-card/30 p-1 backdrop-blur-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            {t(`settings.tabs.${tab}` as never)}
          </button>
        ))}
      </div>
    </div>
  );
}
