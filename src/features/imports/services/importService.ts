import { apiClient } from "@/src/services/api";
import { ImportJob, ImportListResponse } from "../types";

export const importService = {
  async getImports(): Promise<ImportListResponse> {
    const response = await apiClient.get<ImportListResponse>("/imports");
    return response.data;
  },

  async getById(id: number): Promise<ImportJob> {
    const response = await apiClient.get<ImportJob>(`/imports/${id}`);
    return response.data;
  },

  async uploadFile(file: File): Promise<ImportJob> {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<ImportJob>("/imports/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
