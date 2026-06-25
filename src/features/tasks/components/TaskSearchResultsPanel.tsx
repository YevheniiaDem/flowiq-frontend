"use client";

import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { EmptyState } from "@/src/features/onboarding";
import { Task } from "../types";
import { TaskCard } from "./TaskCard";

interface TaskSearchResultsPanelProps {
  tasks: Task[];
  locale: string;
  title: string;
  noResultsTitle: string;
  noResultsHint: string;
  clearLabel: string;
  typeLabels: Record<Task["type"], string>;
  priorityLabels: Record<Task["priority"], string>;
  statusLabels: Record<Task["status"], string>;
  onClear: () => void;
  onComplete?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function TaskSearchResultsPanel({
  tasks,
  locale,
  title,
  noResultsTitle,
  noResultsHint,
  clearLabel,
  typeLabels,
  priorityLabels,
  statusLabels,
  onClear,
  onComplete,
  onDelete,
}: TaskSearchResultsPanelProps) {
  return (
    <motion.div
      data-testid="tasks-search-results"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur-sm">
        <h2 className="mb-3 text-sm font-semibold">{title}</h2>
        {tasks.length === 0 ? (
          <EmptyState
            testId="tasks-search-empty"
            icon={ClipboardCheck}
            title={noResultsTitle}
            description={noResultsHint}
            primaryAction={{
              label: clearLabel,
              onClick: onClear,
              testId: "tasks-search-clear-btn",
            }}
          />
        ) : (
          <div className="max-h-[min(50vh,28rem)] space-y-2 overflow-y-auto pr-1">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                locale={locale}
                typeLabel={typeLabels[task.type]}
                priorityLabel={priorityLabels[task.priority]}
                statusLabel={statusLabels[task.status]}
                onComplete={onComplete}
                onDelete={onDelete}
                compact
              />
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
