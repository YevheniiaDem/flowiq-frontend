"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useBusinessGuide } from "./hooks/useBusinessGuide";
import { useKnowledgeArticles } from "./hooks/useKnowledgeArticles";
import { knowledgeService } from "./services/knowledge.service";
import { BusinessGuideHero } from "./components/BusinessGuideHero";
import { BusinessProfileCard } from "./components/BusinessProfileCard";
import { FopGroupsOverview } from "./components/FopGroupsOverview";
import { TaxesSection } from "./components/TaxesSection";
import { KvedExplorer } from "./components/KvedExplorer";
import { FopEligibilityChecker } from "./checker";
import { BusinessGuideTabs } from "./components/BusinessGuideTabs";
import { KnowledgeArticleList } from "./components/KnowledgeArticleList";
import { LegalUpdatesSection } from "./components/LegalUpdatesSection";
import { BusinessGuideDashboardWidget } from "./components/BusinessGuideDashboardWidget";
import {
  BusinessGuideTab,
  KnowledgeArticleSummary,
  KnowledgeCategory,
  KnowledgeDashboardSnapshot,
} from "./types/knowledge";

const TAB_CATEGORIES: Partial<Record<BusinessGuideTab, KnowledgeCategory[]>> = {
  "fop-groups": ["FOP_GROUPS"],
  taxes: ["TAXES", "ESV", "MILITARY_TAX"],
  kved: ["KVED_DIRECTORY"],
  faq: ["BUSINESS_FAQ"],
  "knowledge-base": [],
  updates: ["LEGAL_CHANGES"],
};

export function BusinessGuideView() {
  const { t } = usePreferences();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab =
    (searchParams.get("tab") as BusinessGuideTab) || "overview";
  const [activeTab, setActiveTab] = useState<BusinessGuideTab>(initialTab);
  const [snapshot, setSnapshot] =
    useState<KnowledgeDashboardSnapshot | null>(null);
  const [snapshotLoading, setSnapshotLoading] = useState(true);

  const { profile, groups, taxes, loading, error } = useBusinessGuide();

  const apiCategory = useMemo(() => {
    const categories = TAB_CATEGORIES[activeTab];
    if (categories?.length === 1) return categories[0];
    return undefined;
  }, [activeTab]);

  const {
    articles: allArticles,
    loading: articlesLoading,
    error: articlesError,
    page,
    totalPages,
    loadPage,
  } = useKnowledgeArticles(apiCategory, 20);

  const loadSnapshot = useCallback(async () => {
    setSnapshotLoading(true);
    try {
      const data = await knowledgeService.getDashboardSnapshot();
      setSnapshot(data);
    } catch {
      setSnapshot(null);
    } finally {
      setSnapshotLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSnapshot();
  }, [loadSnapshot]);

  const handleTabChange = (tab: BusinessGuideTab) => {
    setActiveTab(tab);
    router.replace(`/business-guide?tab=${tab}`, { scroll: false });
  };

  const filteredArticles = useMemo(() => {
    const categories = TAB_CATEGORIES[activeTab];
    if (!categories || categories.length === 0) {
      return allArticles;
    }
    return allArticles.filter((article) =>
      categories.includes(article.category)
    );
  }, [activeTab, allArticles]);

  const legalArticles = useMemo(
    () =>
      allArticles.filter(
        (article) => article.category === "LEGAL_CHANGES"
      ) as KnowledgeArticleSummary[],
    [allArticles]
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-64 items-center justify-center p-4">
        <p className="text-sm text-destructive">
          {error || t("businessGuide.loadError")}
        </p>
      </div>
    );
  }

  return (
    <div data-testid="business-guide-page" className="space-y-6 p-4">
      <BusinessGuideHero />
      <BusinessGuideTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "overview" && (
        <>
          <BusinessProfileCard profile={profile} />
          <FopGroupsOverview groups={groups} />
          <FopEligibilityChecker />
          {!snapshotLoading && snapshot && (
            <LegalUpdatesSection articles={snapshot.latestLegalChanges} />
          )}
          <TaxesSection taxes={taxes} />
          <KvedExplorer />
          <BusinessGuideDashboardWidget />
        </>
      )}

      {activeTab === "fop-groups" && (
        <>
          <FopGroupsOverview groups={groups} />
          <KnowledgeArticleList
            articles={filteredArticles}
            loading={articlesLoading}
            error={articlesError}
            page={page}
            totalPages={totalPages}
            onPageChange={loadPage}
          />
        </>
      )}

      {activeTab === "taxes" && (
        <>
          <TaxesSection taxes={taxes} />
          <KnowledgeArticleList
            articles={filteredArticles}
            loading={articlesLoading}
            error={articlesError}
            page={page}
            totalPages={totalPages}
            onPageChange={loadPage}
          />
        </>
      )}

      {activeTab === "kved" && (
        <>
          <KvedExplorer />
          <KnowledgeArticleList
            articles={filteredArticles}
            loading={articlesLoading}
            error={articlesError}
            page={page}
            totalPages={totalPages}
            onPageChange={loadPage}
          />
        </>
      )}

      {activeTab === "faq" && (
        <KnowledgeArticleList
          articles={filteredArticles}
          loading={articlesLoading}
          error={articlesError}
          page={page}
          totalPages={totalPages}
          onPageChange={loadPage}
          emptyMessage={t("businessGuide.noResults")}
        />
      )}

      {activeTab === "knowledge-base" && (
        <KnowledgeArticleList
          articles={allArticles}
          loading={articlesLoading}
          error={articlesError}
          page={page}
          totalPages={totalPages}
          onPageChange={loadPage}
        />
      )}

      {activeTab === "updates" && (
        <LegalUpdatesSection
          articles={
            legalArticles.length > 0
              ? legalArticles
              : snapshot?.latestLegalChanges ?? []
          }
        />
      )}
    </div>
  );
}
