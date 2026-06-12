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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <motion.section
      data-testid="ai-accountant-chat"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="space-y-3"
    >
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{labels.title}</h2>
        <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
      </div>

      <Card className="flex min-h-[400px] flex-col overflow-hidden rounded-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                <Bot className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="mb-4 text-sm text-muted-foreground">{labels.subtitle}</p>
              <div className="flex max-w-lg flex-col gap-2">
                {labels.suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="justify-start text-left text-xs"
                    onClick={() => onSend(suggestion)}
                  >
                    <Sparkles className="mr-2 h-3 w-3 shrink-0 text-primary" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="mb-0.5 text-[10px] font-medium opacity-70">
                    {msg.role === "user" ? labels.you : labels.assistant}
                  </p>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {sending && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {labels.thinking}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          data-testid="ai-accountant-chat-form"
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-border/50 p-3"
        >
          <ClearableInput
            data-testid="ai-accountant-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={labels.placeholder}
            className="flex-1"
            disabled={sending}
          />
          <Button type="submit" data-testid="ai-accountant-chat-send-btn" size="icon" disabled={sending || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </motion.section>
  );
}
