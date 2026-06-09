export interface Insight {
  id: string;
  type: "warning" | "success" | "info" | "critical";
  category: "revenue" | "expenses" | "cash-flow" | "customers" | "operations";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  timestamp: string;
  metrics?: {
    label: string;
    value: string | number;
    change?: string;
  }[];
  recommendations?: string[];
  actionable: boolean;
}

export const insights: Insight[] = [
  {
    id: "ins-001",
    type: "critical",
    category: "cash-flow",
    title: "Потенційний касовий розрив",
    description:
      "На основі поточних трендів доходів та витрат, прогнозується можливий касовий розрив через 2 місяці. Рекомендується збільшити резерви або оптимізувати витрати.",
    impact: "high",
    timestamp: "2 hours ago",
    metrics: [
      { label: "Прогноз касового розриву", value: "$-15,000" },
      { label: "Очікувана дата", value: "Aug 2026" },
      { label: "Поточний резерв", value: "$45,000" },
    ],
    recommendations: [
      "Відкласти 10% від поточного доходу на резервний фонд",
      "Розглянути можливість скорочення маркетингових витрат на 15%",
      "Прискорити виставлення рахунків клієнтам",
    ],
    actionable: true,
  },
  {
    id: "ins-002",
    type: "success",
    category: "revenue",
    title: "Прибутковий місяць",
    description:
      "Прибуток виріс на 12.5% порівняно з минулим місяцем. Найбільше зростання показали клієнти з Instagram (+35%) та органічний трафік (+28%).",
    impact: "high",
    timestamp: "5 hours ago",
    metrics: [
      { label: "Зростання прибутку", value: "+12.5%" },
      { label: "Instagram", value: "+35%", change: "up" },
      { label: "Органічний трафік", value: "+28%", change: "up" },
    ],
    recommendations: [
      "Збільшити інвестиції в Instagram маркетинг на 20%",
      "Продовжити SEO-стратегію для органічного трафіку",
      "Проаналізувати успішні Instagram кампанії для масштабування",
    ],
    actionable: true,
  },
  {
    id: "ins-003",
    type: "warning",
    category: "expenses",
    title: "Неефективні маркетингові витрати",
    description:
      "Витрати на рекламу зросли на 25%, але продажі збільшилися лише на 8%. ROI маркетингу знизився з 3.2 до 2.1. Рекомендується оптимізація кампаній.",
    impact: "high",
    timestamp: "1 day ago",
    metrics: [
      { label: "Зростання витрат", value: "+25%" },
      { label: "Зростання продажів", value: "+8%" },
      { label: "ROI", value: "2.1", change: "down" },
      { label: "Попередній ROI", value: "3.2" },
    ],
    recommendations: [
      "Призупинити низькоефективні рекламні канали",
      "Перерозподілити бюджет на канали з високим ROI",
      "A/B тестування креативів та таргетингу",
      "Зменшити бюджет Facebook Ads на 30%",
    ],
    actionable: true,
  },
  {
    id: "ins-004",
    type: "success",
    category: "operations",
    title: "Оптимізація інфраструктури",
    description:
      "Витрати на cloud інфраструктуру знизилися на 15% завдяки автоскейлінгу та оптимізації ресурсів. Продуктивність при цьому зросла на 8%.",
    impact: "medium",
    timestamp: "2 days ago",
    metrics: [
      { label: "Економія", value: "$2,400/міс" },
      { label: "Зниження витрат", value: "-15%" },
      { label: "Зростання продуктивності", value: "+8%" },
    ],
    recommendations: [
      "Продовжити моніторинг використання ресурсів",
      "Розглянути Reserved Instances для додаткової економії",
      "Застосувати подібну оптимізацію до тестових середовищ",
    ],
    actionable: false,
  },
  {
    id: "ins-005",
    type: "info",
    category: "customers",
    title: "Сезонний тренд покупок",
    description:
      "AI виявив сезонну закономірність: продажі зростають на 22% у перші 10 днів кожного місяця. Рекомендується запланувати маркетингові акції на цей період.",
    impact: "medium",
    timestamp: "3 days ago",
    metrics: [
      { label: "Середнє зростання", value: "+22%" },
      { label: "Період", value: "1-10 число місяця" },
      { label: "Повторюваність", value: "5 з 6 місяців" },
    ],
    recommendations: [
      "Запустити email-кампанії на початку місяця",
      "Підготувати додаткові промо-пропозиції",
      "Забезпечити достатній запас продукції",
    ],
    actionable: true,
  },
  {
    id: "ins-006",
    type: "info",
    category: "revenue",
    title: "Зростання підписок Premium",
    description:
      "Кількість підписок на Premium план зросла на 18% за останній місяць. Середній чек підвищився з $245 до $250.",
    impact: "medium",
    timestamp: "4 days ago",
    metrics: [
      { label: "Зростання підписок", value: "+18%" },
      { label: "Новий середній чек", value: "$250" },
      { label: "Приріст доходу", value: "$15,300" },
    ],
    recommendations: [
      "Створити програму реферальних винагород",
      "Розробити додаткові Premium features",
      "Провести NPS опитування серед Premium користувачів",
    ],
    actionable: true,
  },
  {
    id: "ins-007",
    type: "warning",
    category: "customers",
    title: "Збільшення відтоку клієнтів",
    description:
      "Churn rate зріс з 3.2% до 4.8% за останній місяць. Основна причина (за опитуваннями): недостатня підтримка та складність інтерфейсу.",
    impact: "high",
    timestamp: "5 days ago",
    metrics: [
      { label: "Поточний churn", value: "4.8%" },
      { label: "Попередній churn", value: "3.2%" },
      { label: "Втрачено клієнтів", value: "47" },
      { label: "Втрачений MRR", value: "$3,760" },
    ],
    recommendations: [
      "Посилити customer support команду",
      "Провести UX аудит та спростити інтерфейс",
      "Запустити програму onboarding для нових клієнтів",
      "Організувати зустрічі з клієнтами, що відмовилися",
    ],
    actionable: true,
  },
  {
    id: "ins-008",
    type: "success",
    category: "operations",
    title: "Покращення conversion rate",
    description:
      "Conversion rate з trial до paid підвищився з 28% до 35% після оновлення onboarding процесу.",
    impact: "high",
    timestamp: "1 week ago",
    metrics: [
      { label: "Новий conversion", value: "35%" },
      { label: "Покращення", value: "+7%" },
      { label: "Додатковий дохід", value: "$12,500" },
    ],
    recommendations: [
      "Продовжити покращення onboarding",
      "Проаналізувати, які зміни найбільше вплинули",
      "Розширити A/B тестування",
    ],
    actionable: false,
  },
];

// Insights summary
export const insightsSummary = {
  total: insights.length,
  critical: insights.filter((i) => i.type === "critical").length,
  warnings: insights.filter((i) => i.type === "warning").length,
  successes: insights.filter((i) => i.type === "success").length,
  actionable: insights.filter((i) => i.actionable).length,
  highImpact: insights.filter((i) => i.impact === "high").length,
};

// Insights by category
export const insightsByCategory = {
  revenue: insights.filter((i) => i.category === "revenue"),
  expenses: insights.filter((i) => i.category === "expenses"),
  cashFlow: insights.filter((i) => i.category === "cash-flow"),
  customers: insights.filter((i) => i.category === "customers"),
  operations: insights.filter((i) => i.category === "operations"),
};
