"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/badge";
import { cn } from "@/src/shared/utils/utils";
import { CalendarView, Task } from "../types";
import {
  allActiveTasks,
  getMonthDays,
  getWeekDays,
  isSameDay,
  tasksForDate,
  toLocalDateKey,
  PRIORITY_STYLES,
} from "../utils/task.utils";

interface TasksCalendarProps {
  groups: { today: Task[]; upcoming: Task[]; overdue: Task[] };
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  locale: string;
  onDelete?: (id: number) => void;
  labels: {
    month: string;
    week: string;
    list: string;
    weekdays: string[];
    delete: string;
    moreTasks: string;
  };
}

function CalendarTaskChip({
  task,
  onDelete,
  deleteLabel,
}: {
  task: Task;
  onDelete?: (id: number) => void;
  deleteLabel: string;
}) {
  return (
    <div
      className={cn(
        "group/task flex items-center gap-0.5 rounded px-1 text-[9px]",
        PRIORITY_STYLES[task.priority].badge,
        task.overdue && "ring-1 ring-red-500/50"
      )}
      title={task.title}
    >
      <span className="min-w-0 flex-1 truncate">{task.title}</span>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="shrink-0 rounded p-0.5 opacity-0 transition-opacity hover:bg-black/10 group-hover/task:opacity-100 dark:hover:bg-white/10"
          aria-label={deleteLabel}
        >
          <X className="h-2.5 w-2.5" />
        </button>
      )}
    </div>
  );
}

export function TasksCalendar({
  groups,
  view,
  onViewChange,
  locale,
  onDelete,
  labels,
}: TasksCalendarProps) {
  const [cursor, setCursor] = useState(new Date());
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const allTasks = useMemo(() => allActiveTasks(groups), [groups]);

  const monthLabel = `${cursor.toLocaleDateString(locale, { month: "long" })} ${cursor.getFullYear()}`;

  const navigate = (delta: number) => {
    const next = new Date(cursor);
    if (view === "month") {
      next.setMonth(cursor.getMonth() + delta);
    } else {
      next.setDate(cursor.getDate() + delta * 7);
    }
    setCursor(next);
    setExpandedDay(null);
  };

  const viewButtons: { key: CalendarView; label: string }[] = [
    { key: "month", label: labels.month },
    { key: "week", label: labels.week },
    { key: "list", label: labels.list },
  ];

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[140px] text-center text-sm font-semibold capitalize">
            {monthLabel}
          </span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-1">
          {viewButtons.map(({ key, label }) => (
            <Button
              key={key}
              variant={view === key ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => {
                setExpandedDay(null);
                onViewChange(key);
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-2">
          {allTasks.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">—</p>
          ) : (
            allTasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center justify-between rounded-lg border border-border/30 px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  {task.dueDate && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(task.dueDate + "T00:00:00").toLocaleDateString(locale)}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge className={cn("text-[10px]", PRIORITY_STYLES[task.priority].badge)}>
                    {task.priority}
                  </Badge>
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => onDelete(task.id)}
                      aria-label={labels.delete}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <>
          <div className="mb-1 grid grid-cols-7 gap-1">
            {labels.weekdays.map((day) => (
              <div key={day} className="text-center text-[10px] font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {(view === "month"
              ? getMonthDays(cursor.getFullYear(), cursor.getMonth())
              : getWeekDays(cursor)
            ).map((date, i) => {
              const dayKey = toLocalDateKey(date);
              const dayTasks = tasksForDate(allTasks, date);
              const isToday = isSameDay(date, new Date());
              const isCurrentMonth = date.getMonth() === cursor.getMonth();
              const isExpanded = expandedDay === dayKey;
              const visibleTasks = isExpanded ? dayTasks : dayTasks.slice(0, 2);
              const hiddenCount = dayTasks.length - 2;

              return (
                <div
                  key={i}
                  className={cn(
                    "relative min-h-[72px] rounded-lg border border-border/20 p-1",
                    isToday && "border-primary/50 bg-primary/5",
                    !isCurrentMonth && view === "month" && "opacity-40",
                    isExpanded && "z-10 min-h-[auto] border-primary/40 bg-card shadow-md"
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] font-medium",
                      isToday && "text-primary"
                    )}
                  >
                    {date.getDate()}
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    {visibleTasks.map((task) => (
                      <CalendarTaskChip
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        deleteLabel={labels.delete}
                      />
                    ))}
                    {!isExpanded && hiddenCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpandedDay(dayKey)}
                        className="text-[9px] text-muted-foreground hover:text-foreground"
                      >
                        {labels.moreTasks.replace("{count}", String(hiddenCount))}
                      </button>
                    )}
                    {isExpanded && hiddenCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpandedDay(null)}
                        className="text-[9px] text-muted-foreground hover:text-foreground"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}
