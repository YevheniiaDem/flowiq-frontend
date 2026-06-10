import { AppLanguage } from "@/src/shared/i18n/types";
import { getBusinessGuideLocale } from "../data/locale";
import {
  BusinessGuideSearchResult,
  BusinessProfile,
  FopGroupDetail,
  FopGroupSummary,
  Kved,
  SmartRecommendation,
  TaxType,
} from "../types";

export const businessGuideService = {
  async getBusinessProfile(language: AppLanguage): Promise<BusinessProfile> {
    // const response = await apiClient.get('/business-guide/profile');
    // return response.data;
    return Promise.resolve(getBusinessGuideLocale(language).mockBusinessProfile);
  },

  async getFopGroups(language: AppLanguage): Promise<FopGroupSummary[]> {
    // const response = await apiClient.get('/business-guide/groups');
    // return response.data;
    return Promise.resolve(getBusinessGuideLocale(language).mockFopGroupSummaries);
  },

  async getFopGroupBySlug(slug: string, language: AppLanguage): Promise<FopGroupDetail | null> {
    // const response = await apiClient.get(`/business-guide/groups/${slug}`);
    // return response.data;
    return Promise.resolve(getBusinessGuideLocale(language).getFopGroupBySlug(slug) ?? null);
  },

  async getAllFopGroupDetails(language: AppLanguage): Promise<FopGroupDetail[]> {
    // const response = await apiClient.get('/business-guide/groups/details');
    // return response.data;
    return Promise.resolve(getBusinessGuideLocale(language).mockFopGroupDetails);
  },

  async getTaxes(language: AppLanguage): Promise<TaxType[]> {
    // const response = await apiClient.get('/business-guide/taxes');
    // return response.data;
    return Promise.resolve(getBusinessGuideLocale(language).mockTaxes);
  },

  async getKveds(language: AppLanguage): Promise<Kved[]> {
    // const response = await apiClient.get('/business-guide/kveds');
    // return response.data;
    return Promise.resolve(getBusinessGuideLocale(language).mockKveds);
  },

  async searchKveds(query: string, language: AppLanguage): Promise<Kved[]> {
    // const response = await apiClient.get('/business-guide/kveds/search', { params: { q: query } });
    // return response.data;
    const kveds = getBusinessGuideLocale(language).mockKveds;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return kveds;

    return Promise.resolve(
      kveds.filter(
        (kved) =>
          kved.code.toLowerCase().includes(normalized) ||
          kved.name.toLowerCase().includes(normalized) ||
          kved.category.toLowerCase().includes(normalized)
      )
    );
  },

  async getRecommendations(language: AppLanguage): Promise<SmartRecommendation[]> {
    // const response = await apiClient.get('/business-guide/recommendations');
    // return response.data;
    return Promise.resolve(getBusinessGuideLocale(language).mockRecommendations);
  },

  async search(query: string, language: AppLanguage): Promise<BusinessGuideSearchResult[]> {
    // const response = await apiClient.get('/business-guide/search', { params: { q: query } });
    // return response.data;
    const locale = getBusinessGuideLocale(language);
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    const results: BusinessGuideSearchResult[] = [];

    locale.mockFopGroupSummaries.forEach((group) => {
      if (
        group.name.toLowerCase().includes(normalized) ||
        group.shortDescription.toLowerCase().includes(normalized)
      ) {
        results.push({
          type: "group",
          id: group.id,
          title: group.name,
          subtitle: group.shortDescription,
          href: `/business-guide/groups/${group.slug}`,
        });
      }
    });

    locale.mockTaxes.forEach((tax) => {
      if (
        tax.name.toLowerCase().includes(normalized) ||
        tax.description.toLowerCase().includes(normalized)
      ) {
        results.push({
          type: "tax",
          id: tax.id,
          title: tax.name,
          subtitle: tax.description.slice(0, 100),
          href: "/business-guide#taxes",
        });
      }
    });

    locale.mockKveds
      .filter(
        (kved) =>
          kved.code.toLowerCase().includes(normalized) ||
          kved.name.toLowerCase().includes(normalized) ||
          kved.category.toLowerCase().includes(normalized)
      )
      .slice(0, 5)
      .forEach((kved) => {
        results.push({
          type: "kved",
          id: kved.code,
          title: `${kved.code} — ${kved.name}`,
          subtitle: kved.category,
          href: "/business-guide#kved-explorer",
        });
      });

    return Promise.resolve(results);
  },
};
