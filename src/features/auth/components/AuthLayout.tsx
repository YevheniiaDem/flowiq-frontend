"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { FlowiqIcon } from "@/src/shared/components/brand/FlowiqIcon";
import { AmbientBackground } from "@/src/shared/components/layout/AmbientBackground";
import { ThemeToggle } from "@/src/shared/components/theme/ThemeToggle";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = usePreferences();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <AmbientBackground />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <FlowiqIcon className="h-10 w-10" />
          <h1 className="text-xl font-semibold leading-none tracking-tight">Flowiq</h1>
          <p className="text-xs text-muted-foreground">{t("auth.tagline")}</p>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
