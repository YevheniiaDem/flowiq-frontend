"use client";

import { Card } from "@/src/shared/components/ui/card";
import { FileUp, Hash, Clock, CheckCircle2 } from "lucide-react";
import { ImportStats } from "../types";

interface ImportDashboardCardsProps {
  stats: ImportStats;
  labels: {
    importedFiles: string;
    importedTransactions: string;
    lastImport: string;
    successRate: string;
    never: string;
  };
  locale: string;
}

const cards = [
  { key: "importedFiles" as const, icon: FileUp, color: "text-primary", bg: "bg-primary/10" },
  { key: "importedTransactions" as const, icon: Hash, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "lastImport" as const, icon: Clock, color: "text-accent", bg: "bg-accent/10" },
  { key: "successRate" as const, icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-500/10" },
];

function formatLastImport(value: string | null, locale: string, neverLabel: string) {
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

export function ImportDashboardCards({ stats, labels, locale }: ImportDashboardCardsProps) {
  const values: Record<typeof cards[number]["key"], string | number> = {
    importedFiles: stats.importedFiles,
    importedTransactions: stats.importedTransactions,
    lastImport: formatLastImport(stats.lastImport, locale, labels.never),
    successRate: `${stats.successRate}%`,
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
