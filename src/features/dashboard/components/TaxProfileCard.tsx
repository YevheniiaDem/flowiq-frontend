"use client";

import Link from "next/link";
import { Bot, BookOpen, Receipt, Wand2 } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { TranslationKey } from "@/src/shared/i18n";
import { TaxProfile, TaxStatus } from "@/src/shared/types";

interface TaxProfileCardProps {
  profile: TaxProfile;
}

const STATUS_CONFIG: Record<
  TaxStatus,
  { labelKey: TranslationKey; badgeClass: string; barClass: string }
> = {
  healthy: {
    labelKey: "dashboard.taxProfile.status.healthy",
    badgeClass: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
    barClass: "bg-emerald-500",
  },
  attention: {
    labelKey: "dashboard.taxProfile.status.attention",
    badgeClass: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
    barClass: "bg-amber-500",
  },
  critical: {
    labelKey: "dashboard.taxProfile.status.critical",
    badgeClass: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    barClass: "bg-red-500",
  },
};

export function TaxProfileCard({ profile }: TaxProfileCardProps) {
  const { t } = usePreferences();
  const status = STATUS_CONFIG[profile.taxStatus];

  return (
    <Card className="relative flex h-full flex-col overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Receipt className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {t("dashboard.taxProfile.title")}
            </p>
            <h3 className="text-sm font-semibold">{profile.currentGroup}</h3>
          </div>
        </div>
        <Badge className={`shrink-0 rounded-md text-[10px] ${status.badgeClass}`}>
          {t(status.labelKey)}
        </Badge>
      </div>

      <div className="space-y-3">
        <ProfileRow
          label={t("dashboard.taxProfile.currentGroup")}
          value={profile.currentGroup}
        />
        <ProfileRow
          label={t("dashboard.taxProfile.taxSystem")}
          value={profile.taxSystem}
        />
        <ProfileRow
          label={t("dashboard.taxProfile.mainKved")}
          value={`${profile.mainKved} ${profile.mainKvedName}`}
        />

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {t("dashboard.taxProfile.incomeLimitUsage")}
            </p>
            <span className="text-xs font-semibold">{profile.incomeLimitUsage}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all ${status.barClass}`}
              style={{ width: `${Math.min(profile.incomeLimitUsage, 100)}%` }}
            />
          </div>
        </div>

        <ProfileRow
          label={t("dashboard.taxProfile.nextTaxPayment")}
          value={t("dashboard.taxProfile.daysUntil", {
            days: String(profile.nextTaxPaymentDays),
          })}
          hint={profile.nextTaxPaymentLabel}
        />
        <ProfileRow
          label={t("dashboard.taxProfile.taxStatus")}
          value={t(status.labelKey)}
        />
      </div>

      <div className="mt-4 rounded-lg border border-border/30 bg-muted/20 p-3">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Bot className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {t("dashboard.taxProfile.aiInsight")}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {profile.aiInsight}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button asChild variant="outline" size="sm" className="flex-1 rounded-lg text-xs">
          <Link href="/business-guide">
            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
            {t("dashboard.taxProfile.openGuide")}
          </Link>
        </Button>
        <Button asChild size="sm" className="flex-1 rounded-lg text-xs">
          <Link href="/business-guide#fop-eligibility-checker">
            <Wand2 className="mr-1.5 h-3.5 w-3.5" />
            {t("dashboard.taxProfile.runChecker")}
          </Link>
        </Button>
      </div>
    </Card>
  );
}

function ProfileRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="text-right">
        <p className="text-xs font-medium">{value}</p>
        {hint && <p className="text-[10px] text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}
