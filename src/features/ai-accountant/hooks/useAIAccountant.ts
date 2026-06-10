"use client";

import { useCallback, useEffect, useState } from "react";
import { aiAccountantService } from "../services/aiAccountantService";
import {
  AIAccountantHealth,
  AIRecommendation,
  ChatMessage,
  Forecasts,
  TaxAdvisor,
} from "../types";

export function useAIAccountant() {
  const [health, setHealth] = useState<AIAccountantHealth | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [taxAdvisor, setTaxAdvisor] = useState<TaxAdvisor | null>(null);
  const [forecasts, setForecasts] = useState<Forecasts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatSending, setChatSending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [healthData, recs, tax, forecastData] = await Promise.all([
        aiAccountantService.getHealth(),
        aiAccountantService.getRecommendations(),
        aiAccountantService.getTaxAdvisor(),
        aiAccountantService.getForecasts(),
      ]);
      setHealth(healthData);
      setRecommendations(recs);
      setTaxAdvisor(tax);
      setForecasts(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load AI Accountant data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || chatSending) return;

    setChatMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setChatSending(true);
    try {
      const reply = await aiAccountantService.sendChat(trimmed);
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err instanceof Error ? err.message : "Failed to get response",
        },
      ]);
    } finally {
      setChatSending(false);
    }
  };

  return {
    health,
    recommendations,
    taxAdvisor,
    forecasts,
    loading,
    error,
    chatMessages,
    chatSending,
    sendMessage,
    reload: load,
  };
}
