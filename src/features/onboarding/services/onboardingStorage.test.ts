/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from "vitest";
import { onboardingStorage } from "./onboardingStorage";
import { ONBOARDING_STORAGE_KEYS } from "../types";

describe("onboardingStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("tracks welcome pending state", () => {
    expect(onboardingStorage.shouldShowWelcome()).toBe(false);
    onboardingStorage.setPendingWelcome();
    expect(onboardingStorage.shouldShowWelcome()).toBe(true);
  });

  it("marks onboarding completed and clears pending", () => {
    onboardingStorage.setPendingWelcome();
    onboardingStorage.setCompleted();
    expect(onboardingStorage.isCompleted()).toBe(true);
    expect(onboardingStorage.shouldShowWelcome()).toBe(false);
  });

  it("marks onboarding skipped", () => {
    onboardingStorage.setSkipped();
    expect(onboardingStorage.isSkipped()).toBe(true);
    expect(onboardingStorage.shouldShowWelcome()).toBe(false);
  });

  it("tracks contextual hints per feature", () => {
    expect(onboardingStorage.isHintShown("forecasts")).toBe(false);
    onboardingStorage.markHintShown("forecasts");
    expect(onboardingStorage.isHintShown("forecasts")).toBe(true);
    expect(localStorage.getItem(ONBOARDING_STORAGE_KEYS.hintForecasts)).toBe("true");
  });

  it("marks all hints shown", () => {
    onboardingStorage.markAllHintsShown();
    expect(onboardingStorage.isHintShown("ai_accountant")).toBe(true);
    expect(onboardingStorage.isHintShown("imports")).toBe(true);
    expect(onboardingStorage.isHintShown("tasks")).toBe(true);
  });
});
