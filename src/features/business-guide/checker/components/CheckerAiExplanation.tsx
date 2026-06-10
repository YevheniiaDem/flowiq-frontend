"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

interface CheckerAiExplanationProps {
  explanation: string;
}

export function CheckerAiExplanation({ explanation }: CheckerAiExplanationProps) {
  const { t } = usePreferences();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="border-b border-border/30 bg-muted/20 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {t("businessGuide.checker.result.aiTitle")}
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed text-foreground/90">
            {explanation}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
