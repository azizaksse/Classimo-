import * as React from "react";
import { cn } from "@/lib/utils";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variant === "default"
          ? "bg-[#fbbf24]/20 text-[#fbbf24]"
          : "border border-[#fbbf24]/30 text-[#f5e6c8]",
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";
