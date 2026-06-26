"use client";

import { Loader2, Monitor, Shield } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/components/ui/button";
import { Card } from "@/src/shared/components/ui/card";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { authService } from "@/src/services/auth.service";
import { useSessions } from "../hooks/useSessions";
import { profileService } from "../services/profile.service";
import { ChangePasswordForm } from "./ChangePasswordForm";

interface SecurityTabProps {
  onSuccess: (message: string) => void;
}

export function SecurityTab({ onSuccess }: SecurityTabProps) {
  const { t } = usePreferences();
  const router = useRouter();
  const { sessions, loading, error, refresh } = useSessions();
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleLogoutCurrent = async () => {
    setActionLoading("current");
    setActionError(null);
    try {
      await profileService.logoutCurrentSession();
      await authService.logout();
      router.replace("/login");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : t("profile.security.sessionError"));
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogoutAll = async () => {
    setActionLoading("all");
    setActionError(null);
    try {
      await profileService.logoutAllSessions();
      await authService.logout();
      router.replace("/login");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : t("profile.security.sessionError"));
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (value?: string | null) => {
    if (!value) return "—";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  return (
    <div className="space-y-4">
      <ChangePasswordForm onSuccess={onSuccess} />

      <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Shield className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t("profile.security.sessionsTitle")}</h3>
            <p className="text-xs text-muted-foreground">{t("profile.security.sessionsHint")}</p>
          </div>
        </div>

        {(error || actionError) && (
          <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {actionError ?? error}
          </div>
        )}

        {loading ? (
          <div className="flex h-24 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-xs text-muted-foreground">{t("profile.security.noSessions")}</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="rounded-lg border border-border/50 bg-background/40 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <Monitor className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {session.deviceLabel ?? t("profile.security.unknownDevice")}
                        {session.current && (
                          <span className="ml-2 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                            {t("profile.security.currentDevice")}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.browser} · {session.ipAddress ?? "—"}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {t("profile.security.loginTime")}: {formatDate(session.loginAt)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {t("profile.security.lastActivity")}: {formatDate(session.lastActivityAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={actionLoading !== null}
            onClick={() => void handleLogoutCurrent()}
          >
            {actionLoading === "current" && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
            {t("profile.security.logoutCurrent")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={actionLoading !== null}
            onClick={() => void handleLogoutAll()}
          >
            {actionLoading === "all" && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
            {t("profile.security.logoutAll")}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => void refresh()}>
            {t("profile.security.refreshSessions")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
