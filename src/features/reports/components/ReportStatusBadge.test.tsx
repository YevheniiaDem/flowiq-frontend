/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "@/src/test/test-utils";
import { ReportStatusBadge } from "./ReportStatusBadge";

describe("ReportStatusBadge", () => {
  it.each([
    ["PENDING", "Pending", "bg-muted"],
    ["GENERATING", "Generating", "text-blue-500"],
    ["COMPLETED", "Completed", "text-emerald-500"],
    ["FAILED", "Failed", "text-red-500"],
  ] as const)("renders %s status with label", (status, label) => {
    renderWithProviders(<ReportStatusBadge status={status} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
