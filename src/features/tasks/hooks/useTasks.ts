"use client";

import { useCallback, useEffect, useState } from "react";
import { taskService } from "../services/task.service";
import {
  CreateTaskPayload,
  Task,
  TaskFilters,
  TaskListGroups,
  TaskSuggestion,
  UpdateTaskPayload,
} from "../types";

interface UseTasksOptions {
  filters?: TaskFilters;
  page?: number;
  size?: number;
}

export function useTasks(options: UseTasksOptions = {}) {
  const { filters = {}, page = 0, size = 20 } = options;

  const [groups, setGroups] = useState<TaskListGroups | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [groupedData, suggestionsData] = await Promise.all([
        taskService.getGrouped(),
        taskService.getSuggestions(),
      ]);
      setGroups(groupedData);
      setSuggestions(suggestionsData);

      if (filters.section && filters.section !== "all") {
        const sectionTasks = groupedData[filters.section as keyof TaskListGroups] ?? [];
        setTasks(sectionTasks);
        setTotalElements(sectionTasks.length);
        setTotalPages(1);
      } else {
        const pageData = await taskService.getTasks(page, size, filters);
        setTasks(pageData.content);
        setTotalPages(pageData.totalPages);
        setTotalElements(pageData.totalElements);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [filters, page, size]);

  useEffect(() => {
    load();
  }, [load]);

  const createTask = useCallback(async (payload: CreateTaskPayload) => {
    const created = await taskService.create(payload);
    await load();
    return created;
  }, [load]);

  const updateTask = useCallback(async (id: number, payload: UpdateTaskPayload) => {
    const updated = await taskService.update(id, payload);
    await load();
    return updated;
  }, [load]);

  const completeTask = useCallback(async (id: number) => {
    const completed = await taskService.complete(id);
    await load();
    return completed;
  }, [load]);

  const deleteTask = useCallback(async (id: number) => {
    await taskService.delete(id);
    await load();
  }, [load]);

  return {
    groups,
    tasks,
    suggestions,
    totalPages,
    totalElements,
    loading,
    error,
    reload: load,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
  };
}
