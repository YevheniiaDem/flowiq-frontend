import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-4 p-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-1 text-sm font-semibold">Profile</h3>
            <p className="text-xs text-muted-foreground">
              Update your personal information
            </p>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Bell className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mb-1 text-sm font-semibold">Notifications</h3>
            <p className="text-xs text-muted-foreground">
              Configure notification preferences
            </p>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Shield className="h-5 w-5 text-emerald-500" />
            </div>
            <h3 className="mb-1 text-sm font-semibold">Security</h3>
            <p className="text-xs text-muted-foreground">
              Manage security and privacy settings
            </p>
          </Card>

          <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10">
              <Palette className="h-5 w-5 text-pink-500" />
            </div>
            <h3 className="mb-1 text-sm font-semibold">Appearance</h3>
            <p className="text-xs text-muted-foreground">
              Customize theme and display options
            </p>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
