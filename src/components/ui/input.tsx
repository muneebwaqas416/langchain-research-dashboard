import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-9 w-full rounded-full border border-white/10 bg-surface-container px-md text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant/50 focus:border-primary/70 focus:shadow-glow",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
