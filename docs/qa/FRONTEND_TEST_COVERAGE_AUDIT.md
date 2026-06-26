# FlowIQ Frontend — Test Coverage Audit

**Date:** 2026-06-26  
**Scope:** `src/`, `app/` — factual code inventory vs. existing tests  
**Auditor:** Senior Frontend AQA review (pre-implementation baseline)

---

## Executive Summary

| Metric | Count | Tested (before) | Coverage |
|--------|------:|----------------:|----------|
| App Router pages | 18 | 0 | 0% |
| Feature + shared components | ~155 | 0 | 0% |
| Hooks | 25 | 0 | 0% |
| React contexts | 3 | 0 | 0% |
| Forms | 8+ | 0 | 0% |
| Service / API modules | 20 | 1 | 5% |
| Utility modules | 15+ | 0 | 0% |
| **Total test files** | — | **1** | — |

**Existing test infrastructure:** Vitest 3 + jsdom only. No React Testing Library, no MSW, no global setup, no CI test step.

**Existing test file:** `src/services/tokenRefresh.test.ts` — token refresh single-flight deduplication and `clearAuthStorage`.

---

## 1. Components — Test Status

### Navigation
| Component | Path | Tested |
|-----------|------|:------:|
| `MainLayout` | `src/shared/components/layout/MainLayout.tsx` | ❌ |
| `Sidebar` | `src/shared/components/layout/Sidebar.tsx` | ❌ |
| `TopNav` | `src/shared/components/layout/TopNav.tsx` | ❌ |
| `AmbientBackground` | `src/shared/components/layout/AmbientBackground.tsx` | ❌ |
| `Providers` | `src/shared/components/Providers.tsx` | ❌ |
| `FlowiqIcon` | `src/shared/components/brand/FlowiqIcon.tsx` | ❌ |
| `ThemeToggle` | `src/shared/components/theme/ThemeToggle.tsx` | ❌ |

### Dashboard (10 components)
| Component | Tested |
|-----------|:------:|
| `DashboardView` | ❌ |
| `StatCard` | ❌ |
| `BusinessHealthCard` | ❌ |
| `TaxProfileCard` | ❌ |
| `AISummaryCard` | ❌ |
| `AIInsightCard` | ❌ |
| `RevenueTrendChart` | ❌ |
| `ExpenseBreakdownChart` | ❌ |
| `ForecastSnapshotWidget` | ❌ |
| `ChartPlaceholder` | ❌ |

### Analytics (8 components)
| Component | Tested |
|-----------|:------:|
| `AnalyticsView` | ❌ |
| `AnalyticsSummaryCards` | ❌ |
| `AnalyticsRevenueTrendChart` | ❌ |
| `AnalyticsProfitTrendChart` | ❌ |
| `AnalyticsIncomeVsExpensesChart` | ❌ |
| `AnalyticsExpensePieChart` | ❌ |
| `FopInsightsSection` | ❌ |
| `TaxProfileAnalyticsSection` | ❌ |

### Forecasts (9 components)
| Component | Tested |
|-----------|:------:|
| `ForecastsView` | ❌ |
| `ForecastSummaryCards` | ❌ |
| `ForecastWarningBanners` | ❌ |
| `ForecastInsights` | ❌ |
| `RevenueForecastChart` | ❌ |
| `ExpenseForecastChart` | ❌ |
| `ProfitForecastChart` | ❌ |
| `TaxForecastCard` | ❌ |
| `FopLimitForecastCard` | ❌ |

### AI Accountant (7 components)
| Component | Tested |
|-----------|:------:|
| `AIAccountantView` | ❌ |
| `AIHealthSummaryCard` | ❌ |
| `AIRecommendationsSection` | ❌ |
| `AIRecommendationCard` | ❌ |
| `TaxAdvisorSection` | ❌ |
| `ForecastCenterSection` | ❌ |
| `AIAccountantChat` | ❌ |

### Reports (8 components)
| Component | Tested |
|-----------|:------:|
| `ReportsView` | ❌ |
| `ReportsSummary` | ❌ |
| `ReportTypeSelector` | ❌ |
| `ReportPeriodFilter` | ❌ |
| `GenerateReportDialog` | ❌ |
| `ReportPreviewChart` | ❌ |
| `ReportHistoryTable` | ❌ |
| `ReportStatusBadge` | ❌ |

