"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ImportJob } from "@/src/features/imports/types";
import { activationStorage } from "../services/activationStorage";
import { helpGuideStorage } from "../services/helpGuideStorage";
import { trackEvent } from "../services/productAnalytics";
import { useActivation } from "./useActivationContext";

export function useFirstImportSuccess(jobs: ImportJob[], enabled = true) {
  const router = useRouter();
  const { markChecklistItem } = useActivation();
  const [showModal, setShowModal] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const prevCompletedRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const completedJobs = jobs.filter(
      (job) => job.status === "COMPLETED" || job.status === "PARTIAL"
    );
    const completedCount = completedJobs.length;

    if (
      completedCount > prevCompletedRef.current &&
      !activationStorage.isFirstImportCelebrated()
    ) {
      const latest = completedJobs[0];
      const count = latest?.rowsImported ?? 0;

      activationStorage.markFirstImportCelebrated();
      markChecklistItem("first_import");
      trackEvent("onboarding_first_import_success", { rows: count });
      trackEvent("import_upload_succeeded", { rows: count, first: true });

      setImportedCount(count);
      setShowModal(true);
    }

    if (completedCount > 0) {
      markChecklistItem("first_import");
    }

    prevCompletedRef.current = completedCount;
  }, [enabled, jobs, markChecklistItem]);

  const dismiss = () => setShowModal(false);

  const viewTransactions = () => {
    dismiss();
    helpGuideStorage.setPending("transactions_guide");
    router.push("/transactions");
  };

  const exploreDashboard = () => {
    dismiss();
    router.push("/");
  };

  return {
    showModal,
    importedCount,
    dismiss,
    viewTransactions,
    exploreDashboard,
  };
}
