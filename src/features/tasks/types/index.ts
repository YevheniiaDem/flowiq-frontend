export type TaskType = "TAX" | "REPORTING" | "BUSINESS" | "CUSTOM" | "SYSTEM";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
export type CalendarView = "month" | "week" | "list";
export type TaskSection = "today" | "upcoming" | "overdue" | "completed" | "all";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  overdue: boolean;
}

export interface TaskPage {
  content: Task[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface TaskListGroups {
  today: Task[];
  upcoming: Task[];
  overdue: Task[];
  completed: Task[];
}

export interface TaskSuggestion {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  suggestedDueDate: string;
}

export interface TaskSnapshot {
  todayCount: number;
  upcomingCount: number;
  overdueCount: number;
  todayTasks: Task[];
  upcomingDeadlines: Task[];
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  type?: TaskType;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  type?: TaskType;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
}

export interface TaskFilters {
  search?: string;
  type?: TaskType;
  priority?: TaskPriority;
  status?: TaskStatus;
  section?: TaskSection;
}
