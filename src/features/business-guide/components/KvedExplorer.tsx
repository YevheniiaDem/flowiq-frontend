"use client";

import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import { Badge } from "@/src/shared/components/ui/badge";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useKvedSearch } from "../hooks/useKvedSearch";

export function KvedExplorer() {
  const { t } = usePreferences();
  const { query, setQuery, results, loading } = useKvedSearch();

  return (
    <section id="kved-explorer">
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{t("businessGuide.kved.title")}</h2>
        <p className="text-xs text-muted-foreground">
          {t("businessGuide.kved.subtitle")}
        </p>
      </div>

      <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <ClearableInput
          containerClassName="mb-4"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("businessGuide.kved.searchPlaceholder")}
          clearAriaLabel={t("common.clearField")}
          leftIcon={<Search className="h-4 w-4" />}
          leftIconClassName="left-3"
          className="rounded-lg border-border/50 bg-background/80 pl-10 text-sm"
        />

        {loading ? (
          <p className="py-8 text-center text-xs text-muted-foreground">
            {t("common.loading")}
          </p>
        ) : (
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {results.map((kved, index) => (
              <motion.div
                key={kved.code}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/30 bg-muted/20 p-3 transition-colors hover:border-primary/20 hover:bg-muted/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-semibold text-primary">
                    {kved.code.split(".")[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">
                      <span className="font-mono text-primary">{kved.code}</span>
                      {" — "}
                      {kved.name}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="inline-flex h-auto min-h-6 shrink-0 items-center gap-1 self-center rounded-md px-2 py-1 text-[10px] leading-snug"
                >
                  <Tag className="h-3 w-3 shrink-0" />
                  <span>{kved.category}</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        )}

        <p className="mt-3 text-[10px] text-muted-foreground">
          {t("businessGuide.kved.resultCount", { count: String(results.length) })}
        </p>
      </Card>
    </section>
  );
}
