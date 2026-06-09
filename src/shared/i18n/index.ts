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
  | `analytics.${keyof typeof uk.analytics & string}`
  | `chat.${keyof typeof uk.chat & string}`
  | `chat.suggestions.${keyof (typeof uk.chat)["suggestions"] & string}`
  | `forecasts.${keyof typeof uk.forecasts & string}`
  | `reports.${keyof typeof uk.reports & string}`
  | `integrations.${keyof typeof uk.integrations & string}`
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
