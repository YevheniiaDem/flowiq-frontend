"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { ReportJob, ReportType } from "../types";
import { ReportStatusBadge } from "./ReportStatusBadge";

interface ReportHistoryTableProps {
  reports: ReportJob[];
  downloadingId: number | null;
  onDownload: (report: ReportJob) => void;
  labels: {
    title: string;
    fileName: string;
    type: string;
    period: string;
    format: string;
    createdAt: string;
    status: string;
    download: string;
    empty: string;
    statusLabels: Record<string, string>;
    types: Record<ReportType, string>;
    formats: Record<string, string>;
  };
  locale: string;
}

function formatPeriod(from: string, to: string, locale: string) {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const opts: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
  return `${fromDate.toLocaleDateString(locale, opts)} – ${toDate.toLocaleDateString(locale, opts)}`;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ReportHistoryTable({
  reports,
  downloadingId,
  onDownload,
  labels,
  locale,
}: ReportHistoryTableProps) {
  return (
    <Card className="overflow-hidden rounded-xl border-border/50 bg-card/50">
      <div className="border-b border-border/50 px-4 py-3">
        <h3 className="text-sm font-semibold">{labels.title}</h3>
      </div>

      {reports.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-muted-foreground">{labels.empty}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">{labels.fileName}</th>
                <th className="px-4 py-3 font-medium">{labels.type}</th>
                <th className="px-4 py-3 font-medium">{labels.period}</th>
                <th className="px-4 py-3 font-medium">{labels.format}</th>
                <th className="px-4 py-3 font-medium">{labels.createdAt}</th>
                <th className="px-4 py-3 font-medium">{labels.status}</th>
                <th className="px-4 py-3 font-medium text-right">{labels.download}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-border/30 transition-colors hover:bg-muted/30"
                >
                  <td className="max-w-[180px] truncate px-4 py-3 font-medium">
                    {report.fileName}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({formatFileSize(report.fileSize)})
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {labels.types[report.reportType] ?? report.reportType}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatPeriod(report.periodFrom, report.periodTo, locale)}
                  </td>
                  <td className="px-4 py-3">
                    {labels.formats[report.format] ?? report.format}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(report.createdAt).toLocaleString(locale, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <ReportStatusBadge
                      status={report.status}
                      label={labels.statusLabels[report.status] ?? report.status}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      disabled={report.status !== "COMPLETED" || downloadingId === report.id}
                      onClick={() => onDownload(report)}
                    >
                      {downloadingId === report.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Download className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
