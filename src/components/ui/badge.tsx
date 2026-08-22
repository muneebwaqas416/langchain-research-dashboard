import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type BadgeTone = "primary" | "success" | "warning" | "muted";

const tones: Record<BadgeTone, string> = {
  primary: "border-primary/20 bg-primary/10 text-primary",
  success: "border-secondary/20 bg-secondary/10 text-secondary",
  warning: "border-tertiary/20 bg-tertiary/10 text-tertiary",
  muted: "border-white/10 bg-white/5 text-on-surface-variant",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ className, tone = "muted", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-xs rounded-full border px-sm text-label-md uppercase tracking-[0.05em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
