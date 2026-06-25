"use client";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/shared/components/ui/tooltip";

interface MetricTooltipProps {
  metricId: string;
  label: string;
  tooltip: string;
}

export function MetricTooltip({ metricId, label, tooltip }: MetricTooltipProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            data-testid={`metric-tooltip-${metricId}`}
            className="inline-flex rounded-sm text-muted-foreground/70 hover:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={tooltip}
          >
            <Info className="h-3 w-3" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-left leading-relaxed">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
