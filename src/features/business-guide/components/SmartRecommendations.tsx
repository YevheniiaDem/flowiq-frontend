"use client";

import { SmartRecommendation } from "../types";
import { RecommendationCard } from "./RecommendationCard";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

interface SmartRecommendationsProps {
  recommendations: SmartRecommendation[];
}

export function SmartRecommendations({ recommendations }: SmartRecommendationsProps) {
  const { t } = usePreferences();

  return (
    <section>
      <div className="mb-3">
        <h2 className="text-lg font-semibold">
          {t("businessGuide.recommendations.title")}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t("businessGuide.recommendations.subtitle")}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec, index) => (
          <RecommendationCard
            key={rec.id}
            recommendation={rec}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
