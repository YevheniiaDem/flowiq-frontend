"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/src/shared/components/ui/card";
import { Button } from "@/src/shared/components/ui/button";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import { Bot, Loader2, Send, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";
import { cn } from "@/src/shared/utils/utils";

interface AIAccountantChatProps {
  messages: ChatMessage[];
  sending: boolean;
  onSend: (message: string) => Promise<void>;
  labels: {
    title: string;
    subtitle: string;
    placeholder: string;
    you: string;
    assistant: string;
    thinking: string;
    quickQuestions: string;
    suggestions: string[];
  };
}

export function AIAccountantChat({
  messages,
  sending,
  onSend,
  labels,
}: AIAccountantChatProps) {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length === 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;
    onSend(input);
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    if (sending) return;
    onSend(text);
  };

  return (
    <motion.section
      data-testid="ai-accountant-chat"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="flex h-full min-h-[420px] flex-col"
    >
      <Card className="flex flex-1 flex-col overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold tracking-tight">{labels.title}</h2>
              <p className="truncate text-xs text-muted-foreground">{labels.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {isEmpty ? (
              <div className="flex flex-col gap-4 py-2">
                <p className="text-center text-xs text-muted-foreground">{labels.quickQuestions}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {labels.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={sending}
                      onClick={() => handleSuggestion(suggestion)}
                      className={cn(
                        "group flex items-start gap-2 rounded-lg border border-border/50 bg-card/80 px-3 py-2.5 text-left text-xs transition-all",
                        "hover:border-primary/30 hover:bg-primary/5 disabled:opacity-50"
                      )}
                    >
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary opacity-70 group-hover:opacity-100" />
                      <span className="leading-snug text-foreground/90">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn("flex gap-2.5", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border/40 bg-muted/60 text-foreground"
                    )}
                  >
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wide opacity-60">
                      {msg.role === "user" ? labels.you : labels.assistant}
                    </p>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {sending && (
              <div className="flex items-center gap-2 px-1 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                {labels.thinking}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {!isEmpty && (
            <div className="border-t border-border/30 px-3 py-2">
              <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                {labels.suggestions.slice(0, 3).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={sending}
                    onClick={() => handleSuggestion(suggestion)}
                    className="shrink-0 rounded-full border border-border/50 bg-muted/40 px-2.5 py-1 text-[10px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground disabled:opacity-50"
                  >
                    {suggestion.length > 42 ? `${suggestion.slice(0, 42)}…` : suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border/50 bg-muted/15 p-4">
            <form
              data-testid="ai-accountant-chat-form"
              onSubmit={handleSubmit}
              className="flex w-full items-center gap-2.5"
            >
              <ClearableInput
                data-testid="ai-accountant-chat-input"
                containerClassName="min-w-0 flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={labels.placeholder}
                className="h-11 rounded-xl border-border/60 bg-background px-4 text-sm shadow-sm"
                disabled={sending}
              />
              <Button
                type="submit"
                data-testid="ai-accountant-chat-send-btn"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-xl"
                disabled={sending || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </motion.section>
  );
}
