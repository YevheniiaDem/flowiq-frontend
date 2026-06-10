"use client";

import { useCallback, useEffect, useState } from "react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { businessGuideService } from "../services/business-guide.service";
import { BusinessGuideSearchResult } from "../types";

export function useBusinessGuideSearch() {
  const { language } = usePreferences();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BusinessGuideSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await businessGuideService.search(searchQuery, language);
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return { query, setQuery, results, loading };
}
