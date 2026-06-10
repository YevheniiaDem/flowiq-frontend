import { AppLanguage } from "@/src/shared/i18n/types";
import { ActivityPresetId } from "../types";

export interface ActivityPreset {
  id: ActivityPresetId;
  label: string;
  labelUk: string;
  keywords: string[];
  preferredGroups: ("1" | "2" | "3")[];
  suggestedKveds: { code: string; name: string }[];
  activityRisks: string[];
}

export const ACTIVITY_PRESETS: ActivityPreset[] = [
  {
    id: "it-services",
    label: "IT Services",
    labelUk: "IT-послуги",
    keywords: ["it", "software", "programming", "developer", "tech", "saas"],
    preferredGroups: ["2", "3"],
    suggestedKveds: [
      { code: "62.01", name: "Computer programming activities" },
      { code: "62.02", name: "Computer consultancy activities" },
    ],
    activityRisks: [
      "Foreign currency income must be converted at NBU rate on payment date",
    ],
  },
  {
    id: "online-store",
    label: "Online Store",
    labelUk: "Онлайн-магазин",
    keywords: ["store", "shop", "ecommerce", "e-commerce", "retail", "marketplace"],
    preferredGroups: ["1", "2"],
    suggestedKveds: [
      { code: "47.91", name: "Retail sale via mail order or Internet" },
      { code: "47.99", name: "Other retail sale not in stores" },
    ],
    activityRisks: [
      "PRRO (cash register) may be required for card and cash payments",
    ],
  },
  {
    id: "consulting",
    label: "Consulting",
    labelUk: "Консалтинг",
    keywords: ["consulting", "consultant", "advisory", "management"],
    preferredGroups: ["2", "3"],
    suggestedKveds: [
      { code: "70.22", name: "Business and management consultancy" },
      { code: "69.20", name: "Accounting and auditing activities" },
    ],
    activityRisks: [
      "B2B clients may require VAT invoices — consider 5% unified tax rate",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    labelUk: "Маркетинг",
    keywords: ["marketing", "advertising", "agency", "smm", "digital"],
    preferredGroups: ["2"],
    suggestedKveds: [
      { code: "73.11", name: "Advertising agencies" },
      { code: "73.12", name: "Media representation" },
    ],
    activityRisks: [
      "Agency contracts with corporates often require VAT documentation",
    ],
  },
  {
    id: "education",
    label: "Education",
    labelUk: "Освіта",
    keywords: ["education", "training", "courses", "tutor", "coaching"],
    preferredGroups: ["2"],
    suggestedKveds: [
      { code: "85.59", name: "Other education n.e.c." },
      { code: "85.60", name: "Educational support activities" },
    ],
    activityRisks: [
      "Educational licenses may be required for formal certification programs",
    ],
  },
  {
    id: "beauty-salon",
    label: "Beauty Salon",
    labelUk: "Салон краси",
    keywords: ["beauty", "salon", "hairdress", "cosmetic", "spa"],
    preferredGroups: ["1", "2"],
    suggestedKveds: [
      { code: "96.02", name: "Hairdressing and beauty treatment" },
      { code: "96.04", name: "Physical well-being activities" },
    ],
    activityRisks: [
      "Hiring staff moves you out of Group 1 — plan group transition before contracts",
    ],
  },
  {
    id: "freelancing",
    label: "Freelancing",
    labelUk: "Фріланс",
    keywords: ["freelance", "freelancer", "solo", "contractor"],
    preferredGroups: ["2"],
    suggestedKveds: [
      { code: "62.09", name: "Other IT service activities" },
      { code: "74.90", name: "Other professional activities" },
    ],
    activityRisks: [
      "Income from multiple clients must be tracked against annual group limit",
    ],
  },
];

export const INCOME_SLIDER_MAX = 20_000_000;

const ACTIVITY_RISKS_UK: Record<ActivityPresetId, string[]> = {
  "it-services": [
    "Дохід у валюті конвертується за курсом НБУ на дату надходження",
  ],
  "online-store": [
    "Для оплат карткою та готівкою може знадобитися РРО (каса)",
  ],
  consulting: [
    "B2B-клієнти можуть вимагати рахунки з ПДВ — розгляньте ставку 5%",
  ],
  marketing: [
    "Агентські контракти з корпораціями часто вимагають документів з ПДВ",
  ],
  education: [
    "Для формальних сертифікаційних програм можуть знадобитися ліцензії",
  ],
  "beauty-salon": [
    "Найм персоналу виключає Групу 1 — плануйте зміну групи до підписання договорів",
  ],
  freelancing: [
    "Дохід від кількох клієнтів потрібно відстежувати відносно річного ліміту групи",
  ],
};

export function getActivityLabel(preset: ActivityPreset, language: AppLanguage): string {
  return language === "uk" ? preset.labelUk : preset.label;
}

export function getActivityRisks(preset: ActivityPreset, language: AppLanguage): string[] {
  return language === "uk" ? ACTIVITY_RISKS_UK[preset.id] : preset.activityRisks;
}
