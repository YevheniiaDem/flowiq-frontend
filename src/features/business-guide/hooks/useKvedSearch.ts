"use client";

import { useCallback, useEffect, useState } from "react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { businessGuideService } from "../services/business-guide.service";
import { Kved } from "../types";

export function useKvedSearch(initialQuery = "") {
  const { language } = usePreferences();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Kved[]>([]);
  const [loading, setLoading] = useState(true);

  const search = useCallback(async (searchQuery: string) => {
    setLoading(true);
    try {
      const kveds = await businessGuideService.searchKveds(searchQuery, language);
      setResults(kveds);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, search]);

  return { query, setQuery, results, loading };
}
