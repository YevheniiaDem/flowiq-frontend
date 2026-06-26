# FlowIQ Frontend — Test Implementation Report

**Date:** 2026-06-26  
**Stack:** Vitest 3 · React Testing Library · MSW · jsdom  
**Baseline audit:** `docs/qa/FRONTEND_TEST_COVERAGE_AUDIT.md`

---

## Executive Summary

| Metric | Before | After |
|--------|-------:|------:|
| Test files | 1 | **26** |
| Test cases | 2 | **90** |
| Components with tests | 0 | **15** |
| Hooks with tests | 0 | **6** |
| Utility modules with tests | 0 | **7** |
| Contexts with tests | 0 | **1** |
| Forms covered (validation + UI) | 0 | **3** (+ Zod schemas) |
| Services covered | 1 | **1 direct + API via MSW** |

All **90 tests pass** (`npm test`).

---

## 1. Test Infrastructure Added

| Item | Path / package |
|------|----------------|
| Vitest config (aliases, setup, `*.test.tsx`) | `vitest.config.ts` |
| Global setup (jest-dom, MSW, Next.js mocks, framer-motion stub) | `src/test/setup.ts` |
| `renderWithProviders` | `src/test/test-utils.tsx` |
| MSW handlers | `src/test/mocks/handlers.ts` |
| MSW server | `src/test/mocks/server.ts` |
| `@testing-library/react` | devDependency |
| `@testing-library/jest-dom` | devDependency |
| `@testing-library/user-event` | devDependency |
| `msw` | devDependency |

---

## 2. Component Coverage

| Feature | Component | Test file | Scenarios |
|---------|-----------|-----------|-----------|
| **Dashboard** | `StatCard` | `StatCard.test.tsx` | render, positive/negative change |
| | `DashboardView` | `DashboardView.test.tsx` | loading → success, stat grid |
| **Analytics** | `AnalyticsSummaryCards` | `AnalyticsSummaryCards.test.tsx` | metrics, currency, change % |
| **Forecasts** | `ForecastSummaryCards` | `ForecastSummaryCards.test.tsx` | cards, trends |
| **AI Accountant** | `AIRecommendationCard` | `AIRecommendationCard.test.tsx` | title, badge by type |
| **Reports** | `ReportStatusBadge` | `ReportStatusBadge.test.tsx` | all 4 statuses |
| **Settings** | `SettingsView` | `SettingsView.test.tsx` | tabs, language/currency labels |
| **Notifications** | `NotificationCard` | `NotificationCard.test.tsx` | render, mark read, delete |
| **Onboarding** | `EmptyState` | `EmptyState.test.tsx` | render, CTA, aria-hidden icon |
| **Authentication** | `LoginForm` | `LoginForm.test.tsx` | a11y labels, submit, API error, loading |
| | `RegisterForm` | `RegisterForm.test.tsx` | fields, success, conflict error, login link |
| **Navigation** | `Sidebar` | `Sidebar.test.tsx` | nav links, active route, hrefs, keyboard |
| **Help Center** | — (utils) | `highlight.utils.test.ts` | search highlight, date format |

### Components still without dedicated tests

`AnalyticsView`, `ForecastsView`, `AIAccountantView`, `ReportsView`, `NotificationCenterView`, `ProfileSettingsView`, `BusinessGuideView`, chart components, modals, forms (`PersonalInfoForm`, `FopInfoForm`, `ChangePasswordForm`, `CheckerForm`), and most shared UI primitives.

---

## 3. Hook Coverage

| Hook | Test file | Scenarios |
|------|-----------|-----------|
| `useAnalytics` | `useAnalytics.test.tsx` | success, API 500 error, reload |
| `useForecasts` | `useForecasts.test.ts` | success, API 503 error |
| `useAIAccountant` | `useAIAccountant.test.ts` | health + recommendations load |
| `useReports` | `useReports.test.ts` | list + stats load |
| `useNotifications` | `useNotifications.test.ts` | load, mark as read |
| `usePreferences` | `PreferencesContext.test.tsx` | defaults, `t()`, language switch |

