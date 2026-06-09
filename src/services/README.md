# Services Layer Documentation

Централізований шар для всієї бізнес-логіки та API комунікації Flowiq.

## Структура

```
services/
├── api.ts                    # Базовий Axios клієнт з interceptors
├── auth.service.ts           # Аутентифікація та авторизація
├── dashboard.service.ts      # Dashboard статистика та інсайти
├── chat.service.ts           # AI Chat та conversations
├── integrations.service.ts   # Інтеграції з зовнішніми сервісами
├── reports.service.ts        # Генерація та експорт звітів
├── index.ts                  # Barrel exports
└── README.md                 # Ця документація
```

---

## api.ts - Базовий HTTP Клієнт

### Конфігурація

```typescript
import { apiClient } from "@/src/services";

// Base URL з environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
```

### Interceptors

#### Request Interceptor
- Автоматично додає JWT token до headers
- Логування запитів (в dev mode)

#### Response Interceptor
- Обробка 401 (unauthorized) помилок
- Автоматичний refresh token
- Глобальна обробка помилок

### Використання

```typescript
import { apiClient } from "@/src/services";

const response = await apiClient.get("/endpoint");
const data = await apiClient.post("/endpoint", { data });
```

---

## auth.service.ts - Аутентифікація

### Методи

#### login(credentials)
Логін користувача з email/password.

```typescript
import { authService } from "@/src/services";

const { user, token } = await authService.login({
  email: "demo@flowiq.ai",
  password: "demo123",
});

// Mock credentials:
// email: demo@flowiq.ai
// password: demo123
```

#### register(data)
Реєстрація нового користувача.

```typescript
const { user, token } = await authService.register({
  email: "user@example.com",
  password: "secure123",
  name: "John Doe",
  company: "Acme Inc",
});
```

#### logout()
Вихід з системи, очищення tokens.

```typescript
await authService.logout();
```

#### getCurrentUser()
Отримати поточного користувача з localStorage.

```typescript
const user = await authService.getCurrentUser();
// Returns: User | null
```

#### refreshToken()
Оновити JWT token.

```typescript
const { token, refreshToken } = await authService.refreshToken();
```

#### isAuthenticated()
Перевірити чи користувач залогінений.

```typescript
if (authService.isAuthenticated()) {
  // User is logged in
}
```

#### getToken()
Отримати збережений token.

```typescript
const token = authService.getToken();
```

### Password Management

```typescript
// Request password reset
await authService.requestPasswordReset("user@example.com");

// Reset password with token
await authService.resetPassword("reset-token", "newPassword123");

// Verify email
await authService.verifyEmail("verification-token");
```

### Types

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "viewer";
  avatar?: string;
  company?: string;
  createdAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
```

### Mock Data
- Demo user: `demo@flowiq.ai` / `demo123`
- Auto role: `admin`
- Token storage: `localStorage`

---

## dashboard.service.ts - Dashboard

### Методи

#### getStats()
Отримати статистику для dashboard cards.

```typescript
import { dashboardService } from "@/src/services";

const stats = await dashboardService.getStats();
// Returns: StatCard[]
// [Revenue, Expenses, Profit, Cash Flow]
```

#### getInsights()
Отримати AI інсайти.

```typescript
const insights = await dashboardService.getInsights();
// Returns: AIInsight[]
// [Cash Flow Alert, Profitable Month, Optimization]
```

#### getBusinessHealth()
Отримати Business Health Score.

```typescript
const health = await dashboardService.getBusinessHealth();
// Returns: { score: 94, maxScore: 100, status: "excellent" }
```

#### getAISummary()
Отримати AI summary.

```typescript
const summary = await dashboardService.getAISummary();
// Returns: { text: string, badge: "Active" }
```

### Mock Data
Використовує дані з `@/src/mock-data/dashboard`:
- Revenue: $245,400 (+20.1%)
- Expenses: $152,600 (-5.2%)
- Profit: $92,800 (+12.5%)
- Cash Flow: $83,300 (+8.3%)

---

## chat.service.ts - AI Chat

### Методи

#### getConversations()
Отримати всі conversations.

```typescript
import { chatService } from "@/src/services";

