import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plug } from "lucide-react";

const integrations = [
  {
    name: "Monobank",
    description: "Connect your Monobank account",
    status: "available",
    icon: "🏦",
  },
  {
    name: "PrivatBank",
    description: "Sync transactions from PrivatBank",
    status: "available",
    icon: "💳",
  },
  {
    name: "Google Sheets",
    description: "Import data from spreadsheets",
    status: "available",
    icon: "📊",
  },
  {
    name: "Shopify",
    description: "E-commerce integration",
    status: "coming",
    icon: "🛍️",
  },
  {
    name: "Telegram",
    description: "Get notifications via Telegram",
    status: "coming",
    icon: "💬",
  },
  {
    name: "Rozetka",
    description: "Marketplace integration",
    status: "coming",
    icon: "🛒",
  },
];

export default function IntegrationsPage() {
  return (
    <MainLayout>
      <div className="space-y-4 p-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground">
            Connect your business tools and services
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration, i) => (
            <Card
              key={i}
              className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">
                  {integration.icon}
                </div>
                {integration.status === "available" ? (
                  <Badge className="rounded-md bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                    Available
                  </Badge>
                ) : (
                  <Badge className="rounded-md bg-muted text-muted-foreground">
                    Coming Soon
                  </Badge>
                )}
              </div>
              <h3 className="mb-1 text-sm font-semibold">{integration.name}</h3>
              <p className="mb-3 text-xs text-muted-foreground">
                {integration.description}
              </p>
              <Button
                variant={
                  integration.status === "available" ? "default" : "outline"
                }
                className="w-full rounded-lg text-xs"
                size="sm"
                disabled={integration.status !== "available"}
              >
                <Plug className="mr-2 h-3.5 w-3.5" />
                {integration.status === "available" ? "Connect" : "Coming Soon"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
