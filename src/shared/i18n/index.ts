import { AppLanguage } from "./types";
import { uk } from "./locales/uk";
import { en } from "./locales/en";

const locales = { uk, en } as const;

export type { AppLanguage, AppCurrency, AppTheme } from "./types";
export {
  DEFAULT_LANGUAGE,
  DEFAULT_CURRENCY,
  DEFAULT_THEME,
  LANGUAGE_STORAGE_KEY,
  CURRENCY_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "./types";

export type TranslationKey =
  | `nav.${keyof typeof uk.nav & string}`
  | `topNav.${keyof typeof uk.topNav & string}`
  | `auth.${keyof typeof uk.auth & string}`
  | `dashboard.${keyof typeof uk.dashboard & string}`
  | `dashboard.stats.${keyof (typeof uk.dashboard)["stats"] & string}`
  | `dashboard.health.${keyof (typeof uk.dashboard)["health"] & string}`
  | `dashboard.badge.${keyof (typeof uk.dashboard)["badge"] & string}`
  | `dashboard.forecastSnapshot.${keyof (typeof uk.dashboard)["forecastSnapshot"] & string}`
  | `dashboard.tasksSnapshot.${keyof (typeof uk.dashboard)["tasksSnapshot"] & string}`
  | `dashboard.importSnapshot.${keyof (typeof uk.dashboard)["importSnapshot"] & string}`
  | `dashboard.taxProfile.${keyof (typeof uk.dashboard)["taxProfile"] & string}`
  | `dashboard.taxProfile.status.${keyof (typeof uk.dashboard)["taxProfile"]["status"] & string}`
  | `transactions.${keyof typeof uk.transactions & string}`
  | `transactions.summary.${keyof (typeof uk.transactions)["summary"] & string}`
  | `transactions.filters.${keyof (typeof uk.transactions)["filters"] & string}`
  | `transactions.table.${keyof (typeof uk.transactions)["table"] & string}`
  | `transactions.form.${keyof (typeof uk.transactions)["form"] & string}`
  | `transactions.pagination.${keyof (typeof uk.transactions)["pagination"] & string}`
  | `imports.${keyof typeof uk.imports & string}`
  | `imports.stats.${keyof (typeof uk.imports)["stats"] & string}`
  | `imports.upload.${keyof (typeof uk.imports)["upload"] & string}`
  | `imports.history.${keyof (typeof uk.imports)["history"] & string}`
  | `imports.status.${keyof (typeof uk.imports)["status"] & string}`
  | `analytics.${keyof typeof uk.analytics & string}`
  | `analytics.stats.${keyof (typeof uk.analytics)["stats"] & string}`
  | `analytics.charts.${keyof (typeof uk.analytics)["charts"] & string}`
  | `analytics.fop.${keyof (typeof uk.analytics)["fop"] & string}`
  | `analytics.taxProfile.${keyof (typeof uk.analytics)["taxProfile"] & string}`
  | `chat.${keyof typeof uk.chat & string}`
  | `chat.suggestions.${keyof (typeof uk.chat)["suggestions"] & string}`
  | "chat.thinking"
  | "chat.error"
  | "chat.you"
  | "chat.assistant"
  | `aiAccountant.${keyof typeof uk.aiAccountant & string}`
  | `aiAccountant.health.${keyof (typeof uk.aiAccountant)["health"] & string}`
  | `aiAccountant.recommendations.${keyof (typeof uk.aiAccountant)["recommendations"] & string}`
  | `aiAccountant.chat.${keyof (typeof uk.aiAccountant)["chat"] & string}`
  | `aiAccountant.chat.suggestions.${keyof (typeof uk.aiAccountant)["chat"]["suggestions"] & string}`
  | `aiAccountant.tax.${keyof (typeof uk.aiAccountant)["tax"] & string}`
  | `aiAccountant.forecast.${keyof (typeof uk.aiAccountant)["forecast"] & string}`
  | `forecasts.${keyof typeof uk.forecasts & string}`
  | `forecasts.stats.${keyof (typeof uk.forecasts)["stats"] & string}`
  | `forecasts.charts.${keyof (typeof uk.forecasts)["charts"] & string}`
  | `forecasts.tax.${keyof (typeof uk.forecasts)["tax"] & string}`
  | `forecasts.fop.${keyof (typeof uk.forecasts)["fop"] & string}`
  | `tasks.${keyof typeof uk.tasks & string}`
  | `tasks.sections.${keyof (typeof uk.tasks)["sections"] & string}`
  | `tasks.types.${keyof (typeof uk.tasks)["types"] & string}`
  | `tasks.priorities.${keyof (typeof uk.tasks)["priorities"] & string}`
  | `tasks.statuses.${keyof (typeof uk.tasks)["statuses"] & string}`
  | `tasks.calendar.${keyof (typeof uk.tasks)["calendar"] & string}`
  | `tasks.search.${keyof (typeof uk.tasks)["search"] & string}`
  | `tasks.form.${keyof (typeof uk.tasks)["form"] & string}`
  | `reports.${keyof typeof uk.reports & string}`
  | `reports.stats.${keyof (typeof uk.reports)["stats"] & string}`
  | `reports.types.${keyof (typeof uk.reports)["types"] & string}`
  | `reports.formats.${keyof (typeof uk.reports)["formats"] & string}`
  | `reports.periods.${keyof (typeof uk.reports)["periods"] & string}`
  | `reports.status.${keyof (typeof uk.reports)["status"] & string}`
  | `reports.preview.${keyof (typeof uk.reports)["preview"] & string}`
  | `reports.history.${keyof (typeof uk.reports)["history"] & string}`
  | `reports.dialog.${keyof (typeof uk.reports)["dialog"] & string}`
  | `notifications.${keyof typeof uk.notifications & string}`
  | `notifications.stats.${keyof (typeof uk.notifications)["stats"] & string}`
  | `notifications.filters.${keyof (typeof uk.notifications)["filters"] & string}`
  | `notifications.groups.${keyof (typeof uk.notifications)["groups"] & string}`
  | `integrations.${keyof typeof uk.integrations & string}`
  | `integrations.items.${keyof (typeof uk.integrations)["items"] & string}`
  | `integrations.items.monobank.${keyof (typeof uk.integrations)["items"]["monobank"] & string}`
  | `integrations.items.privatbank.${keyof (typeof uk.integrations)["items"]["privatbank"] & string}`
  | `integrations.items.googleSheets.${keyof (typeof uk.integrations)["items"]["googleSheets"] & string}`
  | `integrations.items.shopify.${keyof (typeof uk.integrations)["items"]["shopify"] & string}`
  | `integrations.items.telegram.${keyof (typeof uk.integrations)["items"]["telegram"] & string}`
  | `integrations.items.rozetka.${keyof (typeof uk.integrations)["items"]["rozetka"] & string}`
  | `comingSoon.integrations.${keyof (typeof uk.comingSoon)["integrations"] & string}`
  | `businessGuide.${keyof typeof uk.businessGuide & string}`
  | `businessGuide.profile.${keyof (typeof uk.businessGuide)["profile"] & string}`
  | `businessGuide.health.${keyof (typeof uk.businessGuide)["health"] & string}`
  | `businessGuide.groups.${keyof (typeof uk.businessGuide)["groups"] & string}`
  | `businessGuide.taxes.${keyof (typeof uk.businessGuide)["taxes"] & string}`
  | `businessGuide.kved.${keyof (typeof uk.businessGuide)["kved"] & string}`
  | `businessGuide.recommendations.${keyof (typeof uk.businessGuide)["recommendations"] & string}`
  | `businessGuide.checker.${keyof (typeof uk.businessGuide)["checker"] & string}`
  | `businessGuide.checker.steps.${keyof (typeof uk.businessGuide)["checker"]["steps"] & string}`
  | `businessGuide.checker.activity.${keyof (typeof uk.businessGuide)["checker"]["activity"] & string}`
  | `businessGuide.checker.income.${keyof (typeof uk.businessGuide)["checker"]["income"] & string}`
  | `businessGuide.checker.employees.${keyof (typeof uk.businessGuide)["checker"]["employees"] & string}`
  | `businessGuide.checker.businessType.${keyof (typeof uk.businessGuide)["checker"]["businessType"] & string}`
  | `businessGuide.checker.errors.${keyof (typeof uk.businessGuide)["checker"]["errors"] & string}`
  | `businessGuide.checker.analyzing.${keyof (typeof uk.businessGuide)["checker"]["analyzing"] & string}`
  | `businessGuide.checker.result.${keyof (typeof uk.businessGuide)["checker"]["result"] & string}`
  | `businessGuide.checker.export.${keyof (typeof uk.businessGuide)["checker"]["export"] & string}`
  | `businessGuide.group.${keyof (typeof uk.businessGuide)["group"] & string}`
  | `businessGuide.tabs.${keyof (typeof uk.businessGuide)["tabs"] & string}`
  | `businessGuide.categories.${keyof (typeof uk.businessGuide)["categories"] & string}`
  | `businessGuide.article.${keyof (typeof uk.businessGuide)["article"] & string}`
  | `businessGuide.search.${keyof (typeof uk.businessGuide)["search"] & string}`
  | `businessGuide.updates.${keyof (typeof uk.businessGuide)["updates"] & string}`
  | `businessGuide.widgets.${keyof (typeof uk.businessGuide)["widgets"] & string}`
  | `businessGuide.pagination.${keyof (typeof uk.businessGuide)["pagination"] & string}`
  | `settings.${keyof typeof uk.settings & string}`
  | `settings.languages.${keyof (typeof uk.settings)["languages"] & string}`
  | `settings.currencies.${keyof (typeof uk.settings)["currencies"] & string}`
  | `activation.${keyof typeof uk.activation & string}`
  | `activation.checklist.${keyof (typeof uk.activation)["checklist"] & string}`
  | `activation.checklist.productTour.${keyof (typeof uk.activation)["checklist"]["productTour"] & string}`
  | `activation.checklist.firstImport.${keyof (typeof uk.activation)["checklist"]["firstImport"] & string}`
  | `activation.checklist.reviewTransactions.${keyof (typeof uk.activation)["checklist"]["reviewTransactions"] & string}`
  | `activation.checklist.aiAccountant.${keyof (typeof uk.activation)["checklist"]["aiAccountant"] & string}`
  | `activation.checklist.forecasts.${keyof (typeof uk.activation)["checklist"]["forecasts"] & string}`
  | `activation.checklist.firstTask.${keyof (typeof uk.activation)["checklist"]["firstTask"] & string}`
  | `activation.empty.${keyof (typeof uk.activation)["empty"] & string}`
  | `activation.empty.dashboard.${keyof (typeof uk.activation)["empty"]["dashboard"] & string}`
  | `activation.empty.imports.${keyof (typeof uk.activation)["empty"]["imports"] & string}`
  | `activation.empty.transactions.${keyof (typeof uk.activation)["empty"]["transactions"] & string}`
  | `activation.empty.analytics.${keyof (typeof uk.activation)["empty"]["analytics"] & string}`
  | `activation.empty.forecasts.${keyof (typeof uk.activation)["empty"]["forecasts"] & string}`
  | `activation.empty.tasks.${keyof (typeof uk.activation)["empty"]["tasks"] & string}`
  | `activation.empty.notifications.${keyof (typeof uk.activation)["empty"]["notifications"] & string}`
  | `activation.empty.reports.${keyof (typeof uk.activation)["empty"]["reports"] & string}`
  | `activation.firstImport.${keyof (typeof uk.activation)["firstImport"] & string}`
  | `activation.metrics.${keyof (typeof uk.activation)["metrics"] & string}`
  | `activation.demo.${keyof (typeof uk.activation)["demo"] & string}`
  | `activation.help.${keyof (typeof uk.activation)["help"] & string}`
  | `activation.celebrations.${keyof (typeof uk.activation)["celebrations"] & string}`
  | `activation.celebrations.firstImport.${keyof (typeof uk.activation)["celebrations"]["firstImport"] & string}`
  | `activation.celebrations.checklistComplete.${keyof (typeof uk.activation)["celebrations"]["checklistComplete"] & string}`
  | `activation.celebrations.tourComplete.${keyof (typeof uk.activation)["celebrations"]["tourComplete"] & string}`
  | `activation.whatsNew.${keyof (typeof uk.activation)["whatsNew"] & string}`
  | `activation.whatsNew.v020.${keyof (typeof uk.activation)["whatsNew"]["v020"] & string}`
  | `activation.whatsNew.v020.features.${keyof (typeof uk.activation)["whatsNew"]["v020"]["features"] & string}`
  | `activation.whatsNew.v020.features.checklist.${keyof (typeof uk.activation)["whatsNew"]["v020"]["features"]["checklist"] & string}`
  | `activation.whatsNew.v020.features.demo.${keyof (typeof uk.activation)["whatsNew"]["v020"]["features"]["demo"] & string}`
  | `activation.whatsNew.v020.features.success.${keyof (typeof uk.activation)["whatsNew"]["v020"]["features"]["success"] & string}`
  | `activation.whatsNew.v020.features.help.${keyof (typeof uk.activation)["whatsNew"]["v020"]["features"]["help"] & string}`
  | `onboarding.${keyof typeof uk.onboarding & string}`
  | `onboarding.welcome.${keyof (typeof uk.onboarding)["welcome"] & string}`
  | `onboarding.tour.${keyof (typeof uk.onboarding)["tour"] & string}`
  | `onboarding.tour.steps.${keyof (typeof uk.onboarding)["tour"]["steps"] & string}`
  | `onboarding.tour.steps.dashboard.${keyof (typeof uk.onboarding)["tour"]["steps"]["dashboard"] & string}`
  | `onboarding.tour.steps.imports.${keyof (typeof uk.onboarding)["tour"]["steps"]["imports"] & string}`
  | `onboarding.tour.steps.aiAccountant.${keyof (typeof uk.onboarding)["tour"]["steps"]["aiAccountant"] & string}`
  | `onboarding.tour.steps.forecasts.${keyof (typeof uk.onboarding)["tour"]["steps"]["forecasts"] & string}`
  | `onboarding.tour.steps.tasksNotifications.${keyof (typeof uk.onboarding)["tour"]["steps"]["tasksNotifications"] & string}`
  | `onboarding.tour.steps.success.${keyof (typeof uk.onboarding)["tour"]["steps"]["success"] & string}`
  | `onboarding.hints.${keyof (typeof uk.onboarding)["hints"] & string}`
  | `onboarding.hints.aiAccountant.${keyof (typeof uk.onboarding)["hints"]["aiAccountant"] & string}`
  | `onboarding.hints.forecasts.${keyof (typeof uk.onboarding)["hints"]["forecasts"] & string}`
  | `onboarding.hints.imports.${keyof (typeof uk.onboarding)["hints"]["imports"] & string}`
  | `onboarding.hints.tasks.${keyof (typeof uk.onboarding)["hints"]["tasks"] & string}`
  | `common.${keyof typeof uk.common & string}`;

export function getTranslations(language: AppLanguage) {
  return locales[language] ?? locales.uk;
}

export function translate(
  language: AppLanguage,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const keys = key.split(".");
  let value: unknown = getTranslations(language);

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  if (typeof value !== "string") return key;

  if (!params) return value;

  return Object.entries(params).reduce(
    (result, [paramKey, paramValue]) => result.replace(`{${paramKey}}`, String(paramValue)),
    value
  );
}
