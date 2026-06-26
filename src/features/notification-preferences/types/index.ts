export type PreferenceCategory = "FINANCIAL" | "TASKS" | "AI" | "IMPORTS" | "REPORTS";

export type NotificationChannel = "IN_APP" | "EMAIL" | "PUSH" | "TELEGRAM";

export type NotificationPreferenceKey =
  | "FINANCIAL_TAXES"
  | "FINANCIAL_LARGE_EXPENSE"
  | "FINANCIAL_LARGE_INCOME"
  | "FINANCIAL_NEGATIVE_CASH_FLOW"
  | "FINANCIAL_LOW_BALANCE"
  | "FINANCIAL_OVERDUE_PAYMENT"
  | "FINANCIAL_TAX_WARNING"
  | "TASK_REMINDER_TODAY"
  | "TASK_REMINDER_3_DAYS"
  | "TASK_REMINDER_WEEK"
  | "TASK_REMINDER_OVERDUE"
  | "AI_ACCOUNTANT_RECOMMENDATIONS"
  | "AI_FINANCIAL_TIPS"
  | "AI_TAX_OPTIMIZATION"
  | "AI_WARNINGS"
  | "AI_FORECAST_ANOMALY"
  | "IMPORT_COMPLETED"
  | "IMPORT_FAILED"
  | "IMPORT_PARTIAL"
  | "IMPORT_CSV_PROCESSING"
  | "REPORT_READY"
  | "REPORT_GENERATION_ERROR"
  | "REPORT_PDF_AVAILABLE"
  | "REPORT_EXCEL_AVAILABLE";

export interface NotificationPreferenceItem {
  key: NotificationPreferenceKey;
  channels: Record<NotificationChannel, boolean>;
}

export interface NotificationPreferenceCategory {
  id: PreferenceCategory;
  preferences: NotificationPreferenceItem[];
}

export interface NotificationPreferencesResponse {
  categories: NotificationPreferenceCategory[];
  channels: NotificationChannel[];
}

export interface NotificationPreferenceUpdateItem {
  key: NotificationPreferenceKey;
  channel: NotificationChannel;
  enabled: boolean;
}

export interface UpdateNotificationPreferencesPayload {
  preferences: NotificationPreferenceUpdateItem[];
}
