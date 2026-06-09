import { Integration } from "@/src/shared/types";

export const integrations: Integration[] = [
  {
    name: "Monobank",
    description: "Connect your Monobank account",
    status: "available",
    icon: "🏦",
  },
  {
    name: "PrivatBank",
    description: "Sync transactions from PrivatBank",
    status: "available",
    icon: "💳",
  },
  {
    name: "Google Sheets",
    description: "Import data from spreadsheets",
    status: "available",
    icon: "📊",
  },
  {
    name: "Shopify",
    description: "E-commerce integration",
    status: "coming",
    icon: "🛍️",
  },
  {
    name: "Telegram",
    description: "Get notifications via Telegram",
    status: "coming",
    icon: "💬",
  },
  {
    name: "Rozetka",
    description: "Marketplace integration",
    status: "coming",
    icon: "🛒",
  },
];
