import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "ghost" | "surface";
type ButtonSize = "sm" | "md" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-primary/50 bg-primary text-on-primary shadow-glow hover:border-primary hover:bg-primary/90 hover:shadow-[0_0_22px_rgba(173,198,255,0.45)]",
  ghost:
    "border border-white/10 bg-transparent text-on-surface-variant hover:border-primary/30 hover:bg-primary/10 hover:text-primary",
  surface:
    "border border-white/10 bg-surface-container text-on-surface hover:border-white/20 hover:bg-surface-container-high",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 min-h-9 px-sm text-label-md",
  md: "h-10 min-h-10 px-lg text-body-sm",
  icon: "h-10 w-10 min-h-10 min-w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-sm rounded-lg font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
