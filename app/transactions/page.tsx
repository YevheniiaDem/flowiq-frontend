import { MainLayout } from "@/src/shared/components/layout";
import { TransactionsView } from "@/src/features/transactions";

export default function TransactionsPage() {
  return (
    <MainLayout>
      <TransactionsView />
    </MainLayout>
  );
}
