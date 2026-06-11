"use client";

import { Sparkles } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { Badge } from "@/src/shared/components/ui/badge";
import { TaskSuggestion } from "../types";
import { PRIORITY_STYLES } from "../utils/task.utils";

interface TaskSuggestionsProps {
  suggestions: TaskSuggestion[];
  title: string;
  addLabel: string;
  onAdd: (suggestion: TaskSuggestion) => void;
}

export function TaskSuggestions({ suggestions, title, addLabel, onAdd }: TaskSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {suggestions.map((suggestion) => (
          <Card
            key={suggestion.id}
            className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{suggestion.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{suggestion.description}</p>
              </div>
              <Badge className={PRIORITY_STYLES[suggestion.priority].badge}>
                {suggestion.priority}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 h-7 text-xs"
              onClick={() => onAdd(suggestion)}
            >
              {addLabel}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
