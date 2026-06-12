"use client";

import { ReactNode } from "react";
import { PreferencesProvider } from "@/src/shared/context/PreferencesContext";
import { TooltipProvider } from "@/src/shared/components/ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </PreferencesProvider>
  );
}
