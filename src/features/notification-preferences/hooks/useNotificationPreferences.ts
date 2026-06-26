"use client";

import { useCallback, useEffect, useState } from "react";
import { notificationPreferencesService } from "../services/notification-preferences.service";
import { clonePreferences, diffPreferences } from "../utils/preference.utils";
import type { NotificationPreferencesResponse } from "../types";

export function useNotificationPreferences() {
  const [original, setOriginal] = useState<NotificationPreferencesResponse | null>(null);
  const [draft, setDraft] = useState<NotificationPreferencesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notificationPreferencesService.getPreferences();
      const cloned = clonePreferences(data);
      setOriginal(cloned);
      setDraft(clonePreferences(cloned));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load preferences");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const hasChanges =
    original !== null &&
    draft !== null &&
    JSON.stringify(original) !== JSON.stringify(draft);

  const applyServerData = (data: NotificationPreferencesResponse) => {
    const cloned = clonePreferences(data);
    setOriginal(cloned);
    setDraft(clonePreferences(cloned));
  };

  const save = async () => {
    if (!original || !draft) return;
    setSaving(true);
    setError(null);
    try {
      const changes = diffPreferences(original, draft);
      if (changes.length === 0) return;
      const updated = await notificationPreferencesService.updatePreferences({
        preferences: changes,
      });
      applyServerData(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save preferences");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    setSaving(true);
    setError(null);
    try {
      const data = await notificationPreferencesService.resetToDefaults();
      applyServerData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset preferences");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    original,
    draft,
    setDraft,
    loading,
    saving,
    error,
    hasChanges,
    load,
    save,
    reset,
  };
}
