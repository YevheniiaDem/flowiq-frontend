import { apiClient } from "./api";
import { Integration } from "@/src/shared/types";

export const integrationsService = {
  // Fetch all integrations
  async getIntegrations(): Promise<Integration[]> {
    // const response = await apiClient.get('/integrations');
    // return response.data;
    return Promise.resolve([]);
  },

  // Connect integration
  async connectIntegration(name: string): Promise<void> {
    // await apiClient.post(`/integrations/${name}/connect`);
    return Promise.resolve();
  },

  // Disconnect integration
  async disconnectIntegration(name: string): Promise<void> {
    // await apiClient.post(`/integrations/${name}/disconnect`);
    return Promise.resolve();
  },
};
