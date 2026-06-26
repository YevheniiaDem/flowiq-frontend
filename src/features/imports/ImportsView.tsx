"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Loader2, Upload } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import {
  useContextualHint,
  useFirstImportSuccess,
  usePendingHelpGuide,
  FirstImportSuccessModal,
  EmptyState,
} from "@/src/features/onboarding";
import { ImportDashboardCards } from "./components/ImportDashboardCards";
import { ImportUploadZone } from "./components/ImportUploadZone";
import { ImportHistoryTable } from "./components/ImportHistoryTable";
import { useImports } from "./hooks/useImports";

export function ImportsView() {
  const { t, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";
  const { jobs, stats, loading, uploading, error, uploadFile } = useImports();

  useContextualHint("imports", !loading);
  usePendingHelpGuide("import_guide", !loading);
  const firstImport = useFirstImportSuccess(jobs, !loading);

  const statusLabels = useMemo(
    () => ({
      PENDING: t("imports.status.pending"),
      PROCESSING: t("imports.status.processing"),
      COMPLETED: t("imports.status.completed"),
      PARTIAL: t("imports.status.partial"),
      FAILED: t("imports.status.failed"),
    }),
    [t]
  );

  const labels = useMemo(
    () => ({
      dashboard: {
        importedFiles: t("imports.stats.importedFiles"),
        importedTransactions: t("imports.stats.importedTransactions"),
        lastImport: t("imports.stats.lastImport"),
        successRate: t("imports.stats.successRate"),
        never: t("imports.stats.never"),
      },
      upload: {
        title: t("imports.upload.title"),
        subtitle: t("imports.upload.subtitle"),
        browse: t("imports.upload.browse"),
        dragHint: t("imports.upload.dragHint"),
        supportedFormats: t("imports.upload.supportedFormats"),
        fileName: t("imports.upload.fileName"),
        fileSize: t("imports.upload.fileSize"),
        uploadedAt: t("imports.upload.uploadedAt"),
        status: t("imports.upload.status"),
        statusLabels,
      },
      history: {
        title: t("imports.history.title"),
        fileName: t("imports.history.fileName"),
        importedAt: t("imports.history.importedAt"),
        rowsProcessed: t("imports.history.rowsProcessed"),
        importedTransactions: t("imports.history.importedTransactions"),
        errors: t("imports.history.errors"),
        status: t("imports.history.status"),
        empty: t("imports.history.empty"),
        statusLabels,
      },
    }),
    [t, statusLabels]
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      data-testid="imports-page"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-4 p-4"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("imports.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("imports.subtitle")}</p>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {stats && (
        <ImportDashboardCards stats={stats} labels={labels.dashboard} locale={locale} />
      )}

      <ImportUploadZone
        onUpload={uploadFile}
        uploading={uploading}
        recentJobs={jobs}
        labels={labels.upload}
        locale={locale}
      />

      <ImportHistoryTable jobs={jobs} labels={labels.history} locale={locale} />

      {jobs.length === 0 && (
        <EmptyState
          testId="imports-empty-state"
          icon={Upload}
          title={t("activation.empty.imports.title")}
          description={t("activation.empty.imports.description")}
          primaryAction={{
            label: t("activation.empty.imports.cta"),
            testId: "imports-empty-upload-hint",
          }}
        />
      )}

      <FirstImportSuccessModal
        open={firstImport.showModal}
        transactionCount={firstImport.importedCount}
        labels={{
          title: t("activation.firstImport.title"),
          description: t("activation.firstImport.description"),
          viewTransactions: t("activation.firstImport.viewTransactions"),
          exploreDashboard: t("activation.firstImport.exploreDashboard"),
          aiInsight: t("activation.firstImport.aiInsight"),
        }}
        onViewTransactions={firstImport.viewTransactions}
        onExploreDashboard={firstImport.exploreDashboard}
        onClose={firstImport.dismiss}
      />
    </motion.div>
  );
}
