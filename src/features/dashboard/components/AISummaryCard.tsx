"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Sparkles } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

interface AISummaryCardProps {
  text: string;
  badge: string;
}

export function AISummaryCard({ text, badge }: AISummaryCardProps) {
  const { t } = usePreferences();

  return (
    <Card className="relative overflow-hidden rounded-xl border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{t("dashboard.aiSummary")}</h3>
            <Badge className="rounded-md bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
              {badge}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{text}</p>
        </div>
      </div>
    </Card>
  );
}
