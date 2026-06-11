"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  PRIORITY_STYLES,
} from "../utils/task.utils";

interface TasksCalendarProps {
  groups: { today: Task[]; upcoming: Task[]; overdue: Task[] };
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  locale: string;
  labels: {
    month: string;
    week: string;
    list: string;
    weekdays: string[];
  };
}

export function TasksCalendar({
  groups,
  view,
  onViewChange,
  locale,
  labels,
}: TasksCalendarProps) {
  const [cursor, setCursor] = useState(new Date());
  const allTasks = useMemo(() => allActiveTasks(groups), [groups]);

  const monthLabel = cursor.toLocaleDateString(locale, { month: "long", year: "numeric" });

  const navigate = (delta: number) => {
    const next = new Date(cursor);
    if (view === "month") {
      next.setMonth(cursor.getMonth() + delta);
    } else {
      next.setDate(cursor.getDate() + delta * 7);
    }
    setCursor(next);
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
              onClick={() => onViewChange(key)}
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
                className="flex items-center justify-between rounded-lg border border-border/30 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{task.title}</p>
                  {task.dueDate && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(task.dueDate + "T00:00:00").toLocaleDateString(locale)}
                    </p>
                  )}
                </div>
                <Badge className={cn("text-[10px]", PRIORITY_STYLES[task.priority].badge)}>
                  {task.priority}
                </Badge>
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
              const dayTasks = tasksForDate(allTasks, date);
              const isToday = isSameDay(date, new Date());
              const isCurrentMonth = date.getMonth() === cursor.getMonth();

              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-[72px] rounded-lg border border-border/20 p-1",
                    isToday && "border-primary/50 bg-primary/5",
                    !isCurrentMonth && view === "month" && "opacity-40"
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
                    {dayTasks.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "truncate rounded px-1 text-[9px]",
                          PRIORITY_STYLES[task.priority].badge,
                          task.overdue && "ring-1 ring-red-500/50"
                        )}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <span className="text-[9px] text-muted-foreground">
                        +{dayTasks.length - 2}
                      </span>
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
