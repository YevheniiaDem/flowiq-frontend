"use client";

import { useRef, useState } from "react";
import { ReportPeriodPreset } from "../types";
import { cn } from "@/src/shared/utils/utils";
import {
  closeNativePicker,
  DatePickerInput,
} from "@/src/features/transactions/components/DatePickerInput";

interface ReportPeriodFilterProps {
  value: ReportPeriodPreset;
  dateFrom: string;
  dateTo: string;
  onChange: (preset: ReportPeriodPreset, dateFrom: string, dateTo: string) => void;
  labels: {
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
  disabled?: boolean;
}

const presets: ReportPeriodPreset[] = [
  "THIS_MONTH",
  "LAST_MONTH",
  "QUARTER",
  "YEAR",
  "CUSTOM",
];

export function ReportPeriodFilter({
  value,
  dateFrom,
  dateTo,
  onChange,
  labels,
  disabled,
}: ReportPeriodFilterProps) {
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const [openPicker, setOpenPicker] = useState<"from" | "to" | null>(null);

  const closeOtherPickers = (except: "from" | "to") => {
    if (except !== "from") {
      closeNativePicker(fromInputRef.current);
    }
    if (except !== "to") {
      closeNativePicker(toInputRef.current);
    }
  };

  const handlePickerOpenChange = (id: "from" | "to", open: boolean) => {
    if (open) {
      closeOtherPickers(id);
      setOpenPicker(id);
      return;
    }
    if (openPicker === id) {
      setOpenPicker(null);
    }
  };

  const presetLabels: Record<ReportPeriodPreset, string> = {
    THIS_MONTH: labels.thisMonth,
    LAST_MONTH: labels.lastMonth,
    QUARTER: labels.quarter,
    YEAR: labels.year,
    CUSTOM: labels.custom,
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            disabled={disabled}
            onClick={() => onChange(preset, dateFrom, dateTo)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              value === preset
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border/50 text-muted-foreground hover:border-border hover:bg-muted/30",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {presetLabels[preset]}
          </button>
        ))}
      </div>

      {value === "CUSTOM" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{labels.from}</label>
            <DatePickerInput
              inputRef={fromInputRef}
              value={dateFrom}
              onChange={(next) => onChange("CUSTOM", next, dateTo)}
              openCalendarLabel={labels.openCalendar}
              closeCalendarLabel={labels.closeCalendar}
              fullWidth
              isPickerOpen={openPicker === "from"}
              onPickerOpenChange={(open) => handlePickerOpenChange("from", open)}
              onBeforeOpen={() => closeOtherPickers("from")}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{labels.to}</label>
            <DatePickerInput
              inputRef={toInputRef}
              value={dateTo}
              onChange={(next) => onChange("CUSTOM", dateFrom, next)}
              openCalendarLabel={labels.openCalendar}
              closeCalendarLabel={labels.closeCalendar}
              fullWidth
              isPickerOpen={openPicker === "to"}
              onPickerOpenChange={(open) => handlePickerOpenChange("to", open)}
              onBeforeOpen={() => closeOtherPickers("to")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
