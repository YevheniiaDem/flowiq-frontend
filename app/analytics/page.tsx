import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { LineChart, BarChart3, PieChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <div className="space-y-4 p-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Deep dive into your business performance and trends
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Revenue Trends</h3>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Expense Analysis</h3>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <PieChart className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Profit Distribution</h3>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Chart Placeholders */}
        <div className="grid gap-3 lg:grid-cols-2">
          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <h3 className="mb-3 text-sm font-semibold">Revenue by Month</h3>
            <div className="flex h-64 items-center justify-center text-xs text-muted-foreground">
              Chart placeholder
            </div>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <h3 className="mb-3 text-sm font-semibold">Expense Categories</h3>
            <div className="flex h-64 items-center justify-center text-xs text-muted-foreground">
              Chart placeholder
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
