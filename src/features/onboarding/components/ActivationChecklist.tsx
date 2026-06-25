"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, X, ListChecks } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useOnboarding } from "../hooks/useOnboardingContext";
import { useActivation } from "../hooks/useActivationContext";
import { CHECKLIST_ITEMS } from "../config/checklistItems";
import { activationStorage } from "../services/activationStorage";
import { trackEvent } from "../services/productAnalytics";
import type { ChecklistItemId } from "../types/activation";
import { cn } from "@/src/shared/utils/utils";

export function ActivationChecklist() {
  const router = useRouter();
  const { t } = usePreferences();
  const { startTour } = useOnboarding();
  const { checklistState, markChecklistItem, refreshChecklist } = useActivation();

  if (activationStorage.isChecklistDismissed() || checklistState.isComplete) {
    return null;
  }

  const completedCount = CHECKLIST_ITEMS.filter((item) =>
    checklistState.completed[item.id]
  ).length;
  const progress = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  const handleItemAction = (id: ChecklistItemId, href: string) => {
    if (id === "product_tour") {
      startTour();
      return;
    }
    router.push(href);
    trackEvent("onboarding_empty_state_cta_clicked", { target: id });
  };

  const handleDismiss = () => {
    activationStorage.dismissChecklist();
    refreshChecklist();
  };

  return (
    <Card
      data-testid="activation-checklist"
      className="rounded-xl border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4 backdrop-blur-sm"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <ListChecks className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t("activation.checklist.title")}</h3>
            <p className="text-xs text-muted-foreground">
              {t("activation.checklist.subtitle", {
                completed: completedCount,
                total: CHECKLIST_ITEMS.length,
              })}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleDismiss}
          aria-label={t("activation.checklist.dismiss")}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-4">
        <div className="mb-1 flex justify-between text-[10px] font-medium text-muted-foreground">
          <span>{t("activation.checklist.progress")}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {CHECKLIST_ITEMS.map((item) => {
          const done = checklistState.completed[item.id];
          return (
            <li
              key={item.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                done
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-border/50 bg-background/50"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  done ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-xs font-medium", done && "text-muted-foreground line-through")}>
                  {t(item.titleKey as never)}
                </p>
                {!done && (
                  <p className="text-[10px] text-muted-foreground">
                    {t(item.descriptionKey as never)}
                  </p>
                )}
              </div>
              {!done && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 shrink-0 gap-1 px-2 text-xs"
                  onClick={() => handleItemAction(item.id, item.href)}
                >
                  {t(item.ctaKey as never)}
                  <ChevronRight className="h-3 w-3" />
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
