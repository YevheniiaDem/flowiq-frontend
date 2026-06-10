"use client";

import { TaxType } from "../types";
import { TaxCard } from "./TaxCard";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

interface TaxesSectionProps {
  taxes: TaxType[];
}

export function TaxesSection({ taxes }: TaxesSectionProps) {
  const { t } = usePreferences();

  return (
    <section id="taxes">
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{t("businessGuide.taxes.title")}</h2>
        <p className="text-xs text-muted-foreground">
          {t("businessGuide.taxes.subtitle")}
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {taxes.map((tax, index) => (
          <TaxCard key={tax.id} tax={tax} index={index} />
        ))}
      </div>
    </section>
  );
}