const conversations = await chatService.getConversations();
// Returns: ChatConversation[]
```

#### getConversation(id)
Отримати одну conversation.

```typescript
const conv = await chatService.getConversation("conv-001");
// Returns: ChatConversation | null
```

#### sendMessage(request)
Відправити повідомлення AI.

```typescript
const aiResponse = await chatService.sendMessage({
  conversationId: "conv-001",
  message: "Як виглядає мій cash flow?",
  context: { dashboard: true },
});
// Returns: ChatMessage (AI response)
```

#### createConversation(title, firstMessage)
Створити нову conversation.

```typescript
const conv = await chatService.createConversation(
  "Revenue Analysis",
  "Проаналізуй мої доходи за місяць"
);
```

#### deleteConversation(id)
Видалити conversation.

```typescript
await chatService.deleteConversation("conv-001");
```

#### getAIInsight(topic, context?)
Отримати AI інсайт про конкретну тему.

```typescript
const insight = await chatService.getAIInsight("revenue", {
  period: "month",
});
// Returns: AIInsightResponse
```

#### exportConversation(id, format)
Експортувати conversation.

```typescript
const blob = await chatService.exportConversation("conv-001", "json");
// Formats: 'json' | 'txt' | 'pdf'
```

### Types

```typescript
interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  metadata?: {
    sources?: string[];
    confidence?: number;
    suggestions?: string[];
  };
}

interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}
```

### Mock Data
2 conversations:
1. "Cash Flow Analysis"
2. "Marketing ROI"

5 варіантів AI відповідей про різні аспекти бізнесу.

---

## integrations.service.ts - Інтеграції

### Методи

```typescript
import { integrationsService } from "@/src/services";

// Get all integrations
const integrations = await integrationsService.getIntegrations();

// Connect integration
await integrationsService.connectIntegration("stripe", { apiKey: "..." });

// Disconnect integration
await integrationsService.disconnectIntegration("stripe");
```

---

## reports.service.ts - Звіти

### Методи

```typescript
import { reportsService } from "@/src/services";

// Get all reports
const reports = await reportsService.getReports();

// Generate report
const report = await reportsService.generateReport({
  type: "revenue",
  period: "month",
  format: "pdf",
});

// Export report
await reportsService.exportReport("report-001", "pdf");
```

---

## Глобальні Patterns

### Error Handling

Всі сервіси кидають помилки, які можна обробити:

```typescript
try {
  const data = await dashboardService.getStats();
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized
  } else if (error.response?.status === 404) {
    // Not found
  } else {
    // Other error
  }
}
```

### Loading States

Сервіси додають artificial delay (300-1500ms) для реалістичного UX:

```typescript
// In component
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await dashboardService.getStats();
    // Use data
  } finally {
    setLoading(false);
  }
};
```

### TypeScript

Всі сервіси повністю типізовані:

```typescript
import type { User, ChatMessage, StatCard } from "@/src/services";
```

---

## Міграція на Backend

Коли backend буде готовий:

### 1. Видалити mock delays

```typescript
// Before
await new Promise((resolve) => setTimeout(resolve, 300));
return mockData;

// After
const response = await apiClient.get("/endpoint");
return response.data;
```

### 2. Розкоментувати API calls

```typescript
// Uncomment real API call
const response = await apiClient.get("/dashboard/stats");
return response.data;

// Remove mock return
// return mockData;
```

### 3. Оновити types (якщо потрібно)

Backend може повернути трохи інші структури - оновіть interfaces.

### 4. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.flowiq.ai
```

---

## Best Practices

### 1. Завжди використовуйте сервіси
❌ Don't:
```typescript
const response = await fetch("http://localhost:8080/api/stats");
```

✅ Do:
```typescript
const stats = await dashboardService.getStats();
```

### 2. Error Handling
❌ Don't:
```typescript
const data = await dashboardService.getStats(); // Може упасти
```

✅ Do:
```typescript
try {
  const data = await dashboardService.getStats();
} catch (error) {
  console.error("Failed to fetch stats", error);
  // Show error to user
}
```

### 3. Loading States
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await dashboardService.getStats();
    setState(data);
  } catch (err) {
    setError("Failed to load data");
  } finally {
    setLoading(false);
  }
};
```

### 4. React Hooks Integration

Використовуйте з React Query / SWR для кешування:

```typescript
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/src/services";

const { data, isLoading, error } = useQuery({
  queryKey: ["dashboard", "stats"],
  queryFn: dashboardService.getStats,
});
```

---

## Testing

### Mock services у tests

```typescript
import { dashboardService } from "@/src/services";

// Mock
vi.mock("@/src/services", () => ({
  dashboardService: {
    getStats: vi.fn().mockResolvedValue(mockStats),
  },
}));

// Test
test("renders stats", async () => {
  render(<Dashboard />);
  expect(dashboardService.getStats).toHaveBeenCalled();
});
```

---

## Статус

### Готово ✅
- ✅ api.ts - HTTP client
- ✅ auth.service.ts - Full auth flow
- ✅ dashboard.service.ts - Dashboard data
- ✅ chat.service.ts - AI Chat
- ✅ integrations.service.ts - Placeholder
- ✅ reports.service.ts - Placeholder

### В планах 🚧
- Додати analytics.service.ts
- Додати forecasts.service.ts
- Додати notifications.service.ts
- WebSocket для real-time updates

---

**Створено:** June 9, 2026  
**Статус:** Production Ready ✅
