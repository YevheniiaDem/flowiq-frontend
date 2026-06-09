# Mock Data Documentation

Колекція mock-даних для розробки Flowiq frontend до підключення backend API.

## Файли

### 📊 revenue.ts
**Дані про доходи бізнесу**

#### Експорти:
- `monthlyRevenue` - Місячна динаміка доходів (останні 6 місяців)
- `revenueBySource` - Розподіл доходів по джерелах (Online Sales, Subscriptions, Consulting, Partnerships)
- `dailyRevenue` - Щоденні доходи (останні 30 днів)
- `topRevenueProducts` - Топ-5 продуктів/послуг за доходом
- `revenueSummary` - Загальна статистика доходів

#### Типи:
```typescript
interface RevenueDataPoint {
  date: string;
  amount: number;
  category: string;
}

interface RevenueBySource {
  source: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}
```

#### Використання:
```typescript
import { monthlyRevenue, revenueBySource } from "@/src/mock-data";
```

---

### 💸 expenses.ts
**Дані про витрати бізнесу**

#### Експорти:
- `monthlyExpenses` - Місячна динаміка витрат (останні 6 місяців)
- `expensesByCategory` - Витрати по категоріях з підкатегоріями
  - Marketing (Digital Ads, Content, SEO/SEM)
  - Salaries (Team, Contractors)
  - Infrastructure (Cloud, Software, Office)
  - Operations (Support, Legal, Banking)
  - Other (Travel, Equipment, Misc)
- `recentExpenses` - Останні витрати (30 днів)
- `expenseAlerts` - Попередження про витрати
- `budgetComparison` - Порівняння з бюджетом
- `expenseSummary` - Загальна статистика витрат

#### Типи:
```typescript
interface ExpenseDataPoint {
  date: string;
  amount: number;
  category: string;
  description: string;
}

interface ExpenseByCategory {
  category: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
  subcategories?: { name: string; amount: number }[];
}
```

---

### 🤖 insights.ts
**AI-генеровані інсайти та рекомендації**

#### Експорти:
- `insights` - Масив з 8 детальних інсайтів
- `insightsSummary` - Статистика по інсайтам
- `insightsByCategory` - Інсайти згруповані по категоріях

#### Категорії інсайтів:
- **Critical** - Критичні попередження (касовий розрив)
- **Warning** - Попередження (неефективні витрати)
- **Success** - Успіхи (зростання прибутку, оптимізація)
- **Info** - Інформаційні (тренди, можливості)

#### Категорії бізнесу:
- Revenue - Доходи
- Expenses - Витрати
- Cash Flow - Грошові потоки
- Customers - Клієнти
- Operations - Операції

#### Структура інсайту:
```typescript
interface Insight {
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
```

#### Приклади інсайтів:
1. **Потенційний касовий розрив** (Critical) - Прогноз розриву через 2 місяці
2. **Прибутковий місяць** (Success) - Зростання на 12.5%
3. **Неефективні маркетингові витрати** (Warning) - ROI знизився з 3.2 до 2.1
4. **Оптимізація інфраструктури** (Success) - Економія 15% на cloud
5. **Збільшення відтоку клієнтів** (Warning) - Churn зріс до 4.8%

---

### 📈 forecasts.ts
**Прогнози на майбутнє (AI-powered)**

#### Експорти:
- `revenueForecast` - Прогноз доходів (6 місяців)
- `expenseForecast` - Прогноз витрат (6 місяців)
- `profitForecast` - Прогноз прибутку (6 місяців)
- `cashFlowForecast` - Прогноз cash flow (6 місяців)
- `quarterlyForecast` - Квартальні прогнози (Q1, Q2 2027)
- `forecastScenarios` - Три сценарії (оптимістичний, реалістичний, песимістичний)
- `forecastAssumptions` - Припущення прогнозів
- `forecastAlerts` - Попередження на основі прогнозів
- `forecastAccuracy` - Точність історичних прогнозів

#### Структура прогнозу:
```typescript
interface MonthlyForecast {
  month: string;
  predicted: number;    // Прогнозоване значення
  lower: number;        // Нижня межа (pessimistic)
  upper: number;        // Верхня межа (optimistic)
  confidence: number;   // Впевненість прогнозу (%)
}
```

#### Сценарії:
- **Optimistic** (25% ймовірність) - Зростання 25% YoY
- **Realistic** (60% ймовірність) - Зростання 15% YoY
- **Pessimistic** (15% ймовірність) - Зростання 5% YoY

#### Точність прогнозів:
- Revenue: 91.8-97.2%
- Expenses: 94.7-98.5%
- Profit: 88.2-93.8%

---

## Використання

### У компонентах:

```typescript
// Dashboard
import { dashboardStats, aiInsights, businessHealth } from "@/src/mock-data";

// Analytics
import { monthlyRevenue, expensesByCategory } from "@/src/mock-data";

// Forecasts
import { revenueForecast, forecastScenarios } from "@/src/mock-data";

// AI Insights
import { insights, insightsByCategory } from "@/src/mock-data";
```

### У сервісах:

```typescript
// services/dashboard.service.ts
import { dashboardStats } from "@/src/mock-data/dashboard";

export const dashboardService = {
  async getStats(): Promise<StatCard[]> {
    // Mock implementation
    return Promise.resolve(dashboardStats);
    
    // When backend is ready:
    // const response = await apiClient.get('/dashboard/stats');
    // return response.data;
  },
};
```

---

## Міграція на backend

Коли backend API буде готовий:

### 1. Оновіть сервіси:
```typescript
// Before (mock)
import { dashboardStats } from "@/src/mock-data";
return Promise.resolve(dashboardStats);

// After (real API)
const response = await apiClient.get('/dashboard/stats');
return response.data;
```

### 2. Видаліть невикористані імпорти mock-data

### 3. Залиште mock-data для:
- Unit tests
- Storybook stories
- Development seeds

---

## Статистика

### Обсяг даних:
- **Revenue**: 30 днів daily data, 6 місяців trends, 5 products
- **Expenses**: 14 recent expenses, 5 categories, budget tracking
- **Insights**: 8 detailed insights з метриками та рекомендаціями
- **Forecasts**: 6 місяців прогнозів, 3 сценарії, accuracy metrics

### Реалізм даних:
- ✅ Realistic business numbers
- ✅ Seasonal trends
- ✅ Growth patterns
- ✅ Category distributions
- ✅ Ukrainian language

---

## Підтримка

При додаванні нових mock-даних:

1. **Створіть інтерфейси** в `src/shared/types/`
2. **Експортуйте типи** з mock-data файлів
3. **Додайте в index.ts** для централізованого доступу
4. **Документуйте** в цьому README

---

## Приклади візуалізації

### Revenue Chart
```typescript
import { monthlyRevenue } from "@/src/mock-data";

<LineChart data={monthlyRevenue}>
  <Line dataKey="revenue" stroke="var(--primary)" />
</LineChart>
```

### Expense Breakdown
```typescript
import { expensesByCategory } from "@/src/mock-data";

<PieChart>
  {expensesByCategory.map(cat => (
    <Cell key={cat.category} fill={getColor(cat.category)} />
  ))}
</PieChart>
```

### Forecast with Confidence Intervals
```typescript
import { revenueForecast } from "@/src/mock-data";

<AreaChart data={revenueForecast}>
  <Area dataKey="upper" fill="var(--primary-light)" />
  <Area dataKey="predicted" fill="var(--primary)" />
  <Area dataKey="lower" fill="var(--primary-dark)" />
</AreaChart>
```

---

**Останнє оновлення:** June 9, 2026  
**Статус:** Production Ready ✅
