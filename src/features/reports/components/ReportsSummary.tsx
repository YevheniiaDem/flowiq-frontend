"use client";

import { Card } from "@/src/shared/components/ui/card";
import { BarChart3, Calendar, Clock, FileText } from "lucide-react";
import { ReportDashboardStats, ReportType } from "../types";

interface ReportsSummaryProps {
  stats: ReportDashboardStats;
  labels: {
    generatedReports: string;
    reportsThisMonth: string;
    lastGenerated: string;
    mostUsedType: string;
    never: string;
    types: Record<ReportType, string>;
  };
  locale: string;
}

const cards = [
  { key: "generatedReports" as const, icon: FileText, color: "text-primary", bg: "bg-primary/10" },
  { key: "reportsThisMonth" as const, icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "lastGenerated" as const, icon: Clock, color: "text-accent", bg: "bg-accent/10" },
  { key: "mostUsedType" as const, icon: BarChart3, color: "text-blue-500", bg: "bg-blue-500/10" },
];

function formatLastGenerated(value: string | null, locale: string, neverLabel: string) {
  if (!value) {
    return neverLabel;
  }
  return new Date(value).toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ReportsSummary({ stats, labels, locale }: ReportsSummaryProps) {
  const values: Record<typeof cards[number]["key"], string | number> = {
    generatedReports: stats.generatedReports,
    reportsThisMonth: stats.reportsThisMonth,
    lastGenerated: formatLastGenerated(stats.lastGeneratedAt, locale, labels.never),
    mostUsedType: stats.mostUsedReportType
      ? labels.types[stats.mostUsedReportType]
      : labels.never,
  };

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, icon: Icon, color, bg }) => (
        <Card
          key={key}
          className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground">{labels[key]}</p>
              <h3 className="mt-1.5 text-xl font-bold">{values[key]}</h3>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
