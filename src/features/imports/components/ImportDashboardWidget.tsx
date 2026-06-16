"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { ImportDashboardCards } from "./ImportDashboardCards";
import { ImportStatusBadge } from "./ImportStatusBadge";
import { useImports } from "../hooks/useImports";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

interface ImportDashboardWidgetProps {
  className?: string;
}

export function ImportDashboardWidget({ className }: ImportDashboardWidgetProps) {
  const { t, language } = usePreferences();
  const { stats, jobs, loading } = useImports();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  if (loading || !stats) {
    return (
      <Card className={`flex h-48 items-center justify-center rounded-xl border-border/50 bg-card/50 ${className ?? ""}`}>
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </Card>
    );
  }

  const recentJobs = jobs.slice(0, 3);
  const statusLabels = {
    PENDING: t("imports.status.pending"),
    PROCESSING: t("imports.status.processing"),
    COMPLETED: t("imports.status.completed"),
    PARTIAL: t("imports.status.partial"),
    FAILED: t("imports.status.failed"),
  };

  return (
    <div data-testid="dashboard-import-widget" className={`space-y-3 ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t("dashboard.importSnapshot.title")}</h2>
          <p className="text-xs text-muted-foreground">{t("dashboard.importSnapshot.subtitle")}</p>
        </div>
        <Link
          href="/imports"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          {t("dashboard.importSnapshot.viewAll")}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <ImportDashboardCards
        stats={stats}
        locale={locale}
        labels={{
          importedFiles: t("imports.stats.importedFiles"),
          importedTransactions: t("imports.stats.importedTransactions"),
          lastImport: t("imports.stats.lastImport"),
          successRate: t("dashboard.importSnapshot.importHealth"),
          never: t("imports.stats.never"),
        }}
      />

      <Card className="overflow-hidden rounded-xl border-border/50 bg-card/50">
        <div className="border-b border-border/50 px-4 py-3">
          <h3 className="text-sm font-semibold">{t("dashboard.importSnapshot.history")}</h3>
        </div>
        {recentJobs.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            {t("imports.history.empty")}
          </div>
        ) : (
          <ul className="divide-y divide-border/50">
            {recentJobs.map((job) => (
              <li key={job.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{job.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(job.createdAt).toLocaleString(locale, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <ImportStatusBadge
                  status={job.status}
                  label={statusLabels[job.status] ?? job.status}
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
