import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
} from "lucide-react";
import { AIInsight } from "@/src/shared/types";

interface AIInsightCardProps {
  insight: AIInsight;
}

const iconMap = {
  "alert-triangle": AlertTriangle,
  "check-circle-2": CheckCircle2,
  info: Info,
};

const colorMap = {
  critical: {
    badge: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    icon: "bg-red-500/10 text-red-500",
  },
  warning: {
    badge: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    icon: "bg-yellow-500/10 text-yellow-500",
  },
  success: {
    badge: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
    icon: "bg-emerald-500/10 text-emerald-500",
  },
  info: {
    badge: "bg-primary/10 text-primary hover:bg-primary/20",
    icon: "bg-primary/10 text-primary",
  },
};

export function AIInsightCard({ insight }: AIInsightCardProps) {
  const Icon = iconMap[insight.icon as keyof typeof iconMap] || Info;
  const colors = colorMap[insight.type];

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-start gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.icon}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <Badge className={`mb-1 rounded-md ${colors.badge}`}>
            {insight.type}
          </Badge>
        </div>
      </div>
      <h3 className="mb-1 text-sm font-semibold">{insight.title}</h3>
      <p className="text-xs text-muted-foreground">{insight.description}</p>
      <div className="mt-3 text-xs text-muted-foreground">
        {insight.timestamp}
      </div>
    </Card>
  );
}
