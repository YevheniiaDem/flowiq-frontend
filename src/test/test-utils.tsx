import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { PreferencesProvider } from "@/src/shared/context/PreferencesContext";
import { TooltipProvider } from "@/src/shared/components/ui/tooltip";

interface WrapperProps {
  children: ReactNode;
}

function AllProviders({ children }: WrapperProps) {
  return (
    <PreferencesProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </PreferencesProvider>
  );
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
