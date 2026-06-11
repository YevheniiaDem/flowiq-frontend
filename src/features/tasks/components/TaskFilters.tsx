"use client";

import { Search } from "lucide-react";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import { cn } from "@/src/shared/utils/utils";
import { TaskSection } from "../types";

interface TaskFiltersProps {
  search: string;
  section: TaskSection;
  searchPlaceholder: string;
  onSearchChange: (value: string) => void;
  onSectionChange: (section: TaskSection) => void;
  sectionLabels: Record<TaskSection, string>;
}

const SECTIONS: TaskSection[] = ["today", "upcoming", "overdue", "completed", "all"];

export function TaskFilters({
  search,
  section,
  searchPlaceholder,
  onSearchChange,
  onSectionChange,
  sectionLabels,
}: TaskFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SECTIONS.map((s) => (
          <Button
            key={s}
            variant={section === s ? "default" : "outline"}
            size="sm"
            className={cn("h-7 rounded-lg text-xs", section !== s && "bg-transparent")}
            onClick={() => onSectionChange(s)}
          >
            {sectionLabels[s]}
          </Button>
        ))}
      </div>
    </div>
  );
}
