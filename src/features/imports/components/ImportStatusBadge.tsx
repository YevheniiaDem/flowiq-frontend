"use client";

import { Badge } from "@/src/shared/components/ui/badge";
import { ImportStatus } from "../types";
import { cn } from "@/src/shared/utils/utils";

interface ImportStatusBadgeProps {
  status: ImportStatus;
  label: string;
}

const statusStyles: Record<ImportStatus, string> = {
  PENDING: "bg-muted text-muted-foreground",
  PROCESSING: "bg-blue-500/10 text-blue-500",
  COMPLETED: "bg-emerald-500/10 text-emerald-500",
  PARTIAL: "bg-amber-500/10 text-amber-500",
  FAILED: "bg-red-500/10 text-red-500",
};

export function ImportStatusBadge({ status, label }: ImportStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("font-medium", statusStyles[status])}>
      {label}
    </Badge>
  );
}
