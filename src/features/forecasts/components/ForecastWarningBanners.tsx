"use client";

import { AlertTriangle, XCircle } from "lucide-react";
import { ForecastWarning, ForecastSeverity } from "../types";
import { cn } from "@/src/shared/utils/utils";

interface ForecastWarningBannersProps {
  warnings: ForecastWarning[];
}

const bannerStyles: Record<ForecastSeverity, string> = {
  INFO: "border-blue-500/30 bg-blue-500/10 text-blue-200",
  WARNING: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  CRITICAL: "border-red-500/30 bg-red-500/10 text-red-200",
};

export function ForecastWarningBanners({ warnings }: ForecastWarningBannersProps) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {warnings.map((warning) => {
        const Icon = warning.severity === "CRITICAL" ? XCircle : AlertTriangle;

        return (
          <div
            key={warning.type}
            className={cn(
              "flex items-start gap-3 rounded-xl border p-3 backdrop-blur-sm",
              bannerStyles[warning.severity]
            )}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="text-sm font-semibold">{warning.title}</p>
              <p className="text-xs opacity-90">{warning.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
