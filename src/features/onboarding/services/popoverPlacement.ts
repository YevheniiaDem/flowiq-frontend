import type { Popover } from "driver.js";
import {
  schedulePopoverPlacement,
  type PopoverPlacementTarget,
} from "../services/domUtils";

type PopoverSide = "top" | "right" | "bottom" | "left";
type PopoverAlign = "start" | "center" | "end";

export function withPopoverPlacement(popover: Popover): Popover {
  const side = (popover.side ?? "bottom") as PopoverSide;
  const align = (popover.align ?? "start") as PopoverAlign;
  const previous = popover.onPopoverRender;

  return {
    ...popover,
    onPopoverRender: (dom, options) => {
      previous?.(dom, options);

      const activeElement = options.driver.getActiveElement();
      if (activeElement && popover.side !== "over") {
        schedulePopoverPlacement(dom as PopoverPlacementTarget, activeElement, side, align);
      }
    },
  };
}
