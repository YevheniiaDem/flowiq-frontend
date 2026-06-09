import { apiClient } from "./api";
import { Report } from "@/src/shared/types";

export const reportsService = {
  // Fetch all reports
  async getReports(): Promise<Report[]> {
    // const response = await apiClient.get('/reports');
    // return response.data;
    return Promise.resolve([]);
  },

  // Download report
  async downloadReport(reportId: string): Promise<Blob> {
    // const response = await apiClient.get(`/reports/${reportId}/download`, {
    //   responseType: 'blob',
    // });
    // return response.data;
    return Promise.resolve(new Blob());
  },

  // Generate new report
  async generateReport(type: string, params: any): Promise<Report> {
    // const response = await apiClient.post('/reports/generate', { type, ...params });
    // return response.data;
    return Promise.resolve({ title: "", date: "", type: "" });
  },
};
