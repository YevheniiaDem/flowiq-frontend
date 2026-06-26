import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
  vi.clearAllMocks();
});
afterAll(() => server.close());

// Default Next.js navigation mocks (overridable per test file)
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Reduce motion noise in component tests
vi.mock("framer-motion", async () => {
  const React = await import("react");
  const stripMotionProps = (props: Record<string, unknown>) => {
    const {
      initial,
      animate,
      exit,
      transition,
      layout,
      layoutId,
      whileHover,
      whileTap,
      ...rest
    } = props;
    return rest;
  };
  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) =>
          React.forwardRef(function MotionStub(
            props: Record<string, unknown>,
            ref: React.Ref<HTMLElement>
          ) {
            return React.createElement(tag, { ...stripMotionProps(props), ref });
          }),
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});
