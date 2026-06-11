"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/badge";
import { cn } from "@/src/shared/utils/utils";
import { Task } from "../types";
import { formatDueDate, PRIORITY_STYLES, STATUS_STYLES } from "../utils/task.utils";

interface TaskCardProps {
  task: Task;
  locale: string;
  typeLabel: string;
  priorityLabel: string;
  statusLabel: string;
  onComplete?: (id: number) => void;
  onDelete?: (id: number) => void;
  compact?: boolean;
}

export function TaskCard({
  task,
  locale,
  typeLabel,
  priorityLabel,
  statusLabel,
  onComplete,
  onDelete,
  compact = false,
}: TaskCardProps) {
  const priorityStyle = PRIORITY_STYLES[task.priority];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all",
        task.overdue && "border-red-500/30",
        compact ? "p-2.5" : "p-4"
      )}
    >
      <div className="flex items-start gap-3">
        {onComplete && task.status !== "COMPLETED" && (
          <button
            type="button"
            onClick={() => onComplete(task.id)}
            className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-emerald-500"
            aria-label="Complete"
          >
            <CheckCircle2 className="h-4 w-4" />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className={cn("font-medium", compact ? "text-xs" : "text-sm")}>{task.title}</p>
            <Badge className={cn("rounded-md text-[10px]", priorityStyle.badge)}>
              {priorityLabel}
            </Badge>
          </div>
          {task.description && !compact && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{task.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
            <span>{typeLabel}</span>
            <span>·</span>
            <span className={STATUS_STYLES[task.status]}>{statusLabel}</span>
            {task.dueDate && (
              <>
                <span>·</span>
                <span className={task.overdue ? "text-red-400" : ""}>
                  {formatDueDate(task.dueDate, locale)}
                </span>
              </>
            )}
          </div>
        </div>
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
