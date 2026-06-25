"use client";

import { createContext, useContext } from "react";
import type { ActivationContextValue } from "../types/activation";

export const ActivationContext = createContext<ActivationContextValue | null>(null);

export function useActivation(): ActivationContextValue {
  const context = useContext(ActivationContext);
  if (!context) {
    throw new Error("useActivation must be used within ActivationProvider");
  }
  return context;
}

export function useActivationOptional(): ActivationContextValue | null {
  return useContext(ActivationContext);
}

export function useDemoWorkspace() {
  const context = useActivationOptional();
  return {
    isDemoMode: context?.isDemoMode ?? false,
    enableDemo: context?.enableDemo ?? (() => {}),
    disableDemo: context?.disableDemo ?? (() => {}),
  };
}
