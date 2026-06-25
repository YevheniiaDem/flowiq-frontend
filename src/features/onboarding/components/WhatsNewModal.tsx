"use client";

import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import type { WhatsNewRelease } from "../types/activation";

interface WhatsNewModalProps {
  release: WhatsNewRelease | null;
  labels: {
    title: string;
    gotIt: string;
    featurePrefix: string;
  };
  translate: (key: string) => string;
  onDismiss: () => void;
}

export function WhatsNewModal({
  release,
  labels,
  translate,
  onDismiss,
}: WhatsNewModalProps) {
  if (!release) return null;

  return (
    <Dialog open onOpenChange={(open) => !open && onDismiss()}>
      <DialogContent data-testid="whats-new-modal" className="sm:max-w-lg">
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <DialogTitle>{translate(release.titleKey)}</DialogTitle>
          <DialogDescription>
            {labels.title} · v{release.version}
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-3">
          {release.features.map((feature, index) => (
            <li key={index} className="rounded-lg border border-border/50 bg-muted/30 p-3">
              <p className="text-sm font-medium">{translate(feature.titleKey)}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {translate(feature.descriptionKey)}
              </p>
            </li>
          ))}
        </ul>

        <DialogFooter>
          <Button className="w-full sm:w-auto" onClick={onDismiss} autoFocus>
            {labels.gotIt}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
