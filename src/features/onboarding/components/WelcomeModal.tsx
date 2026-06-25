"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Sparkles } from "lucide-react";

interface WelcomeModalProps {
  open: boolean;
  onStartTour: () => void;
  onSkip: () => void;
}

export function WelcomeModal({ open, onStartTour, onSkip }: WelcomeModalProps) {
  const { t } = usePreferences();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onSkip()}>
      <DialogContent
        data-testid="onboarding-welcome-modal"
        className="sm:max-w-md"
        showCloseButton={false}
        onEscapeKeyDown={onSkip}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <DialogTitle className="text-xl">{t("onboarding.welcome.title")}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {t("onboarding.welcome.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            data-testid="onboarding-start-tour-btn"
            className="w-full"
            onClick={onStartTour}
            autoFocus
          >
            {t("onboarding.welcome.startTour")}
          </Button>
          <Button
            data-testid="onboarding-skip-btn"
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={onSkip}
          >
            {t("onboarding.welcome.skip")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
