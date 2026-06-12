"use client";

import { cn } from "@/src/shared/utils/utils";
import { NotificationFilter } from "../types";

interface NotificationFiltersProps {
  active: NotificationFilter;
  onChange: (filter: NotificationFilter) => void;
  labels: Record<NotificationFilter, string>;
}

const FILTERS: NotificationFilter[] = [
  "all",
  "unread",
  "critical",
  "warnings",
  "success",
  "tax",
  "ai",
  "reports",
  "imports",
];

export function NotificationFilters({ active, onChange, labels }: NotificationFiltersProps) {
  return (
    <div data-testid="notifications-filters" className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          data-testid={`notifications-filter-${filter}`}
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
            active === filter
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-card/50 text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          {labels[filter]}
        </button>
      ))}
    </div>
  );
}
