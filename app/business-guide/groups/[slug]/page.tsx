import { MainLayout } from "@/src/shared/components/layout";
import { GroupDetailView } from "@/src/features/business-guide";

interface GroupPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { slug } = await params;

  return (
    <MainLayout>
      <GroupDetailView slug={slug} />
    </MainLayout>
  );
}
