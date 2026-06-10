export const TRANSACTION_DATE_MIN = "2000-01-01";

export function getTransactionDateMax(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isIsoDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function isValidCalendarDate(value: string): boolean {
  if (!isIsoDateString(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function isTransactionDateInRange(value: string): boolean {
  if (!isValidCalendarDate(value)) {
    return false;
  }

  const max = getTransactionDateMax();
  return value >= TRANSACTION_DATE_MIN && value <= max;
}

export function sanitizeTransactionDate(value: string): string {
  if (!value) {
    return "";
  }

  if (!isValidCalendarDate(value)) {
    return "";
  }

  const max = getTransactionDateMax();

  if (value < TRANSACTION_DATE_MIN) {
    return TRANSACTION_DATE_MIN;
  }

  if (value > max) {
    return max;
  }

  return value;
}
