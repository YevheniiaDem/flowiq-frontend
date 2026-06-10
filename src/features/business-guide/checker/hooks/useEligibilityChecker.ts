"use client";

import { useCallback, useState } from "react";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { checkerService } from "../services/checker.service";
import {
  BusinessType,
  CheckerInput,
  CheckerPhase,
  CheckerResult,
  EmployeeRange,
} from "../types";

const DEFAULT_INPUT: CheckerInput = {
  activity: "",
  annualIncome: 1_500_000,
  employees: "none",
  businessType: "both",
};

export function useEligibilityChecker(initialInput?: Partial<CheckerInput>) {
  const { language } = usePreferences();
  const [input, setInput] = useState<CheckerInput>({
    ...DEFAULT_INPUT,
    ...initialInput,
  });
  const [phase, setPhase] = useState<CheckerPhase>("form");
  const [result, setResult] = useState<CheckerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateInput = useCallback((patch: Partial<CheckerInput>) => {
    setInput((prev) => ({ ...prev, ...patch }));
  }, []);

  const analyze = useCallback(async () => {
    if (!input.activity.trim()) {
      setError("activity_required");
      return;
    }

    setError(null);
    setPhase("analyzing");

    try {
      const analysis = await checkerService.analyze(input, language);
      setResult(analysis);
      setPhase("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "analysis_failed");
      setPhase("form");
    }
  }, [input, language]);

  const reset = useCallback(() => {
    setPhase("form");
    setResult(null);
    setError(null);
  }, []);

  const setActivity = useCallback(
    (activity: string, presetId?: CheckerInput["activityPresetId"]) => {
      updateInput({ activity, activityPresetId: presetId });
    },
    [updateInput]
  );

  const setIncome = useCallback(
    (annualIncome: number) => updateInput({ annualIncome }),
    [updateInput]
  );

  const setEmployees = useCallback(
    (employees: EmployeeRange) => updateInput({ employees }),
    [updateInput]
  );

  const setBusinessType = useCallback(
    (businessType: BusinessType) => updateInput({ businessType }),
    [updateInput]
  );

  return {
    input,
    phase,
    result,
    error,
    updateInput,
    setActivity,
    setIncome,
    setEmployees,
    setBusinessType,
    analyze,
    reset,
  };
}
