import { AppLanguage } from "./types";
import { uk } from "./locales/uk";
import { en } from "./locales/en";

const locales = { uk, en } as const;

export type { AppLanguage, AppCurrency } from "./types";
export {
  DEFAULT_LANGUAGE,
  DEFAULT_CURRENCY,
  LANGUAGE_STORAGE_KEY,
  CURRENCY_STORAGE_KEY,
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
  | `settings.${keyof typeof uk.settings & string}`
  | `settings.languages.${keyof (typeof uk.settings)["languages"] & string}`
  | `settings.currencies.${keyof (typeof uk.settings)["currencies"] & string}`
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
