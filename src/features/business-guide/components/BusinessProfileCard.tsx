"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { BusinessProfile } from "../types";

interface BusinessProfileCardProps {
  profile: BusinessProfile;
}

const HEALTH_COLORS: Record<BusinessProfile["businessHealth"], string> = {
  excellent: "text-emerald-500 bg-emerald-500/10",
  good: "text-emerald-500 bg-emerald-500/10",
  fair: "text-amber-500 bg-amber-500/10",
  poor: "text-red-500 bg-red-500/10",
  warning: "text-amber-500 bg-amber-500/10",
};

export function BusinessProfileCard({ profile }: BusinessProfileCardProps) {
  const { t } = usePreferences();
  const incomePercent = Math.round(
    (profile.annualIncome / profile.incomeLimit) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      <Card className="rounded-xl border-border/50 bg-card/50 p-5 backdrop-blur-sm" data-testid="business-guide-profile">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold">
                {t("businessGuide.profile.title")}
              </h2>
              <p className="text-xs text-muted-foreground">
                {t("businessGuide.profile.subtitle")}
              </p>
            </div>
          </div>
          <Badge className="rounded-md bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
            {profile.status}
          </Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileField
            label={t("businessGuide.profile.currentGroup")}
            value={profile.currentGroup}
          />
          <ProfileField
            label={t("businessGuide.profile.taxSystem")}
            value={profile.taxSystem}
          />
          <ProfileField
            label={t("businessGuide.profile.mainKved")}
            value={`${profile.mainKved} — ${profile.mainKvedName}`}
          />
          <ProfileField
            label={t("businessGuide.profile.status")}
            value={profile.status}
          />
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {t("businessGuide.profile.businessHealth")}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm font-semibold">
                {profile.businessHealthScore}/100
              </span>
              <Badge
                className={`rounded-md text-[10px] ${HEALTH_COLORS[profile.businessHealth]}`}
              >
                {t(`businessGuide.health.${profile.businessHealth}`)}
              </Badge>
            </div>
          </div>
          <div className="rounded-lg bg-muted/30 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {t("businessGuide.profile.incomeUsage")}
            </p>
            <div className="mt-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{incomePercent}%</span>
                <span className="text-muted-foreground">
                  {t("businessGuide.profile.ofLimit")}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${
                    incomePercent >= 90
                      ? "bg-amber-500"
                      : incomePercent >= 75
                        ? "bg-primary"
                        : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(incomePercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 rounded-lg text-xs"
        >
          {t("businessGuide.profile.viewDetails")}
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </Card>
    </motion.div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/30 p-3">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
