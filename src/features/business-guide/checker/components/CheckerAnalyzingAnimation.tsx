"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

const ANALYSIS_STEPS = [
  "businessGuide.checker.analyzing.step1",
  "businessGuide.checker.analyzing.step2",
  "businessGuide.checker.analyzing.step3",
] as const;

export function CheckerAnalyzingAnimation() {
  const { t } = usePreferences();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-8">
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="h-9 w-9 text-primary" />
        </motion.div>
        <motion.div
          className="absolute -right-2 -top-2"
          animate={{ rotate: [0, 15, -15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="h-5 w-5 text-accent" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/30"
          animate={{ scale: [1, 1.3, 1.5], opacity: [0.6, 0.2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <motion.p
        className="mb-6 text-sm font-medium"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {t("businessGuide.checker.analyzing.title")}
      </motion.p>

      <div className="space-y-2">
        {ANALYSIS_STEPS.map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5, duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ delay: index * 0.5, duration: 0.8, repeat: Infinity }}
            />
            {t(key)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
