"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Button } from "@/src/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/shared/components/ui/tooltip";
import { cn } from "@/src/shared/utils/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, t } = usePreferences();
  const isDark = theme === "dark";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClick}
          className={cn(
            "relative h-8 w-8 overflow-hidden rounded-lg hover:bg-accent/50",
            className
          )}
          aria-label={isDark ? t("topNav.themeLight") : t("topNav.themeDark")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isDark ? (
                <Moon className="h-4 w-4 text-foreground/80" />
              ) : (
                <Sun className="h-4 w-4 text-foreground/80" />
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {isDark ? t("topNav.themeLight") : t("topNav.themeDark")}
      </TooltipContent>
    </Tooltip>
  );
}
