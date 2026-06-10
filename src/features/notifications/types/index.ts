export type NotificationType =
  | "TAX"
  | "FOP_LIMIT"
  | "FINANCIAL"
  | "AI_INSIGHT"
  | "REPORT"
  | "SYSTEM";

export type NotificationSeverity = "INFO" | "SUCCESS" | "WARNING" | "CRITICAL";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  severity: NotificationSeverity;
  read: boolean;
  actionUrl: string | null;
  createdAt: string;
  readAt: string | null;
  expiresAt: string | null;
}

export interface NotificationSummary {
  total: number;
  unread: number;
  critical: number;
  warnings: number;
  success: number;
  thisMonth: number;
}

export interface NotificationPage {
  content: Notification[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type NotificationFilter =
  | "all"
  | "unread"
  | "critical"
  | "warnings"
  | "success"
  | "tax"
  | "ai"
  | "reports"
  | "imports";

export type NotificationDateGroup = "today" | "yesterday" | "thisWeek" | "older";
