"use client";

import { Card } from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";

export function ChatView() {
  const { t } = usePreferences();

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-3">
        <h1 className="text-2xl font-bold tracking-tight">{t("chat.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("chat.subtitle")}</p>
      </div>

      <Card className="flex flex-1 flex-col rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{t("chat.startConversation")}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{t("chat.startHint")}</p>
            <div className="mx-auto flex max-w-md flex-col gap-2">
              <Button
                variant="outline"
                className="justify-start rounded-lg border-border/50 text-xs"
                size="sm"
              >
                <MessageSquare className="mr-2 h-3.5 w-3.5" />
                {t("chat.suggestions.revenue")}
              </Button>
              <Button
                variant="outline"
                className="justify-start rounded-lg border-border/50 text-xs"
                size="sm"
              >
                <MessageSquare className="mr-2 h-3.5 w-3.5" />
                {t("chat.suggestions.expenses")}
              </Button>
              <Button
                variant="outline"
                className="justify-start rounded-lg border-border/50 text-xs"
                size="sm"
              >
                <MessageSquare className="mr-2 h-3.5 w-3.5" />
                {t("chat.suggestions.forecast")}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 p-3">
          <div className="flex gap-2">
            <Input
              placeholder={t("chat.placeholder")}
              className="h-9 rounded-lg border-border/50 bg-background/50 text-sm"
            />
            <Button size="icon" className="h-9 w-9 rounded-lg" aria-label={t("chat.send")}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
