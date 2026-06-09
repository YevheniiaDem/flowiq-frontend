"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Card } from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import { MessageSquare, Send, Sparkles, Loader2 } from "lucide-react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { chatService, ChatMessage } from "@/src/services";

const SUGGESTIONS = ["revenue", "expenses", "forecast"] as const;

export function ChatView() {
  const { t } = usePreferences();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setError(null);
    setSending(true);

    try {
      const response = await chatService.sendMessage({
        conversationId: conversationId ?? undefined,
        message: trimmed,
      });

      setConversationId(response.conversationId);
      setMessages((prev) => [...prev, response.userMessage, response.assistantMessage]);
      setInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("chat.error"));
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-3">
        <h1 className="text-2xl font-bold tracking-tight">{t("chat.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("chat.subtitle")}</p>
      </div>

      <Card className="flex min-h-0 flex-1 flex-col rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex-1 overflow-y-auto p-4">
          {!hasMessages ? (
            <div className="flex h-full min-h-[320px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t("chat.startConversation")}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{t("chat.startHint")}</p>
                <div className="mx-auto flex max-w-md flex-col gap-2">
                  {SUGGESTIONS.map((key) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="justify-start rounded-lg border-border/50 text-xs"
                      size="sm"
                      disabled={sending}
                      onClick={() => sendMessage(t(`chat.suggestions.${key}`))}
                    >
                      <MessageSquare className="mr-2 h-3.5 w-3.5" />
                      {t(`chat.suggestions.${key}`)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/60 text-foreground"
                      }`}
                    >
                      <p className="mb-1 text-[10px] font-medium opacity-70">
                        {isUser ? t("chat.you") : t("chat.assistant")}
                      </p>
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                );
              })}
              {sending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {t("chat.thinking")}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-border/50 p-3">
          {error && (
            <p className="mb-2 text-xs text-destructive">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder={t("chat.placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              className="h-9 rounded-lg border-border/50 bg-background/50 text-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-lg"
              disabled={sending || !input.trim()}
              aria-label={t("chat.send")}
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
