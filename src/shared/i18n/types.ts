export type AppLanguage = "uk" | "en";

export type AppCurrency = "UAH" | "USD" | "EUR";

export type AppTheme = "light" | "dark";

export const DEFAULT_LANGUAGE: AppLanguage = "uk";
export const DEFAULT_CURRENCY: AppCurrency = "UAH";
export const DEFAULT_THEME: AppTheme = "dark";

export const LANGUAGE_STORAGE_KEY = "flowiq_language";
export const CURRENCY_STORAGE_KEY = "flowiq_currency";
export const THEME_STORAGE_KEY = "flowiq_theme";
