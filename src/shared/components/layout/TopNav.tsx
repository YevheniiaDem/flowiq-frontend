"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Search, Settings, User } from "lucide-react";
import { authService, User as AuthUser } from "@/src/services";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/components/ui/avatar";
import { Badge } from "@/src/shared/components/ui/badge";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as AuthUser;
  } catch {
    return null;
  }
}

export function TopNav() {
  const router = useRouter();
  const { t } = usePreferences();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const stored = getStoredUser();
      if (stored) {
        setUser(stored);
      }
      const current = await authService.getCurrentUser();
      if (current) {
        setUser(current);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
    router.refresh();
  };

  const displayName = user?.name || t("topNav.user");
  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("topNav.search")}
            className="h-8 rounded-lg border-border/50 bg-card/30 pl-8 pr-3 text-sm backdrop-blur-sm transition-all focus:border-primary/50 focus:bg-card/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-lg hover:bg-accent/50"
        >
          <Bell className="h-4 w-4" />
          <Badge
            variant="destructive"
            className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full p-0 text-[9px]"
          >
            3
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 gap-2 rounded-lg px-2 hover:bg-accent/50"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.avatar} alt={displayName} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-[10px] text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="max-w-24 truncate text-xs font-medium">{displayName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            <DropdownMenuLabel className="text-xs">
              <div className="font-medium">{displayName}</div>
              <div className="truncate font-normal text-muted-foreground">{user?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg text-xs">
              <User className="mr-2 h-3.5 w-3.5" />
              {t("topNav.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg text-xs">
              <Link href="/settings">
                <Settings className="mr-2 h-3.5 w-3.5" />
                {t("topNav.settings")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="rounded-lg text-xs text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              {t("topNav.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
