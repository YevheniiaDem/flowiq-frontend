"use client";

import { Badge } from "@/src/shared/components/ui/badge";
import { ReportStatus } from "../types";
import { cn } from "@/src/shared/utils/utils";

interface ReportStatusBadgeProps {
  status: ReportStatus;
  label: string;
}

const statusStyles: Record<ReportStatus, string> = {
  PENDING: "bg-muted text-muted-foreground",
  GENERATING: "bg-blue-500/10 text-blue-500",
  COMPLETED: "bg-emerald-500/10 text-emerald-500",
  FAILED: "bg-red-500/10 text-red-500",
};

export function ReportStatusBadge({ status, label }: ReportStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("font-medium", statusStyles[status])}>
      {label}
    </Badge>
  );
}
