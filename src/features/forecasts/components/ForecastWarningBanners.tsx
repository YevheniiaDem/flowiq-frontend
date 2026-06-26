"use client";

import { AlertTriangle, Info, XCircle } from "lucide-react";
import { ForecastWarning, ForecastSeverity } from "../types";
import { cn } from "@/src/shared/utils/utils";

interface ForecastWarningBannersProps {
  warnings: ForecastWarning[];
}

const severityConfig: Record<
  ForecastSeverity,
  {
    icon: typeof AlertTriangle;
    container: string;
    iconBox: string;
    iconClass: string;
    titleClass: string;
    messageClass: string;
  }
> = {
  INFO: {
    icon: Info,
    container: "border-blue-500/20 bg-blue-500/[0.06]",
    iconBox: "bg-blue-500/12 ring-1 ring-blue-500/20",
    iconClass: "text-blue-600 dark:text-blue-400",
    titleClass: "text-blue-950 dark:text-blue-50",
    messageClass: "text-blue-900/80 dark:text-blue-100/80",
  },
  WARNING: {
    icon: AlertTriangle,
    container: "border-amber-500/25 bg-amber-500/[0.07]",
    iconBox: "bg-amber-500/12 ring-1 ring-amber-500/20",
    iconClass: "text-amber-600 dark:text-amber-400",
    titleClass: "text-amber-950 dark:text-amber-50",
    messageClass: "text-amber-900/80 dark:text-amber-100/80",
  },
  CRITICAL: {
    icon: XCircle,
    container: "border-red-500/25 bg-red-500/[0.06]",
    iconBox: "bg-red-500/12 ring-1 ring-red-500/20",
    iconClass: "text-red-600 dark:text-red-400",
    titleClass: "text-red-950 dark:text-red-50",
    messageClass: "text-red-900/80 dark:text-red-100/80",
  },
};

export function ForecastWarningBanners({ warnings }: ForecastWarningBannersProps) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2.5">
      {warnings.map((warning) => {
        const config = severityConfig[warning.severity];
        const Icon = config.icon;

        return (
          <div
            key={warning.type}
            role="alert"
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3.5 shadow-sm backdrop-blur-sm",
              config.container
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                config.iconBox
              )}
            >
              <Icon className={cn("h-4 w-4", config.iconClass)} strokeWidth={2.25} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm font-semibold leading-snug", config.titleClass)}>
                {warning.title}
              </p>
              <p className={cn("mt-0.5 text-xs leading-relaxed", config.messageClass)}>
                {warning.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
