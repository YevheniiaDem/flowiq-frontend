"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles, Wand2 } from "lucide-react";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useBusinessGuideSearch } from "../hooks/useBusinessGuideSearch";
import { highlightText } from "../utils/highlight.utils";

export function BusinessGuideHero() {
  const { t } = usePreferences();
  const {
    query,
    setQuery,
    results,
    primaryArticle,
    relatedArticles,
    quickSummary,
    loading,
  } = useBusinessGuideSearch();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-card/80 to-accent/5 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {t("businessGuide.badge")}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t("businessGuide.title")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          {t("businessGuide.subtitle")}
        </p>

        <div className="relative mt-6">
          <ClearableInput
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("businessGuide.searchPlaceholder")}
            clearAriaLabel={t("common.clearField")}
            leftIcon={<Search className="h-5 w-5" />}
            leftIconClassName="left-4"
            className="h-12 rounded-xl border-border/50 bg-background/80 pl-12 text-sm backdrop-blur-sm md:h-14 md:text-base"
          />

          {query.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-border/50 bg-card/95 shadow-lg backdrop-blur-md"
            >
              {loading ? (
                <p className="px-4 py-3 text-xs text-muted-foreground">
                  {t("common.loading")}
                </p>
              ) : results.length === 0 && !quickSummary ? (
                <p className="px-4 py-3 text-xs text-muted-foreground">
                  {t("businessGuide.noResults")}
                </p>
              ) : (
                <div className="max-h-96 overflow-y-auto py-1">
                  {quickSummary && (
                    <Card className="mx-2 mb-2 mt-1 rounded-lg border-primary/20 bg-primary/5 p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-primary">
                        <Wand2 className="h-3.5 w-3.5" />
                        {t("businessGuide.search.aiSummary")}
                      </div>
                      <p className="text-xs leading-relaxed text-foreground">
                        {quickSummary}
                      </p>
                      {primaryArticle && (
                        <Link
                          href={`/business-guide/articles/${primaryArticle.slug}`}
                          onClick={() => setQuery("")}
                          className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                        >
                          {primaryArticle.title} →
                        </Link>
                      )}
                    </Card>
                  )}
                  <ul>
                    {results.map((result) => (
                      <li key={result.id}>
                        <Link
                          href={`/business-guide/articles/${result.slug}`}
                          onClick={() => setQuery("")}
                          className="block px-4 py-2.5 transition-colors hover:bg-muted/50"
                        >
                          <p
                            className="text-sm font-medium"
                            dangerouslySetInnerHTML={{
                              __html: highlightText(result.title, query),
                            }}
                          />
                          <p
                            className="line-clamp-2 text-xs text-muted-foreground"
                            dangerouslySetInnerHTML={{
                              __html: highlightText(
                                result.highlight || result.summary,
                                query
                              ),
                            }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {relatedArticles.length > 0 && (
                    <div className="border-t border-border/50 px-4 py-2">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {t("businessGuide.search.related")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {relatedArticles.map((article) => (
                          <Link
                            key={article.id}
                            href={`/business-guide/articles/${article.slug}`}
                            onClick={() => setQuery("")}
                            className="rounded-md bg-muted/50 px-2 py-1 text-[10px] hover:bg-primary/10 hover:text-primary"
                          >
                            {article.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
