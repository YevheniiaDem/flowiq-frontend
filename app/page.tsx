import { MainLayout } from "@/src/shared/components/layout";
import { DashboardView } from "@/src/features/dashboard";

export default function DashboardPage() {
  return (
    <MainLayout>
      <DashboardView />
    </MainLayout>
  );
}
