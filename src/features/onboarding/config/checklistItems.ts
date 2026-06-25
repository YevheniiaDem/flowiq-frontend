import type { ChecklistItemConfig } from "../types/activation";

export const CHECKLIST_ITEMS: ChecklistItemConfig[] = [
  {
    id: "product_tour",
    titleKey: "activation.checklist.productTour.title",
    descriptionKey: "activation.checklist.productTour.description",
    href: "/",
    ctaKey: "activation.checklist.productTour.cta",
  },
  {
    id: "first_import",
    titleKey: "activation.checklist.firstImport.title",
    descriptionKey: "activation.checklist.firstImport.description",
    href: "/imports",
    ctaKey: "activation.checklist.firstImport.cta",
  },
  {
    id: "review_transactions",
    titleKey: "activation.checklist.reviewTransactions.title",
    descriptionKey: "activation.checklist.reviewTransactions.description",
    href: "/transactions",
    ctaKey: "activation.checklist.reviewTransactions.cta",
  },
  {
    id: "ai_accountant",
    titleKey: "activation.checklist.aiAccountant.title",
    descriptionKey: "activation.checklist.aiAccountant.description",
    href: "/ai-accountant",
    ctaKey: "activation.checklist.aiAccountant.cta",
  },
  {
    id: "forecasts",
    titleKey: "activation.checklist.forecasts.title",
    descriptionKey: "activation.checklist.forecasts.description",
    href: "/forecasts",
    ctaKey: "activation.checklist.forecasts.cta",
  },
  {
    id: "first_task",
    titleKey: "activation.checklist.firstTask.title",
    descriptionKey: "activation.checklist.firstTask.description",
    href: "/tasks",
    ctaKey: "activation.checklist.firstTask.cta",
  },
];
