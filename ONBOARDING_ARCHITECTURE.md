# FlowIQ Onboarding Architecture

## Overview

The onboarding system guides new users through FlowIQ after registration using **Driver.js** for spotlight tours and contextual hints. State is persisted in **localStorage** — no backend changes required.

```
src/features/onboarding/
├── components/
│   ├── OnboardingProvider.tsx   # Root orchestrator (context + welcome modal)
│   └── WelcomeModal.tsx         # First-login welcome dialog
├── hooks/
│   ├── useOnboardingContext.ts  # React context for tour control
│   └── useContextualHint.ts     # Per-page first-visit hints
├── services/
│   ├── onboardingStorage.ts     # localStorage state machine
│   ├── createDriver.ts          # Driver.js factory with FlowIQ theme
│   └── domUtils.ts              # Element wait / focus helpers
├── tour-config/
│   ├── productTour.ts           # 6-step guided tour definition
│   └── contextualHints.ts       # One-time page hints
├── styles/
│   └── onboarding.css           # Driver.js popover theming + responsive rules
├── types/
│   └── index.ts
└── index.ts                     # Public API
```

## Integration Points

| Location | Role |
|----------|------|
| `MainLayout.tsx` | Wraps authenticated shell with `OnboardingProvider` |
| `RegisterForm.tsx` | Sets `onboarding_pending` after successful registration |
| `SettingsView.tsx` | Help section → **Start Product Tour** (replay) |
| `AIAccountantView.tsx` | `useContextualHint("ai_accountant")` |
| `ForecastsView.tsx` | `useContextualHint("forecasts")` |
| `ImportsView.tsx` | `useContextualHint("imports")` |
| `TasksView.tsx` | `useContextualHint("tasks")` |

Auth flow is unchanged: login/register still redirect to `/`. Onboarding only activates inside `MainLayout` after the existing client-side auth check passes.

## User Flows

### 1. First login after registration

```
Register → onboarding_pending=true → Dashboard (MainLayout)
    → WelcomeModal (Start Tour | Skip)
        → Start Tour → 6-step Driver.js tour
        → Skip → onboarding_skipped=true (never auto-show again)
```

### 2. Product tour (6 steps)

| Step | Route | Highlight target |
|------|-------|------------------|
| 1. Dashboard overview | `/` | `[data-testid="dashboard-stats"]` |
| 2. Import transactions | `/imports` | `[data-testid="imports-upload-zone"]` |
| 3. AI Accountant | `/ai-accountant` | `[data-testid="ai-accountant-chat"]` |
| 4. Forecasts | `/forecasts` | `[data-testid="forecasts-summary-cards"]` |
| 5. Tasks & notifications | `/tasks` | `[data-testid="tasks-add-btn"]` |
| 6. Success + CTA | overlay | Centered popover → **Import your first statement** |

Cross-page navigation uses `router.push()` + `waitForElement()` in each step's `onHighlightStarted` hook.

### 3. Contextual hints (first page visit)

Shown once per page when the user opens a feature outside an active tour:

- AI Accountant, Forecasts, Imports, Tasks

Blocked while welcome modal or product tour is active.

### 4. Replay from Settings

**Settings → Help → Start Product Tour** calls `startTour({ fromSettings: true })`. Skipping or closing mid-replay does **not** write `onboarding_skipped`.

## localStorage State Machine

### Primary keys (required)

| Key | Values | Meaning |
|-----|--------|---------|
| `onboarding_completed` | `"true"` / absent | User finished the product tour |
| `onboarding_skipped` | `"true"` / absent | User dismissed onboarding; no auto-show |

### Internal key

| Key | Purpose |
|-----|---------|
| `onboarding_pending` | Set on registration; triggers welcome modal once |

### Contextual hint keys

| Key | Page |
|-----|------|
| `onboarding_hint_ai_accountant` | `/ai-accountant` |
| `onboarding_hint_forecasts` | `/forecasts` |
| `onboarding_hint_imports` | `/imports` |
| `onboarding_hint_tasks` | `/tasks` |

### State transitions

```
[Registration]
    onboarding_pending = true

[Welcome → Start Tour]
    onboarding_pending = false
    → tour running

[Tour → Success CTA / Skip on success]
    onboarding_completed = true

[Tour → Skip (any step) / Welcome → Skip]
    onboarding_skipped = true
    onboarding_pending = false

[Settings → Start Product Tour]
    no flag changes on dismiss; completion still sets onboarding_completed
```

### Decision: should welcome modal show?

```ts
onboarding_pending === true
  && onboarding_completed !== true
  && onboarding_skipped !== true
```

## Accessibility

- **Keyboard**: Driver.js `allowKeyboardControl: true` (arrows, Enter)
- **ESC**: `allowClose: true` closes tour/hints
- **Focus**: Welcome modal primary button receives `autoFocus`; popover buttons get `aria-label`
- **Screen readers**: Dialog uses Radix `DialogTitle` / `DialogDescription`

## Responsive Support

Custom CSS in `onboarding.css`:

- **Mobile** (`≤768px`): full-width popovers, stacked footer buttons
- **Tablet** (`769–1024px`): constrained popover width
- **Desktop**: default Driver.js positioning with FlowIQ theme tokens

## Adding a New Tour Step

1. Add `data-testid` to the target element in the feature view.
2. Add i18n keys under `onboarding.tour.steps.<stepId>` in `en.ts` and `uk.ts`.
3. Extend `TranslationKey` in `src/shared/i18n/index.ts`.
4. Add a step object in `tour-config/productTour.ts`:

```ts
{
  element: '[data-testid="my-new-target"]',
  onHighlightStarted: async () => {
    await navigateAndWait(router, "/my-route", '[data-testid="my-new-target"]');
  },
  popover: attachSkipButton({
    title: t("onboarding.tour.steps.myStep.title"),
    description: t("onboarding.tour.steps.myStep.description"),
    side: "bottom",
    align: "start",
    showProgress: true,
    progressText: progressText(t, N),
    nextBtnText: t("onboarding.tour.next"),
    prevBtnText: t("onboarding.tour.back"),
  }),
},
```

5. Update `TOTAL_STEPS` in `productTour.ts`.

## Adding a New Contextual Hint

1. Add `data-testid` to the target element.
2. Add i18n under `onboarding.hints.<feature>`.
3. Add storage key in `types/index.ts` → `ONBOARDING_STORAGE_KEYS`.
4. Register in `CONTEXTUAL_HINTS` in `tour-config/contextualHints.ts`.
5. Call `useContextualHint("<id>")` in the feature view.

## Public API

```ts
import {
  OnboardingProvider,
  useOnboarding,
  useContextualHint,
  onboardingStorage,
} from "@/src/features/onboarding";
```

## Dependencies

- `driver.js` — product tour engine (not `react-joyride`)
- Existing shadcn `Dialog` — welcome modal
- `PreferencesContext` — i18n (`t()`)