### Profile / Settings (6 components)
| Component | Tested |
|-----------|:------:|
| `ProfileSettingsView` | ❌ |
| `SettingsTabs` | ❌ |
| `SecurityTab` | ❌ |
| `PersonalInfoForm` | ❌ |
| `FopInfoForm` | ❌ |
| `ChangePasswordForm` | ❌ |
| `SettingsView` | ❌ |
| `NotificationPreferencesView` | ❌ |

### Notifications (7 components)
| Component | Tested |
|-----------|:------:|
| `NotificationCenterView` | ❌ |
| `NotificationBell` | ❌ |
| `NotificationDropdown` | ❌ |
| `NotificationCard` | ❌ |
| `NotificationFilters` | ❌ |
| `NotificationStats` | ❌ |
| `RecentNotificationsWidget` | ❌ |

### Onboarding (10 components)
| Component | Tested |
|-----------|:------:|
| `OnboardingProvider` | ❌ |
| `ActivationProvider` | ❌ |
| `WelcomeModal` | ❌ |
| `WhatsNewModal` | ❌ |
| `CelebrationModal` | ❌ |
| `FirstImportSuccessModal` | ❌ |
| `ActivationChecklist` | ❌ |
| `DemoWorkspaceBanner` | ❌ |
| `EmptyState` | ❌ |
| `HelpLearnCenter` | ❌ |

### Authentication (3 components)
| Component | Tested |
|-----------|:------:|
| `AuthLayout` | ❌ |
| `LoginForm` | ❌ |
| `RegisterForm` | ❌ |

### Help Center / Business Guide (20+ components)
| Component | Tested |
|-----------|:------:|
| `BusinessGuideView` | ❌ |
| `BusinessGuideHero` | ❌ |
| `FopEligibilityChecker` | ❌ |
| `CheckerForm` | ❌ |
| `KnowledgeArticleView` | ❌ |
| _(remaining guide components)_ | ❌ |

### Shared UI primitives (14 components)
| Component | Tested |
|-----------|:------:|
| `Button`, `Input`, `Card`, `Dialog`, `Badge`, `Tabs`, etc. | ❌ |

---

## 2. Hooks — Test Status

| Hook | Feature | Tested |
|------|---------|:------:|
| `useAnalytics` | Analytics | ❌ |
| `useForecasts` | Forecasts | ❌ |
| `useAIAccountant` | AI Accountant | ❌ |
| `useReports` | Reports | ❌ |
| `useProfile` | Profile | ❌ |
| `useFopProfile` | Profile | ❌ |
| `useSessions` | Profile | ❌ |
| `useNotifications` | Notifications | ❌ |
| `useUnreadCount` | Notifications | ❌ |
| `useNotificationPreferences` | Settings | ❌ |
| `useOnboarding` / `useOnboardingOptional` | Onboarding | ❌ |
| `useActivation` / `useDemoWorkspace` | Onboarding | ❌ |
| `useContextualHint` | Onboarding | ❌ |
| `usePendingHelpGuide` | Onboarding | ❌ |
| `usePageActivation` | Onboarding | ❌ |
| `useFirstImportSuccess` | Onboarding | ❌ |
| `useBusinessGuide` | Help Center | ❌ |
| `useBusinessGuideSearch` | Help Center | ❌ |
| `useKnowledgeArticles` | Help Center | ❌ |
| `useKnowledgeArticle` | Help Center | ❌ |
| `useFopGroup` | Help Center | ❌ |
| `useKvedSearch` | Help Center | ❌ |
| `useEligibilityChecker` | Help Center | ❌ |
| `useTransactions` | Transactions | ❌ |
| `useImports` | Imports | ❌ |
| `useTasks` | Tasks | ❌ |
| `usePreferences` | Shared | ❌ |

---

## 3. Pages / Routes — Test Status

