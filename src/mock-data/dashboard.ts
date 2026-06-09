import { StatCard, AIInsight, BusinessHealthScore } from "@/src/shared/types";

export const dashboardStats: StatCard[] = [
  {
    labelKey: "revenue",
    amount: 245400,
    change: "+20.1%",
    changeType: "positive",
    icon: "dollar-sign",
  },
  {
    labelKey: "expenses",
    amount: 152600,
    change: "-5.2%",
    changeType: "negative",
    icon: "trending-down",
  },
  {
    labelKey: "profit",
    amount: 92800,
    change: "+12.5%",
    changeType: "positive",
    icon: "activity",
  },
  {
    labelKey: "cashFlow",
    amount: 83300,
    change: "+8.3%",
    changeType: "positive",
    icon: "bar-chart-3",
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: "1",
    type: "warning",
    category: "cash-flow",
    title: "Cash Flow Alert",
    description:
      "Можливий касовий розрив через 2 місяці. Рекомендується збільшити резерви або знизити витрати.",
    impact: "high",
    timestamp: "2 hours ago",
    icon: "alert-triangle",
    actionable: true,
  },
  {
    id: "2",
    type: "success",
    category: "revenue",
    title: "Profitable Month",
    description:
      "Прибуток виріс на 12.5% порівняно з минулим місяцем. Клієнти з Instagram приносять найбільший дохід.",
    impact: "high",
    timestamp: "5 hours ago",
    icon: "check-circle-2",
    actionable: false,
  },
  {
    id: "3",
    type: "info",
    category: "expenses",
    title: "Optimization Opportunity",
    description:
      "Витрати на рекламу зросли на 25%, але продажі не збільшилися. Рекомендується оптимізувати кампанії.",
    impact: "medium",
    timestamp: "1 day ago",
    icon: "info",
    actionable: true,
  },
];

export const businessHealth: BusinessHealthScore = {
  score: 94,
  maxScore: 100,
  status: "excellent",
};

export const aiSummary = {
  text: "Ваш бізнес показує сильну динаміку цього місяця. Виручка зросла на 20% порівняно з попереднім місяцем, витрати знизилися на 5%. AI виявив 3 можливості для підвищення прибутковості.",
  badge: "Активний",
};
