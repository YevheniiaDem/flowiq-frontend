"use client";

/**
 * Full integrations hub — reserved for Phase 2+ when BANK_INTEGRATIONS_ENABLED is true.
 * Not linked from sidebar; active route is /coming-soon/integrations.
 */
import { IntegrationCard } from "./IntegrationCard";
import { integrations } from "@/src/mock-data";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

export function IntegrationsView() {
  const { t } = usePreferences();

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("integrations.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("integrations.subtitle")}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>
    </div>
  );
}
