"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import { cn } from "@/src/shared/utils/utils";
import { isoToDisplayDate, parseDisplayDateToIso } from "../utils/task.utils";

interface DueDateInputProps {
  value: string;
  onChange: (iso: string) => void;
  placeholder: string;
  className?: string;
}

export function DueDateInput({ value, onChange, placeholder, className }: DueDateInputProps) {
  const pickerId = useId();
  const pickerRef = useRef<HTMLInputElement>(null);
  const [display, setDisplay] = useState(() => isoToDisplayDate(value));
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setDisplay(isoToDisplayDate(value));
    setInvalid(false);
  }, [value]);

  const commitDisplay = (text: string) => {
    if (!text.trim()) {
      onChange("");
      setInvalid(false);
      return;
    }

    const iso = parseDisplayDateToIso(text);
    if (iso) {
      onChange(iso);
      setDisplay(isoToDisplayDate(iso));
      setInvalid(false);
    } else {
      setInvalid(true);
    }
  };

  const openPicker = () => {
    const picker = pickerRef.current;
    if (!picker) return;
    picker.showPicker?.();
    picker.focus();
  };

  return (
    <div className="relative">
      <Input
        type="text"
        inputMode="numeric"
        value={display}
        placeholder={placeholder}
        onChange={(e) => {
          setDisplay(e.target.value);
          setInvalid(false);
        }}
        onBlur={(e) => commitDisplay(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commitDisplay(display);
          }
        }}
        className={cn("pr-9", invalid && "border-destructive", className)}
        aria-invalid={invalid}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-9 w-9 text-muted-foreground hover:text-foreground"
        onClick={openPicker}
        aria-label={placeholder}
      >
        <Calendar className="h-4 w-4" />
      </Button>
      <input
        ref={pickerRef}
        id={pickerId}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
      />
    </div>
  );
}
