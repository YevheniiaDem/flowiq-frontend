"use client";

import { Card } from "@/src/shared/components/ui/card";
import { ImportJob } from "../types";
import { ImportStatusBadge } from "./ImportStatusBadge";

interface ImportHistoryTableProps {
  jobs: ImportJob[];
  labels: {
    title: string;
    fileName: string;
    importedAt: string;
    rowsProcessed: string;
    importedTransactions: string;
    errors: string;
    status: string;
    empty: string;
    statusLabels: Record<string, string>;
  };
  locale: string;
}

export function ImportHistoryTable({ jobs, labels, locale }: ImportHistoryTableProps) {
  return (
    <Card className="overflow-hidden rounded-xl border-border/50 bg-card/50">
      <div className="border-b border-border/50 px-4 py-3">
        <h3 className="text-sm font-semibold">{labels.title}</h3>
      </div>

      {jobs.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-muted-foreground">{labels.empty}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">{labels.fileName}</th>
                <th className="px-4 py-3 font-medium">{labels.importedAt}</th>
                <th className="px-4 py-3 font-medium text-right">{labels.rowsProcessed}</th>
                <th className="px-4 py-3 font-medium text-right">{labels.importedTransactions}</th>
                <th className="px-4 py-3 font-medium text-right">{labels.errors}</th>
                <th className="px-4 py-3 font-medium">{labels.status}</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-border/30 transition-colors hover:bg-muted/30"
                >
                  <td className="max-w-[200px] truncate px-4 py-3 font-medium">{job.fileName}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(job.createdAt).toLocaleString(locale, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">{job.rowsProcessed}</td>
                  <td className="px-4 py-3 text-right text-emerald-500">{job.rowsImported}</td>
                  <td className="px-4 py-3 text-right text-red-500">{job.errorsCount}</td>
                  <td className="px-4 py-3">
                    <ImportStatusBadge
                      status={job.status}
                      label={labels.statusLabels[job.status] ?? job.status}
                    />
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
