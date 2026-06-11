import { apiClient } from "@/src/services/api";
import {
  KnowledgeArticleDetail,
  KnowledgeArticlePage,
  KnowledgeCategory,
  KnowledgeCategoryInfo,
  KnowledgeDashboardSnapshot,
  KnowledgeSearchResponse,
} from "../types/knowledge";

export const knowledgeService = {
  async getArticles(
    page = 0,
    size = 20,
    category?: KnowledgeCategory,
    tag?: string
  ): Promise<KnowledgeArticlePage> {
    const response = await apiClient.get<KnowledgeArticlePage>(
      "/business-guide/articles",
      { params: { page, size, category, tag } }
    );
    return response.data;
  },

  async getArticle(slug: string): Promise<KnowledgeArticleDetail> {
    const response = await apiClient.get<KnowledgeArticleDetail>(
      `/business-guide/articles/${slug}`
    );
    return response.data;
  },

  async getCategories(): Promise<KnowledgeCategoryInfo[]> {
    const response = await apiClient.get<KnowledgeCategoryInfo[]>(
      "/business-guide/categories"
    );
    return response.data;
  },

  async search(
    q: string,
    page = 0,
    size = 20,
    category?: KnowledgeCategory
  ): Promise<KnowledgeSearchResponse> {
    const response = await apiClient.get<KnowledgeSearchResponse>(
      "/business-guide/search",
      { params: { q, page, size, category } }
    );
    return response.data;
  },

  async getDashboardSnapshot(): Promise<KnowledgeDashboardSnapshot> {
    const response = await apiClient.get<KnowledgeDashboardSnapshot>(
      "/dashboard/business-guide-snapshot"
    );
    return response.data;
  },
};
