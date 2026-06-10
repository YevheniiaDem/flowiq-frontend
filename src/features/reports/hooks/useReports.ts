"use client";

import { useCallback, useEffect, useState } from "react";
import { reportsService } from "../services/reports.service";
import {
  GenerateReportRequest,
  ReportDashboardStats,
  ReportJob,
  ReportPeriodPreset,
  ReportPreview,
} from "../types";

export function useReports() {
  const [reports, setReports] = useState<ReportJob[]>([]);
  const [stats, setStats] = useState<ReportDashboardStats | null>(null);
  const [preview, setPreview] = useState<ReportPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reportsService.getReports();
      setReports(data.reports);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const loadPreview = useCallback(
    async (params: {
      periodPreset?: ReportPeriodPreset;
      dateFrom?: string;
      dateTo?: string;
    }) => {
      setPreviewLoading(true);
      setError(null);
      try {
        const data = await reportsService.getPreview(params);
        setPreview(data);
      } catch (err) {
        setPreview(null);
        setError(err instanceof Error ? err.message : "Failed to load preview");
      } finally {
        setPreviewLoading(false);
      }
    },
    []
  );

  const generateReport = async (request: GenerateReportRequest) => {
    setGenerating(true);
    setError(null);
    try {
      const job = await reportsService.generate(request);
      await load();
      return job;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate report");
      throw err;
    } finally {
      setGenerating(false);
    }
  };

  const downloadReport = async (id: number, fileName: string) => {
    setDownloadingId(id);
    setError(null);
    try {
      const blob = await reportsService.downloadReport(id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download report");
      throw err;
    } finally {
      setDownloadingId(null);
    }
  };

  return {
    reports,
    stats,
    preview,
    loading,
    previewLoading,
    generating,
    downloadingId,
    error,
    loadPreview,
    generateReport,
    downloadReport,
    reload: load,
  };
}
