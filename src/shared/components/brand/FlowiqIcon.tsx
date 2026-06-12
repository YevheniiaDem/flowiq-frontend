"use client";

import Image from "next/image";
import { cn } from "@/src/shared/utils/utils";

interface FlowiqIconProps {
  className?: string;
}

export function FlowiqIcon({ className }: FlowiqIconProps) {
  return (
    <div
      className={cn(
        "relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-black dark:bg-transparent",
        className
      )}
      aria-hidden
    >
      <Image
        src="/flowiq-icon.png"
        alt=""
        width={40}
        height={40}
        className="h-full w-full object-cover dark:mix-blend-lighten"
        priority
      />
    </div>
  );
}
