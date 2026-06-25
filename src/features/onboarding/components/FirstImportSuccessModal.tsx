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
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface FirstImportSuccessModalProps {
  open: boolean;
  transactionCount: number;
  labels: {
    title: string;
    description: string;
    viewTransactions: string;
    exploreDashboard: string;
    aiInsight: string;
  };
  onViewTransactions: () => void;
  onExploreDashboard: () => void;
  onClose: () => void;
}

export function FirstImportSuccessModal({
  open,
  transactionCount,
  labels,
  onViewTransactions,
  onExploreDashboard,
  onClose,
}: FirstImportSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent data-testid="first-import-success-modal" className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
          </div>
          <DialogTitle>{labels.title}</DialogTitle>
          <DialogDescription className="leading-relaxed">
            {labels.description.replace("{count}", String(transactionCount))}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">{labels.aiInsight}</p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button className="w-full gap-2" onClick={onViewTransactions}>
            {labels.viewTransactions}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full" onClick={onExploreDashboard}>
            {labels.exploreDashboard}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
