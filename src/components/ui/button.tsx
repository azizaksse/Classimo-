import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[#b6861f] via-[#d4af37] to-[#926c1a] text-[#050509] shadow-[0_12px_45px_rgba(146,108,26,0.45)] hover:shadow-[0_18px_60px_rgba(212,175,55,0.5)]",
        outline:
          "glass-panel border border-white/20 text-white hover:text-[#fbbf24] hover:border-[#d4af37]/60",
        ghost: "bg-transparent text-white hover:text-[#fbbf24]",
        subtle: "bg-white/5 text-white hover:bg-white/10",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
export { Button, buttonVariants };
