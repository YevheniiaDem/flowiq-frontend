import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowRight,
  Target,
  Zap,
  BarChart3,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-4 p-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Revenue
                </p>
                <h3 className="mt-1.5 text-xl font-bold">$245,400</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+20.1%</span>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <DollarSign className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Expenses
                </p>
                <h3 className="mt-1.5 text-xl font-bold">$152,600</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-red-500">
                  <TrendingDown className="h-3 w-3" />
                  <span>-5.2%</span>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Profit
                </p>
                <h3 className="mt-1.5 text-xl font-bold">$92,800</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.5%</span>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Cash Flow
                </p>
                <h3 className="mt-1.5 text-xl font-bold">$83,300</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8.3%</span>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {/* AI Summary Card */}
          <Card className="relative overflow-hidden rounded-xl border-border/50 bg-gradient-to-br from-primary/5 to-accent/5 p-4 backdrop-blur-sm lg:col-span-2">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">AI Business Summary</h3>
                  <Badge className="rounded-md bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                    Active
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ваш бізнес показує сильну динаміку цього місяця. Виручка зросла на 20% порівняно з попереднім місяцем, витрати знизилися на 5%. AI виявив 3 можливості для підвищення прибутковості.
                </p>
              </div>
            </div>
          </Card>

          {/* Business Health Score */}
          <Card className="relative overflow-hidden rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Business Health
                </p>
                <h3 className="mt-1.5 text-2xl font-bold">94/100</h3>
                <p className="mt-1 text-xs text-emerald-500">Excellent</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20">
                <Target className="h-7 w-7 text-emerald-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* AI Insights */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">AI Insights</h2>
            <button className="flex items-center gap-1 text-xs text-primary hover:underline">
              View all
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <Badge className="mb-1 rounded-md bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
                    Warning
                  </Badge>
                </div>
              </div>
              <h3 className="mb-1 text-sm font-semibold">Cash Flow Alert</h3>
              <p className="text-xs text-muted-foreground">
                Можливий касовий розрив через 2 місяці. Рекомендується збільшити резерви або знизити витрати.
              </p>
              <div className="mt-3 text-xs text-muted-foreground">2 hours ago</div>
            </Card>

            <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <Badge className="mb-1 rounded-md bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                    Success
                  </Badge>
                </div>
              </div>
              <h3 className="mb-1 text-sm font-semibold">Profitable Month</h3>
              <p className="text-xs text-muted-foreground">
                Прибуток виріс на 12.5% порівняно з минулим місяцем. Клієнти з Instagram приносять найбільший дохід.
              </p>
              <div className="mt-3 text-xs text-muted-foreground">5 hours ago</div>
            </Card>

            <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge className="mb-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20">
                    Info
                  </Badge>
                </div>
              </div>
              <h3 className="mb-1 text-sm font-semibold">Optimization Opportunity</h3>
              <p className="text-xs text-muted-foreground">
                Витрати на рекламу зросли на 25%, але продажі не збільшилися. Рекомендується оптимізувати кампанії.
              </p>
              <div className="mt-3 text-xs text-muted-foreground">1 day ago</div>
            </Card>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid gap-3 lg:grid-cols-2">
          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Revenue Trend</h3>
              <Badge className="rounded-md bg-muted text-xs">Last 6 months</Badge>
            </div>
            <div className="flex h-48 items-center justify-center text-xs text-muted-foreground">
              Chart placeholder
            </div>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Expense Breakdown</h3>
              <Badge className="rounded-md bg-muted text-xs">This month</Badge>
            </div>
            <div className="flex h-48 items-center justify-center text-xs text-muted-foreground">
              Chart placeholder
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
