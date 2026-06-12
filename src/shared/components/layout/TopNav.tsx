"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Search, Settings, User } from "lucide-react";
import { authService, User as AuthUser } from "@/src/services";
import { NotificationBell } from "@/src/features/notifications";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { ThemeToggle } from "@/src/shared/components/theme/ThemeToggle";
import { Button } from "@/src/shared/components/ui/button";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/components/ui/avatar";

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
  const [search, setSearch] = useState("");

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
        <ClearableInput
          containerClassName="w-full max-w-sm"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t("topNav.search")}
          clearAriaLabel={t("common.clearField")}
          leftIcon={<Search className="h-3.5 w-3.5" />}
          className="h-8 rounded-lg border-border/50 bg-card/30 text-sm backdrop-blur-sm transition-all focus:border-primary/50 focus:bg-card/50"
        />
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationBell />

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
