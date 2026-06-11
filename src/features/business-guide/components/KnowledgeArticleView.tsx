"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Loader2, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/src/shared/components/ui/badge";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useKnowledgeArticle } from "../hooks/useKnowledgeArticle";
import { KnowledgeArticleCard } from "./KnowledgeArticleCard";
import { formatArticleDate } from "../utils/highlight.utils";

interface KnowledgeArticleViewProps {
  slug: string;
}

export function KnowledgeArticleView({ slug }: KnowledgeArticleViewProps) {
  const { t, language } = usePreferences();
  const locale = language === "uk" ? "uk-UA" : "en-US";
  const { article, loading, error } = useKnowledgeArticle(slug);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3 p-4">
        <p className="text-sm text-destructive">
          {error || t("businessGuide.loadError")}
        </p>
        <Link
          href="/business-guide"
          className="text-sm text-primary hover:underline"
        >
          {t("businessGuide.article.backToGuide")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <Link
        href="/business-guide"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("businessGuide.article.backToGuide")}
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{t(`businessGuide.categories.${article.category}` as never)}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {t("businessGuide.article.readingTime", {
              minutes: article.readingTimeMinutes,
            })}
          </span>
          <span className="text-xs text-muted-foreground">
            {t("businessGuide.article.updated")}:{" "}
            {formatArticleDate(article.updatedAt, locale)}
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {article.title}
        </h1>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-muted/50 px-2 py-1 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <Card className="rounded-xl border-border/50 bg-card/50 p-6 backdrop-blur-sm">
          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {article.content}
          </div>
        </Card>

        {article.impact && (
          <Card className="rounded-xl border-primary/20 bg-primary/5 p-4">
            <p className="text-xs font-medium text-primary">
              {t("businessGuide.updates.impact")}
            </p>
            <p className="mt-1 text-sm">{article.impact}</p>
          </Card>
        )}
      </motion.article>

      {article.relatedArticles.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">
            {t("businessGuide.article.related")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {article.relatedArticles.map((related, index) => (
              <KnowledgeArticleCard
                key={related.id}
                article={related}
                index={index}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
