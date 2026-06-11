import { apiClient } from "@/src/services/api";
import {
  CreateTaskPayload,
  Task,
  TaskListGroups,
  TaskPage,
  TaskSnapshot,
  TaskSuggestion,
  TaskFilters,
  UpdateTaskPayload,
} from "../types";

export const taskService = {
  async getTasks(
    page = 0,
    size = 20,
    filters: TaskFilters = {},
    sort = "dueDate,asc"
  ): Promise<TaskPage> {
    const response = await apiClient.get<TaskPage>("/tasks", {
      params: {
        page,
        size,
        sort,
        search: filters.search || undefined,
        type: filters.type || undefined,
        priority: filters.priority || undefined,
        status: filters.status || undefined,
      },
    });
    return response.data;
  },

  async getGrouped(): Promise<TaskListGroups> {
    const response = await apiClient.get<TaskListGroups>("/tasks/grouped");
    return response.data;
  },

  async getToday(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>("/tasks/today");
    return response.data;
  },

  async getUpcoming(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>("/tasks/upcoming");
    return response.data;
  },

  async getSuggestions(): Promise<TaskSuggestion[]> {
    const response = await apiClient.get<TaskSuggestion[]>("/tasks/suggestions");
    return response.data;
  },

  async getSnapshot(): Promise<TaskSnapshot> {
    const response = await apiClient.get<TaskSnapshot>("/dashboard/tasks-snapshot");
    return response.data;
  },

  async create(payload: CreateTaskPayload): Promise<Task> {
    const response = await apiClient.post<Task>("/tasks", payload);
    return response.data;
  },

  async update(id: number, payload: UpdateTaskPayload): Promise<Task> {
    const response = await apiClient.put<Task>(`/tasks/${id}`, payload);
    return response.data;
  },

  async complete(id: number): Promise<Task> {
    const response = await apiClient.put<Task>(`/tasks/${id}/complete`);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};