### Hooks still without tests

`useProfile`, `useFopProfile`, `useSessions`, `useNotificationPreferences`, all onboarding hooks (`useOnboarding`, `useActivation`, `useDemoWorkspace`, etc.), all business-guide hooks, `useTransactions`, `useImports`, `useTasks`, `useUnreadCount`.

---

## 4. Page / Route Coverage

Pages are covered **indirectly** through view-component and form tests:

| Route | Coverage |
|-------|----------|
| `/` (Dashboard) | `DashboardView.test.tsx` |
| `/analytics` | partial — `AnalyticsSummaryCards` + `useAnalytics` |
| `/forecasts` | partial — `ForecastSummaryCards` + `useForecasts` |
| `/ai-accountant` | partial — `AIRecommendationCard` + `useAIAccountant` |
| `/reports` | partial — `ReportStatusBadge` + `useReports` |
| `/settings` | `SettingsView.test.tsx` |
| `/notifications` | partial — `NotificationCard` + `useNotifications` |
| `/login` | `LoginForm.test.tsx` |
| `/register` | `RegisterForm.test.tsx` |
| `/business-guide` | utils only (`highlight.utils`) |
| Other routes | ❌ not covered |

---

## 5. Services & API Coverage

| Layer | Coverage |
|-------|----------|
| `tokenRefresh` | ✅ `tokenRefresh.test.ts` — single-flight, clear storage |
| HTTP via MSW | ✅ Auth, dashboard, analytics, forecasts, AI accountant, reports, notifications, profile, preferences |
| Feature services (unit) | ❌ no isolated service tests (covered via hooks + MSW integration) |

---

## 6. Forms Coverage

| Form / validation | Test type | File |
|-------------------|-----------|------|
| `LoginForm` | UI + API error + loading | `LoginForm.test.tsx` |
| `RegisterForm` | UI + success + conflict | `RegisterForm.test.tsx` |
| `personalInfoSchema` | Zod validation | `profileSchemas.test.ts` |
| `fopProfileSchema` | Zod validation | `profileSchemas.test.ts` |
| `changePasswordSchema` | Zod validation (strength, match) | `profileSchemas.test.ts` |
| `PersonalInfoForm`, `FopInfoForm`, `ChangePasswordForm` | ❌ | — |
| `CheckerForm`, `TransactionFormModal`, `TaskFormDialog` | ❌ | — |

---

## 7. Utility Functions Coverage

| Module | File | Tests |
|--------|------|------:|
| `currency.ts` | `currency.test.ts` | 6 |
| `chart.ts` | `chart.test.ts` | 5 |
| `notification.utils.ts` | `notification.utils.test.ts` | 4 |
| `preference.utils.ts` | `preference.utils.test.ts` | 4 |
| `profileSchemas.ts` | `profileSchemas.test.ts` | 8 |
| `onboardingStorage.ts` | `onboardingStorage.test.ts` | 5 |
| `highlight.utils.ts` | `highlight.utils.test.ts` | 5 |

**Not covered:** `eligibility-engine`, `task.utils`, `dateBounds`, `apply-theme`, tour config utilities.

---

## 8. Accessibility Testing

| Area | What's tested |
|------|---------------|
| **Labels** | `LoginForm` — `toHaveAccessibleName` for email/password |
| **Register** | `getByLabelText` for all fields |
| **Settings** | `getByLabelText` for language/currency dropdowns |
| **EmptyState** | decorative icon `aria-hidden="true"` |
| **Sidebar** | all links keyboard-focusable (no `tabindex=-1`) |
| **Screen reader** | partial — no `axe-core` / `vitest-axe` integration yet |

---

## 9. Behavioral Scenarios Covered

