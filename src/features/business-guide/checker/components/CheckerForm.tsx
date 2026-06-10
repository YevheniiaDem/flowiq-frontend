"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, Building2, Briefcase, Wallet } from "lucide-react";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import { Button } from "@/src/shared/components/ui/button";
import { cn } from "@/src/shared/utils/utils";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { formatCurrency } from "@/src/shared/utils/currency";
import { ACTIVITY_PRESETS, INCOME_SLIDER_MAX } from "../data/activity-presets";
import { BusinessType, CheckerInput, EmployeeRange } from "../types";

interface CheckerFormProps {
  input: CheckerInput;
  error: string | null;
  onActivityChange: (activity: string, presetId?: CheckerInput["activityPresetId"]) => void;
  onIncomeChange: (income: number) => void;
  onEmployeesChange: (employees: EmployeeRange) => void;
  onBusinessTypeChange: (type: BusinessType) => void;
  onAnalyze: () => void;
}

const EMPLOYEE_OPTIONS: EmployeeRange[] = ["none", "1-5", "5-10", "10+"];

const EMPLOYEE_LABEL_KEYS = {
  none: "businessGuide.checker.employees.none",
  "1-5": "businessGuide.checker.employees.range1to5",
  "5-10": "businessGuide.checker.employees.range5to10",
  "10+": "businessGuide.checker.employees.range10plus",
} as const;

const BUSINESS_TYPE_OPTIONS: BusinessType[] = ["b2b", "b2c", "both"];

export function CheckerForm({
  input,
  error,
  onActivityChange,
  onIncomeChange,
  onEmployeesChange,
  onBusinessTypeChange,
  onAnalyze,
}: CheckerFormProps) {
  const { t, language, currency } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  return (
    <div className="space-y-6">
      <FormStep
        step={1}
        icon={Briefcase}
        title={t("businessGuide.checker.steps.activity")}
        delay={0}
      >
        <ClearableInput
          value={input.activity}
          onChange={(e) => onActivityChange(e.target.value, undefined)}
          placeholder={t("businessGuide.checker.activity.placeholder")}
          clearAriaLabel={t("common.clearField")}
          className="rounded-lg border-border/50 bg-background/80 text-sm"
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ACTIVITY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() =>
                onActivityChange(
                  language === "uk" ? preset.labelUk : preset.label,
                  preset.id
                )
              }
              className={cn(
                "rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all",
                input.activityPresetId === preset.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 bg-muted/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {language === "uk" ? preset.labelUk : preset.label}
            </button>
          ))}
        </div>
      </FormStep>

      <FormStep
        step={2}
        icon={Wallet}
        title={t("businessGuide.checker.steps.income")}
        delay={0.05}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">₴0</span>
          <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {formatCurrency(input.annualIncome, currency, locale)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(INCOME_SLIDER_MAX, currency, locale)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={INCOME_SLIDER_MAX}
          step={50_000}
          value={input.annualIncome}
          onChange={(e) => onIncomeChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
        />
        <p className="mt-2 text-[10px] text-muted-foreground">
          {t("businessGuide.checker.income.hint")}
        </p>
      </FormStep>

      <FormStep
        step={3}
        icon={Users}
        title={t("businessGuide.checker.steps.employees")}
        delay={0.1}
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {EMPLOYEE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onEmployeesChange(option)}
              className={cn(
                "rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all",
                input.employees === option
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/50 bg-muted/20 text-muted-foreground hover:border-primary/30"
              )}
            >
              {t(EMPLOYEE_LABEL_KEYS[option])}
            </button>
          ))}
        </div>
      </FormStep>

      <FormStep
        step={4}
        icon={Building2}
        title={t("businessGuide.checker.steps.businessType")}
        delay={0.15}
      >
        <div className="inline-flex rounded-xl border border-border/50 bg-muted/20 p-1">
          {BUSINESS_TYPE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onBusinessTypeChange(option)}
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-medium transition-all",
                input.businessType === option
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`businessGuide.checker.businessType.${option}`)}
            </button>
          ))}
        </div>
      </FormStep>

      <FormStep step={5} icon={Sparkles} title="" delay={0.2} hideHeader>
        {error && (
          <p className="mb-3 text-xs text-destructive">
            {error === "activity_required"
              ? t("businessGuide.checker.errors.activityRequired")
              : t("businessGuide.checker.errors.analysisFailed")}
          </p>
        )}
        <Button
          size="lg"
          className="w-full rounded-xl text-sm"
          onClick={onAnalyze}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {t("businessGuide.checker.analyze")}
        </Button>
      </FormStep>
    </div>
  );
}

function FormStep({
  step,
  icon: Icon,
  title,
  children,
  delay,
  hideHeader,
}: {
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
  delay: number;
  hideHeader?: boolean;
}) {
  const { t } = usePreferences();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="relative pl-10"
    >
      <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </div>
      {!hideHeader && (
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {t("common.step", { step: String(step) })}
          </span>
          <h4 className="text-sm font-semibold">{title}</h4>
        </div>
      )}
      {children}
    </motion.div>
  );
}
