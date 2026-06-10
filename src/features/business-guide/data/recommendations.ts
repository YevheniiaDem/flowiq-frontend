import { SmartRecommendation } from "../types";

export const mockRecommendations: SmartRecommendation[] = [
  {
    id: "income-limit",
    title: "Income approaching limit",
    message:
      "Your income is approaching the limit. You have used approximately 91% of your annual FOP Group 2 threshold. Plan ahead to avoid exceeding the cap.",
    severity: "warning",
    actionLabel: "View income limits",
    actionHref: "/business-guide/groups/2",
  },
  {
    id: "additional-kveds",
    title: "Additional KVEDs may be needed",
    message:
      "You may need additional KVEDs. Your current activities suggest expanding your registered codes to cover consulting and digital marketing services.",
    severity: "info",
    actionLabel: "Explore KVEDs",
    actionHref: "/business-guide#kved-explorer",
  },
  {
    id: "group-switch",
    title: "Consider group transition",
    message:
      "Consider switching to another group. Based on your revenue growth and hiring plans, FOP Group 3 may offer better scalability for your business.",
    severity: "info",
    actionLabel: "Compare groups",
    actionHref: "/business-guide/groups/3",
  },
];
