"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { KnowledgeArticleSummary } from "../types/knowledge";
import { KnowledgeArticleCard } from "./KnowledgeArticleCard";

interface KnowledgeArticleListProps {
  articles: KnowledgeArticleSummary[];
  loading?: boolean;
  error?: string | null;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

export function KnowledgeArticleList({
  articles,
  loading,
  error,
  page = 0,
  totalPages = 0,
  onPageChange,
  emptyMessage,
}: KnowledgeArticleListProps) {
  const { t } = usePreferences();

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (articles.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {emptyMessage || t("businessGuide.noResults")}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <KnowledgeArticleCard
            key={article.id}
            article={article}
            index={index}
          />
        ))}
      </div>
      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 0}
            onClick={() => onPageChange(page - 1)}
          >
            {t("businessGuide.pagination.previous")}
          </Button>
          <span className="text-xs text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => onPageChange(page + 1)}
          >
            {t("businessGuide.pagination.next")}
          </Button>
        </div>
      )}
    </div>
  );
}
