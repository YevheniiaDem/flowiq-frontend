"use client";

import { motion } from "framer-motion";
import { Card } from "@/src/shared/components/ui/card";
import { Activity, Sparkles } from "lucide-react";
import { AIAccountantHealth } from "../types";
import { cn } from "@/src/shared/utils/utils";

interface AIHealthSummaryCardProps {
  health: AIAccountantHealth;
  labels: {
    title: string;
    score: string;
    excellent: string;
    good: string;
    fair: string;
    poor: string;
  };
}

const statusColors: Record<string, string> = {
  excellent: "text-emerald-500",
  good: "text-primary",
  fair: "text-amber-500",
  poor: "text-red-500",
};

const statusRing: Record<string, string> = {
  excellent: "from-emerald-500 to-teal-400",
  good: "from-primary to-accent",
  fair: "from-amber-500 to-orange-400",
  poor: "from-red-500 to-rose-400",
};

export function AIHealthSummaryCard({ health, labels }: AIHealthSummaryCardProps) {
  const statusLabel =
    health.status === "excellent"
      ? labels.excellent
      : health.status === "good"
        ? labels.good
        : health.status === "fair"
          ? labels.fair
          : labels.poor;

  return (
    <motion.div
      data-testid="ai-accountant-health"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card
        className="relative overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-6 backdrop-blur-sm"
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-accent/5" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">{labels.title}</h2>
            </div>
            <p className="text-xl font-bold tracking-tight md:text-2xl">{health.summary}</p>
            <ul className="space-y-1.5">
              {health.highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br p-[3px]",
                statusRing[health.status] ?? statusRing.good
              )}
            >
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-card">
                <span className="text-3xl font-bold">{health.score}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {labels.score}
                </span>
              </div>
            </div>
            <span className={cn("text-sm font-medium", statusColors[health.status])}>
              {statusLabel}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
