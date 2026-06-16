import { Integration } from "@/src/shared/types";
import { FEATURE_FLAGS } from "@/src/config/features";

/**
 * Bank integrations service — placeholder for Phase 2+ (see docs/roadmap/BANK_INTEGRATIONS_ROADMAP.md).
 * Not exposed in the active UI while FEATURE_FLAGS.BANK_INTEGRATIONS_ENABLED is false.
 */
export const integrationsService = {
  isEnabled(): boolean {
    return FEATURE_FLAGS.BANK_INTEGRATIONS_ENABLED;
  },

  async getIntegrations(): Promise<Integration[]> {
    if (!FEATURE_FLAGS.BANK_INTEGRATIONS_ENABLED) {
      return Promise.resolve([]);
    }
    // const response = await apiClient.get('/integrations');
    // return response.data;
    return Promise.resolve([]);
  },

  async connectIntegration(name: string): Promise<void> {
    if (!FEATURE_FLAGS.BANK_INTEGRATIONS_ENABLED) {
      return Promise.reject(new Error("Bank integrations are not enabled"));
    }
    // await apiClient.post(`/integrations/${name}/connect`);
    return Promise.resolve();
  },

  async disconnectIntegration(name: string): Promise<void> {
    if (!FEATURE_FLAGS.BANK_INTEGRATIONS_ENABLED) {
      return Promise.reject(new Error("Bank integrations are not enabled"));
    }
    // await apiClient.post(`/integrations/${name}/disconnect`);
    return Promise.resolve();
  },
};
