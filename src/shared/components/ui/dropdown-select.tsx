"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import { cn } from "@/src/shared/utils/utils";

export interface DropdownSelectOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  id?: string;
  value: string;
  options: readonly DropdownSelectOption[];
  onChange: (value: string) => void;
  className?: string;
  "aria-label"?: string;
}

export function DropdownSelect({
  id,
  value,
  options,
  onChange,
  className,
  "aria-label": ariaLabel,
}: DropdownSelectProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          aria-label={ariaLabel}
          className={cn(
            "h-9 w-full justify-start gap-1.5 border-input bg-input/30 px-3 font-normal hover:bg-input/50",
            className
          )}
        >
          <span className="truncate text-foreground">{selected?.label ?? value}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={4}
        className="z-[60] max-h-56 w-[var(--radix-dropdown-menu-trigger-width)] rounded-xl border-border/50 bg-popover p-1.5 shadow-lg"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "cursor-pointer rounded-lg px-2.5 py-2 text-popover-foreground focus:bg-accent focus:text-accent-foreground",
              value === option.value && "bg-accent/60"
            )}
            onClick={() => onChange(option.value)}
          >
            <span className="flex-1">{option.label}</span>
            {value === option.value && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
