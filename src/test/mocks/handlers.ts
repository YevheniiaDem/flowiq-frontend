import { http, HttpResponse } from "msw";

const API_BASE = "http://localhost:8080/api";

export const mockAnalyticsOverview = {
  revenue: 150000,
  expenses: 80000,
  profit: 70000,
  taxBurden: 12000,
  revenueChangePercent: 5.2,
  expensesChangePercent: -2.1,
  profitChangePercent: 8.4,
  taxBurdenChangePercent: 1.0,
};

const emptyForecastMetric = {
  historical: [],
  projected: [],
  trendPercent: 0,
  horizons: [],
};

const emptyTaxForecast = {
  currentTaxBurden: 8000,
  annualTaxForecast: 96000,
  trendPercent: 2,
  fopGroup: 3,
  horizons: [],
  cards: [],
};

const emptyFopLimitForecast = {
  fopGroup: 3,
  fopGroupLabel: "Group 3",
  incomeLimit: 5000000,
  currentAnnualIncome: 1200000,
  currentUsagePercent: 24,
  monthsUntilLimitExceeded: 18,
  horizons: [],
};

export const mockForecastSummary = {
  expectedRevenue: 200000,
  expectedExpenses: 90000,
  expectedProfit: 110000,
  expectedTax: 8000,
  revenueTrendPercent: 5.2,
  expenseTrendPercent: -1.5,
  profitTrendPercent: 8.0,
  fopLimitUsagePercent: 40,
  monthsUntilFopLimit: 18,
  revenueHorizons: [],
  profitHorizons: [],
  insights: [],
  warnings: [],
};

export const mockNotifications = [
  {
    id: 1,
    title: "Tax deadline",
    message: "Submit quarterly report",
    severity: "WARNING",
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: null,
  },
];

export const handlers = [
  // Auth
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.email === "fail@test.com") {
      return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    return HttpResponse.json({
      token: "test-token",
      refreshToken: "test-refresh",
      user: { id: 1, email: body.email, name: "Test User" },
    });
  }),

  http.post(`${API_BASE}/auth/register`, async ({ request }) => {
    const body = (await request.json()) as { email: string };
    if (body.email === "taken@test.com") {
      return HttpResponse.json({ message: "Email already exists" }, { status: 409 });
    }
    return HttpResponse.json({
      token: "test-token",
      refreshToken: "test-refresh",
      user: { id: 2, email: body.email, name: "New User" },
    });
  }),

  // Dashboard
  http.get(`${API_BASE}/dashboard/stats`, () =>
    HttpResponse.json([
      {
        labelKey: "revenue",
        amount: 150000,
        change: "+5%",
        changeType: "positive",
        icon: "dollar-sign",
      },
    ])
  ),
  http.get(`${API_BASE}/dashboard/insights`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/dashboard/summary`, () =>
    HttpResponse.json({ text: "Business is healthy", badge: "Good" })
  ),
  http.get(`${API_BASE}/dashboard/charts/revenue-trend`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/dashboard/charts/expense-breakdown`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/dashboard/forecast-snapshot`, () =>
    HttpResponse.json({
      expectedRevenue: 200000,
      expectedProfit: 110000,
      taxForecast: 8000,
      revenueTrendPercent: 5,
      forecastMonths: 3,
    })
  ),

  // Analytics
  http.get(`${API_BASE}/analytics/overview`, () => HttpResponse.json(mockAnalyticsOverview)),
  http.get(`${API_BASE}/analytics/revenue-trend`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/analytics/expense-breakdown`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/analytics/profit-trend`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/analytics/income-vs-expenses`, () => HttpResponse.json([])),
  http.get(`${API_BASE}/analytics/fop-insights`, () => HttpResponse.json({ limit: 5000000, used: 1200000 })),

  // Forecasts
  http.get(`${API_BASE}/forecasts/summary`, () => HttpResponse.json(mockForecastSummary)),
  http.get(`${API_BASE}/forecasts/revenue`, () => HttpResponse.json(emptyForecastMetric)),
  http.get(`${API_BASE}/forecasts/expenses`, () => HttpResponse.json(emptyForecastMetric)),
  http.get(`${API_BASE}/forecasts/profit`, () => HttpResponse.json(emptyForecastMetric)),
  http.get(`${API_BASE}/forecasts/taxes`, () => HttpResponse.json(emptyTaxForecast)),
  http.get(`${API_BASE}/forecasts/fop-limit`, () => HttpResponse.json(emptyFopLimitForecast)),

  // AI Accountant
  http.get(`${API_BASE}/ai-accountant/health`, () =>
    HttpResponse.json({ score: 85, status: "GOOD", summary: "Finances look stable" })
  ),
  http.get(`${API_BASE}/ai-accountant/recommendations`, () =>
    HttpResponse.json([
      {
        id: "1",
        type: "WARNING",
        title: "Review expenses",
        description: "Operating costs increased 12%",
        priority: 1,
      },
    ])
  ),
  http.get(`${API_BASE}/ai-accountant/tax-advisor`, () =>
    HttpResponse.json({
      summary: "Tax obligations on track",
      tips: [],
      incomeLimitUsagePercent: 24,
      estimatedTaxes: 8000,
      forecastTaxAmount: 96000,
      annualIncome: 1200000,
      incomeLimit: 5000000,
    })
  ),
  http.get(`${API_BASE}/ai-accountant/forecasts`, () => HttpResponse.json({ horizons: [] })),

  // Reports
  http.get(`${API_BASE}/reports`, () =>
    HttpResponse.json({
      reports: [
        {
          id: 1,
          type: "FINANCIAL",
          format: "PDF",
          status: "COMPLETED",
          periodPreset: "LAST_MONTH",
          createdAt: "2026-06-01T10:00:00Z",
        },
      ],
      stats: { total: 5, completed: 3, pending: 1, failed: 1 },
    })
  ),

  // Notifications
  http.get(`${API_BASE}/notifications`, () =>
    HttpResponse.json({
      content: mockNotifications,
      page: 0,
      size: 20,
      totalElements: 1,
      totalPages: 1,
    })
  ),
  http.get(`${API_BASE}/notifications/summary`, () =>
    HttpResponse.json({ total: 1, unread: 1, critical: 0, warnings: 1, success: 0, thisMonth: 1 })
  ),
  http.get(`${API_BASE}/notifications/unread-count`, () => HttpResponse.json({ count: 1 })),
  http.put(`${API_BASE}/notifications/:id/read`, () =>
    HttpResponse.json({ ...mockNotifications[0], read: true })
  ),

  // Profile
  http.get(`${API_BASE}/profile`, () =>
    HttpResponse.json({
      firstName: "Test",
      lastName: "User",
      email: "test@flowiq.com",
      phone: "",
      company: "",
    })
  ),

  // Notification preferences
  http.get(`${API_BASE}/notification-preferences`, () =>
    HttpResponse.json({
      channels: ["EMAIL", "IN_APP"],
      categories: [
        {
          id: "TAX",
          preferences: [
            { key: "TAX_DEADLINE", channels: { EMAIL: true, IN_APP: true, PUSH: false, TELEGRAM: false } },
          ],
        },
      ],
    })
  ),
];

export const analyticsErrorHandler = http.get(`${API_BASE}/analytics/overview`, () =>
  HttpResponse.json({ message: "Server error" }, { status: 500 })
);

export const forecastsErrorHandler = http.get(`${API_BASE}/forecasts/summary`, () =>
  HttpResponse.json({ message: "Service unavailable" }, { status: 503 })
);
