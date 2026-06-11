import { MainLayout } from "@/src/shared/components/layout";
import { KnowledgeArticleView } from "@/src/features/business-guide/components/KnowledgeArticleView";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <MainLayout>
      <KnowledgeArticleView slug={slug} />
    </MainLayout>
  );
}
