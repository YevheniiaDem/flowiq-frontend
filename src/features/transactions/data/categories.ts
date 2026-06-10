import { TransactionType } from "../types";

export const INCOME_CATEGORIES = [
  "Services",
  "Consulting",
  "Software",
  "Sales",
  "Subscription",
  "Other",
] as const;

export const EXPENSE_CATEGORIES = [
  "Marketing",
  "Salary",
  "Infrastructure",
  "Equipment",
  "Office",
  "Taxes",
  "Software",
  "Other",
] as const;

export function getCategoriesForType(type: TransactionType): readonly string[] {
  return type === "INCOME" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}
