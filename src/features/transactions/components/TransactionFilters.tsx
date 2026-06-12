"use client";

import { useRef, useState } from "react";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import { Button } from "@/src/shared/components/ui/button";
import { TransactionFilterPreset } from "../types";
import { cn } from "@/src/shared/utils/utils";
import { closeNativePicker, DatePickerInput } from "./DatePickerInput";

type DatePickerId = "from" | "to";

interface TransactionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  preset: TransactionFilterPreset;
  onPresetChange: (preset: TransactionFilterPreset) => void;
  customDateFrom: string;
  customDateTo: string;
  onCustomDateFromChange: (value: string) => void;
  onCustomDateToChange: (value: string) => void;
  labels: Record<string, string>;
}

const presets: TransactionFilterPreset[] = [
  "all",
  "income",
  "expense",
  "currentMonth",
  "currentQuarter",
  "currentYear",
  "custom",
];

export function TransactionFilters({
  search,
  onSearchChange,
  preset,
  onPresetChange,
  customDateFrom,
  customDateTo,
  onCustomDateFromChange,
  onCustomDateToChange,
  labels,
}: TransactionFiltersProps) {
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const [openPickerId, setOpenPickerId] = useState<DatePickerId | null>(null);

  const closeOtherPickers = (exceptId: DatePickerId) => {
    if (exceptId !== "from") {
      closeNativePicker(fromInputRef.current);
    }
    if (exceptId !== "to") {
      closeNativePicker(toInputRef.current);
    }
  };

  const handlePickerOpenChange = (id: DatePickerId, open: boolean) => {
    if (open) {
      closeOtherPickers(id);
      setOpenPickerId(id);
      return;
    }

    if (openPickerId === id) {
      setOpenPickerId(null);
    }
  };

  return (
    <div data-testid="transactions-filters" className="space-y-3">
      <ClearableInput
        data-testid="transactions-search"
        containerClassName="max-w-md"
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={labels.searchPlaceholder}
        clearAriaLabel={labels.clearSearch}
      />

      <div className="flex flex-wrap gap-2">
        {presets.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={preset === item ? "default" : "outline"}
            className={cn("rounded-full")}
            onClick={() => onPresetChange(item)}
          >
            {labels[`filter_${item}`]}
          </Button>
        ))}
      </div>

      {preset === "custom" && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">{labels.from}</span>
          <DatePickerInput
            inputRef={fromInputRef}
            value={customDateFrom}
            onChange={onCustomDateFromChange}
            isPickerOpen={openPickerId === "from"}
            onPickerOpenChange={(open) => handlePickerOpenChange("from", open)}
            onBeforeOpen={() => closeOtherPickers("from")}
            openCalendarLabel={labels.openCalendar}
            closeCalendarLabel={labels.closeCalendar}
          />
          <span className="text-sm text-muted-foreground">{labels.to}</span>
          <DatePickerInput
            inputRef={toInputRef}
            value={customDateTo}
            onChange={onCustomDateToChange}
            isPickerOpen={openPickerId === "to"}
            onPickerOpenChange={(open) => handlePickerOpenChange("to", open)}
            onBeforeOpen={() => closeOtherPickers("to")}
            openCalendarLabel={labels.openCalendar}
            closeCalendarLabel={labels.closeCalendar}
          />
        </div>
      )}
    </div>
  );
}