| Scenario | Covered in |
|----------|------------|
| Rendering | All component tests |
| Form validation | `profileSchemas.test.ts`, HTML5 `required` in auth forms |
| API errors | `LoginForm`, `RegisterForm`, `useAnalytics`, `useForecasts` |
| Loading states | `LoginForm`, `DashboardView`, all data hooks |
| Empty states | `EmptyState.test.tsx` |
| Success flows | `LoginForm`, `RegisterForm`, hook success paths |
| Optimistic / post-mutation UI | `useNotifications` mark-as-read |
| i18n | `PreferencesContext`, bilingual regex in auth/settings tests |

---

## 10. Updated Coverage Matrix

Legend: ✅ tested · ⚠️ partial · ❌ not tested

| Feature Area | Components | Hooks | Pages | Forms | Utils | A11y |
|--------------|:----------:|:-----:|:-----:|:-----:|:-----:|:----:|
| Dashboard | ⚠️ 2/10 | — | ⚠️ | — | — | ⚠️ |
| Analytics | ⚠️ 1/8 | ✅ | ⚠️ | — | ✅ | ❌ |
| Forecasts | ⚠️ 1/9 | ✅ | ⚠️ | — | — | ❌ |
| AI Accountant | ⚠️ 1/7 | ✅ | ⚠️ | — | — | ❌ |
| Reports | ⚠️ 1/8 | ✅ | ⚠️ | ❌ | — | ❌ |
| Profile | ❌ | ❌ | ❌ | ⚠️ schemas | — | ❌ |
| Settings | ⚠️ 1/2 | ❌ | ⚠️ | ❌ | ✅ prefs | ⚠️ |
| Notifications | ⚠️ 1/7 | ✅ | ⚠️ | — | ✅ | ❌ |
| Onboarding | ⚠️ 1/10 | ❌ | — | — | ✅ storage | ⚠️ |
| Authentication | ✅ 2/3 | — | ✅ 2/2 | ✅ 2/2 | — | ✅ |
| Help Center | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ |
| Navigation | ⚠️ 1/8 | — | — | — | — | ⚠️ |

---

## 11. Recommendations

### P0 — Immediate

1. **Add `npm test` to CI** (`.github/workflows/frontend-ci.yml`) — tests are not run in pipeline yet.
2. **Enable coverage reporting** — add `@vitest/coverage-v8` and `test:coverage` script with thresholds (start at 20%, raise incrementally).
3. **Extend MSW handlers** for dashboard widget endpoints (`/dashboard/tasks-snapshot`, `/imports`, `/dashboard/business-guide-snapshot`) to eliminate warnings in `DashboardView` tests.

### P1 — Short term

4. **Form integration tests** — `PersonalInfoForm`, `ChangePasswordForm` with MSW + validation error display.
5. **Page-level view tests** — `AnalyticsView`, `ForecastsView`, `NotificationCenterView` with loading/error/empty states.
6. **Pure logic tests** — `eligibility-engine.ts`, `task.utils.ts`, `dateBounds.ts` (high ROI, no DOM).
7. **Accessibility** — integrate `vitest-axe` for critical flows (auth, settings, navigation).

### P2 — Medium term

8. **Onboarding flow** — `WelcomeModal`, `ActivationChecklist`, `useActivation` with localStorage mocks.
9. **Profile hooks** — `useProfile`, `useSessions` with MSW.
10. **E2E with Playwright** — login → dashboard → import → settings smoke journey.

### P3 — Long term

11. **Visual regression** — chart components (Recharts) with deterministic dimensions in tests.
12. **Contract tests** — align MSW handlers with OpenAPI/backend schema.
13. **Shared UI primitives** — `Button`, `Input`, `Dialog` interaction tests.

---

## 12. How to Run

```bash
npm test          # run all tests once
npx vitest        # watch mode
```

Test files live next to source: `src/**/*.test.ts(x)`.

---

*Report generated after Этап 2 implementation. See `FRONTEND_TEST_COVERAGE_AUDIT.md` for pre-implementation baseline.*
