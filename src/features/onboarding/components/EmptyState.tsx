"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import { cn } from "@/src/shared/utils/utils";

interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "outline" | "ghost";
  testId?: string;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
  testId?: string;
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  testId,
  children,
}: EmptyStateProps) {
  return (
    <div
      data-testid={testId}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-card/30 px-6 py-10 text-center backdrop-blur-sm",
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
      {(primaryAction || secondaryAction) && (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {primaryAction && (
            <Button
              size="sm"
              variant={primaryAction.variant ?? "default"}
              data-testid={primaryAction.testId}
              onClick={primaryAction.onClick}
              asChild={!!primaryAction.href}
            >
              {primaryAction.href ? (
                <a href={primaryAction.href}>{primaryAction.label}</a>
              ) : (
                primaryAction.label
              )}
            </Button>
          )}
          {secondaryAction && (
            <Button
              size="sm"
              variant={secondaryAction.variant ?? "outline"}
              data-testid={secondaryAction.testId}
              onClick={secondaryAction.onClick}
              asChild={!!secondaryAction.href}
            >
              {secondaryAction.href ? (
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              ) : (
                secondaryAction.label
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
