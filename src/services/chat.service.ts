import { apiClient } from "./api";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  metadata?: {
    sources?: string[];
    confidence?: number;
    suggestions?: string[];
  };
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
  context?: Record<string, any>;
}

export interface AIInsightResponse {
  insight: string;
  category: "revenue" | "expenses" | "cash-flow" | "customers" | "operations";
  confidence: number;
  recommendations: string[];
}

// Mock conversations data
const mockConversations: ChatConversation[] = [
  {
    id: "conv-001",
    title: "Cash Flow Analysis",
    messages: [
      {
        id: "msg-001",
        role: "user",
        content: "Як виглядає мій cash flow на цей місяць?",
        timestamp: "2026-06-09T10:30:00Z",
      },
      {
        id: "msg-002",
        role: "assistant",
        content:
          "Ваш cash flow за червень 2026 складає $83,300, що на 8.3% вище порівняно з минулим місяцем. Основні надходження: онлайн продажі ($145k) та підписки ($58k). Витрати знизилися на 5.2% завдяки оптимізації інфраструктури.",
        timestamp: "2026-06-09T10:30:15Z",
        metadata: {
          sources: ["dashboard", "revenue", "expenses"],
          confidence: 0.95,
        },
      },
    ],
    createdAt: "2026-06-09T10:30:00Z",
    updatedAt: "2026-06-09T10:30:15Z",
  },
  {
    id: "conv-002",
    title: "Marketing ROI",
    messages: [
      {
        id: "msg-003",
        role: "user",
        content: "Який ROI моїх маркетингових кампаній?",
        timestamp: "2026-06-08T15:20:00Z",
      },
      {
        id: "msg-004",
        role: "assistant",
        content:
          "ROI ваших маркетингових кампаній знизився з 3.2 до 2.1. Витрати на рекламу зросли на 25%, але продажі збільшилися лише на 8%. Рекомендую оптимізувати Facebook Ads (зменшити бюджет на 30%) та збільшити інвестиції в Instagram (+20%), де ROI складає 4.5.",
        timestamp: "2026-06-08T15:20:22Z",
        metadata: {
          sources: ["expenses", "insights"],
          confidence: 0.88,
          suggestions: [
            "Оптимізувати Facebook Ads",
            "Збільшити бюджет Instagram",
            "A/B тестування креативів",
          ],
        },
      },
    ],
    createdAt: "2026-06-08T15:20:00Z",
    updatedAt: "2026-06-08T15:20:22Z",
  },
];

// Mock AI responses
const mockAIResponses = [
  "На основі аналізу ваших даних, я рекомендую звернути увагу на зростання churn rate з 3.2% до 4.8%. Це призведе до втрати ~$3,760 MRR.",
  "Ваш прибуток зріс на 12.5% завдяки Instagram маркетингу (+35%) та органічному трафіку (+28%). Рекомендую продовжити цю стратегію.",
  "Прогнозується можливий касовий розрив через 2 місяці на суму $15,000. Рекомендації: 1) Відкласти 10% резервного фонду, 2) Скоротити маркетинг на 15%, 3) Прискорити виставлення рахунків.",
  "Витрати на cloud інфраструктуру знизилися на 15% ($2,400/міс) завдяки автоскейлінгу. При цьому продуктивність зросла на 8%. Рекомендую застосувати подібну оптимізацію до тестових середовищ.",
  "AI виявив сезонну закономірність: продажі зростають на 22% у перші 10 днів кожного місяця. Рекомендую запланувати email-кампанії та промо-акції на цей період.",
];

export const chatService = {
  // Get all conversations
  async getConversations(): Promise<ChatConversation[]> {
    // const response = await apiClient.get('/chat/conversations');
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockConversations;
  },

  // Get single conversation
  async getConversation(conversationId: string): Promise<ChatConversation | null> {
    // const response = await apiClient.get(`/chat/conversations/${conversationId}`);
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 200));
    const conv = mockConversations.find((c) => c.id === conversationId);
    return conv || null;
  },

  // Send message to AI
  async sendMessage(request: SendMessageRequest): Promise<ChatMessage> {
    // const response = await apiClient.post('/chat/message', request);
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock AI response
    const randomResponse =
      mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];

    const aiMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "assistant",
      content: randomResponse,
      timestamp: new Date().toISOString(),
      metadata: {
        sources: ["dashboard", "insights", "forecasts"],
        confidence: 0.85 + Math.random() * 0.1,
        suggestions: [
          "Переглянути детальну аналітику",
          "Створити звіт",
          "Налаштувати попередження",
        ],
      },
    };

    return aiMessage;
  },

  // Create new conversation
  async createConversation(title: string, firstMessage: string): Promise<ChatConversation> {
    // const response = await apiClient.post('/chat/conversations', { title, firstMessage });
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 800));

    const userMessage: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: firstMessage,
      timestamp: new Date().toISOString(),
    };

    const newConversation: ChatConversation = {
      id: "conv-" + Date.now(),
      title: title || "New Conversation",
      messages: [userMessage],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return newConversation;
  },

  // Delete conversation
  async deleteConversation(conversationId: string): Promise<{ success: boolean }> {
    // const response = await apiClient.delete(`/chat/conversations/${conversationId}`);
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true };
  },

  // Get AI insights about specific topic
  async getAIInsight(topic: string, dataContext?: Record<string, any>): Promise<AIInsightResponse> {
    // const response = await apiClient.post('/chat/insight', { topic, dataContext });
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const insights: Record<string, AIInsightResponse> = {
      revenue: {
        insight:
          "Дохід зростає стабільно на 5-8% щомісяця. Instagram та органічний трафік показують найкращі результати.",
        category: "revenue",
        confidence: 0.92,
        recommendations: [
          "Збільшити інвестиції в Instagram маркетинг",
          "Продовжити SEO-стратегію",
          "Запустити реферальну програму",
        ],
      },
      expenses: {
        insight:
          "Витрати знижуються завдяки оптимізації інфраструктури, але маркетингові витрати зросли на 25% з низьким ROI.",
        category: "expenses",
        confidence: 0.89,
        recommendations: [
          "Оптимізувати рекламні кампанії",
          "Зменшити бюджет Facebook Ads",
          "Перерозподілити бюджет на ефективні канали",
        ],
      },
      cashflow: {
        insight:
          "Прогнозується касовий розрив через 2 місяці на суму $15,000. Необхідно вжити термінових заходів.",
        category: "cash-flow",
        confidence: 0.87,
        recommendations: [
          "Створити резервний фонд 10% від доходу",
          "Прискорити виставлення рахунків",
          "Розглянути short-term фінансування",
        ],
      },
    };

    return (
      insights[topic.toLowerCase()] || {
        insight: "Аналіз даних...",
        category: "operations",
        confidence: 0.75,
        recommendations: ["Зібрати більше даних для точнішого аналізу"],
      }
    );
  },

  // Clear conversation history
  async clearHistory(conversationId: string): Promise<{ success: boolean }> {
    // const response = await apiClient.delete(`/chat/conversations/${conversationId}/history`);
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 250));
    return { success: true };
  },

  // Export conversation
  async exportConversation(
    conversationId: string,
    format: "json" | "txt" | "pdf"
  ): Promise<Blob> {
    // const response = await apiClient.get(`/chat/conversations/${conversationId}/export`, {
    //   params: { format },
    //   responseType: 'blob'
    // });
    // return response.data;

    await new Promise((resolve) => setTimeout(resolve, 500));

    const conv = mockConversations.find((c) => c.id === conversationId);
    const content = JSON.stringify(conv, null, 2);

    return new Blob([content], { type: "application/json" });
  },
};
