"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info, XCircle } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { cn } from "@/src/shared/utils/utils";
import { ForecastInsight, ForecastSeverity } from "../types";

interface ForecastInsightsProps {
  insights: ForecastInsight[];
  title: string;
}

const severityConfig: Record<
  ForecastSeverity,
  { icon: typeof Info; badgeClass: string; iconBoxClass: string; iconClass: string }
> = {
  INFO: {
    icon: Info,
    badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    iconBoxClass: "bg-blue-500/12 ring-1 ring-blue-500/20",
    iconClass: "text-blue-600 dark:text-blue-400",
  },
  WARNING: {
    icon: AlertTriangle,
    badgeClass: "bg-amber-500/10 text-amber-800 dark:text-amber-400",
    iconBoxClass: "bg-amber-500/12 ring-1 ring-amber-500/20",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  CRITICAL: {
    icon: XCircle,
    badgeClass: "bg-red-500/10 text-red-700 dark:text-red-400",
    iconBoxClass: "bg-red-500/12 ring-1 ring-red-500/20",
    iconClass: "text-red-600 dark:text-red-400",
  },
};

export function ForecastInsights({ insights, title }: ForecastInsightsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {insights.map((insight, index) => {
          const config = severityConfig[insight.severity];
          const Icon = config.icon;

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-lg",
                      config.iconBoxClass
                    )}
                  >
                    <Icon className={cn("h-4 w-4", config.iconClass)} strokeWidth={2.25} />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <Badge className={cn("rounded-md text-[10px] font-medium", config.badgeClass)}>
                      {insight.severity}
                    </Badge>
                    <p className="text-sm leading-relaxed text-foreground/90">{insight.message}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
