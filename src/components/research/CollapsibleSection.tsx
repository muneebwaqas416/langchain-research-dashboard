import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { MarkdownContent } from "../ui/MarkdownContent";
import { Panel } from "../ui/panel";

type CollapsibleSectionProps = {
  title: string;
  content: string;
  defaultOpen?: boolean;
};

export function CollapsibleSection({ title, content, defaultOpen = false }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (!content) {
    return null;
  }

  return (
    <Panel className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-md p-md text-left transition-colors hover:bg-white/5"
        aria-expanded={open}
      >
        <span className="text-body-sm font-semibold text-on-surface">{title}</span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-on-surface-variant transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="max-h-80 overflow-y-auto border-t border-white/5 px-md pb-md pt-sm">
          <MarkdownContent content={content} />
        </div>
      )}
    </Panel>
  );
}
