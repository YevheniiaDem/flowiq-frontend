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

interface CategorySelectProps {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

export function CategorySelect({ value, options, onChange }: CategorySelectProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-9 w-full justify-between border-input bg-input/30 px-3 font-normal hover:bg-input/50"
        >
          <span className="truncate text-foreground">{value}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={4}
        className="z-[60] max-h-56 w-[var(--radix-dropdown-menu-trigger-width)] rounded-xl border-border/50 bg-popover p-1.5 shadow-lg"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            className={cn(
              "cursor-pointer rounded-lg px-2.5 py-2 text-popover-foreground focus:bg-accent focus:text-accent-foreground",
              value === option && "bg-accent/60"
            )}
            onClick={() => onChange(option)}
          >
            <span className="flex-1">{option}</span>
            {value === option && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
