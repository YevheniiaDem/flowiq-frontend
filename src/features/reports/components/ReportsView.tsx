"use client";

import { Button } from "@/src/shared/components/ui/button";
import { Download } from "lucide-react";
import { ReportCard } from "./ReportCard";
import { reports } from "@/src/mock-data";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

export function ReportsView() {
  const { t } = usePreferences();

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("reports.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("reports.subtitle")}</p>
        </div>
        <Button className="rounded-lg" size="sm">
          <Download className="mr-2 h-3.5 w-3.5" />
          {t("reports.generate")}
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, i) => (
          <ReportCard key={i} report={report} />
        ))}
      </div>
    </div>
  );
}
