"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Button } from "@/src/shared/components/ui/button";
import { ReportsSummary } from "./components/ReportsSummary";
import { ReportPeriodFilter } from "./components/ReportPeriodFilter";
import { ReportPreviewChart } from "./components/ReportPreviewChart";
import { ReportHistoryTable } from "./components/ReportHistoryTable";
import { GenerateReportDialog } from "./components/GenerateReportDialog";
import { useReports } from "./hooks/useReports";
import { ReportJob, ReportPeriodPreset, ReportType } from "./types";

function defaultCustomDates() {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

export function ReportsView() {
  const { t, language, currency } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";
  const defaults = defaultCustomDates();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [periodPreset, setPeriodPreset] = useState<ReportPeriodPreset>("THIS_MONTH");
  const [dateFrom, setDateFrom] = useState(defaults.from);
  const [dateTo, setDateTo] = useState(defaults.to);

  const {
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
  } = useReports();

  const typeLabels = useMemo(
    (): Record<ReportType, string> => ({
      PROFIT_AND_LOSS: t("reports.types.profitAndLoss"),
      CASH_FLOW: t("reports.types.cashFlow"),
      REVENUE_SUMMARY: t("reports.types.revenueSummary"),
      EXPENSE_SUMMARY: t("reports.types.expenseSummary"),
      TAX_SUMMARY: t("reports.types.taxSummary"),
      FOP_SUMMARY: t("reports.types.fopSummary"),
    }),
    [t]
  );

  const statusLabels = useMemo(
    () => ({
      PENDING: t("reports.status.pending"),
      GENERATING: t("reports.status.generating"),
      COMPLETED: t("reports.status.completed"),
      FAILED: t("reports.status.failed"),
    }),
    [t]
  );

  const periodLabels = useMemo(
    () => ({
      thisMonth: t("reports.periods.thisMonth"),
      lastMonth: t("reports.periods.lastMonth"),
      quarter: t("reports.periods.quarter"),
      year: t("reports.periods.year"),
      custom: t("reports.periods.custom"),
      from: t("reports.periods.from"),
      to: t("reports.periods.to"),
      openCalendar: t("reports.periods.openCalendar"),
      closeCalendar: t("reports.periods.closeCalendar"),
    }),
    [t]
  );

  const periodLabel = useMemo(() => {
    const map: Record<ReportPeriodPreset, string> = {
      THIS_MONTH: periodLabels.thisMonth,
      LAST_MONTH: periodLabels.lastMonth,
      QUARTER: periodLabels.quarter,
      YEAR: periodLabels.year,
      CUSTOM: `${dateFrom} – ${dateTo}`,
    };
    return map[periodPreset];
  }, [periodPreset, periodLabels, dateFrom, dateTo]);

  const previewParams = useMemo(
    () =>
      periodPreset === "CUSTOM"
        ? { periodPreset, dateFrom, dateTo }
        : { periodPreset },
    [periodPreset, dateFrom, dateTo]
  );

  useEffect(() => {
    if (!loading) {
      loadPreview(previewParams);
    }
  }, [loading, loadPreview, previewParams]);

  const handlePeriodChange = useCallback(
    (preset: ReportPeriodPreset, from: string, to: string) => {
      setPeriodPreset(preset);
      if (preset === "CUSTOM") {
        setDateFrom(from);
        setDateTo(to);
      }
    },
    []
  );

  const handleDownload = async (report: ReportJob) => {
    await downloadReport(report.id, report.fileName);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="space-y-4 p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("reports.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("reports.subtitle")}</p>
        </div>
        <Button className="rounded-lg" size="sm" onClick={() => setDialogOpen(true)}>
          <Download className="mr-2 h-3.5 w-3.5" />
          {t("reports.generate")}
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {stats && (
        <ReportsSummary
          stats={stats}
          locale={locale}
          labels={{
            generatedReports: t("reports.stats.generatedReports"),
            reportsThisMonth: t("reports.stats.reportsThisMonth"),
            lastGenerated: t("reports.stats.lastGenerated"),
            mostUsedType: t("reports.stats.mostUsedType"),
            never: t("reports.stats.never"),
            types: typeLabels,
          }}
        />
      )}

      <div className="space-y-3">
        <ReportPeriodFilter
          value={periodPreset}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onChange={handlePeriodChange}
          labels={periodLabels}
        />
        <ReportPreviewChart
          preview={preview}
          loading={previewLoading}
          periodLabel={periodLabel}
          currency={currency}
          language={language}
          locale={locale}
          labels={{
            title: t("reports.preview.title"),
            revenue: t("reports.preview.revenue"),
            expenses: t("reports.preview.expenses"),
            profit: t("reports.preview.profit"),
            taxBurden: t("reports.preview.taxBurden"),
            chartRevenue: t("reports.preview.chartRevenue"),
            loading: t("reports.preview.loading"),
            empty: t("reports.preview.empty"),
          }}
        />
      </div>

      <ReportHistoryTable
        reports={reports}
        downloadingId={downloadingId}
        onDownload={handleDownload}
        locale={locale}
        labels={{
          title: t("reports.history.title"),
          fileName: t("reports.history.fileName"),
          type: t("reports.history.type"),
          period: t("reports.history.period"),
          format: t("reports.history.format"),
          createdAt: t("reports.history.createdAt"),
          status: t("reports.history.status"),
          download: t("reports.download"),
          empty: t("reports.history.empty"),
          statusLabels,
          types: typeLabels,
          formats: {
            PDF: t("reports.formats.pdf"),
            CSV: t("reports.formats.csv"),
            EXCEL: t("reports.formats.excel"),
          },
        }}
      />

      <GenerateReportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        preview={preview}
        previewLoading={previewLoading}
        generating={generating}
        onPreviewChange={loadPreview}
        onGenerate={generateReport}
        labels={{
          title: t("reports.dialog.title"),
          description: t("reports.dialog.description"),
          reportType: t("reports.dialog.reportType"),
          period: t("reports.dialog.period"),
          format: t("reports.dialog.format"),
          cancel: t("reports.dialog.cancel"),
          generate: t("reports.generate"),
          types: typeLabels,
          formats: {
            PDF: t("reports.formats.pdf"),
            CSV: t("reports.formats.csv"),
            EXCEL: t("reports.formats.excel"),
          },
          periodLabels,
        }}
      />
    </motion.div>
  );
}
