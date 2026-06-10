import { AppLanguage } from "./types";

export type LocalizedString = Record<AppLanguage, string>;

export function pickLocalized(
  value: LocalizedString | string,
  language: AppLanguage
): string {
  if (typeof value === "string") return value;
  return value[language] ?? value.en;
}
