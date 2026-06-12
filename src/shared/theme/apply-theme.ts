import { AppTheme, DEFAULT_THEME, THEME_STORAGE_KEY } from "@/src/shared/i18n/types";

export function applyThemeToDocument(theme: AppTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}

export function readStoredTheme(): AppTheme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" ? "light" : DEFAULT_THEME;
}

export function persistTheme(theme: AppTheme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function getNextTheme(theme: AppTheme): AppTheme {
  return theme === "dark" ? "light" : "dark";
}

export function runThemeTransition(
  update: () => void,
  origin?: { x: number; y: number }
) {
  if (typeof document === "undefined") {
    update();
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (origin) {
    document.documentElement.style.setProperty("--theme-toggle-x", `${origin.x}px`);
    document.documentElement.style.setProperty("--theme-toggle-y", `${origin.y}px`);
  }

  if (
    prefersReducedMotion ||
    typeof document.startViewTransition !== "function"
  ) {
    update();
    return;
  }

  document.startViewTransition(update);
}
