import { GroupDetailView } from "@/src/features/business-guide";

interface GroupPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { slug } = await params;

  return <GroupDetailView slug={slug} />;
}
