"use client";

import { createContext, useContext } from "react";
import type { OnboardingContextValue } from "../types";

export const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}

export function useOnboardingOptional(): OnboardingContextValue | null {
  return useContext(OnboardingContext);
}
