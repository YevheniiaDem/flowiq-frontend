"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { AlertTriangle, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { AIRecommendation, RecommendationType } from "../types";
import { cn } from "@/src/shared/utils/utils";

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  typeLabels: Record<RecommendationType, string>;
}

const typeConfig: Record<
  RecommendationType,
  { icon: typeof AlertTriangle; badge: string; border: string }
> = {
  CRITICAL: {
    icon: XCircle,
    badge: "bg-red-500/10 text-red-500",
    border: "border-red-500/20",
  },
  WARNING: {
    icon: AlertTriangle,
    badge: "bg-amber-500/10 text-amber-500",
    border: "border-amber-500/20",
  },
  OPPORTUNITY: {
    icon: Lightbulb,
    badge: "bg-blue-500/10 text-blue-500",
    border: "border-blue-500/20",
  },
  SUCCESS: {
    icon: CheckCircle2,
    badge: "bg-emerald-500/10 text-emerald-500",
    border: "border-emerald-500/20",
  },
};

export function AIRecommendationCard({ recommendation, typeLabels }: AIRecommendationCardProps) {
  const config = typeConfig[recommendation.type] ?? typeConfig.WARNING;
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "rounded-xl border bg-card/50 p-4 backdrop-blur-sm transition-colors hover:bg-card/70",
        config.border
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4" />
        </div>
        <Badge variant="secondary" className={cn("text-[10px] font-medium", config.badge)}>
          {typeLabels[recommendation.type]}
        </Badge>
      </div>
      <h3 className="mb-1 text-sm font-semibold">{recommendation.title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">{recommendation.description}</p>
    </Card>
  );
}
