import { apiClient } from "@/src/services/api";
import {
  GenerateReportRequest,
  ReportJob,
  ReportListResponse,
  ReportPeriodPreset,
  ReportPreview,
} from "../types";

export const reportsService = {
  async getReports(): Promise<ReportListResponse> {
    const response = await apiClient.get<ReportListResponse>("/reports");
    return response.data;
  },

  async getById(id: number): Promise<ReportJob> {
    const response = await apiClient.get<ReportJob>(`/reports/${id}`);
    return response.data;
  },

  async getPreview(params: {
    periodPreset?: ReportPeriodPreset;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ReportPreview> {
    const response = await apiClient.get<ReportPreview>("/reports/preview", { params });
    return response.data;
  },

  async generate(request: GenerateReportRequest): Promise<ReportJob> {
    const response = await apiClient.post<ReportJob>("/reports/generate", request);
    return response.data;
  },

  async downloadReport(id: number): Promise<Blob> {
    const response = await apiClient.get(`/reports/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  },
};
