"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AppCurrency,
  AppLanguage,
  AppTheme,
  CURRENCY_STORAGE_KEY,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  DEFAULT_THEME,
  LANGUAGE_STORAGE_KEY,
  translate,
  TranslationKey,
} from "@/src/shared/i18n";
import {
  applyThemeToDocument,
  getNextTheme,
  persistTheme,
  readStoredTheme,
  runThemeTransition,
} from "@/src/shared/theme/apply-theme";

interface ThemeTransitionOrigin {
  x: number;
  y: number;
}

interface PreferencesContextValue {
  language: AppLanguage;
  currency: AppCurrency;
  theme: AppTheme;
  setLanguage: (language: AppLanguage) => void;
  setCurrency: (currency: AppCurrency) => void;
  setTheme: (theme: AppTheme, origin?: ThemeTransitionOrigin) => void;
  toggleTheme: (origin?: ThemeTransitionOrigin) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function readStoredLanguage(): AppLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "en" ? "en" : DEFAULT_LANGUAGE;
}

function readStoredCurrency(): AppCurrency {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;
  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
  if (stored === "USD" || stored === "EUR") return stored;
  return DEFAULT_CURRENCY;
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(DEFAULT_LANGUAGE);
  const [currency, setCurrencyState] = useState<AppCurrency>(DEFAULT_CURRENCY);
  const [theme, setThemeState] = useState<AppTheme>(DEFAULT_THEME);
  const themeRef = useRef<AppTheme>(DEFAULT_THEME);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    setLanguageState(readStoredLanguage());
    setCurrencyState(readStoredCurrency());
    setThemeState(readStoredTheme());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setTheme = useCallback(
    (next: AppTheme, origin?: ThemeTransitionOrigin) => {
      runThemeTransition(() => {
        setThemeState(next);
        persistTheme(next);
        applyThemeToDocument(next);
      }, origin);
    },
    []
  );

  const toggleTheme = useCallback(
    (origin?: ThemeTransitionOrigin) => {
      setTheme(getNextTheme(themeRef.current), origin);
    },
    [setTheme]
  );

  const setLanguage = useCallback((next: AppLanguage) => {
    setLanguageState(next);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  }, []);

  const setCurrency = useCallback((next: AppCurrency) => {
    setCurrencyState(next);
    localStorage.setItem(CURRENCY_STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) =>
      translate(language, key, params),
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      currency,
      theme,
      setLanguage,
      setCurrency,
      setTheme,
      toggleTheme,
      t,
    }),
    [language, currency, theme, setLanguage, setCurrency, setTheme, toggleTheme, t]
  );

  return (
    <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return context;
}
