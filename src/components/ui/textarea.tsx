import * as React from "react";
import { cn } from "@/lib/utils";
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white focus-visible:border-[#d4af37]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24]/40 transition-all min-h-[130px]",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
export { Textarea };
