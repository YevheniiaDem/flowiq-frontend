"use client";

import { useCallback, useEffect, useState } from "react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { businessGuideService } from "../services/business-guide.service";
import { FopGroupDetail } from "../types";

export function useFopGroup(slug: string) {
  const { language, t } = usePreferences();
  const [group, setGroup] = useState<FopGroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await businessGuideService.getFopGroupBySlug(slug, language);
      if (!data) {
        setError(t("businessGuide.group.notFound"));
        setGroup(null);
      } else {
        setGroup(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("businessGuide.loadError"));
    } finally {
      setLoading(false);
    }
  }, [slug, language, t]);

  useEffect(() => {
    load();
  }, [load]);

  return { group, loading, error, reload: load };
}
