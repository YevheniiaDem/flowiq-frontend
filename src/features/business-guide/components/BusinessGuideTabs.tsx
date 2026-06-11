"use client";

import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { BusinessGuideTab } from "../types/knowledge";

const TABS: BusinessGuideTab[] = [
  "overview",
  "fop-groups",
  "taxes",
  "kved",
  "faq",
  "knowledge-base",
  "updates",
];

interface BusinessGuideTabsProps {
  activeTab: BusinessGuideTab;
  onTabChange: (tab: BusinessGuideTab) => void;
}

export function BusinessGuideTabs({
  activeTab,
  onTabChange,
}: BusinessGuideTabsProps) {
  const { t } = usePreferences();

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-1 rounded-xl border border-border/50 bg-card/30 p-1 backdrop-blur-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            {t(`businessGuide.tabs.${tab}` as never)}
          </button>
        ))}
      </div>
    </div>
  );
}
