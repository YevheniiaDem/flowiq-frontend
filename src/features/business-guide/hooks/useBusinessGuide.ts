"use client";

import { useCallback, useEffect, useState } from "react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { businessGuideService } from "../services/business-guide.service";
import {
  BusinessProfile,
  FopGroupSummary,
  SmartRecommendation,
  TaxType,
} from "../types";

interface BusinessGuideData {
  profile: BusinessProfile | null;
  groups: FopGroupSummary[];
  taxes: TaxType[];
  recommendations: SmartRecommendation[];
}

export function useBusinessGuide() {
  const { language, t } = usePreferences();
  const [data, setData] = useState<BusinessGuideData>({
    profile: null,
    groups: [],
    taxes: [],
    recommendations: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [profile, groups, taxes, recommendations] = await Promise.all([
        businessGuideService.getBusinessProfile(language),
        businessGuideService.getFopGroups(language),
        businessGuideService.getTaxes(language),
        businessGuideService.getRecommendations(language),
      ]);
      setData({ profile, groups, taxes, recommendations });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("businessGuide.loadError"));
    } finally {
      setLoading(false);
    }
  }, [language, t]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...data, loading, error, reload: load };
}
