export type ReportType =
  | "PROFIT_AND_LOSS"
  | "CASH_FLOW"
  | "REVENUE_SUMMARY"
  | "EXPENSE_SUMMARY"
  | "TAX_SUMMARY"
  | "FOP_SUMMARY";

export type ReportFormat = "PDF" | "CSV" | "EXCEL";

export type ReportStatus = "PENDING" | "GENERATING" | "COMPLETED" | "FAILED";

export type ReportPeriodPreset =
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "QUARTER"
  | "YEAR"
  | "CUSTOM";

export interface ReportJob {
  id: number;
  reportType: ReportType;
  format: ReportFormat;
  status: ReportStatus;
  fileName: string;
  fileSize: number;
  periodFrom: string;
  periodTo: string;
  createdAt: string;
}

export interface ReportDashboardStats {
  generatedReports: number;
  reportsThisMonth: number;
  lastGeneratedAt: string | null;
  mostUsedReportType: ReportType | null;
}

export interface ReportListResponse {
  reports: ReportJob[];
  stats: ReportDashboardStats;
}

export interface MonthlyAmount {
  month: string;
  amount: number;
}

export interface ReportPreview {
  revenue: number;
  expenses: number;
  profit: number;
  taxBurden: number;
  chartData: MonthlyAmount[];
}

export interface GenerateReportRequest {
  reportType: ReportType;
  format: ReportFormat;
  periodPreset?: ReportPeriodPreset;
  dateFrom?: string;
  dateTo?: string;
}
