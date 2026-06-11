"use client";

import { useCallback, useEffect, useState } from "react";
import { knowledgeService } from "../services/knowledge.service";
import { KnowledgeArticleSummary } from "../types/knowledge";

export function useBusinessGuideSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<KnowledgeArticleSummary[]>([]);
  const [primaryArticle, setPrimaryArticle] =
    useState<KnowledgeArticleSummary | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<
    KnowledgeArticleSummary[]
  >([]);
  const [quickSummary, setQuickSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setPrimaryArticle(null);
      setRelatedArticles([]);
      setQuickSummary(null);
      return;
    }
    setLoading(true);
    try {
      const data = await knowledgeService.search(searchQuery, 0, 10);
      setResults(data.results);
      setPrimaryArticle(data.primaryArticle ?? null);
      setRelatedArticles(data.relatedArticles);
      setQuickSummary(data.quickSummary ?? null);
    } catch {
      setResults([]);
      setPrimaryArticle(null);
      setRelatedArticles([]);
      setQuickSummary(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return {
    query,
    setQuery,
    results,
    primaryArticle,
    relatedArticles,
    quickSummary,
    loading,
  };
}
