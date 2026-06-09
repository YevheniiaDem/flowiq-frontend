import { MainLayout } from "@/src/shared/components/layout";
import { ForecastsView } from "@/src/features/forecasts";

export default function ForecastsPage() {
  return (
    <MainLayout>
      <ForecastsView />
    </MainLayout>
  );
}
