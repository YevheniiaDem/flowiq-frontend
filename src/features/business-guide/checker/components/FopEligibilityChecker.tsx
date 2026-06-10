"use client";

import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useEligibilityChecker } from "../hooks/useEligibilityChecker";
import { CheckerForm } from "./CheckerForm";
import { CheckerAnalyzingAnimation } from "./CheckerAnalyzingAnimation";
import { CheckerResultView } from "./CheckerResultView";

export function FopEligibilityChecker() {
  const { t } = usePreferences();
  const {
    input,
    phase,
    result,
    error,
    setActivity,
    setIncome,
    setEmployees,
    setBusinessType,
    analyze,
    reset,
  } = useEligibilityChecker();

  return (
    <section id="fop-eligibility-checker">
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <Wand2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {t("businessGuide.checker.title")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("businessGuide.checker.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="border-b border-border/30 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 px-5 py-3">
          <p className="text-xs text-muted-foreground">
            {t("businessGuide.checker.hint")}
          </p>
        </div>

        <div className="p-5 md:p-6">
          {phase === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckerForm
                input={input}
                error={error}
                onActivityChange={setActivity}
                onIncomeChange={setIncome}
                onEmployeesChange={setEmployees}
                onBusinessTypeChange={setBusinessType}
                onAnalyze={analyze}
              />
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CheckerAnalyzingAnimation />
            </motion.div>
          )}

          {phase === "result" && result && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CheckerResultView input={input} result={result} onReset={reset} />
            </motion.div>
          )}
        </div>
      </Card>
    </section>
  );
}
