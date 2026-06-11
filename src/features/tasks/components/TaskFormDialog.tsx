"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { CreateTaskPayload, TaskPriority, TaskType } from "../types";

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: CreateTaskPayload) => Promise<void>;
  labels: {
    title: string;
    taskTitle: string;
    description: string;
    dueDate: string;
    priority: string;
    type: string;
    create: string;
    cancel: string;
    priorities: Record<TaskPriority, string>;
    types: Record<TaskType, string>;
  };
  initial?: Partial<CreateTaskPayload>;
}

export function TaskFormDialog({
  open,
  onOpenChange,
  onSubmit,
  labels,
  initial,
}: TaskFormDialogProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? "");
  const [priority, setPriority] = useState<TaskPriority>(initial?.priority ?? "MEDIUM");
  const [type, setType] = useState<TaskType>(initial?.type ?? "CUSTOM");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate || undefined,
        priority,
        type,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{labels.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">{labels.taskTitle}</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">{labels.description}</label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">{labels.dueDate}</label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">{labels.priority}</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
              >
                {(Object.keys(labels.priorities) as TaskPriority[]).map((p) => (
                  <option key={p} value={p}>
                    {labels.priorities[p]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">{labels.type}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TaskType)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            >
              {(Object.keys(labels.types) as TaskType[]).map((t) => (
                <option key={t} value={t}>
                  {labels.types[t]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {labels.cancel}
            </Button>
            <Button type="submit" disabled={submitting}>
              {labels.create}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
