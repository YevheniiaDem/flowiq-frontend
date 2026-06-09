import { AppCurrency } from "@/src/shared/i18n/types";

/** Base amounts in API/DB are stored in UAH */
const RATES_FROM_UAH: Record<Exclude<AppCurrency, "UAH">, number> = {
  USD: 1 / 41,
  EUR: 1 / 44,
};

export function convertFromUah(amount: number, currency: AppCurrency): number {
  if (currency === "UAH") return amount;
  return amount * RATES_FROM_UAH[currency];
}

export function formatCurrency(amount: number, currency: AppCurrency, locale?: string): string {
  const resolvedLocale = locale ?? (currency === "UAH" ? "uk-UA" : "en-US");
  const value = convertFromUah(amount, currency);

  if (currency === "UAH") {
    const formatted = new Intl.NumberFormat("uk-UA", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(value));
    return `${formatted} ₴`;
  }

  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
