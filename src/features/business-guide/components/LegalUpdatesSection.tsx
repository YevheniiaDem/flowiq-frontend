"use client";

import Link from "next/link";
import { CalendarDays, Scale } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { KnowledgeArticleSummary } from "../types/knowledge";
import { formatArticleDate } from "../utils/highlight.utils";

interface LegalUpdatesSectionProps {
  articles: KnowledgeArticleSummary[];
}

export function LegalUpdatesSection({ articles }: LegalUpdatesSectionProps) {
  const { t, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  if (articles.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Scale className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-lg font-semibold">
            {t("businessGuide.updates.title")}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t("businessGuide.updates.subtitle")}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/business-guide/articles/${article.slug}`}>
              <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-colors hover:border-primary/30">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{article.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {article.summary}
                    </p>
                    {article.impact && (
                      <p className="mt-2 text-xs">
                        <span className="font-medium text-primary">
                          {t("businessGuide.updates.impact")}:
                        </span>{" "}
                        {article.impact}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className="shrink-0 text-[10px]"
                  >
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {formatArticleDate(
                      article.publishedAt || article.updatedAt,
                      locale
                    )}
                  </Badge>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