| Route | Page component | Tested |
|-------|----------------|:------:|
| `/` | `DashboardView` | ❌ |
| `/analytics` | `AnalyticsView` | ❌ |
| `/forecasts` | `ForecastsView` | ❌ |
| `/ai-accountant` | `AIAccountantView` | ❌ |
| `/reports` | `ReportsView` | ❌ |
| `/settings` | `SettingsView` | ❌ |
| `/notifications` | `NotificationCenterView` | ❌ |
| `/business-guide` | `BusinessGuideView` | ❌ |
| `/login` | `LoginForm` | ❌ |
| `/register` | `RegisterForm` | ❌ |
| `/transactions` | `TransactionsView` | ❌ |
| `/imports` | `ImportsView` | ❌ |
| `/chat` | `ChatView` | ❌ |
| `/tasks` | `TasksView` | ❌ |
| `/coming-soon/integrations` | `IntegrationsComingSoonView` | ❌ |
| `/business-guide/groups/[slug]` | `GroupDetailView` | ❌ |
| `/business-guide/articles/[slug]` | `KnowledgeArticleView` | ❌ |
| `/integrations` | redirect | ❌ |

---

## 4. Services — Test Status

| Service | Path | Tested |
|---------|------|:------:|
| `tokenRefresh` | `src/services/tokenRefresh.ts` | ✅ |
| `apiClient` | `src/services/api.ts` | ❌ |
| `authService` | `src/services/auth.service.ts` | ❌ |
| `dashboardService` | `src/services/dashboard.service.ts` | ❌ |
| `taxProfileService` | `src/services/tax-profile.service.ts` | ❌ |
| `chatService` | `src/services/chat.service.ts` | ❌ |
| `analyticsService` | `src/features/analytics/services/` | ❌ |
| `forecastService` | `src/features/forecasts/services/` | ❌ |
| `aiAccountantService` | `src/features/ai-accountant/services/` | ❌ |
| `reportsService` | `src/features/reports/services/` | ❌ |
| `profileService` | `src/features/profile/services/` | ❌ |
| `notificationService` | `src/features/notifications/services/` | ❌ |
| `notificationPreferencesService` | `src/features/notification-preferences/services/` | ❌ |
| `onboardingStorage` | `src/features/onboarding/services/` | ❌ |
| `activationStorage` | `src/features/onboarding/services/` | ❌ |
| `productAnalytics` | `src/features/onboarding/services/` | ❌ |
| `businessGuideService` | `src/features/business-guide/services/` | ❌ |
| `checkerService` | `src/features/business-guide/checker/services/` | ❌ |
| `transactionService` | `src/features/transactions/services/` | ❌ |
| `importService` | `src/features/imports/services/` | ❌ |
| `taskService` | `src/features/tasks/services/` | ❌ |

---

## 5. Forms — Test Status

| Form | Validation (Zod) | Unit test | Tested |
|------|:----------------:|:---------:|:------:|
| `LoginForm` | HTML5 `required` | — | ❌ |
| `RegisterForm` | HTML5 `required` | — | ❌ |
| `PersonalInfoForm` | `personalInfoSchema` | — | ❌ |
| `FopInfoForm` | `fopProfileSchema` | — | ❌ |
| `ChangePasswordForm` | `changePasswordSchema` | — | ❌ |
| `CheckerForm` | inline | — | ❌ |
| `TransactionFormModal` | inline | — | ❌ |
| `TaskFormDialog` | inline | — | ❌ |
| `GenerateReportDialog` | inline | — | ❌ |
| `NotificationPreferencesView` | — | — | ❌ |

---

## 6. Contexts — Test Status

| Context | Tested |
|---------|:------:|
| `PreferencesContext` | ❌ |
| `OnboardingContext` | ❌ |
| `ActivationContext` | ❌ |

---

## 7. Utility Functions — Test Status

| Utility | Path | Tested |
|---------|------|:------:|
| `formatCurrency`, `convertFromUah` | `src/shared/utils/currency.ts` | ❌ |
| `cn` | `src/shared/utils/utils.ts` | ❌ |
| `formatMonthLabel`, `formatAxisValue` | `src/features/analytics/utils/chart.ts` | ❌ |
| `groupNotificationsByDate`, `formatBadgeCount` | `src/features/notifications/utils/` | ❌ |
| `clonePreferences`, `diffPreferences` | `src/features/notification-preferences/utils/` | ❌ |
| `personalInfoSchema`, `changePasswordSchema` | `src/features/profile/validators/` | ❌ |
| `evaluateEligibility` | `src/features/business-guide/checker/engine/` | ❌ |
| Task utils | `src/features/tasks/utils/task.utils.ts` | ❌ |
| Transaction date bounds | `src/features/transactions/data/dateBounds.ts` | ❌ |
| Theme helpers | `src/shared/theme/apply-theme.ts` | ❌ |

