"use client";

import { Card } from "@/src/shared/components/ui/card";
import { AlertTriangle, Bell, Calendar } from "lucide-react";
import { NotificationSummary } from "../types";

interface NotificationStatsProps {
  summary: NotificationSummary;
  labels: {
    total: string;
    unread: string;
    critical: string;
    thisMonth: string;
  };
}

const cards = [
  { key: "total" as const, icon: Bell, color: "text-primary", bg: "bg-primary/10" },
  { key: "unread" as const, icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" },
  { key: "critical" as const, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
  { key: "thisMonth" as const, icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export function NotificationStats({ summary, labels }: NotificationStatsProps) {
  const values: Record<typeof cards[number]["key"], number> = {
    total: summary.total,
    unread: summary.unread,
    critical: summary.critical,
    thisMonth: summary.thisMonth,
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
