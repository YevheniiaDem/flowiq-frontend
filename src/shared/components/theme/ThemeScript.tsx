import { THEME_STORAGE_KEY } from "@/src/shared/i18n/types";

const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem("${THEME_STORAGE_KEY}");
    var root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.dataset.theme = "light";
    } else {
      root.classList.add("dark");
      root.dataset.theme = "dark";
    }
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  );
}
