export type ImportStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "PARTIAL"
  | "FAILED";

export interface ImportJob {
  id: number;
  fileName: string;
  fileSize: number;
  status: ImportStatus;
  rowsProcessed: number;
  rowsImported: number;
  errorsCount: number;
  bankFormat?: string;
  createdAt: string;
}

export interface ImportStats {
  importedFiles: number;
  importedTransactions: number;
  lastImport: string | null;
  successRate: number;
}

export interface ImportListResponse {
  jobs: ImportJob[];
  stats: ImportStats;
}
