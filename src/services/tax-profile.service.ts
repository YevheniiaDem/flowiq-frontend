import { getTaxProfile } from "@/src/mock-data/tax-profile.localized";
import { AppLanguage } from "@/src/shared/i18n/types";
import { TaxProfile } from "@/src/shared/types";

export const taxProfileService = {
  async getTaxProfile(language: AppLanguage): Promise<TaxProfile> {
    // const response = await apiClient.get<TaxProfile>("/dashboard/tax-profile");
    // return response.data;
    return Promise.resolve(getTaxProfile(language));
  },

  async refreshTaxProfile(language: AppLanguage): Promise<TaxProfile> {
    // const response = await apiClient.post<TaxProfile>("/dashboard/tax-profile/refresh");
    // return response.data;
    return Promise.resolve(getTaxProfile(language));
  },
};
