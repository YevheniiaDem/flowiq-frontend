"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import { cn } from "@/src/shared/utils/utils";
import {
  getTransactionDateMax,
  isIsoDateString,
  sanitizeTransactionDate,
  TRANSACTION_DATE_MIN,
} from "../data/dateBounds";

function dateInputClassName(hasValue: boolean, fullWidth: boolean) {
  return cn(
    "pr-9 transition-colors [&::-webkit-calendar-picker-indicator]:hidden",
    fullWidth ? "w-full" : "w-auto",
    hasValue
      ? "text-foreground [&::-webkit-datetime-edit]:text-foreground"
      : "text-muted-foreground/40 [&::-webkit-datetime-edit]:text-muted-foreground/40 [&::-webkit-datetime-edit-fields-wrapper]:text-muted-foreground/40"
  );
}

type DateInputElement = HTMLInputElement & {
  showPicker?: () => void;
  hidePicker?: () => void;
};

export function closeNativePicker(input: HTMLInputElement | null) {
  if (!input) return;

  const dateInput = input as DateInputElement;

  if (typeof dateInput.hidePicker === "function") {
    try {
      dateInput.hidePicker();
    } catch {
      input.blur();
    }
  } else {
    input.blur();
  }
}

export function openNativePicker(input: HTMLInputElement | null) {
  if (!input) return;

  const dateInput = input as DateInputElement;

  if (typeof dateInput.showPicker === "function") {
    dateInput.showPicker();
  } else {
    input.focus();
    input.click();
  }
}

export interface DatePickerInputProps {
  value: string;
  onChange: (value: string) => void;
  openCalendarLabel: string;
  closeCalendarLabel: string;
  className?: string;
  fullWidth?: boolean;
  isPickerOpen?: boolean;
  onPickerOpenChange?: (open: boolean) => void;
  onBeforeOpen?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export function DatePickerInput({
  value,
  onChange,
  openCalendarLabel,
  closeCalendarLabel,
  className,
  fullWidth = false,
  isPickerOpen: controlledOpen,
  onPickerOpenChange,
  onBeforeOpen,
  inputRef: externalInputRef,
}: DatePickerInputProps) {
  const internalInputRef = useRef<HTMLInputElement>(null);
  const inputRef = externalInputRef ?? internalInputRef;
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const maxDate = getTransactionDateMax();

  const isControlled = controlledOpen !== undefined && onPickerOpenChange !== undefined;
  const isPickerOpen = isControlled ? controlledOpen : internalOpen;

  const setPickerOpen = (open: boolean) => {
    if (onPickerOpenChange) {
      onPickerOpenChange(open);
    } else {
      setInternalOpen(open);
    }
  };

  const hasValue = Boolean(value);

  const clearBlurTimer = () => {
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }
  };

  const handleDateBlur = () => {
    clearBlurTimer();
    blurTimerRef.current = setTimeout(() => {
      setPickerOpen(false);
      if (value && isIsoDateString(value)) {
        const sanitized = sanitizeTransactionDate(value);
        if (sanitized !== value) {
          onChange(sanitized);
        }
      }
    }, 200);
  };

  useEffect(() => {
    if (!isPickerOpen) {
      closeNativePicker(inputRef.current);
    }
  }, [isPickerOpen, inputRef]);

  const togglePicker = () => {
    const input = inputRef.current;
    if (!input) return;

    clearBlurTimer();

    if (isPickerOpen) {
      closeNativePicker(input);
      setPickerOpen(false);
      return;
    }

    onBeforeOpen?.();

    try {
      openNativePicker(input);
      setPickerOpen(true);
    } catch {
      setPickerOpen(false);
    }
  };

  return (
    <div className={cn("relative", fullWidth ? "w-full" : "w-auto", className)}>
      <Input
        ref={inputRef}
        type="date"
        value={value}
        min={TRANSACTION_DATE_MIN}
        max={maxDate}
        onChange={(event) => {
          onChange(event.target.value);
          clearBlurTimer();
          setPickerOpen(false);
        }}
        onFocus={clearBlurTimer}
        onBlur={handleDateBlur}
        className={dateInputClassName(hasValue, fullWidth)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className={cn(
          "absolute top-1/2 right-1 -translate-y-1/2 hover:bg-transparent",
          isPickerOpen
            ? "text-primary"
            : hasValue
              ? "text-muted-foreground hover:text-foreground"
              : "text-muted-foreground/40 hover:text-muted-foreground/70"
        )}
        onMouseDown={(event) => event.preventDefault()}
        onClick={togglePicker}
        aria-label={isPickerOpen ? closeCalendarLabel : openCalendarLabel}
        aria-expanded={isPickerOpen}
      >
        <Calendar className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
