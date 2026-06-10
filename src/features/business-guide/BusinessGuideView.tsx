"use client";

import { Loader2 } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useBusinessGuide } from "./hooks/useBusinessGuide";
import { BusinessGuideHero } from "./components/BusinessGuideHero";
import { BusinessProfileCard } from "./components/BusinessProfileCard";
import { FopGroupsOverview } from "./components/FopGroupsOverview";
import { TaxesSection } from "./components/TaxesSection";
import { KvedExplorer } from "./components/KvedExplorer";
import { SmartRecommendations } from "./components/SmartRecommendations";
import { FopEligibilityChecker } from "./checker";

export function BusinessGuideView() {
  const { t } = usePreferences();
  const { profile, groups, taxes, recommendations, loading, error } =
    useBusinessGuide();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-64 items-center justify-center p-4">
        <p className="text-sm text-destructive">
          {error || t("businessGuide.loadError")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <BusinessGuideHero />
      <BusinessProfileCard profile={profile} />
      <FopGroupsOverview groups={groups} />
      <FopEligibilityChecker />
      <SmartRecommendations recommendations={recommendations} />
      <TaxesSection taxes={taxes} />
      <KvedExplorer />
    </div>
  );
}
