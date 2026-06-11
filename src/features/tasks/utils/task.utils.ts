import { Task, TaskPriority, TaskStatus } from "../types";

export const PRIORITY_STYLES: Record<TaskPriority, { badge: string; dot: string }> = {
  LOW: { badge: "bg-slate-500/10 text-slate-400", dot: "bg-slate-400" },
  MEDIUM: { badge: "bg-blue-500/10 text-blue-400", dot: "bg-blue-400" },
  HIGH: { badge: "bg-amber-500/10 text-amber-400", dot: "bg-amber-400" },
  CRITICAL: { badge: "bg-red-500/10 text-red-400", dot: "bg-red-400" },
};

export const STATUS_STYLES: Record<TaskStatus, string> = {
  TODO: "text-muted-foreground",
  IN_PROGRESS: "text-blue-400",
  COMPLETED: "text-emerald-400",
  OVERDUE: "text-red-400",
};

export function formatDueDate(date: string | null, locale: string): string {
  if (!date) return "";
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getMonthDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const startDay = first.getDay() === 0 ? 6 : first.getDay() - 1;
  const days: Date[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1];
    days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
  }
  return days;
}

export function getWeekDays(reference: Date): Date[] {
  const day = reference.getDay() === 0 ? 6 : reference.getDay() - 1;
  const monday = new Date(reference);
  monday.setDate(reference.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export function tasksForDate(tasks: Task[], date: Date): Task[] {
  const iso = date.toISOString().slice(0, 10);
  return tasks.filter((t) => t.dueDate === iso);
}

export function allActiveTasks(groups: {
  today: Task[];
  upcoming: Task[];
  overdue: Task[];
}): Task[] {
  return [...groups.overdue, ...groups.today, ...groups.upcoming];
}
