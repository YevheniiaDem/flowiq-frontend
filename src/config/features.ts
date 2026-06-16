/**
 * Feature flags for gradual rollout. Bank integrations are architecturally
 * prepared but not exposed in the active UI until Phase 2+ (see BANK_INTEGRATIONS_ROADMAP.md).
 */
export const FEATURE_FLAGS = {
  BANK_INTEGRATIONS_ENABLED: false,
} as const;
