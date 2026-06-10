"use client";

import {
  ArrowLeftRight,
  Banknote,
  FileSpreadsheet,
  Landmark,
  PieChart,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { ReportType } from "../types";
import { cn } from "@/src/shared/utils/utils";

interface ReportTypeSelectorProps {
  value: ReportType;
  onChange: (type: ReportType) => void;
  labels: Record<ReportType, string>;
  disabled?: boolean;
}

const reportTypes: { type: ReportType; icon: typeof PieChart }[] = [
  { type: "PROFIT_AND_LOSS", icon: PieChart },
  { type: "CASH_FLOW", icon: ArrowLeftRight },
  { type: "REVENUE_SUMMARY", icon: TrendingUp },
  { type: "EXPENSE_SUMMARY", icon: Receipt },
  { type: "TAX_SUMMARY", icon: Landmark },
  { type: "FOP_SUMMARY", icon: Banknote },
];

export function ReportTypeSelector({
  value,
  onChange,
  labels,
  disabled,
}: ReportTypeSelectorProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {reportTypes.map(({ type, icon: Icon }) => (
        <button
          key={type}
          type="button"
          disabled={disabled}
          onClick={() => onChange(type)}
          className={cn(
            "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
            value === type
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border/50 bg-card/30 text-muted-foreground hover:border-border hover:bg-muted/30",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted/50">
            <Icon className="h-4 w-4" />
          </div>
          <span className="font-medium">{labels[type]}</span>
        </button>
      ))}
    </div>
  );
}

export function ReportFormatSelector({
  value,
  onChange,
  labels,
  disabled,
}: {
  value: "PDF" | "CSV" | "EXCEL";
  onChange: (format: "PDF" | "CSV" | "EXCEL") => void;
  labels: Record<"PDF" | "CSV" | "EXCEL", string>;
  disabled?: boolean;
}) {
  const formats = ["PDF", "CSV", "EXCEL"] as const;

  return (
    <div className="flex flex-wrap gap-2">
      {formats.map((format) => (
        <button
          key={format}
          type="button"
          disabled={disabled}
          onClick={() => onChange(format)}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
            value === format
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border/50 text-muted-foreground hover:border-border hover:bg-muted/30",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <FileSpreadsheet className="h-4 w-4" />
          {labels[format]}
        </button>
      ))}
    </div>
  );
}
