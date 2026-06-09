"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { FileText, Calendar, Download } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Report } from "@/src/shared/types";

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  const { t } = usePreferences();

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mb-1 text-sm font-semibold">{report.title}</h3>
      <p className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        {report.date}
      </p>
      <Button variant="outline" size="sm" className="w-full rounded-lg text-xs">
        <Download className="mr-2 h-3 w-3" />
        {t("reports.download")}
      </Button>
    </Card>
  );
}
