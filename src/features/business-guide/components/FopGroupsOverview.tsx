"use client";

import { FopGroupSummary } from "../types";
import { FopGroupCard } from "./FopGroupCard";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

interface FopGroupsOverviewProps {
  groups: FopGroupSummary[];
}

export function FopGroupsOverview({ groups }: FopGroupsOverviewProps) {
  const { t } = usePreferences();

  return (
    <section>
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{t("businessGuide.groups.title")}</h2>
        <p className="text-xs text-muted-foreground">
          {t("businessGuide.groups.subtitle")}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {groups.map((group, index) => (
          <FopGroupCard key={group.id} group={group} index={index} />
        ))}
      </div>
    </section>
  );
}
