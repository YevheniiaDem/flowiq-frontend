import { FopGroupSlug } from "../../types";

export const INCOME_LIMITS: Record<Exclude<FopGroupSlug, "general">, number> = {
  "1": 1_672_000,
  "2": 5_328_000,
  "3": 7_818_000,
};

export const GROUP_NAMES: Record<FopGroupSlug, string> = {
  "1": "FOP Group 1",
  "2": "FOP Group 2",
  "3": "FOP Group 3",
  general: "General Tax System",
};

export const MAX_EMPLOYEES: Record<Exclude<FopGroupSlug, "general">, number> = {
  "1": 0,
  "2": 10,
  "3": Infinity,
};

export const MIN_ESV_MONTHLY = 1_760;
export const ESV_RATE = 0.22;
