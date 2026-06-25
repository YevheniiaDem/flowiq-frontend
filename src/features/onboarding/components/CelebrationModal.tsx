"use client";

import { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import type { CelebrationId } from "../types/activation";
import "../styles/celebration.css";

export interface CelebrationPayload {
  id: CelebrationId;
  title: string;
  description: string;
  primaryCta: string;
  onPrimary: () => void;
  secondaryCta?: string;
  onSecondary?: () => void;
}

interface CelebrationModalProps {
  celebration: CelebrationPayload | null;
  onClose: () => void;
}

export function CelebrationModal({ celebration, onClose }: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (celebration) {
      setShowConfetti(true);
      const timer = window.setTimeout(() => setShowConfetti(false), 3000);
      return () => window.clearTimeout(timer);
    }
    setShowConfetti(false);
  }, [celebration]);

  return (
    <Dialog open={!!celebration} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-testid="celebration-modal"
        className="overflow-hidden sm:max-w-md"
        onEscapeKeyDown={onClose}
      >
        {showConfetti && <div className="flowiq-confetti" aria-hidden="true" />}
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
            <PartyPopper className="h-7 w-7 text-emerald-500" aria-hidden="true" />
          </div>
          <DialogTitle className="text-xl">{celebration?.title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {celebration?.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {celebration && (
            <>
              <Button className="w-full" onClick={celebration.onPrimary} autoFocus>
                {celebration.primaryCta}
              </Button>
              {celebration.secondaryCta && celebration.onSecondary && (
                <Button variant="ghost" className="w-full" onClick={celebration.onSecondary}>
                  {celebration.secondaryCta}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
