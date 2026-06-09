import { apiClient } from "./api";
import { AxiosError } from "axios";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  conversationId?: string;
  message: string;
}

export interface SendMessageResponse {
  conversationId: string;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    if (!error.response) {
      const lang = typeof window !== "undefined"
        ? localStorage.getItem("flowiq_language") || "uk"
        : "uk";
      return lang === "en"
        ? "Cannot connect to server. Make sure the backend is running on port 8080."
        : "Не вдалося підключитися до сервера. Переконайтеся, що backend працює на порту 8080.";
    }
    const data = error.response.data as { message?: string };
    if (data?.message) return data.message;
  }
  return fallback;
}

export const chatService = {
  async getConversations(): Promise<ChatConversation[]> {
    const response = await apiClient.get<ChatConversation[]>("/chat/conversations");
    return response.data;
  },

  async getConversation(conversationId: string): Promise<ChatConversation> {
    const response = await apiClient.get<ChatConversation>(`/chat/conversations/${conversationId}`);
    return response.data;
  },

  async sendMessage(request: SendMessageRequest): Promise<SendMessageResponse> {
    try {
      const response = await apiClient.post<SendMessageResponse>("/chat/message", {
        conversationId: request.conversationId ? Number(request.conversationId) : undefined,
        message: request.message,
      });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, "Failed to send message"));
    }
  },
};
