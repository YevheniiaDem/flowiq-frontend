# FlowIQ Onboarding UX Strategy

## Executive summary

FlowIQ onboarding is designed as an **activation system**, not a feature tour. The north-star metric is **time to first value (TTFV)**: a new user imports their first bank statement and sees meaningful financial insights on the dashboard.

The system layers:

1. **Awareness** — welcome modal, product tour, What's New
2. **Activation** — checklist with progress, empty states with CTAs
3. **First value** — first import success flow, demo workspace
4. **Retention** — contextual hints, metric tooltips, Help & Learn Center, celebrations

---

## User journey

```
Registration
    │
    ▼
Welcome modal ──Skip──► Checklist + empty states (persistent guidance)
    │
    Start Tour
    │
    ▼
6-step Driver.js tour (orientation)
    │
    ▼
Activation checklist on Dashboard
    │
    ├─► Demo workspace (optional, no backend data)
    │
    └─► Import first CSV statement ◄── PRIMARY VALUE MOMENT
            │
            ▼
        First Import Success modal
            │
            ├─► Review transactions
            ├─► Explore dashboard (stats + AI insights)
            └─► Checklist progress → AI Accountant → Forecasts → Tasks
                    │
                    ▼
                Checklist complete celebration
                    │
                    ▼
                Habit loops: notifications, reports, analytics
```

### Personas & paths

| Persona | Path | First value trigger |
|---------|------|---------------------|
| New FOP entrepreneur | Register → checklist → import | First successful CSV import |
| Explorer (no data yet) | Demo workspace → tour → import | Switches from demo to real data |
| Returning user (login) | No welcome; checklist if incomplete | Completing remaining checklist items |
| Power user (update) | What's New modal | Discovers new activation features |

---

## Activation funnel

| Stage | Definition | Implementation | Target |
|-------|------------|----------------|--------|
| **A1 — Signup** | Account created | `RegisterForm` → `onboarding_pending` | 100% |
| **A2 — Welcome** | Saw welcome modal | `onboarding_welcome_shown` event | ≥95% of A1 |
| **A3 — Oriented** | Started or skipped tour | `onboarding_tour_started` / `onboarding_welcome_skipped` | ≥80% of A2 |
| **A4 — Activated intent** | Clicked import CTA (checklist, empty state, or tour) | `onboarding_empty_state_cta_clicked` | ≥60% of A3 |
| **A5 — First import** | First `COMPLETED` import job | `onboarding_first_import_success` | ≥40% of A4 |
| **A6 — Verified** | Opened transactions after import | `review_transactions` checklist item | ≥70% of A5 |
| **A7 — Engaged** | Used AI Accountant + Forecasts | Checklist items `ai_accountant`, `forecasts` | ≥50% of A6 |
| **A8 — Retained** | Returned within 7 days | External analytics (not in localStorage) | ≥35% of A5 |

### Checklist items (activation milestones)

| ID | Milestone | Auto-complete trigger |
|----|-----------|----------------------|
| `product_tour` | Complete product tour | `onboarding_completed` |
| `first_import` | Import first statement | First `COMPLETED`/`PARTIAL` import job |
| `review_transactions` | Review transactions | Manual on first-import CTA; page visit + data |
| `ai_accountant` | Visit AI Accountant | Page visit |
| `forecasts` | Visit Forecasts | Page visit |
| `first_task` | Create or have a task | `tasks.length > 0` |

---

## Onboarding metrics

### Product analytics events

Events are emitted via `trackEvent()` in `src/features/onboarding/services/productAnalytics.ts`.

| Event | When | Key properties |
|-------|------|----------------|
| `onboarding_welcome_shown` | Welcome modal opens | — |
| `onboarding_welcome_start_tour` | User clicks Start Tour | — |
| `onboarding_welcome_skipped` | User skips welcome | — |
| `onboarding_tour_started` | Driver.js tour begins | `fromSettings` |
| `onboarding_tour_completed` | Tour finished (success CTA) | — |
| `onboarding_tour_skipped` | Tour skipped mid-way | — |
| `onboarding_checklist_item_completed` | Checklist item done | `item` |
| `onboarding_checklist_completed` | All 6 items done | — |
| `onboarding_first_import_success` | First import detected | `rows` |
| `onboarding_demo_workspace_enabled` | Demo mode on | `source` |
| `onboarding_demo_workspace_disabled` | Demo mode off | — |
| `onboarding_empty_state_cta_clicked` | Empty state CTA | `target` |
| `onboarding_celebration_shown` | Celebration modal | `celebration` |
| `onboarding_whats_new_shown` | What's New modal | `version` |
| `onboarding_help_article_opened` | Help center link | `resource` |
| `import_upload_started` | File upload begins | `fileName` |
| `import_upload_succeeded` | Upload OK | `rows`, `first` |
| `import_upload_failed` | Upload error | — |

**Dev inspection:** `getAnalyticsQueue()` returns the last 100 events from `localStorage` (`flowiq_analytics_queue`). Production should forward `flowiq:analytics` custom events to PostHog/Mixpanel.

### Health metrics to monitor

- **TTFV** — median minutes from registration to `onboarding_first_import_success`
- **Tour completion rate** — `tour_completed / tour_started`
- **Checklist completion rate** — `checklist_completed / welcome_shown`
- **Demo → real conversion** — users who disable demo after enabling it
- **Drop-off by checklist item** — which step has lowest completion
- **Empty state CTR** — clicks per empty state impression

---

## Drop-off points & mitigations

