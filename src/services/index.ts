export { apiClient } from "./api";
export { authService } from "./auth.service";
export { dashboardService } from "./dashboard.service";
export { chatService } from "./chat.service";
export { integrationsService } from "./integrations.service";
export { reportsService } from "./reports.service";

// Re-export types
export type { User, LoginCredentials, RegisterData, AuthResponse } from "./auth.service";
export type {
  ChatMessage,
  ChatConversation,
  SendMessageRequest,
  AIInsightResponse,
} from "./chat.service";
