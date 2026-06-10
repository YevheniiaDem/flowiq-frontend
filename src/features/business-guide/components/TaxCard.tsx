"use client";

import { motion } from "framer-motion";
import { Calendar, Calculator, Lightbulb } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { TaxType } from "../types";

interface TaxCardProps {
  tax: TaxType;
  index: number;
}

export function TaxCard({ tax, index }: TaxCardProps) {
  const { t } = usePreferences();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * index }}
    >
      <Card className="h-full rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <h3 className="text-sm font-semibold">{tax.name}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {tax.description}
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {t("businessGuide.taxes.deadlines")}
            </div>
            <ul className="space-y-1">
              {tax.paymentDeadlines.map((deadline) => (
                <li key={deadline} className="text-xs text-foreground/80">
                  • {deadline}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-primary/5 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-primary">
              <Calculator className="h-3 w-3" />
              {t("businessGuide.taxes.formula")}
            </div>
            <p className="font-mono text-xs">{tax.formula}</p>
          </div>

          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <Lightbulb className="h-3 w-3" />
              {t("businessGuide.taxes.recommendations")}
            </div>
            <ul className="space-y-1">
              {tax.recommendations.map((rec) => (
                <li key={rec} className="text-xs text-foreground/80">
                  • {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
