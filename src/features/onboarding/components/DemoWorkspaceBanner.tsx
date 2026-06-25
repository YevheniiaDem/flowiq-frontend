"use client";

import { FlaskConical, X } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useActivation } from "../hooks/useActivationContext";

export function DemoWorkspaceBanner() {
  const { t } = usePreferences();
  const { isDemoMode, disableDemo } = useActivation();

  if (!isDemoMode) return null;

  return (
    <div
      data-testid="demo-workspace-banner"
      className="flex items-center justify-between gap-3 border-b border-amber-500/30 bg-amber-500/10 px-4 py-2"
    >
      <div className="flex items-center gap-2 text-xs">
        <FlaskConical className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <span className="font-medium text-amber-800 dark:text-amber-200">
          {t("activation.demo.banner")}
        </span>
        <span className="hidden text-amber-700/80 dark:text-amber-300/80 sm:inline">
          {t("activation.demo.bannerHint")}
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 gap-1 text-xs text-amber-800 hover:bg-amber-500/20 dark:text-amber-200"
        onClick={disableDemo}
      >
        <X className="h-3 w-3" />
        {t("activation.demo.exit")}
      </Button>
    </div>
  );
}
