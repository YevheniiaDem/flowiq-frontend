"use client";

import { useCallback, useEffect, useState } from "react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { knowledgeService } from "../services/knowledge.service";
import {
  KnowledgeArticlePage,
  KnowledgeArticleSummary,
  KnowledgeCategory,
} from "../types/knowledge";

export function useKnowledgeArticles(
  category?: KnowledgeCategory,
  pageSize = 20
) {
  const { t } = usePreferences();
  const [page, setPage] = useState<KnowledgeArticlePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (pageIndex = 0) => {
      setLoading(true);
      setError(null);
      try {
        const data = await knowledgeService.getArticles(
          pageIndex,
          pageSize,
          category
        );
        setPage(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t("businessGuide.loadError")
        );
      } finally {
        setLoading(false);
      }
    },
    [category, pageSize, t]
  );

  useEffect(() => {
    load(0);
  }, [load]);

  return {
    articles: (page?.content ?? []) as KnowledgeArticleSummary[],
    page: page?.page ?? 0,
    totalPages: page?.totalPages ?? 0,
    totalElements: page?.totalElements ?? 0,
    loading,
    error,
    loadPage: load,
  };
}
