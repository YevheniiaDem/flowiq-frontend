"use client";

import { useMemo, useState } from "react";
import { Bell, Loader2, RotateCcw, Search } from "lucide-react";
import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Switch } from "@/src/shared/components/ui/switch";
import { Badge } from "@/src/shared/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/components/ui/accordion";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { cn } from "@/src/shared/utils/utils";
import { SuccessToast } from "@/src/features/profile/components/SuccessToast";
import { useNotificationPreferences } from "../hooks/useNotificationPreferences";
import {
  FUTURE_CHANNELS,
  filterCategoriesBySearch,
  isCategoryFullyEnabled,
  isGlobalFullyEnabled,
  preferenceKeyToI18n,
  setAllChannels,
  setCategoryChannels,
  setPreferenceChannel,
} from "../utils/preference.utils";
import type {
  NotificationChannel,
  NotificationPreferenceKey,
  PreferenceCategory,
} from "../types";

export function NotificationPreferencesView() {
  const { t } = usePreferences();
  const { draft, setDraft, loading, saving, error, hasChanges, save, reset } =
    useNotificationPreferences();
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const labelForKey = (key: NotificationPreferenceKey) =>
    t(`notificationPreferences.items.${preferenceKeyToI18n(key)}` as never);

  const filtered = useMemo(() => {
    if (!draft) return null;
    return filterCategoriesBySearch(draft, search, labelForKey);
  }, [draft, search, t]);

  const globalEnabled = draft ? isGlobalFullyEnabled(draft) : false;

  const handleSave = async () => {
    try {
      await save();
      setToastMessage(t("notificationPreferences.saved"));
    } catch {
      setToastMessage(t("notificationPreferences.saveError"));
    }
  };

  const handleReset = async () => {
    try {
      await reset();
      setToastMessage(t("notificationPreferences.resetSuccess"));
    } catch {
      setToastMessage(t("notificationPreferences.saveError"));
    }
  };

  if (loading) {
    return (
      <Card className="flex items-center justify-center rounded-xl border-border/50 bg-card/50 p-12 backdrop-blur-sm">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!draft || !filtered) {
    return (
      <Card className="rounded-xl border-border/50 bg-card/50 p-6 backdrop-blur-sm">
        <p className="text-sm text-destructive">
          {error ?? t("notificationPreferences.loadError")}
        </p>
      </Card>
    );
  }

  return (
    <div data-testid="notification-preferences-page" className="space-y-4">
      <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{t("notificationPreferences.title")}</h3>
              <p className="text-xs text-muted-foreground">{t("notificationPreferences.subtitle")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {t("notificationPreferences.masterSwitch")}
            </span>
            <Switch
              data-testid="notification-preferences-master-switch"
              checked={globalEnabled}
              onCheckedChange={(checked) =>
                setDraft(setAllChannels(draft, checked))
              }
              aria-label={t("notificationPreferences.masterSwitch")}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-testid="notification-preferences-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("notificationPreferences.search")}
              className="pl-8"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setDraft(setAllChannels(draft, true))}
          >
            {t("notificationPreferences.enableAll")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setDraft(setAllChannels(draft, false))}
          >
            {t("notificationPreferences.disableAll")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={saving}
            onClick={() => void handleReset()}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t("notificationPreferences.resetDefaults")}
          </Button>
        </div>

        <div className="mb-2 hidden gap-2 px-1 text-[10px] font-medium tracking-wide text-muted-foreground uppercase md:grid md:grid-cols-[1fr_repeat(4,minmax(4rem,5rem))]">
          <span>{t("notificationPreferences.columnNotification")}</span>
          {draft.channels.map((channel) => (
            <span key={channel} className="text-center">
              {t(`notificationPreferences.channels.${channel}` as never)}
            </span>
          ))}
        </div>

        <Accordion
          type="multiple"
          defaultValue={filtered.categories.map((c) => c.id)}
          className="rounded-lg border border-border/40"
        >
          {filtered.categories.map((category) => {
            const categoryEnabled = isCategoryFullyEnabled(category, draft.channels);
            return (
              <AccordionItem key={category.id} value={category.id} className="px-3">
                <div className="flex items-center gap-3">
                  <AccordionTrigger className="flex-1 hover:no-underline">
                    <span>{t(`notificationPreferences.categories.${category.id}` as never)}</span>
                  </AccordionTrigger>
                  <Switch
                    data-testid={`notification-preferences-category-${category.id}`}
                    checked={categoryEnabled}
                    onCheckedChange={(checked) =>
                      setDraft(
                        setCategoryChannels(draft, category.id as PreferenceCategory, checked)
                      )
                    }
                    aria-label={t(`notificationPreferences.categories.${category.id}` as never)}
                  />
                </div>
                <AccordionContent>
                  <div className="space-y-2">
                    {category.preferences.map((item) => (
                      <div
                        key={item.key}
                        data-testid={`notification-preference-${item.key}`}
                        className="grid gap-2 rounded-lg border border-border/30 bg-background/40 px-3 py-2 md:grid-cols-[1fr_repeat(4,minmax(4rem,5rem))] md:items-center"
                      >
                        <p className="text-sm">{labelForKey(item.key)}</p>
                        {draft.channels.map((channel) => {
                          const isFuture = FUTURE_CHANNELS.includes(channel);
                          const channelLabel = t(
                            `notificationPreferences.channels.${channel}` as never
                          );
                          return (
                            <div
                              key={channel}
                              className="flex items-center justify-between gap-2 md:justify-center"
                            >
                              <span className="text-xs text-muted-foreground md:hidden">
                                {channelLabel}
                              </span>
                              <div className="flex flex-col items-center gap-1">
                                <Switch
                                  size="sm"
                                  checked={isFuture ? false : item.channels[channel as NotificationChannel]}
                                  disabled={isFuture || saving}
                                  onCheckedChange={(checked) =>
                                    setDraft(
                                      setPreferenceChannel(
                                        draft,
                                        item.key,
                                        channel as NotificationChannel,
                                        checked
                                      )
                                    )
                                  }
                                  aria-label={`${labelForKey(item.key)} — ${channelLabel}`}
                                />
                                {isFuture && (
                                  <Badge
                                    variant="secondary"
                                    className="px-1.5 py-0 text-[9px] font-normal"
                                  >
                                    {t("notificationPreferences.channelFuture")}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        {filtered.categories.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {t("notificationPreferences.noResults")}
          </p>
        )}
      </Card>

      <div className="flex items-center justify-end gap-3">
        {hasChanges && (
          <span className="text-xs text-amber-500">{t("notificationPreferences.unsavedChanges")}</span>
        )}
        <Button
          data-testid="notification-preferences-save-btn"
          type="button"
          disabled={!hasChanges || saving}
          onClick={() => void handleSave()}
          className={cn(saving && "opacity-70")}
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("notificationPreferences.saveChanges")}
        </Button>
      </div>

      <SuccessToast
        message={toastMessage ?? ""}
        open={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
