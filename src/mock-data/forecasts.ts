export interface ForecastDataPoint {
  date: string;
  value: number;
  confidence: "high" | "medium" | "low";
  lower: number; // Lower bound
  upper: number; // Upper bound
}

export interface MonthlyForecast {
  month: string;
  predicted: number;
  lower: number;
  upper: number;
  confidence: number;
}

// Revenue forecast (next 6 months)
export const revenueForecast: MonthlyForecast[] = [
  {
    month: "Jan 2027",
    predicted: 258000,
    lower: 245000,
    upper: 271000,
    confidence: 92,
  },
  {
    month: "Feb 2027",
    predicted: 270000,
    lower: 255000,
    upper: 285000,
    confidence: 88,
  },
  {
    month: "Mar 2027",
    predicted: 285000,
    lower: 268000,
    upper: 302000,
    confidence: 85,
  },
  {
    month: "Apr 2027",
    predicted: 298000,
    lower: 278000,
    upper: 318000,
    confidence: 82,
  },
  {
    month: "May 2027",
    predicted: 312000,
    lower: 288000,
    upper: 336000,
    confidence: 78,
  },
  {
    month: "Jun 2027",
    predicted: 325000,
    lower: 296000,
    upper: 354000,
    confidence: 75,
  },
];

// Expense forecast (next 6 months)
export const expenseForecast: MonthlyForecast[] = [
  {
    month: "Jan 2027",
    predicted: 158000,
    lower: 152000,
    upper: 164000,
    confidence: 94,
  },
  {
    month: "Feb 2027",
    predicted: 162000,
    lower: 156000,
    upper: 168000,
    confidence: 91,
  },
  {
    month: "Mar 2027",
    predicted: 168000,
    lower: 161000,
    upper: 175000,
    confidence: 88,
  },
  {
    month: "Apr 2027",
    predicted: 172000,
    lower: 164000,
    upper: 180000,
    confidence: 85,
  },
  {
    month: "May 2027",
    predicted: 178000,
    lower: 169000,
    upper: 187000,
    confidence: 82,
  },
  {
    month: "Jun 2027",
    predicted: 185000,
    lower: 175000,
    upper: 195000,
    confidence: 79,
  },
];

// Profit forecast (next 6 months)
export const profitForecast: MonthlyForecast[] = [
  {
    month: "Jan 2027",
    predicted: 100000,
    lower: 85000,
    upper: 115000,
    confidence: 88,
  },
  {
    month: "Feb 2027",
    predicted: 108000,
    lower: 91000,
    upper: 125000,
    confidence: 84,
  },
  {
    month: "Mar 2027",
    predicted: 117000,
    lower: 98000,
    upper: 136000,
    confidence: 81,
  },
  {
    month: "Apr 2027",
    predicted: 126000,
    lower: 105000,
    upper: 147000,
    confidence: 77,
  },
  {
    month: "May 2027",
    predicted: 134000,
    lower: 111000,
    upper: 157000,
    confidence: 74,
  },
  {
    month: "Jun 2027",
    predicted: 140000,
    lower: 115000,
    upper: 165000,
    confidence: 71,
  },
];

// Cash flow forecast (next 6 months)
export const cashFlowForecast: MonthlyForecast[] = [
  {
    month: "Jan 2027",
    predicted: 88000,
    lower: 72000,
    upper: 104000,
    confidence: 86,
  },
  {
    month: "Feb 2027",
    predicted: 95000,
    lower: 78000,
    upper: 112000,
    confidence: 82,
  },
  {
    month: "Mar 2027",
    predicted: 102000,
    lower: 84000,
    upper: 120000,
    confidence: 79,
  },
  {
    month: "Apr 2027",
    predicted: 110000,
    lower: 90000,
    upper: 130000,
    confidence: 75,
  },
  {
    month: "May 2027",
    predicted: 118000,
    lower: 96000,
    upper: 140000,
    confidence: 72,
  },
  {
    month: "Jun 2027",
    predicted: 125000,
    lower: 101000,
    upper: 149000,
    confidence: 69,
  },
];

// Quarterly forecast summary
export const quarterlyForecast = {
  Q1_2027: {
    revenue: { predicted: 813000, growth: 5.2 },
    expenses: { predicted: 488000, growth: 3.8 },
    profit: { predicted: 325000, growth: 10.4 },
  },
  Q2_2027: {
    revenue: { predicted: 935000, growth: 6.1 },
    expenses: { predicted: 535000, growth: 4.2 },
    profit: { predicted: 400000, growth: 9.8 },
  },
};

// Forecast scenarios
export const forecastScenarios = {
  optimistic: {
    description: "Оптимістичний сценарій: зростання 25% YoY",
    revenue: {
      Q1: 850000,
      Q2: 980000,
      Q3: 1050000,
      Q4: 1120000,
    },
    profit: {
      Q1: 350000,
      Q2: 430000,
      Q3: 470000,
      Q4: 510000,
    },
    probability: 25,
  },
  realistic: {
    description: "Реалістичний сценарій: зростання 15% YoY",
    revenue: {
      Q1: 813000,
      Q2: 935000,
      Q3: 1010000,
      Q4: 1075000,
    },
    profit: {
      Q1: 325000,
      Q2: 400000,
      Q3: 445000,
      Q4: 485000,
    },
    probability: 60,
  },
  pessimistic: {
    description: "Песимістичний сценарій: зростання 5% YoY",
    revenue: {
      Q1: 780000,
      Q2: 890000,
      Q3: 950000,
      Q4: 1000000,
    },
    profit: {
      Q1: 295000,
      Q2: 365000,
      Q3: 400000,
      Q4: 430000,
    },
    probability: 15,
  },
};

// Key forecast assumptions
export const forecastAssumptions = [
  {
    category: "Revenue",
    assumptions: [
      "Постійне зростання customer base на 8-12% щомісяця",
      "Середній чек залишається стабільним або зростає на 2-3%",
      "Churn rate не перевищує 5%",
      "Нові продукти запускаються згідно roadmap",
    ],
  },
  {
    category: "Expenses",
    assumptions: [
      "Зарплатний фонд зростає на 5% за квартал",
      "Маркетингові витрати складають 20-25% від revenue",
      "Інфраструктурні витрати зростають пропорційно growth",
      "Операційні витрати залишаються стабільними",
    ],
  },
  {
    category: "Market",
    assumptions: [
      "Ринок продовжує зростати 15-20% річних",
      "Конкуренція залишається на поточному рівні",
      "Економічні умови стабільні",
      "Регуляторне середовище не змінюється",
    ],
  },
];

// Forecast alerts
export const forecastAlerts = [
  {
    type: "warning" as const,
    message:
      "Прогноз cash flow показує потенційний розрив у березні 2027. Рекомендується збільшити резерви.",
    impact: "high" as const,
    date: "March 2027",
  },
  {
    type: "success" as const,
    message:
      "За прогнозами, прибуток досягне $1M річних до кінця H1 2027.",
    impact: "high" as const,
    date: "June 2027",
  },
  {
    type: "info" as const,
    message:
      "Прогнозоване зростання витрат на маркетинг може вплинути на margin у Q2.",
    impact: "medium" as const,
    date: "Q2 2027",
  },
];

// Forecast accuracy (historical)
export const forecastAccuracy = {
  revenue: {
    lastMonth: 97.2,
    last3Months: 94.5,
    last6Months: 91.8,
  },
  expenses: {
    lastMonth: 98.5,
    last3Months: 96.2,
    last6Months: 94.7,
  },
  profit: {
    lastMonth: 93.8,
    last3Months: 90.5,
    last6Months: 88.2,
  },
};