---

## 8. Coverage Matrix

Legend: ✅ tested · ❌ not tested · ⚠️ partial

| Feature Area | Components | Hooks | Pages | Services | Forms | Utils | A11y |
|--------------|:----------:|:-----:|:-----:|:--------:|:-----:|:-----:|:----:|
| **Dashboard** | ❌ 0/10 | — | ❌ | ❌ | — | ❌ | ❌ |
| **Analytics** | ❌ 0/8 | ❌ | ❌ | ❌ | — | ❌ | ❌ |
| **Forecasts** | ❌ 0/9 | ❌ | ❌ | ❌ | — | — | ❌ |
| **AI Accountant** | ❌ 0/7 | ❌ | ❌ | ❌ | — | — | ❌ |
| **Reports** | ❌ 0/8 | ❌ | ❌ | ❌ | ❌ | — | ❌ |
| **Profile** | ❌ 0/6 | ❌ 0/3 | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Settings** | ❌ 0/2 | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Notifications** | ❌ 0/7 | ❌ 0/2 | ❌ | ❌ | — | ❌ | ❌ |
| **Onboarding** | ❌ 0/10 | ❌ 0/6 | — | ❌ | — | — | ❌ |
| **Authentication** | ❌ 0/3 | — | ❌ 0/2 | ❌ | ❌ | — | ❌ |
| **Help Center** | ❌ 0/20+ | ❌ 0/6 | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Navigation** | ❌ 0/8 | — | — | — | — | — | ❌ |
| **Shared** | ❌ 0/14 | ❌ 1/1 | — | ⚠️ 1/2 | — | ❌ | ❌ |

---

## 9. Test Infrastructure Gaps (Baseline)

| Item | Status |
|------|--------|
| Vitest config (`include` only `*.test.ts`) | ⚠️ `.tsx` tests excluded |
| Path alias `@/*` in Vitest | ❌ |
| Global setup (`@testing-library/jest-dom`) | ❌ |
| `renderWithProviders` utility | ❌ |
| MSW handlers / server | ❌ |
| Next.js router mocks | ❌ |
| CI test step (`.github/workflows/frontend-ci.yml`) | ❌ |
| Playwright E2E | ❌ |
| Coverage reporting | ❌ |

---

## 10. Risk Assessment

| Risk | Severity | Rationale |
|------|----------|-----------|
| Auth token refresh race | **Mitigated** | Only area with unit tests |
| Form validation regressions | **High** | Zod schemas untested |
| API error / loading UI | **High** | All data hooks untested |
| Onboarding state persistence | **Medium** | localStorage logic untested |
| Navigation accessibility | **Medium** | Sidebar has `data-testid` but no a11y tests |
| Eligibility engine correctness | **High** | Pure business logic, zero tests |
| Currency conversion | **Medium** | Financial display logic untested |

---

## 11. Recommended Test Priorities

1. **P0 — Pure logic:** `profileSchemas`, `currency`, `notification.utils`, `preference.utils`, `eligibility-engine`
2. **P0 — Auth:** `LoginForm`, `RegisterForm`, `tokenRefresh` (extend)
3. **P1 — Data hooks with MSW:** `useAnalytics`, `useForecasts`, `useNotifications`, `useReports`
4. **P1 — Critical views:** `DashboardView`, `AnalyticsView`, `ForecastsView` (loading/error/empty)
5. **P2 — Navigation & a11y:** `Sidebar`, `TopNav`, keyboard focus
6. **P2 — Onboarding:** `onboardingStorage`, `EmptyState`, modals
7. **P3 — Charts & animations:** snapshot / smoke tests only
8. **P3 — E2E:** critical user journeys via Playwright

---

*This document reflects the codebase state **before** the test implementation phase (Этап 2). See `FRONTEND_TEST_REPORT.md` for post-implementation results.*
