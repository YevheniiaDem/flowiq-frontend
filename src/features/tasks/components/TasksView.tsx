"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Plus, ClipboardCheck } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useContextualHint, usePageActivation, EmptyState, useActivation } from "@/src/features/onboarding";
import { Button } from "@/src/shared/components/ui/button";
import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "./TaskCard";
import { TaskFilters } from "./TaskFilters";
import { TaskFormDialog } from "./TaskFormDialog";
import { TaskSearchResultsPanel } from "./TaskSearchResultsPanel";
import { TasksCalendar } from "./TasksCalendar";
import { TaskSuggestions } from "./TaskSuggestions";
import { CalendarView, TaskPriority, TaskSection, TaskSuggestion, TaskType } from "../types";
import {
  allTasksFromGroups,
  filterTasksBySearch,
  tasksForSection,
} from "../utils/task.utils";

export function TasksView() {
  const { t, language } = usePreferences();
  const { markChecklistItem } = useActivation();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  const [search, setSearch] = useState("");
  const [section, setSection] = useState<TaskSection>("today");
  const [calendarView, setCalendarView] = useState<CalendarView>("month");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [suggestionInitial, setSuggestionInitial] = useState<{
    title: string;
    description?: string;
    type?: TaskType;
    priority?: TaskPriority;
    dueDate?: string;
  } | undefined>();

  const filters = useMemo(() => ({ section }), [section]);
  const isSearching = search.trim().length > 0;

  const {
    groups,
    tasks,
    suggestions,
    loading,
    error,
    createTask,
    completeTask,
    deleteTask,
  } = useTasks({ filters });

  useContextualHint("tasks", !loading && !error);
  usePageActivation("tasks");

  useEffect(() => {
    if (tasks.length > 0) {
      markChecklistItem("first_task");
    }
  }, [tasks.length, markChecklistItem]);

  const labels = useMemo(
    () => ({
      sections: {
        today: t("tasks.sections.today"),
        upcoming: t("tasks.sections.upcoming"),
        overdue: t("tasks.sections.overdue"),
        completed: t("tasks.sections.completed"),
        all: t("tasks.sections.all"),
      } as Record<TaskSection, string>,
      types: {
        TAX: t("tasks.types.tax"),
        REPORTING: t("tasks.types.reporting"),
        BUSINESS: t("tasks.types.business"),
        CUSTOM: t("tasks.types.custom"),
        SYSTEM: t("tasks.types.system"),
      } as Record<TaskType, string>,
      priorities: {
        LOW: t("tasks.priorities.low"),
        MEDIUM: t("tasks.priorities.medium"),
        HIGH: t("tasks.priorities.high"),
        CRITICAL: t("tasks.priorities.critical"),
      } as Record<TaskPriority, string>,
      statuses: {
        TODO: t("tasks.statuses.todo"),
        IN_PROGRESS: t("tasks.statuses.inProgress"),
        COMPLETED: t("tasks.statuses.completed"),
        OVERDUE: t("tasks.statuses.overdue"),
      },
      calendar: {
        month: t("tasks.calendar.month"),
        week: t("tasks.calendar.week"),
        list: t("tasks.calendar.list"),
        delete: t("tasks.delete"),
        moreTasks: t("tasks.calendar.moreTasks"),
        weekdays: [
          t("tasks.calendar.mon"),
          t("tasks.calendar.tue"),
          t("tasks.calendar.wed"),
          t("tasks.calendar.thu"),
          t("tasks.calendar.fri"),
          t("tasks.calendar.sat"),
          t("tasks.calendar.sun"),
        ],
      },
      form: {
        title: t("tasks.form.title"),
        taskTitle: t("tasks.form.taskTitle"),
        description: t("tasks.form.description"),
        dueDate: t("tasks.form.dueDate"),
        dueDatePlaceholder: t("tasks.form.dueDatePlaceholder"),
        priority: t("tasks.form.priority"),
        type: t("tasks.form.type"),
        create: t("tasks.form.create"),
        cancel: t("tasks.form.cancel"),
        priorities: {
          LOW: t("tasks.priorities.low"),
          MEDIUM: t("tasks.priorities.medium"),
          HIGH: t("tasks.priorities.high"),
          CRITICAL: t("tasks.priorities.critical"),
        } as Record<TaskPriority, string>,
        types: {
          TAX: t("tasks.types.tax"),
          REPORTING: t("tasks.types.reporting"),
          BUSINESS: t("tasks.types.business"),
          CUSTOM: t("tasks.types.custom"),
          SYSTEM: t("tasks.types.system"),
        } as Record<TaskType, string>,
      },
    }),
    [t]
  );

  const searchResults = useMemo(() => {
    if (!groups || !isSearching) return [];
    return filterTasksBySearch(allTasksFromGroups(groups), search);
  }, [groups, isSearching, search]);

  const sectionTasks = useMemo(() => {
    if (!groups) return [];
    if (section === "all") {
      return tasks;
    }
    return tasksForSection(groups, section);
  }, [groups, section, tasks]);

  const handleAddSuggestion = (suggestion: TaskSuggestion) => {
    setSuggestionInitial({
      title: suggestion.title,
      description: suggestion.description,
      type: suggestion.type,
      priority: suggestion.priority,
      dueDate: suggestion.suggestedDueDate,
    });
    setDialogOpen(true);
  };

  if (loading && !groups) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !groups) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 p-4 text-center">
        <p className="text-sm text-destructive">{error || t("tasks.loadError")}</p>
        <p className="text-xs text-muted-foreground">{t("tasks.backendHint")}</p>
      </div>
    );
  }

  const calendarGroups = {
    today: groups.today,
    upcoming: groups.upcoming,
    overdue: groups.overdue,
  };

  return (
    <motion.div
      data-testid="tasks-page"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("tasks.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("tasks.subtitle")}</p>
        </div>
        <Button data-testid="tasks-add-btn" size="sm" onClick={() => { setSuggestionInitial(undefined); setDialogOpen(true); }}>
          <Plus className="mr-1.5 h-4 w-4" />
          {t("tasks.addTask")}
        </Button>
      </div>

      <TaskFilters
        search={search}
        section={section}
        searchPlaceholder={t("tasks.search.placeholder")}
        clearSearchLabel={t("tasks.search.clear")}
        isSearching={isSearching}
        searchHint={isSearching ? t("tasks.search.hint") : undefined}
        searchResults={
          isSearching ? (
            <AnimatePresence mode="wait">
              <TaskSearchResultsPanel
                tasks={searchResults}
                locale={locale}
                title={t("tasks.search.results", { count: searchResults.length })}
                noResultsTitle={t("tasks.search.noResults")}
                noResultsHint={t("tasks.search.noResultsHint", { query: search.trim() })}
                clearLabel={t("tasks.search.clear")}
                typeLabels={labels.types}
                priorityLabels={labels.priorities}
                statusLabels={labels.statuses}
                onClear={() => setSearch("")}
                onComplete={completeTask}
                onDelete={deleteTask}
              />
            </AnimatePresence>
          ) : undefined
        }
        onSearchChange={setSearch}
        onSearchSubmit={() => {}}
        onSectionChange={setSection}
        sectionLabels={labels.sections}
      />

      {!isSearching && (
        <>
          <TasksCalendar
            groups={calendarGroups}
            view={calendarView}
            onViewChange={setCalendarView}
            locale={locale}
            onDelete={deleteTask}
            labels={labels.calendar}
          />

          <section data-testid="tasks-results" className="space-y-3">
            <h2 className="text-lg font-semibold">{labels.sections[section]}</h2>
            {sectionTasks.length === 0 ? (
              <EmptyState
                testId="tasks-empty-state"
                icon={ClipboardCheck}
                title={t("activation.empty.tasks.title")}
                description={t("activation.empty.tasks.description")}
                primaryAction={{
                  label: t("activation.empty.tasks.addCta"),
                  onClick: () => {
                    setSuggestionInitial(undefined);
                    setDialogOpen(true);
                  },
                  testId: "tasks-empty-add-btn",
                }}
              />
            ) : (
              <div className="space-y-2">
                {sectionTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    locale={locale}
                    typeLabel={labels.types[task.type]}
                    priorityLabel={labels.priorities[task.priority]}
                    statusLabel={labels.statuses[task.status]}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}
          </section>

          <TaskSuggestions
            suggestions={suggestions}
            title={t("tasks.suggestions")}
            addLabel={t("tasks.addSuggestion")}
            onAdd={handleAddSuggestion}
          />
        </>
      )}

      <TaskFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSuggestionInitial(undefined);
        }}
        onSubmit={async (payload) => { await createTask(payload); }}
        labels={labels.form}
        initial={suggestionInitial}
      />
    </motion.div>
  );
}
