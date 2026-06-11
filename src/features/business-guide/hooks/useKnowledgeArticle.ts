"use client";

import { useCallback, useEffect, useState } from "react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { knowledgeService } from "../services/knowledge.service";
import { KnowledgeArticleDetail } from "../types/knowledge";

export function useKnowledgeArticle(slug: string) {
  const { t } = usePreferences();
  const [article, setArticle] = useState<KnowledgeArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const data = await knowledgeService.getArticle(slug);
      setArticle(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("businessGuide.loadError")
      );
    } finally {
      setLoading(false);
    }
  }, [slug, t]);

  useEffect(() => {
    load();
  }, [load]);

  return { article, loading, error, reload: load };
}
