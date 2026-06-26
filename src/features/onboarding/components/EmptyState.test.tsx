/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { Inbox } from "lucide-react";
import { renderWithProviders, screen, userEvent } from "@/src/test/test-utils";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders title and description", () => {
    renderWithProviders(
      <EmptyState
        icon={Inbox}
        title="No data yet"
        description="Import transactions to see your dashboard."
        testId="empty-state"
      />
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("No data yet")).toBeInTheDocument();
    expect(screen.getByText(/Import transactions/)).toBeInTheDocument();
  });

  it("renders primary action button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithProviders(
      <EmptyState
        icon={Inbox}
        title="No data"
        description="Get started"
        primaryAction={{ label: "Import now", onClick, testId: "import-btn" }}
      />
    );

    await user.click(screen.getByTestId("import-btn"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("has decorative icon hidden from screen readers", () => {
    renderWithProviders(
      <EmptyState icon={Inbox} title="Empty" description="Nothing here" />
    );

    const icon = document.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });
});
