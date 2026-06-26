"use client";

import { useCallback, useEffect, useState } from "react";
import { dispatchProfileUpdated, profileService } from "../services/profile.service";
import type { Profile } from "../types";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
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

  return { profile, loading, error, refresh, setProfile };
}
