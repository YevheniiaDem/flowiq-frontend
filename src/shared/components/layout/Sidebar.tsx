"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Receipt,
  Upload,
  LineChart,
  MessageSquare,
  Bot,
  TrendingUp,
  FileText,
  Plug,
  BookOpen,
  Settings,
  Zap,
  Bell,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/src/shared/utils/utils";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = usePreferences();

  const navigation = [
    { name: t("nav.dashboard"), href: "/", icon: LayoutDashboard },
    { name: t("nav.transactions"), href: "/transactions", icon: Receipt },
    { name: t("nav.imports"), href: "/imports", icon: Upload },
    { name: t("nav.analytics"), href: "/analytics", icon: LineChart },
    { name: t("nav.aiChat"), href: "/chat", icon: MessageSquare },
    { name: t("nav.aiAccountant"), href: "/ai-accountant", icon: Bot },
    { name: t("nav.forecasts"), href: "/forecasts", icon: TrendingUp },
    { name: t("nav.tasks"), href: "/tasks", icon: ClipboardCheck },
    { name: t("nav.reports"), href: "/reports", icon: FileText },
    { name: t("nav.notifications"), href: "/notifications", icon: Bell },
    { name: t("nav.integrations"), href: "/integrations", icon: Plug },
    { name: t("nav.businessGuide"), href: "/business-guide", icon: BookOpen },
    { name: t("nav.settings"), href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-border/50 bg-sidebar transition-all duration-300">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center gap-2.5 border-b border-border/50 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
            Flowiq
          </span>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute inset-0 rounded-xl bg-sidebar-accent"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative z-10 h-4 w-4 transition-colors",
                    isActive ? "text-primary" : "text-current"
                  )}
                />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/50 p-3">
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20">
                <Zap className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-sidebar-foreground">
                  {t("nav.aiAssistant")}
                </p>
                <p className="text-[10px] text-muted-foreground">{t("nav.ready")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
