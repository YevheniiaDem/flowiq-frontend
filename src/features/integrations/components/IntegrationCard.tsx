"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Plug } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Integration } from "@/src/shared/types";

interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  const { t } = usePreferences();

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">
          {integration.icon}
        </div>
        {integration.status === "available" ? (
          <Badge className="rounded-md bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
            {t("integrations.available")}
          </Badge>
        ) : (
          <Badge className="rounded-md bg-muted text-muted-foreground">
            {t("integrations.coming")}
          </Badge>
        )}
      </div>
      <h3 className="mb-1 text-sm font-semibold">{integration.name}</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        {integration.description}
      </p>
      <Button
        variant={integration.status === "available" ? "default" : "outline"}
        className="w-full rounded-lg text-xs"
        size="sm"
        disabled={integration.status !== "available"}
      >
        <Plug className="mr-2 h-3.5 w-3.5" />
        {integration.status === "available" ? t("integrations.connect") : t("integrations.coming")}
      </Button>
    </Card>
  );
}
