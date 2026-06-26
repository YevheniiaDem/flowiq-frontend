"use client";

import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/src/shared/utils/utils";

interface SuccessToastProps {
  message: string;
  open: boolean;
  onClose: () => void;
  durationMs?: number;
}

export function SuccessToast({ message, open, onClose, durationMs = 4000 }: SuccessToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timer);
  }, [open, onClose, durationMs]);

  if (!open) return null;

  return (
    <div
      role="status"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/30",
        "bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 shadow-lg backdrop-blur-sm dark:text-emerald-400"
      )}
    >
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      <span>{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 rounded-md p-0.5 text-emerald-600/70 hover:text-emerald-600 dark:text-emerald-400/70"
        aria-label="Close"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
