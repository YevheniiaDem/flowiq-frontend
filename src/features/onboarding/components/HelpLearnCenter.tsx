"use client";

import {
  BookOpen,
  Map,
  FlaskConical,
  ListChecks,
  MessageCircle,
  Sparkles,
  Upload,
} from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useOnboarding } from "../hooks/useOnboardingContext";
import { useActivation } from "../hooks/useActivationContext";
import { trackEvent } from "../services/productAnalytics";
import type { HelpGuideId } from "../types";

interface HelpLearnCenterProps {
  compact?: boolean;
}

export function HelpLearnCenter({ compact = false }: HelpLearnCenterProps) {
  const { t } = usePreferences();
  const { startTour, startHelpGuide } = useOnboarding();
  const { enableDemo, checklistProgress } = useActivation();

  const resources: {
    icon: typeof Map;
    title: string;
    description: string;
    label: string;
    guideId?: HelpGuideId;
    action?: () => void;
  }[] = [
    {
      icon: Map,
      title: t("activation.help.productTour"),
      description: t("activation.help.productTourHint"),
      action: () => {
        trackEvent("onboarding_help_article_opened", { resource: "product_tour" });
        startTour({ fromSettings: true });
      },
      label: t("settings.startProductTour"),
    },
    {
      icon: Upload,
      title: t("activation.help.importGuide"),
      description: t("activation.help.importGuideHint"),
      guideId: "import_guide",
      label: t("activation.help.goToImports"),
    },
    {
      icon: BookOpen,
      title: t("activation.help.businessGuide"),
      description: t("activation.help.businessGuideHint"),
      guideId: "business_guide",
      label: t("activation.help.openGuide"),
    },
    {
      icon: FlaskConical,
      title: t("activation.help.demoWorkspace"),
      description: t("activation.help.demoWorkspaceHint"),
      action: () => {
        trackEvent("onboarding_demo_workspace_enabled", { source: "help_center" });
        enableDemo();
      },
      label: t("activation.help.tryDemo"),
    },
    {
      icon: ListChecks,
      title: t("activation.help.checklist"),
      description: t("activation.help.checklistHint", {
        completed: checklistProgress.completed,
        total: checklistProgress.total,
      }),
      guideId: "checklist",
      label: t("activation.help.viewChecklist"),
    },
    {
      icon: MessageCircle,
      title: t("activation.help.aiAccountant"),
      description: t("activation.help.aiAccountantHint"),
      guideId: "ai_accountant",
      label: t("activation.help.askAi"),
    },
  ];

  if (compact) {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {resources.slice(0, 4).map((resource) => (
          <HelpResourceCard
            key={resource.title}
            resource={resource}
            onGuideStart={startHelpGuide}
          />
        ))}
      </div>
    );
  }

  return (
    <Card
      data-testid="help-learn-center"
      className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
          <Sparkles className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{t("activation.help.title")}</h3>
          <p className="text-xs text-muted-foreground">{t("activation.help.subtitle")}</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {resources.map((resource) => (
          <HelpResourceCard
            key={resource.title}
            resource={resource}
            onGuideStart={startHelpGuide}
          />
        ))}
      </div>
    </Card>
  );
}

interface HelpResource {
  icon: typeof Map;
  title: string;
  description: string;
  label: string;
  guideId?: HelpGuideId;
  action?: () => void;
}

function HelpResourceCard({
  resource,
  onGuideStart,
}: {
  resource: HelpResource;
  onGuideStart: (guideId: HelpGuideId) => void;
}) {
  const Icon = resource.icon;

  const handleClick = () => {
    if (resource.guideId) {
      trackEvent("onboarding_help_article_opened", { resource: resource.guideId });
      onGuideStart(resource.guideId);
      return;
    }
    resource.action?.();
  };

  return (
    <button
      type="button"
      className="w-full text-left"
      onClick={handleClick}
      data-testid={
        resource.guideId ? `help-center-${resource.guideId}` : `help-center-${resource.title}`
      }
    >
      <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3 transition-colors hover:border-primary/30 hover:bg-background/60">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{resource.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
          <span className="mt-2 inline-block text-xs font-medium text-primary">
            {resource.label} →
          </span>
        </div>
      </div>
    </button>
  );
}
