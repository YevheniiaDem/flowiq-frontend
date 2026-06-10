"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Info, ShieldAlert } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { SmartRecommendation } from "../types";

interface RecommendationCardProps {
  recommendation: SmartRecommendation;
  index: number;
}

const SEVERITY_STYLES = {
  info: {
    icon: Info,
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
    iconColor: "text-blue-500",
    accent: "from-blue-500/10 to-transparent",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    iconColor: "text-amber-500",
    accent: "from-amber-500/10 to-transparent",
  },
  critical: {
    icon: ShieldAlert,
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    iconColor: "text-red-500",
    accent: "from-red-500/10 to-transparent",
  },
};

export function RecommendationCard({
  recommendation,
  index,
}: RecommendationCardProps) {
  const style = SEVERITY_STYLES[recommendation.severity];
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * index }}
    >
      <Card
        className={`relative overflow-hidden rounded-xl border ${style.border} ${style.bg} p-4 backdrop-blur-sm`}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${style.accent}`}
        />
        <div className="relative flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.bg}`}
          >
            <Icon className={`h-4 w-4 ${style.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold">{recommendation.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {recommendation.message}
            </p>
            {recommendation.actionLabel && recommendation.actionHref && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="mt-2 h-7 rounded-md px-2 text-xs"
              >
                <Link href={recommendation.actionHref}>
                  {recommendation.actionLabel}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