| Drop-off point | Why users leave | Current mitigation | Recommended improvement |
|----------------|-----------------|--------------------|-------------------------|
| **Backend unavailable** | Dashboard shows error, feels broken | Empty state + demo workspace CTA | Default to demo for new users when API fails |
| **Welcome skip** | Impatient users skip tour | Checklist persists on dashboard | Email/push reminder with import CTA |
| **Import friction** | CSV format confusion | Contextual hint on Imports page | Inline format examples + sample CSV download |
| **Tour without action** | Tour ends at CTA but no upload | Success step links to `/imports` | Auto-focus upload zone after tour |
| **Post-import silence** | No feedback after upload | First Import Success modal | Add progress polling for `PROCESSING` jobs |
| **Empty transactions** | Imported but didn't review | Checklist item + success modal CTA | Badge on Transactions nav after import |
| **Feature overwhelm** | Too many nav items | Checklist prioritizes 6 actions | Progressive nav (hide Reports until activated) |
| **No mobile sidebar** | Fixed `pl-56` layout | Responsive Driver.js popovers | Mobile nav drawer (separate initiative) |
| **localStorage only** | State lost on new device | Documented limitation | Sync activation flags via `/auth/me` API |
| **Login users** | No welcome for existing accounts | Settings → Help → tour replay | Optional "What's new" for returning users |

---

## Retention recommendations

1. **Anchor on import** — every empty state and checklist item should eventually point toward importing real data or reviewing imported transactions.

2. **Celebrate micro-wins** — first import, checklist complete, tour complete trigger celebration modals with clear next steps.

3. **Demo as bridge, not destination** — demo workspace shows value immediately but banner reminds users to import real statements.

4. **Contextual education** — metric tooltips on dashboard stats explain revenue, profit, cash flow without leaving the page.

5. **Help hub, not scattered links** — Settings → Help & Learn Center centralizes tour, Business Guide, demo, checklist.

6. **What's New for releases** — versioned framework (`config/whatsNew.ts`) re-engages users after deploys.

7. **Reduce time-to-insight** — after first import, surface AI Accountant suggestion based on imported categories.

8. **Weekly checklist nudge** — if checklist incomplete after 7 days, show compact reminder on dashboard (future).

---

## Architecture map

```
MainLayout
├── ActivationProvider          # checklist, demo, celebrations, what's new
│   └── OnboardingProvider      # welcome modal, Driver.js tour
│       ├── DemoWorkspaceBanner
│       ├── Sidebar + TopNav
│       └── Feature views
│           ├── Dashboard       # ActivationChecklist, metric tooltips, demo data
│           ├── Imports         # FirstImportSuccessModal, empty state
│           ├── Transactions    # empty state (enhanced)
│           ├── Analytics       # empty state → import CTA
│           ├── Forecasts       # empty state → import CTA
│           ├── Tasks           # empty state + checklist
│           └── Settings        # HelpLearnCenter
```

**Storage keys:**

| Key | Purpose |
|-----|---------|
| `onboarding_completed` / `onboarding_skipped` | Tour state |
| `onboarding_checklist_*` | Per-item checklist progress |
| `onboarding_demo_workspace` | Demo mode flag |
| `onboarding_first_import_celebrated` | First import flow shown once |
| `onboarding_whats_new_version` | Last seen release |
| `onboarding_celebration_*` | Celebration shown flags |
| `flowiq_analytics_queue` | Dev analytics buffer |

---

## Roadmap

### Phase 1 — Shipped (v0.2.0)

- [x] Activation checklist with progress bar
- [x] Empty states (dashboard, imports, analytics, forecasts, tasks)
- [x] First import success flow
- [x] Metric tooltips (dashboard stats)
- [x] Help & Learn Center
- [x] Demo workspace
- [x] Product analytics event layer
- [x] What's New framework (v0.2.0)
- [x] Celebration moments (tour, checklist, import)

### Phase 2 — Near term

- [ ] Metric tooltips on Analytics and Forecasts summary cards
- [ ] Empty states for Transactions, Reports, Notifications (rich CTAs)
- [ ] Sample CSV download on Imports page
- [ ] PostHog/Mixpanel integration via `flowiq:analytics` listener
- [ ] Backend sync of activation state on `User` model
- [ ] Import processing progress UI (`PENDING` → `COMPLETED` polling)

### Phase 3 — Growth

- [ ] Progressive disclosure in sidebar (unlock features as checklist completes)
- [ ] Personalized checklist (skip tour if power user)
- [ ] In-app NPS after checklist complete
- [ ] Email drip for skipped onboarding (requires backend)
- [ ] A/B tests on welcome modal copy and checklist order
- [ ] Mobile-first onboarding with bottom sheet tour

### Phase 4 — Intelligence

- [ ] AI-generated onboarding tips based on FOP group
- [ ] Smart empty states (detect partial data, suggest next action)
- [ ] Predictive churn alerts from activation funnel drop-off

---

## Adding a What's New release

1. Bump `APP_RELEASE_VERSION` in `config/whatsNew.ts`.
2. Add release object to `WHATS_NEW_RELEASES` with i18n keys under `activation.whatsNew.vXXX`.
3. Extend `TranslationKey` in `src/shared/i18n/index.ts` if needed.
4. Users with `onboarding_whats_new_version` ≠ new version see the modal on next login.

## Adding a checklist item

1. Add ID to `ChecklistItemId` in `types/activation.ts`.
2. Add config in `config/checklistItems.ts`.
3. Add i18n under `activation.checklist.<item>`.
4. Implement auto-complete logic (page visit hook, API signal, or manual `markChecklistItem`).

---

## Related documents

- [ONBOARDING_ARCHITECTURE.md](../../ONBOARDING_ARCHITECTURE.md) — Driver.js tour, welcome modal, contextual hints
- [LAYOUT_README.md](../../LAYOUT_README.md) — app shell structure
