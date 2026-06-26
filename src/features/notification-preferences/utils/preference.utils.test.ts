import { describe, expect, it } from "vitest";
import {
  clonePreferences,
  diffPreferences,
  setAllChannels,
} from "./preference.utils";
import type { NotificationPreferencesResponse } from "../types";

const basePreferences: NotificationPreferencesResponse = {
  channels: ["EMAIL", "IN_APP"],
  categories: [
    {
      id: "TAX",
      preferences: [
        {
          key: "TAX_DEADLINE",
          channels: { EMAIL: true, IN_APP: true, PUSH: false, TELEGRAM: false },
        },
        {
          key: "TAX_REMINDER",
          channels: { EMAIL: false, IN_APP: true, PUSH: false, TELEGRAM: false },
        },
      ],
    },
  ],
};

describe("preference.utils", () => {
  it("clones preferences deeply", () => {
    const clone = clonePreferences(basePreferences);
    clone.categories[0].preferences[0].channels.EMAIL = false;
    expect(basePreferences.categories[0].preferences[0].channels.EMAIL).toBe(true);
  });

  it("detects preference diffs", () => {
    const draft = clonePreferences(basePreferences);
    draft.categories[0].preferences[0].channels.EMAIL = false;

    const changes = diffPreferences(basePreferences, draft);
    expect(changes).toHaveLength(1);
    expect(changes[0]).toEqual({
      key: "TAX_DEADLINE",
      channel: "EMAIL",
      enabled: false,
    });
  });

  it("returns empty diff when unchanged", () => {
    const draft = clonePreferences(basePreferences);
    expect(diffPreferences(basePreferences, draft)).toHaveLength(0);
  });

  it("sets all channels enabled/disabled", () => {
    const result = setAllChannels(basePreferences, false);
    const channel = result.categories[0].preferences[0].channels;
    expect(channel.EMAIL).toBe(false);
    expect(channel.IN_APP).toBe(false);
  });
});
