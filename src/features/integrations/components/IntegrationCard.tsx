"use client";

import Image from "next/image";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Plug } from "lucide-react";
import { cn } from "@/src/shared/utils/utils";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { TranslationKey } from "@/src/shared/i18n";
import { Integration } from "@/src/shared/types";

interface IntegrationCardProps {
  integration: Integration;
}

const NAME_KEYS: Record<string, TranslationKey> = {
  monobank: "integrations.items.monobank.name",
  privatbank: "integrations.items.privatbank.name",
  "google-sheets": "integrations.items.googleSheets.name",
  shopify: "integrations.items.shopify.name",
  telegram: "integrations.items.telegram.name",
  rozetka: "integrations.items.rozetka.name",
};

const DESCRIPTION_KEYS: Record<string, TranslationKey> = {
  monobank: "integrations.items.monobank.description",
  privatbank: "integrations.items.privatbank.description",
  "google-sheets": "integrations.items.googleSheets.description",
  shopify: "integrations.items.shopify.description",
  telegram: "integrations.items.telegram.description",
  rozetka: "integrations.items.rozetka.description",
};

export function IntegrationCard({ integration }: IntegrationCardProps) {
  const { t } = usePreferences();
  const nameKey = NAME_KEYS[integration.id];
  const descriptionKey = DESCRIPTION_KEYS[integration.id];

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-start justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg",
            integration.logo ? integration.logoClassName : "bg-primary/10 text-xl"
          )}
        >
          {integration.logo ? (
            <Image
              src={integration.logo}
              alt={integration.name}
              width={72}
              height={48}
              className="h-full w-full object-contain"
            />
          ) : (
            <span>{integration.icon}</span>
          )}
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
      <h3 className="mb-1 text-sm font-semibold">
        {nameKey ? t(nameKey) : integration.name}
      </h3>
      <p className="mb-3 text-xs text-muted-foreground">
        {descriptionKey ? t(descriptionKey) : integration.description}
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
