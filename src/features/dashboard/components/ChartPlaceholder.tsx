"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

interface ChartPlaceholderProps {
  title: string;
  period: string;
}

export function ChartPlaceholder({ title, period }: ChartPlaceholderProps) {
  const { t } = usePreferences();

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Badge className="rounded-md bg-muted text-xs">{period}</Badge>
      </div>
      <div className="flex h-48 items-center justify-center text-xs text-muted-foreground">
        {t("common.chartPlaceholder")}
      </div>
    </Card>
  );
}
