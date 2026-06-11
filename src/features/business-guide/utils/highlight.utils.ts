export function highlightText(text: string, query: string): string {
  if (!query.trim() || !text) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    "<mark class='rounded bg-primary/20 px-0.5 text-primary'>$1</mark>"
  );
}

export function formatArticleDate(
  date: string | undefined,
  locale: string
): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
