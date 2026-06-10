import { AppLanguage } from "@/src/shared/i18n/types";
import * as en from "./en";
import * as uk from "./uk";

export function getBusinessGuideLocale(language: AppLanguage) {
  return language === "uk" ? uk : en;
}
