import { MainLayout } from "@/src/shared/components/layout";
import { TasksView } from "@/src/features/tasks";

export default function TasksPage() {
  return (
    <MainLayout>
      <TasksView />
    </MainLayout>
  );
}
