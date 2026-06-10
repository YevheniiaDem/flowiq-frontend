"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Wallet, Receipt } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { FopGroupSummary } from "../types";

interface FopGroupCardProps {
  group: FopGroupSummary;
  index: number;
}

export function FopGroupCard({ group, index }: FopGroupCardProps) {
  const { t } = usePreferences();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * index }}
    >
      <Card className="group flex h-full flex-col rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
        <h3 className="text-sm font-semibold">{group.name}</h3>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
          {group.shortDescription}
        </p>

        <div className="mt-4 space-y-2">
          <GroupMeta icon={Wallet} label={t("businessGuide.groups.incomeLimit")} value={group.incomeLimit} />
          <GroupMeta icon={Users} label={t("businessGuide.groups.employees")} value={group.employees} />
          <GroupMeta icon={Receipt} label={t("businessGuide.groups.taxType")} value={group.taxType} />
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="mt-4 w-full rounded-lg text-xs group-hover:border-primary/50 group-hover:text-primary"
        >
          <Link href={`/business-guide/groups/${group.slug}`}>
            {t("businessGuide.groups.explore")}
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </Card>
    </motion.div>
  );
}

function GroupMeta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className="text-xs font-medium">{value}</p>
      </div>
    </div>
  );
}
