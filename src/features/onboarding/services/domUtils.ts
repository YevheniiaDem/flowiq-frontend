export interface WaitForElementOptions {
  timeoutMs?: number;
  intervalMs?: number;
}

export function waitForElement(
  selector: string | string[],
  options: WaitForElementOptions = {}
): Promise<Element | null> {
  const selectors = Array.isArray(selector) ? selector : [selector];
  const timeoutMs = options.timeoutMs ?? 20_000;
  const intervalMs = options.intervalMs ?? 100;

  return new Promise((resolve) => {
    const startedAt = Date.now();

    const find = () => {
      for (const sel of selectors) {
        const element = document.querySelector(sel);
        if (element) {
          resolve(element);
          return true;
        }
      }
      return false;
    };

    if (find()) return;

    const observer = new MutationObserver(() => {
      if (find()) {
        observer.disconnect();
        clearInterval(intervalId);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const intervalId = window.setInterval(() => {
      if (find()) return;

      if (Date.now() - startedAt >= timeoutMs) {
        observer.disconnect();
        clearInterval(intervalId);
        resolve(null);
      }
    }, intervalMs);
  });
}

export function focusElement(selector: string): void {
  const element = document.querySelector<HTMLElement>(selector);
  if (element && typeof element.focus === "function") {
    element.focus({ preventScroll: true });
  }
}

type PopoverSide = "top" | "right" | "bottom" | "left";
type PopoverAlign = "start" | "center" | "end";

export interface PopoverPlacementTarget {
  wrapper: HTMLElement;
  arrow: HTMLElement;
}

/** Driver.js arrow-side-* = which edge of the popover the arrow sits on. */
function arrowClassForPopoverSide(side: PopoverSide): string {
  switch (side) {
    case "bottom":
      return "driver-popover-arrow-side-bottom";
    case "top":
      return "driver-popover-arrow-side-top";
    case "left":
      return "driver-popover-arrow-side-left";
    case "right":
      return "driver-popover-arrow-side-right";
  }
}

function aimArrowAtElement(
  arrow: HTMLElement,
  wrapper: HTMLElement,
  rect: DOMRect,
  side: PopoverSide
): void {
  const wrapperRect = wrapper.getBoundingClientRect();
  const arrowHalf = 5;
  const edgePadding = 15;

  arrow.style.margin = "0";
  arrow.style.top = "";
  arrow.style.bottom = "";
  arrow.style.left = "";
  arrow.style.right = "";

  if (side === "bottom" || side === "top") {
    const targetX = rect.left + rect.width / 2;
    const left = targetX - wrapperRect.left - arrowHalf;
    const maxLeft = wrapperRect.width - edgePadding - arrowHalf * 2;
    arrow.style.left = `${Math.max(edgePadding, Math.min(left, maxLeft))}px`;
    arrow.style.right = "auto";
    return;
  }

  const targetY = rect.top + rect.height / 2;
  const top = targetY - wrapperRect.top - arrowHalf;
  const maxTop = wrapperRect.height - edgePadding - arrowHalf * 2;
  arrow.style.top = `${Math.max(edgePadding, Math.min(top, maxTop))}px`;
  arrow.style.bottom = "auto";
}

function oppositeSide(side: PopoverSide): PopoverSide {
  switch (side) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "top":
      return "bottom";
    case "bottom":
      return "top";
  }
}

function computePopoverPosition(
  side: PopoverSide,
  align: PopoverAlign,
  rect: DOMRect,
  popoverWidth: number,
  popoverHeight: number,
  offset: number
): { top: number; left: number } {
  if (side === "bottom") {
    return {
      top: rect.bottom + offset,
      left:
        align === "center"
          ? rect.left + rect.width / 2 - popoverWidth / 2
          : align === "end"
            ? rect.right - popoverWidth
            : rect.left,
    };
  }

  if (side === "top") {
    return {
      top: rect.top - popoverHeight - offset,
      left:
        align === "center"
          ? rect.left + rect.width / 2 - popoverWidth / 2
          : align === "end"
            ? rect.right - popoverWidth
            : rect.left,
    };
  }

  if (side === "left") {
    return {
      left: rect.left - popoverWidth - offset,
      top:
        align === "center"
          ? rect.top + rect.height / 2 - popoverHeight / 2
          : align === "end"
            ? rect.bottom - popoverHeight
            : rect.top,
    };
  }

  return {
    left: rect.right + offset,
    top:
      align === "center"
        ? rect.top + rect.height / 2 - popoverHeight / 2
        : align === "end"
          ? rect.bottom - popoverHeight
          : rect.top,
  };
}

function popoverRectFromPosition(
  left: number,
  top: number,
  width: number,
  height: number
): { left: number; top: number; right: number; bottom: number } {
  return { left, top, right: left + width, bottom: top + height };
}

function rectsOverlap(
  a: { left: number; top: number; right: number; bottom: number },
  b: DOMRect,
  margin = 8
): boolean {
  return !(
    a.right + margin <= b.left ||
    a.left - margin >= b.right ||
    a.bottom + margin <= b.top ||
    a.top - margin >= b.bottom
  );
}

function resolvePopoverSide(
  preferred: PopoverSide,
  align: PopoverAlign,
  targetRect: DOMRect,
  popoverWidth: number,
  popoverHeight: number,
  offset: number,
  clampHorizontal: (left: number) => number,
  clampVertical: (top: number) => number
): { side: PopoverSide; top: number; left: number } {
  const candidates: PopoverSide[] = [
    preferred,
    oppositeSide(preferred),
    "bottom",
    "top",
    "right",
    "left",
  ];

  const seen = new Set<PopoverSide>();

  for (const side of candidates) {
    if (seen.has(side)) continue;
    seen.add(side);

    const raw = computePopoverPosition(side, align, targetRect, popoverWidth, popoverHeight, offset);
    const left = clampHorizontal(raw.left);
    const top = clampVertical(raw.top);
    const popoverRect = popoverRectFromPosition(left, top, popoverWidth, popoverHeight);

    if (!rectsOverlap(popoverRect, targetRect)) {
      return { side, top, left };
    }
  }

  const fallback = computePopoverPosition("bottom", "center", targetRect, popoverWidth, popoverHeight, offset);
  return {
    side: "bottom",
    left: clampHorizontal(fallback.left),
    top: clampVertical(fallback.top),
  };
}

export function forcePopoverPlacement(
  popover: PopoverPlacementTarget,
  element: Element,
  side: PopoverSide,
  align: PopoverAlign = "start",
  offset = 14
): void {
  const rect = element.getBoundingClientRect();
  const { wrapper, arrow } = popover;

  wrapper.style.top = "";
  wrapper.style.bottom = "";
  wrapper.style.left = "";
  wrapper.style.right = "";
  wrapper.style.transform = "";

  const popoverWidth = wrapper.offsetWidth || wrapper.getBoundingClientRect().width;
  const popoverHeight = wrapper.offsetHeight || wrapper.getBoundingClientRect().height;

  const clampHorizontal = (left: number) =>
    Math.max(12, Math.min(left, window.innerWidth - popoverWidth - 12));

  const clampVertical = (top: number) =>
    Math.max(12, Math.min(top, window.innerHeight - popoverHeight - 12));

  const placement = resolvePopoverSide(
    side,
    align,
    rect,
    popoverWidth,
    popoverHeight,
    offset,
    clampHorizontal,
    clampVertical
  );

  wrapper.style.top = `${placement.top}px`;
  wrapper.style.left = `${placement.left}px`;

  arrow.className = `driver-popover-arrow ${arrowClassForPopoverSide(placement.side)} driver-popover-arrow-align-start`;
  aimArrowAtElement(arrow, wrapper, rect, placement.side);
}

export function schedulePopoverPlacement(
  popover: PopoverPlacementTarget,
  element: Element,
  side: PopoverSide,
  align: PopoverAlign = "start",
  offset = 14
): void {
  const apply = () => forcePopoverPlacement(popover, element, side, align, offset);
  apply();
  requestAnimationFrame(apply);
  window.setTimeout(apply, 50);
}
