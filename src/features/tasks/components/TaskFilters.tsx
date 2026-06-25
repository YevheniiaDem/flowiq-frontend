"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import { Button } from "@/src/shared/components/ui/button";
import { cn } from "@/src/shared/utils/utils";
import { TaskSection } from "../types";

interface TaskFiltersProps {
  search: string;
  section: TaskSection;
  searchPlaceholder: string;
  clearSearchLabel: string;
  isSearching: boolean;
  searchHint?: string;
  searchResults?: ReactNode;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onSectionChange: (section: TaskSection) => void;
  sectionLabels: Record<TaskSection, string>;
}

const SECTIONS: TaskSection[] = ["today", "upcoming", "overdue", "completed", "all"];

export function TaskFilters({
  search,
  section,
  searchPlaceholder,
  clearSearchLabel,
  isSearching,
  searchHint,
  searchResults,
  onSearchChange,
  onSearchSubmit,
  onSectionChange,
  sectionLabels,
}: TaskFiltersProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div data-testid="tasks-filters" className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-1.5">
        <ClearableInput
          data-testid="tasks-search"
          containerClassName="max-w-md"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          clearAriaLabel={clearSearchLabel}
          leftIcon={<Search className="h-4 w-4" />}
          leftIconClassName="text-muted-foreground"
        />
        {isSearching && searchHint && (
          <p className="text-xs text-muted-foreground">{searchHint}</p>
        )}
      </form>
      {searchResults}
      <div className="flex flex-wrap gap-1.5">
        {SECTIONS.map((s) => (
          <Button
            key={s}
            data-testid={`tasks-section-${s}`}
            variant={section === s ? "default" : "outline"}
            size="sm"
            disabled={isSearching}
            className={cn(
              "h-7 rounded-lg text-xs",
              section !== s && "bg-transparent",
              isSearching && "opacity-50"
            )}
            onClick={() => onSectionChange(s)}
          >
            {sectionLabels[s]}
          </Button>
        ))}
      </div>
    </div>
  );
}
