"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { knowledgeService } from "../services/knowledge.service";
import { KnowledgeDashboardSnapshot } from "../types/knowledge";

export function BusinessGuideDashboardWidget() {
  const { t } = usePreferences();
  const [snapshot, setSnapshot] = useState<KnowledgeDashboardSnapshot | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await knowledgeService.getDashboardSnapshot();
      setSnapshot(data);
    } catch {
      setSnapshot(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <Card className="flex h-32 items-center justify-center rounded-xl border-border/50 bg-card/50">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </Card>
    );
  }

  if (!snapshot) return null;

  const sections = [
    {
      title: t("businessGuide.widgets.popular"),
      articles: snapshot.popularArticles,
    },
    {
      title: t("businessGuide.widgets.recent"),
      articles: snapshot.recentlyUpdated,
    },
    {
      title: t("businessGuide.widgets.recommended"),
      articles: snapshot.recommendedForYou,
    },
  ];

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">
              {t("businessGuide.widgets.title")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t("businessGuide.widgets.subtitle")}
            </p>
          </div>
        </div>
        <Link
          href="/business-guide"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          {t("businessGuide.widgets.viewAll")}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {section.title}
            </p>
            <ul className="space-y-2">
              {section.articles.slice(0, 3).map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/business-guide/articles/${article.slug}`}
                    className="block text-xs hover:text-primary"
                  >
                    <span className="line-clamp-2 font-medium">
                      {article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}
