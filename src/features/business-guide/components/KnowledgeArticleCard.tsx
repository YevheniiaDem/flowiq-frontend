"use client";

import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/src/shared/components/ui/card";
import { Badge } from "@/src/shared/components/ui/badge";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { KnowledgeArticleSummary } from "../types/knowledge";
import { formatArticleDate } from "../utils/highlight.utils";

interface KnowledgeArticleCardProps {
  article: KnowledgeArticleSummary;
  index?: number;
}

export function KnowledgeArticleCard({
  article,
  index = 0,
}: KnowledgeArticleCardProps) {
  const { t, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/business-guide/articles/${article.slug}`}>
        <Card className="group h-full rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">
              {t(`businessGuide.categories.${article.category}` as never)}
            </Badge>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {t("businessGuide.article.readingTime", {
                minutes: article.readingTimeMinutes,
              })}
            </span>
          </div>
          <h3 className="text-sm font-semibold group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
            {article.highlight || article.summary}
          </p>
          {article.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-0.5 rounded-md bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="mt-3 text-[10px] text-muted-foreground">
            {t("businessGuide.article.updated")}:{" "}
            {formatArticleDate(article.updatedAt, locale)}
          </p>
        </Card>
      </Link>
    </motion.div>
  );
}
