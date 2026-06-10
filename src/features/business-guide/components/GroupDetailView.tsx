"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Loader2,
  Users,
  Wallet,
  Receipt,
  Briefcase,
  ListChecks,
} from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useFopGroup } from "../hooks/useFopGroup";

interface GroupDetailViewProps {
  slug: string;
}

export function GroupDetailView({ slug }: GroupDetailViewProps) {
  const { t } = usePreferences();
  const { group, loading, error } = useFopGroup(slug);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 p-4 text-center">
        <p className="text-sm text-destructive">
          {error || t("businessGuide.group.notFound")}
        </p>
        <Button asChild variant="outline" size="sm" className="rounded-lg">
          <Link href="/business-guide">
            <ArrowLeft className="mr-2 h-3.5 w-3.5" />
            {t("businessGuide.group.back")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-3 -ml-2 rounded-lg text-xs text-muted-foreground"
        >
          <Link href="/business-guide">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            {t("businessGuide.group.back")}
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-2xl font-bold tracking-tight">{group.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {group.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-md text-xs">
              <Wallet className="mr-1 h-3 w-3" />
              {group.incomeLimit}
            </Badge>
            <Badge variant="outline" className="rounded-md text-xs">
              <Users className="mr-1 h-3 w-3" />
              {group.employees}
            </Badge>
            <Badge variant="outline" className="rounded-md text-xs">
              <Receipt className="mr-1 h-3 w-3" />
              {group.taxType}
            </Badge>
          </div>
        </motion.div>
      </div>

      <DetailSection
        icon={Briefcase}
        title={t("businessGuide.group.overview")}
        delay={0.05}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {group.overview}
        </p>
      </DetailSection>

      <DetailSection
        icon={Receipt}
        title={t("businessGuide.group.taxes")}
        delay={0.1}
      >
        <div className="grid gap-3 md:grid-cols-2">
          {group.taxes.map((tax) => (
            <Card
              key={tax.name}
              className="rounded-lg border-border/30 bg-muted/20 p-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">{tax.name}</h4>
                <Badge className="rounded-md bg-primary/10 text-primary text-[10px]">
                  {tax.rate}
                </Badge>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {tax.description}
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground">
                {t("businessGuide.taxes.deadlines")}: {tax.paymentDeadline}
              </p>
            </Card>
          ))}
        </div>
      </DetailSection>

      <DetailSection
        icon={Wallet}
        title={t("businessGuide.group.incomeLimits")}
        delay={0.15}
      >
        <Card className="rounded-lg border-border/30 bg-muted/20 p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label={t("businessGuide.group.annual")} value={group.incomeLimits.annual} />
            <Stat label={t("businessGuide.group.monthly")} value={group.incomeLimits.monthly} />
            <Stat label={t("businessGuide.group.currency")} value={group.incomeLimits.currency} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {group.incomeLimits.note}
          </p>
        </Card>
      </DetailSection>

      <DetailSection
        icon={Users}
        title={t("businessGuide.group.employees")}
        delay={0.2}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          {group.employeesInfo}
        </p>
      </DetailSection>

      <DetailSection
        icon={ListChecks}
        title={t("businessGuide.group.allowedActivities")}
        delay={0.25}
      >
        <ul className="grid gap-2 sm:grid-cols-2">
          {group.allowedActivities.map((activity) => (
            <li
              key={activity}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {activity}
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection
        icon={Briefcase}
        title={t("businessGuide.group.popularKveds")}
        delay={0.3}
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {group.popularKveds.map((kved) => (
            <Card
              key={kved.code}
              className="rounded-lg border-border/30 bg-muted/20 p-3"
            >
              <span className="font-mono text-xs font-semibold text-primary">
                {kved.code}
              </span>
              <p className="mt-0.5 text-xs text-muted-foreground">{kved.name}</p>
            </Card>
          ))}
        </div>
      </DetailSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <DetailSection
          icon={CheckCircle2}
          title={t("businessGuide.group.advantages")}
          delay={0.35}
        >
          <ul className="space-y-2">
            {group.advantages.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection
          icon={AlertCircle}
          title={t("businessGuide.group.risks")}
          delay={0.4}
        >
          <ul className="space-y-2">
            {group.risks.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                {item}
              </li>
            ))}
          </ul>
        </DetailSection>
      </div>

      <DetailSection
        icon={HelpCircle}
        title={t("businessGuide.group.faq")}
        delay={0.45}
      >
        <div className="space-y-3">
          {group.faq.map((item) => (
            <Card
              key={item.question}
              className="rounded-lg border-border/30 bg-muted/20 p-4"
            >
              <h4 className="text-sm font-medium">{item.question}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </Card>
          ))}
        </div>
      </DetailSection>
    </div>
  );
}

function DetailSection({
  icon: Icon,
  title,
  children,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
