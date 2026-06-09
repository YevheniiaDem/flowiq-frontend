export interface RevenueDataPoint {
  date: string;
  amount: number;
  category: string;
}

export interface RevenueBySource {
  source: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  growth: number;
}

// Monthly revenue trend (last 6 months)
export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Jul 2026", revenue: 185000, growth: 8.5 },
  { month: "Aug 2026", revenue: 198000, growth: 7.0 },
  { month: "Sep 2026", revenue: 212000, growth: 7.1 },
  { month: "Oct 2026", revenue: 225000, growth: 6.1 },
  { month: "Nov 2026", revenue: 238000, growth: 5.8 },
  { month: "Dec 2026", revenue: 245400, growth: 3.1 },
];

// Revenue by source
export const revenueBySource: RevenueBySource[] = [
  {
    source: "Online Sales",
    amount: 145000,
    percentage: 59.1,
    trend: "up",
  },
  {
    source: "Subscriptions",
    amount: 58000,
    percentage: 23.6,
    trend: "up",
  },
  {
    source: "Consulting",
    amount: 28400,
    percentage: 11.6,
    trend: "stable",
  },
  {
    source: "Partnerships",
    amount: 14000,
    percentage: 5.7,
    trend: "up",
  },
];

// Daily revenue (last 30 days)
export const dailyRevenue: RevenueDataPoint[] = [
  { date: "2026-05-10", amount: 7200, category: "Online Sales" },
  { date: "2026-05-11", amount: 8100, category: "Online Sales" },
  { date: "2026-05-12", amount: 6800, category: "Subscriptions" },
  { date: "2026-05-13", amount: 9200, category: "Online Sales" },
  { date: "2026-05-14", amount: 7500, category: "Consulting" },
  { date: "2026-05-15", amount: 8800, category: "Online Sales" },
  { date: "2026-05-16", amount: 7900, category: "Online Sales" },
  { date: "2026-05-17", amount: 6500, category: "Subscriptions" },
  { date: "2026-05-18", amount: 8400, category: "Online Sales" },
  { date: "2026-05-19", amount: 9100, category: "Online Sales" },
  { date: "2026-05-20", amount: 7700, category: "Partnerships" },
  { date: "2026-05-21", amount: 8600, category: "Online Sales" },
  { date: "2026-05-22", amount: 7300, category: "Consulting" },
  { date: "2026-05-23", amount: 9500, category: "Online Sales" },
  { date: "2026-05-24", amount: 8200, category: "Online Sales" },
  { date: "2026-05-25", amount: 7000, category: "Subscriptions" },
  { date: "2026-05-26", amount: 8900, category: "Online Sales" },
  { date: "2026-05-27", amount: 9300, category: "Online Sales" },
  { date: "2026-05-28", amount: 7600, category: "Consulting" },
  { date: "2026-05-29", amount: 8500, category: "Online Sales" },
  { date: "2026-05-30", amount: 9800, category: "Online Sales" },
  { date: "2026-05-31", amount: 7400, category: "Partnerships" },
  { date: "2026-06-01", amount: 8700, category: "Online Sales" },
  { date: "2026-06-02", amount: 9200, category: "Online Sales" },
  { date: "2026-06-03", amount: 7800, category: "Subscriptions" },
  { date: "2026-06-04", amount: 8300, category: "Online Sales" },
  { date: "2026-06-05", amount: 9600, category: "Online Sales" },
  { date: "2026-06-06", amount: 8100, category: "Consulting" },
  { date: "2026-06-07", amount: 8900, category: "Online Sales" },
  { date: "2026-06-08", amount: 9400, category: "Online Sales" },
];

// Top revenue products/services
export const topRevenueProducts = [
  {
    name: "Premium Plan",
    revenue: 85000,
    units: 340,
    avgPrice: 250,
    growth: 12.5,
  },
  {
    name: "Standard Plan",
    revenue: 52000,
    units: 650,
    avgPrice: 80,
    growth: 8.2,
  },
  {
    name: "Consulting Hours",
    revenue: 28400,
    units: 142,
    avgPrice: 200,
    growth: 5.1,
  },
  {
    name: "Custom Solutions",
    revenue: 45000,
    units: 15,
    avgPrice: 3000,
    growth: 15.8,
  },
  {
    name: "Add-ons",
    revenue: 35000,
    units: 875,
    avgPrice: 40,
    growth: 22.3,
  },
];

// Revenue summary
export const revenueSummary = {
  total: 245400,
  growth: 20.1,
  avgDailyRevenue: 8180,
  topSource: "Online Sales",
  bestMonth: "December 2026",
};
