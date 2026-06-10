import { AppLanguage } from "@/src/shared/i18n/types";
import { TaxProfile } from "@/src/shared/types";

const taxProfiles: Record<AppLanguage, TaxProfile> = {
  en: {
    currentGroup: "FOP Group 2",
    taxSystem: "Unified Tax (5%)",
    mainKved: "62.01",
    mainKvedName: "Computer programming activities",
    incomeLimitUsage: 68,
    nextTaxPaymentDays: 18,
    nextTaxPaymentLabel: "Unified Tax — Q2",
    taxStatus: "healthy",
    aiInsight:
      "Your income is growing steadily. Monitor your annual limit and consider Group 3 if growth continues.",
  },
  uk: {
    currentGroup: "Група ФОП 2",
    taxSystem: "Єдиний податок (5%)",
    mainKved: "62.01",
    mainKvedName: "Комп'ютерне програмування",
    incomeLimitUsage: 68,
    nextTaxPaymentDays: 18,
    nextTaxPaymentLabel: "Єдиний податок — II кв.",
    taxStatus: "healthy",
    aiInsight:
      "Ваш дохід стабільно зростає. Слідкуйте за річним лімітом і розгляньте перехід на Групу 3, якщо зростання продовжиться.",
  },
};

export function getTaxProfile(language: AppLanguage): TaxProfile {
  return taxProfiles[language];
}
