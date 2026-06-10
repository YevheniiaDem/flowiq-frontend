"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Target } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { TranslationKey } from "@/src/shared/i18n";
import { BusinessHealthScore } from "@/src/shared/types";

interface BusinessHealthCardProps {
  health: BusinessHealthScore;
}

const STATUS_KEYS: Record<BusinessHealthScore["status"], TranslationKey> = {
  excellent: "dashboard.health.excellent",
  good: "dashboard.health.good",
  fair: "dashboard.health.fair",
  poor: "dashboard.health.poor",
};

export function BusinessHealthCard({ health }: BusinessHealthCardProps) {
  const { t } = usePreferences();

  return (
    <Card className="relative h-full overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {t("dashboard.businessHealth")}
          </p>
          <h3 className="mt-1.5 text-2xl font-bold">
            {health.score}/{health.maxScore}
          </h3>
          <p className="mt-1 text-xs text-emerald-500">
            {t(STATUS_KEYS[health.status])}
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20">
          <Target className="h-7 w-7 text-emerald-500" />
        </div>
      </div>
    </Card>
  );
}
