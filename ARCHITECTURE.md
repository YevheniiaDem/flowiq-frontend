# Flowiq Frontend Architecture

## Project Structure

```
flowiq-frontend/
├── app/                              # Next.js App Router (thin pages)
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Dashboard page
│   ├── analytics/page.tsx
│   ├── chat/page.tsx
│   ├── forecasts/page.tsx
│   ├── reports/page.tsx
│   ├── integrations/page.tsx
│   └── settings/page.tsx
│
├── src/
│   ├── features/                     # Feature-based modules
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── DashboardView.tsx
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── AISummaryCard.tsx
│   │   │   │   ├── BusinessHealthCard.tsx
│   │   │   │   ├── AIInsightCard.tsx
│   │   │   │   └── ChartPlaceholder.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── analytics/
│   │   │   ├── components/
│   │   │   │   └── AnalyticsView.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   │   └── ChatView.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── forecasts/
│   │   │   ├── components/
│   │   │   │   └── ForecastsView.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── reports/
│   │   │   ├── components/
│   │   │   │   ├── ReportsView.tsx
│   │   │   │   └── ReportCard.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── integrations/
│   │   │   ├── components/
│   │   │   │   ├── IntegrationsView.tsx
│   │   │   │   └── IntegrationCard.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── settings/
│   │       ├── components/
│   │       │   └── SettingsView.tsx
│   │       └── index.ts
│   │
│   ├── shared/                       # Shared/common code
│   │   ├── components/
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── TopNav.tsx
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── ui/                  # shadcn/ui components
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── input.tsx
│   │   │       ├── badge.tsx
│   │   │       └── ...
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── utils/                   # Utility functions
│   │   │   └── utils.ts            # cn() and other utils
│   │   ├── constants/               # Constants
│   │   └── types/                   # TypeScript types
│   │       └── index.ts
│   │
│   ├── services/                    # API services
│   │   ├── api.ts                  # Axios instance
│   │   ├── dashboard.service.ts
│   │   ├── integrations.service.ts
│   │   ├── reports.service.ts
│   │   └── index.ts
│   │
│   ├── mock-data/                   # Mock data for development
│   │   ├── dashboard.ts
│   │   ├── integrations.ts
│   │   ├── reports.ts
│   │   └── index.ts
│   │
│   └── hooks/                       # Global hooks
│
├── public/                          # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Architecture Principles

### 1. Feature-Based Organization

Each feature is self-contained in its own directory under `src/features/`:

```
features/
  └── dashboard/
      ├── components/        # Feature-specific components
      ├── hooks/            # Feature-specific hooks (if needed)
      ├── utils/            # Feature-specific utilities (if needed)
      └── index.ts          # Public API (barrel export)
```

**Benefits:**
- Easy to locate feature-related code
- Clear boundaries between features
- Scalable as the app grows
- Easy to extract features into packages if needed

### 2. Thin Pages (App Router)

Pages in `app/` directory are kept minimal:

```typescript
import { MainLayout } from "@/src/shared/components/layout";
import { DashboardView } from "@/src/features/dashboard";

export default function DashboardPage() {
  return (
    <MainLayout>
      <DashboardView />
    </MainLayout>
  );
}
```

**Benefits:**
- Pages are just routing and layout composition
- Business logic lives in feature modules
- Easy to test features independently
- Clear separation of concerns

### 3. Shared Resources

Common code lives in `src/shared/`:

- **components/layout/** - Layout components (Sidebar, TopNav, MainLayout)
- **components/ui/** - Reusable UI components (shadcn/ui)
- **hooks/** - Shared React hooks
- **utils/** - Utility functions
- **types/** - TypeScript type definitions
- **constants/** - Application constants

### 4. Service Layer

API integration code lives in `src/services/`:

```typescript
// services/dashboard.service.ts
export const dashboardService = {
  async getStats(): Promise<StatCard[]> {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },
};
```

**Benefits:**
- Centralized API logic
- Easy to mock for testing
- Ready for backend integration
- Type-safe API calls

### 5. Mock Data

Development mock data in `src/mock-data/`:

```typescript
// mock-data/dashboard.ts
export const dashboardStats: StatCard[] = [
  { label: "Revenue", value: "$245,400", ... },
  // ...
];
```

**Benefits:**
- Development without backend
- Consistent test data
- Easy to switch to real API

## Import Patterns

### Absolute Imports

Use `@/` for all imports:

```typescript
import { MainLayout } from "@/src/shared/components/layout";
import { DashboardView } from "@/src/features/dashboard";
import { dashboardStats } from "@/src/mock-data";
import { StatCard } from "@/src/shared/types";
```

### Barrel Exports

Each feature exports through `index.ts`:

```typescript
// features/dashboard/index.ts
export { DashboardView } from "./components/DashboardView";

// Usage
import { DashboardView } from "@/src/features/dashboard";
```

## Adding New Features

1. Create feature directory:
   ```
   src/features/my-feature/
   ```

2. Add components:
   ```
   src/features/my-feature/components/MyFeatureView.tsx
   ```

3. Export from barrel:
   ```typescript
   // src/features/my-feature/index.ts
   export { MyFeatureView } from "./components/MyFeatureView";
   ```

4. Create thin page:
   ```typescript
   // app/my-feature/page.tsx
   import { MainLayout } from "@/src/shared/components/layout";
   import { MyFeatureView } from "@/src/features/my-feature";

   export default function MyFeaturePage() {
     return (
       <MainLayout>
         <MyFeatureView />
       </MainLayout>
     );
   }
   ```

## API Integration

When backend is ready:

1. Update environment variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

2. Uncomment API calls in services:
   ```typescript
   // Before (mock)
   return Promise.resolve(mockData);

   // After (real API)
   const response = await apiClient.get('/dashboard/stats');
   return response.data;
   ```

3. Remove mock data usage:
   ```typescript
   // Before
   import { dashboardStats } from "@/src/mock-data";

   // After
   import { dashboardService } from "@/src/services";
   const stats = await dashboardService.getStats();
   ```

## Type Safety

All types defined in `src/shared/types/`:

```typescript
export interface StatCard {
  label: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
  icon: string;
}
```

## Best Practices

1. **Feature Independence**: Features should not import from other features
2. **Shared First**: Common code goes to `src/shared/`
3. **Type Everything**: Use TypeScript types for all data
4. **Thin Pages**: Keep pages minimal, logic in features
5. **Service Layer**: All API calls through services
6. **Mock Data**: Use mock data during development
7. **Barrel Exports**: Export public API through `index.ts`

## Migration Path

Old structure → New structure:

| Old | New |
|-----|-----|
| `components/layout/` | `src/shared/components/layout/` |
| `components/ui/` | `src/shared/components/ui/` |
| `lib/utils.ts` | `src/shared/utils/utils.ts` |
| Page content | `src/features/{name}/components/` |

## Testing Strategy

```
features/
  └── dashboard/
      ├── components/
      │   ├── DashboardView.tsx
      │   └── DashboardView.test.tsx    # Component tests
      ├── __tests__/
      │   └── dashboard.test.tsx         # Integration tests
      └── index.ts
```

## Performance

- Client components marked with `"use client"`
- Server components by default (Next.js 13+)
- Lazy loading for heavy features (future)
- Code splitting automatic (Next.js)

## Future Enhancements

- [ ] Add custom hooks to features
- [ ] Add feature-level state management (if needed)
- [ ] Add E2E tests
- [ ] Add Storybook for component documentation
- [ ] Add API response caching
- [ ] Add error boundaries per feature
- [ ] Add loading states
