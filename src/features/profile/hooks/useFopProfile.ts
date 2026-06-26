"use client";

import { useCallback, useEffect, useState } from "react";
import { dispatchProfileUpdated, profileService } from "../services/profile.service";
import type { FopProfile } from "../types";

export function useFopProfile() {
  const [fopProfile, setFopProfile] = useState<FopProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getFopProfile();
      setFopProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load FOP profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const refresh = useCallback(async () => {
    await load();
    dispatchProfileUpdated();
  }, [load]);

  return { fopProfile, loading, error, refresh, setFopProfile };
}
