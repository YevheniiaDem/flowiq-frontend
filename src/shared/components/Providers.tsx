"use client";

import { ReactNode } from "react";
import { PreferencesProvider } from "@/src/shared/context/PreferencesContext";

export function Providers({ children }: { children: ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}
