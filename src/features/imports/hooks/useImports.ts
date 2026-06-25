"use client";

import { useCallback, useEffect, useState } from "react";
import { importService } from "../services/importService";
import { trackEvent } from "@/src/features/onboarding/services/productAnalytics";
import { ImportJob, ImportStats } from "../types";

export function useImports() {
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [stats, setStats] = useState<ImportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await importService.getImports();
      setJobs(data.jobs);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load imports");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      trackEvent("import_upload_started", { fileName: file.name });
      await importService.uploadFile(file);
      await load();
    } catch (err) {
      trackEvent("import_upload_failed");
      setError(err instanceof Error ? err.message : "Failed to upload file");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    jobs,
    stats,
    loading,
    uploading,
    error,
    uploadFile,
    reload: load,
  };
}
