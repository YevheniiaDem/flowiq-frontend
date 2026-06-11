"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Loader2 } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { taskService } from "../services/task.service";
import { TaskSnapshot } from "../types";
import { formatDueDate } from "../utils/task.utils";

export function TasksDashboardWidget() {
  const { t, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";
  const [snapshot, setSnapshot] = useState<TaskSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await taskService.getSnapshot();
      setSnapshot(data);
    } catch {
      setSnapshot(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <Card className="flex h-32 items-center justify-center rounded-xl border-border/50 bg-card/50">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </Card>
    );
  }

  if (!snapshot) return null;

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t("dashboard.tasksSnapshot.title")}</h3>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.tasksSnapshot.subtitle")}
            </p>
          </div>
        </div>
        <Link
          href="/tasks"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          {t("dashboard.tasksSnapshot.viewAll")}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mb-3 flex gap-2">
        <Badge className="rounded-md bg-primary/10 text-primary">
          {t("dashboard.tasksSnapshot.today")}: {snapshot.todayCount}
        </Badge>
        {snapshot.overdueCount > 0 && (
          <Badge className="rounded-md bg-red-500/10 text-red-400">
            {t("dashboard.tasksSnapshot.overdue")}: {snapshot.overdueCount}
          </Badge>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            {t("dashboard.tasksSnapshot.todayTasks")}
          </p>
          <div className="space-y-1.5">
            {snapshot.todayTasks.length === 0 ? (
              <p className="text-xs text-muted-foreground">—</p>
            ) : (
              snapshot.todayTasks.map((task) => (
                <p key={task.id} className="truncate text-xs font-medium">
                  {task.title}
                </p>
              ))
            )}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            {t("dashboard.tasksSnapshot.upcomingDeadlines")}
          </p>
          <div className="space-y-1.5">
            {snapshot.upcomingDeadlines.length === 0 ? (
              <p className="text-xs text-muted-foreground">—</p>
            ) : (
              snapshot.upcomingDeadlines.map((task) => (
                <div key={task.id} className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-medium">{task.title}</p>
                  {task.dueDate && (
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {formatDueDate(task.dueDate, locale)}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
