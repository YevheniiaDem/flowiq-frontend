import { Task, TaskListGroups, TaskPriority, TaskSection, TaskStatus } from "../types";

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

/** ISO `yyyy-mm-dd` → display `dd/mm/yyyy` */
export function isoToDisplayDate(iso: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** Parse `dd/mm/yyyy` (also `.` or `-` separators) → ISO `yyyy-mm-dd` */
export function parseDisplayDateToIso(display: string): string | null {
  const normalized = display.trim().replace(/[.\-]/g, "/");
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);
  if (!day || !month || !year || month < 1 || month > 12 || day < 1 || day > 31 || year < 1000) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return toLocalDateKey(date);
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

export function toLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function tasksForDate(tasks: Task[], date: Date): Task[] {
  const iso = toLocalDateKey(date);
  return tasks.filter((t) => t.dueDate === iso);
}

export function allActiveTasks(groups: {
  today: Task[];
  upcoming: Task[];
  overdue: Task[];
}): Task[] {
  return [...groups.overdue, ...groups.today, ...groups.upcoming];
}

export function taskMatchesSearch(task: Task, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    task.title.toLowerCase().includes(q) ||
    (task.description?.toLowerCase().includes(q) ?? false)
  );
}

export function filterTasksBySearch(tasks: Task[], query: string): Task[] {
  if (!query.trim()) return tasks;
  return tasks.filter((task) => taskMatchesSearch(task, query));
}

export function allTasksFromGroups(groups: TaskListGroups): Task[] {
  return [...groups.overdue, ...groups.today, ...groups.upcoming, ...groups.completed];
}

export function tasksForSection(groups: TaskListGroups, section: TaskSection): Task[] {
  if (section === "all") return allTasksFromGroups(groups);
  return groups[section] ?? [];
}

export function filterActiveGroupsBySearch(
  groups: { today: Task[]; upcoming: Task[]; overdue: Task[] },
  query: string
) {
  if (!query.trim()) return groups;
  return {
    today: filterTasksBySearch(groups.today, query),
    upcoming: filterTasksBySearch(groups.upcoming, query),
    overdue: filterTasksBySearch(groups.overdue, query),
  };
}
