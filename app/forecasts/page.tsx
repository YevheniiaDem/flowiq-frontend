import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { TrendingUp, Calendar, Target } from "lucide-react";

export default function ForecastsPage() {
  return (
    <MainLayout>
      <div className="space-y-4 p-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Forecasts</h1>
          <p className="text-sm text-muted-foreground">
            AI-powered predictions for your business future
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Revenue Forecast</h3>
                <p className="text-xs text-muted-foreground">Next 3 months</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Cash Flow</h3>
                <p className="text-xs text-muted-foreground">Upcoming periods</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Target className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Goals Progress</h3>
                <p className="text-xs text-muted-foreground">Track targets</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Forecast Charts */}
        <div className="grid gap-3 lg:grid-cols-2">
          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <h3 className="mb-3 text-sm font-semibold">Revenue Projection</h3>
            <div className="flex h-64 items-center justify-center text-xs text-muted-foreground">
              Chart placeholder
            </div>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <h3 className="mb-3 text-sm font-semibold">Cash Flow Forecast</h3>
            <div className="flex h-64 items-center justify-center text-xs text-muted-foreground">
              Chart placeholder
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
