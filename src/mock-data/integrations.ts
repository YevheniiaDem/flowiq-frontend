import { Integration } from "@/src/shared/types";

export const integrations: Integration[] = [
  {
    id: "monobank",
    name: "Monobank",
    description: "Connect your Monobank account",
    status: "available",
    logo: "/integrations/monobank.svg",
    logoClassName: "bg-[#1A1A1C] p-1",
  },
  {
    id: "privatbank",
    name: "PrivatBank",
    description: "Sync transactions from PrivatBank",
    status: "available",
    logo: "/integrations/privatbank.png",
    logoClassName: "h-12 w-[4.5rem] bg-white p-0.5",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Import data from spreadsheets",
    status: "available",
    icon: "📊",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "E-commerce integration",
    status: "coming",
    icon: "🛍️",
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Get notifications via Telegram",
    status: "coming",
    icon: "💬",
  },
  {
    id: "rozetka",
    name: "Rozetka",
    description: "Marketplace integration",
    status: "coming",
    icon: "🛒",
  },
];
