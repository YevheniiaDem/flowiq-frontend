"use client";

import Link from "next/link";
import { Clock, Upload } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

export function IntegrationsComingSoonView() {
  const { t } = usePreferences();

  return (
    <div data-testid="integrations-coming-soon" className="mx-auto max-w-2xl space-y-6 p-4 pt-12">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Clock className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{t("comingSoon.integrations.title")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("comingSoon.integrations.message")}</p>
      </div>

      <Card className="rounded-xl border-border/50 bg-card/50 p-6">
        <p className="text-sm text-muted-foreground">{t("comingSoon.integrations.hint")}</p>
        <Button asChild className="mt-4" variant="default">
          <Link href="/imports">
            <Upload className="mr-2 h-4 w-4" />
            {t("comingSoon.integrations.goToImports")}
          </Link>
        </Button>
      </Card>
    </div>
  );
}
