export interface ExpenseDataPoint {
  date: string;
  amount: number;
  category: string;
  description: string;
}

export interface ExpenseByCategory {
  category: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
  subcategories?: { name: string; amount: number }[];
}

export interface MonthlyExpense {
  month: string;
  expense: number;
  change: number;
}

// Monthly expenses trend (last 6 months)
export const monthlyExpenses: MonthlyExpense[] = [
  { month: "Jul 2026", expense: 168000, change: -2.1 },
  { month: "Aug 2026", expense: 165000, change: -1.8 },
  { month: "Sep 2026", expense: 162000, change: -1.8 },
  { month: "Oct 2026", expense: 159000, change: -1.9 },
  { month: "Nov 2026", expense: 156000, change: -1.9 },
  { month: "Dec 2026", expense: 152600, change: -2.2 },
];

// Expenses by category
export const expensesByCategory: ExpenseByCategory[] = [
  {
    category: "Marketing",
    amount: 45000,
    percentage: 29.5,
    trend: "up",
    subcategories: [
      { name: "Digital Ads", amount: 28000 },
      { name: "Content Creation", amount: 10000 },
      { name: "SEO/SEM", amount: 7000 },
    ],
  },
  {
    category: "Salaries",
    amount: 62000,
    percentage: 40.6,
    trend: "stable",
    subcategories: [
      { name: "Team Salaries", amount: 55000 },
      { name: "Contractors", amount: 7000 },
    ],
  },
  {
    category: "Infrastructure",
    amount: 18000,
    percentage: 11.8,
    trend: "down",
    subcategories: [
      { name: "Cloud Services", amount: 12000 },
      { name: "Software Licenses", amount: 4000 },
      { name: "Office", amount: 2000 },
    ],
  },
  {
    category: "Operations",
    amount: 15600,
    percentage: 10.2,
    trend: "stable",
    subcategories: [
      { name: "Customer Support", amount: 8000 },
      { name: "Legal & Accounting", amount: 5000 },
      { name: "Banking Fees", amount: 2600 },
    ],
  },
  {
    category: "Other",
    amount: 12000,
    percentage: 7.9,
    trend: "down",
    subcategories: [
      { name: "Travel", amount: 5000 },
      { name: "Equipment", amount: 4000 },
      { name: "Miscellaneous", amount: 3000 },
    ],
  },
];

// Recent expenses (last 30 days)
export const recentExpenses: ExpenseDataPoint[] = [
  {
    date: "2026-06-08",
    amount: 28000,
    category: "Marketing",
    description: "Google Ads - June Campaign",
  },
  {
    date: "2026-06-07",
    amount: 12000,
    category: "Infrastructure",
    description: "AWS Cloud Services",
  },
  {
    date: "2026-06-05",
    amount: 55000,
    category: "Salaries",
    description: "Monthly Team Salaries",
  },
  {
    date: "2026-06-03",
    amount: 7000,
    category: "Marketing",
    description: "Facebook & Instagram Ads",
  },
  {
    date: "2026-06-02",
    amount: 5000,
    category: "Operations",
    description: "Legal Consultation",
  },
  {
    date: "2026-06-01",
    amount: 4000,
    category: "Infrastructure",
    description: "Software Licenses Renewal",
  },
  {
    date: "2026-05-30",
    amount: 8000,
    category: "Operations",
    description: "Customer Support Tools",
  },
  {
    date: "2026-05-28",
    amount: 10000,
    category: "Marketing",
    description: "Content Creation Services",
  },
  {
    date: "2026-05-25",
    amount: 7000,
    category: "Salaries",
    description: "Freelance Developers",
  },
  {
    date: "2026-05-22",
    amount: 5000,
    category: "Other",
    description: "Business Travel - Conference",
  },
  {
    date: "2026-05-20",
    amount: 4000,
    category: "Other",
    description: "New Equipment Purchase",
  },
  {
    date: "2026-05-18",
    amount: 2600,
    category: "Operations",
    description: "Banking & Transaction Fees",
  },
  {
    date: "2026-05-15",
    amount: 2000,
    category: "Infrastructure",
    description: "Office Rent",
  },
  {
    date: "2026-05-12",
    amount: 3000,
    category: "Other",
    description: "Miscellaneous Expenses",
  },
];

// Expense alerts
export const expenseAlerts = [
  {
    category: "Marketing",
    alert: "Витрати на рекламу зросли на 25% порівняно з минулим місяцем",
    severity: "warning" as const,
    recommendation: "Рекомендується оптимізувати рекламні кампанії",
  },
  {
    category: "Infrastructure",
    alert: "Cloud витрати знизилися на 15% завдяки оптимізації",
    severity: "success" as const,
    recommendation: "Продовжуйте моніторинг використання ресурсів",
  },
];

// Expense budget comparison
export const budgetComparison = [
  {
    category: "Marketing",
    budget: 40000,
    actual: 45000,
    variance: 5000,
    variancePercent: 12.5,
    status: "over" as const,
  },
  {
    category: "Salaries",
    budget: 62000,
    actual: 62000,
    variance: 0,
    variancePercent: 0,
    status: "on-target" as const,
  },
  {
    category: "Infrastructure",
    budget: 20000,
    actual: 18000,
    variance: -2000,
    variancePercent: -10,
    status: "under" as const,
  },
  {
    category: "Operations",
    budget: 16000,
    actual: 15600,
    variance: -400,
    variancePercent: -2.5,
    status: "on-target" as const,
  },
  {
    category: "Other",
    budget: 15000,
    actual: 12000,
    variance: -3000,
    variancePercent: -20,
    status: "under" as const,
  },
];

// Expense summary
export const expenseSummary = {
  total: 152600,
  change: -5.2,
  avgDailyExpense: 5087,
  largestCategory: "Salaries",
  budgetCompliance: 98.4,
};
