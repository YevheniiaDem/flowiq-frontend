"use client";

import { useEffect } from "react";
import { activationStorage } from "../services/activationStorage";
import { useActivation } from "./useActivationContext";
import type { ChecklistItemId } from "../types/activation";

export function usePageActivation(
  page: string,
  checklistItemId?: ChecklistItemId
): void {
  const { markChecklistItem } = useActivation();

  useEffect(() => {
    activationStorage.markPageVisited(page);
    if (checklistItemId) {
      markChecklistItem(checklistItemId);
    }
  }, [checklistItemId, markChecklistItem, page]);
}
