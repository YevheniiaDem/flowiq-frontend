"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  Users,
  Receipt,
  ListChecks,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { formatCurrency } from "@/src/shared/utils/currency";
import { CheckerAiExplanation } from "./CheckerAiExplanation";
import { CheckerExportActions } from "./CheckerExportActions";
import { CheckerInput, CheckerResult } from "../types";

interface CheckerResultViewProps {
  input: CheckerInput;
  result: CheckerResult;
  onReset: () => void;
}

export function CheckerResultView({ input, result, onReset }: CheckerResultViewProps) {
  const { t, currency, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {t("businessGuide.checker.result.label")}
          </p>
          <h3 className="mt-1 text-xl font-bold">{result.recommendedGroupName}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("businessGuide.checker.result.confidence")}
            </p>
            <p className="text-2xl font-bold text-primary">{result.confidenceScore}%</p>
          </div>
          <div className="relative flex h-14 w-14 items-center justify-center">
            <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-muted/30"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={`${(result.confidenceScore / 100) * 150.8} 150.8`}
                className="text-primary"
                strokeLinecap="round"
              />
            </svg>
            <ShieldCheck className="absolute h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      <CheckerAiExplanation explanation={result.aiExplanation} />

      <div className="grid gap-3 md:grid-cols-2">
        <ResultCard
          icon={ListChecks}
          title={t("businessGuide.checker.result.why")}
          delay={0.15}
        >
          <ul className="space-y-2">
            {result.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {reason}
              </li>
            ))}
          </ul>
        </ResultCard>

        <ResultCard
          icon={Receipt}
          title={t("businessGuide.checker.result.taxes")}
          delay={0.2}
        >
          <div className="space-y-2">
            <TaxLine
              label={t("businessGuide.checker.result.unifiedTax")}
              value={formatCurrency(result.estimatedTaxes.unifiedTax, currency, locale)}
            />
            <TaxLine
              label={t("businessGuide.checker.result.esv")}
              value={formatCurrency(result.estimatedTaxes.esv, currency, locale)}
            />
            {result.estimatedTaxes.militaryTax > 0 && (
              <TaxLine
                label={t("businessGuide.checker.result.militaryTax")}
                value={formatCurrency(result.estimatedTaxes.militaryTax, currency, locale)}
              />
            )}
            {result.estimatedTaxes.vat > 0 && (
              <TaxLine
                label={t("businessGuide.checker.result.vat")}
                value={formatCurrency(result.estimatedTaxes.vat, currency, locale)}
              />
            )}
            <div className="border-t border-border/30 pt-2">
              <TaxLine
                label={t("businessGuide.checker.result.total")}
                value={formatCurrency(result.estimatedTaxes.total, currency, locale)}
                bold
              />
              <p className="mt-1 text-[10px] text-muted-foreground">
                {t("businessGuide.checker.result.effectiveRate")}: {result.estimatedTaxes.effectiveRate}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground">{result.estimatedTaxes.note}</p>
          </div>
        </ResultCard>

        <ResultCard
          icon={Users}
          title={t("businessGuide.checker.result.employees")}
          delay={0.25}
        >
          <Badge
            className={`mb-2 rounded-md text-[10px] ${
              result.employeesCompatibility.compatible
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-amber-500/10 text-amber-500"
            }`}
          >
            {result.employeesCompatibility.compatible
              ? t("businessGuide.checker.result.compatible")
              : t("businessGuide.checker.result.notCompatible")}
          </Badge>
          <p className="text-xs text-muted-foreground">
            {result.employeesCompatibility.message}
          </p>
        </ResultCard>

        <ResultCard
          icon={ListChecks}
          title={t("businessGuide.checker.result.kveds")}
          delay={0.3}
        >
          <div className="space-y-2">
            {result.suggestedKveds.map((kved) => (
              <div key={kved.code} className="rounded-lg bg-muted/30 p-2">
                <span className="font-mono text-xs font-semibold text-primary">
                  {kved.code}
                </span>
                <p className="text-[11px] text-muted-foreground">{kved.name}</p>
              </div>
            ))}
          </div>
        </ResultCard>
      </div>

      <ResultCard icon={AlertTriangle} title={t("businessGuide.checker.result.risks")} delay={0.35}>
        <ul className="space-y-2">
          {result.risksAndWarnings.map((risk) => (
            <li key={risk} className="flex items-start gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
              {risk}
            </li>
          ))}
        </ul>
      </ResultCard>

      <Card className="rounded-xl border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-4">
        <div className="flex items-start gap-3">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <h4 className="text-sm font-semibold">
              {t("businessGuide.checker.result.growth")}
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {result.growthRecommendation}
            </p>
          </div>
        </div>
      </Card>

      {result.alternativeGroup && (
        <p className="text-xs text-muted-foreground">
          {t("businessGuide.checker.result.alternative")}:{" "}
          <Link
            href={`/business-guide/groups/${result.alternativeGroup.slug}`}
            className="font-medium text-primary hover:underline"
          >
            {result.alternativeGroup.name}
          </Link>
          {" — "}
          {result.alternativeGroup.reason}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/30 pt-4">
        <CheckerExportActions input={input} result={result} />
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-xs"
            onClick={onReset}
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            {t("businessGuide.checker.result.startOver")}
          </Button>
          <Button asChild size="sm" className="rounded-lg text-xs">
            <Link href={`/business-guide/groups/${result.recommendedGroup}`}>
              {t("businessGuide.checker.result.exploreGroup")}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function ResultCard({
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card className="h-full rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-semibold">{title}</h4>
        </div>
        {children}
      </Card>
    </motion.div>
  );
}

function TaxLine({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
