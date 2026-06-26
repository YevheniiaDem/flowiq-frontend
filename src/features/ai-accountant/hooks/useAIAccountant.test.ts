/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useAIAccountant } from "./useAIAccountant";

describe("useAIAccountant", () => {
  it("loads health and recommendations", async () => {
    const { result } = renderHook(() => useAIAccountant());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.health?.score).toBe(85);
    expect(result.current.recommendations).toHaveLength(1);
  });
});
