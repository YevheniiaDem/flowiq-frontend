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
  { icon: typeof Info; badgeClass: string; iconClass: string }
> = {
  INFO: {
    icon: Info,
    badgeClass: "bg-blue-500/10 text-blue-500",
    iconClass: "text-blue-500",
  },
  WARNING: {
    icon: AlertTriangle,
    badgeClass: "bg-amber-500/10 text-amber-500",
    iconClass: "text-amber-500",
  },
  CRITICAL: {
    icon: XCircle,
    badgeClass: "bg-red-500/10 text-red-500",
    iconClass: "text-red-500",
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
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      config.badgeClass
                    )}
                  >
                    <Icon className={cn("h-4 w-4", config.iconClass)} />
                  </div>
                  <div className="space-y-1">
                    <Badge className={cn("rounded-md text-[10px]", config.badgeClass)}>
                      {insight.severity}
                    </Badge>
                    <p className="text-sm leading-relaxed">{insight.message}</p>
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
