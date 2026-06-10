"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import { ReportFormatSelector, ReportTypeSelector } from "./ReportTypeSelector";
import { ReportPeriodFilter } from "./ReportPeriodFilter";
import {
  GenerateReportRequest,
  ReportFormat,
  ReportPeriodPreset,
  ReportPreview,
  ReportType,
} from "../types";

interface GenerateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (request: GenerateReportRequest) => Promise<unknown>;
  onPreviewChange: (params: {
    periodPreset?: ReportPeriodPreset;
    dateFrom?: string;
    dateTo?: string;
  }) => void;
  preview: ReportPreview | null;
  previewLoading: boolean;
  generating: boolean;
  labels: {
    title: string;
    description: string;
    reportType: string;
    period: string;
    format: string;
    cancel: string;
    generate: string;
    types: Record<ReportType, string>;
    formats: Record<ReportFormat, string>;
    periodLabels: {
      thisMonth: string;
      lastMonth: string;
      quarter: string;
      year: string;
      custom: string;
      from: string;
      to: string;
      openCalendar: string;
      closeCalendar: string;
    };
  };
}

function defaultCustomDates() {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

export function GenerateReportDialog({
  open,
  onOpenChange,
  onGenerate,
  onPreviewChange,
  previewLoading,
  generating,
  labels,
}: GenerateReportDialogProps) {
  const defaults = defaultCustomDates();
  const [reportType, setReportType] = useState<ReportType>("PROFIT_AND_LOSS");
  const [format, setFormat] = useState<ReportFormat>("PDF");
  const [periodPreset, setPeriodPreset] = useState<ReportPeriodPreset>("THIS_MONTH");
  const [dateFrom, setDateFrom] = useState(defaults.from);
  const [dateTo, setDateTo] = useState(defaults.to);

  useEffect(() => {
    if (!open) {
      return;
    }
    const params =
      periodPreset === "CUSTOM"
        ? { periodPreset, dateFrom, dateTo }
        : { periodPreset };
    onPreviewChange(params);
  }, [open, periodPreset, dateFrom, dateTo, onPreviewChange]);

  const handlePeriodChange = (preset: ReportPeriodPreset, from: string, to: string) => {
    setPeriodPreset(preset);
    if (preset === "CUSTOM") {
      setDateFrom(from);
      setDateTo(to);
    }
  };

  const handleGenerate = async () => {
    const request: GenerateReportRequest = {
      reportType,
      format,
      ...(periodPreset === "CUSTOM"
        ? { periodPreset, dateFrom, dateTo }
        : { periodPreset }),
    };
    await onGenerate(request);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{labels.title}</DialogTitle>
          <DialogDescription>{labels.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{labels.reportType}</p>
            <ReportTypeSelector
              value={reportType}
              onChange={setReportType}
              labels={labels.types}
              disabled={generating}
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{labels.period}</p>
            <ReportPeriodFilter
              value={periodPreset}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onChange={handlePeriodChange}
              labels={labels.periodLabels}
              disabled={generating}
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">{labels.format}</p>
            <ReportFormatSelector
              value={format}
              onChange={setFormat}
              labels={labels.formats}
              disabled={generating}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="rounded-lg"
            onClick={() => onOpenChange(false)}
            disabled={generating}
          >
            {labels.cancel}
          </Button>
          <Button className="rounded-lg" onClick={handleGenerate} disabled={generating || previewLoading}>
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {labels.generate}
              </>
            ) : (
              labels.generate
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
