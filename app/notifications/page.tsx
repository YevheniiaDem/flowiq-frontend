import { MainLayout } from "@/src/shared/components/layout";
import { NotificationCenterView } from "@/src/features/notifications";

export default function NotificationsPage() {
  return (
    <MainLayout>
      <NotificationCenterView />
    </MainLayout>
  );
}
